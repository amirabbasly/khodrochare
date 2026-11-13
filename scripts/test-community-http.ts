import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { withProductionServer } from "./lib/production-server.mjs";
async function main() {
  const directory = await mkdtemp(path.join(tmpdir(), "community-http-"));
  process.env.COMMUNITY_DATA_DIR = directory;
  process.env.COMMUNITY_ADMIN_TOKEN = randomBytes(32).toString("hex");
  try {
    await withProductionServer(async (origin: string) => {
      const url = `${origin}/api/community`, headers = { "Content-Type": "application/json", Origin: origin };
      assert.equal((await fetch(`${url}?moderation=1`)).status, 401);
      assert.equal((await fetch(url, { method: "PATCH", headers, body: "{}" })).status, 401);
      assert.equal((await fetch(url, { method: "POST", headers: { ...headers, Origin: "https://untrusted.test" }, body: "{}" })).status, 403);
      const data = { page: "/تهران", name: "آزمون خودکار", text: "این فقط ورودی تست است و هیچ تجربه واقعی مشتری نیست.", consent: true, rating: 3 };
      assert.equal((await fetch(url, { method: "POST", headers, body: JSON.stringify({ ...data, consent: false }) })).status, 400);
      const response = await fetch(url, { method: "POST", headers, body: JSON.stringify(data) });
      assert.equal(response.status, 201); const { id } = await response.json();
      let publicData = await (await fetch(`${url}?page=${encodeURIComponent(data.page)}`)).json(); assert.equal(publicData.comments.length, 0);
      const duplicate = await fetch(url, { method: "POST", headers, body: JSON.stringify(data) }); assert.equal(duplicate.status, 409);
      const moderated = await fetch(url, { method: "PATCH", headers: { ...headers, Authorization: `Bearer ${process.env.COMMUNITY_ADMIN_TOKEN}` }, body: JSON.stringify({ id, status: "approved", reply: "پاسخ تست بدون ادعای خدمت" }) }); assert.equal(moderated.status, 200);
      publicData = await (await fetch(`${url}?page=${encodeURIComponent(data.page)}`)).json(); assert.equal(publicData.comments.length, 1); assert.equal(publicData.comments[0].rating, 3); assert.equal(publicData.comments[0].reply, "پاسخ تست بدون ادعای خدمت"); assert.equal(publicData.comments[0].consent, undefined);
      console.log("Community HTTP: auth, origin, consent, duplicate, pending privacy, moderation, public fields passed; no customer data used.");
    });
  } finally { await rm(directory, { recursive: true, force: true }); }
}
main().catch(e => { console.error(e); process.exitCode = 1; });
