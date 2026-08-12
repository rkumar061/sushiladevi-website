import { cp, mkdir } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
import { loadEnvConfig } from "@next/env";

async function main() {
  loadEnvConfig(process.cwd());
  const [{ databasePath, sqlite }, { ensureCmsInitialized }] = await Promise.all([import("../src/cms/db"), import("../src/cms/initialize")]);
  await ensureCmsInitialized();
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupRoot = resolve(process.env.CMS_BACKUP_DIR || "backups", stamp);
  await mkdir(backupRoot, { recursive: true });
  const databaseBackup = resolve(backupRoot, basename(databasePath));
  await sqlite.backup(databaseBackup);
  const uploads = resolve(process.env.CMS_UPLOAD_DIR || "storage/uploads");
  await cp(uploads, resolve(backupRoot, "uploads"), { recursive: true, force: false }).catch((error: NodeJS.ErrnoException) => {
    if (error.code !== "ENOENT") throw error;
  });
  console.log(`Consistent CMS backup created in ${dirname(databaseBackup)}`);
}

void main();
