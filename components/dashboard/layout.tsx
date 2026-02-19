"use client";

import { useApp } from "@/hooks/useApp";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { sidebarOpen } = useApp();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />

      {/* Main Content */}
      <main
        className={cn(
          "transition-all duration-300 ease-in-out pt-16",
          sidebarOpen ? "ml-64" : "ml-20",
        )}
      >
        <div className="h-full min-h-[calc(100vh-64px)] p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
