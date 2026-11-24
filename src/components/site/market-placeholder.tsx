import Image from "next/image";
import Link from "next/link";
import {SubpageShell} from "./subpage-shell";
export function MarketPlaceholder({title,image}:{title:string;image:string}){
 return <SubpageShell showGeneralFaq={false}><section className="site-container market-placeholder" dir="rtl"><Image src={`/images/navigation/${image}.webp`} alt="" width={144} height={144}/><p className="market-coming">به‌زودی در خودرو چاره</p><h1>{title}</h1><p>این بخش در حال آماده‌سازی است. جزئیات و امکانات آن پس از تکمیل منتشر می‌شود؛ در حال حاضر ثبت آگهی یا انجام معامله در این صفحه فعال نیست.</p><Link href="/">بازگشت به صفحه اصلی ←</Link></section></SubpageShell>;
}
