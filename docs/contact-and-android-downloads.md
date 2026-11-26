# شماره تماس و انتشار اندروید مشتریان

## تغییرات سایت
- شماره تماس امداد و پشتیبانی سایت: `02182801043`؛ قالب بین‌المللی Schema: `+982182801043`.
- شماره در هدر، فوتر، CTAها، راهنماها، FAQ، داده ساختاریافته، پیام‌های پشتیبانی API موجود و صفحه آفلاین جایگزین شد. نسخه cache آفلاین نیز تغییر کرد.
- کد اپ‌های مستقل app/safir در این مخزن نیست؛ تغییر شماره داخل آن اپ‌ها باید در مخزن خودشان انجام شود. این تغییر، انتقال خط یا تأیید اتصال تلفنی نیست.
- لینک مایکت ارسالی مالک برای **اپ مشتریان** در فوتر، بنر اپ صفحه اصلی و بخش دانلود `/app#downloads` درج شد: https://myket.ir/app/com.khodrochare.app . لینک به سفیران نسبت داده نشد؛ محتوای فروشگاه/تأیید مالکیت بسته مستقلاً بررسی نشده است.

## مسیر دقیق APK مشتریان
در ریشه همان پروژه‌ای که `next build` و `next start` اجرا می‌شود:

```text
public/downloads/khodrochare-customer.apk
```

در checkout این محیط:

```text
/home/user/khodrochare/public/downloads/khodrochare-customer.apk
```

آدرس عمومی پس از انتشار:

```text
https://khodrochare.ir/downloads/khodrochare-customer.apk
```

**در URL کلمه public نوشته نمی‌شود.** مسیر بالا متعلق به اپ مشتریان است؛ اپ سفیران فایل جداگانه `public/downloads/khodrochare-safir.apk` دارد و لینک مایکت مشتریان جای آن قرار نمی‌گیرد.

## فعال‌کردن لینک مستقیم
فایل APK در این درخواست پیوست نشده، بنابراین فایل نصب واقعی ایجاد/آپلود نشده است. دکمه مستقیم فقط وقتی فایل غیرخالی در زمان build وجود داشته باشد فعال می‌شود. تا آن زمان مایکت و نسخه وب در دسترس‌اند و فوتر به راهنمای دانلود مستقیم می‌رود، نه URL فایل مفقود.

1. APK واقعی **release و امضاشده** اپ مشتریان را از پروژه اندروید بگیرید. package باید `com.khodrochare.app` باشد؛ اعتبار امضا، versionCode، مجوزها و ورود/درخواست را روی Android واقعی آزمایش کنید. برای بروزرسانی نصب قبلی، امضای سازگار لازم است؛ بسته debug یا APK با نام جعلی قرار ندهید.
2. فایل را قبل از build در مسیر بالا با نام دقیق `khodrochare-customer.apk` قرار دهید. نمونه فرمان از ریشه پروژه (مسیر فایل release را با فایل واقعی خودتان عوض کنید):

```sh
mkdir -p public/downloads
install -m 644 /path/to/signed-release.apk public/downloads/khodrochare-customer.apk
sha256sum public/downloads/khodrochare-customer.apk
npm ci --no-audit --no-fund
npm run build
```

3. فقط پس از build موفق، همان سرویس واقعی سایت را با مدیر پردازش موجود روی سرور restart کنید. فایل در build استاتیک برای فعال‌بودن دکمه بررسی می‌شود؛ صرفاً آپلود بعد از build برای تغییر HTML کافی نیست.
4. فایل APK باید در runtime نیز در `public/downloads` باشد. در Docker/standalone پوشه public را به لایه اجرایی کپی یا volume دانلودها را در build و runtime mount کنید. اگر build و runtime جدا هستند، هر دو باید فایل را داشته باشند.
5. APKها عمداً از Git خارج‌اند؛ `git push` فایل را به سرور منتقل نمی‌کند. در هر deploy فایل را از فضای ماندگار نگهداری و کپی کنید؛ پوشه release موقت ممکن است در deploy بعد پاک شود.
6. پس از انتشار بررسی کنید:

```sh
curl -I https://khodrochare.ir/downloads/khodrochare-customer.apk
curl --fail --location https://khodrochare.ir/downloads/khodrochare-customer.apk -o /tmp/khodrochare-customer-downloaded.apk
sha256sum /tmp/khodrochare-customer-downloaded.apk
```

باید HTTP 200، فایل واقعی با checksum مطابق اصل، Content-Disposition حاوی attachment و X-Robots-Tag حاوی noindex دریافت شود؛ HTML صفحه خطا نباید به‌عنوان APK دانلود شود. صفحه `/app#downloads`، بنر اپ خانه و فوتر باید لینک مستقیم فعال داشته باشند. در صورت باقی‌ماندن HTML قدیمی فقط cache لازم در CDN را پاک و دوباره بررسی کنید.

## ایمنی
فایل غیرخالی بودن فقط شرط نمایش است، نه تأیید صحت Android/امضا. حفاظت دستگاه یا Play Protect را خاموش نکنید. نام فایل لینک ثابت است و cache کوتاه دارد؛ برای نسخه بعد نیز صحت دانلود/امضا را کنترل کنید. نصب روی iPhone با APK ممکن نیست؛ نسخه وب/Safari مسیر جداست.
