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
    <Card className="h-[360px] p-5 relative overflow-hidden group">
      <div className="flex items-center justify-between mb-10 relative z-10">
        <div>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Infrastructure</p>
          <h2 className="text-xl font-bold tracking-tight">System Pulse</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-black dark:bg-white" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Active Sessions</span>
          </div>
        </div>
      </div>

      <div className="h-[210px] relative z-10">
        <ResponsiveContainer height="100%" width="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="2 2" vertical={false} strokeOpacity={0.4} />
            <XAxis
              dataKey="date"
              tickFormatter={formatActivityDate}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--text-muted)", fontSize: 9, fontWeight: 700 }}
              dy={15}
            />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              tick={{ fill: "var(--text-muted)", fontSize: 9, fontWeight: 700 }}
            />
            <Tooltip 
              cursor={{ stroke: 'var(--border)', strokeWidth: 1 }}
              contentStyle={{ 
                backgroundColor: "var(--bg-primary)", 
                borderRadius: "6px", 
                border: "1px solid var(--border)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                padding: "8px 10px"
              }}
              itemStyle={{ fontWeight: 800, fontSize: '10px', textTransform: 'uppercase' }}
              labelStyle={{ fontWeight: 900, fontSize: '9px', marginBottom: '4px', opacity: 0.4 }}
            />
            <Area 
              type="stepAfter"
              dataKey="users" 
              fill="transparent" 
              stroke="var(--text-primary)" 
              strokeWidth={2} 
              animationDuration={800}
              activeDot={{ r: 3, strokeWidth: 0, fill: 'var(--text-primary)' }}
            />
            <Area 
              type="stepAfter"
              dataKey="tasks" 
              fill="transparent" 
              stroke="var(--border)" 
              strokeWidth={1.5} 
              strokeDasharray="3 3"
              animationDuration={1200}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
