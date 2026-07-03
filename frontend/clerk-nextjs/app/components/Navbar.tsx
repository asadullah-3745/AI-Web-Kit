"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-surface/80 px-4 py-3 backdrop-blur-md sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-xs font-bold text-white">
            AI
          </div>
          <span className="font-semibold text-primary">AI Web Kit</span>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-muted md:flex">
          <Link href="/chat" className="transition-colors hover:text-primary">
            Chat
          </Link>
          <a href="#features" className="transition-colors hover:text-primary">
            Features
          </a>
          <a href="#how-it-works" className="transition-colors hover:text-primary">
            How it works
          </a>
        </div>

        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <>
              <Link
                href="/chat"
                className="hidden rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover sm:inline-flex"
              >
                Open Chat
              </Link>
              <UserButton />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="hidden rounded-lg px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-background sm:inline-flex"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
