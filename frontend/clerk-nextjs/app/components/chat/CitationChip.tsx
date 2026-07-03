import type { Citation } from "@/app/lib/types";

type Props = {
  source: string;
  page: number | string;
};

export default function CitationChip({ source, page }: Props) {
  const filename = source.split(/[/\\]/).pop() ?? source;

  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-muted">
      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>
      {filename}
      {page !== "-" && <span className="text-muted/70">p.{page}</span>}
    </span>
  );
}

export function CitationList({ citations }: { citations: Citation[] }) {
  if (!citations?.length) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {citations.map((citation, index) => (
        <CitationChip key={index} source={citation.source} page={citation.page} />
      ))}
    </div>
  );
}
