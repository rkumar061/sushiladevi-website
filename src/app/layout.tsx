import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { draftMode } from "next/headers";
import "./globals.css";
import { loadSiteContent } from "@/cms/public-content";
import { SiteContentProvider } from "@/components/SiteContentProvider";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export async function generateMetadata(): Promise<Metadata> {
  const content = await loadSiteContent();
  const preview = await draftMode();
  return {
    metadataBase: new URL(content.global.siteUrl),
    title: { default: content.global.defaultSeo.title, template: "%s | Susheeladevi College" },
    description: content.global.defaultSeo.description,
    robots: preview.isEnabled ? { index: false, follow: false } : undefined,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await loadSiteContent();
  const preview = await draftMode();
  return (
    <html lang="en" className={`${jakartaSans.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-white text-gray-900 min-h-screen">
        {preview.isEnabled && (
          <aside className="sticky top-0 z-[100] flex items-center justify-center gap-4 bg-amber-300 px-4 py-2 text-center text-sm font-bold text-amber-950 shadow-md" role="status">
            <span>Draft preview — this is not the live website.</span>
            <a href="/api/admin/preview?exit=1" className="rounded-full bg-amber-950 px-3 py-1 text-xs font-bold text-white hover:bg-black">Exit preview</a>
          </aside>
        )}
        <SiteContentProvider content={content}>{children}</SiteContentProvider>
      </body>
    </html>
  );
}
