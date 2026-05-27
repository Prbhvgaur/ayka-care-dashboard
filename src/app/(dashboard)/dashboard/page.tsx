"use client";

import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, ShieldAlert, UsersRound, Zap } from "lucide-react";

import { RecentUsers } from "@/components/dashboard/RecentUsers";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { TaskSummary } from "@/components/dashboard/TaskSummary";
import { Card } from "@/components/ui/Card";
import { api } from "@/lib/api";
import type { StatsResponse } from "@/types/api";

const ActivityChart = dynamic(() => import("@/components/dashboard/ActivityChart"), {
  loading: () => <div className="surface-card skeleton h-[360px] rounded-[28px]" />,
  ssr: false,
});

const StatusDonutChart = dynamic(() => import("@/components/dashboard/StatusDonutChart"), {
  loading: () => <div className="surface-card skeleton h-[360px] rounded-[28px]" />,
  ssr: false,
});

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await api.get<StatsResponse>("/stats");
      return response.data;
    },
  });

  const statsCards = data
    ? [
        {
          icon: UsersRound,
          label: "Total Users",
          value: String(data.totalUsers),
          detail: `${Math.round((data.activeUsers / data.totalUsers) * 100)}% active this month`,
          trend: [22, 38, 32, 56, 62, 68, 74],
        },
        {
          icon: CheckCircle2,
          label: "Tasks Done",
          value: String(data.completedTasks),
          detail: `${Math.round((data.completedTasks / data.totalTasks) * 100)}% completion`,
          trend: [10, 16, 24, 42, 58, 72, 84],
        },
        {
          icon: Zap,
          label: "Active Now",
          value: String(data.activeUsers),
          detail: `${Math.round((data.activeUsers / data.totalUsers) * 100)}% of total users`,
          trend: [24, 30, 26, 34, 42, 50, 58],
        },
        {
          icon: ShieldAlert,
          label: "Critical",
          value: String(data.criticalTasks),
          detail: "Needs immediate attention",
          trend: [74, 68, 62, 52, 45, 38, 24],
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      <section className="grid gap-4 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }, (_, index) => (
              <div className="surface-card skeleton h-[184px] rounded-[28px]" key={index} />
            ))
          : statsCards.map((card) => <StatsCard key={card.label} {...card} />)}
      </section>
      <section className="grid gap-4 xl:grid-cols-[1.55fr_1fr]">
        {data ? <ActivityChart data={data.activityData} /> : <Card className="skeleton h-[360px]" />}
        {data ? (
          <StatusDonutChart data={data.tasksByStatus} />
        ) : (
          <Card className="skeleton h-[360px]" />
        )}
      </section>
      <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        {data ? <RecentUsers users={data.recentUsers} /> : <Card className="skeleton h-[320px]" />}
        {data ? <TaskSummary tasks={data.highPriorityTasks} /> : <Card className="skeleton h-[320px]" />}
      </section>
    </div>
  );
}
