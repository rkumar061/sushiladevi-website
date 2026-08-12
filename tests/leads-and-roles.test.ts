import { describe, expect, it } from "vitest";
import { canManageLeads, isAdmin, type CmsUser } from "../src/cms/auth";
import { hashLeadIp, leadStatuses } from "../src/cms/lead-repository";

const user = (role: CmsUser["role"]): CmsUser => ({
  id: "user-id", email: "staff@example.com", name: "Staff", role,
  active: true, mustChangePassword: false,
});

describe("CMS lead roles", () => {
  it("allows both roles to manage leads but only admins to manage the CMS", () => {
    expect(canManageLeads(user("admin"))).toBe(true);
    expect(canManageLeads(user("admission_staff"))).toBe(true);
    expect(isAdmin(user("admin"))).toBe(true);
    expect(isAdmin(user("admission_staff"))).toBe(false);
  });

  it("provides the supported lead workflow and one-way IP hashes", () => {
    expect(leadStatuses).toEqual(["new", "contacted", "qualified", "admitted", "closed"]);
    expect(hashLeadIp("192.0.2.1")).toBe(hashLeadIp("192.0.2.1"));
    expect(hashLeadIp("192.0.2.1")).not.toBe(hashLeadIp("192.0.2.2"));
  });
});
