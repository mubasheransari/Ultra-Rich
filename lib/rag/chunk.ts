import type { KnowledgeChunk } from "./types";

const MAX_WORDS = 220;

function wordCount(s: string): number {
  return s.split(/\s+/).filter(Boolean).length;
}

/**
 * Splits a block of prose into ~MAX_WORDS chunks, breaking on blank lines
 * (paragraph boundaries) and never splitting a markdown table (a run of
 * lines starting with "|") across chunks.
 */
function splitBlock(block: string): string[] {
  const paragraphs = block.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const chunks: string[] = [];
  let current: string[] = [];
  let currentWords = 0;

  for (const para of paragraphs) {
    const words = wordCount(para);
    const isTable = para.split("\n").every((l) => l.trim().startsWith("|") || l.trim() === "");

    if (isTable) {
      // Tables stay intact and start their own chunk so rows are never separated.
      if (current.length) {
        chunks.push(current.join("\n\n"));
        current = [];
        currentWords = 0;
      }
      chunks.push(para);
      continue;
    }

    if (currentWords + words > MAX_WORDS && current.length) {
      chunks.push(current.join("\n\n"));
      current = [];
      currentWords = 0;
    }
    current.push(para);
    currentWords += words;
  }
  if (current.length) chunks.push(current.join("\n\n"));
  return chunks;
}

/**
 * Splits one markdown file into knowledge chunks along "## " (h2) boundaries,
 * keeping the file's "# " (h1) title as context for every chunk, and further
 * splitting any oversized section into smaller pieces.
 */
export function chunkMarkdown(source: string, markdown: string): KnowledgeChunk[] {
  const lines = markdown.split("\n");
  const h1Match = markdown.match(/^#\s+(.+)$/m);
  const docTitle = h1Match ? h1Match[1].trim() : source;

  type Section = { heading: string; body: string[] };
  const sections: Section[] = [{ heading: docTitle, body: [] }];

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      sections.push({ heading: h2[1].trim(), body: [] });
      continue;
    }
    if (/^#\s+/.test(line)) continue; // h1 already captured as docTitle
    sections[sections.length - 1].body.push(line);
  }

  const chunks: KnowledgeChunk[] = [];
  let index = 0;

  for (const section of sections) {
    const body = section.body.join("\n").trim();
    if (!body) continue;

    const pieces = wordCount(body) > MAX_WORDS ? splitBlock(body) : [body];

    for (const piece of pieces) {
      index += 1;
      const title = section.heading === docTitle ? docTitle : `${docTitle} — ${section.heading}`;
      chunks.push({
        id: `${source}#${index}`,
        source,
        title,
        // Repeating the title in the embedded/LLM-visible text noticeably improves
        // retrieval for short queries that name a topic (e.g. "Grow With Us").
        text: `${title}\n\n${piece}`,
      });
    }
  }

  return chunks;
}
