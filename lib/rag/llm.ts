import type { ChatMessage } from "./types";

/**
 * Provider-agnostic streaming call.
 *
 * Default (and recommended for testing): OLLAMA — a free, fully local LLM server.
 * No signup, no API key, no per-message cost, and no data leaves your machine.
 *   1. Install it from https://ollama.com
 *   2. Run once:  ollama pull llama3.2
 *   3. Leave it running (it starts its own local server on port 11434)
 * That's it — the app talks to it automatically, nothing to configure.
 *
 * If you ever want to switch to a paid hosted model instead, set LLM_PROVIDER to
 * "anthropic" or "openai" in .env.local and add the matching API key — but this is
 * entirely optional and NOT required to use the chat.
 */

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.2";

const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const MAX_TOKENS = 700;

export type Provider = "ollama" | "anthropic" | "openai" | "none";

/**
 * Which provider to use. Defaults to the free local Ollama server unless you
 * explicitly opt into a paid provider via LLM_PROVIDER in .env.local.
 */
export function activeProvider(): Provider {
  const explicit = process.env.LLM_PROVIDER?.toLowerCase().trim();
  if (explicit === "anthropic" || explicit === "openai" || explicit === "ollama") {
    return explicit;
  }
  if (explicit === "none") return "none";
  return "ollama";
}

/** Reads a fetch Response body as Server-Sent Events (Anthropic, OpenAI). */
async function* readSSE(body: ReadableStream<Uint8Array>): AsyncGenerator<Record<string, unknown>> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const events = buffer.split("\n\n");
    buffer = events.pop() ?? "";

    for (const event of events) {
      const dataLine = event.split("\n").find((l) => l.startsWith("data:"));
      if (!dataLine) continue;
      const data = dataLine.slice(5).trim();
      if (data === "[DONE]") return;
      try {
        yield JSON.parse(data);
      } catch {
        // ignore malformed/partial event
      }
    }
  }
}

/** Reads a fetch Response body as newline-delimited JSON (Ollama's streaming format). */
async function* readNDJSON(body: ReadableStream<Uint8Array>): AsyncGenerator<Record<string, unknown>> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      try {
        yield JSON.parse(trimmed);
      } catch {
        // ignore malformed/partial line
      }
    }
  }
  const trimmed = buffer.trim();
  if (trimmed) {
    try {
      yield JSON.parse(trimmed);
    } catch {
      /* ignore trailing partial line */
    }
  }
}

class OllamaUnavailableError extends Error {}

async function* streamOllama(system: string, messages: ChatMessage[]): AsyncGenerator<string> {
  let res: Response;
  try {
    res = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        stream: true,
        messages: [{ role: "system", content: system }, ...messages],
        options: { num_predict: MAX_TOKENS },
      }),
    });
  } catch {
    throw new OllamaUnavailableError(
      `Could not reach Ollama at ${OLLAMA_BASE_URL}. Is it installed and running?`,
    );
  }

  if (res.status === 404) {
    throw new OllamaUnavailableError(
      `Ollama is running, but the model "${OLLAMA_MODEL}" isn't pulled yet. Run: ollama pull ${OLLAMA_MODEL}`,
    );
  }
  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Ollama error ${res.status}: ${detail.slice(0, 500)}`);
  }

  for await (const event of readNDJSON(res.body)) {
    const message = event.message as { content?: string } | undefined;
    if (message?.content) yield message.content;
    if (event.done) return;
  }
}

async function* streamAnthropic(system: string, messages: ChatMessage[]): AsyncGenerator<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: MAX_TOKENS,
      system,
      stream: true,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    }),
  });

  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Anthropic API error ${res.status}: ${detail.slice(0, 500)}`);
  }

  for await (const event of readSSE(res.body)) {
    if (
      event.type === "content_block_delta" &&
      (event.delta as Record<string, unknown> | undefined)?.type === "text_delta"
    ) {
      yield (event.delta as { text: string }).text;
    }
  }
}

async function* streamOpenAI(system: string, messages: ChatMessage[]): AsyncGenerator<string> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      max_tokens: MAX_TOKENS,
      stream: true,
      messages: [{ role: "system", content: system }, ...messages],
    }),
  });

  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => "");
    throw new Error(`OpenAI API error ${res.status}: ${detail.slice(0, 500)}`);
  }

  for await (const event of readSSE(res.body)) {
    const choices = event.choices as Array<{ delta?: { content?: string } }> | undefined;
    const delta = choices?.[0]?.delta?.content;
    if (delta) yield delta;
  }
}

/** Shown when no provider could answer, so the widget still returns something useful. */
function* fallbackAnswer(topContextText: string | null, note?: string): Generator<string> {
  if (note) yield note + "\n\n";
  if (!topContextText) {
    yield "I don't have an answer for that yet. Please contact customersupport@mezangrp.com.";
    return;
  }
  yield "Here's the most relevant info I found:\n\n";
  yield topContextText;
}

/** Streams the assistant's reply as an async generator of text deltas. Never throws. */
export async function* generateAnswerStream(
  system: string,
  messages: ChatMessage[],
  topContextText: string | null,
): AsyncGenerator<string> {
  const provider = activeProvider();

  try {
    if (provider === "ollama") return yield* streamOllama(system, messages);
    if (provider === "anthropic") return yield* streamAnthropic(system, messages);
    if (provider === "openai") return yield* streamOpenAI(system, messages);
    yield* fallbackAnswer(
      topContextText,
      "No AI model is connected yet. The easiest free option: install Ollama " +
        "(https://ollama.com), run `ollama pull llama3.2`, and reload — no API key needed.",
    );
  } catch (err) {
    console.error(`[llm:${provider}] error:`, err);
    const note =
      err instanceof OllamaUnavailableError
        ? err.message
        : "The AI model couldn't be reached just now.";
    yield* fallbackAnswer(topContextText, note);
  }
}
