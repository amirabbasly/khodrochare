"use client";

import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";

export const mobileDestinations=[
 {href:"/friday-market",label:"جمعه بازار لوازم یدکی",image:"parts"},
 {href:"/car-market",label:"تالار خودرو",image:"cars"},
 {href:"/imports",label:"واردات",image:"imports"},
 {href:"/partners",label:"همکاری",image:"partners"},
] as const;
export function MobileBottomNav(){
 const pathname=usePathname();
 return <nav className="mobile-bottom-nav" aria-label="ناوبری پایین موبایل" dir="rtl">{mobileDestinations.map(item=><Link key={item.href} href={item.href} prefetch={false} aria-current={pathname===item.href?"page":undefined}><Image src={`/images/navigation/${item.image}.webp`} alt="" width={44} height={44} /><span>{item.label}</span></Link>)}</nav>;
}
