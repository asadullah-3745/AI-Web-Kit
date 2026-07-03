import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-xs font-bold text-white">
            AI
          </div>
          <span className="text-sm font-semibold text-primary">AI Web Kit</span>
        </div>

        <p className="text-xs text-muted">
          Built with Next.js, FastAPI, LangChain & Clerk
        </p>

        <div className="flex gap-6 text-sm text-muted">
          <Link href="/chat" className="hover:text-primary transition-colors">
            Chat
          </Link>
          <Link href="/sign-in" className="hover:text-primary transition-colors">
            Sign in
          </Link>
          <Link href="/sign-up" className="hover:text-primary transition-colors">
            Sign up
          </Link>
        </div>
      </div>
    </footer>
  );
}
