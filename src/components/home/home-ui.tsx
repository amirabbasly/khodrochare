import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type IconName =
  | "award"
  | "battery"
  | "bot"
  | "brake"
  | "calendar"
  | "car"
  | "chat"
  | "check"
  | "clock"
  | "download"
  | "engine"
  | "filter"
  | "form"
  | "gear"
  | "headset"
  | "home"
  | "lock"
  | "location"
  | "mail"
  | "map"
  | "mic"
  | "oil"
  | "phone"
  | "pin"
  | "plus"
  | "search"
  | "send"
  | "shield"
  | "spark"
  | "star"
  | "tag"
  | "toolbox"
  | "truck"
  | "user"
  | "wiper";

const paths: Record<IconName, ReactNode> = {
  award: <><circle cx="12" cy="9" r="5" /><path d="m9 13-1 8 4-2 4 2-1-8" /></>,
  battery: <><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M8 6V4h8v2M8 12h3m-1.5-1.5v3M14 12h3" /></>,
  bot: <><rect x="4" y="7" width="16" height="12" rx="4" /><path d="M12 3v4M8 12h.01M16 12h.01M8 16h8" /></>,
  brake: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 4v3m0 10v3M4 12h3m10 0h3" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 10h18m-13 4h3m2 0h3" /></>,
  car: <><path d="m5 11 2-5h10l2 5" /><path d="M3 12h18v6H3zM6 18v2m12-2v2M7 15h.01M17 15h.01" /></>,
  chat: <><path d="M4 5h16v12H8l-4 4V5Z" /><path d="M8 9h8m-8 4h5" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v6l4 2" /></>,
  download: <><path d="M12 3v12m-4-4 4 4 4-4M5 21h14" /></>,
  engine: <><path d="M5 9h3l2-3h5l2 3h2v9H7l-2-3H3v-4h2V9Z" /><path d="M10 12h4" /></>,
  filter: <><path d="M7 4h10l2 5-3 10H8L5 9l2-5Z" /><path d="M7 9h10" /></>,
  form: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8m-8 4h8m-8 4h5" /></>,
  gear: <><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.1-1l2-1-2-4-2 1a7 7 0 0 0-2-1l-.3-2h-5L9 6a7 7 0 0 0-2 1L5 6l-2 4 2 1a7 7 0 0 0 0 2l-2 1 2 4 2-1a7 7 0 0 0 2 1l.3 2h5l.5-2a7 7 0 0 0 2-1l2 1 2-4-2-1a7 7 0 0 0 .2-1Z" /></>,
  headset: <><path d="M4 13a8 8 0 0 1 16 0v5h-4v-6h4M4 12v6h4v-6H4Zm12 8c-1 1-2 1-4 1" /></>,
  home: <><path d="M4 11.5 12 5l8 6.5" /><path d="M6 10.5V20h12v-9.5" /></>,
  lock: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V8a4 4 0 0 1 8 0v2" /></>,
  location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  map: <><path d="M4 6 9 4l6 2 5-2v14l-5 2-6-2-5 2V6Z" /><path d="M9 4v14m6-12v14" /></>,
  mic: <><rect x="9" y="3" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3m-4 0h8" /></>,
  oil: <><path d="M8 3h8v4l2 3v11H6V10l2-3V3Z" /><path d="M8 7h8m-6 7h4" /></>,
  phone: <><path d="M7 3h3l2 5-2 2a15 15 0 0 0 4 4l2-2 5 2v3c0 2-2 4-4 4C9 20 4 15 3 7c0-2 2-4 4-4Z" /></>,
  pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  search: <><circle cx="10" cy="10" r="6" /><path d="m15 15 5 5" /></>,
  send: <path d="m3 11 18-8-8 18-2-8-8-2Zm8 2 5-5" />,
  shield: <><path d="M12 3 4 6v6c0 5 3 8 8 10 5-2 8-5 8-10V6l-8-3Z" /><path d="m8 12 3 3 5-6" /></>,
  spark: <path d="m13 2-2 8H4l7 3-1 9 4-8h6l-6-3-1-9Z" />,
  star: <path d="m12 3 2.4 5 5.6.8-4 3.8.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.8 5.6-.8L12 3Z" />,
  tag: <><path d="M20 13 13 20 4 11V4h7l9 9Z" /><circle cx="8" cy="8" r="1" /></>,
  toolbox: <><path d="M4 8h16v12H4z" /><path d="M8 8V5h8v3m-9 5h10m-5-2v4" /></>,
  truck: <><path d="M3 6h11v11H3V6Zm11 4h4l3 3v4h-7v-7Z" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  wiper: <><path d="M3 17 19 5M5 20 21 8M3 17l3 3m13-15 2 3" /></>,
};

