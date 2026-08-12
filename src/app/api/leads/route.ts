import { NextResponse } from "next/server";
import { z } from "zod";
import { createLead, hashLeadIp, isLeadRateLimited } from "@/cms/lead-repository";
import { ensureCmsInitialized } from "@/cms/initialize";
import { leadSubmissionSchema } from "@/lib/lead-contract";

function requestIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  try {
    await ensureCmsInitialized();
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 25_000) return NextResponse.json({ error: "Submission is too large." }, { status: 413 });
    const input = leadSubmissionSchema.parse(await request.json());
    const ipHash = hashLeadIp(requestIp(request));
    if (await isLeadRateLimited(ipHash)) return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });
    const { website: _honeypot, page, source, ...fields } = input;
    void _honeypot;
    const id = await createLead({
      name: input.studentName, phone: input.studentMobile, source,
      pageUrl: page, referrer: request.headers.get("referer") || undefined, fields, ipHash,
      userAgent: request.headers.get("user-agent") || undefined,
    });
    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Please check the form fields and try again." }, { status: 400 });
    return NextResponse.json({ error: "The enquiry could not be submitted." }, { status: 500 });
  }
}
