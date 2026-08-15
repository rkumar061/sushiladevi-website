import { describe, expect, it } from "vitest";
import { humanizeFilename } from "../src/cms/media";

describe("media multi-upload utilities", () => {
  it("correctly humanizes file names for default alt text", () => {
    expect(humanizeFilename("campus_building_01.jpg")).toBe("campus building 01");
    expect(humanizeFilename("annual-day-event-photo.png")).toBe("annual day event photo");
    expect(humanizeFilename("prospectus-2026.pdf")).toBe("prospectus 2026");
    expect(humanizeFilename(".jpg")).toBe("Media file");
  });
});