export function Icon({ name, size = 24, className = "" }: { name: IconName | string; size?: number; className?: string }) {
  const icon = paths[name as IconName] ?? paths.gear;
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icon}</svg>;
}

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className={`relative block shrink-0 overflow-hidden ${compact ? "h-12 w-36" : "h-14 w-40 sm:w-44 xl:h-16 xl:w-48"}`} aria-label="خودرو چاره، صفحه اصلی">
      <Image
        src="/images/khodrochare-3d-logo.webp"
        alt="لوگوی سه‌بعدی خودرو چاره"
        fill
        priority
        sizes={compact ? "144px" : "(min-width: 1280px) 192px, 176px"}
        className="object-contain object-center"
      />
    </Link>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "light";
  className?: string;
}) {
  const styles =
    variant === "primary"
      ? "bg-brand-orange text-white shadow-orange"
      : variant === "light"
        ? "bg-white text-ink"
        : "border border-white/45 bg-white/5 text-white";

  return (
    <a
      href={href.startsWith("#") ? `/${href}` : href}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-extrabold transition duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange ${styles} ${className}`}
    >
      {children}
    </a>
  );
}

export function SectionTitle({ title, desc, light = false }: { title: string; desc?: string; light?: boolean }) {
  return (
    <div className="text-center">
      <h2 className={`text-2xl font-black leading-tight md:text-3xl ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      {desc && <p className={`mx-auto mt-2 max-w-2xl text-sm leading-7 ${light ? "text-slate-300" : "text-slate-500"}`}>{desc}</p>}
    </div>
  );
}

