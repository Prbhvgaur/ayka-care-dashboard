"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/Card";

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
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex rounded-2xl bg-[var(--color-brand-light)] p-3 text-[var(--color-brand)]">
            <Icon className="h-5 w-5" />
          </div>
          <p className="text-sm text-[var(--text-secondary)]">{label}</p>
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl font-semibold"
            initial={{ opacity: 0, y: 8 }}
          >
            {value}
          </motion.p>
          <p className="text-sm text-[var(--text-secondary)]">{detail}</p>
        </div>
        <div className="flex h-20 items-end gap-1">
          {trend.map((item, index) => (
            <motion.span
              animate={{ height: `${item}%`, opacity: 1 }}
              className="w-2 rounded-full bg-[var(--color-brand)]/70"
              initial={{ height: 0, opacity: 0.3 }}
              key={`${label}-${index}`}
              transition={{ delay: index * 0.05 }}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
