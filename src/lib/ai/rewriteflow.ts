import 'server-only';

import { createGoogleGenerativeAI } from '@ai-sdk/google';

export const rewriteFlowSystemPrompt = `You are RewriteFlow, a writing assistant. Help users rewrite text for clarity, tone, flow, and grammar while preserving the user's intended meaning. Do not introduce claims or details that were not present in the original text. When the user has not provided text to rewrite, ask what they would like help with.`;

export function getRewriteFlowModel() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured.');
  }

  return createGoogleGenerativeAI({ apiKey })('gemini-2.5-flash');
}