import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  convertToModelMessages,
  getRewriteFlowModel,
  getRewriteFlowSystemPrompt,
  safeValidateUIMessages,
  streamText,
} = vi.hoisted(() => ({
  convertToModelMessages: vi.fn(),
  getRewriteFlowModel: vi.fn(),
  getRewriteFlowSystemPrompt: vi.fn(),
  safeValidateUIMessages: vi.fn(),
  streamText: vi.fn(),
}));

vi.mock("server-only", () => ({}));
vi.mock("ai", () => ({
  convertToModelMessages,
  safeValidateUIMessages,
  streamText,
}));
vi.mock("@/lib/ai/rewriteflow", () => ({
  getRewriteFlowModel,
  getRewriteFlowSystemPrompt,
}));

import { POST } from "./route";

const userMessages = [
  {
    id: "user-message",
    role: "user",
    parts: [{ type: "text", text: "Please review this update." }],
  },
];
const modelMessages = [
  { role: "user", content: "Please review this update." },
];

function createRequest(payload: unknown): Request {
  return new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
}

describe("POST /api/chat rewrite modes", () => {
  beforeEach(() => {
    safeValidateUIMessages.mockReset().mockResolvedValue({
      success: true,
      data: userMessages,
    });
    convertToModelMessages.mockReset().mockResolvedValue(modelMessages);
    getRewriteFlowModel.mockReset().mockReturnValue("mock-model");
    getRewriteFlowSystemPrompt
      .mockReset()
      .mockImplementation((mode, instruction) => `${mode}:${instruction ?? ""}`);
    streamText.mockReset().mockReturnValue({
      toUIMessageStreamResponse: () => new Response("streamed"),
    });
  });

  it("rejects an invalid mode with 400", async () => {
    const response = await POST(
      createRequest({ messages: userMessages, mode: "rewrite-everything" }),
    );

    expect(response.status).toBe(400);
    expect(streamText).not.toHaveBeenCalled();
  });

  it("continues to reject messages that fail AI SDK validation", async () => {
    safeValidateUIMessages.mockResolvedValueOnce({
      success: false,
      error: new Error("Invalid messages"),
    });

    const response = await POST(
      createRequest({ messages: userMessages, mode: "improve" }),
    );

    expect(response.status).toBe(400);
    expect(safeValidateUIMessages).toHaveBeenCalledWith({ messages: userMessages });
    expect(streamText).not.toHaveBeenCalled();
  });

  it.each([undefined, " \t\n "])(
    "rejects custom mode with missing or blank instructions (%s)",
    async (customInstruction) => {
      const response = await POST(
        createRequest({
          messages: userMessages,
          mode: "custom",
          ...(customInstruction === undefined ? {} : { customInstruction }),
        }),
      );

      expect(response.status).toBe(400);
      expect(streamText).not.toHaveBeenCalled();
    },
  );

  it("rejects a non-string custom instruction", async () => {
    const response = await POST(
      createRequest({
        messages: userMessages,
        mode: "improve",
        customInstruction: { instruction: "Invalid shape" },
      }),
    );

    expect(response.status).toBe(400);
    expect(streamText).not.toHaveBeenCalled();
  });

  it("accepts default improve mode without a custom instruction", async () => {
    const response = await POST(createRequest({ messages: userMessages, mode: "improve" }));

    expect(response.status).toBe(200);
    expect(getRewriteFlowSystemPrompt).toHaveBeenCalledWith("improve", undefined);
    expect(streamText).toHaveBeenCalledWith(
      expect.objectContaining({ model: "mock-model", system: "improve:" }),
    );
  });

  it("keeps the user message separate from valid custom instructions", async () => {
    const response = await POST(
      createRequest({
        messages: userMessages,
        mode: "custom",
        customInstruction: "  Make it confident.  ",
      }),
    );

    expect(response.status).toBe(200);
    expect(getRewriteFlowSystemPrompt).toHaveBeenCalledWith("custom", "  Make it confident.  ");
    expect(convertToModelMessages).toHaveBeenCalledWith(userMessages);
    expect(streamText).toHaveBeenCalledWith(
      expect.objectContaining({
        system: "custom:  Make it confident.  ",
        messages: modelMessages,
      }),
    );
  });
});
