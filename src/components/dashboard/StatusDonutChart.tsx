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
    <Card className="h-[360px] p-6">
      <div className="mb-4">
        <p className="eyebrow">Task Flow</p>
        <h2 className="font-display text-2xl font-semibold">Tasks by Status</h2>
      </div>
      <ResponsiveContainer height="100%" width="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="45%"
            dataKey="value"
            innerRadius={68}
            outerRadius={96}
            paddingAngle={3}
          >
            {chartData.map((entry, index) => (
              <Cell fill={COLORS[index % COLORS.length]} key={entry.name} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-3">
        {chartData.map((item, index) => (
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]" key={item.name}>
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="capitalize">{item.name}</span>
            <span className="ml-auto font-semibold text-[var(--text-primary)]">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
