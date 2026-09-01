import { NextResponse } from "next/server";

const GAPGPT_API_URL = "https://api.gapgpt.app/v1/chat/completions";
const GAPGPT_API_KEY = process.env.GAPGPT_API_KEY;
const SUPPORT_PHONE_NUMBER = "09123022064";
const SUPPORT_SUFFIX = `بهتر است برای پشتیبانی بهتر با شماره تماس ${SUPPORT_PHONE_NUMBER} تماس بگیرید.`;

const SYSTEM_PROMPT = `
شما دستیار تخصصی خودرو چاره هستید و فقط درباره عیب‌یابی و نگهداری خودرو، خدمات مکانیکی، برق و باتری، کارواش سیار، امداد جاده‌ای و اپلیکیشن خودرو چاره پاسخ می‌دهید.
اگر درباره هویت شما پرسیده شد، بگویید «من دستیار تخصصی خودرو چاره هستم».
پاسخ‌ها کوتاه، مودب، ایمن و کاربردی باشند. برای تعمیرات پرخطر یا مواردی که نیاز به بررسی حضوری دارند، کاربر را از اقدام شخصی منع کنید.
اگر سوال خارج از حوزه بود، شفاف اعلام کنید که فقط درباره خودرو و اپلیکیشن خودرو چاره پاسخ می‌دهید.
در انتهای تمام پاسخ‌ها دقیقاً این جمله را اضافه کنید: «${SUPPORT_SUFFIX}»
`;

type ChatMessage = { role: "user" | "assistant"; content: string };

const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const MAX_BODY_BYTES = 50_000;
const requestLog = new Map<string, number[]>();

function clientIp(request: Request) {
  return request.headers.get("cf-connecting-ip") ?? request.headers.get("x-real-ip") ?? "unknown";
}

function rateLimit(request: Request) {
  const now = Date.now();
  const ip = clientIp(request);
  const recent = (requestLog.get(ip) ?? []).filter((time) => now - time < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, recent);
    return false;
  }
  recent.push(now);
  requestLog.set(ip, recent);

  if (requestLog.size > 5_000) {
    for (const [key, times] of requestLog) {
      if (!times.some((time) => now - time < RATE_LIMIT_WINDOW_MS)) requestLog.delete(key);
    }
  }
  return true;
}

const isSupportPhoneQuestion = (text: string) => /پشتیبانی/.test(text) && /(شماره|تلفن|تماس)/.test(text);

function withSupportSuffix(reply: string) {
  const cleaned = reply.trim();
  return cleaned.endsWith(SUPPORT_SUFFIX) ? cleaned : `${cleaned}\n\n${SUPPORT_SUFFIX}`;
}

export async function POST(request: Request) {
  if (!GAPGPT_API_KEY) {
    return NextResponse.json({ error: "کلید API گپ‌جی‌پی‌تی تنظیم نشده است." }, { status: 500 });
  }

  if (!rateLimit(request)) {
    return NextResponse.json(
      { error: "تعداد درخواست‌ها زیاد است. لطفاً چند دقیقه دیگر دوباره تلاش کنید." },
      { status: 429, headers: { "Retry-After": "300" } },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "حجم درخواست بیش از حد مجاز است." }, { status: 413 });
  }

  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return NextResponse.json({ error: "نوع محتوای درخواست باید JSON باشد." }, { status: 415 });
  }

  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "حجم درخواست بیش از حد مجاز است." }, { status: 413 });
    }
    let body: { messages?: ChatMessage[] };
    try {
      body = JSON.parse(rawBody) as { messages?: ChatMessage[] };
    } catch {
      return NextResponse.json({ error: "بدنه JSON معتبر نیست." }, { status: 400 });
    }
    const messages = body.messages;

    if (!Array.isArray(messages) || messages.length === 0 || messages.length > 20) {
      return NextResponse.json({ error: "فرمت یا تعداد پیام‌ها معتبر نیست." }, { status: 400 });
    }

    const validMessages = messages.filter(
      (message): message is ChatMessage =>
        (message?.role === "user" || message?.role === "assistant") &&
        typeof message?.content === "string" &&
        message.content.trim().length > 0 &&
        message.content.length <= 4000,
    );

    if (validMessages.length !== messages.length) {
      return NextResponse.json({ error: "محتوای پیام‌ها معتبر نیست." }, { status: 400 });
    }

    if (validMessages.reduce((total, message) => total + message.content.length, 0) > 20_000) {
      return NextResponse.json({ error: "حجم گفتگو بیش از حد مجاز است." }, { status: 400 });
    }

    const lastUserMessage = [...validMessages].reverse().find((message) => message.role === "user");
    if (lastUserMessage && isSupportPhoneQuestion(lastUserMessage.content)) {
      return NextResponse.json({ reply: `شماره تلفن پشتیبانی ${SUPPORT_PHONE_NUMBER} است. ${SUPPORT_SUFFIX}` });
    }

    const upstream = await fetch(GAPGPT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GAPGPT_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...validMessages],
        max_tokens: 600,
        temperature: 0.3,
      }),
      signal: AbortSignal.timeout(30000),
    });

    if (!upstream.ok) {
      return NextResponse.json({ error: "پاسخ مناسب از GapGPT دریافت نشد." }, { status: 502 });
    }

    const data = await upstream.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return NextResponse.json({ error: "پاسخی از سرویس دریافت نشد." }, { status: 502 });
    }

    return NextResponse.json({ reply: withSupportSuffix(reply) });
  } catch (error) {
    console.error("GapGPT error:", error);
    return NextResponse.json({ error: "خطا در برقراری ارتباط با سرویس رخ داد." }, { status: 500 });
  }
}
