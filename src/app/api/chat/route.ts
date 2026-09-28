import {
  convertToModelMessages,
  safeValidateUIMessages,
  streamText,
  type UIMessage,
} from 'ai';
import { getRewriteFlowModel, rewriteFlowSystemPrompt } from '@/lib/ai/rewriteflow';

function isMessagesPayload(value: unknown): value is { messages: unknown[] } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'messages' in value &&
    Array.isArray(value.messages)
  );
}

export async function POST(request: Request): Promise<Response> {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: 'Request body must be valid JSON.' }, { status: 400 });
  }

  if (!isMessagesPayload(payload)) {
    return Response.json({ error: 'Request body must contain a messages array.' }, { status: 400 });
  }

  const validation = await safeValidateUIMessages({
    messages: payload.messages as UIMessage[],
  });

  if (!validation.success) {
    return Response.json({ error: 'The messages array is malformed.' }, { status: 400 });
  }

  let model;

  try {
    model = getRewriteFlowModel();
  } catch {
    return Response.json({ error: 'The AI service is not configured.' }, { status: 500 });
  }

  const result = streamText({
    model,
    system: rewriteFlowSystemPrompt,
    messages: await convertToModelMessages(validation.data),
    abortSignal: request.signal,
  });

  return result.toUIMessageStreamResponse();
}