# Ultra Rich Tea Assistant — RAG Chat Setup

A chat widget (bottom-right bubble on every page) that answers questions about Mezan
Ultra Rich products, the brand, and tea in general — grounded in your actual site
content via retrieval-augmented generation (RAG), with a local vector database.

**Total cost to run this: $0.** Everything — the embedding model and the chat model —
runs locally on your own machine. No API key, no signup, and no per-message charge.

## How it works

```
content/knowledge/*.md  ──┐
lib/products.ts        ──┼──▶  npm run rag:build  ──▶  .data/lancedb/  (local vector DB)
                          │            │
                          │      embeds each chunk with a small local model
                          │      (Xenova/bge-small-en-v1.5, via transformers.js)
                          ▼
Chat widget ──▶ POST /api/chat ──▶ embed the question ──▶ search .data/lancedb/
                                          │
                                          ▼
                              top ~6 matching chunks + system prompt
                                          │
                                          ▼
                              local Ollama model (llama3.2) streams the answer
                                          │
                                          ▼
                              streamed back to the chat widget
```

- **Vector database**: [LanceDB](https://lancedb.github.io/lancedb/), an embedded,
  file-based vector DB (like SQLite, but for vectors) — no server to run, no account,
  data lives in `.data/lancedb/` on disk.
- **Embeddings**: [transformers.js](https://huggingface.co/docs/transformers.js), running
  the `Xenova/bge-small-en-v1.5` model locally in Node. Downloads once (~130MB) from
  Hugging Face, then cached in `.rag-cache/` and used fully offline.
- **Chat model**: [Ollama](https://ollama.com), a free local LLM server. Default model:
  `llama3.2`. You can swap in any model Ollama supports.

## One-time setup

```bash
npm install

# 1. Install Ollama (free, local LLM — this is the only new "install" step)
#    Download from https://ollama.com, then:
ollama pull llama3.2

# 2. Build the local knowledge index (downloads the embedding model on first run)
npm run rag:build

# 3. Run the site as normal
npm run dev
```

That's it — no `.env.local` is required for the defaults above. Open the site, click the
chat bubble in the bottom-right corner, and ask something like "What sizes does the
pouch come in?" or "What's the difference between black and green tea?".

If Ollama isn't installed/running, the chat still works — it will tell you that, and
show you the most relevant passage from the knowledge base instead of a generated
answer, so nothing breaks.

## Updating the knowledge base

- **Product facts** (prices, sizes, descriptions) are read directly from
  `lib/products.ts` — edit that file as normal and rebuild the index; there's no
  separate copy to keep in sync.
- **Everything else** (brand story, tea shades, careers, stores, FAQs, general tea
  knowledge) lives in `content/knowledge/*.md`. Edit these files, add new `.md` files,
  or remove ones you don't want — plain Markdown, split into sections with `##`
  headings.
- After changing any of the above, re-run:
  ```bash
  npm run rag:build
  ```
  This fully rebuilds `.data/lancedb/` from scratch (safe to run any time).

## Configuration (all optional — `.env.local.example`)

Copy `.env.local.example` to `.env.local` only if you want to change a default:

- `OLLAMA_MODEL` — swap to any model you've pulled with `ollama pull <model>` (e.g.
  `qwen2.5:3b`, `phi3`, `gemma2:2b` for something smaller/faster, or a larger model for
  better answers if your machine can run it).
- `OLLAMA_BASE_URL` — if Ollama runs on a different host/port.
- `LLM_PROVIDER` — set to `anthropic` or `openai` later if you ever want a paid hosted
  model instead (add the matching `ANTHROPIC_API_KEY` / `OPENAI_API_KEY`). This is
  entirely optional — the app defaults to the free local Ollama path and never requires
  a paid key.
- `EMBEDDING_MODEL`, `LANCEDB_PATH`, `MODEL_CACHE_DIR` — advanced overrides, defaults are
  fine for almost everyone.

## Scope and guardrails

The assistant is instructed (see `lib/rag/prompt.ts`) to:

- Answer questions about Ultra Rich products/prices/sizes, the brand, careers, stores,
  the rewards program, and tea in general.
- Politely decline and redirect anything clearly off-topic.
- Only state prices, sizes, addresses, dates, and program rules that come from the
  retrieved context (never invent a number) — general tea knowledge (e.g. brewing tips)
  can come from the model's own knowledge, clearly framed as general rather than an
  Ultra Rich claim.
- Reply in whichever language the visitor writes in.

## File map

```
content/knowledge/*.md          knowledge base (edit freely)
lib/rag/chunk.ts                markdown → chunks
lib/rag/products-to-chunks.ts   lib/products.ts → chunks (kept always in sync)
lib/rag/embeddings.ts           local embedding model (transformers.js)
lib/rag/store.ts                LanceDB read/write helpers
lib/rag/prompt.ts               system prompt built from retrieved chunks
lib/rag/llm.ts                  Ollama / Anthropic / OpenAI streaming + fallback
scripts/rag/build-index.ts      offline indexing script (`npm run rag:build`)
app/api/chat/route.ts           the streaming chat API endpoint
components/ChatWidget.tsx       the floating chat UI
```
