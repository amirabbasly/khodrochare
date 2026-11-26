import test from "node:test";
import assert from "node:assert/strict";
import { mainMenu } from "../../src/content/main-menu";
import { readFileSync } from "node:fs";

test("main navigation has the requested hierarchy and only local existing hubs", () => {
  assert.deepEqual(mainMenu.map(item => item.label), ["امداد خودرو", "تالار خودرو", "بیمه بازار", "جمعه بازار لوازم یدکی", "دیاگ با هوش مصنوعی", "واردات خودرو", "مجله"]);
  assert.deepEqual(mainMenu.map(item => item.children?.length ?? 0), [4, 3, 3, 5, 0, 1, 0]);
  for (const item of mainMenu) for (const child of item.children ?? []) assert.ok(child.href.startsWith("/") && !child.href.includes("#"));
  const header = readFileSync("src/components/home/site-header.tsx", "utf8");
  assert.ok(header.includes('aria-expanded={expanded === item.label}'));
  assert.ok(header.includes('open ? 1000 : 80'));
  const dock = readFileSync("src/components/site/mobile-bottom-nav.tsx", "utf8");
  assert.ok(dock.includes('href:"/app",label:"سوپر اپلیکیشن خودرو چاره"'));
  assert.ok(dock.includes('href:"/safir",label:"عضویت سفیران"'));
});
