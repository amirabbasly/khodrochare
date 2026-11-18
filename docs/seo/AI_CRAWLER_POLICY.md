# سیاست دسترسی ربات‌ها

> **به‌روزرسانی پس از تأیید مالک:** کاربر جایگزینی کامل نام حقوقی با «سیما رایگان ایرانیان» و تعلق مجوز، مدیرعامل و نشانی فعلی به همین شرکت را صریحاً تأیید کرد. نام مرکزی و متن‌های ثابت مجوزها/درباره اصلاح شده‌اند و Schema و سایر مصرف‌کنندگان از همان منبع تغذیه می‌شوند. این تأیید مالک است، نه استعلام مستقل ثبتی؛ شناسه ملی یا شماره ثبت جدیدی اضافه نشد. عبارت‌های «تعارض باز/مسدود» مربوط به هویت در بدنه زیر، یافته تاریخی پیش از تأییدند و وضعیت جاری آن‌ها **رفع‌شده در کد بر اساس تأیید مالک** است. سایر کمبودهای داده/حساب و تاریخ‌ها همچنان بازند.


> تاریخ مرجع تحلیل: 2026-10-17. شواهد فنی: production build محلی؛ مشاهده عمومی سایت جدا از آزمون محلی است. داده حسابی موتورهای جست‌وجو در دسترس نیست. «قابل ایندکس» به معنی «ایندکس‌شده» نیست. زمان ثبت ابزارها ممکن است با تاریخ مرجع متفاوت باشد؛ در inventory ستون dateReview موارد بعد از تاریخ مرجع را مشخص می‌کند.

## ثبت تصمیم و وضعیت

| مورد | نتیجه |
|---|---|
| مشکل | کامنت قبلی، training و Search/GEO را به‌اشتباه هم‌هدف معرفی می‌کرد |
| شواهد | src/app/robots.ts؛ robots زنده پیش از تغییر همان allow عمومی را داشت |
| شدت | P2 |
| اثر تجاری | تصمیم ناخواسته درباره مصرف محتوا؛ خطر مسدودی واقعی در CDN هنوز نامعلوم |
| راه‌حل | search و training مستقل؛ سیاست training بدون تصمیم مالک تغییر نکند |
| اقدام انجام‌شده | کامنت اصلاح و search bots یاندکس و Perplexity صریح شدند؛ تمام گروه‌ها /api را exclude می‌کنند |
| نتیجه تست | unit test گروه‌های مستقل پاس؛ احراز IP زنده انجام نشده |
| وضعیت نهایی | کد اصلاح؛ بررسی edge و تصمیم training باز |

| Bot | Provider | Purpose | Policy فعلی | تأیید هویت |
|---|---|---|---|---|
| Googlebot / Googlebot-Image | Google | Search / Images | allow public، منع /api/ | لیست رسمی روزآمد یا reverse+forward طبق نوع crawler |
| Bingbot | Microsoft | Search و زیرساخت retrieval | allow public، منع /api/ | search.msn.com با forward-match یا JSON رسمی |
| YandexBot / YandexImages | Yandex | Search / Images | گروه صریح allow public | yandex.ru/net/com با مرز دامنه و forward-match |
| OAI-SearchBot | OpenAI | Search ChatGPT | allow public | searchbot.json رسمی روزآمد |
| GPTBot | OpenAI | training-related | allow موجود حفظ شد؛ تصمیم مستقل مالک باز است | gptbot.json؛ نه IPهای OAI-SearchBot |
| PerplexityBot | Perplexity | Search، نه training مدل پایه طبق راهنما | گروه صریح allow public | perplexitybot.json رسمی |
| Google-Extended | Google | token کنترل مصرف متفاوت از Googlebot | allow موجود بدون تغییر | با Googlebot یا کسب رتبه یکی تلقی نشود؛ قبل از تصمیم مستندات محصول بررسی شود |

گروه‌های training و سایر عامل‌های موجود حذف یا به allow جدید تبدیل نشدند. نام bot تازه حدسی افزوده نشد. ChatGPT-User/Perplexity-User درخواست کاربرند؛ محدودیت‌های robots آن‌ها را به firewall احراز هویت تبدیل نمی‌کند.

## عملیات CDN
access log واقعی برای مسیر/زمان/status/IP لازم است. UA فقط selector است؛ درخواست جعلی نباید با UA bypass شود. تطبیق IP/FCrDNS فقط طبق منبع همان ارائه‌دهنده. IP ارسالی کاربر یا X-Forwarded-For بدون trusted proxy معتبر نیست. robots allow تضمین عبور WAF یا Bot Fight Mode نیست. تغییر Cloudflare یا allowlisting در این اجرا انجام نشد.

## منابع رسمی بررسی‌شده
- https://developers.google.com/crawling/docs/crawlers-fetchers/verify-google-requests
- https://www.bing.com/webmasters/help/how-to-verify-bingbot-3905dc26
- https://yandex.com/support/webmaster/en/robot-workings/check-yandex-robots
- https://developers.openai.com/api/docs/bots
- https://docs.perplexity.ai/docs/resources/perplexity-crawlers
