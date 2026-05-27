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
    <Card className="h-[360px] p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="h-12 w-12 rounded-full border border-black dark:border-white" />
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
          <p className="text-[11px] font-bold text-blue-500 uppercase tracking-[0.2em] mb-1">Utilization</p>
          <h2 className="text-2xl font-bold tracking-tighter">System Pulse</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-black dark:bg-white" />
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Active Users</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-[var(--border)] group-hover:bg-blue-400 transition-colors" />
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Tasks</span>
          </div>
        </div>
      </div>

      <div className="h-[220px] relative z-10">
        <ResponsiveContainer height="100%" width="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="solidGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--text-primary)" stopOpacity={0.05} />
                <stop offset="100%" stopColor="var(--text-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} strokeOpacity={0.5} />
            <XAxis
              dataKey="date"
              tickFormatter={formatActivityDate}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--text-muted)", fontSize: 10, fontWeight: 700 }}
              dy={15}
            />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              tick={{ fill: "var(--text-muted)", fontSize: 10, fontWeight: 700 }}
            />
            <Tooltip 
              cursor={{ stroke: 'var(--border)', strokeWidth: 1 }}
              contentStyle={{ 
                backgroundColor: "var(--bg-primary)", 
                borderRadius: "8px", 
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-lg)",
                padding: "8px 12px"
              }}
              itemStyle={{ fontWeight: 700, fontSize: '11px', textTransform: 'uppercase' }}
              labelStyle={{ fontWeight: 800, fontSize: '10px', marginBottom: '4px', opacity: 0.5 }}
            />
            <Area 
              type="stepAfter"
              dataKey="users" 
              fill="url(#solidGradient)" 
              stroke="var(--text-primary)" 
              strokeWidth={2} 
              animationDuration={1000}
              activeDot={{ r: 4, strokeWidth: 0, fill: 'var(--text-primary)' }}
            />
            <Area 
              type="stepAfter"
              dataKey="tasks" 
              fill="transparent" 
              stroke="var(--border)" 
              strokeWidth={2} 
              strokeDasharray="4 4"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
