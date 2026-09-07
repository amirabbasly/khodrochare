import { editorialUpdatedAt, editorialUpdatedLabel } from "@/content/editorial-types";
import { localServiceGuides, serviceKnowledge } from "@/content/service-knowledge";
import { SourceList } from "./editorial-content";
import { LinkGrid, Section } from "./landing-ui";
export function ServiceKnowledgeSection({ slug }: { slug: string }) {
  const guide = serviceKnowledge[slug];
  if (!guide) return null;
  return <Section title={guide.title}><div data-testid="service-knowledge">{guide.paragraphs.map((paragraph) => <p key={paragraph} className="mt-3">{paragraph}</p>)}<div className="mt-5 overflow-x-auto rounded-xl border border-slate-200"><table className="w-full min-w-[440px] text-right text-sm leading-7"><caption className="bg-slate-50 p-3 text-right font-bold">اطلاعات مفید پیش از هماهنگی</caption><thead className="bg-slate-100"><tr><th scope="col" className="p-3">موضوع</th><th scope="col" className="p-3">چرا اهمیت دارد؟</th></tr></thead><tbody>{guide.checks.map((check) => <tr key={check.item} className="border-t border-slate-100"><th scope="row" className="p-3 font-bold">{check.item}</th><td className="p-3">{check.reason}</td></tr>)}</tbody></table></div><div className="mt-5"><LinkGrid links={guide.links} /></div><p className="mt-4 text-xs text-slate-500">تهیه و تنظیم: تحریریه خودرو چاره · به‌روزرسانی: <time dateTime={editorialUpdatedAt}>{editorialUpdatedLabel}</time></p>{guide.sources && <SourceList sources={guide.sources} />}</div></Section>;
}
export function LocalServiceKnowledge({ path }: { path: string }) {
  const guide = localServiceGuides[path];
  if (!guide) return null;
  return <Section title={guide.title}><div data-testid="local-service-knowledge">{guide.paragraphs.map((paragraph) => <p key={paragraph} className="mt-3">{paragraph}</p>)}<div className="mt-5"><LinkGrid links={guide.links} /></div><p className="mt-4 text-xs text-slate-500">به‌روزرسانی راهنمای محلی: <time dateTime={editorialUpdatedAt}>{editorialUpdatedLabel}</time></p></div></Section>;
}
