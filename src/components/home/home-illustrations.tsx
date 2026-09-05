import Image from "next/image";
import { Icon } from "./home-ui";

export function RouteMap({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative isolate overflow-hidden rounded-[1.4rem] border border-slate-200 bg-[#eef3ee] ${compact ? "h-44" : "min-h-[380px]"}`}
      aria-label="نقشه پوشش خودرو چاره"
      role="img"
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 460 320" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="mapSky" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#f6fbf6" />
            <stop offset="100%" stopColor="#e1ede4" />
          </linearGradient>
          <linearGradient id="iranGlow" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#d9e8dc" />
            <stop offset="100%" stopColor="#c3d4c8" />
          </linearGradient>
        </defs>
        <rect width="460" height="320" fill="url(#mapSky)" />
        <path
          d="M82 54 136 37l52 18 40-12 45 12 44-10 53 25-20 45 14 40-31 38-55 18-39 32-55-10-42 12-47-20-55-3-20-42 17-46-22-42 18-37Z"
          fill="url(#iranGlow)"
          stroke="#9ca9a0"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M117 90c16-5 29-2 41 10 9 9 19 12 31 10 16-3 23 2 34 12 10 9 19 11 34 8 17-3 31 2 42 14"
          stroke="#c8d3c8"
          strokeWidth="10"
          strokeLinecap="round"
          opacity=".5"
        />
        <path
          d="M98 204c22-10 45-8 67 5 18 11 33 14 53 7 15-5 29-4 45 5 21 12 40 13 61 4"
          stroke="#c8d3c8"
          strokeWidth="8"
          strokeLinecap="round"
          opacity=".5"
        />
        <path
          d="M92 77c37 9 52 32 62 54s35 33 63 36 43 15 58 35c12 16 28 26 56 29"
          stroke="#eef5ef"
          strokeWidth="6"
          strokeLinecap="round"
          opacity=".8"
        />
      </svg>

      <div className="absolute inset-0 map-grid opacity-20" />

      <div className={`absolute inset-0 ${compact ? "p-3" : "p-4"}`}>
        <CityPin label="تهران" x="52%" y="44%" active />
        <CityPin label="کرج" x="46%" y="47%" active />
        <CityPin label="رشت" x="39%" y="36%" active />
        <CityPin label="ساری" x="57%" y="38%" active />
        <CityPin label="گرگان" x="67%" y="35%" active />
        <CityPin label="شیراز" x="50%" y="76%" locked />
        <CityPin label="تبریز" x="28%" y="33%" locked />
        <CityPin label="اهواز" x="31%" y="72%" locked />

        <div className="absolute left-4 top-4 rounded-full border border-emerald-500/30 bg-white/85 px-3 py-1.5 text-[10px] font-black text-emerald-700 shadow-sm">
          تهران، کرج و شمال فعال
        </div>

        <div className="absolute bottom-4 right-4 rounded-xl border border-white/70 bg-white/90 px-3 py-2 text-[10px] font-bold text-slate-600 shadow-sm">
          تصویر شماتیک؛ پوشش نهایی با بررسی موقعیت
        </div>
      </div>
    </div>
  );
}

function CityPin({
  label,
  x,
  y,
  active = false,
  locked = false,
}: {
  label: string;
  x: string;
  y: string;
  active?: boolean;
  locked?: boolean;
}) {
  return (
    <div
      className={`absolute -translate-x-1/2 -translate-y-1/2 ${active ? "coverage-city-active" : ""}`}
      style={{ left: x, top: y }}
    >
      <div
        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-black shadow-sm backdrop-blur-sm ${
          active ? "border-emerald-400/50 bg-emerald-500 text-white" : "border-slate-300/70 bg-white/85 text-slate-600"
        }`}
      >
        {active ? <Icon name="location" size={12} /> : <span className="city-lock" aria-hidden="true" />}
        {label}
        {locked && <span className="ml-1 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-slate-100 text-[8px] text-slate-500">⌛</span>}
      </div>
      <span className={`city-beam ${active ? "bg-emerald-400" : "bg-slate-400"}`} aria-hidden="true" />
    </div>
  );
}

export function TowTruckStage({ compact = false }: { compact?: boolean }) {
  const bubbles = [
    "یدک‌کش رایگان با حمل به نزدیک‌ترین تعمیرگاه",
    "اعزام فوری، مسیر زنده و هماهنگی تلفنی",
    "دریافت امداد با یک تماس، بدون معطلی",
  ];

  return (
    <div className={`relative overflow-hidden border border-white/15 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,.24),transparent_26%),linear-gradient(180deg,#091a2d_0%,#06111f_100%)] text-white shadow-[0_22px_50px_rgba(2,8,20,.3)] ${compact ? "h-[250px] rounded-none p-2" : "h-[340px] rounded-[1.8rem] p-4 lg:h-[440px]"}`}>
      <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,.15),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(0deg,rgba(0,0,0,.25),transparent)]" />
      <div className="tow-stage-stars absolute inset-0 opacity-70" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className={`absolute left-3 right-3 flex flex-col items-center gap-2 ${compact ? "top-3" : "top-4"}`}>
        {bubbles.map((text, index) => (
          <div
            key={text}
            className={`tow-bubble inline-flex max-w-[92%] items-center rounded-full border border-cyan-300/35 bg-white/92 text-center font-black text-slate-900 shadow-lg ${compact ? "px-3 py-1.5 text-[9px]" : "px-4 py-2 text-[11px]"}`}
            style={{ animationDelay: `${index * 3}s` }}
          >
            {text}
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-4 flex justify-center">
        <div className={`tow-truck relative ${compact ? "w-[260px]" : "w-[290px] lg:w-[360px]"}`} aria-label="یدک‌کش متحرک">
          <div className="tow-shadow" />
          <div className="tow-body">
            <div className="tow-bed" />
            <div className="tow-cabin">
              <div className="tow-window" />
              <div className="tow-light" />
            </div>
            <div className="tow-hook" />
            <div className="tow-line" />
            <div className="tow-siren" />
            <div className="wheel wheel-left"><span /></div>
            <div className="wheel wheel-right"><span /></div>
          </div>
        </div>
      </div>

      <div className={`absolute bottom-4 left-4 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 font-bold text-slate-200 backdrop-blur-sm ${compact ? "text-[8px]" : "text-[10px]"}`}>
        در مسیر نزدیک‌ترین تعمیرگاه
      </div>
    </div>
  );
}

export function PhoneMockup({ assistant = false }: { assistant?: boolean }) {
  return (
    <div className={`relative w-[172px] shrink-0 rounded-[2rem] border-[4px] border-[#0a0d12] bg-white p-1.5 shadow-phone sm:w-[218px] sm:rounded-[2.4rem] sm:border-[5px] sm:p-2 ${assistant ? "phone-mockup-assistant" : ""}`}>
      <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
      <div className="h-[365px] overflow-hidden rounded-[1.55rem] bg-[#f7f9fc] pt-8 text-right text-ink sm:h-[430px] sm:rounded-[1.85rem]">
        <div className="flex items-center justify-between px-4">
          <Icon name="user" size={18} className="text-slate-500" />
          <span className="text-xs font-black">{assistant ? "دستیار هوشمند" : "خودرو چاره"}</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-50 text-brand-orange">+</span>
        </div>
        {assistant ? (
          <div className="px-4 pt-8 text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-[0_0_0_12px_#eef4f8]">
              <Icon name="mic" size={38} className="text-ink" />
            </div>
            <p className="mt-7 text-sm font-black">برای صحبت کردن لمس کنید</p>
            <p className="mt-2 text-[10px] leading-5 text-slate-500">مشکل خودرو را بگویید تا راهنمایی شوید</p>
            <div className="mt-8 rounded-xl border border-slate-200 bg-white p-3 text-right">
              <span className="text-[10px] text-slate-400">پیشنهاد فوری</span>
              <div className="mt-2 flex items-center gap-2 text-xs font-bold">
                <Icon name="battery" size={18} className="text-brand-orange" /> بررسی باتری خودرو
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {["امداد", "فروشگاه", "سوابق"].map((item) => (
                <div key={item} className="rounded-lg bg-white p-2 text-[9px] font-bold shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="mx-4 mt-5 rounded-xl bg-white p-3 shadow-sm">
              <div className="grid grid-cols-4 gap-2">
                {["truck", "engine", "search", "battery"].map((name) => (
                  <span key={name} className="flex h-9 items-center justify-center rounded-lg bg-orange-50 text-brand-orange">
                    <Icon name={name} size={17} />
                  </span>
                ))}
              </div>
              <p className="mt-3 text-[10px] font-bold">چه خدماتی نیاز دارید؟</p>
            </div>
            <div className="mx-4 mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
              <RouteMap compact />
            </div>
            <div className="mx-4 mt-3 flex items-center justify-between rounded-xl bg-emerald-50 p-3">
              <span className="text-[10px] font-bold text-emerald-700">امدادگر در مسیر است</span>
              <span className="text-xs font-black text-emerald-700">پس از هماهنگی</span>
            </div>
          </>
        )}
        <div className="absolute bottom-3 left-3 right-3 flex justify-around border-t border-slate-200 bg-white px-2 py-3 text-slate-400">
          {["car", "location", "chat", "user"].map((name, index) => (
            <Icon key={name} name={name} size={17} className={index === 0 ? "text-brand-orange" : ""} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function QrCode() {
  return (
    <div className="relative h-28 w-28 overflow-hidden rounded-lg bg-white p-1 ring-1 ring-slate-200">
      <Image src="/images/app-qr.png" alt="کد QR نصب اپلیکیشن خودرو چاره" fill sizes="112px" className="object-contain p-1" />
    </div>
  );
}
