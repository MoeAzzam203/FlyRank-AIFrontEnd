import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useChat } from "@ai-sdk/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import RewriteFlowChat from "./rewriteflow-chat";

vi.mock("@ai-sdk/react", () => ({
  useChat: vi.fn(),
}));

describe("RewriteFlowChat", () => {
  const sendMessage = vi.fn();

  beforeEach(() => {
    sendMessage.mockReset();
    vi.mocked(useChat).mockReturnValue({
      id: "rewriteflow-test",
      messages: [],
      setMessages: vi.fn(),
      sendMessage,
      regenerate: vi.fn(),
      stop: vi.fn(),
      resumeStream: vi.fn(),
      addToolResult: vi.fn(),
      addToolOutput: vi.fn(),
      addToolApprovalResponse: vi.fn(),
      status: "ready",
      clearError: vi.fn(),
      error: undefined,
    });
  });

  it("enables Generate for draft text, sends the trimmed draft, and clears the input", async () => {
    const user = userEvent.setup();
    render(<RewriteFlowChat />);

    const input = screen.getByRole("textbox", { name: "Text to rewrite" });
    const generateButton = screen.getByRole("button", { name: "Generate" });

    expect(generateButton).toBeDisabled();

    await user.type(input, "  Please improve this draft.  ");
    expect(generateButton).toBeEnabled();

    await user.click(generateButton);

    expect(sendMessage).toHaveBeenCalledWith({ text: "Please improve this draft." });
    expect(input).toHaveValue("");
    expect(generateButton).toBeDisabled();
  });
});
