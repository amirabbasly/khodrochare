import { communityDirectory, readComments, saveComment } from "../src/lib/community";
import { suggestReply } from "../src/lib/community-replies";
import { getBlogPost } from "../src/content/blog";
async function main() {
  const directory = communityDirectory(); if (!directory) throw Error("Set absolute COMMUNITY_DATA_DIR on persistent private storage");
  const [command, id, option] = process.argv.slice(2);
  const comments = await readComments(directory);
  if (command === "list") { console.log(JSON.stringify(comments.filter(c => c.status === "pending"), null, 2)); return; }
  const comment = comments.find(c => c.id === id); if (!comment) throw Error("Comment not found");
  if (command === "suggest") { console.log(suggestReply(comment.text, comment.page.startsWith("/blog/") ? getBlogPost(comment.page.slice(6))?.faqs ?? [] : [])); return; }
  if (!["approve", "reject", "delete"].includes(command)) throw Error("Use list, suggest ID, approve ID [reply text], reject ID, delete ID");
  if (command === "delete") { await (await import("node:fs/promises")).unlink(`${directory}/${comment.id}.json`); return; }
  // Operator must review suggestion and supply the exact response explicitly.
  await saveComment(directory, { ...comment, status: command === "approve" ? "approved" : "rejected", reply: option || undefined, moderatedAt: new Date().toISOString() });
  console.log("Moderation saved");
}
main().catch(e => { console.error(e.message); process.exitCode = 1; });
