"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card } from "@/components/ui/Card";
import { formatActivityDate } from "@/lib/utils";
import type { StatsResponse } from "@/types/api";

export default function ActivityChart({
  data,
}: {
  data: StatsResponse["activityData"];
}) {
  return (
    <Card className="h-[360px] p-6">
      <div className="mb-4">
        <p className="eyebrow">Operations Activity</p>
        <h2 className="font-display text-2xl font-semibold">Activity over last 7 days</h2>
      </div>
      <ResponsiveContainer height="100%" width="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="usersGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="var(--color-brand)" stopOpacity={0.25} />
              <stop offset="95%" stopColor="var(--color-brand)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="tasksGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="var(--color-success)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="var(--color-success)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--border)" strokeDasharray="6 6" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={formatActivityDate}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--text-secondary)", fontSize: 12, fontWeight: 500 }}
            dy={10}
          />
          <YAxis 
            tickLine={false} 
            axisLine={false} 
            tick={{ fill: "var(--text-secondary)", fontSize: 12, fontWeight: 500 }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "var(--bg-secondary)", 
              borderRadius: "16px", 
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-lg)",
              backdropFilter: "blur(8px)"
            }}
            itemStyle={{ fontWeight: 600 }}
          />
          <Area 
            type="monotone"
            dataKey="users" 
            fill="url(#usersGradient)" 
            stroke="var(--color-brand)" 
            strokeWidth={4} 
            animationDuration={1500}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Area 
            type="monotone"
            dataKey="tasks" 
            fill="url(#tasksGradient)" 
            stroke="var(--color-success)" 
            strokeWidth={4} 
            animationDuration={2000}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
