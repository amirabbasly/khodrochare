# نقشه عملیات سئو خودرو چاره — درخواست ایندکس و برنامه رشد

تاریخ تهیه: ۱۴۰۴/۰۶/۱۴ (۵ سپتامبر ۲۰۲۶)
وضعیت سایت: ۱۰۰ URL در sitemap.xml

---

## بخش ۱ — درخواست ایندکس دستی در Search Console

> نکته مهم: اول مقدار `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` را در محیط پروداکشن ست کن و پراپرتی را تأیید کن. سپس `https://khodrochare.ir/sitemap.xml` را در بخش Sitemaps دوباره ارسال کن. درخواست دستی ایندکس (URL Inspection → Request Indexing) روزانه حدود ۸ تا ۱۲ مورد انجام شود؛ بیشتر از آن فایده‌ای ندارد. بقیه صفحات از مسیر سایت‌مپ و لینک‌های داخلی خودشان خزیده می‌شوند.

### اولویت صفر — روزهای ۱ تا ۲ (مهم‌ترین صفحات پولی/جدید)

```
https://khodrochare.ir/
https://khodrochare.ir/cost-calculator
https://khodrochare.ir/brands
https://khodrochare.ir/تهران
https://khodrochare.ir/کرج
https://khodrochare.ir/تهران/امداد-خودرو
https://khodrochare.ir/تهران/یدک-کش
https://khodrochare.ir/pricing
https://khodrochare.ir/brands/iran-khodro
https://khodrochare.ir/brands/saipa
https://khodrochare.ir/brands/toyota
https://khodrochare.ir/تهران/سعادت-آباد
```

### اولویت یک — روزهای ۳ تا ۶ (برندها + محله‌های پربازدید)

```
https://khodrochare.ir/brands/modiran-khodro
https://khodrochare.ir/brands/kerman-motor
https://khodrochare.ir/brands/bahman-motor
https://khodrochare.ir/brands/hyundai
https://khodrochare.ir/brands/kia
https://khodrochare.ir/brands/nissan
https://khodrochare.ir/brands/renault
https://khodrochare.ir/brands/bmw
https://khodrochare.ir/brands/mercedes-benz
https://khodrochare.ir/تهران/تهرانپارس
https://khodrochare.ir/تهران/ستارخان
https://khodrochare.ir/تهران/نارمک
https://khodrochare.ir/تهران/صادقیه
https://khodrochare.ir/تهران/پونک
https://khodrochare.ir/تهران/زعفرانیه
https://khodrochare.ir/تهران/خودروبر
https://khodrochare.ir/تهران/مکانیک-سیار
https://khodrochare.ir/کرج/امداد-خودرو
https://khodrochare.ir/کرج/یدک-کش
https://khodrochare.ir/کرج/گوهردشت
https://khodrochare.ir/کرج/مهرشهر
```

### اولویت دو — هفته دوم (بقیه محله‌ها، شهرهای فاز دوم، خدمات کرج)

```
https://khodrochare.ir/تهران/نیاوران
https://khodrochare.ir/تهران/پاسداران
https://khodrochare.ir/تهران/ونک
https://khodrochare.ir/تهران/شهرک-غرب
https://khodrochare.ir/تهران/جنت-آباد
https://khodrochare.ir/تهران/امیرآباد
https://khodrochare.ir/تهران/نازی-آباد
https://khodrochare.ir/کرج/عظیمیه
https://khodrochare.ir/کرج/فردیس
https://khodrochare.ir/کرج/خودروبر
https://khodrochare.ir/کرج/مکانیک-سیار
https://khodrochare.ir/کرج/باتری-خودرو
https://khodrochare.ir/قم
https://khodrochare.ir/اصفهان
https://khodrochare.ir/قزوین
```

### اولویت سه — باقی‌مانده (خودکار هم ایندکس می‌شوند؛ فقط در صورت فرصت)

```
https://khodrochare.ir/تهران/شمال-تهران
https://khodrochare.ir/تهران/شرق-تهران
https://khodrochare.ir/تهران/غرب-تهران
https://khodrochare.ir/تهران/مرکز-تهران
https://khodrochare.ir/تهران/جنوب-تهران
https://khodrochare.ir/تهران/باتری-خودرو
https://khodrochare.ir/تهران/پنچرگیری-سیار
https://khodrochare.ir/تهران/دیاگ-سیار
https://khodrochare.ir/تهران/کارواش-سیار
https://khodrochare.ir/تهران/سوخت-رسانی-اضطراری
https://khodrochare.ir/کرج/پنچرگیری-سیار
https://khodrochare.ir/کرج/دیاگ-سیار
https://khodrochare.ir/کرج/کارواش-سیار
https://khodrochare.ir/کرج/سوخت-رسانی-اضطراری
https://khodrochare.ir/services
+ همه صفحات /services/* (۱۲ صفحه)
+ همه مقالات /blog/* (۱۸ مقاله)
+ /coverage — /about — /contact — /app — /assistant — /rules
```

---

## بخش ۲ — کارهای تکنیکال بعد از دیپلوی (همان روز اول)

