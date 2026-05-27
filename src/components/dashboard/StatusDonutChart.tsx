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
    <Card hoverable className="h-[360px] p-6 relative">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="eyebrow text-blue-600">Task Flow</p>
          <h2 className="font-display text-2xl font-bold tracking-tight">Distribution</h2>
        </div>
        <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm">
          <span className="text-xl">📊</span>
        </div>
      </div>
      <div className="h-[200px] relative">
        <ResponsiveContainer height="100%" width="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              dataKey="value"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={6}
              animationDuration={1500}
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell fill={COLORS[index % COLORS.length]} key={entry.name} className="outline-none hover:opacity-80 transition-opacity" />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "var(--bg-secondary)", 
                borderRadius: "16px", 
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-lg)",
                backdropFilter: "blur(120px)"
              }}
              itemStyle={{ fontWeight: 600, fontSize: '12px' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold tracking-tighter">
            {chartData.reduce((acc, curr) => acc + curr.value, 0)}
          </span>
          <span className="text-[10px] font-bold text-slate-400 border-t border-slate-100 mt-1 uppercase tracking-widest pt-1">Total</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6">
        {chartData.map((item, index) => (
          <div className="flex items-center gap-2 group cursor-default" key={item.name}>
            <div
              className="h-2 w-2 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)] group-hover:scale-125 transition-transform"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-xs font-bold text-slate-500 capitalize uppercase tracking-tighter group-hover:text-slate-900 transition-colors">{item.name}</span>
            <span className="ml-auto text-xs font-bold text-slate-900 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
