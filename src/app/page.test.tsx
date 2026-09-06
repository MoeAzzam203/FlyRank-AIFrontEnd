import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("user settings form", () => {
  it("renders the initial values", () => {
    render(<Home />);

    expect(screen.getByLabelText("Display name")).toHaveValue("");
    expect(screen.getByLabelText("Email")).toHaveValue("");
    expect(screen.getByLabelText("Preferred theme")).toHaveValue("system");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("shows required-field validation after submitting empty fields", () => {
    render(<Home />);

    fireEvent.click(screen.getByRole("button", { name: "Save settings" }));

    expect(screen.getByText("Display name is required.")).toBeVisible();
    expect(screen.getByText("Email is required.")).toBeVisible();
    expect(screen.getByLabelText("Display name")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-describedby", "email-error");
  });

  it("shows an error for an invalid email", () => {
    render(<Home />);

    fireEvent.change(screen.getByLabelText("Display name"), {
      target: { value: "Alex" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "not-an-email" },
    });
    fireEvent.blur(screen.getByLabelText("Email"));

    expect(screen.getByText("Enter a valid email address.")).toBeVisible();
  });

  it("shows a success message after valid submission", () => {
    render(<Home />);

    fireEvent.change(screen.getByLabelText("Display name"), {
      target: { value: "Alex" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "alex@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save settings" }));

    expect(screen.getByRole("status")).toHaveTextContent("Settings saved successfully.");
  });

  it("restores initial values and clears validation and success state", () => {
    render(<Home />);

    fireEvent.change(screen.getByLabelText("Display name"), {
      target: { value: "Alex" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "alex@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save settings" }));
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));

    expect(screen.getByLabelText("Display name")).toHaveValue("");
    expect(screen.getByLabelText("Email")).toHaveValue("");
    expect(screen.getByLabelText("Preferred theme")).toHaveValue("system");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.queryByText("Display name is required.")).not.toBeInTheDocument();
  });
});
