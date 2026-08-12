import { z } from "zod";

export const admissionLeadFieldKeys = [
  "studentName",
  "parentName",
  "studentMobile",
  "parentMobile",
  "city",
  "message",
] as const;

export const leadSubmissionSchema = z.object({
  studentName: z.string().trim().min(2).max(150),
  parentName: z.string().trim().min(2).max(150),
  studentMobile: z.string().trim().min(7).max(30),
  parentMobile: z.string().trim().min(7).max(30),
  city: z.string().trim().min(2).max(150),
  message: z.string().trim().max(5000),
  source: z.string().trim().min(1).max(100),
  page: z.string().trim().max(500).regex(/^\/[^\s]*$/, "Invalid page path").optional(),
  website: z.string().max(0).optional(),
}).strict();

export type LeadSubmissionInput = z.infer<typeof leadSubmissionSchema>;
