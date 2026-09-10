export const transportFields = {
  power: { label: "نوع قوای محرکه", options: [["combustion", "بنزینی یا دیزلی"], ["electric", "برقی"], ["hybrid", "هیبریدی"], ["unknown", "نمی‌دانم"]] },
  gearbox: { label: "نوع گیربکس", options: [["manual", "دنده‌ای"], ["automatic", "اتوماتیک / CVT / دوکلاچه"], ["unknown", "نمی‌دانم"]] },
  drive: { label: "محور محرک", options: [["front", "دیفرانسیل جلو"], ["rear", "دیفرانسیل عقب"], ["all", "دو دیفرانسیل / AWD"], ["unknown", "نمی‌دانم"]] },
  wheels: { label: "وضعیت چرخ‌ها", options: [["rolling", "هر چهار چرخ سالم و آزادند"], ["locked", "چرخ قفل یا آسیب دیده است"], ["unknown", "مشخص نیست"]] },
  clearance: { label: "ارتفاع کف خودرو", options: [["standard", "ارتفاع معمولی"], ["low", "کم‌ارتفاع / سپر نزدیک زمین"], ["unknown", "مشخص نیست"]] },
  access: { label: "محل بارگیری", options: [["open", "محل باز و قابل دسترس"], ["garage", "پارکینگ کوتاه، رمپ یا مسیر تنگ"], ["unknown", "دسترسی مشخص نیست"]] },
  manualAllows: { label: "دفترچه همان مدل، حمل با چرخ‌گیر را مجاز دانسته؟", options: [["yes", "بله؛ روش و محدودیت‌ها مشخص است"], ["no", "خیر"], ["unknown", "بررسی نکرده‌ام"]] },
} as const;
export type TransportInput = { [Key in keyof typeof transportFields]: (typeof transportFields)[Key]["options"][number][0] };
export type TransportAdvice = { kind: "flatbed" | "wheel-lift-review" | "access-review"; title: string; reasons: string[]; equipment: string[]; caution: string; links: { title: string; href: string }[] };

export function selectTransport(input: TransportInput): TransportAdvice {
  for (const key of Object.keys(transportFields) as (keyof TransportInput)[]) {
    if (!transportFields[key].options.some(([value]) => value === input[key])) throw new Error(`invalid_${key}`);
  }
  const reasons: string[] = [];
  const equipment: string[] = [];
  const wheelLiftCandidate = input.power === "combustion" && input.gearbox === "manual" && ["front", "rear"].includes(input.drive) && input.wheels === "rolling" && input.clearance === "standard" && input.access === "open" && input.manualAllows === "yes";
  if (input.power !== "combustion") reasons.push("برای خودرو برقی، هیبریدی یا قوای محرکه نامشخص، حمل با چرخ‌های روی زمین بدون دستورالعمل همان مدل انتخاب نمی‌شود.");
  if (input.gearbox !== "manual" || input.drive === "all" || input.drive === "unknown") reasons.push("گیربکس یا محور محرک به بررسی محدودیت حمل نیاز دارد؛ کفی گزینه اولیه برای مذاکره با اپراتور است.");
  if (input.manualAllows !== "yes") reasons.push("مجوز مدل‌محور حمل با چرخ‌گیر تأیید نشده است؛ خلاص یا N بودن گیربکس به‌تنهایی کافی نیست.");
  if (input.wheels !== "rolling") { reasons.push("سلامت و آزادی چرخ‌ها تأیید نشده است؛ خودرو نباید با چرخ قفل‌شده روی مسیر کشیده شود."); equipment.push("بررسی دالی بارگیری یا اسکیت چرخ توسط متخصص"); }
  if (input.clearance !== "standard") { reasons.push("ارتفاع خودرو مشخص یا معمولی نیست؛ زاویه ورود، خروج و شکست رمپ باید بررسی شود."); equipment.push("بررسی کفی کم‌زاویه و رمپ متناسب"); }
  if (input.access !== "open") { reasons.push("دسترسی وسیله حمل به محل توقف روشن نیست؛ ارتفاع ورودی، پهنای مسیر و شیب رمپ باید پیش از اعزام بررسی شود."); equipment.push("ارزیابی خروج از پارکینگ پیش از انتخاب وسیله نهایی"); }
  if (wheelLiftCandidate) reasons.push("اطلاعات واردشده امکان بررسی چرخ‌گیر را مطرح می‌کند؛ انتخاب محور بلندشونده و حدود مسافت و سرعت هنوز با متخصص و دفترچه کنترل می‌شود.");
  if (!equipment.length) equipment.push(wheelLiftCandidate ? "بررسی چرخ‌گیر مناسب محور محرک یا کفی" : "کفی با ظرفیت و تجهیزات مهار متناسب خودرو");
  const kind = input.access !== "open" ? "access-review" : wheelLiftCandidate ? "wheel-lift-review" : "flatbed";
  return {
    kind,
    title: kind === "access-review" ? "اول بررسی دسترسی و خروج؛ سپس انتخاب روش حمل" : kind === "flatbed" ? "کفی؛ گزینه اولیه برای بررسی حمل" : "چرخ‌گیر فقط پس از تأیید مدل و شرایط حمل",
    reasons, equipment,
    caution: "این نتیجه مجوز یدک‌کشی، تضمین ایمنی، قیمت یا اعزام نیست. دفترچه همان مدل و ارزیابی متخصص مقدم است؛ ترمز، فرمان، وزن، بدنه و ایمنی صحنه نیز باید بررسی شوند. با نشت سوخت، آتش یا مصدومیت ابتدا خدمات اضطراری عمومی را مطلع کنید.",
    links: [{ title: "هماهنگی خودروبر و کفی", href: "/services/flatbed-carrier" }, { title: "اطلاعات لازم برای خروج از پارکینگ", href: "/blog/parking-garage-car-recovery" }, { title: "محاسبه هزینه حمل", href: "/pricing#calculator" }],
  };
}
