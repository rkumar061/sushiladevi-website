import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";

export async function GET() {
  const pdfPath = join(
    process.cwd(),
    "referances",
    "Susheeladevi Naturopathy and Yogic Sciences Medical College.pdf",
  );
  const pdf = await readFile(pdfPath);

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Susheeladevi-BNYS-Prospectus.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
