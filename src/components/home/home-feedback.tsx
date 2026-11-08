"use client";

import Image from "next/image";
import {useRef, useState} from "react";
import {serviceFeedback} from "@/content/reviews";

/** Verbatim owner-supplied feedback only; no invented names, stars, dates or Review schema. */
export function HomeFeedback(){
 const track=useRef<HTMLDivElement>(null);
 const [active,setActive]=useState(0);
 const [atEnd,setAtEnd]=useState(false);
 const navigate=(direction:number)=>{
  const el=track.current;if(!el)return;
  const first=el.firstElementChild;if(!first)return;
  const stride=first.getBoundingClientRect().width+parseFloat(getComputedStyle(el).columnGap);
  el.scrollBy({left:-direction*stride,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
 };
 return <section id="home-feedback" className="section-shell home-feedback" aria-labelledby="home-feedback-title" dir="rtl" data-aos="fade-up">
  <Image src="/images/services/mobile-mechanic-v2.webp" alt="" fill sizes="(min-width:1366px) 1160px,100vw" className="feedback-background" />
  <div className="feedback-content"><h2 id="home-feedback-title">نظرات درباره <span>خودرو چاره</span></h2><p className="feedback-subtitle">بازخوردهای خدمات ارسال‌شده به مجموعه؛ بدون نمایش مشخصات شخصی.</p>
   <div className="feedback-carousel" role="region" aria-label="اسلایدر بازخورد خدمات">
    <button type="button" className="feedback-arrow feedback-previous" aria-label="نظرات قبلی" disabled={active===0} onClick={()=>navigate(-1)}>‹</button>
    <div ref={track} className="feedback-track" onScroll={event=>{const el=event.currentTarget;const card=el.firstElementChild;if(!card)return;const stride=card.getBoundingClientRect().width+parseFloat(getComputedStyle(el).columnGap);setActive(Math.round(Math.abs(el.scrollLeft)/stride));setAtEnd(Math.abs(el.scrollLeft)+el.clientWidth>=el.scrollWidth-3);}}>
     {serviceFeedback.map((feedback,index)=><figure className="feedback-card" key={`${feedback.city}-${feedback.service}-${index}`}><span className="feedback-quote" aria-hidden="true">“</span><blockquote>{feedback.text}</blockquote><figcaption><span className="feedback-service">{feedback.service}</span><span>{feedback.city}</span></figcaption></figure>)}
    </div>
    <button type="button" className="feedback-arrow feedback-next" aria-label="نظرات بعدی" disabled={atEnd} onClick={()=>navigate(1)}>›</button>
   </div><p className="feedback-position" aria-live="polite">بازخورد {(active+1).toLocaleString("fa-IR")} از {serviceFeedback.length.toLocaleString("fa-IR")}</p>
  </div>
 </section>;
}
