import 'server-only';

import { createGoogleGenerativeAI } from '@ai-sdk/google';
export {
  getRewriteFlowSystemPrompt,
  rewriteFlowBaseSystemPrompt,
  rewriteFlowModeInstructions,
} from '@/lib/ai/rewriteflow-prompt';

export function getRewriteFlowModel() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured.');
  }

  return createGoogleGenerativeAI({ apiKey })('gemini-2.5-flash');
}