"use client";

import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import {serviceFeedback} from "@/content/reviews";

/** Verbatim owner-supplied feedback only; no invented names, stars, dates or Review schema. */
export function HomeFeedback(){
 const track=useRef<HTMLDivElement>(null);
 const [active,setActive]=useState(0);
 const [atEnd,setAtEnd]=useState(false);
 useEffect(()=>{
  const el=track.current;if(!el)return;
  const media=window.matchMedia("(max-width: 767px)");
  let observer:ResizeObserver|undefined;
  const position=()=>{
   observer?.disconnect();
   if(!media.matches){el.scrollLeft=0;return;}
   observer=new ResizeObserver(()=>{
    const first=el.firstElementChild as HTMLElement|null;
    if(!first||!first.offsetWidth)return;
    // Wait for visible streaming layout; centre the second review so both neighbours peek in.
    el.scrollTo({left:-(first.offsetWidth+parseFloat(getComputedStyle(el).columnGap)),behavior:"instant"});
    observer?.disconnect();
   });
   observer.observe(el);
  };
  position();media.addEventListener("change",position);
  return ()=>{observer?.disconnect();media.removeEventListener("change",position);};
 },[]);
 const navigate=(direction:number)=>{
  const el=track.current;if(!el)return;
  const first=el.firstElementChild as HTMLElement|null;if(!first)return;
  const stride=first.offsetWidth+parseFloat(getComputedStyle(el).columnGap);
  el.scrollBy({left:-direction*stride,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
 };
 return <section id="home-feedback" className="section-shell home-feedback" aria-labelledby="home-feedback-title" dir="rtl" data-aos="fade-up">
  <Image src="/images/services/mobile-mechanic-v2.webp" alt="" fill sizes="(min-width:1366px) 1160px,100vw" className="feedback-background" />
  <div className="feedback-content"><h2 id="home-feedback-title">نظرات درباره <span>خودرو چاره</span></h2><p className="feedback-subtitle">بازخوردهای خدمات ارسال‌شده به مجموعه؛ بدون نمایش مشخصات شخصی.</p>
   <div className="feedback-carousel" role="region" aria-label="اسلایدر بازخورد خدمات">
    <button type="button" className="feedback-arrow feedback-previous" aria-label="نظرات قبلی" disabled={active===0} onClick={()=>navigate(-1)}><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></button>
    <div ref={track} className="feedback-track" tabIndex={0} aria-label="نظرها؛ برای پیمایش از دکمه‌های جهت یا کشیدن استفاده کنید" onKeyDown={event=>{if(event.key==="ArrowLeft"||event.key==="ArrowRight"){event.preventDefault();navigate(event.key==="ArrowLeft"?1:-1);}}} onScroll={event=>{const el=event.currentTarget;const card=el.firstElementChild as HTMLElement|null;if(!card)return;const stride=card.offsetWidth+parseFloat(getComputedStyle(el).columnGap);setActive(Math.round(Math.abs(el.scrollLeft)/stride));setAtEnd(Math.abs(el.scrollLeft)+el.clientWidth>=el.scrollWidth-3);}}>
     {serviceFeedback.map((feedback,index)=><figure className="feedback-card" data-active={active===index} aria-current={active===index?"true":undefined} key={`${feedback.city}-${feedback.service}-${index}`}><span className="feedback-quote" aria-hidden="true">“</span><blockquote>{feedback.text}</blockquote><figcaption><span className="feedback-service">{feedback.service}</span><span>{feedback.city}</span></figcaption></figure>)}
    </div>
    <button type="button" className="feedback-arrow feedback-next" aria-label="نظرات بعدی" disabled={atEnd} onClick={()=>navigate(1)}><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M19 12H5m6-6-6 6 6 6" /></svg></button>
   </div><p className="feedback-position" aria-live="polite">بازخورد {(active+1).toLocaleString("fa-IR")} از {serviceFeedback.length.toLocaleString("fa-IR")}</p>
  </div>
 </section>;
}
