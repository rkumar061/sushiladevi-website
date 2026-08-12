import { LeadsManager } from "@/components/cms/LeadsManager";
import { requireLeadUser } from "@/cms/auth";

export default async function AdminLeadsPage() { await requireLeadUser(); return <LeadsManager />; }
