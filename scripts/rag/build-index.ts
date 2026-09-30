/**
 * Builds the local vector index used by /api/chat.
 *
 * Run with: npm run rag:build
 *
 * This reads every file in content/knowledge/*.md plus the live product catalog
 * (lib/products.ts), splits them into chunks, embeds each chunk with a local
 * embedding model (downloaded once from Hugging Face and cached under
 * .rag-cache/, then fully offline), and writes everything into a local LanceDB
 * database under .data/lancedb/. No external vector database service and no
 * paid API calls are involved in this step.
 */
import fs from "node:fs";
import path from "node:path";
import { chunkMarkdown } from "../../lib/rag/chunk";
import { embedDocuments } from "../../lib/rag/embeddings";
import { productsToChunks } from "../../lib/rag/products-to-chunks";
import { writeIndex, type IndexedChunk } from "../../lib/rag/store";
import type { KnowledgeChunk } from "../../lib/rag/types";

const CONTENT_DIR = path.join(process.cwd(), "content", "knowledge");
const BATCH_SIZE = 16;

function loadMarkdownChunks(): KnowledgeChunk[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    throw new Error(`Knowledge content folder not found: ${CONTENT_DIR}`);
  }
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.toLowerCase().endsWith(".md"))
    .sort();

  const chunks: KnowledgeChunk[] = [];
  for (const file of files) {
    const markdown = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    chunks.push(...chunkMarkdown(file, markdown));
  }
  return chunks;
}

async function main() {
  console.log("Reading knowledge base...");
  const markdownChunks = loadMarkdownChunks();
  const productChunks = productsToChunks();
  const allChunks = [...markdownChunks, ...productChunks];
  console.log(
    `Found ${markdownChunks.length} chunks from ${CONTENT_DIR} and ${productChunks.length} product chunks ` +
      `(${allChunks.length} total).`,
  );

  console.log("Loading local embedding model (first run downloads it from Hugging Face)...");
  const indexed: IndexedChunk[] = [];

  for (let i = 0; i < allChunks.length; i += BATCH_SIZE) {
    const batch = allChunks.slice(i, i + BATCH_SIZE);
    const vectors = await embedDocuments(batch.map((c) => c.text));
    batch.forEach((chunk, j) => indexed.push({ ...chunk, vector: vectors[j] }));
    console.log(`  embedded ${Math.min(i + BATCH_SIZE, allChunks.length)}/${allChunks.length}`);
  }

  console.log("Writing vector index...");
  await writeIndex(indexed);

  console.log(`\nDone. Indexed ${indexed.length} chunks into .data/lancedb/`);
  console.log("You can now run the dev server and use the chat widget.");
}

main().catch((err) => {
  console.error("\nFailed to build RAG index:");
  console.error(err);
  process.exit(1);
});
