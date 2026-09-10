import Image from "next/image";
import { StructuredData } from "@/components/seo/structured-data";
import { businessFacts } from "@/content/business";
import { customerReviews } from "@/content/reviews";
import { personSchema, reviewSchema } from "@/seo/schemas";

function Stars({ value }: { value: number }) {
  return (
    <span role="img" aria-label={`امتیاز ${value} از ۵`} className="text-sm tracking-tight text-amber-500" dir="ltr">
      {"★".repeat(value)}
      <span className="text-slate-300">{"★".repeat(5 - value)}</span>
    </span>
  );
}

/**
 * Customer testimonials. Renders nothing until real reviews exist in
 * src/content/reviews.ts — no placeholder content, ever.
 */
export function TestimonialsSection({ path }: { path: string }) {
  if (!customerReviews.length) return null;
  return (
    <section className="site-container mt-10" dir="rtl" aria-label="نظرهای مشتریان خودرو چاره">
      {customerReviews.map((review, index) => (
        <StructuredData key={index} data={reviewSchema({ ...review, path })} />
      ))}
      <h2 className="text-2xl font-black">نظر مشتریان خودرو چاره</h2>
      <p className="mt-3 max-w-3xl text-sm leading-8 text-slate-600">
        نظرهای ثبت‌شده پس از انجام خدمت؛ نام خانوادگی برای حفظ حریم خصوصی کامل منتشر نمی‌شود.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {customerReviews.map((review, index) => (
          <figure key={index} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
            <Stars value={review.rating} />
            <blockquote className="mt-3 flex-1 text-sm leading-8 text-slate-700">{review.text}</blockquote>
            <figcaption className="mt-4 border-t border-slate-100 pt-3 text-xs leading-6 text-slate-500">
              <strong className="text-slate-800">{review.name}</strong> · {review.service} · {review.city}
              <br />
              <time dateTime={review.dateIso}>{review.dateLabel}</time>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/**
 * Team members on /about. Renders nothing until real people are added to
 * businessFacts.team — no placeholder names, ever.
 */
export function TeamSection() {
  const team = businessFacts.team;
  if (!team.length) return null;
  return (
    <section className="site-container mt-8" dir="rtl" aria-label="تیم خودرو چاره">
      {team.map((member) => (
        <StructuredData key={member.name} data={personSchema({ ...member, path: "/about" })} />
      ))}
      <h2 className="text-2xl font-black">تیم خودرو چاره</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {team.map((member) => (
          <article key={member.name} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
            {member.image ? (
              <div className="relative h-44">
                <Image src={member.image} alt={member.name} fill sizes="(min-width:1280px) 33vw,(min-width:768px) 50vw,100vw" className="object-cover" />
              </div>
            ) : null}
            <div className="p-5">
              <h3 className="font-black">{member.name}</h3>
              <p className="mt-1 text-xs font-bold text-brand-orange">{member.role}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{member.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
