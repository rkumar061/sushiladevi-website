import { describe, expect, it } from "vitest";
import { admissionLeadFieldKeys, leadSubmissionSchema } from "@/lib/lead-contract";

const validLead = {
  studentName: "Ananya Sharma",
  parentName: "Raj Sharma",
  studentMobile: "9876543210",
  parentMobile: "9876501234",
  city: "Pune",
  message: "Please share admission details.",
  source: "contact-page",
  page: "/contact",
};

describe("admission lead contract", () => {
  it("accepts exactly the six admission response fields with metadata", () => {
    const parsed = leadSubmissionSchema.parse(validLead);
    expect(admissionLeadFieldKeys.every((key) => key in parsed)).toBe(true);
  });

  it("rejects the legacy name, phone and course payload", () => {
    expect(leadSubmissionSchema.safeParse({ name: "Ananya", phone: "9876543210", course: "BNYS", source: "footer" }).success).toBe(false);
  });

  it("accepts an empty message while preserving the message field", () => {
    expect(leadSubmissionSchema.parse({ ...validLead, message: "" }).message).toBe("");
  });
});
