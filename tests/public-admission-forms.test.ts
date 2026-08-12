import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const formFiles = [
  "AdmissionBannerSection.tsx",
  "ContactPageForm.tsx",
  "FooterSection.tsx",
];

const requestedFields = [
  "studentName",
  "parentName",
  "studentMobile",
  "parentMobile",
  "city",
  "message",
];

describe("public admission forms", () => {
  for (const file of formFiles) {
    it(`${file} uses the six requested fields without a course field`, () => {
      const source = readFileSync(join(process.cwd(), "src", "components", file), "utf8");

      for (const field of requestedFields) {
        expect(source, `${file} should bind ${field}`).toContain(`formData.${field}`);
      }

      expect(source).not.toMatch(/formData\.course|fields\.course|courseOptions|courseLabel|coursePlaceholder|<select\b/i);
      expect(source).toMatch(/<textarea\b/);
    });
  }
});
