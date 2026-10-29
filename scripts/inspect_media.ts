import fs from "node:fs";
import path from "node:path";

const dumpPath = path.resolve(process.cwd(), "live_db_dump.json");
const dump = JSON.parse(fs.readFileSync(dumpPath, "utf-8"));

const media = dump.media_assets || [];
console.log(`Found ${media.length} media_assets in live DB:`);
for (const m of media) {
  console.log(`- ID: ${m.id} | Original: ${m.original_name} | Path: ${m.storage_path} | Public: ${m.public_url}`);
}
