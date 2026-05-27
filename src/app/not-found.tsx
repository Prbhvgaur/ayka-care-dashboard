import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] px-6">
      <div className="surface-card max-w-xl space-y-6 p-10 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] bg-[var(--color-brand-light)] text-3xl font-bold text-[var(--color-brand)]">
          404
        </div>
        <div className="space-y-2">
          <p className="eyebrow">Page Missing</p>
          <h1 className="font-display text-4xl font-semibold text-[var(--text-primary)]">
            The page you were looking for is no longer on call.
          </h1>
          <p className="text-base text-[var(--text-secondary)]">
            Let’s get you back to the AYKA Care workspace.
          </p>
        </div>
        <Link className="btn-primary inline-flex" href="/dashboard">
          Return to dashboard
        </Link>
      </div>
    </main>
  );
}
