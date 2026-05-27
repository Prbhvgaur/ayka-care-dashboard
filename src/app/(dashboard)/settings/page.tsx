"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Switch from "@radix-ui/react-switch";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ACCENT_OPTIONS, DENSITY_OPTIONS, THEME_OPTIONS } from "@/lib/constants";
import { profileSchema } from "@/lib/validations";
import { useUiStore } from "@/store/uiStore";

const tabs = ["Profile", "Appearance", "Notifications", "Security"] as const;

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Profile");
  const { theme, setTheme } = useTheme();
  const accentColor = useUiStore((state) => state.accentColor);
  const setAccentColor = useUiStore((state) => state.setAccentColor);
  const density = useUiStore((state) => state.density);
  const setDensity = useUiStore((state) => state.setDensity);
  const sidebarPosition = useUiStore((state) => state.sidebarPosition);
  const setSidebarPosition = useUiStore((state) => state.setSidebarPosition);
  const pushToast = useUiStore((state) => state.pushToast);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "Aarohi Gaur",
      email: "admin@aykacare.in",
      phone: "+919876543210",
      department: "Operations",
    },
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="eyebrow">Preferences</p>
        <h2 className="font-display text-4xl font-semibold">Settings</h2>
      </div>
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            className={`rounded-full px-4 py-3 font-semibold transition ${
              activeTab === tab
                ? "bg-[var(--color-brand)] text-white"
                : "bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
            }`}
            key={tab}
            onClick={() => setActiveTab(tab)}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Profile" ? (
        <Card className="grid gap-6 p-6 xl:grid-cols-[320px_1fr]">
          <div className="glass-panel flex min-h-72 flex-col items-center justify-center rounded-[28px] border-dashed p-6 text-center">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--color-brand-light)] text-3xl font-bold text-[var(--color-brand)]">
              AG
            </div>
            <p className="font-semibold">Avatar upload zone</p>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">Drag & drop is styled for production polish. Upload flow is intentionally UI-only.</p>
          </div>
          <form
            className="grid gap-4"
            onSubmit={handleSubmit(() => {
              pushToast({
                title: "Profile saved",
                description: "Your settings were updated successfully.",
                tone: "success",
              });
            })}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Input error={errors.name?.message} label="Name" {...register("name")} />
              <Input error={errors.email?.message} label="Email" {...register("email")} />
              <Input error={errors.phone?.message} label="Phone" {...register("phone")} />
              <Input error={errors.department?.message} label="Department" {...register("department")} />
            </div>
            <Button className="w-fit">Save profile</Button>
          </form>
        </Card>
      ) : null}

      {activeTab === "Appearance" ? (
        <Card className="space-y-6 p-6">
          <div>
            <p className="mb-3 font-semibold">Theme</p>
            <div className="flex flex-wrap gap-3">
              {THEME_OPTIONS.map((option) => (
                <Button
                  key={option}
                  onClick={() => setTheme(option)}
                  variant={theme === option ? "primary" : "secondary"}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 font-semibold">Accent color</p>
            <div className="flex flex-wrap gap-3">
              {ACCENT_OPTIONS.map((color) => (
                <button
                  aria-label={`Set accent ${color}`}
                  className={`h-11 w-11 rounded-full border-4 transition ${accentColor === color ? "border-[var(--text-primary)]" : "border-transparent"}`}
                  key={color}
                  onClick={() => setAccentColor(color)}
                  style={{ backgroundColor: color }}
                  type="button"
                />
              ))}
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-3 font-semibold">Sidebar position</p>
              <div className="flex gap-3">
                {["left", "right"].map((option) => (
                  <Button
                    key={option}
                    onClick={() => setSidebarPosition(option as "left" | "right")}
                    variant={sidebarPosition === option ? "primary" : "secondary"}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 font-semibold">Density</p>
              <div className="flex flex-wrap gap-3">
                {DENSITY_OPTIONS.map((option) => (
                  <Button
                    key={option}
                    onClick={() => setDensity(option)}
                    variant={density === option ? "primary" : "secondary"}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ) : null}

      {activeTab === "Notifications" ? (
        <Card className="space-y-4 p-6">
          {[
            "Send critical task alerts",
            "Email weekly leadership summaries",
            "Mute after-hours user activity digests",
          ].map((item, index) => (
            <div className="flex items-center justify-between gap-3 rounded-[20px] bg-[var(--bg-tertiary)]/70 px-4 py-4" key={item}>
              <div>
                <p className="font-semibold">{item}</p>
                <p className="text-sm text-[var(--text-secondary)]">Fine tune how operations updates reach your team.</p>
              </div>
              <Switch.Root className="relative h-7 w-12 rounded-full bg-[var(--text-muted)] data-[state=checked]:bg-[var(--color-brand)]" defaultChecked={index !== 2}>
                <Switch.Thumb className="block h-5 w-5 translate-x-1 rounded-full bg-white transition data-[state=checked]:translate-x-6" />
              </Switch.Root>
            </div>
          ))}
        </Card>
      ) : null}

      {activeTab === "Security" ? (
        <Card className="space-y-4 p-6">
          {[
            "JWT session cookies with SameSite=Strict",
            "Rate limited authentication endpoint",
            "Protected dashboard routes with middleware",
          ].map((item) => (
            <div className="rounded-[20px] bg-[var(--bg-tertiary)]/70 px-4 py-4" key={item}>
              <p className="font-semibold">{item}</p>
            </div>
          ))}
        </Card>
      ) : null}
    </div>
  );
}
