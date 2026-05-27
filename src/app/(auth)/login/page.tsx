"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, ShieldPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { DEMO_EMAIL, DEMO_PASSWORD } from "@/lib/constants";
import { loginSchema } from "@/lib/validations";
import { useAuth } from "@/hooks/useAuth";
import type { LoginPayload } from "@/types/auth";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn } = useAuth();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
      rememberMe: true,
    },
  });

  return (
    <main className="grid min-h-screen bg-[var(--bg-primary)] lg:grid-cols-[1.1fr_1.4fr]">
      <motion.section 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mesh-bg relative overflow-hidden bg-[linear-gradient(145deg,#020617,#0f172a)] px-6 py-10 text-white sm:px-10 lg:px-14"
      >
        <div className="absolute inset-0 opacity-20">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-indigo-500/20 blur-[120px]" 
          />
        </div>
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold backdrop-blur-md"
            >
              <ShieldPlus className="h-4 w-4 text-blue-400" />
              AYKA Care
            </motion.div>
            <div className="max-w-xl space-y-6">
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="eyebrow text-blue-400"
              >
                Healthcare, Reimagined
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-display text-6xl font-bold leading-tight"
              >
                Command center for <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">care teams</span> building better patient outcomes.
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="max-w-lg text-xl text-slate-400 leading-relaxed"
              >
                Live operations visibility, secure task coordination, and unified user management built for modern healthcare teams.
              </motion.p>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid gap-4 md:grid-cols-3"
          >
            {[
              ["10K+", "Patients"],
              ["500+", "Doctors"],
              ["99.9%", "Uptime"],
            ].map(([value, label]) => (
              <motion.div 
                whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-colors" 
                key={label}
              >
                <p className="font-display text-4xl font-bold text-white">{value}</p>
                <p className="mt-1 text-sm font-medium text-slate-400 uppercase tracking-wider">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      
      <section className="flex items-center justify-center px-5 py-10 sm:px-10 bg-slate-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="surface-card w-full max-w-xl p-10 sm:p-12 shadow-2xl border-none"
        >
          <div className="mb-10 space-y-3 text-center sm:text-left">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="eyebrow text-blue-600"
            >
              Secure Access
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-display text-4xl font-bold tracking-tight"
            >
              Welcome back
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-slate-500 text-lg"
            >
              Manage your healthcare operations with precision.
            </motion.p>
          </div>
          <form
            className="space-y-6"
            onSubmit={handleSubmit(async (values) => {
              await login(values);
            })}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Input error={errors.email?.message} label="Email Address" type="email" {...register("email")} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-2 relative"
            >
              <Input
                error={errors.password?.message}
                label="Password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />
              <button
                className="absolute right-4 top-[38px] text-slate-400 hover:text-blue-600 transition-colors"
                onClick={() => setShowPassword((value) => !value)}
                type="button"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap items-center justify-between gap-4"
            >
              <Controller
                control={control}
                name="rememberMe"
                render={({ field }) => (
                  <label className="inline-flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input
                      checked={Boolean(field.value)}
                      onChange={(event) => field.onChange(event.target.checked)}
                      type="checkbox"
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    Remember me
                  </label>
                )}
              />
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors" type="button">
                Forgot password?
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Button className="w-full justify-center py-4 text-lg" loading={isLoggingIn} type="submit">
                Sign in to dashboard
              </Button>
            </motion.div>
          </form>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-8 rounded-2xl bg-slate-100 p-6 text-sm text-slate-600 border border-slate-200"
          >
            <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Demo credentials
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Email</p>
                <p className="font-mono text-slate-700">{DEMO_EMAIL}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Password</p>
                <p className="font-mono text-slate-700">{DEMO_PASSWORD}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
