"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="glass-panel fixed inset-x-4 bottom-4 z-30 rounded-full px-3 py-2 lg:hidden">
      <div className="flex items-center justify-between gap-2">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              className={cn(
                "flex flex-1 flex-col items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold transition",
                active
                  ? "bg-[var(--color-brand-light)] text-[var(--color-brand)]"
                  : "text-[var(--text-secondary)]",
              )}
              href={item.href}
              key={item.href}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
