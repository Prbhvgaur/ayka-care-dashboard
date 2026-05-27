"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  hoverable = false,
}: {
  className?: string;
  children?: React.ReactNode;
  hoverable?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div 
      whileHover={hoverable && !shouldReduceMotion ? { y: -4, boxShadow: "var(--shadow-lg)" } : {}}
      className={cn("surface-card transition-shadow duration-300", className)}
    >
      {children}
    </motion.div>
  );
}
