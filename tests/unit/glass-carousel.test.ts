import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
test("centred mobile reviews keep genuine feedback, keyboard access and reduced motion",()=>{
 const code=readFileSync("src/components/home/home-feedback.tsx","utf8");
 for(const part of ["ResizeObserver","first.offsetWidth","data-active={active===index}","ArrowLeft","ArrowRight","prefers-reduced-motion","{feedback.text}"])assert.ok(code.includes(part),part);
 assert.ok(!code.includes(">‹</button>")&&!code.includes(">›</button>"));
 const css=readFileSync("src/app/globals.css","utf8");
 assert.ok(css.includes("scroll-snap-align:center")&&css.includes('feedback-card[data-active="true"]'));
 // Keep standard declaration after the WebKit alias: the optimiser otherwise retains only the prefix.
 assert.ok(css.includes("-webkit-backdrop-filter:blur(22px) saturate(160%); backdrop-filter:blur(22px) saturate(160%);"));
});
