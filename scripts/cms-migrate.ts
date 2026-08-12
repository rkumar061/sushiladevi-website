import { loadEnvConfig } from "@next/env";

async function main() {
  loadEnvConfig(process.cwd());
  const [{ ensureCmsInitialized }, { databasePath }] = await Promise.all([import("../src/cms/initialize"), import("../src/cms/db")]);
  await ensureCmsInitialized();
  console.log(`CMS migrations and idempotent seed complete: ${databasePath}`);
}

void main();
