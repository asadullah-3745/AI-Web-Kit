export interface Citation {
  source: string;
  page: number | string;
}

export interface ChatResponse {
  answer: string;
  citations: Citation[];
}

export interface Message {
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
}

export interface ChatSettings {
  showCitations: boolean;
  retrievalCount: number;
}

export const DEFAULT_SETTINGS: ChatSettings = {
  showCitations: true,
  retrievalCount: 4,
};
