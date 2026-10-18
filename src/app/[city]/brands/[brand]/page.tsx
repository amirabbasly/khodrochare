import { notFound } from "next/navigation";
import { brandModelGuides, brandProfiles, findBrand } from "@/content/brands";
import { assistanceRegions, findAssistanceRegion, regionalBrandPath } from "@/content/assistance-regions";
import { decodeRouteParam } from "@/seo/route-params";
import { seoMetadata } from "@/seo/metadata";
import { SubpageShell } from "@/components/site/subpage-shell";
import { AnswerBox, FinalContact, LandingHeader, LandingSchemas, LinkGrid, PriceFactors, Questions, SafetyNote, Section } from "@/components/seo/landing-ui";
export const dynamicParams = false;
export function generateStaticParams() { return assistanceRegions.flatMap(region => brandProfiles.map(brand => ({ city: region.slug, brand: brand.slug }))); }
async function resolve(params: Promise<{ city: string; brand: string }>) {
  const value = await params;
  const region = findAssistanceRegion(decodeRouteParam(value.city));
  const brand = findBrand(decodeRouteParam(value.brand));
  if (!region || !brand) notFound();
  return { region, brand, path: regionalBrandPath(region.slug, brand.slug), title: `امداد خودرو ${brand.name} ${region.name}` };
}
export async function generateMetadata({ params }: { params: Promise<{ city: string; brand: string }> }) {
  const { region, brand, path, title } = await resolve(params);
  return seoMetadata({ title: `${title} | مکانیک سیار و حمل ایمن`, description: `راهنمای خدمات مستقل ${brand.name} در ${region.name}؛ ${brand.models.slice(0, 3).join("، ")}، عیب‌یابی، باتری، انتخاب خودروبر و شرایط دسترسی و هزینه.`, path });
}
export default async function Page({ params }: { params: Promise<{ city: string; brand: string }> }) {
  const { region, brand, path, title } = await resolve(params);
  return <SubpageShell>
    <LandingSchemas path={path} title={title} description={`${region.intro} ${brand.preparation}`} area={region.name} areaType={region.areaType} crumbs={[{ name: `امداد ${region.name}`, path: `/${region.slug}` }, { name: "برندهای خودرو", path: `/${region.slug}/brands` }]} />
    <LandingHeader title={title} intro={`${region.intro} برای ${brand.name}، مدل، سال و نوع گیربکس را همراه موقعیت اعلام کنید تا امکان خدمت و تجهیزات بررسی شود.`} crumbs={[{ label: region.name, href: `/${region.slug}` }, { label: "برندها", href: `/${region.slug}/brands` }, { label: brand.name }]} />
    <AnswerBox updatedAt={{ iso: "2026-10-18", label: "۲۶ مهر ۱۴۰۵" }}><p>برای هماهنگی {title} با 09123022064 تماس بگیرید. عیب‌یابی در محل، بررسی باتری و تایر یا حمل متناسب با وضعیت خودرو هماهنگ می‌شود؛ موجودی قطعه، ابزار اختصاصی و امکان اعزام به نقطه دقیق باید تأیید شود. خودرو چاره نمایندگی رسمی {brand.name} نیست.</p></AnswerBox>
    <Section title={`دسترسی امداد ${brand.name} در ${region.name}`}><p>{region.access}</p><p>مدل‌های {brand.models.join("، ")} مشخصات یکسانی ندارند. ظرفیت وسیله حمل، روش آزادسازی چرخ و انتخاب ابزار از روی برند به‌تنهایی تعیین نمی‌شود؛ اطلاعات تیپ و سال ساخت را از مدارک خودرو بخوانید.</p><LinkGrid links={region.links} /></Section>
    <Section title={`عیب‌یابی ${brand.name}؛ چه علائمی را گزارش کنیم؟`}><p>{brand.diagnosis}</p><p>زمان شروع ایراد، ثابت یا مقطعی‌بودن آن، چراغ هشدار و آخرین تعمیر را یادداشت کنید. پاک‌کردن کد خطا پیش از ثبت آن یا تعویض قطعه صرفاً بر اساس یک کد، بررسی علت را دشوار می‌کند. در چراغ فشار روغن، اختلال ترمز، دود یا نشت سوخت ادامه حرکت را راه‌حل فرض نکنید؛ ایمنی محل و ارزیابی متخصص مقدم‌اند.</p></Section>
    <Section title={`${region.scenario}؛ تصمیم برای ${brand.name}`}><p>{region.response}</p><p>{brand.preparation}</p></Section>
    <Section title={`باتری و برق ${brand.name} در ${region.name}`}><p>{brand.electrical}</p><p>محل باتری و نقاط اتصال مجاز در همه تیپ‌ها یکسان نیست. عکس برچسب باتری و مشخصات دقیق خودرو به انتخاب قطعه کمک می‌کند؛ اتصال کمکی فقط با رعایت دستور همان مدل و توسط فرد آگاه انجام شود. در باتری آسیب‌دیده یا نشتی‌دار از راه‌اندازی آزمایشی خودداری کنید. در مدل هیبریدی، مدار ولتاژ بالا با باتری کم‌ولتاژ یکی نیست و نباید دستکاری شود.</p></Section>
    <Section title={`حمل ${brand.name}؛ کفی، چرخ‌گیر و محدودیت‌ها`}><p>{brand.transport}</p><p>{region.handover}</p><p>پیش از بارگیری وضعیت بدنه و چرخ‌ها را ثبت کنید، وسایل شخصی را بردارید و کلید و مدارک موردنیاز تحویل را هماهنگ کنید. وجود بیمه، حدود مسئولیت حمل و هزینه بارگیری ویژه را صریح بپرسید؛ از متن این صفحه نباید پوشش بیمه یا روش حمل تضمینی برداشت کرد.</p><LinkGrid links={region.roads} /></Section>
    <Section title="چک‌لیست انتخاب خدمت و تحویل خودرو"><ol className="list-inside list-decimal space-y-3"><li>محل امن، موقعیت دقیق و شماره تماس در دسترس را مشخص کنید.</li><li>مدل، سال، گیربکس، وضعیت چرخ‌ها و علائم را گزارش دهید.</li><li>امکان تعمیر در محل، ابزار موردنیاز و حدود هزینه بررسی شود.</li><li>اگر حمل لازم است، مقصد، پذیرش و روش بارگیری را پیش از حرکت قطعی کنید.</li><li>اعزام، اجرت، قطعه، مسافت، عوارض و انتظار را جدا توافق و رسید دریافت کنید.</li></ol></Section>
    <PriceFactors area={`${brand.name} در ${region.name}`} />
    <Questions items={[{ question: `آیا تعمیر همه مدل‌های ${brand.name} در ${region.name} در محل انجام می‌شود؟`, answer: "خیر. تشخیص اولیه، ابزار در دسترس و ایمنی محل تعیین‌کننده‌اند. تعمیر اساسی موتور و گیربکس به محیط کارگاهی نیاز دارد؛ وجود نام مدل در صفحه تضمین موجودی قطعه نیست." }, { question: `برای اعزام در ${region.name} چه نشانی بدهیم؟`, answer: region.access }, { question: `آیا خدمات ${brand.name} شامل گارانتی رسمی است؟`, answer: "این مجموعه مستقل از خودروساز است. پیش از تعمیر یا حمل خودروی تحت ضمانت، شرایط و مقصد مجاز را با ضمانت‌کننده بررسی کنید." }, { question: "آیا زمان رسیدن با ثبت فرم قطعی است؟", answer: "خیر. وضعیت پذیرش در فرم توضیح داده می‌شود و ممکن است فقط خلاصه تماس ساخته شود. تحویل درخواست، تأیید اعزام و رسیدن امدادگر مراحل متفاوتی هستند؛ برای فوریت تماس بگیرید." }]} />
    <Section title={`مطالعه بیشتر برای ${brand.name}`}><LinkGrid links={[{ title: `راهنمای عمومی ${brand.name}`, href: `/brands/${brand.slug}` }, { title: "راهنمای فنی مرتبط", href: `/blog/${brand.guide}` }, ...(brandModelGuides[brand.slug] ?? []).map(item => ({ title: item.title, href: `/blog/${item.slug}` })), { title: `راهنمای ${region.scenario}`, href: `/blog/${region.slug === "شمال" ? "north-villa-no-start-decision" : region.slug === "کرج" ? "karaj-mountain-trip-overheat" : "tehran-basement-recovery"}` }]} /></Section>
    <Section title={`سایر برندها در ${region.name}`}><LinkGrid links={brandProfiles.filter(item => item.slug !== brand.slug).map(item => ({ title: `امداد ${item.name} ${region.name}`, href: regionalBrandPath(region.slug, item.slug) }))} /></Section>
    <Section title={`خدمات ${brand.name} در مناطق دیگر`}><LinkGrid links={assistanceRegions.filter(item => item.slug !== region.slug).map(item => ({ title: `امداد ${brand.name} ${item.name}`, href: regionalBrandPath(item.slug, brand.slug) }))} /></Section>
    <SafetyNote /><FinalContact title={`هماهنگی ${title}`} />
  </SubpageShell>;
}
