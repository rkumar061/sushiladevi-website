import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const editorSource = readFileSync("src/components/cms/ContentEditor.tsx", "utf8");
const iconSource = readFileSync("src/components/PagePrimitives.tsx", "utf8");

describe("CMS icon field help", () => {
  it("links icon fields to the searchable Lucide icon library", () => {
    expect(editorSource).toContain("https://lucide.dev/icons/");
    expect(editorSource).toContain("Search Lucide icons");
    expect(editorSource).toContain("isIconField(fieldKey)");
  });

  it("renders valid searched Lucide icon names dynamically", () => {
    expect(iconSource).toContain("DynamicIcon");
    expect(iconSource).toContain("validIconNames.has(name)");
  });
});
