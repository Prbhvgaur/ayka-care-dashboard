"use client";

import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, ShieldAlert, UsersRound, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { RecentUsers } from "@/components/dashboard/RecentUsers";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { TaskSummary } from "@/components/dashboard/TaskSummary";
import { Card } from "@/components/ui/Card";
import { api } from "@/lib/api";
import { DEMO_USER } from "@/lib/constants";
import { useAuth } from "@/hooks/useAuth";
import type { StatsResponse } from "@/types/api";

const ActivityChart = dynamic(() => import("@/components/dashboard/ActivityChart"), {
  loading: () => <div className="surface-card skeleton h-[360px] rounded-[28px]" />,
  ssr: false,
});

const StatusDonutChart = dynamic(() => import("@/components/dashboard/StatusDonutChart"), {
  loading: () => <div className="surface-card skeleton h-[360px] rounded-[28px]" />,
  ssr: false,
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
  },
};

export default function DashboardPage() {
  const { user } = useAuth();
  const currentUser = user ?? DEMO_USER;
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
          label: "Total Records",
          value: String(data.totalUsers),
          detail: "Active system capacity",
          trend: [20, 40, 30, 60, 50, 80, 70],
        },
        {
          icon: CheckCircle2,
          label: "Task Velocity",
          value: String(data.completedTasks),
          detail: "Completed within cycle",
          trend: [10, 30, 20, 50, 40, 70, 60],
        },
        {
          icon: Zap,
          label: "Realtime Ops",
          value: String(data.activeUsers),
          detail: "Current concurrent sessions",
          trend: [40, 50, 45, 60, 55, 75, 70],
        },
        {
          icon: ShieldAlert,
          label: "Incident Rate",
          value: String(data.criticalTasks),
          detail: "Immediate review recommended",
          trend: [80, 70, 65, 50, 40, 30, 20],
        },
      ]
    : [];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "System Daily morning briefed";
    if (hour < 18) return "System Mid-day operational";
    return "System Evening reporting";
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      <motion.section variants={itemVariants} className="flex flex-col gap-1 border-b border-zinc-100 dark:border-zinc-800 pb-6">
        <h1 className="text-2xl font-bold tracking-tight">
          {getGreeting()}: <span className="font-medium text-zinc-500">{currentUser.name}</span>
        </h1>
        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Workspace Dashboard / Overview</p>
      </motion.section>

      <motion.section variants={itemVariants} className="grid gap-4 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }, (_, index) => (
              <div className="skeleton h-[160px] rounded-lg border border-zinc-100 dark:border-zinc-800" key={index} />
            ))
          : statsCards.map((card) => <StatsCard key={card.label} {...card} />)}
      </motion.section>

      <motion.section variants={itemVariants} className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        {data ? <ActivityChart data={data.activityData} /> : <div className="skeleton h-[360px] rounded-lg border border-zinc-100 dark:border-zinc-800" />}
        {data ? (
          <StatusDonutChart data={data.tasksByStatus} />
        ) : (
          <div className="skeleton h-[360px] rounded-lg border border-zinc-100 dark:border-zinc-800" />
        )}
      </motion.section>

      <motion.section variants={itemVariants} className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        {data ? <RecentUsers users={data.recentUsers} /> : <div className="skeleton h-[320px] rounded-lg border border-zinc-100 dark:border-zinc-800" />}
        {data ? <TaskSummary tasks={data.highPriorityTasks} /> : <div className="skeleton h-[320px] rounded-lg border border-zinc-100 dark:border-zinc-800" />}
      </motion.section>
    </motion.div>
  );
}
