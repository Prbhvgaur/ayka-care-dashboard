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
        <AreaChart data={data}>
          <defs>
            <linearGradient id="usersGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#0A84FF" stopOpacity={0.38} />
              <stop offset="95%" stopColor="#0A84FF" stopOpacity={0.04} />
            </linearGradient>
            <linearGradient id="tasksGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#14B8A6" stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--border)" strokeDasharray="4 4" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={formatActivityDate}
            tickLine={false}
            axisLine={false}
          />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip />
          <Area dataKey="users" fill="url(#usersGradient)" stroke="#0A84FF" strokeWidth={3} />
          <Area dataKey="tasks" fill="url(#tasksGradient)" stroke="#14B8A6" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
