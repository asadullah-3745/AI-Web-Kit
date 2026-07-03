import { useEffect, useRef } from "react";
import type { Message } from "@/app/lib/types";
import MessageBubble from "./MessageBubble";

type Props = {
  messages: Message[];
  isLoading: boolean;
  showCitations: boolean;
};

export default function ChatThread({ messages, isLoading, showCitations }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface shadow-sm">
          <svg className="h-7 w-7 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
            />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-primary">How can I help you?</h2>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Upload a PDF from the sidebar, then ask questions about its content.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            message={message}
            showCitations={showCitations}
          />
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-xs font-semibold">
              AI
            </div>
            <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-border bg-surface px-4 py-3 shadow-sm">
              <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:-0.3s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:-0.15s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-muted" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
