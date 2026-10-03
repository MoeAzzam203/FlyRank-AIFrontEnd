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

    expect(sendMessage).toHaveBeenCalledWith(
      { text: "Please improve this draft." },
      { body: { mode: "improve", customInstruction: "" } },
    );
    expect(input).toHaveValue("");
    expect(generateButton).toBeDisabled();
  });

  it("defaults to Improve and updates the selected mode", async () => {
    const user = userEvent.setup();
    render(<RewriteFlowChat />);

    const mode = screen.getByRole("combobox", { name: "Mode" });
    expect(mode).toHaveValue("improve");

    await user.selectOptions(mode, "professional");

    expect(mode).toHaveValue("professional");
  });

  it("shows and hides the custom instruction field without changing the draft", async () => {
    const user = userEvent.setup();
    render(<RewriteFlowChat />);

    const draft = screen.getByRole("textbox", { name: "Text to rewrite" });
    await user.type(draft, "Keep this draft.");
    await user.selectOptions(screen.getByRole("combobox", { name: "Mode" }), "custom");

    const instruction = screen.getByRole("textbox", { name: "Custom instruction" });
    expect(instruction).toBeVisible();
    expect(draft).toHaveValue("Keep this draft.");

    await user.type(instruction, "Make it sound confident but casual.");
    await user.selectOptions(screen.getByRole("combobox", { name: "Mode" }), "friendly");

    expect(screen.queryByRole("textbox", { name: "Custom instruction" })).not.toBeInTheDocument();
    expect(draft).toHaveValue("Keep this draft.");

    await user.selectOptions(screen.getByRole("combobox", { name: "Mode" }), "custom");
    expect(screen.getByRole("textbox", { name: "Custom instruction" })).toHaveValue(
      "Make it sound confident but casual.",
    );
  });

  it("prevents Generate when Custom has no instruction", async () => {
    const user = userEvent.setup();
    render(<RewriteFlowChat />);

    await user.type(screen.getByRole("textbox", { name: "Text to rewrite" }), "A draft.");
    await user.selectOptions(screen.getByRole("combobox", { name: "Mode" }), "custom");

    expect(screen.getByRole("textbox", { name: "Custom instruction" })).toBeRequired();
    expect(screen.getByRole("button", { name: "Generate" })).toBeDisabled();

    await user.click(screen.getByRole("button", { name: "Generate" }));
    expect(sendMessage).not.toHaveBeenCalled();
  });

  it("sends custom instructions separately from the user's text", async () => {
    const user = userEvent.setup();
    render(<RewriteFlowChat />);

    const draft = "Please review this update.";
    const instruction = "Make it sound confident but casual.";
    await user.type(screen.getByRole("textbox", { name: "Text to rewrite" }), draft);
    await user.selectOptions(screen.getByRole("combobox", { name: "Mode" }), "custom");
    await user.type(screen.getByRole("textbox", { name: "Custom instruction" }), instruction);
    await user.click(screen.getByRole("button", { name: "Generate" }));

    expect(sendMessage).toHaveBeenCalledWith(
      { text: draft },
      { body: { mode: "custom", customInstruction: instruction } },
    );
  });
});
