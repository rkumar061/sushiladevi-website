import { describe, expect, it } from "vitest";
import { passwordIsStrong } from "../src/cms/auth";

describe("CMS password policy", () => {
  it("requires length, upper/lowercase letters, and a number", () => {
    expect(passwordIsStrong("Short1A")).toBe(false);
    expect(passwordIsStrong("alllowercase12345")).toBe(false);
    expect(passwordIsStrong("Strong-Password-2026")).toBe(true);
  });
});
