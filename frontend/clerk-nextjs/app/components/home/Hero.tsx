import HeroActions from "./HeroActions";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(37,99,235,0.12),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-40" />

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-1.5 text-xs font-medium text-muted shadow-sm backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-green-500" />
            RAG-powered document intelligence
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
            Turn your PDFs into{" "}
            <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
              intelligent answers
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Upload documents, ask natural-language questions, and get accurate
            responses with source citations — secured by Clerk authentication
            and powered by Google Gemini.
          </p>

          <div className="mt-10">
            <HeroActions />
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-border pt-10 sm:gap-8">
            {[
              { value: "PDF", label: "Document upload" },
              { value: "Gemini", label: "LLM provider" },
              { value: "Auth", label: "Clerk secured" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-primary sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-slate-200/50">
            <div className="flex items-center gap-2 border-b border-border bg-background px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-3 text-xs text-muted">AI Web Kit — Document Chat</span>
            </div>
            <div className="grid gap-0 sm:grid-cols-5">
              <div className="border-b border-border bg-background p-4 sm:col-span-2 sm:border-b-0 sm:border-r">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">Documents</p>
                <div className="space-y-2">
                  {["Q4-Report.pdf", "Product-Spec.pdf"].map((file) => (
                    <div
                      key={file}
                      className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs text-primary"
                    >
                      <svg className="h-3.5 w-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {file}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 sm:col-span-3">
                <div className="mb-4 flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-accent px-4 py-2.5 text-xs text-white">
                    What were the key revenue highlights?
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-[10px] font-semibold">
                    AI
                  </div>
                  <div className="rounded-2xl rounded-tl-sm border border-border bg-background px-4 py-2.5 text-xs leading-relaxed text-primary">
                    Revenue grew 24% YoY driven by enterprise adoption. Q4 closed
                    above forecast with strong expansion revenue.
                    <div className="mt-2 flex gap-1">
                      <span className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted">
                        Q4-Report.pdf p.12
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
