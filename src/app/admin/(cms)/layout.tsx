import { CmsShell } from "@/components/cms/CmsShell";

export const metadata = { title: "CMS Administration", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";
export default function CmsLayout({ children }: { children: React.ReactNode }) { return <CmsShell>{children}</CmsShell>; }
