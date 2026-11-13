/** Retrieval-only suggestions. No diagnosis, invented availability or automatic publication. */
export function suggestReply(question: string, faqs: { question: string; answer: string }[]) {
  const words = (text: string) => new Set(text.replace(/ي/g,"ی").replace(/ك/g,"ک").split(/[^\p{L}\p{N}\u200c]+/u).filter(w => w.length >= 4));
  const terms = words(question);
  const candidates = faqs.map(faq => ({ ...faq, score: [...words(faq.question)].filter(w => terms.has(w)).length })).sort((a,b) => b.score - a.score);
  return candidates[0]?.score >= 2 ? candidates[0].answer : "برای راهنمایی دقیق‌تر، مدل و سال خودرو، نشانه خرابی و نوع محل توقف را بدون اطلاعات شخصی توضیح دهید. تشخیص قطعی و زمان اعزام پس از بررسی مشخص می‌شود؛ در خطر فوری با خدمات اضطراری مسئول و برای هماهنگی خدمت با پشتیبانی تماس بگیرید.";
}
