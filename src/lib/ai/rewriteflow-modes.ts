export const rewriteModes = [
  "improve",
  "professional",
  "friendly",
  "concise",
  "simplify",
  "fix-grammar",
  "custom",
] as const;

export type RewriteMode = (typeof rewriteModes)[number];

export function isRewriteMode(value: unknown): value is RewriteMode {
  return typeof value === "string" && rewriteModes.some((mode) => mode === value);
}
