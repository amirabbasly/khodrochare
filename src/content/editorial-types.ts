export type ContentSource = { title: string; url: string; note?: string };
export type EditorialSection = {
  title: string;
  body: string;
  bullets?: string[];
  table?: { caption: string; headers: string[]; rows: string[][] };
};
export type EditorialLink = { title: string; href: string };

export const editorialUpdatedAt = "2026-09-07";
export const editorialUpdatedLabel = "۱۶ شهریور ۱۴۰۵";
export const technicalSources = {
  tires: { title: "NHTSA — راهنمای ایمنی و فشار تایر", url: "https://www.nhtsa.gov/vehicle-safety/tires", note: "برای اصول عمومی نگهداری تایر؛ اندازه و فشار نهایی از برچسب و دفترچه همان خودرو خوانده می‌شود." },
  obd: { title: "OBD-Codes — تعریف و محدودیت کدهای عمومی دیاگ", url: "https://www.obd-codes.com/trouble_codes/", note: "مرجع توضیح کد، نه دستور تعویض قطعه. سازگاری کد با مدل خودرو باید توسط متخصص تأیید شود." },
  teslaTransport: { title: "دفترچه Model 3 — نمونه دستورالعمل حمل سازنده", url: "https://www.tesla.com/ownersmanual/model3/en_us/GUID-FA9E3DC9-805C-45BD-A64D-C4B3F491B8C0.html", note: "مثالی از محدودیت حمل یک مدل برقی؛ حدود سرعت، مسافت و روش آن به خودروهای دیگر تعمیم داده نمی‌شود." },
  roads: { title: "سامانه رسمی ۱۴۱ سازمان راهداری", url: "https://141.ir/", note: "مرجع بررسی وضعیت راه؛ خودرو چاره باز یا بسته بودن لحظه‌ای هیچ محوری را در این راهنما تأیید نمی‌کند." },
} satisfies Record<string, ContentSource>;

export function sectionText(section: EditorialSection): string {
  return [section.title, section.body, ...(section.bullets ?? []), section.table?.caption ?? "", ...(section.table?.headers ?? []), ...(section.table?.rows.flat() ?? [])].join(" ");
}
