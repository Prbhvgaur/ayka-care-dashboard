"use client";

import { motion } from "framer-motion";

import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { Sidebar } from "@/components/layout/Sidebar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen lg:flex">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Header />
        <motion.main
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 px-4 pb-24 pt-6 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          {children}
        </motion.main>
      </div>
      <MobileNav />
    </div>
  );
}
