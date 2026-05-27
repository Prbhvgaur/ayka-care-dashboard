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
    <Card hoverable className="p-4 flex flex-col justify-between min-h-[140px]">
      <div className="flex items-start justify-between">
        <div className="space-y-0.5">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{label}</p>
          <motion.h3
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold tracking-tighter tabular-nums"
            initial={{ opacity: 0, y: 5 }}
          >
            {value}
          </motion.h3>
        </div>
        <div className="text-zinc-300 dark:text-zinc-700">
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-1.5 overflow-hidden">
          <div className="h-1 w-1 rounded-full bg-zinc-400" />
          <p className="text-[10px] font-bold text-zinc-500 truncate uppercase tracking-tighter">{detail}</p>
        </div>
        <div className="mt-2 h-1 w-full bg-zinc-50 dark:bg-zinc-900 rounded-full overflow-hidden">
          <div className="h-full bg-zinc-200 dark:bg-zinc-700 w-2/3" />
        </div>
      </div>
    </Card>
  );
}
