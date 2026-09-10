import Link from "next/link";
import { businessFacts } from "@/content/business";
import { BrandMark, Icon } from "@/components/home/home-ui";

const groups = [
  { title: "خدمات خودرو", links: [["راهنمای امداد خودرو", "/امداد-خودرو"], ["امداد خودرو آنلاین", "/امداد-خودرو-آنلاین"], ["امداد خودرو شمال", "/شمال"], ["امداد خودرو تهران", "/تهران"], ["امداد خودرو کرج", "/کرج"], ["امداد در محل", "/services/roadside-assistance"], ["یدک‌کش حمل خودرو", "/services/tow-truck"], ["کفی و خودروبر", "/services/flatbed-carrier"], ["باتری به باتری", "/services/jump-start"], ["کارواش سیار", "/services/mobile-carwash"], ["مکانیک سیار", "/services/mobile-mechanic"]] },
  { title: "راهنما و پشتیبانی", links: [["برندهای خودرو", "/brands"], ["قیمت و محاسبه هزینه", "/pricing"], ["محورهای شمال", "/roads"], ["همه خدمات", "/services"], ["محدوده پوشش", "/coverage"], ["دستیار هوشمند", "/assistant"], ["مجله خودرو چاره", "/blog"], ["اپلیکیشن", "/app"], ["فروشگاه", "/store"]] },
  { title: "اعتماد و قوانین", links: [["روش تدوین محتوا", "/editorial-policy"], ["حریم خصوصی", "/privacy"], ["درباره خودرو چاره", "/about"], ["تماس با ما", "/contact"], ["قوانین و مقررات", "/rules"], ["پرسش‌های متداول", "/#faq-title"], ["هماهنگی درخواست", "/امداد-خودرو-آنلاین#request"]] },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-[#031224] text-white">
      <div className="site-container grid gap-10 py-12 lg:grid-cols-[1.35fr_2.2fr_1fr]">
        <div><BrandMark compact /><p className="mt-4 max-w-sm text-xs leading-7 text-slate-400">خودرو چاره، مسیر ساده‌تر برای امداد خودرو و خدمات خودرو در محل؛ در تهران، کرج، گیلان، مازندران و گلستان.</p><a href="tel:09123022064" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand-orange px-4 text-xs font-black text-white shadow-orange" dir="ltr"><Icon name="phone" size={16} /> 09123022064</a></div>
        <div className="grid gap-8 sm:grid-cols-3">{groups.map((group) => <div key={group.title}><h2 className="text-sm font-black text-white">{group.title}</h2><nav className="mt-4 grid gap-3 text-xs text-slate-400" aria-label={group.title}>{group.links.map(([label, href]) => <Link key={href} href={href} className="transition hover:text-brand-orange">{label}</Link>)}</nav></div>)}</div>
        <div><h2 className="text-sm font-black text-white">ارتباط با ما</h2><div className="mt-4 grid gap-3 text-xs leading-6 text-slate-400"><a href="tel:09123022064" className="transition hover:text-white" dir="ltr">09123022064</a><a href="mailto:info@khodrochare.ir" className="transition hover:text-white">info@khodrochare.ir</a><span>پشتیبانی درخواست‌های امدادی<br />شبانه‌روزی در محدوده‌های فعال</span></div><nav className="mt-5 flex flex-wrap gap-2" aria-label="شبکه‌های اجتماعی خودرو چاره"><a href="https://www.instagram.com/khodrochare" target="_blank" rel="me noopener noreferrer" className="inline-flex min-h-11 items-center rounded-lg border border-white/15 bg-white/5 px-4 text-xs font-black text-slate-200 transition hover:border-brand-orange hover:text-white">اینستاگرام خودرو چاره</a><a href={businessFacts.baleUrl} target="_blank" rel="me noopener noreferrer" className="inline-flex min-h-11 items-center rounded-lg border border-white/15 bg-white/5 px-4 text-xs font-black text-slate-200 transition hover:border-brand-orange hover:text-white">کانال خودرو چاره در بله</a></nav><Link href="/contact" className="mt-5 inline-flex min-h-11 items-center text-xs font-bold text-orange-300">اطلاعات کسب‌وکار و راه پیگیری ←</Link></div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-[10px] text-slate-500">تمام حقوق برای خودرو چاره محفوظ است. <Link href="/rules" className="mr-2 text-slate-300 hover:text-white">قوانین و مقررات</Link></div>
    </footer>
  );
}
