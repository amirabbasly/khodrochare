import Link from "next/link";
import Image from "next/image";
import { BrandMark, Icon } from "@/components/home/home-ui";

const groups = [
  { title: "خدمات خودرو", links: [["امداد خودرو تهران", "/تهران"], ["امداد خودرو کرج", "/کرج"], ["امداد در محل", "/services/roadside-assistance"], ["یدک‌کش حمل خودرو", "/services/tow-truck"], ["کفی و خودروبر", "/services/flatbed-carrier"], ["باتری به باتری", "/services/jump-start"], ["کارواش سیار", "/services/mobile-carwash"], ["مکانیک سیار", "/services/mobile-mechanic"]] },
  { title: "راهنما و پشتیبانی", links: [["همه خدمات", "/services"], ["محدوده پوشش", "/coverage"], ["دستیار هوشمند", "/assistant"], ["مجله خودرو چاره", "/blog"], ["اپلیکیشن", "/app"], ["فروشگاه", "/store"]] },
  { title: "اعتماد و قوانین", links: [["درباره خودرو چاره", "/about"], ["تماس با ما", "/contact"], ["قوانین و مقررات", "/rules"], ["پرسش‌های متداول", "/#faq-title"], ["ثبت درخواست", "/#request"]] },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-[#031224] text-white">
      <div className="site-container grid gap-10 py-12 lg:grid-cols-[1.35fr_2.2fr_1fr]">
        <div><BrandMark compact /><p className="mt-4 max-w-sm text-xs leading-7 text-slate-400">خودرو چاره، مسیر ساده‌تر برای امداد خودرو و خدمات خودرو در محل؛ با تمرکز فعلی روی تهران و کرج.</p><a href="tel:09123022064" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand-orange px-4 text-xs font-black text-white shadow-orange" dir="ltr"><Icon name="phone" size={16} /> 09123022064</a></div>
        <div className="grid gap-8 sm:grid-cols-3">{groups.map((group) => <div key={group.title}><h2 className="text-sm font-black text-white">{group.title}</h2><nav className="mt-4 grid gap-3 text-xs text-slate-400" aria-label={group.title}>{group.links.map(([label, href]) => <Link key={href} href={href} className="transition hover:text-brand-orange">{label}</Link>)}</nav></div>)}</div>
        <div><h2 className="text-sm font-black text-white">ارتباط با ما</h2><div className="mt-4 grid gap-3 text-xs leading-6 text-slate-400"><a href="tel:09123022064" className="transition hover:text-white" dir="ltr">09123022064</a><a href="mailto:info@khodrochare.ir" className="transition hover:text-white">info@khodrochare.ir</a><span>پشتیبانی درخواست‌های امدادی<br />شبانه‌روزی در تهران و کرج</span></div><div className="mt-5 flex items-stretch gap-2" aria-label="مجوزهای خودرو چاره"><span className="flex h-24 w-20 items-center justify-center rounded-xl bg-white p-2"><Image src="/images/enamad.png" alt="نماد اعتماد الکترونیکی خودرو چاره" width={125} height={136} className="max-h-20 w-auto object-contain" /></span><span className="flex h-24 w-20 items-center justify-center rounded-xl bg-white p-2"><Image src="/images/e-cer.webp" alt="مجوز اتحادیه کشوری کسب‌وکارهای مجازی خودرو چاره" width={168} height={222} className="max-h-20 w-auto object-contain" /></span></div></div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-[10px] text-slate-500">تمام حقوق برای خودرو چاره محفوظ است. <Link href="/rules" className="mr-2 text-slate-300 hover:text-white">قوانین و مقررات</Link></div>
    </footer>
  );
}