export function PlatformLogo({ platform }: { platform: "android" | "ios" | "pwa" }) {
  if (platform === "android") {
    return (
      <span className="inline-flex items-center gap-2" aria-label="Android">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m8 6-2-3m10 3 2-3M6 9h12v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9Z" fill="#071a2e" />
          <path d="M8 8a4 4 0 0 1 8 0" stroke="#071a2e" strokeWidth="2" />
          <circle cx="9.5" cy="10.5" r=".8" fill="white" />
          <circle cx="14.5" cy="10.5" r=".8" fill="white" />
          <path d="M4 10v6m16-6v6M9 19v3m6-3v3" stroke="#071a2e" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span dir="ltr">Android</span>
      </span>
    );
  }

  if (platform === "ios") {
    return (
      <span className="inline-flex items-center gap-2" aria-label="iOS">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#071a2e" aria-hidden="true">
          <path d="M16.7 12.7c0-2 1.7-3 1.8-3.1a4 4 0 0 0-3.2-1.7c-1.4-.1-2.6.8-3.3.8-.7 0-1.7-.8-2.9-.8-1.5 0-3 .9-3.8 2.3-1.7 2.9-.4 7.2 1.2 9.5.8 1.1 1.7 2.3 2.9 2.3 1.1 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.2.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.8-1.1-2.8-4.4ZM14.4 6.5A4.1 4.1 0 0 0 15.4 3a4.2 4.2 0 0 0-2.9 1.5 3.8 3.8 0 0 0-1 2.8c1.1.1 2.2-.5 2.9-.8Z" />
        </svg>
        <span dir="ltr">iOS</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2" aria-label="PWA">
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="4" fill="#087fc3" />
        <path d="M6 15V9h2.2a2 2 0 0 1 0 4H6m6-4 1.2 6L15 9l1.8 6L18 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span dir="ltr">PWA</span>
    </span>
  );
}

export function BrandLogo({ brand }: { brand: string }) {
  const shared = "h-9 w-full max-w-[86px]";

  if (brand === "toyota") return <svg className={shared} viewBox="0 0 96 42" role="img" aria-label="تویوتا"><g fill="none" stroke="#6b7280" strokeWidth="2.5"><ellipse cx="48" cy="17" rx="22" ry="12" /><ellipse cx="48" cy="17" rx="7" ry="12" /><path d="M27 14c8 7 34 7 42 0" /></g><text x="48" y="39" textAnchor="middle" fontSize="8" fontWeight="800" fill="#e3282e">TOYOTA</text></svg>;
  if (brand === "hyundai") return <svg className={shared} viewBox="0 0 96 42" role="img" aria-label="هیوندای"><ellipse cx="48" cy="17" rx="23" ry="12" fill="none" stroke="#22589d" strokeWidth="2.5" transform="rotate(-8 48 17)" /><path d="m37 24 8-15m6 14 8-15M42 18h13" stroke="#22589d" strokeWidth="3" /><text x="48" y="39" textAnchor="middle" fontSize="7" fontWeight="800" fill="#22589d">HYUNDAI</text></svg>;
  if (brand === "kia") return <svg className={shared} viewBox="0 0 96 42" role="img" aria-label="کیا"><ellipse cx="48" cy="18" rx="25" ry="12" fill="none" stroke="#34383e" strokeWidth="2.2" /><path d="M31 24V12m0 6 9-7m-9 7 10 7m5-1V12m5 12 8-12 8 12m-13-5h10" fill="none" stroke="#34383e" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  if (brand === "mazda") return <svg className={shared} viewBox="0 0 96 42" role="img" aria-label="مزدا"><ellipse cx="48" cy="17" rx="20" ry="13" fill="none" stroke="#58718d" strokeWidth="2" /><path d="M34 12c6 1 10 5 14 10 4-5 8-9 14-10-2 8-7 13-14 13s-12-5-14-13Z" fill="none" stroke="#58718d" strokeWidth="2" /><text x="48" y="39" textAnchor="middle" fontSize="7" fontWeight="800" fill="#58718d">mazda</text></svg>;
  if (brand === "chery") return <svg className={shared} viewBox="0 0 96 42" role="img" aria-label="چری"><ellipse cx="48" cy="17" rx="23" ry="11" fill="none" stroke="#d93843" strokeWidth="2" /><path d="m31 21 11-12h12l11 12M42 9l6 14 6-14" fill="none" stroke="#d93843" strokeWidth="2" /><text x="48" y="39" textAnchor="middle" fontSize="8" fontWeight="800" fill="#d93843">CHERY</text></svg>;
  if (brand === "mvm") return <svg className={shared} viewBox="0 0 96 42" role="img" aria-label="مدیران خودرو"><ellipse cx="48" cy="18" rx="25" ry="12" fill="none" stroke="#31363c" strokeWidth="2" /><text x="48" y="22" textAnchor="middle" fontSize="10" fontWeight="900" fontStyle="italic" fill="#31363c">MVM</text></svg>;
  if (brand === "saipa") return <svg className={shared} viewBox="0 0 96 42" role="img" aria-label="سایپا"><path d="M48 5 66 16 54 36H42L30 16 48 5Zm0 8-8 5 5 9h6l5-9-8-5Z" fill="#f26a21" fillRule="evenodd" /><text x="48" y="41" textAnchor="middle" fontSize="7" fontWeight="800" fill="#f26a21">SAIPA</text></svg>;

  return <svg className={shared} viewBox="0 0 96 42" role="img" aria-label="ایران خودرو"><path d="M48 5c13 0 23 6 23 13S61 31 48 31 25 25 25 18 35 5 48 5Z" fill="#176eb5" /><path d="M38 11c6 3 8 8 10 14 2-6 4-11 10-14-1 8-4 14-10 17-6-3-9-9-10-17Z" fill="white" /><text x="48" y="40" textAnchor="middle" fontSize="7" fontWeight="800" fill="#176eb5">IKCO</text></svg>;
}
