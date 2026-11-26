# ادامه اجرایی SEO: وضعیت و نحوه اجرا

## نتیجه این مرحله
- بدون تغییر هیچ فایل صفحه اصلی، CSS، layout، هدر، فوتر یا قابلیت کاربر.
- ساخت ابزار تطبیق Sitemap یک سرور دلخواه با inventory واقعی پروژه؛ URL تکراری، جاافتاده، اضافه، دامنه نامعتبر، پاسخ غیر۲۰۰، redirect، noindex و canonical بررسی می‌شوند.
- اجرای ابزار روی production محلی: ۴۷۶ URL، بدون duplicate/missing/unexpected و همه پاسخ‌ها ۲۰۰ با canonical صحیح و بدون noindex.
- تلاش HTTP مستقیم به دامنه زنده با fetch failed متوقف شد. این نتیجه محدودیت دسترسی محیط است، نه اثبات خرابی سایت. اختلاف ۸۲۴ URL گزارش‌شده کاربر با ۴۷۶ URL پروژه هنوز در Production حل یا تأیید نشده است.
- دسترسی GSC در این محیط فراهم نشد؛ URL Inspection، Google-selected canonical، درخواست ایندکس و زمان دریافت Sitemap توسط گوگل انجام یا مستقلاً تأیید نشده‌اند.
- با نبود export واقعی query/page، هیچ رتبه یا تغییر محتوایی از داده ساختگی استنتاج نشد.

## ابزار تطبیق نسخه منتشرشده
پس از deploy، در محیط دارای دسترسی اینترنت:
```
npx tsx scripts/audit-deployed-seo.ts https://khodrochare.ir
```
خروجی محلی و غیرقابل انتشار: `coverage/seo/deployed-audit.json`.
گزارش شامل تمام URLهای Sitemap است؛ در اختلاف inventory، تغییر نسخه یا مسیرها را بررسی کنید. URLهای اضافه ممکن است قدیمی، متعلق به نسخه دیگر یا صفحات معتبر جدید باشند؛ صرف اختلاف، مجوز حذف یا noindex نیست. اسکریپت به Google cache یا حساب گوگل متصل نیست.

## URL Inspection: اقدام مالک
آدرس دقیق `/امداد-خودرو-آنلاین` را در GSC بررسی کنید. نتیجه URL is on Google، Last crawl، Fetch، Indexing allowed، User-declared canonical و Google-selected canonical را ذخیره کنید. Test live URL و HTML رندرشده را ببینید. پس از تأیید انتشار جدید و رفع خطا، یک بار Request indexing بزنید. نتیجه HTTP محلی جای این بررسی نیست. پاسخ کوتاه قدیمی و شماره متفاوت باید از نسخه زنده بررسی شوند، نه از cache ابزار ثالث.

## ثبت مبنای برند/غیربرند
ابزار جدید:
```
npx tsx scripts/search-baseline.ts current.json previous.json
```
فایل‌ها باید JSON شامل `start` و `end` با دوره ۲۸ روزه inclusive، `filters` و `rows` باشند. هر row دارای query، page، clicks، impressions و position عددی است. فقط داده واقعی exportشده GSC استفاده شود. مثال ساختار بدون داده ساختگی:
```json
{"start":"YYYY-MM-DD","end":"YYYY-MM-DD","filters":{"property":"https://khodrochare.ir/","searchType":"web","country":"all","device":"all"},"rows":[]}
```
برای مقایسه، دو دوره باید بدون هم‌پوشانی و فیلترها یکسان باشند. خروجی `coverage/seo/search-baseline.json` است. تطبیق برند فاصله، نیم‌فاصله و حروف لاتین را نرمال می‌کند. CTR از مجموع کلیک/نمایش و position با وزن impression محاسبه می‌شود. مجموع ردیف‌های query/page، گزارش کامل صفحه نیست؛ queryهای ناشناس/حذف‌شده باعث اختلاف با Page totals می‌شوند. داده واقعی را در Git قرار ندهید.

## داده ارسالی کاربر، نه دریافت مستقل
گزارش اعلامی بازه ۲۸ اکتبر تا ۲۴ نوامبر ۲۰۲۶: خانه ۱۳۰ کلیک/۳۴۴ نمایش/CTR ۳۷٫۷۹٪/position ۲۰٫۱۴؛ app سه کلیک/۳۸ نمایش/position ۴٫۶۳؛ assistant صفر/۲/۴۷٫۵؛ safir دو/۴/۵٫۵. بدون query rows نمی‌توان این اعداد را به برند و غیربرند تفکیک کرد. برای صفحه امداد آنلاین «داده قابل مشاهده نیست» به معنی صفر یا عدم ایندکس نیست. تاریخ‌ها و اعداد، اظهارات ارسالی کاربرند و مستقلاً تأیید نشده‌اند.

## تصمیم محتوایی بعدی
پس از دریافت query/page export، اسکریپت موجود `scripts/search-monitor.ts current.csv previous.csv` افت‌ها، فرصت‌های دارای impression و نمایش چند URL برای یک query را برای بررسی علامت می‌زند. این خروجی اثبات Cannibalization نیست. تغییر عنوان، متن یا لینک فقط با بررسی intent و اندازه داده انجام شود؛ صفحه اصلی همچنان محافظت‌شده است.

## کنترل کیفیت
Lint، unit، build و production SEO crawl پاس شدند. مقایسه ۲۵۳ فایل محافظت‌شده، SSR body و لینک‌های صفحه اصلی بدون تغییر بود. مقایسه تصویری مرورگر و Core Web Vitals میدانی انجام نشده است.
