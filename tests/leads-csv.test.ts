import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { escapeCsvCell, leadsToCsv } from "@/cms/leads-csv";

const lead = {
  id: "lead-1",
  name: "Legacy Student",
  email: null,
  phone: "9000000000",
  source: "contact-page",
  pageUrl: "/contact",
  status: "new",
  notes: "Call tomorrow",
  message: "Legacy message",
  fields: {
    studentName: "Ananya, Sharma",
    parentName: "Raj Sharma",
    studentMobile: "9876543210",
    parentMobile: "9876501234",
    city: "Pune",
    message: "Please share fees",
  },
  createdAt: "2026-08-11T12:00:00.000Z",
  updatedAt: "2026-08-11T12:05:00.000Z",
};

describe("lead CSV export", () => {
  it("exports the admission fields and management columns as Excel-friendly CSV", () => {
    const csv = leadsToCsv([lead]);
    expect(csv.startsWith("\uFEFF")).toBe(true);
    expect(csv).toContain('"Student Name"');
    expect(csv).toContain('"Ananya, Sharma"');
    expect(csv).toContain('"9876501234"');
    expect(csv).toContain('"Call tomorrow"');
  });

  it("neutralizes spreadsheet formulas and escapes quotes", () => {
    expect(escapeCsvCell('=HYPERLINK("bad")')).toBe('"\'=HYPERLINK(""bad"")"');
  });

  it("keeps the export endpoint protected by lead-role authorization", () => {
    const route = readFileSync("src/app/api/admin/leads/export/route.ts", "utf8");
    expect(route).toContain("canManageLeads(user)");
    expect(route).toContain('Content-Disposition');
    expect(route).toContain('Cache-Control');
  });
});
