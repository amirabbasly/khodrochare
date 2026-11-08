export default function Loading() {
  return <div className="page-skeleton site-container py-10" role="status" aria-live="polite" aria-busy="true">
    <span className="sr-only">در حال بارگذاری صفحه…</span>
    <div aria-hidden="true">
      <div className="skeleton-block mb-6 h-5 w-40 rounded-full" />
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div className="space-y-5"><div className="skeleton-block h-12 w-4/5 rounded-xl" /><div className="skeleton-block h-5 w-full rounded-lg" /><div className="skeleton-block h-5 w-3/4 rounded-lg" /><div className="skeleton-block h-12 w-44 rounded-xl" /></div>
        <div className="skeleton-block aspect-[16/10] rounded-3xl" />
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{[0, 1, 2].map(i => <div key={i} className="skeleton-block h-48 rounded-2xl" />)}</div>
    </div>
  </div>;
}
