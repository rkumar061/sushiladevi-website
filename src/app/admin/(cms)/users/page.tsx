import { UsersManager } from "@/components/cms/UsersManager";
import { requireAdminUser } from "@/cms/auth";
export default async function AdminUsersPage() { await requireAdminUser(); return <div className="mx-auto max-w-7xl"><UsersManager /></div>; }
