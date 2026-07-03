const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8001";

export function getBackendUrl(path: string): string {
  return `${BACKEND_URL}${path}`;
}
