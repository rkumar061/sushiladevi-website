import Link from "next/link";
import { notFound } from "next/navigation";
import { documentKeySchema } from "@/cms/content-types";
import { ensureCmsInitialized } from "@/cms/initialize";
import { listRevisions } from "@/cms/content-repository";
import { requireAdminUser } from "@/cms/auth";

export default async function RevisionPreviewPage({ params }: { params: Promise<{ key: string; revisionId: string }> }) {
  await requireAdminUser();
  await ensureCmsInitialized();
  const { key: rawKey, revisionId } = await params;
  const parsed = documentKeySchema.safeParse(decodeURIComponent(rawKey));
  if (!parsed.success) notFound();
  const revision = (await listRevisions(parsed.data)).find((item) => item.id === revisionId);
  if (!revision) notFound();
  return <div className="mx-auto max-w-5xl"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Revision preview</p><h1 className="mt-1 text-3xl font-black">{parsed.data} · version {revision.version}</h1><p className="mt-2 text-sm text-gray-500">Published {revision.publishedAt.toLocaleString()}</p></div><Link href={`/admin/content/${encodeURIComponent(parsed.data)}`} className="cms-secondary-button">Back to editor</Link></div><pre className="mt-7 max-h-[75vh] overflow-auto rounded-2xl border bg-white p-5 text-xs leading-6 text-gray-800">{JSON.stringify(JSON.parse(revision.contentJson), null, 2)}</pre></div>;
}
