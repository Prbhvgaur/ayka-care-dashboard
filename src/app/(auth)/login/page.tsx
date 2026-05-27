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
        className="relative overflow-hidden bg-black px-6 py-10 text-white sm:px-10 lg:px-14 flex flex-col justify-between"
      >
        <div className="absolute inset-0">
          <motion.div 
            animate={{ 
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#3b82f6,transparent_60%)]" 
          />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] brightness-100 contrast-150" />
        </div>

        <div className="relative z-10 space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
              <span className="text-lg font-black tracking-tighter">AK</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Ayka Care</span>
          </motion.div>

          <div className="max-w-xl space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display text-7xl font-bold leading-[0.9] tracking-tighter"
            >
              The OS for <br/>
              <span className="text-blue-500">Care Ops.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-md text-lg text-zinc-400 font-medium leading-snug"
            >
              Enterprise healthcare dashboard built for high-performance medical teams.
            </motion.p>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative z-10 grid gap-8 border-t border-white/10 pt-10"
        >
          <div className="flex gap-12">
            {[
              ["10k+", "Records"],
              ["500+", "Staff"],
              ["99.9%", "Uptime"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="text-3xl font-bold tabular-nums tracking-tighter">{value}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>
      
      <section className="flex items-center justify-center px-5 py-10 sm:px-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-md"
        >
          <div className="mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">Sign in to your account</h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)] font-medium">Use your institutional credentials to access the care console.</p>
          </div>

          <form
            className="space-y-5"
            onSubmit={handleSubmit(async (values) => {
              await login(values);
            })}
          >
            <Input error={errors.email?.message} label="Work Email" type="email" {...register("email")} />
            
            <div className="space-y-1 relative">
              <Input
                error={errors.password?.message}
                label="Password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />
              <button
                className="absolute right-3 top-[34px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                onClick={() => setShowPassword((value) => !value)}
                type="button"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <Controller
                control={control}
                name="rememberMe"
                render={({ field }) => (
                  <label className="flex items-center gap-2 text-xs font-medium text-[var(--text-secondary)] cursor-pointer">
                    <input
                      checked={Boolean(field.value)}
                      onChange={(event) => field.onChange(event.target.checked)}
                      type="checkbox"
                      className="h-3.5 w-3.5 rounded border-[var(--border)] text-black focus:ring-0"
                    />
                    Keep me signed in
                  </label>
                )}
              />
              <button className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors" type="button">
                Forgot password?
              </button>
            </div>

            <Button className="w-full justify-center py-2.5 text-sm font-bold bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200" loading={isLoggingIn} type="submit">
              Continue to Dashboard
            </Button>
          </form>

          <div className="mt-10 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-5 text-xs text-[var(--text-secondary)]">
            <p className="font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              Demo Access Mode
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] font-black">ID</p>
                <p className="font-medium text-[var(--text-primary)] mt-0.5">{DEMO_EMAIL}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] font-black">Key</p>
                <p className="font-medium text-[var(--text-primary)] mt-0.5 whitespace-nowrap">Admin@123</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
