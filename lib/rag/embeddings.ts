import path from "node:path";

/**
 * Local, offline embedding model via transformers.js (no API key, no per-call cost).
 * The model downloads once from Hugging Face on first run and is cached under
 * MODEL_CACHE_DIR (default: <project>/.rag-cache) — after that it works fully offline.
 */
const MODEL_ID = process.env.EMBEDDING_MODEL || "Xenova/bge-small-en-v1.5";
export const EMBEDDING_DIMENSIONS = 384; // bge-small-en-v1.5 output size

// bge models are trained with an instruction prefix on the *query* side only —
// document/chunk text is embedded plain. Skipping this halves retrieval quality.
const QUERY_PREFIX = "Represent this sentence for searching relevant passages: ";

type Extractor = (
  texts: string[],
  options: { pooling: "mean"; normalize: true },
) => Promise<{ data: Float32Array | number[]; dims: number[] }>;

let extractorPromise: Promise<Extractor> | null = null;

async function getExtractor(): Promise<Extractor> {
  if (!extractorPromise) {
    extractorPromise = (async () => {
      const { pipeline, env } = await import("@huggingface/transformers");
      env.cacheDir = process.env.MODEL_CACHE_DIR || path.join(process.cwd(), ".rag-cache");
      env.allowLocalModels = true;
      env.allowRemoteModels = true;
      const extractor = await pipeline("feature-extraction", MODEL_ID, {
        dtype: "fp32",
      });
      return extractor as unknown as Extractor;
    })();
  }
  return extractorPromise;
}

function toFloatArray(data: Float32Array | number[], rows: number, dims: number): number[][] {
  const flat = data instanceof Float32Array ? data : Float32Array.from(data);
  const out: number[][] = [];
  for (let r = 0; r < rows; r++) {
    out.push(Array.from(flat.subarray(r * dims, (r + 1) * dims)));
  }
  return out;
}

/** Embeds document/chunk text (used when building the index). */
export async function embedDocuments(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return [];
  const extractor = await getExtractor();
  const output = await extractor(texts, { pooling: "mean", normalize: true });
  return toFloatArray(output.data, texts.length, output.dims[output.dims.length - 1]);
}

/** Embeds a single user query (used at chat time). */
export async function embedQuery(text: string): Promise<number[]> {
  const [vector] = await embedDocuments([QUERY_PREFIX + text]);
  return vector;
}
