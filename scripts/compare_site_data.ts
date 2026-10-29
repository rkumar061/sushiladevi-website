import fs from "node:fs";
import path from "node:path";

const dumpPath = path.resolve(process.cwd(), "live_db_dump.json");
const dump = JSON.parse(fs.readFileSync(dumpPath, "utf-8"));

const docs = dump.content_documents || [];
console.log(`Found ${docs.length} content_documents:`);

for (const doc of docs) {
  console.log(`=== DOCUMENT KEY: ${doc.key} ===`);
  const published = JSON.parse(doc.published_json || doc.draft_json || "{}");
  console.log(JSON.stringify(published, null, 2).slice(0, 500) + "...\n");
}
