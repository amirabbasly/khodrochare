# راهنمای استقرار و درخواست ایندکس خودرو چاره

**این راهنما برای بعد از استقرار کد روی سرور اصلی است. انتشار در GitHub به‌تنهایی سایت `khodrochare.ir` را تغییر نمی‌دهد.** استقرار سرور طبق درخواست، توسط مالک سایت انجام می‌شود.

## ۱. نسخه درست را مستقر کنید

کد این تغییرات روی شاخه `arena/01a072dc-khodrochare` است. برای استقرار، همین نسخه را انتخاب کنید یا ابتدا PR مربوط را در GitHub ادغام کنید. `pull` از `main` پیش از ادغام PR، الزاماً این تغییرات را ندارد.

۱. فایل‌های محیطی و تنظیمات سرویس فعلی را حفظ کنید؛ کلید و رمز را وارد Git نکنید.
۲. پس از دریافت نسخه، با Node 22 اجرا کنید:

```bash
npm ci
npm run lint -- --max-warnings=0
npm run test:unit
npm run build
npm run test:seo
```

۳. سرویس Next/Node فعلی را با روش مدیریت سرور خودتان (مثلاً systemd یا PM2 موجود) restart کنید. نمونه Nginx در `deploy/nginx/khodrochare.ir.conf` قرار دارد؛ HTTPS و هدایت www/HTTP به `https://khodrochare.ir` را حفظ کنید.
۴. اگر reverse proxy/CDN نسخه قبلی HTML، sitemap یا robots را cache کرده، cache مربوط را پاک و نتیجه را بررسی کنید. فقط فایل‌های Git را کپی نکنید؛ build و restart لازم است.
۵. پذیرش مستقیم فرم بدون webhook واقعی خاموش است. برای فعال‌سازی و آزمون اتصال، [راهنمای پذیرش](online-intake.md) را اجرا کنید. بازشدن فرم یا پیام «خلاصه آماده شد» به معنی ثبت سفارش نیست.

## ۲. سلامت نسخه زنده را بررسی کنید

پیش از درخواست ایندکس، حداقل این آدرس‌ها را در مرورگر و ابزار بررسی HTTP باز کنید:

| URL | انتظار |
| --- | --- |
| `https://khodrochare.ir/امداد-خودرو` | HTTP 200؛ راهنمای انتخاب خدمت |
| `https://khodrochare.ir/امداد-خودرو-آنلاین` | HTTP 200؛ وضعیت واقعی پذیرش و فرم |
| `https://khodrochare.ir/شمال` | HTTP 200؛ گیلان، مازندران و گلستان |
| `https://khodrochare.ir/brands/iran-khodro` | HTTP 200؛ صفحه ایران خودرو |
| `https://khodrochare.ir/brands/saipa` | HTTP 200؛ صفحه سایپا |
| `https://khodrochare.ir/brands/toyota` | HTTP 200؛ صفحه تویوتا |
| `https://khodrochare.ir/تهران/سعادت-آباد` | HTTP 200؛ راهنمای محله |
| `https://khodrochare.ir/تهران/یدک-کش` | HTTP 200؛ حفظ مسیر قبلی |
| `https://khodrochare.ir/رشت/یدک-کش` | HTTP 200؛ خدمت در شهر شمالی |
| `https://khodrochare.ir/pricing` | HTTP 200؛ ابزار محاسبه با نرخ واردشده |
| `https://khodrochare.ir/یدک-کش` | 301/308 به `/services/tow-truck` و سپس 200 |
| `https://khodrochare.ir/قیمت-خدمات` | 301/308 به `/pricing` و سپس 200 |
| `https://khodrochare.ir/کرج/شمال-تهران` | **HTTP 404 واقعی**؛ ترکیب اشتباه نباید ایندکس شود |
| `https://khodrochare.ir/sitemap.xml` | XML معتبر، ۳۷۴ URL canonical |
| `https://khodrochare.ir/robots.txt` | سیاست جدید و آدرس sitemap |

در نسخه زنده، صرف دیدن یک صفحه خطا داخل پاسخ HTTP ۲۰۰ کافی نیست؛ وضعیت واقعی پاسخ را هم کنترل کنید. صفحه اصلی با یا بدون اسلش انتهایی یک URL معادل است. آدرس‌های فارسیِ خوانا و نسخه percent-encoded همان URL هستند؛ برای کپی دقیق از فایل کامل پایین استفاده کنید.

تست محلی، DNS، HTTPS، فایروال، Cloudflare یا تنظیمات متفاوت سرور شما را اثبات نمی‌کند. اگر صفحه جدید پس از انتشار GitHub هنوز روی دامنه ۴۰۴ است، قبل از ایندکس، استقرار revision، build، restart و cache را بررسی کنید.

## ۳. نقشه سایت را در Google Search Console ثبت کنید

در property تأییدشده همین دامنه، بخش **Sitemaps**:

```
https://khodrochare.ir/sitemap.xml
```

