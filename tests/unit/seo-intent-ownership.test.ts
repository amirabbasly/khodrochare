import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { onlineTitle, onlineDescription } from "../../src/content/online-assistance";

test("online service and application installation retain distinct intent ownership", () => {
  const online = readFileSync("src/components/pages/online-assistance-page.tsx", "utf8");
  const app = readFileSync("src/app/app/page.tsx", "utf8");
  assert.ok(onlineTitle.startsWith("درخواست امداد خودرو آنلاین"));
  assert.ok(onlineDescription.includes("هزینه و پوشش"));
  assert.ok(!onlineDescription.includes("دانلود اندروید"));
  assert.ok(app.includes("دانلود اندروید و نسخه وب آیفون"));
  for (const path of ["/app", "/pricing", "/امداد-خودرو", "/تهران", "/کرج"]) assert.ok(online.includes(`"${path}"`));
  assert.ok(online.includes("path: onlinePath"));
  assert.ok(app.includes('path: "/app"'));
  assert.ok(!online.includes("<ServiceRequestForm"));
});
