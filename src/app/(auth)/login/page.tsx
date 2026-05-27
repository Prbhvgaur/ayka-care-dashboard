"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, ShieldPlus } from "lucide-react";

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
      <section className="mesh-bg relative overflow-hidden bg-[linear-gradient(145deg,#0A0E1A,#0D2137)] px-6 py-10 text-white sm:px-10 lg:px-14">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-8 top-10 text-[180px] font-black text-white/10">+</div>
        </div>
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold">
              <ShieldPlus className="h-4 w-4" />
              AYKA Care
            </div>
            <div className="max-w-xl space-y-4">
              <p className="eyebrow text-white/70">Healthcare, Reimagined</p>
              <h1 className="font-display text-5xl font-semibold leading-tight">
                Command center for care teams building better patient outcomes.
              </h1>
              <p className="max-w-lg text-lg text-white/72">
                Live operations visibility, secure task coordination, and unified user management built for modern healthcare teams.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["10K+", "Patients"],
              ["500+", "Doctors"],
              ["99.9%", "Uptime"],
            ].map(([value, label]) => (
              <div className="rounded-[24px] border border-white/12 bg-white/10 p-4 backdrop-blur-md" key={label}>
                <p className="font-display text-3xl font-semibold">{value}</p>
                <p className="mt-1 text-sm text-white/72">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center px-5 py-10 sm:px-10">
        <div className="surface-card w-full max-w-xl p-8 sm:p-10">
          <div className="mb-8 space-y-2">
            <p className="eyebrow">Secure Sign In</p>
            <h2 className="font-display text-4xl font-semibold">Welcome back</h2>
            <p className="text-[var(--text-secondary)]">
              Use the AYKA Care admin workspace to manage operations, teams, and tasks.
            </p>
          </div>
          <form
            className="space-y-5"
            onSubmit={handleSubmit(async (values) => {
              await login(values);
            })}
          >
            <Input error={errors.email?.message} label="Email" type="email" {...register("email")} />
            <div className="space-y-2">
              <Input
                error={errors.password?.message}
                label="Password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />
              <button
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)]"
                onClick={() => setShowPassword((value) => !value)}
                type="button"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showPassword ? "Hide password" : "Show password"}
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Controller
                control={control}
                name="rememberMe"
                render={({ field }) => (
                  <label className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <input
                      checked={Boolean(field.value)}
                      onChange={(event) => field.onChange(event.target.checked)}
                      type="checkbox"
                    />
                    Remember me
                  </label>
                )}
              />
              <button className="text-sm font-semibold text-[var(--color-brand)]" type="button">
                Forgot password?
              </button>
            </div>
            <Button className="w-full justify-center" loading={isLoggingIn} type="submit">
              Sign in to dashboard
            </Button>
          </form>
          <div className="mt-6 rounded-[20px] bg-[var(--bg-tertiary)] p-4 text-sm text-[var(--text-secondary)]">
            <p className="font-semibold text-[var(--text-primary)]">Demo credentials</p>
            <p>{DEMO_EMAIL}</p>
            <p>{DEMO_PASSWORD}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
