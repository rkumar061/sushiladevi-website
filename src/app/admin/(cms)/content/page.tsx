import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { contentCatalog } from "@/components/cms/contentCatalog";
import { requireAdminUser } from "@/cms/auth";

export default async function AdminContentPage() {
  await requireAdminUser();
  return (
    <div className="mx-auto max-w-6xl">
      <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Content</p>
      <h1 className="mt-2 text-3xl font-black">Manage website content</h1>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
        Select a site-wide area or public page. Changes remain drafts until you publish them from the editor.
      </p>

      <div className="mt-8 space-y-8">
        {contentCatalog.map((group) => (
          <section key={group.label} aria-labelledby={`content-${group.label.toLowerCase()}`}>
            <div>
              <h2 id={`content-${group.label.toLowerCase()}`} className="text-xl font-black text-gray-950">{group.label}</h2>
              <p className="mt-1 text-sm text-gray-600">{group.description}</p>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <Link
                  key={item.key}
                  href={`/admin/content/${encodeURIComponent(item.key)}`}
                  className="group flex min-h-36 flex-col rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-lg bg-emerald-50 p-2 text-emerald-700"><FileText className="h-4 w-4" /></span>
                    <ArrowRight className="h-4 w-4 text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-emerald-700" />
                  </div>
                  <h3 className="mt-4 font-black text-gray-950">{item.label}</h3>
                  <p className="mt-1 text-sm leading-5 text-gray-600">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
