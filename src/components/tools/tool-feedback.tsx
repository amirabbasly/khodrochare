"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ToolId } from "@/content/tool-ids";

export function recordToolUse(tool: ToolId) {
  window.dispatchEvent(new CustomEvent("roadside-tool-result", { detail: { tool } }));
}
export function ToolFeedback({ title, children, summary, links = [] }: { title: string; children: React.ReactNode; summary?: string; links?: { title: string; href: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [copyState, setCopyState] = useState("");
  useEffect(() => { ref.current?.focus({ preventScroll: true }); }, [title]);
  return <div ref={ref} tabIndex={-1} data-testid="tool-result" className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-5 text-sm leading-8 text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange" role="status" aria-live="polite"><h3 className="text-lg font-black text-ink">{title}</h3><div className="mt-3 space-y-3">{children}</div>{summary && <><details className="mt-4"><summary className="cursor-pointer font-bold">خلاصه قابل انتخاب برای تماس</summary><p className="mt-2 whitespace-pre-line select-text rounded-lg bg-white p-3">{summary}</p></details><button type="button" onClick={async () => { try { await navigator.clipboard.writeText(summary); setCopyState("خلاصه کپی شد."); } catch { setCopyState("کپی خودکار در دسترس نیست؛ خلاصه بالا را باز و متن را دستی انتخاب کنید."); } }} className="mt-3 min-h-11 rounded-lg border border-orange-300 px-4 font-bold text-ink">کپی خلاصه با انتخاب شما</button>{copyState && <p className="mt-2 text-xs" role="status">{copyState}</p>}</>}{links.length > 0 && <nav aria-label="اقدام بعدی ابزار" className="mt-4 flex flex-wrap gap-3">{links.map((link) => <Link key={link.href} href={link.href} className="rounded-lg border border-orange-200 bg-white px-4 py-2 font-bold text-brand-orange">{link.title} ←</Link>)}</nav>}</div>;
}
