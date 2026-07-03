import HeroActions from "./HeroActions";

export default function CTASection() {
  return (
    <section className="border-t border-border bg-primary py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to chat with your documents?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-300 leading-relaxed">
          Start uploading PDFs and get intelligent, cited answers in minutes.
          No complex setup required.
        </p>
        <div className="mt-10 flex justify-center [&_a:first-child]:bg-white [&_a:first-child]:text-primary [&_a:first-child]:hover:bg-slate-100 [&_a:first-child]:shadow-none [&_a:last-child]:border-slate-600 [&_a:last-child]:bg-transparent [&_a:last-child]:text-white [&_a:last-child]:hover:bg-slate-800">
          <HeroActions />
        </div>
      </div>
    </section>
  );
}
