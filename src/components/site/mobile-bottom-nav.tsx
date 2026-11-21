"use client";

import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";

export const mobileDestinations=[
 {href:"/imports",label:"واردات خودرو",image:"imports"},
 {href:"/partners",label:"طرح نمایندگان خودرو چاره",image:"partners"},
] as const;
export function MobileBottomNav(){
 const pathname=usePathname();
 return <nav className="mobile-bottom-nav" aria-label="ناوبری پایین موبایل" dir="rtl">{mobileDestinations.map(item=><Link key={item.href} href={item.href} prefetch={false} aria-current={pathname===item.href?"page":undefined}><Image src={`/images/navigation/${item.image}.webp`} alt="" width={44} height={44} /><span>{item.label}</span></Link>)}</nav>;
}
