import { roadDispatchDepth } from "@/content/road-dispatch-depth";
import { LinkGrid, Section } from "./landing-ui";
export function RoadDispatchDepth({ slug }: { slug: string }) {
  const depth = roadDispatchDepth[slug];
  if (!depth) return null;
  return <>
    {depth.sections.map(section => <Section key={section.title} title={section.title}><p>{section.body}</p></Section>)}
    <Section title="تعمیر در محل، انتقال اضطراری یا حمل تا تعمیرگاه؟"><div className="grid gap-4 md:grid-cols-3">{[
      ["بررسی خدمت در محل", "خرابی محدود، سطح محکم و فضای کار ایمن؛ وجود زاپاس، قطعه یا ابزار لازم قبل از اعزام بررسی شود. نتیجه بررسی می‌تواند به حمل منتهی شود."],
      ["ابتدا خروج از موقعیت خطرناک", "توقف در باند، تونل یا شانه نامناسب؛ ایمن‌سازی و هماهنگی با مسئولان مسیر مقدم بر عیب‌یابی طولانی است. در خطر فوری با خدمات اضطراری تماس بگیرید."],
      ["حمل به مرکز پذیرش مشخص", "ایراد اساسی، نیاز به ابزار تخصصی یا شرایط ضمانت؛ مقصد، روش بارگیری و هزینه کامل با مالک توافق شود. نام برند برای تعیین روش حمل کافی نیست."],
    ].map(([title, body]) => <article key={title} className="rounded-xl border border-slate-200 bg-white/60 p-4"><h3 className="font-black text-ink">{title}</h3><p className="mt-2">{body}</p></article>)}</div></Section>
    <Section title="ادامه مسیر، مدل خودرو و پیگیری خدمت"><LinkGrid links={[...depth.links, { title: "انتخاب وسیله حمل متناسب با خودرو", href: "/tools/transport-selector" }, { title: "بررسی نشانه خرابی پیش از درخواست", href: "/tools/breakdown-guide" }, { title: "مجوزها و هویت ارائه‌دهنده خدمت", href: "/licenses" }]} /></Section>
  </>;
}
