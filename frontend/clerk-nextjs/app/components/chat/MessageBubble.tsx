import type { Message } from "@/app/lib/types";
import { CitationList } from "./CitationChip";

type Props = {
  message: Message;
  showCitations: boolean;
};

export default function MessageBubble({ message, showCitations }: Props) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
          isUser
            ? "bg-accent text-white"
            : "border border-border bg-surface text-primary"
        }`}
      >
        {isUser ? "You" : "AI"}
      </div>

      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
          isUser
            ? "bg-accent text-white rounded-tr-sm"
            : "border border-border bg-surface text-primary rounded-tl-sm"
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        {!isUser && showCitations && message.citations && (
          <CitationList citations={message.citations} />
        )}
      </div>
    </div>
  );
}
