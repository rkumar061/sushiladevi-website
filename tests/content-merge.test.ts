import { describe, expect, it } from "vitest";
import { mergeContentDefaults } from "../src/cms/content-repository";

describe("CMS additive defaults", () => {
  it("adds new managed fields without overwriting saved editor values", () => {
    const defaults = { title: "Default", labels: { save: "Save", publish: "Publish" }, cards: [{ title: "Seed" }] };
    const stored = { title: "Edited", labels: { save: "Keep changes" }, cards: [{ title: "Custom" }] };
    expect(mergeContentDefaults(defaults, stored)).toEqual({
      title: "Edited",
      labels: { save: "Keep changes", publish: "Publish" },
      cards: [{ title: "Custom" }],
    });
  });
});
