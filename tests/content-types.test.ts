import { describe, expect, it } from "vitest";
import { contentValueSchema, documentKeySchema, documentKeys, publicPageDocuments } from "../src/cms/content-types";

describe("CMS content contracts", () => {
  it("accepts serializable nested content", () => {
    expect(contentValueSchema.parse({ title: "Yoga", items: ["Care", 5, true, null] })).toEqual({ title: "Yoga", items: ["Care", 5, true, null] });
  });

  it("rejects unsupported document keys", () => {
    expect(documentKeySchema.safeParse("page.unknown").success).toBe(false);
    expect(documentKeys).toContain("page.facilities");
    expect(publicPageDocuments["page.contact"].path).toBe("/contact");
  });
});
