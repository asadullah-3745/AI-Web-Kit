"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

export default function HeroActions() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return (
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/chat"
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-hover hover:shadow-accent/30"
        >
          Open Chat
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <Link
        href="/sign-up"
        className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-hover hover:shadow-accent/30"
      >
        Get started free
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </Link>
      <Link
        href="/sign-in"
        className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-7 py-3.5 text-sm font-semibold text-primary shadow-sm transition-all hover:border-accent/30 hover:bg-background"
      >
        Sign in
      </Link>
    </div>
  );
}
