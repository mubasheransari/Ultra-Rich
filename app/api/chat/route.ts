import { NextRequest } from "next/server";
import { embedQuery } from "@/lib/rag/embeddings";
import { search, indexExists } from "@/lib/rag/store";
import { buildSystemPrompt } from "@/lib/rag/prompt";
import { generateAnswerStream } from "@/lib/rag/llm";
import type { ChatMessage } from "@/lib/rag/types";

// This route uses LanceDB + transformers.js, both native Node modules — it cannot run
// on the Edge runtime.
export const runtime = "nodejs";
// Responses are streamed and depend on the live index/model state, never cache them.
export const dynamic = "force-dynamic";

const MAX_HISTORY_MESSAGES = 8;
const MAX_MESSAGE_LENGTH = 2000;

type ChatRequestBody = {
  messages?: Array<{ role: string; content: string }>;
  /** Human-readable language name from the site's language switcher, e.g. "French". */
  languageName?: string;
};

function sanitizeMessages(raw: ChatRequestBody["messages"]): ChatMessage[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (m): m is { role: string; content: string } =>
        !!m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string",
    )
    .map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content.slice(0, MAX_MESSAGE_LENGTH),
    }))
    .slice(-MAX_HISTORY_MESSAGES);
}

export async function POST(req: NextRequest) {
  let body: ChatRequestBody;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = sanitizeMessages(body.messages);
  const lastUser = [...messages].reverse().find((m) => m.role === "user");

  if (!lastUser || !lastUser.content.trim()) {
    return Response.json({ error: "A non-empty user message is required." }, { status: 400 });
  }

  const localeName =
    typeof body.languageName === "string" && body.languageName.trim()
      ? body.languageName.trim().slice(0, 40)
      : "English";

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (chunk: string) => controller.enqueue(encoder.encode(chunk));

      try {
        if (!(await indexExists())) {
          send(
            "The knowledge base hasn't been built yet on this server. Run `npm run rag:build`, " +
              "then try again.",
          );
          controller.close();
          return;
        }

        const queryVector = await embedQuery(lastUser.content);
        const retrieved = await search(queryVector, 6);

        const system = buildSystemPrompt(retrieved, localeName);
        const topContextText = retrieved[0]?.text ?? null;

        for await (const delta of generateAnswerStream(system, messages, topContextText)) {
          send(delta);
        }
      } catch (err) {
        console.error("[/api/chat] error:", err);
        send(
          "\n\nSorry — something went wrong answering that. Please try again, or contact " +
            "customersupport@mezangrp.com.",
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
