import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getGoogleMapsEmbedUrl } from "@/lib/googleMaps";

describe("Google Maps embed handling", () => {
  it("accepts Google Maps embed URLs", () => {
    expect(getGoogleMapsEmbedUrl("https://www.google.com/maps/embed?pb=location-data")).toContain("google.com/maps/embed");
    expect(getGoogleMapsEmbedUrl("https://www.google.co.in/maps?q=Jagadal&output=embed")).toContain("output=embed");
  });

  it("rejects share links, non-Google hosts and unsafe protocols", () => {
    expect(getGoogleMapsEmbedUrl("https://maps.app.goo.gl/example")).toBeNull();
    expect(getGoogleMapsEmbedUrl("https://example.com/maps/embed")).toBeNull();
    expect(getGoogleMapsEmbedUrl("javascript:alert(1)")).toBeNull();
  });

  it("renders the configured URL and provides CMS instructions", () => {
    const page = readFileSync("src/app/contact/page.tsx", "utf8");
    const editor = readFileSync("src/components/cms/ContentEditor.tsx", "utf8");
    expect(page).toContain("<iframe");
    expect(page).toContain("getGoogleMapsEmbedUrl");
    expect(page).not.toContain("placeholderTitle");
    expect(editor).toContain("Find location on Google Maps");
    expect(editor).toContain("Share → Embed a map");
  });
});
