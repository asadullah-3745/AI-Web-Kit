import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getBackendUrl } from "@/app/lib/backend";

async function readBackendError(response: Response): Promise<string> {
  const text = await response.text();

  try {
    const data = JSON.parse(text) as { detail?: string; error?: string };
    return data.detail ?? data.error ?? text;
  } catch {
    return text || "Upload failed";
  }
}

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  const backendForm = new FormData();
  backendForm.append("file", file);

  const response = await fetch(getBackendUrl("/upload"), {
    method: "POST",
    body: backendForm,
  });

  if (!response.ok) {
    const errorMessage = await readBackendError(response);
    return NextResponse.json({ error: errorMessage }, { status: response.status });
  }

  return NextResponse.json(await response.json());
}
