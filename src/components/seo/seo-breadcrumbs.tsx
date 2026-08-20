import Link from "next/link";

export function SeoBreadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return <nav aria-label="مسیر صفحه" className="mb-5 flex flex-wrap items-center gap-2 text-xs text-slate-400" dir="rtl">{items.map((item, index) => <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">{index > 0 && <span aria-hidden="true">←</span>}{item.href ? <Link href={item.href} className="transition hover:text-brand-orange">{item.label}</Link> : <span className="font-bold text-slate-600">{item.label}</span>}</span>)}</nav>;
}
