import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import config from "../../next.config";
import { appDownloads, getAppDownload } from "../../src/lib/app-downloads";

test("CSP allows only the required Cloudflare beacon origins and preserves restrictions", async () => {
  const rules = await config.headers!();
  const csp = rules.find(rule => rule.source === "/:path*")!.headers.find(h => h.key === "Content-Security-Policy")!.value;
  const directives = Object.fromEntries(csp.split(";").map(d => { const [name, ...values] = d.trim().split(/\s+/); return [name, values]; }));
  assert.ok(directives["script-src"].includes("https://static.cloudflareinsights.com"));
  assert.ok(directives["connect-src"].includes("https://cloudflareinsights.com"));
  assert.ok(!directives["script-src"].includes("https:"));
  assert.ok(!directives["script-src"].includes("*"));
  assert.deepEqual(directives["object-src"], ["'none'"]);
  assert.deepEqual(directives["frame-ancestors"], ["'none'"]);
  const downloads = rules.find(rule => rule.source === "/downloads/:path*")!;
  assert.ok(downloads.headers.some(h => h.key === "X-Robots-Tag" && h.value === "noindex, nofollow"));
  assert.ok(downloads.headers.some(h => h.key === "Content-Disposition" && h.value === "attachment"));
});

test("download links require a nonempty file, are separate, and never expose filesystem paths", () => {
  const root = mkdtempSync(join(tmpdir(), "khodrochare-download-test-"));
  try {
    mkdirSync(join(root, "downloads"));
    assert.equal(getAppDownload("customer", root).available, false);
    writeFileSync(join(root, "downloads", appDownloads.customer.filename), "");
    assert.equal(getAppDownload("customer", root).available, false);
    // Fixture tests availability only, not Android package validity or signing.
    writeFileSync(join(root, "downloads", appDownloads.customer.filename), "test fixture");
    const release = getAppDownload("customer", root);
    assert.equal(release.available, true);
    assert.equal(release.href, "/downloads/khodrochare-customer.apk");
    assert.equal(release.bytes, 12);
    mkdirSync(join(root, "downloads", appDownloads.fleet.filename));
    assert.equal(getAppDownload("fleet", root).available, false);
    assert.notEqual(appDownloads.customer.filename as string, appDownloads.fleet.filename as string);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
