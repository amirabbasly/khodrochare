# Cloudflare، تم دارک، فایل نصب و بررسی سرور

## تغییر کد

- CSP به‌صورت محدود اجازه بارگیری `https://static.cloudflareinsights.com` و ارسال telemetry به `https://cloudflareinsights.com` می‌دهد. مجوز عمومی script-src https: یا * اضافه نشده و سایر محدودیت‌ها حفظ شده‌اند.
- خطای مسدودشدن beacon به‌تنهایی علت کندی HTML یا تصویر اصلی نیست؛ بدون مقایسه زمان مبدأ و لبه، بهبود سرعت ادعا نمی‌شود.
- تم فقط دارک، در HTML سرور، بدون اسکریپت بازیابی localStorage و بدون سوییچ است. ذخیره قبلی light یا تم سیستم آن را روشن نمی‌کند. این تغییر سایت معرفی است؛ کد اپ‌های مستقل app و safir در این مخزن نیست.
- دانلود Android در `/app#downloads` و `/safir#downloads` اضافه شده؛ تا وجود فایل غیرخالی در زمان build، دکمه غیرفعال و نسخه وب جایگزین است. URL شکسته یا APK ساختگی منتشر نشده است.
- فایل‌های دانلود با attachment، noindex و کش کوتاه ارائه می‌شوند؛ فایل نسخه‌دار immutable نیست چون نام فعلی ثابت است.

## ۱. Cloudflare را یک‌باره کنار نگذارید

دسترسی پنل Cloudflare یا سرور در این محیط موجود نیست؛ تنظیم DNS/WAF/Proxy از داخل کد Next تغییر نمی‌کند.

ابتدا تأخیر را از چند شبکه، با و بدون VPN، در یک زمان مقایسه کنید. DNS-only کردن رکورد وب، IP مبدأ را آشکار و حفاظت/کش پروکسی را حذف می‌کند. اگر فایروال فقط IPهای Cloudflare را مجاز کرده یا origin certificate فقط در مسیر Cloudflare معتبر است، DNS-only می‌تواند سایت را از دسترس خارج کند یا خطای گواهی بدهد. به تنظیمات ساب‌دامنه‌های app، safir و API بدون دلیل دست نزنید.

اگر فقط beacon لازم نیست، تنظیم تزریق Cloudflare Web Analytics/Browser Insights را بررسی و در صورت تمایل همان را غیرفعال کنید؛ لازم نیست به این علت حفاظت کلی خاموش شود. اگر Rocket Loader روشن است و خطا یا تأخیر hydration مشاهده می‌شود، می‌توان آن را جداگانه برای تست خاموش و اثر را مقایسه کرد؛ این تنظیم معادل خاموش‌کردن DDoS نیست.

برای 403، 429، challenge یا درخواست ناموفق API، رویداد متناظر را در Security Events با زمان و Ray ID پیدا کنید؛ استثنا باید حداقلی و برای قانون/مسیر واقعاً مشکل‌دار باشد، نه bypass کل دامنه. از cache کردن HTML شخصی، حساب، OTP یا API خودداری کنید.

پس از deploy/restart، با GET هدر واقعی را بررسی کنید:

```bash
curl -sS -D - -o /dev/null https://khodrochare.ir/ | grep -iE 'HTTP/|content-security-policy|cf-cache-status|cf-ray|server:'
```

اگر CSP دیگری از Nginx، پنل هاست یا Cloudflare ارسال می‌شود، آن هم باید اجازه لازم را داشته باشد؛ چند CSP با هم محدودکننده‌اند، یک هدر مجاز، هدر سخت‌گیر دیگر را خنثی نمی‌کند. در صورت HTML کش‌شده، فقط URLهای لازم را purge کنید و دوباره بررسی کنید. اگر اصلاً آمار Cloudflare نمی‌خواهید، تزریقش را غیرفعال کنید؛ مجازبودن origin در CSP به‌خودی‌خود beacon اضافه نمی‌کند.

## ۲. محل APK

بله، در اجرای معمول `next start` فایل در public قرار می‌گیرد. این‌ها دو اپ جدا هستند؛ APK امضاشده هرکدام را از پروژه مربوط تهیه کنید. این مخزن فایل Android تولید نمی‌کند و وجود نسخه وب به معنی وجود APK نیست.

```text
public/downloads/khodrochare-customer.apk
public/downloads/khodrochare-safir.apk
```

