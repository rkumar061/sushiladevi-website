import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const dbPath = path.resolve(process.cwd(), "live_data/cms.sqlite");
console.log("Reading database from:", dbPath);

const sqlite = new Database(dbPath);

const tables = sqlite.prepare("SELECT name FROM sqlite_master WHERE type='table'").all() as any[];
console.log("Tables in DB:", tables);

const dumpData: Record<string, any> = {};

for (const t of tables) {
  const tableName = t.name;
  if (tableName.startsWith("sqlite_")) continue;

  const pragma = sqlite.prepare(`PRAGMA table_info(${tableName})`).all();
  console.log(`Table ${tableName} schema:`, pragma.map((p: any) => p.name));

  const rows = sqlite.prepare(`SELECT * FROM ${tableName}`).all();
  console.log(`Table ${tableName} row count: ${rows.length}`);
  dumpData[tableName] = rows;
}

const outputPath = path.resolve(process.cwd(), "live_db_dump.json");
fs.writeFileSync(outputPath, JSON.stringify(dumpData, null, 2));
console.log("Successfully wrote full DB dump to:", outputPath);
