# پیاده‌سازی موارد تحلیل رقبا — ۱۹ شهریور ۱۴۰۵

دنباله `docs/seo-competitor-analysis.md`. نکته مهم: کد پروداکشن روی برنچ
`arena/01a072dc-khodrochare` بود، پس اول آن برنچ در این برنچ مرج شد و بعد
موارد زیر پیاده‌سازی شد. ظاهر صفحه اصلی هیچ تغییری نکرد (فقط متادیتای
نامرئی `sameAs` عوض شد).

## انجام‌شده در کد

| # | مورد | فایل‌ها |
|---|---|---|
| ۱ | لینک کانال بله → `https://ble.ir/khodrochare` | `src/content/business.ts` + `scripts/check-production-seo.ts` + `tests/browser/*.spec.ts` |
| ۲ | باز شدن خزنده‌های هوش مصنوعی (GEO): GPTBot، Google-Extended، ClaudeBot، CCBot، Bytespider | `src/app/robots.ts` |
| ۳ | مسیر `/llms.txt` (خلاصه متنی سایت برای موتورهای پاسخ‌گو) | `src/app/llms.txt/route.ts` |
| ۴ | زیرساخت نظر مشتری: نمایش + اسکیمای Review تکی؛ مخفی تا وقتی نظر واقعی ثبت شود | `src/content/reviews.ts` + `src/components/site/trust-sections.tsx` + `src/seo/schemas.ts` + اتصال در `/about` و `/services/[slug]` |
| ۵ | زیرساخت تیم (E-E-A-T): مخفی تا وقتی اسم واقعی اضافه شود + اسکیمای Person | `src/content/business.ts` (`team`) + `/about` |
| ۶ | بج‌های اینماد/اتحادیه در فوتر: فقط وقتی لینک تأیید واقعی داده شود نمایش داده می‌شوند (الان هیچ تغییر ظاهری نیست) | `src/content/business.ts` (`trustBadges`) + `src/components/site/site-footer.tsx` |

## عمداً انجام نشد (سیاست تحریریه سایت)

- **انتشار عدد قیمت:** صفحه `/pricing` آگاهانه تعرفه عددی منتشر نمی‌کند («نمایش مبلغ
  ساختگی می‌تواند گمراه‌کننده باشد»). به‌جای آن، ابزار محاسبه‌گر با ورودی کاربر
  از قبل وجود دارد و پاسخ ما به ابزار `/route` امدادتوست.
- **AggregateRating و ستاره:** تا وقتی ۵+ نظر واقعی با رضایت انتشار نباشد، اضافه
  نمی‌شود (تست سئو هم عمداً آن را خطا می‌گیرد). مسیر فعال‌سازی داخل
  `src/content/reviews.ts` نوشته شده است.

## کارهایی که فقط مالک می‌تواند انجام دهد

1. **Cloudflare:** با وجود باز شدن robots، بلاک «AI Crawl Control» کلادفلر همچنان
   جلوی GPTBot/ClaudeBot را می‌گیرد. در پنل Cloudflare بازبینی شود.
2. **Google Business Profile** برای تهران (+ کرج): مهم‌ترین تک‌کار برای «امداد خودرو تهران».
3. **نظر واقعی:** جمع‌آوری ۵+ نظر با اسم کوچک + خدمت + شهر و ثبت در `src/content/reviews.ts`.
4. **تیم واقعی:** نام/سمت/بیو در `businessFacts.team` + عکس در `public/images/team/`.
5. **اینماد:** لینک صفحه تأیید در `businessFacts.trustBadges`.
6. **Search Console:** ثبت سایت‌مپ + پایش impressions/clicks دو کلمه هدف.
7. **بک‌لینک:** NAP یکسان در دایرکتوری‌ها + ۲-۳ رپورتاژ خودرویی (جزئیات در سند تحلیل رقبا).

## اعتبارسنجی

- `npm run typecheck` ✅
- `npm run test:unit` — ۳۹/۳۹ ✅
- `npm run build` — ۳۹۶ صفحه ✅
- `npm run test:seo` — ۳۸۵ صفحه، صفر خطا (شامل چک لینک جدید بله در همه صفحات) ✅
