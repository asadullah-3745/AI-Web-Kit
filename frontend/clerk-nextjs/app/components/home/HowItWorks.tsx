const steps = [
  {
    step: "01",
    title: "Create an account",
    description: "Sign up with Clerk in seconds. Your session is secured across all API routes.",
  },
  {
    step: "02",
    title: "Upload your PDFs",
    description: "Drag and drop documents in the chat sidebar. They are chunked and embedded into ChromaDB.",
  },
  {
    step: "03",
    title: "Ask anything",
    description: "Type a question in natural language. The RAG pipeline retrieves context and generates an answer.",
  },
  {
    step: "04",
    title: "Verify with citations",
    description: "Review source references under each response to trace answers back to the original pages.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            From upload to answer in four steps
          </h2>
        </div>

        <div className="relative mt-14">
          <div className="absolute left-8 top-0 hidden h-full w-px bg-border lg:left-1/2 lg:block" />

          <div className="space-y-10">
            {steps.map((item, index) => (
              <div
                key={item.step}
                className={`relative flex flex-col gap-6 lg:flex-row lg:items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1 lg:text-right">
                  <div
                    className={`rounded-2xl border border-border bg-surface p-6 shadow-sm ${
                      index % 2 === 1 ? "lg:text-left" : "lg:ml-auto lg:max-w-md"
                    } ${index % 2 === 0 ? "lg:mr-auto lg:max-w-md" : ""}`}
                  >
                    <span className="text-xs font-bold text-accent">{item.step}</span>
                    <h3 className="mt-2 text-lg font-semibold text-primary">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 mx-8 hidden h-4 w-4 shrink-0 rounded-full border-4 border-surface bg-accent lg:mx-0 lg:block" />

                <div className="hidden flex-1 lg:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
