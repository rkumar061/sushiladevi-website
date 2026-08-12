import { describe, expect, it } from "vitest";
import { draftRequest, previewUrl, publishRequest } from "@/components/cms/contentEditorActions";

describe("content editor actions", () => {
  it("saves only a draft using the current draft version", () => {
    const request = draftRequest({ heading: "Draft heading" }, 7);
    expect(request.method).toBe("PUT");
    expect(JSON.parse(String(request.body))).toEqual({ value: { heading: "Draft heading" }, expectedVersion: 7 });
  });

  it("publishes separately using the current draft version", () => {
    const request = publishRequest(8);
    expect(request.method).toBe("POST");
    expect(JSON.parse(String(request.body))).toEqual({ expectedDraftVersion: 8 });
  });

  it("routes previews through the draft-mode endpoint", () => {
    expect(previewUrl("page.home")).toBe("/api/admin/preview?path=%2F");
    expect(previewUrl("page.chairman")).toBe("/api/admin/preview?path=%2Fabout%2Fchairmans-desk");
    expect(previewUrl("global")).toBeUndefined();
  });
});