آدرس‌های نهایی:

```text
https://khodrochare.ir/downloads/khodrochare-customer.apk
https://khodrochare.ir/downloads/khodrochare-safir.apk
```

`public` در URL نوشته نمی‌شود. در iPhone فایل APK نصب نمی‌شود؛ نسخه وب/Safari مسیر مناسب است.

ترتیب انتشار:

1. روی Android واقعی اعتبار بسته، امضای انتشار، نسخه، مجوزها و ورود/اتصال به backend را تست کنید. فایل debug یا فایلی با نام اپ اشتباه قرار ندهید. Play Protect را خاموش نکنید.
2. دو فایل را قبل از build در مسیرهای بالا کپی کنید. chmod 644 برای فایل کافی است؛ از 777 استفاده نکنید.
3. `npm ci && npm run build` و سپس restart همان process واقعی سایت. build موفق را شرط restart بگذارید.
4. صفحه `/app#downloads` باید لینک فعال و حجم فایل را نشان دهد.
5. URL فایل را با HEAD و یک دانلود واقعی امتحان کنید و checksum را با نسخه اصلی مقایسه کنید:

```bash
curl -I https://khodrochare.ir/downloads/khodrochare-customer.apk
curl -I https://khodrochare.ir/downloads/khodrochare-safir.apk
sha256sum public/downloads/*.apk
```

انتظار: HTTP 200، Content-Length مطابق فایل، Content-Disposition: attachment و X-Robots-Tag: noindex, nofollow. MIME مناسب `application/vnd.android.package-archive` یا دانلود باینری `application/octet-stream` است، نه text/html. اگر Nginx مسیر public را مستقیم سرو می‌کند، هدرهای Next به آن پاسخ نمی‌رسند؛ هدرهای download را در همان لایه نیز تنظیم کنید. اگر پاسخ challenge/HTML است، رخداد امنیتی همان URL را بررسی کنید، نه اینکه WAF همه سایت را خاموش کنید.

APKها در Git نیستند؛ pull آن‌ها را دانلود نمی‌کند. در deployهای مبتنی بر پوشه نسخه جدید، فایل‌ها را در فضای ماندگار بیرون checkout نگه دارید و قبل از هر build به public کپی کنید. فایل حذف‌شده از دیسک بعد از build می‌تواند لینک شکسته ایجاد کند؛ فایل‌های فعال باید در مسیر سرو باقی بمانند. در Docker باید فایل در image یا volume صحیح باشد. در Next standalone، public خودکار در خروجی کپی نمی‌شود؛ آن را به `.next/standalone/public` نیز منتقل یا از لایه استاتیک درست سرو کنید. با تغییر موجودی فایل‌ها، build مجدد لازم است.

## ۳. بررسی CPU، RAM، دیسک و محدودیت کانتینر

روی خود سرور، از ریشه پروژه:

```bash
bash scripts/server-health.sh
```

اسکریپت snapshot منابع است، نه تست فشار؛ تنظیمات را عوض یا سرویس را restart نمی‌کند. آمار CPU/RAM محیط توسعه، وضعیت هاست واقعی را نشان نمی‌دهد. اگر ابزارها روی هاست اشتراکی مجاز نیستند، همین معیارها را از پنل هاست/پشتیبانی بخواهید. محدودیت cgroup ممکن است از RAM/CPU کل ماشین کمتر باشد.

خواندن نتایج:

- `uptime`: اگر load به‌طور مداوم از CPU قابل‌استفاده بالاتر است، صف CPU یا IO را بررسی کنید؛ یک نمونه لحظه‌ای کافی نیست.
- `free -h`: available مهم‌تر از free است. cache عادی لینوکس را با کمبود RAM اشتباه نگیرید.
- `vmstat 1 5`: سطر اول میانگین از boot است؛ سطرهای بعدی را ببینید. si/so مداوم یعنی swap فعال؛ wa بالا نشانه انتظار IO است و نیاز به بررسی بیشتر دارد.
- `df -h` و `df -i`: هم فضای دیسک هم inode باید جا داشته باشند. بالای ۸۵–۹۰٪ هشدار عملی است، نه قانون ثابت.
- افزایش `oom_kill` در memory.events یا OOM سیستم، کمبود حافظه/محدودیت کانتینر را نشان می‌دهد. Build می‌تواند مصرف موقت زیادی داشته باشد؛ زمان build و زمان سرو عادی را جدا بررسی کنید.
- `cpu.stat`: افزایش قابل‌توجه throttling هنگام کندی ممکن است محدودیت CPU پلن باشد.

