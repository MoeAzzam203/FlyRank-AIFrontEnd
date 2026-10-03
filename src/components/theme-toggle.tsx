"use client";

import { Moon, Sun } from "lucide-react";
import { useState, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const themeStorageKey = "rewriteflow-theme";
const themeChangeEvent = "rewriteflow-theme-change";

function subscribeToTheme(onThemeChange: () => void) {
  window.addEventListener(themeChangeEvent, onThemeChange);
  return () => window.removeEventListener(themeChangeEvent, onThemeChange);
}

function getCurrentTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerTheme(): Theme {
  return "light";
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getCurrentTheme, getServerTheme);
  const [persistenceError, setPersistenceError] = useState(false);

  function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    window.dispatchEvent(new Event(themeChangeEvent));

    try {
      window.localStorage.setItem(themeStorageKey, nextTheme);
      setPersistenceError(false);
    } catch {
      setPersistenceError(true);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={
          `Switch to ${theme === "dark" ? "light" : "dark"} mode`
        }
        className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--foreground)] transition-colors hover:border-[var(--brand)] hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-muted)]"
      >
        {theme === "dark" ? (
          <Sun aria-hidden="true" className="size-4" />
        ) : (
          <Moon aria-hidden="true" className="size-4" />
        )}
      </button>
      {persistenceError && (
        <span role="status" className="sr-only">
          Theme changed, but your preference could not be saved.
        </span>
      )}
    </>
  );
}
