import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import ThemeToggle from "./theme-toggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("switches the document theme and saves the selection", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const toggle = await screen.findByRole("button", { name: "Switch to dark mode" });
    await user.click(toggle);

    expect(document.documentElement).toHaveClass("dark");
    expect(localStorage.getItem("rewriteflow-theme")).toBe("dark");
    expect(screen.getByRole("button", { name: "Switch to light mode" })).toBeVisible();

    await user.click(screen.getByRole("button", { name: "Switch to light mode" }));

    expect(document.documentElement).not.toHaveClass("dark");
    expect(localStorage.getItem("rewriteflow-theme")).toBe("light");
  });
});
