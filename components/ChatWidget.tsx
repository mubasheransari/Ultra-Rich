"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

type Message = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "ultra-rich-chat-history";
const MAX_STORED_MESSAGES = 20;
const GREETING = "Hi! I’m your Ultra Rich tea assistant. Ask me about our tea, products, brewing tips, ingredients, or finding the right blend for your taste.";
const QUICK_PROMPTS = ["Which Ultra Rich tea is best?", "How should I brew it?", "Tell me about your products"];

function loadHistory(): Message[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function ChatWidget() {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => setMessages(loadHistory()), []);

  useEffect(() => {
    if (messages.length === 0) return;
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_STORED_MESSAGES)));
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 180);
  }, [open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;

    setError(null);
    const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setInput("");
    setIsStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, languageName: language.label }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) throw new Error(`Request failed (${res.status})`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assembled = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assembled += decoder.decode(value, { stream: true });
        const snapshot = assembled;
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: snapshot };
          return copy;
        });
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setError("I couldn’t reach the assistant. Please try again.");
        setMessages((prev) => prev.slice(0, -1));
      }
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close chat" : "Open Ultra Rich tea assistant"}
        aria-expanded={open}
        className={`group fixed bottom-4 right-4 z-[80] flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-[#9e2026] to-[#5c0f12] text-white shadow-[0_12px_35px_rgba(0,0,0,.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,.34)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold sm:bottom-6 sm:right-6 sm:h-16 sm:w-16 ${open ? "rotate-0" : ""}`}
      >
        {open ? (
          <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <>
            <span className="absolute inset-0 rounded-full border border-brand-gold/40 animate-ping" />
            <svg width="27" height="27" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="relative">
              <path d="M4 5.5h16v10H9l-5 4v-14Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M8 10h.01M12 10h.01M16 10h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Ultra Rich tea assistant chat"
          className="fixed inset-x-3 bottom-[84px] z-[80] flex h-[min(78dvh,650px)] max-h-[calc(100dvh-105px)] flex-col overflow-hidden rounded-[26px] border border-white/60 bg-white shadow-[0_25px_80px_rgba(40,10,10,.28)] sm:inset-x-auto sm:bottom-28 sm:right-6 sm:w-[410px]"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-[#8f1117] via-[#751018] to-[#4f0b10] px-4 pb-4 pt-4 text-white sm:px-5">
            <div className="absolute -right-12 -top-16 h-36 w-36 rounded-full bg-brand-gold/15 blur-2xl" />
            <div className="relative flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-brand-gold/40 bg-brand-gold/15 shadow-inner">
                <span className="font-display text-sm font-black text-brand-gold">UR</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-display text-[17px] font-black">Ultra Rich Assistant</p>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.8)]" title="Online" />
                </div>
                <p className="mt-0.5 text-xs text-white/65">Your tea &amp; product guide</p>
              </div>
              <button type="button" onClick={() => setMessages([])} className="rounded-full px-2.5 py-1.5 text-[11px] text-white/60 transition hover:bg-white/10 hover:text-white" aria-label="Clear chat">
                Clear
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto bg-[#faf9f7] px-3 py-4 sm:px-4">
            <div className="mx-auto max-w-[360px] space-y-3">
              <ChatBubble role="assistant" content={GREETING} />

              {messages.length === 0 && (
                <div className="pt-1">
                  <p className="mb-2 px-1 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">Try asking</p>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_PROMPTS.map((prompt) => (
                      <button key={prompt} type="button" onClick={() => sendMessage(prompt)} className="rounded-full border border-brand-red/15 bg-white px-3 py-2 text-left text-xs font-medium text-brand-red shadow-sm transition hover:border-brand-gold hover:bg-brand-gold/5">
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message, index) => (
                <ChatBubble key={`${message.role}-${index}`} role={message.role} content={message.content} pending={isStreaming && index === messages.length - 1 && message.content === ""} />
              ))}

              {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-center text-xs text-red-600">{error}</p>}
            </div>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(input);
            }}
            className="border-t border-neutral-200 bg-white p-3"
          >
            <div className="flex items-end gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-1.5 shadow-inner transition focus-within:border-brand-red/40 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-red/10">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage(input);
                  }
                }}
                rows={1}
                placeholder="Ask about Ultra Rich tea..."
                aria-label="Your message"
                className="max-h-24 min-h-10 flex-1 resize-none bg-transparent px-2.5 py-2 text-[13px] text-neutral-800 outline-none placeholder:text-neutral-400"
              />
              <button type="submit" disabled={isStreaming || !input.trim()} aria-label="Send message" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-red text-white shadow-sm transition hover:bg-brand-red-dark disabled:cursor-not-allowed disabled:opacity-35">
                {isStreaming ? <Spinner /> : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12L20 4L13 20L11 13L4 12Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>}
              </button>
            </div>
            <p className="pt-2 text-center text-[9px] text-neutral-400">Ultra Rich AI • Answers based on our tea knowledge</p>
          </form>
        </div>
      )}
    </>
  );
}

function ChatBubble({ role, content, pending }: { role: "user" | "assistant"; content: string; pending?: boolean }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && <div className="mr-2 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-brand-red text-[8px] font-black text-brand-gold">UR</div>}
      <div className={`max-w-[82%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm ${isUser ? "rounded-br-md bg-brand-red text-white" : "rounded-bl-md border border-neutral-200/80 bg-white text-neutral-800"}`}>
        {content || (pending ? <TypingDots /> : null)}
      </div>
    </div>
  );
}

function TypingDots() {
  return <span className="inline-flex gap-1 py-1"><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.2s]" /><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.1s]" /><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400" /></span>;
}

function Spinner() {
  return <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />;
}
