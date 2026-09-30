import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // These packages use native Node.js addons (onnxruntime-node's .node binary,
  // LanceDB's Rust binding) and must run as plain Node modules on the server —
  // bundling them with webpack/Turbopack breaks the native binary lookup.
  serverExternalPackages: ["@huggingface/transformers", "onnxruntime-node", "@lancedb/lancedb"],
};

export default nextConfig;
