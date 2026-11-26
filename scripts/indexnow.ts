import { mkdir, readFile, writeFile, appendFile, open, unlink } from "node:fs/promises";
import { indexNowOrigin, validateChanges, pendingChanges, validateKey } from "./lib/indexnow";

async function main() {
  const file = process.argv[2]; const send = process.argv.includes("--send");
  if (!file) throw Error("tsx scripts/indexnow.ts changes.json [--send]; default is dry-run");
  const changes = validateChanges(JSON.parse(await readFile(file, "utf8")));
  await mkdir(".cache/indexnow", { recursive: true });
  // Exclusive local lock prevents overlapping jobs. Keep state on persistent storage in CI.
  const lockPath=".cache/indexnow/lock";
  const lock=await open(lockPath,"wx");
  try {
    let sent: Record<string, { changedAt: string; sentAt: string }> = {};
    try { sent = JSON.parse(await readFile(".cache/indexnow/sent.json","utf8")); } catch(error) { if((error as NodeJS.ErrnoException).code!=="ENOENT") throw error; }
    const pending=pendingChanges(changes,sent);
    console.log(JSON.stringify({mode:send?"send":"dry-run",pending:pending.length,urls:pending.map(p=>p.url)},null,2));
    if(!send || !pending.length) return;
    const key=validateKey(process.env.INDEXNOW_KEY);
    // Key is intentionally served by the owner as a root text file, not by a new API.
    const keyLocation=`${indexNowOrigin}/${key}.txt`;
    const proof=await fetch(keyLocation,{redirect:"error",signal:AbortSignal.timeout(15000)});
    if(proof.status!==200 || (await proof.text()).trim()!==key) throw Error("Public key file must be deployed and verified before submission");
    const response=await fetch("https://api.indexnow.org/indexnow",{method:"POST",redirect:"error",signal:AbortSignal.timeout(20000),headers:{"Content-Type":"application/json"},body:JSON.stringify({host:new URL(indexNowOrigin).host,key,keyLocation,urlList:pending.map(c=>c.url)})});
    const now=new Date().toISOString();
    await appendFile(".cache/indexnow/attempts.jsonl",JSON.stringify({at:now,status:response.status,count:pending.length,urls:pending.map(c=>c.url)})+"\n");
    if(response.status!==200&&response.status!==202) throw Error(`IndexNow HTTP ${response.status}; no automatic retry; respect Retry-After and inspect logs`);
    for(const change of pending) sent[change.url]={changedAt:change.changedAt,sentAt:now};
    await writeFile(".cache/indexnow/sent.json.tmp",JSON.stringify(sent,null,2));
    await (await import("node:fs/promises")).rename(".cache/indexnow/sent.json.tmp",".cache/indexnow/sent.json");
    console.log(response.status===202?"Received; key validation pending. Not proof of indexing.":"Received. Not proof of indexing or ranking.");
  } finally { await lock.close(); await unlink(lockPath); }
}
main().catch(error=>{ console.error(error instanceof Error ? error.message : "indexnow_failed"); process.exitCode=1; });
