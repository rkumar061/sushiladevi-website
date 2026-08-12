interface CsvLead {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  source: string;
  pageUrl: string | null;
  status: string;
  notes: string | null;
  message: string | null;
  fields?: Record<string, unknown>;
  createdAt: Date | string;
  updatedAt: Date | string;
}

const textField = (lead: CsvLead, key: string, fallback = "") => typeof lead.fields?.[key] === "string" ? lead.fields[key] : fallback;

export function escapeCsvCell(value: unknown) {
  let text = value == null ? "" : String(value);
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}

export function leadsToCsv(leads: CsvLead[]) {
  const headings = [
    "Lead ID", "Student Name", "Parent Name", "Student Mobile", "Parent Mobile", "City", "Message",
    "Status", "Source", "Page", "Internal Notes", "Email (legacy)", "Received At", "Updated At",
  ];
  const rows = leads.map((lead) => [
    lead.id,
    textField(lead, "studentName", lead.name || ""),
    textField(lead, "parentName"),
    textField(lead, "studentMobile", lead.phone || ""),
    textField(lead, "parentMobile"),
    textField(lead, "city"),
    textField(lead, "message", lead.message || ""),
    lead.status,
    lead.source,
    lead.pageUrl || "",
    lead.notes || "",
    lead.email || "",
    new Date(lead.createdAt).toISOString(),
    new Date(lead.updatedAt).toISOString(),
  ]);
  return `\uFEFF${[headings, ...rows].map((row) => row.map(escapeCsvCell).join(",")).join("\r\n")}\r\n`;
}
