import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { cmsSchema } from "@/cms/schema";

const databasePath = resolve(/* turbopackIgnore: true */ process.env.CMS_DATABASE_PATH || "data/cms.sqlite");

type CmsGlobal = typeof globalThis & {
  __cmsSqlite?: Database.Database;
};

const cmsGlobal = globalThis as CmsGlobal;

function createSqlite() {
  mkdirSync(dirname(databasePath), { recursive: true });
  const sqlite = new Database(databasePath);
  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("foreign_keys = ON");
  sqlite.pragma("busy_timeout = 5000");
  return sqlite;
}

export const sqlite = cmsGlobal.__cmsSqlite ?? createSqlite();
if (process.env.NODE_ENV !== "production") cmsGlobal.__cmsSqlite = sqlite;

export const db = drizzle(sqlite, { schema: cmsSchema });
export { databasePath };
