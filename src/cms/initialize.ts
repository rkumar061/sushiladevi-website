import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { resolve } from "node:path";
import { db } from "@/cms/db";
import { seedContentDocuments } from "@/cms/content-repository";

type InitGlobal = typeof globalThis & { __cmsInitPromise?: Promise<void> };
const initGlobal = globalThis as InitGlobal;

async function initialize() {
  migrate(db, { migrationsFolder: resolve("drizzle") });
  await seedContentDocuments();
}

export function ensureCmsInitialized() {
  initGlobal.__cmsInitPromise ??= initialize();
  return initGlobal.__cmsInitPromise;
}
