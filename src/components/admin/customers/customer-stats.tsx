"use client";

import React from "react";
import {
  Users,
  UserCheck,
  UserX,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Calendar,
} from "lucide-react";

export function CustomerStats() {
  const stats = [
    {
      title: "Total Customers",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "blue",
    },
    {
      title: "Active Customers",
      value: "1,923",
      change: "+8.2%",
      trend: "up",
      icon: UserCheck,
      color: "green",
    },
    {
      title: "New This Month",
      value: "156",
      change: "+18.9%",
      trend: "up",
      icon: Calendar,
      color: "purple",
    },
    {
      title: "Inactive Customers",
      value: "924",
      change: "-5.3%",
      trend: "down",
      icon: UserX,
      color: "orange",
    },
    {
      title: "Avg. Order Value",
      value: "$127.50",
      change: "+15.2%",
      trend: "up",
      icon: DollarSign,
      color: "emerald",
    },
    {
      title: "Avg. Orders/Customer",
      value: "3.2",
      change: "+7.1%",
      trend: "up",
      icon: ShoppingBag,
      color: "indigo",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
      green:
        "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
      purple:
        "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
      orange:
        "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
      emerald:
        "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
      indigo:
        "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;

        return (
          <div
            key={stat.title}
            className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${getColorClasses(stat.color)}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  stat.trend === "up"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                <TrendIcon className="h-3 w-3" />
                {stat.change}
              </div>
            </div>

            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {stat.title}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