1. تأیید پراپرتی GSC با متغیر `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` و ارسال مجدد sitemap.xml
2. ثبت Bing Webmaster Tools (ایمپورت از GSC، دو دقیقه کار است)
3. تست اسکیماها در Rich Results Test برای الگوهای زیر (هر الگو یک بار):
   - صفحه اصلی، `/brands/toyota`، `/cost-calculator`، `/تهران/زعفرانیه`، `/تهران/یدک-کش`
4. تست سرعت موبایل با PageSpeed Insights برای صفحه اصلی و یک صفحه سنگین (مثلاً `/تهران/سعادت-آباد`)
5. ریریکتها را دستی چک کن: `http://khodrochare.ir` و `https://www.khodrochare.ir` باید ۳۰۱ به `https://khodrochare.ir` بروند
6. ساخت **پروفایل کسب‌وکار گوگل (Google Business Profile)** با نام، شماره و آدرس دقیقاً یکسان با سایت (NAP). اگر آدرس واقعی دارید مهم‌ترین قدم برای کوئری‌های محلی است.

---

## بخش ۳ — بک‌لینک‌سازی (مسئولیت شما) — برنامه هفتگی

هدف ماه اول: ۱۵ تا ۲۵ ارجاع باکیفیت، طبیعی و متنوع — نه انبوه.

### لایه ۱: سیت‌ایشن‌ها و دایرکتوری‌ها (امن، هفته اول)
- Google Business Profile (لینک به صفحه اصلی)
- ثبت کسب‌وکار در نقشه‌های نشان و بلد (بخش کسب‌وکارها)
- صفحه برند در «بهتارینو» و دایرکتوری‌های مشابه خدمات محلی
- آگهی خدمات در دیوار و شیپور (ترافیک واقعی + سیگنال محلی، حتی اگر لینک nofollow باشد)
- پروفایل در شبکه‌های اجتماعی: اینستاگرام (موجود)، آپارات، تلگرام، لینکدین — و بعد از ساخته‌شدن، هندل‌ها را بدهید تا به `sameAs` اسکیمای سایت اضافه شوند

### لایه ۲: ریپورتاژ و گزارش خبری (هفته‌های ۲ تا ۵)
- ۴ تا ۶ ریپورتاژ آگهی در رسانه‌های خودرویی/خبری فارسی میان‌رده تا خوب
- موضوع‌ها: «امداد خودرو آنلاین چیست؟»، «خودرو چاره سرویس امداد آنلاین تهران و کرج را راه‌اندازی کرد»، «راهنمای هزینه یدک‌کش»
- مقصد لینک‌ها را متنوع کن: صفحه اصلی، `/cost-calculator`، یک مقاله بلاگ

### لایه ۳: لینک ارگانیک (ماه دوم به بعد)
- دعوت وبلاگ‌نویسها/اینستاگرامرهای خودرویی به تست ابزار محاسبه هزینه یا دستیار هوشمند و گزارش تجربه
- پاسخ تخصصی در انجمن‌ها و وبسایت‌های پرسش‌وپاسخ خودرویی با لینک راهنمای مرتبط
- ایجاد محتوای مرجع (آمار قیمت امداد در تهران، چک‌لیست PDF) که خودش لینک بگیرد

### قواعد انکورتکست (حیاتی)
- ~۵۰٪ برند: «خودرو چاره»، «khodrochare.ir»، «سایت خودرو چاره»
- ~۲۵٪ نیمه‌دقیق: «امداد خودرو آنلاین خودرو چاره»، «ثبت درخواست امداد خودرو آنلاین»
- ~۱۰٪ دقیق: «امداد خودرو آنلاین»
- ~۱۵٪ عمومی/URL: کلیک کنید، این لینک، آدرس خام

### خط‌قرمزها
- هیچ بک‌لینک فروشگاهی انبوه (هزارتا یک‌جا) نخر
- انکور دقیق را در همه ریپورتاژها تکرار نکن
- PBN و کامنت‌اسپم نه

---

## بخش ۴ — محتوا و نگه‌داشت (هفتگی)

- هفته‌ای ۱ تا ۲ مقاله جدید در `src/content/blog.ts` هدف‌گذاری لانگ‌تیل: «هزینه یدک‌کش تهران به کرج»، «باتری خودرو در پارکینگ روشن نمی‌شود»، «تفاوت یدک‌کش و خودروبر برای خودروی اتوماتیک»
- هر مقاله باید به ۲ تا ۳ صفحه محله یا برند مرتبط لینک داخلی بدهد
- هر ماه lastmod سایت‌مپ برای صفحاتی که واقعاً تغییر کرده‌اند به‌روز شود (فایل `src/app/sitemap.ts`)

## بخش ۵ — پایش (GSC)

- هفتگی کوئری‌ها را چک کن: «امداد خودرو آنلاین»، «امداد خودرو تهران»، «یدک کش تهران»، «امداد خودرو {برند}»
- شاخص‌های سلامت: صفحات ایندکس‌شده باید کم‌کم به ۱۰۰ برسد؛ CTR صفحات برند و محله را زیر نظر داشته باش
- اگر صفحه‌ای بعد از ۲ هفته ایندکس نشد: URL Inspection → مشکل را ببین (معمولاً خزش نشده = خوب، صبر)
