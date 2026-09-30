import path from "node:path";
import type { KnowledgeChunk, RetrievedChunk } from "./types";

const DB_PATH = process.env.LANCEDB_PATH || path.join(process.cwd(), ".data", "lancedb");
const TABLE_NAME = "chunks";

// LanceDB's Node connection isn't safely shared across Next.js's hot-reload module
// re-evaluation in dev, so we cache it on `globalThis` the same way you'd cache a
// database client, instead of a plain module-level variable.
const globalForRag = globalThis as unknown as {
  __ragDb?: import("@lancedb/lancedb").Connection;
};

async function getDb() {
  const lancedb = await import("@lancedb/lancedb");
  if (!globalForRag.__ragDb) {
    globalForRag.__ragDb = await lancedb.connect(DB_PATH);
  }
  return { lancedb, db: globalForRag.__ragDb };
}

export type IndexedChunk = KnowledgeChunk & { vector: number[] };

/** Rebuilds the table from scratch (called by the offline build script). */
export async function writeIndex(rows: IndexedChunk[]): Promise<void> {
  const { db } = await getDb();
  await db.createTable(TABLE_NAME, rows, { mode: "overwrite" });
}

async function openTable() {
  const { db } = await getDb();
  const names = await db.tableNames();
  if (!names.includes(TABLE_NAME)) {
    throw new Error(
      `RAG index not found at "${DB_PATH}" (table "${TABLE_NAME}" missing). ` +
        `Run "npm run rag:build" first.`,
    );
  }
  return db.openTable(TABLE_NAME);
}

/** Returns the `limit` chunks whose vectors are nearest to `queryVector`. */
export async function search(queryVector: number[], limit = 6): Promise<RetrievedChunk[]> {
  const table = await openTable();
  const rows = await table.search(queryVector).limit(limit).toArray();
  return rows.map((row) => ({
    id: row.id as string,
    source: row.source as string,
    title: row.title as string,
    text: row.text as string,
    distance: row._distance as number,
  }));
}

export async function indexExists(): Promise<boolean> {
  try {
    const { db } = await getDb();
    const names = await db.tableNames();
    if (!names.includes(TABLE_NAME)) return false;
    const table = await db.openTable(TABLE_NAME);
    return (await table.countRows()) > 0;
  } catch {
    return false;
  }
}
