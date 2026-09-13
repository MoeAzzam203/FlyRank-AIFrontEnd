import Link from "next/link";

export const metadata = {
  title: "Home",
  description: "Landing page for the AI Writing Assistant foundation.",
};

export default function HomePage() {
  return (
    <section className="mx-auto max-w-5xl">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            AI Writing Assistant
          </p>
          <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
            Transform rough drafts into polished writing.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-[var(--muted-foreground)]">
            This foundation introduces the experience for a writing assistant that will help users
            rewrite, refine, and elevate existing text with AI-powered support in the future.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/about"
              className="rounded-md bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              Learn more
            </Link>
            <Link
              href="/health"
              className="rounded-md border border-[var(--border)] bg-white px-5 py-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              Health check
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-white p-5 shadow-sm sm:p-6">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-4">
            <div className="mb-4 flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-red-400" aria-hidden="true" />
              <span className="inline-block h-3 w-3 rounded-full bg-yellow-400" aria-hidden="true" />
              <span className="inline-block h-3 w-3 rounded-full bg-green-400" aria-hidden="true" />
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-[var(--border)] bg-white p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                  Original draft
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground)]">
                  We need to make this copy clearer and more compelling for new users looking for a
                  smoother workflow.
                </p>
              </div>

              <div className="rounded-xl border border-dashed border-[var(--border)] bg-white/70 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                  Workflow preview
                </p>
                <div className="mt-3 space-y-3">
                  <div className="h-2.5 w-full rounded-full bg-[var(--border)]" aria-hidden="true" />
                  <div className="h-2.5 w-5/6 rounded-full bg-[var(--border)]" aria-hidden="true" />
                  <div className="h-2.5 w-2/3 rounded-full bg-[var(--border)]" aria-hidden="true" />
                </div>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-white p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                  Future output
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
                  AI-assisted rewrite placeholder for a future editing workflow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
