import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/cms/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.CMS_DATABASE_PATH || "./data/cms.sqlite",
  },
});
