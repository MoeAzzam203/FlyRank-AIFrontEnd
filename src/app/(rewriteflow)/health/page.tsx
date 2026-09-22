type HealthData = {
  name: string;
  private: boolean;
  default_branch: string;
};

async function fetchHealthData(): Promise<HealthData> {
  const response = await fetch("https://api.github.com/repos/MoeAzzam203/FlyRank-AIFrontEnd", {
    cache: "no-store",
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to load health data.");
  }

  return response.json();
}

export default async function HealthPage() {
  let data: HealthData | null = null;
  let errorMessage = "";

  try {
    data = await fetchHealthData();
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Unknown error while loading health data.";
  }

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
          Health check
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
          System status
        </h1>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm sm:p-8">
        {errorMessage ? (
          <div className="rounded-xl border border-[var(--danger)] bg-[var(--danger-soft)] p-4 text-[var(--danger)]">
            <p className="font-medium">Unable to fetch health data.</p>
            <p className="mt-1 text-sm">{errorMessage}</p>
          </div>
        ) : data ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-3 w-3 rounded-full bg-[var(--success)]" aria-hidden="true" />
              <p className="text-base font-medium text-[var(--success)]">Service is healthy</p>
            </div>

            <dl className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-4">
                <dt className="text-sm font-medium text-[var(--muted-foreground)]">Repository name</dt>
                <dd className="mt-2 text-lg font-semibold text-[var(--foreground)]">{data.name}</dd>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-4">
                <dt className="text-sm font-medium text-[var(--muted-foreground)]">Visibility</dt>
                <dd className="mt-2 text-lg font-semibold text-[var(--foreground)]">
                  {data.private ? "Private" : "Public"}
                </dd>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-4 sm:col-span-2">
                <dt className="text-sm font-medium text-[var(--muted-foreground)]">Default branch</dt>
                <dd className="mt-2 text-base text-[var(--foreground)]">{data.default_branch}</dd>
              </div>
            </dl>
          </div>
        ) : (
          <div className="rounded-xl border border-[var(--warning)] bg-[var(--warning-soft)] p-4 text-[var(--warning)]">
            <p className="font-medium">Loading health data...</p>
          </div>
        )}
      </div>
    </section>
  );
}
