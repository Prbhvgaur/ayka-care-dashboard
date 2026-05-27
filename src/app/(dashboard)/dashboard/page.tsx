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
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      <motion.section variants={itemVariants} className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-widest">
          <Sparkles className="h-4 w-4" />
          System Overview
        </div>
        <h1 className="font-display text-4xl font-bold tracking-tight">
          {getGreeting()}, <span className="text-blue-600">{currentUser.name.split(' ')[0]}</span>
        </h1>
        <p className="text-slate-500 font-medium">Here's what's happening with your care teams today.</p>
      </motion.section>

      <motion.section variants={itemVariants} className="grid gap-6 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }, (_, index) => (
              <div className="surface-card skeleton h-[220px] rounded-[32px]" key={index} />
            ))
          : statsCards.map((card) => <StatsCard key={card.label} {...card} />)}
      </motion.section>

      <motion.section variants={itemVariants} className="grid gap-6 xl:grid-cols-[1.55fr_1fr]">
        {data ? <ActivityChart data={data.activityData} /> : <Card className="skeleton h-[360px]" />}
        {data ? (
          <StatusDonutChart data={data.tasksByStatus} />
        ) : (
          <Card className="skeleton h-[360px]" />
        )}
      </motion.section>

      <motion.section variants={itemVariants} className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        {data ? <RecentUsers users={data.recentUsers} /> : <Card className="skeleton h-[320px]" />}
        {data ? <TaskSummary tasks={data.highPriorityTasks} /> : <Card className="skeleton h-[320px]" />}
      </motion.section>
    </motion.div>
  );
}
