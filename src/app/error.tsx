"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] px-6">
        <div className="surface-card max-w-xl space-y-5 p-10">
          <p className="eyebrow">Unexpected Error</p>
          <h1 className="font-display text-4xl font-semibold text-[var(--text-primary)]">
            Something interrupted the care ops flow.
          </h1>
          <p className="text-[var(--text-secondary)]">{error.message}</p>
          <button className="btn-primary" onClick={reset} type="button">
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
