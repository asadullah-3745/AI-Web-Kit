type Props = {
  message: string;
  onDismiss?: () => void;
};

export default function ErrorBanner({ message, onDismiss }: Props) {
  return (
    <div
      role="alert"
      className="mx-4 mb-3 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
    >
      <svg
        className="mt-0.5 h-4 w-4 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
        />
      </svg>
      <p className="flex-1">{message}</p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="shrink-0 text-red-500 hover:text-red-700"
          aria-label="Dismiss"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
