"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";

import { ToastViewport } from "@/components/ui/Toast";
import { useAuthStore } from "@/store/authStore";
import { useDataStore } from "@/store/dataStore";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const setOffline = useDataStore((state) => state.setOffline);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 2,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  useEffect(() => {
    checkAuth();
    const handleOnline = () => setOffline(false);
    const handleOffline = () => setOffline(true);

    setOffline(!navigator.onLine);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [checkAuth, setOffline]);

  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        {children}
        <ToastViewport />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
