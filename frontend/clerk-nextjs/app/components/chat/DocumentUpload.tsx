"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import { parseApiError } from "@/app/lib/errors";

type Props = {
  onUploadSuccess?: (filename: string) => void;
  onUploadError?: (message: string) => void;
};

export default function DocumentUpload({ onUploadSuccess, onUploadError }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const uploadFile = useCallback(async (file: File) => {
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      onUploadError?.("Only PDF files are supported.");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("/api/upload", formData);
      setUploadedFiles((prev) => [file.name, ...prev.filter((f) => f !== file.name)]);
      onUploadSuccess?.(file.name);
    } catch (err) {
      onUploadError?.(parseApiError(err));
    } finally {
      setIsUploading(false);
    }
  }, [onUploadSuccess, onUploadError]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) uploadFile(file);
    },
    [uploadFile]
  );

  return (
    <div className="px-3 py-2">
      <p className="mb-2 px-1 text-xs font-medium uppercase tracking-wide text-muted">
        Documents
      </p>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative rounded-xl border-2 border-dashed p-4 text-center transition-colors ${
          isDragging
            ? "border-accent bg-accent/5"
            : "border-border bg-background hover:border-muted"
        }`}
      >
        <input
          type="file"
          accept=".pdf"
          disabled={isUploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadFile(file);
            e.target.value = "";
          }}
          className="absolute inset-0 cursor-pointer opacity-0 disabled:cursor-not-allowed"
        />

        <svg
          className="mx-auto mb-2 h-6 w-6 text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>

        {isUploading ? (
          <p className="text-xs text-muted">Uploading...</p>
        ) : (
          <>
            <p className="text-xs font-medium text-primary">Drop PDF here</p>
            <p className="mt-0.5 text-xs text-muted">or click to browse</p>
          </>
        )}
      </div>

      {uploadedFiles.length > 0 && (
        <ul className="mt-3 space-y-1">
          {uploadedFiles.map((name) => (
            <li
              key={name}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-muted hover:bg-background"
            >
              <svg className="h-3.5 w-3.5 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="truncate">{name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
