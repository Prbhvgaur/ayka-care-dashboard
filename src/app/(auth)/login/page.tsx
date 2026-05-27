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
    <main className="grid min-h-screen bg-[var(--bg-primary)] lg:grid-cols-[1fr_1fr]">
      <section className="bg-black p-8 text-white flex flex-col justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-white rounded flex items-center justify-center">
            <span className="text-black font-black text-sm tracking-tighter">AK</span>
          </div>
          <span className="text-lg font-bold tracking-tight">Ayka Care</span>
        </div>

        <div className="max-w-md">
          <h1 className="text-5xl font-bold tracking-tighter leading-none mb-6">Healthcare <br/> Infrastructure.</h1>
          <p className="text-zinc-500 font-medium leading-normal">
            The institutional platform for modern care teams to coordinate patients, tasks, and data with technical precision.
          </p>
        </div>

        <div className="flex gap-8 border-t border-zinc-800 pt-8 pb-4">
          <div>
            <p className="text-2xl font-bold tracking-tighter tabular-nums">99.9%</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Uptime</p>
          </div>
          <div>
            <p className="text-2xl font-bold tracking-tighter tabular-nums">AES-256</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Security</p>
          </div>
        </div>
      </section>
      
      <section className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Sign In</h2>
            <p className="text-sm text-zinc-500 mt-1 font-medium">Access your workspace using your credentials.</p>
          </div>

          <form
            className="space-y-4"
            onSubmit={handleSubmit(async (values) => {
              await login(values);
            })}
          >
            <div className="space-y-4">
              <Input error={errors.email?.message} label="Email" type="email" {...register("email")} />
              <div className="relative">
                <Input
                  error={errors.password?.message}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                />
                <button
                  className="absolute right-3 top-[34px] text-zinc-400 hover:text-black transition-colors"
                  onClick={() => setShowPassword((value) => !value)}
                  type="button"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Controller
                control={control}
                name="rememberMe"
                render={({ field }) => (
                  <label className="flex items-center gap-2 text-xs font-medium text-zinc-500 cursor-pointer">
                    <input
                      checked={Boolean(field.value)}
                      onChange={(event) => field.onChange(event.target.checked)}
                      type="checkbox"
                      className="h-3.5 w-3.5 rounded border-zinc-300 text-black focus:ring-0"
                    />
                    Save session
                  </label>
                )}
              />
              <button className="text-xs font-bold text-zinc-400 hover:text-black transition-colors" type="button">
                Forgot?
              </button>
            </div>

            <Button className="w-full justify-center bg-black hover:bg-zinc-800 text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 py-2.5 font-bold text-sm rounded-lg transition-colors border-none" loading={isLoggingIn} type="submit">
              Log In
            </Button>
          </form>

          <div className="pt-8 border-t border-zinc-100 dark:border-zinc-800">
            <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-100 dark:border-zinc-800">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Demo Credentials</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[9px] font-bold text-zinc-500 uppercase">Username</p>
                  <p className="text-xs font-medium text-black dark:text-white mt-1">{DEMO_EMAIL}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-zinc-500 uppercase">Key</p>
                  <p className="text-xs font-medium text-black dark:text-white mt-1">Admin@123</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
