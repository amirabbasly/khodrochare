# داشبورد شفاف منابع و محدودیت‌ها

> **به‌روزرسانی پس از تأیید مالک:** کاربر جایگزینی کامل نام حقوقی با «سیما رایگان ایرانیان» و تعلق مجوز، مدیرعامل و نشانی فعلی به همین شرکت را صریحاً تأیید کرد. نام مرکزی و متن‌های ثابت مجوزها/درباره اصلاح شده‌اند و Schema و سایر مصرف‌کنندگان از همان منبع تغذیه می‌شوند. این تأیید مالک است، نه استعلام مستقل ثبتی؛ شناسه ملی یا شماره ثبت جدیدی اضافه نشد. عبارت‌های «تعارض باز/مسدود» مربوط به هویت در بدنه زیر، یافته تاریخی پیش از تأییدند و وضعیت جاری آن‌ها **رفع‌شده در کد بر اساس تأیید مالک** است. سایر کمبودهای داده/حساب و تاریخ‌ها همچنان بازند.


> تاریخ مرجع تحلیل: 2026-10-17. شواهد فنی: production build محلی؛ مشاهده عمومی سایت جدا از آزمون محلی است. داده حسابی موتورهای جست‌وجو در دسترس نیست. «قابل ایندکس» به معنی «ایندکس‌شده» نیست. زمان ثبت ابزارها ممکن است با تاریخ مرجع متفاوت باشد؛ در inventory ستون dateReview موارد بعد از تاریخ مرجع را مشخص می‌کند.

## ثبت تصمیم و وضعیت

| مورد | نتیجه |
|---|---|
| مشکل | نبود اتصال حساب‌ها؛ dashboard با صفر جعلی گمراه‌کننده است |
| شواهد | اسکریپت inventory، search-monitor و citation-monitor؛ خروجی‌های پوشه coverage |
| شدت | P2 |
| اثر تجاری | تصمیم بودجه و محتوا بدون خط مبنا معتبر نیست |
| راه‌حل | داشبورد عملیاتی مبتنی بر منبع؛ NA برای داده ناموجود |
| اقدام انجام‌شده | تعریف شاخص‌ها و CLI پایش citation و اعلان URL ایجاد شد |
| نتیجه تست | داده crawl واقعی محلی موجود؛ آمار حسابی و AI خالی/NA |
| وضعیت نهایی | داشبورد فایل‌محور و مشخصات آماده؛ اتصال سرویس‌ها انجام نشده |

| شاخص | منبع | مقدار/وضعیت فعلی | محدودیت |
|---|---|---|---|
| technical indexable | inventory local | 475 | indexed نیست |
| noindex عمدی | inventory local | 4 | موتور ممکن است نسخه قدیمی داشته باشد |
| crawl assertion failures | test:seo | 0 | فقط محدوده آزمون محلی |
| Google clicks/impressions/CTR/position | GSC | NA | حساب/CSV تازه لازم |
| Bing search performance | Bing Webmaster | NA | جدا از Google |
| Yandex queries/indexing | Yandex Webmaster | NA | جدا از سایر موتورها |
| indexed pages | هر موتور inspection/report | NA | sitemap count نیست |
| crawl errors live | logs و پنل موتور | NA | invalid-test 404 خطای تولید نیست |
| organic sessions | analytics با consent | NA | bot/referrer و attribution بررسی شود |
| conversions / conversion rate | GA4 + پذیرش عملیاتی | NA | کلیک تماس سفارش تأییدشده نیست |
| revenue | backend/حسابداری تأییدشده | NA | داده مالی در دسترس نیست |
| referring domains | ابزار معتبر backlink | NA | DA گوگل‌فاکتور نیست |
| brand mentions / citation URLs | observation ledger | NA | موتور واقعاً مشاهده‌نشده صفر نیست |
| citation frequency | cited answers / observed answers همان موتور | NA | احتمال/سهم همه پاسخ‌های موتور نیست |
| answer accuracy | بازبین facts + evidence | NA | خودکار حدس زده نشود |
| AI referral | analytics با source/referrer | NA | dark traffic و پنهان‌شدن referrer؛ هم‌پوشانی با Search |

## بازتولید
- `npm run build && npx tsx scripts/seo-inventory.ts` → CSV و JSON فنی.
- `npx tsx scripts/search-monitor.ts current.csv previous.csv` → تحلیل Query/Page بازه برابر؛ منبع engine و filter در متادیتای همراه فایل‌ها نوشته شود. ردیف‌های خام خصوصی در Git قرار نگیرند.
- `npx tsx scripts/citation-monitor.ts observations.json` → شمارش evidenceهای واقعی، null برای موتور بدون نمونه.
- `npx tsx scripts/indexnow.ts changes.json` → dry-run، نه وضعیت indexing.

این تحویل پنل وب عمومی جدید یا API ندارد و ظاهر سایت را تغییر نمی‌دهد. dashboard UI متصل به حساب‌ها پروژه جدا با credential و مجوز است؛ credential نباید در چت یا کد ذخیره شود.
