# فایل‌های رسمی اندروید

قبل از build فایل‌های APK واقعی و امضاشده را با همین نام‌ها در این پوشه آپلود کنید:

- `khodrochare-customer.apk` — اپ مشتریان
- `khodrochare-safir.apk` — اپ سفیران

URL عمومی شامل public نیست: `/downloads/khodrochare-customer.apk` و `/downloads/khodrochare-safir.apk`.

فایل‌ها عمداً در Git ignore شده‌اند. موجودبودن و غیرخالی‌بودن فایل در زمان build بررسی می‌شود؛ پس از اولین آپلود یا حذف فایل، build و restart لازم است. صرف وجود فایل، اعتبار بسته یا امضای آن را تأیید نمی‌کند؛ صحت، امضا، نسخه، مجوزها و اتصال به backend را پیش از انتشار روی Android بررسی کنید.

در هر انتشار، فایل‌ها را از فضای ماندگار به public نسخه جدید کپی کنید؛ به پوشه موقت یک deploy اکتفا نکنید. برای standalone/Docker، public باید در مسیر اجرایی یا لایه سرو فایل استاتیک هم موجود باشد. راهنمای کامل: `docs/cloudflare-downloads-server-health.md`.
