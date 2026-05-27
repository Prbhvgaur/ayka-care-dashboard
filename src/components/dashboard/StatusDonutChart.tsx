"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { Card } from "@/components/ui/Card";

const COLORS = ["#0A84FF", "#14B8A6", "#FF9F0A", "#FF3B30"];

export default function StatusDonutChart({
  data,
}: {
  data: Record<string, number>;
}) {
  const chartData = Object.entries(data).map(([name, value]) => ({ name, value }));

  return (
    <Card hoverable className="h-[360px] p-5">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Utilization</p>
          <h2 className="text-xl font-bold tracking-tight">Task Load</h2>
        </div>
        <div className="text-[10px] font-bold bg-zinc-50 dark:bg-zinc-900 px-2 py-1 rounded border border-zinc-100 dark:border-zinc-800 uppercase tracking-widest text-zinc-400">
          Realtime
        </div>
      </div>
      <div className="h-[180px] relative">
        <ResponsiveContainer height="100%" width="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              dataKey="value"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              animationDuration={800}
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell fill={index === 0 ? 'var(--text-primary)' : 'var(--border)'} key={entry.name} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "var(--bg-primary)", 
                borderRadius: "8px", 
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-lg)",
                padding: "8px 12px"
              }}
              itemStyle={{ fontWeight: 700, fontSize: '11px', textTransform: 'uppercase' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold tracking-tighter tabular-nums">
            {chartData.reduce((acc, curr) => acc + curr.value, 0)}
          </span>
          <span className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] mt-1">Total</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-8 pt-6 border-t border-zinc-50 dark:border-zinc-900">
        {chartData.map((item, index) => (
          <div className="flex items-center justify-between group cursor-default" key={item.name}>
            <div className="flex items-center gap-2">
              <div
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: index === 0 ? 'var(--text-primary)' : 'var(--border)' }}
              />
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tight">{item.name}</span>
            </div>
            <span className="text-[10px] font-black text-black dark:text-white tabular-nums tracking-tighter">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
