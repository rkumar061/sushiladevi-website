import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { defaultDocuments } from "../src/cms/content-repository";
import { documentKeys, publicPageDocuments } from "../src/cms/content-types";
import { siteData } from "../src/data/siteData";

describe("CMS public page coverage", () => {
  const publicDocumentKeys = documentKeys.filter((key) => key.startsWith("page."));

  it("gives every page document a public route and a site-data page", () => {
    expect(Object.keys(publicPageDocuments).sort()).toEqual([...publicDocumentKeys].sort());

    for (const [documentKey, definition] of Object.entries(publicPageDocuments)) {
      expect(siteData.pages).toHaveProperty(definition.page);
      expect(defaultDocuments[documentKey as keyof typeof defaultDocuments]).toBe(siteData.pages[definition.page]);
    }
  });

  it("keeps every CMS route backed by a public page component", () => {
    for (const { path } of Object.values(publicPageDocuments)) {
      const relativePage = path === "/" ? "page.tsx" : `${path.slice(1)}/page.tsx`;
      expect(existsSync(resolve(process.cwd(), "src/app", relativePage))).toBe(true);
    }
  });

  it("does not leave a public page component outside the CMS manifest", () => {
    const knownPaths = new Set(Object.values(publicPageDocuments).map(({ path }) => path));
    const expectedPaths = ["/", "/about", "/about/chairmans-desk", "/bnys", "/campus-life", "/contact", "/facilities", "/faculty", "/faqs", "/why-choose-us"];
    expect([...knownPaths].sort()).toEqual(expectedPaths.sort());
  });
});
