import RewriteFlowChat from "@/components/rewriteflow-chat";

export const metadata = {
  title: "RewriteFlow",
  description: "Rewrite and refine text while preserving your intended meaning.",
};

export default function HomePage() {
  return (
    <section className="mx-auto max-w-5xl space-y-8">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
          RewriteFlow
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
          Transform rough drafts into polished writing.
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-[var(--muted-foreground)]">
          Make an idea clearer, adjust its tone, or give a rough draft a cleaner first pass while
          keeping your meaning intact.
        </p>
      </div>

      <RewriteFlowChat />
    </section>
  );
}
