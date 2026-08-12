import { loadEnvConfig } from "@next/env";

async function main() {
  loadEnvConfig(process.cwd());
  const [{ count }, { db }, { users }, { createCmsUser }, { ensureCmsInitialized }] = await Promise.all([
    import("drizzle-orm"), import("../src/cms/db"), import("../src/cms/schema"), import("../src/cms/auth"), import("../src/cms/initialize"),
  ]);
  await ensureCmsInitialized();
  const email = process.env.CMS_BOOTSTRAP_EMAIL;
  const name = process.env.CMS_BOOTSTRAP_NAME;
  const password = process.env.CMS_BOOTSTRAP_PASSWORD;
  if (!email || !name || !password) throw new Error("Set CMS_BOOTSTRAP_EMAIL, CMS_BOOTSTRAP_NAME, and CMS_BOOTSTRAP_PASSWORD.");
  const [existing] = await db.select({ value: count() }).from(users);
  if (existing.value > 0) throw new Error("Bootstrap refused: a CMS user already exists.");
  await createCmsUser({ email, name, password, mustChangePassword: true });
  console.log(`Created the first CMS account for ${email}. Log in, change the password, then remove the bootstrap variables.`);
}

void main();
