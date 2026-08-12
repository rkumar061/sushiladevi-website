import { MediaLibrary } from "@/components/cms/MediaLibrary";
import { requireAdminUser } from "@/cms/auth";
export default async function AdminMediaPage() { await requireAdminUser(); return <div className="mx-auto max-w-7xl"><MediaLibrary /></div>; }
