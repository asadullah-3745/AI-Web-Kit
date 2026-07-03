"use client";

import type { ChatSettings } from "@/app/lib/types";

type Props = {
  open: boolean;
  onClose: () => void;
  settings: ChatSettings;
  onSettingsChange: (settings: ChatSettings) => void;
};

export default function SettingsPanel({
  open,
  onClose,
  settings,
  onSettingsChange,
}: Props) {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-border bg-surface shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-base font-semibold text-primary">Settings</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted hover:bg-background hover:text-primary"
            aria-label="Close settings"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
          <section>
            <h3 className="mb-3 text-sm font-medium text-primary">Display</h3>
            <label className="flex cursor-pointer items-center justify-between rounded-xl border border-border px-4 py-3">
              <div>
                <p className="text-sm text-primary">Show citations</p>
                <p className="text-xs text-muted">Display source references under answers</p>
              </div>
              <input
                type="checkbox"
                checked={settings.showCitations}
                onChange={(e) =>
                  onSettingsChange({ ...settings, showCitations: e.target.checked })
                }
                className="h-4 w-4 rounded accent-accent"
              />
            </label>
          </section>

          <section>
            <h3 className="mb-3 text-sm font-medium text-primary">Retrieval</h3>
            <label className="block rounded-xl border border-border px-4 py-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm text-primary">Chunks retrieved</p>
                <span className="rounded-md bg-background px-2 py-0.5 text-xs font-medium text-accent">
                  {settings.retrievalCount}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={8}
                value={settings.retrievalCount}
                onChange={(e) =>
                  onSettingsChange({
                    ...settings,
                    retrievalCount: Number(e.target.value),
                  })
                }
                className="w-full accent-accent"
              />
              <p className="mt-1 text-xs text-muted">
                Number of document chunks sent to the model (UI preference)
              </p>
            </label>
          </section>

          <section>
            <h3 className="mb-3 text-sm font-medium text-primary">About</h3>
            <div className="rounded-xl border border-border bg-background px-4 py-3 text-xs text-muted leading-relaxed">
              AI Web Kit uses RAG to answer questions from your uploaded PDFs.
              Make sure the backend is running and GOOGLE_API_KEY is set in
              backend/.env.
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
