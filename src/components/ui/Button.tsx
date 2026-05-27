"use client";

import { forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { Spinner } from "@/components/ui/Spinner";
import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", loading = false, children, ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();

    return (
      <motion.button
        whileHover={shouldReduceMotion ? {} : { scale: 1.01, y: -1 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
        className={cn(
          variant === "primary" && "btn-primary",
          variant === "secondary" && "btn-secondary",
          variant === "ghost" &&
            "inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 font-semibold transition hover:bg-[var(--bg-tertiary)]",
          "disabled:cursor-not-allowed disabled:opacity-60",
          className,
        )}
        ref={ref}
        {...props}
      >
        {loading ? <Spinner /> : null}
        {children}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
