import { forwardRef } from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <label className="flex w-full flex-col gap-2">
        {label ? (
          <span className="text-sm font-semibold text-[var(--text-secondary)]">{label}</span>
        ) : null}
        <input
          className={cn(
            "h-13 rounded-[18px] border bg-[var(--bg-secondary)] px-4 text-[var(--text-primary)] outline-none transition focus:border-[var(--color-brand)] focus:ring-4 focus:ring-[rgb(10_132_255_/0.12)]",
            className,
          )}
          ref={ref}
          {...props}
        />
        {error ? <span className="text-sm text-[var(--color-danger)]">{error}</span> : null}
      </label>
    );
  },
);

Input.displayName = "Input";
