import { describe, expect, it } from "vitest";

import {
  getRewriteFlowSystemPrompt,
  rewriteFlowBaseSystemPrompt,
  rewriteFlowModeInstructions,
} from "./rewriteflow-prompt";
import { rewriteModes } from "./rewriteflow-modes";

describe("RewriteFlow system prompt", () => {
  it.each(
    rewriteModes.filter((mode) => mode !== "custom") as Exclude<
      (typeof rewriteModes)[number],
      "custom"
    >[],
  )("includes the %s mode instruction", (mode) => {
    const prompt = getRewriteFlowSystemPrompt(mode);

    expect(prompt).toContain(`Rewrite mode: ${mode}.`);
    expect(prompt).toContain(rewriteFlowModeInstructions[mode]);
  });

  it("adds the custom instruction as rewrite guidance", () => {
    const prompt = getRewriteFlowSystemPrompt("custom", "Make it concise.");

    expect(prompt).toContain("Make it concise.");
    expect(prompt).toContain("not a replacement for the rules above");
  });

  it("requires a single rewrite by default without unsolicited explanation", () => {
    expect(rewriteFlowBaseSystemPrompt).toContain("Return one rewritten version by default.");
    expect(rewriteFlowBaseSystemPrompt).toContain(
      "Do not provide alternatives or options unless the user explicitly asks for them.",
    );
    expect(rewriteFlowBaseSystemPrompt).toContain(
      "Do not add explanations before or after the rewrite unless the user explicitly asks for an explanation.",
    );
  });
});
