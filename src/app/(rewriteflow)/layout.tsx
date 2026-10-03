import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import ThemeToggle from "@/components/theme-toggle";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AI Writing Assistant",
    template: "%s | AI Writing Assistant",
  },
  description:
    "Foundation phase for an AI Writing Assistant built with Next.js App Router.",
};

const navItems = [
  { href: "/about", label: "About" },
  { href: "/health", label: "Health" },
];

const themeInitializationScript = `
(() => {
  const storageKey = "rewriteflow-theme";
  let theme;

  try {
    theme = localStorage.getItem(storageKey);
  } catch {}

  if (theme !== "light" && theme !== "dark") {
    theme =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  }

  document.documentElement.classList.toggle("dark", theme === "dark");
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <Script
          id="rewriteflow-theme-initialization"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitializationScript }}
        />
        <div className="min-h-screen">
          <header className="border-b border-[var(--border)] bg-[var(--surface-muted)]/85 backdrop-blur-sm">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-1 px-3 py-4 sm:gap-4 sm:px-6 lg:px-8">
              <Link
                href="/"
                className="rounded-md px-1 py-1 text-base font-semibold tracking-tight text-[var(--brand)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--brand-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)] sm:px-2 sm:text-lg"
              >
                AI Writing Assistant
              </Link>

              <nav aria-label="Main navigation" className="flex shrink-0 items-center gap-1 sm:gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md border border-[var(--border)] bg-[var(--surface-muted)] px-2 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--brand)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-muted)] sm:px-3"
                  >
                    {item.label}
                  </Link>
                ))}
                <ThemeToggle />
              </nav>
            </div>
          </header>

          <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
