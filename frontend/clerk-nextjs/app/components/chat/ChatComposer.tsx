import { useRef, useEffect, KeyboardEvent } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
  isLoading?: boolean;
};

export default function ChatComposer({
  value,
  onChange,
  onSend,
  disabled,
  isLoading,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && !isLoading && value.trim()) onSend();
    }
  };

  return (
    <div className="border-t border-border bg-surface px-4 py-4">
      <div className="mx-auto flex max-w-3xl items-end gap-3 rounded-2xl border border-border bg-background p-2 shadow-sm focus-within:border-accent/50 focus-within:ring-2 focus-within:ring-accent/20">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || isLoading}
          placeholder="Ask a question about your documents..."
          rows={1}
          className="max-h-40 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-primary placeholder:text-muted focus:outline-none disabled:opacity-50"
        />
        <button
          onClick={onSend}
          disabled={disabled || isLoading || !value.trim()}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Send message"
        >
          {isLoading ? (
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          )}
        </button>
      </div>
      <p className="mx-auto mt-2 max-w-3xl text-center text-xs text-muted">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  );
}
