"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  TrendingUp,
  Users,
  Package,
  Activity,
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      label: "Total Users",
      value: "2,543",
      change: "+12%",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Products",
      value: "348",
      change: "+5%",
      icon: Package,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Active Sessions",
      value: "486",
      change: "+18%",
      icon: Activity,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Revenue",
      value: "$42,850",
      change: "+25%",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="text-muted-foreground mt-2">
          Here&apos;s what&apos;s happening with your business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="p-6 border border-border/50 hover:border-border transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  {stat.change}
                </Badge>
              </div>
              <p className="text-sm text-foreground/60 font-medium">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {stat.value}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Activity */}
        <Card className="lg:col-span-2 p-6 border border-border/50">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "New user registration",
                description: "John Doe registered as a new user",
                time: "2 hours ago",
              },
              {
                title: "Product updated",
                description: "Premium Plan pricing has been updated",
                time: "4 hours ago",
              },
              {
                title: "Payment processed",
                description: "Invoice #2024-001 has been paid",
                time: "1 day ago",
              },
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-start gap-4 pb-4 last:pb-0 border-b border-border/30 last:border-0"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm">
                    {activity.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-2">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 border border-border/50">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Button className="w-full" size="sm">
              Create User
            </Button>
            <Button variant="outline" className="w-full" size="sm">
              Add Product
            </Button>
            <Button variant="outline" className="w-full" size="sm">
              Generate Report
            </Button>
            <Button variant="outline" className="w-full" size="sm">
              View Analytics
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
