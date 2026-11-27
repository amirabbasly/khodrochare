import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

test("diagnostic device displays supplied prices, app entry, and compatibility qualifications", () => {
  const device = readFileSync("src/components/assistant/diagnostic-device.tsx", "utf8");
  for (const text of ["۱٬۱۵۰٬۰۰۰ تومان", "۵۵۹٬۰۰۰", "بلک فرایدی", "GPS", "ریمپ", "تأیید نشده", 'href="/app"', 'href="/contact"']) assert.ok(device.includes(text));
  assert.ok(existsSync("public/images/khodrochare-obd-tool.webp"));
  assert.ok(readFileSync("src/app/assistant/page.tsx", "utf8").includes("<DiagnosticDevice />"));
});

test("navigation uses animated persistent panels and SVG chevrons", () => {
  const header = readFileSync("src/components/home/site-header.tsx", "utf8");
  assert.ok(header.includes("function MenuChevron()"));
  assert.ok(header.includes('data-open={desktopExpanded === item.label}'));
  assert.ok(header.includes('data-open={expanded === item.label}'));
  assert.ok(header.includes('inert={expanded !== item.label}'));
  assert.ok(!header.includes("⌄"));
});
