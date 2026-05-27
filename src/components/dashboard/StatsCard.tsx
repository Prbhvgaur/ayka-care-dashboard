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
    <Card hoverable className="p-5 flex flex-col justify-between min-h-[160px]">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">{label}</p>
          <motion.h3
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold tracking-tighter"
            initial={{ opacity: 0, y: 5 }}
          >
            {value}
          </motion.h3>
        </div>
        <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] p-2 text-[var(--text-secondary)] shadow-sm">
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex h-8 items-end gap-1">
          {trend.map((item, index) => (
            <motion.div
              animate={{ height: `${item}%` }}
              className={cn(
                "flex-1 rounded-t-sm transition-colors",
                index === trend.length - 1 ? "bg-black dark:bg-white" : "bg-[var(--border)] group-hover:bg-[var(--text-muted)]/20"
              )}
              initial={{ height: 0 }}
              key={index}
              transition={{ delay: index * 0.05, duration: 0.5 }}
            />
          ))}
        </div>
        <div className="flex items-center gap-1.5 overflow-hidden">
          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
          <p className="text-[10px] font-bold text-[var(--text-secondary)] truncate uppercase tracking-tight">{detail}</p>
        </div>
      </div>
    </Card>
  );
}
