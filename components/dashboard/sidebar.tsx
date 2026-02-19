"use client";

import { useApp } from "@/hooks/useApp";
import { useAuth } from "@/hooks/useAuth";
import { NavItem } from "@/lib/types";
import {
  LayoutDashboard,
  Package,
  Users,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { RoleGuard } from "../auth/role-guard";

export function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useApp();
  const { user } = useAuth();

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      label: "Products",
      href: "/dashboard/products",
      icon: <Package className="h-5 w-5" />,
    },
    {
      label: "Users",
      href: "/dashboard/users",
      icon: <Users className="h-5 w-5" />,
      requiredRole: "admin",
    },
    {
      label: "Public View",
      href: "/public/products",
      icon: <Globe className="h-5 w-5" />,
    },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-64px)] bg-background border-r border-border transition-all duration-300 ease-in-out z-40",
        sidebarOpen ? "w-64" : "w-20",
      )}
    >
      <div className="flex flex-col h-full">
        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          {navItems.map((item) => {
            const content = (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  "text-foreground/70 hover:text-foreground hover:bg-muted",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                )}
              >
                {item.icon}
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );

            if (item.requiredRole === "admin") {
              return (
                <RoleGuard key={item.href} allowedRoles={["admin"]}>
                  {content}
                </RoleGuard>
              );
            }

            return content;
          })}
        </nav>

        {/* Collapse Button */}
        <div className="px-3 py-4 border-t border-border">
          <button
            onClick={toggleSidebar}
            className={cn(
              "flex items-center justify-center w-full gap-2 px-4 py-3 rounded-lg",
              "text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted",
              "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? (
              <>
                <ChevronLeft className="h-5 w-5" />
                <span>Collapse</span>
              </>
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
