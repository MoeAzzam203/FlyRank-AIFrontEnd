export const metadata = {
  title: "About",
  description: "Learn about the purpose of the AI Writing Assistant foundation.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
          About the product
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
          Built to help writers refine and reshape their work.
        </h1>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm sm:p-8">
        <p className="text-lg leading-8 text-[var(--muted-foreground)]">
          This application is designed to become an AI Writing Assistant for people who want to
          transform existing writing into clearer, stronger, and more polished drafts. The
          foundation focuses on a clean experience for drafting, reviewing, and iterating on text
          without yet exposing any AI-powered functionality.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Purpose</h2>
          <p className="mt-3 text-base leading-7 text-[var(--muted-foreground)]">
            Support writers who need a structured workflow for improving tone, clarity, and structure.
          </p>
        </article>

        <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Use case</h2>
          <p className="mt-3 text-base leading-7 text-[var(--muted-foreground)]">
            Ideal for blog posts, website copy, internal notes, and other drafting work that benefits
            from thoughtful rewriting and review.
          </p>
        </article>
      </div>
    </section>
  );
}
