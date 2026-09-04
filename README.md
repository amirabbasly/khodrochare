# خودرو چاره — khodrochare.ir

سایت رسمی خودرو چاره؛ سامانه امداد خودرو آنلاین و خدمات خودرو در محل (تهران و کرج).
پروژه با **Next.js 16 (App Router)**، **React 19** و **Tailwind CSS 4** ساخته شده و صفحات به‌صورت ایستا (SSG) رندر می‌شوند.

## اجرا

```bash
npm install
npm run dev      # محیط توسعه روی http://localhost:3000
npm run build    # بیلد پروداکشن
npm start        # اجرای بیلد
npm run lint     # ESLint
npm run og:images  # ساخت تصاویر اشتراک‌گذاری ۱۲۰۰×۶۳۰ (JPEG) از تصاویر محتوا
```

## متغیرهای محیطی

| متغیر | کاربرد |
| --- | --- |
| `NEXT_PUBLIC_GA_ID` | شناسه GA4. تنها در صورت ست‌بودن، اسکریپت گوگل آنالیتیکس لود می‌شود. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | مقدار متا-تگ تأیید Google Search Console. |
| `OPENAI_API_KEY` (یا کلید سرویس دستیار) | استفاده در `/api/chat` برای دستیار هوشمند. |

## ساختار پوشه‌ها

```
src/app          صفحات App Router + robots.ts, sitemap.ts, manifest.ts, blog/feed.xml
src/components   کامپوننت‌های سایت (home, site, seo, store, assistant)
src/content      محتوای ساخت‌یافته: خدمات، مقالات، پرسش‌های متداول، اطلاعات کسب‌وکار
src/seo          متادیتا، اسکیما، کلیدواژه‌ها، شهرها/مناطق و لینک‌سازی داخلی
scripts          اسکریپت‌های کمکی (تولید تصاویر OG)
deploy/nginx     کانفیگ Nginx پروداکشن
docs             مستندات، از جمله گزارش کامل سئو
```

## نکات سئو

* همه متادیتای صفحات از `src/seo/metadata.ts` (`seoMetadata()`) ساخته می‌شود تا canonical، Open Graph و Twitter Card همیشه هماهنگ باشند.
* آدرس‌های فارسی همه‌جا (canonical، sitemap، JSON-LD) Percent-encode می‌شوند.
* داده‌های ساخت‌یافته در `src/seo/schemas.ts` متمرکز است: LocalBusiness، WebSite، WebPage، Service، Article، BreadcrumbList، FAQPage و ItemList.
* تصاویر اشتراک‌گذاری در `public/images/og/*.jpg` نگهداری می‌شوند؛ بعد از افزودن تصویر جدید به محتوا، `npm run og:images` را اجرا کنید.
* گزارش کامل ممیزی و چک‌لیست اقدامات بیرون از کد: [`docs/seo-audit.md`](docs/seo-audit.md)
