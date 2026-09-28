"use client";

import { useChat } from "@ai-sdk/react";
import {
  ArrowDown,
  Check,
  Copy,
  Send,
  Sparkles,
  Square,
} from "lucide-react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useRef, useState, type FormEvent } from "react";

type CopyFeedback = "idle" | "copied" | "error";

function getMessageText(message: UIMessage): string {
  return message.parts.reduce(
    (text, part) => (part.type === "text" ? text + part.text : text),
    "",
  );
}

export default function RewriteFlowChat() {
  const [input, setInput] = useState("");
  const [latestCompletedResponse, setLatestCompletedResponse] = useState("");
  const [copyFeedback, setCopyFeedback] = useState<CopyFeedback>("idle");
  const [showJumpToLatest, setShowJumpToLatest] = useState(false);
  const conversationRef = useRef<HTMLDivElement>(null);
  const isPinnedToBottomRef = useRef(true);

  const { messages, sendMessage, stop, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onFinish: ({ message, isAbort, isDisconnect, isError }) => {
      if (message.role !== "assistant" || isAbort || isDisconnect || isError) {
        return;
      }

      const response = getMessageText(message);
      if (response.trim()) {
        setLatestCompletedResponse(response);
        setCopyFeedback("idle");
      }
    },
  });

  const isBusy = status === "submitted" || status === "streaming";

  useEffect(() => {
    const conversation = conversationRef.current;
    if (conversation && isPinnedToBottomRef.current) {
      conversation.scrollTop = conversation.scrollHeight;
    }
  }, [messages, status]);

  function handleScroll() {
    const conversation = conversationRef.current;
    if (!conversation) return;

    const distanceFromBottom =
      conversation.scrollHeight - conversation.clientHeight - conversation.scrollTop;
    const isNearBottom = distanceFromBottom <= 56;

    isPinnedToBottomRef.current = isNearBottom;
    setShowJumpToLatest(!isNearBottom);
  }

  function jumpToLatest() {
    const conversation = conversationRef.current;
    if (!conversation) return;

    isPinnedToBottomRef.current = true;
    conversation.scrollTop = conversation.scrollHeight;
    setShowJumpToLatest(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();

    if (!text || isBusy) return;

    isPinnedToBottomRef.current = true;
    setShowJumpToLatest(false);
    setInput("");
    sendMessage({ text });
  }

  async function copyLatestResponse() {
    try {
      await navigator.clipboard.writeText(latestCompletedResponse);
      setCopyFeedback("copied");
    } catch {
      setCopyFeedback("error");
    }
  }

  return (
    <section
      aria-label="RewriteFlow writing assistant"
      className="overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-sm"
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
          <Sparkles aria-hidden="true" className="size-4 text-blue-700" />
          RewriteFlow
        </div>
        <button
          type="button"
          onClick={copyLatestResponse}
          disabled={!latestCompletedResponse}
          aria-label={
            copyFeedback === "copied"
              ? "Copied latest completed response"
              : copyFeedback === "error"
                ? "Copy failed. Copy latest completed response"
                : "Copy latest completed response"
          }
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-[var(--border)] px-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-blue-700 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45"
        >
          {copyFeedback === "copied" ? (
            <Check aria-hidden="true" className="size-4" />
          ) : (
            <Copy aria-hidden="true" className="size-4" />
          )}
          {copyFeedback === "copied"
            ? "Copied"
            : copyFeedback === "error"
              ? "Copy failed"
              : "Copy"}
        </button>
      </header>

      <div className="relative">
        <div
          ref={conversationRef}
          onScroll={handleScroll}
          aria-label="Conversation"
          className="min-h-64 max-h-[60vh] space-y-4 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6 sm:py-6"
        >
          {messages.length === 0 ? (
            <div className="grid min-h-52 place-items-center text-center">
              <p className="max-w-xs text-sm leading-6 text-[var(--muted-foreground)]">
                Your next polished draft starts here.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <article
                  className={`max-w-[92%] rounded-lg px-4 py-3 text-sm leading-6 sm:max-w-[82%] ${
                    message.role === "user"
                      ? "bg-blue-700 text-white"
                      : "bg-neutral-100 text-[var(--foreground)]"
                  }`}
                >
                  <p className="mb-1 text-xs font-semibold opacity-75">
                    {message.role === "user" ? "You" : "RewriteFlow"}
                  </p>
                  {message.parts.map((part, index) =>
                    part.type === "text" ? (
                      <p
                        key={`${message.id}-${index}`}
                        className="whitespace-pre-wrap break-words"
                      >
                        {part.text}
                      </p>
                    ) : null,
                  )}
                </article>
              </div>
            ))
          )}

          {status === "submitted" && (
            <p
              role="status"
              className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]"
            >
              <span
                aria-hidden="true"
                className="size-2 animate-pulse rounded-full bg-blue-700"
              />
              Thinking through your rewrite...
            </p>
          )}
        </div>

        {showJumpToLatest && (
          <button
            type="button"
            onClick={jumpToLatest}
            className="absolute bottom-3 left-1/2 inline-flex min-h-10 -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-md border border-[var(--border)] bg-white px-3 text-sm font-medium text-[var(--foreground)] shadow-sm transition-colors hover:border-blue-700 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
          >
            <ArrowDown aria-hidden="true" className="size-4" />
            Jump to latest
          </button>
        )}
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="border-t border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 sm:px-5"
        >
          {error?.message || "Something went wrong. Please try sending your message again."}
        </p>
      )}

      <form onSubmit={handleSubmit} className="border-t border-[var(--border)] p-4 sm:px-5">
        <label
          htmlFor="rewriteflow-input"
          className="mb-2 block text-sm font-medium text-[var(--foreground)]"
        >
          Text to rewrite
        </label>
        <textarea
          id="rewriteflow-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={3}
          placeholder="Paste a draft or describe the change you want..."
          className="block w-full min-w-0 resize-y rounded-md border border-neutral-300 bg-white p-3 text-base leading-6 text-[var(--foreground)] placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
        />
        <div className="mt-3 flex justify-end">
          {isBusy ? (
            <button
              type="button"
              onClick={() => stop()}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-neutral-300 px-4 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-red-700 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
            >
              <Square aria-hidden="true" className="size-4" />
              Stop
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45"
            >
              <Send aria-hidden="true" className="size-4" />
              Generate
            </button>
          )}
        </div>
      </form>
    </section>
  );
}