import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import robots from "../../src/app/robots";
import { validateChanges, pendingChanges, validateKey } from "../../scripts/lib/indexnow";

test("search bot rules exclude API independently and do not change training policy",()=>{
  const rules=robots().rules as {userAgent:string;allow:string;disallow:string[]}[];
  for(const name of ["Googlebot","Bingbot","YandexBot","YandexImages","OAI-SearchBot","PerplexityBot","GPTBot"]) {
    const rule=rules.find(r=>r.userAgent===name)!; assert.ok(rule); assert.equal(rule.allow,"/"); assert.deepEqual(rule.disallow,["/api/"]);
  }
});
test("IndexNow accepts explicit canonical changes including deletion, not private/cross-host URLs",()=>{
 const change={url:"https://khodrochare.ir/تهران",changedAt:"2026-10-16",type:"updated"};
 assert.equal(validateChanges([change,change]).length,1);
 assert.equal(validateChanges([{...change,type:"deleted"}])[0].type,"deleted");
 for(const url of ["https://evil.invalid/", "https://khodrochare.ir/api/chat", "https://khodrochare.ir/?utm_source=test", "https://khodrochare.ir/#request","https://khodrochare.ir/%61pi/chat"])
   assert.throws(()=>validateChanges([{...change,url}]));
 assert.throws(()=>validateChanges([{...change,changedAt:"2999-01-01"}]));
 assert.throws(()=>validateKey("bad key")); assert.equal(validateKey("valid-key-123"),"valid-key-123");
});
test("IndexNow deduplication and cooldown avoid repeated submissions",()=>{
 const changes=validateChanges([{url:"https://khodrochare.ir/",changedAt:"2026-10-16",type:"updated"}]);
 assert.equal(pendingChanges(changes,{"https://khodrochare.ir/":{changedAt:"2026-10-16",sentAt:"2026-10-16"}},Date.parse("2026-10-17")).length,0);
 assert.equal(pendingChanges(changes,{}).length,1);
 const newer=validateChanges([{url:"https://khodrochare.ir/",changedAt:"2026-10-17T00:00:00Z",type:"updated"}]);
 const prior={"https://khodrochare.ir/":{changedAt:"2026-10-16T00:00:00Z",sentAt:"2026-10-16T18:00:00Z"}};
 assert.equal(pendingChanges(newer,prior,Date.parse("2026-10-17T01:00:00Z")).length,0);
 assert.equal(pendingChanges(newer,prior,Date.parse("2026-10-18T01:00:00Z")).length,1);
});
test("comparison has exactly three columns and no standalone criterion cells",()=>{
 const s=readFileSync("src/components/home/service-promise.tsx","utf8");
 assert.ok(!s.includes(">معیار مقایسه</th>")); assert.ok(!s.includes('className="comparison-criterion"')); assert.equal((s.match(/scope="col"/g)??[]).length,3); assert.ok(s.includes('scope="row"'));
});
