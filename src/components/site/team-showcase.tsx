import { StructuredData } from "@/components/seo/structured-data";
import { personSchema } from "@/seo/schemas";
import Image from "next/image";
import Link from "next/link";
import { businessFacts } from "@/content/business";

function Portrait({ name, image }: { name: string; image?: string }) {
  return image ? <Image src={image} alt={name} fill sizes="(min-width:1024px) 240px,45vw" className="object-cover" /> : <div className="flex h-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-slate-700 to-[#0b1731] px-4 text-center"><svg viewBox="0 0 64 64" className="h-20 w-20 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="32" cy="21" r="12" /><path d="M9 59v-5a23 23 0 0 1 46 0v5" /></svg><span className="text-xs text-slate-300">تصویر رسمی هنوز منتشر نشده است</span></div>;
}
export function TeamShowcase() {
  return <section className="team-showcase site-container py-12 md:py-16" dir="rtl" aria-labelledby="team-title">
    {businessFacts.team.map(member => <StructuredData key={member.name} data={personSchema({ ...member, path: "/team" })} />)}
    <div className="text-center"><p className="text-xs font-bold text-orange-300">آشنایی با همکاران مجموعه</p><h2 id="team-title" className="mt-3 text-2xl font-black text-white md:text-3xl">خانواده خودرو چاره</h2></div>
    <article className="team-director mx-auto mt-10 grid max-w-4xl gap-6 rounded-2xl border border-white/15 bg-[#0b2d6b]/40 p-5 md:grid-cols-[1fr_220px] md:gap-10 md:p-8">
      <div className="self-center"><p className="text-xs text-orange-300">مدیریت مجموعه</p><h3 className="mt-4 text-2xl font-black text-white">{businessFacts.managingDirector}</h3><p className="mt-2 font-bold text-slate-200">مدیرعامل {businessFacts.legalName}</p><p className="mt-5 text-sm leading-8 text-slate-300">خودرو چاره با همراهی تیم فنی، عملیات و پشتیبانی، مسیر هماهنگی خدمات خودرو را دنبال می‌کند. برای ارتباط رسمی با مدیریت و پیگیری موضوعات مجموعه از مسیر تماس با ما استفاده کنید.</p><Link href="/contact" className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-brand-orange px-5 text-xs font-black text-white">ارتباط با مجموعه</Link></div><div className="team-director-portrait relative h-64 overflow-hidden rounded-xl md:h-72"><Portrait name={businessFacts.managingDirector} /></div>
    </article>
    <div className="team-members mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{businessFacts.team.map(member => <article key={member.name} className="overflow-hidden rounded-2xl border border-white/15 bg-[#0d1e3b] p-3"><div className="team-member-portrait relative h-64 overflow-hidden rounded-xl"><Portrait name={member.name} image={member.image} /><span className="absolute bottom-3 right-3 rounded-full bg-brand-orange px-3 py-1 text-[10px] font-bold text-white">تیم خودرو چاره</span></div><div className="px-2 py-4 text-center"><h3 className="text-sm font-black text-white">{member.name}</h3><p className="mt-2 text-xs text-orange-300">{member.role}</p><p className="mt-3 text-xs leading-7 text-slate-300">{member.bio}</p></div></article>)}</div>
  </section>;
}
