import fs from "node:fs";
import path from "node:path";
import { siteData } from "../src/data/siteData";

const dumpPath = path.resolve(process.cwd(), "live_db_dump.json");
const dump = JSON.parse(fs.readFileSync(dumpPath, "utf-8"));

const docs = dump.content_documents || [];
const liveMap: Record<string, any> = {};

for (const doc of docs) {
  liveMap[doc.key] = JSON.parse(doc.published_json || doc.draft_json || "{}");
}

console.log("=== COMPARING LIVE DB WITH SITE DATA ===");

const diffSummary: Record<string, any> = {};

if (liveMap["global"]) {
  diffSummary.global = liveMap["global"];
}
if (liveMap["navigation"]) {
  diffSummary.navigation = liveMap["navigation"];
}
if (liveMap["shared"]) {
  diffSummary.shared = liveMap["shared"];
}
if (liveMap["page.home"]) {
  diffSummary["home"] = liveMap["page.home"];
}
if (liveMap["page.about"]) {
  diffSummary["about"] = liveMap["page.about"];
}
if (liveMap["page.chairman"]) {
  diffSummary["chairman"] = liveMap["page.chairman"];
}
if (liveMap["page.campusLife"]) {
  diffSummary["campusLife"] = liveMap["page.campusLife"];
}
if (liveMap["page.bnys"]) {
  diffSummary["bnys"] = liveMap["page.bnys"];
}
if (liveMap["page.whyChooseUs"]) {
  diffSummary["whyChooseUs"] = liveMap["page.whyChooseUs"];
}
if (liveMap["page.faqs"]) {
  diffSummary["faqs"] = liveMap["page.faqs"];
}
if (liveMap["page.faculty"]) {
  diffSummary["faculty"] = liveMap["page.faculty"];
}
if (liveMap["page.facilities"]) {
  diffSummary["facilities"] = liveMap["page.facilities"];
}
if (liveMap["page.contact"]) {
  diffSummary["contact"] = liveMap["page.contact"];
}

console.log("Extracted Live Site Data documents summary keys:", Object.keys(diffSummary));

fs.writeFileSync(
  path.resolve(process.cwd(), "live_siteData_reconstructed.json"),
  JSON.stringify(diffSummary, null, 2)
);
console.log("Wrote live_siteData_reconstructed.json");
