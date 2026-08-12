import { notFound } from "next/navigation";
import { documentKeySchema } from "@/cms/content-types";
import { ensureCmsInitialized } from "@/cms/initialize";
import { getContentDocument, listRevisions } from "@/cms/content-repository";
import { ContentEditor } from "@/components/cms/ContentEditor";
import { requireAdminUser } from "@/cms/auth";

export default async function ContentDocumentPage({ params }: { params: Promise<{ key: string }> }) {
  await requireAdminUser();
  await ensureCmsInitialized();
  const parsed = documentKeySchema.safeParse(decodeURIComponent((await params).key));
  if (!parsed.success) notFound();
  const [document, revisions] = await Promise.all([getContentDocument(parsed.data), listRevisions(parsed.data)]);
  if (!document) notFound();
  return <div className="mx-auto max-w-[1500px]"><ContentEditor initialDocument={document} initialRevisions={revisions} /></div>;
}
