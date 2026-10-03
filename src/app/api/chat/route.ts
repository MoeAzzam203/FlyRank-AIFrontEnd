import {
  convertToModelMessages,
  safeValidateUIMessages,
  streamText,
  type UIMessage,
} from 'ai';
import { getRewriteFlowSystemPrompt, getRewriteFlowModel } from '@/lib/ai/rewriteflow';
import { isRewriteMode } from '@/lib/ai/rewriteflow-modes';

function isMessagesPayload(
  value: unknown,
): value is { messages: unknown[]; mode: unknown; customInstruction?: unknown } {
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

  const mode = payload.mode;
  if (!isRewriteMode(mode)) {
    return Response.json({ error: 'Request body must contain a valid rewrite mode.' }, { status: 400 });
  }

  let customInstruction: string | undefined;
  if (
    payload.customInstruction !== undefined &&
    typeof payload.customInstruction !== 'string'
  ) {
    return Response.json({ error: 'Custom instruction must be a string.' }, { status: 400 });
  }

  if (typeof payload.customInstruction === 'string') {
    customInstruction = payload.customInstruction;
  }

  if (mode === 'custom' && !customInstruction?.trim()) {
    return Response.json({ error: 'Custom mode requires a non-empty custom instruction.' }, { status: 400 });
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
    system: getRewriteFlowSystemPrompt(
      mode,
      mode === 'custom' ? customInstruction : undefined,
    ),
    messages: await convertToModelMessages(validation.data),
    abortSignal: request.signal,
  });

  return result.toUIMessageStreamResponse();
}