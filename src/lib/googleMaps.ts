export const GOOGLE_MAPS_SEARCH_URL = "https://www.google.com/maps";

export function getGoogleMapsEmbedUrl(value: unknown) {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const url = new URL(value.trim());
    const hostname = url.hostname.toLowerCase();
    const isGoogleHost = hostname === "google.com" || hostname.endsWith(".google.com") || hostname === "google.co.in" || hostname.endsWith(".google.co.in");
    const isEmbedPath = url.pathname.startsWith("/maps/embed") || url.pathname.startsWith("/maps/d/embed");
    const isEmbedQuery = url.pathname === "/maps" && url.searchParams.get("output") === "embed";
    return url.protocol === "https:" && isGoogleHost && (isEmbedPath || isEmbedQuery) ? url.toString() : null;
  } catch {
    return null;
  }
}
