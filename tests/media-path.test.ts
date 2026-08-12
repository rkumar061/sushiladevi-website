import { describe, expect, it } from "vitest";
import { extensionFromName, resolveMediaPath, uploadRoot } from "../src/cms/media";

describe("media path safety", () => {
  it("keeps stored media inside the configured upload root", () => {
    expect(resolveMediaPath("2026/08/file.webp").startsWith(uploadRoot)).toBe(true);
    expect(() => resolveMediaPath("../../outside.exe")).toThrow("INVALID_MEDIA_PATH");
  });

  it("normalizes filename extensions", () => {
    expect(extensionFromName("Prospectus.PDF")).toBe(".pdf");
  });
});
