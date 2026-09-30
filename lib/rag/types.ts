export type KnowledgeChunk = {
  /** Stable id, e.g. "01-brand-overview#2" or "product:ultra-rich-pouch" */
  id: string;
  /** Source file or logical origin, e.g. "01-brand-overview.md" or "lib/products.ts" */
  source: string;
  /** Short section/heading title, used for citation-style display and debugging. */
  title: string;
  /** The chunk text that gets embedded and shown to the LLM as context. */
  text: string;
};

export type RetrievedChunk = KnowledgeChunk & {
  /** Lower is more similar (LanceDB returns L2 distance by default). */
  distance: number;
};

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};
