"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export function StatsCard({
  icon: Icon,
  label,
  value,
  detail,
  trend,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
  trend: number[];
}) {
  return (
    <Card hoverable className="p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon className="h-24 w-24 translate-x-8 -translate-y-8" />
      </div>
      <div className="flex flex-col h-full justify-between gap-4 relative z-10">
        <div className="space-y-3">
          <div className="inline-flex rounded-2xl bg-[var(--color-brand-light)] p-3.5 text-[var(--color-brand)] shadow-sm group-hover:scale-110 transition-transform duration-500">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider">{label}</p>
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl font-bold tracking-tight mt-1"
              initial={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {value}
            </motion.p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex h-12 items-end gap-1.5 px-1">
            {trend.map((item, index) => (
              <motion.span
                animate={{ height: `${item}%`, opacity: 1 }}
                className={cn(
                  "flex-1 rounded-full",
                  index === trend.length - 1 ? "bg-[var(--color-brand)]" : "bg-[var(--color-brand)]/20"
                )}
                initial={{ height: 0, opacity: 0 }}
                key={`${label}-${index}`}
                transition={{ delay: 0.2 + index * 0.05, duration: 0.6, ease: "circOut" }}
              />
            ))}
          </div>
          <p className="text-xs font-semibold text-[var(--text-secondary)] flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
            {detail}
          </p>
        </div>
      </div>
    </Card>
  );
}