مدیر سرویس را با کاربر واقعی آن بررسی کنید؛ نام process را حدس نزنید:

```bash
pm2 ls
pm2 monit
# سپس برای نام واقعی مشاهده‌شده:
# pm2 describe NAME
# pm2 logs NAME --lines 80 --nostream
```

روی systemd یا Docker از ابزار همان سرویس استفاده کنید. env، توکن، رمز، متن سفارش یا اطلاعات مشتری را در چت نفرستید. خروجی لاگ را قبل از اشتراک پاک‌سازی کنید.

برای خطاهای سیستم و Nginx، با دسترسی مجاز خود:

```bash
sudo nginx -t
sudo journalctl -k --since '1 hour ago' | grep -iE 'out of memory|oom|killed process'
sudo tail -n 80 /var/log/nginx/error.log
```

فایل لاگ و سرویس در هاست شما ممکن است مسیر دیگری داشته باشد. از پاک‌کردن cache، kill یا restartهای پی‌درپی به‌عنوان تست منابع استفاده نکنید.

## ۴. تشخیص اینکه کندی از کجاست

در Network مرورگر، Disable cache فقط برای آزمایش، سپس یک بار reload: زمان document، تصویر اصلی، JS، CSS، فونت و درخواست pending را جدا ببینید. HTML سریع و تصویر کند با HTML کند دو مسئله متفاوت‌اند.

از همان سرور، پورت واقعی Next را جایگزین کنید (۳۰۰۰ فقط مثال است):

```bash
curl --max-time 20 -sS -o /dev/null -H 'Host: khodrochare.ir' \
  -w 'code=%{http_code} connect=%{time_connect} ttfb=%{time_starttransfer} total=%{time_total}\n' \
  http://127.0.0.1:3000/

curl --max-time 20 -sS -o /dev/null \
  -w 'code=%{http_code} dns=%{time_namelookup} connect=%{time_connect} tls=%{time_appconnect} ttfb=%{time_starttransfer} total=%{time_total}\n' \
  https://khodrochare.ir/
```

این دو تست از سرور، فقط دو نقطه مسیر را جدا می‌کنند و تجربه کاربر ایرانی یا اثر Cloudflare را به‌تنهایی اثبات نمی‌کنند؛ درخواست عمومی را از شبکه کاربر هم تکرار کنید. تست اول از Next است و Nginx/TLS/Cloudflare را دور می‌زند. تست دوم تمام زنجیره و احتمال کش/challenge را شامل می‌شود؛ کد پاسخ و headers باید همراه زمان دیده شوند.

- Next محلی هم کند: منابع، build production، لاگ process و درخواست‌های backend را بررسی کنید.
- Next سریع، مسیر عمومی کند: Nginx/TLS، مسیر شبکه، DNS و قوانین/کش Cloudflare را تفکیک کنید؛ صرف اختلاف، تقصیر Cloudflare را ثابت نمی‌کند.
- HTML سریع ولی صفحه دیر قابل‌استفاده: حجم و اجرای JS، تصاویر، فونت‌ها و درخواست‌های خارجی را در waterfall بررسی کنید.

در production از `next start`/بیلد production استفاده کنید، نه `next dev`. افزایش تعداد worker بدون حساب RAM می‌تواند وضع را بدتر کند. از داده کاربران واقعی (CrUX/Search Console) برای LCP/INP/CLS کمک بگیرید؛ موفقیت build یا تعداد تست‌ها نمره سرعت واقعی نیست.

## QA این تحویل

- lint و production build موفق.
- ۱۲۵ تست واحد موفق، شامل CSP محدود و وضعیت فایل مفقود/خالی/موجود.
- ۳۴ تست مرورگر موفق در موبایل و دسکتاپ: دارک با ترجیح قبلی light، HTML بدون JS، کنترل‌های صفحه و دانلود غیرفعال بدون URL شکسته.
- ممیزی production SEO: ۴۷۵ صفحه، صفر خطا.
- APK واقعی ارائه نشده؛ دانلود/نصب Android، امضای فایل، اجرای beacon در شبکه واقعی، تنظیمات پنل Cloudflare و منابع هاست واقعی تست نشده‌اند. QA محلی معادل انتشار یا سنجش سرعت کاربر واقعی نیست.
