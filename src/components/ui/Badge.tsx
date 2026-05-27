import { cn, priorityTone, statusTone } from "@/lib/utils";

export function Badge({
  children,
  tone = "neutral",
  kind = "status",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "brand" | "success" | "warning" | "danger";
  kind?: "status" | "priority";
  className?: string;
}) {
  const resolvedTone = kind === "status" ? statusTone(String(children)) : priorityTone(String(children));
  const palette = {
    neutral: "bg-[var(--bg-tertiary)] text-[var(--text-secondary)]",
    brand: "bg-[var(--color-brand-light)] text-[var(--color-brand)]",
    success: "bg-[rgb(52_199_89_/0.14)] text-[var(--color-success)]",
    warning: "bg-[rgb(255_159_10_/0.14)] text-[var(--color-warning)]",
    danger: "bg-[rgb(255_59_48_/0.14)] text-[var(--color-danger)]",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize",
        palette[resolvedTone ?? tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
