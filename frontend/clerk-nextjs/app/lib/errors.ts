export function parseApiError(error: unknown): string {
  if (!error || typeof error !== "object" || !("response" in error)) {
    return "Something went wrong. Please try again.";
  }

  const response = (error as { response?: { data?: unknown; status?: number } })
    .response;
  const data = response?.data;

  if (typeof data === "string") {
    try {
      const parsed = JSON.parse(data) as { detail?: string; error?: string };
      return formatDetail(parsed.detail ?? parsed.error ?? data);
    } catch {
      return formatDetail(data);
    }
  }

  if (data && typeof data === "object") {
    const obj = data as { detail?: string; error?: string };
    if (obj.error === "Unauthorized") {
      return "You must be signed in to use chat.";
    }
    if (obj.error) return formatDetail(obj.error);
    if (obj.detail) return formatDetail(obj.detail);
  }

  if (response?.status === 503) {
    return "The AI service is not configured. Add GOOGLE_API_KEY to backend/.env.";
  }

  if (response?.status === 401) {
    return "You must be signed in to use chat.";
  }

  return "Failed to get a response. Check that you are signed in and the backend is running.";
}

function formatDetail(detail: string): string {
  if (
    detail.includes("GOOGLE_API_KEY") &&
    detail.includes("not configured")
  ) {
    return "Google API key is missing. Add GOOGLE_API_KEY to backend/.env and restart the backend.";
  }
  if (
    detail.includes("Invalid Google API key") ||
    detail.includes("API key not valid") ||
    detail.includes("api key")
  ) {
    return "Your Google API key is invalid. Get a key at aistudio.google.com and update backend/.env.";
  }
  if (detail.includes("Gemini request failed")) {
    return detail;
  }
  return detail;
}
