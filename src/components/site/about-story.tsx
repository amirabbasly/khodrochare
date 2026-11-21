"use client";

import Image from "next/image";
import { useState } from "react";

const milestones = [
  { label: "نیاز راننده", title: "شروع مسیر؛ یک نیاز روشن", body: "خرابی خودرو تنها یک مسئله فنی نیست؛ انتخاب خدمت، اعلام موقعیت و پیدا کردن راه ارتباطی قابل پیگیری هم اهمیت دارند. نگاه خودرو چاره از همین نیاز شروع می‌شود: ساده‌تر کردن مسیر رسیدن راننده به خدمت مناسب، بدون ابهام درباره مراحل هماهنگی.", image: "/images/facts/fast-dispatch.webp" },
  { label: "امداد و حمل", title: "هماهنگی امداد و حمل خودرو", body: "برای خودروی متوقف، ابتدا موقعیت، مدل و وضعیت خودرو بررسی می‌شود. تعمیر قابل انجام در محل، باتری به باتری، یدک‌کش یا خودروبر انتخاب‌های متفاوتی هستند. هدف، هماهنگی راهکار متناسب با شرایط همان درخواست در تهران، کرج و محدوده‌های فعال شمال است؛ نه وعده زمان یکسان برای همه مسیرها.", image: "/images/trust-vehicles.webp" },
  { label: "شبکه همکاران", title: "همراهی متخصصان و سفیران", body: "بخش مهمی از تجربه خدمت به هماهنگی تیم عملیات با امدادگران و همکاران حمل وابسته است. مسیر سفیران برای معرفی توانایی‌ها، تجهیزات و محدوده فعالیت همکاران در نظر گرفته شده است. بررسی مدارک و توافق درباره شرایط همکاری، پیش از شروع فعالیت اهمیت دارد.", image: "/images/facts/experienced-mechanic.webp" },
  { label: "خدمات سیار", title: "توجه به نگهداری، در کنار امداد", body: "نیاز خودرو همیشه به حمل ختم نمی‌شود. مکانیک سیار، برق و باتری، پنچرگیری و کارواش از خدمات معرفی‌شده خودرو چاره هستند. امکان ارائه هر خدمت با توجه به محدوده، تجهیزات و وضعیت خودرو بررسی می‌شود تا راننده بداند کدام کار در محل قابل انجام است.", image: "/images/service-tiles/carwash.webp" },
  { label: "سوپر اپلیکیشن", title: "یک مسیر دیجیتال برای خدمات خودرو", body: "سوپر اپلیکیشن خودرو چاره مسیر معرفی خدمات و ادامه درخواست مشتریان است. در معرفی محصول، امکاناتی مانند تالار خرید و فروش، پرداخت‌های خودرویی و راهنمای عیب‌یابی هوشمند مطرح شده‌اند. دسترسی و شرایط هر قابلیت را در نسخه فعال اپ بررسی کنید؛ راهنمای هوشمند جای تشخیص قطعی متخصص را نمی‌گیرد.", image: "/images/app-screens/customer-home-20261121.webp" },
  { label: "ادامه مسیر", title: "بهبود تجربه، با پاسخ‌گویی و شفافیت", body: "مسیر توسعه خودرو چاره با توجه به نیاز رانندگان و تجربه تیم عملیات ادامه پیدا می‌کند. شفاف‌تر کردن اطلاعات خدمت، هماهنگی پیش از شروع کار و فراهم کردن راه پیگیری، جهت این حرکت هستند. توسعه خدمات و محدوده‌ها پس از فراهم شدن شرایط اجرایی معرفی می‌شود.", image: "/images/facts/support-24h.webp" },
];
const purposes = [
  { label: "مأموریت ما", title: "مأموریت ما؛ ساده‌تر کردن خدمات خودرو", body: "مأموریت خودرو چاره، کمک به راننده برای انتخاب آگاهانه خدمت و هماهنگی قابل پیگیری است. با کنار هم قرار دادن مسیر دیجیتال، تیم پاسخ‌گویی و شبکه همکاران، تلاش می‌کنیم از شرح مشکل تا پایان خدمت، اطلاعات روشن‌تری در اختیار مشتری باشد. اعلام نوع کار، بررسی هزینه پیش از شروع و رعایت ایمنی، بخش مهم این تجربه است.", image: "/images/facts/experienced-mechanic.webp" },
  { label: "چشم‌انداز ما", title: "چشم‌انداز ما؛ همراه یکپارچه رانندگان", body: "می‌خواهیم خودرو چاره به همراهی کاربردی برای نیازهای روزمره خودرو تبدیل شود؛ از امداد و حمل تا نگهداری و خدمات دیجیتال. این چشم‌انداز، جهت توسعه ماست و به معنی فعال بودن همه خدمات در همه شهرها نیست. کیفیت هماهنگی، توسعه مسئولانه و پاسخ‌گویی به مشتری، مبنای ادامه مسیر خواهند بود.", image: "/images/facts/active-network.webp" },
];

export function AboutStory() {
  const [step, setStep] = useState(0);
  const [purpose, setPurpose] = useState(0);
  return <>
    <section className="about-block" aria-labelledby="about-history-title">
      <header className="about-section-heading"><p>از نیاز راننده تا همراهی در مسیر</p><h2 id="about-history-title">از آغاز مسیر تا ادامه راه</h2><span>روایت رویکرد خودرو چاره و زمینه‌های فعالیت ما</span></header>
      <div className="about-step-nav" role="group" aria-label="بخش‌های مسیر خودرو چاره">{milestones.map((item, index) => <button key={item.label} type="button" aria-pressed={step === index} aria-controls="about-story-panel" onClick={() => setStep(index)}><span aria-hidden="true">{(index + 1).toLocaleString("fa-IR")}</span>{item.label}</button>)}</div>
      <article id="about-story-panel" className="about-split about-story-panel" aria-live="polite"><div><p className="about-overline">{milestones[step].label}</p><h3>{milestones[step].title}</h3><p>{milestones[step].body}</p></div><div className="about-photo"><Image key={milestones[step].image} src={milestones[step].image} alt={`تصویر معرفی ${milestones[step].label}؛ نمای توضیحی خدمات`} fill sizes="(min-width:768px) 440px,90vw" className={step === 4 ? "object-contain" : "object-cover"} /></div></article>
    </section>
    <section className="about-block about-purpose" aria-label="مأموریت و چشم‌انداز خودرو چاره">
      <div className="about-purpose-nav" role="group" aria-label="انتخاب مأموریت یا چشم‌انداز">{purposes.map((item, index) => <button type="button" key={item.label} onClick={() => setPurpose(index)} aria-pressed={purpose === index} aria-controls="about-purpose-panel">{item.label}</button>)}</div>
      <article id="about-purpose-panel" className="about-split" aria-live="polite"><div className="about-photo"><Image src={purposes[purpose].image} alt="تصویر توضیحی خدمات و همراهی با رانندگان" fill sizes="(min-width:768px) 440px,90vw" className="object-cover" /></div><div><p className="about-overline">چرا خودرو چاره؟</p><h2>{purposes[purpose].title}</h2><p>{purposes[purpose].body}</p></div></article>
    </section>
  </>;
}