- تأیید DNS یا meta tag معتبر است؛ اگر از قبل تأیید شده‌اید، اضافه‌کردن روش دوم الزامی نیست.
- در URL Inspection برای چند صفحه مهم، **Test live URL** را اجرا کنید. قابلیت دریافت، canonical انتخابی و نبود `noindex` را بررسی کنید و سپس **Request indexing** بزنید.
- قرار نیست برای هر ۳۷۴ صفحه درخواست دستی تکراری بفرستید. sitemap و لینک‌های داخلی مسیر کشف کل مجموعه‌اند؛ درخواست دستی را به صفحات مهم اختصاص دهید و سهمیه‌ای که ابزار نمایش می‌دهد رعایت کنید.
- درخواست crawl، زمان مشخص یا تضمین ایندکس/رتبه ندارد. API عمومیِ مناسبِ ارسال انبوه این نوع صفحات برای تضمین ایندکس وجود ندارد.

## ۴. اولویت URL Inspection

### اول: صفحه اصلی، دو نیت اصلی و شهرهای پایه

1. https://khodrochare.ir/
2. https://khodrochare.ir/امداد-خودرو
3. https://khodrochare.ir/امداد-خودرو-آنلاین
4. https://khodrochare.ir/coverage
5. https://khodrochare.ir/تهران
6. https://khodrochare.ir/کرج

### دوم: شبکه فعال شمال

7. https://khodrochare.ir/شمال
8. https://khodrochare.ir/گیلان
9. https://khodrochare.ir/مازندران
10. https://khodrochare.ir/گلستان
11. https://khodrochare.ir/چالوس
12. https://khodrochare.ir/رشت
13. https://khodrochare.ir/ساری
14. https://khodrochare.ir/گرگان
15. https://khodrochare.ir/roads/chalus

### سوم: صفحات درخواست‌شده و ابزار قیمت

16. https://khodrochare.ir/brands
17. https://khodrochare.ir/brands/iran-khodro
18. https://khodrochare.ir/brands/saipa
19. https://khodrochare.ir/brands/toyota
20. https://khodrochare.ir/تهران/سعادت-آباد
21. https://khodrochare.ir/تهران/یدک-کش
22. https://khodrochare.ir/pricing

این اولویت برای شروع است، نه سهمیه روزانه یا تعهد گوگل. پس از ثبت sitemap، سایر شهرها، خدمات و محله‌ها را بر اساس تقاضای واقعی و داده Search Console پیگیری کنید.

## ۵. فهرست کامل URLها

[فایل کامل ۳۷۴ URL canonical](google-indexing-urls.txt) با اجرای `npm run indexing:export` از همان داده‌های مسیرهای سایت ساخته می‌شود. CI تطابق فایل و کد را کنترل می‌کند.

- `/store` عمداً `noindex` و خارج از sitemap است؛ آن را برای ایندکس فروشگاه کامل‌شده معرفی نکنید.
- APIها، `/offline.html` و ترکیب‌های نامعتبر شهر/محله/خدمت را برای ایندکس درخواست نکنید.
- پوشش مستقل شهرهایی مثل قم، اصفهان و قزوین در این درخواست تأیید نشده است؛ صرف اشاره به محور قزوین–رشت به معنی راه‌اندازی صفحه خدمات شهر قزوین نیست.

## ۶. دسترسی جست‌وجوهای مبتنی بر AI

در robots برنامه، خزنده‌های جست‌وجو از جمله Googlebot، Bingbot و OAI-SearchBot به محتوای عمومی دسترسی دارند؛ `/api/` مستثناست. GPTBot و برخی خزنده‌های آموزش مستقل از جست‌وجو مسدود شده‌اند.

**robots نهایی دامنه و Cloudflare/WAF را بعد از deploy بررسی کنید.** قواعد تزریق‌شده توسط CDN یا challenge فایروال ممکن است با فایل برنامه متفاوت باشند. بازکردن دسترسی جست‌وجو به معنی موافقت با آموزش مدل نیست؛ این دو تنظیم را جدا نگه دارید.

برای حضور در پاسخ‌های هوش مصنوعی، فایل خاص، پرداخت، schema ویژه یا `llms.txt` اجباری وجود ندارد. محتوای مفید و قابل دریافت، هویت و محدوده روشن، لینک داخلی و سازگاری schema با متن مبنا هستند؛ نمایش یا استناد تضمین نمی‌شود.

## ۷. پس از انتشار چه چیزهایی را پیگیری کنیم؟

- گزارش‌های **Page indexing** و **Sitemaps** در Search Console؛ صفحاتی که واقعاً canonical دیگری گرفته‌اند یا دریافت نمی‌شوند را جدا بررسی کنید.
- query و صفحه برای «امداد خودرو»، «امداد خودرو آنلاین» و شهر/خدمت‌های واقعی؛ به جای ادعای رتبه یا امتیاز سئوی ساختگی.
- خطاهای ۴۰۴ واقعی سرور و لینک‌هایی که هنوز به مسیر قدیمی اشاره می‌کنند.
- دریافت واقعی درخواست در پذیرش، نه صرف کلیک یا ارسال فرم؛ نصب آمارگیر به‌تنهایی این جریان را درست نمی‌کند.
- افزودن محتوای عملی و اصلاح اطلاعات بر اساس تجربه واقعی، نه تکثیر نام محله بدون محتوای مفید.

منابع رسمی برای تصمیم‌های بیرون از کد:
- https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://platform.openai.com/docs/bots
