export type LeadSubmission = {
  studentName: string;
  parentName: string;
  studentMobile: string;
  parentMobile: string;
  city: string;
  message: string;
  source: string;
};

export const submitLead = async (lead: LeadSubmission) => {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...lead,
      page: window.location.pathname,
    }),
  });

  if (!response.ok) {
    const result = await response.json().catch(() => null) as { error?: string } | null;
    throw new Error(result?.error || "We could not send your enquiry. Please try again.");
  }
};
