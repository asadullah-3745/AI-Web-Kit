"use client";

import { useState } from "react";
import axios from "axios";
import type { ChatSettings, Message } from "@/app/lib/types";
import { DEFAULT_SETTINGS } from "@/app/lib/types";
import { parseApiError } from "@/app/lib/errors";
import Sidebar from "./Sidebar";
import ChatThread from "./ChatThread";
import ChatComposer from "./ChatComposer";
import SettingsPanel from "./SettingsPanel";
import ErrorBanner from "./ErrorBanner";

export default function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [settings, setSettings] = useState<ChatSettings>(DEFAULT_SETTINGS);

  const handleNewChat = () => {
    setMessages([]);
    setQuestion("");
    setError("");
    setSuccess("");
  };

  const askQuestion = async () => {
    const trimmed = question.trim();
    if (!trimmed || isLoading) return;

    setError("");
    setSuccess("");
    setIsLoading(true);

    const userMessage: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");

    try {
      const response = await axios.post("/api/chat", { question: trimmed });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data.answer,
          citations: response.data.citations,
        },
      ]);
    } catch (err) {
      setMessages((prev) => prev.slice(0, -1));
      setQuestion(trimmed);
      setError(parseApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        onNewChat={handleNewChat}
        onOpenSettings={() => setSettingsOpen(true)}
        onUploadSuccess={(filename) => {
          setSuccess(`"${filename}" uploaded successfully.`);
          setError("");
          setTimeout(() => setSuccess(""), 4000);
        }}
        onUploadError={(msg) => {
          setError(msg);
          setSuccess("");
        }}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-border bg-surface px-4 py-3">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="rounded-lg p-2 text-muted hover:bg-background md:hidden"
            aria-label="Open menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          <div className="flex-1">
            <h1 className="text-sm font-semibold text-primary">Document Chat</h1>
            <p className="text-xs text-muted">Ask questions about your uploaded PDFs</p>
          </div>

          <button
            onClick={() => setSettingsOpen(true)}
            className="hidden rounded-lg p-2 text-muted hover:bg-background hover:text-primary md:flex"
            aria-label="Settings"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </header>

        {error && (
          <div className="pt-3">
            <ErrorBanner message={error} onDismiss={() => setError("")} />
          </div>
        )}

        {success && (
          <div className="mx-4 mt-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            {success}
          </div>
        )}

        <ChatThread
          messages={messages}
          isLoading={isLoading}
          showCitations={settings.showCitations}
        />

        <ChatComposer
          value={question}
          onChange={setQuestion}
          onSend={askQuestion}
          isLoading={isLoading}
        />
      </div>

      <SettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onSettingsChange={setSettings}
      />
    </div>
  );
}
