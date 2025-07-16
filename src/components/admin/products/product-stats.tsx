"use client";

import React from "react";
import { Package, TrendingUp, AlertTriangle, DollarSign } from "lucide-react";

export function ProductStats() {
  const stats = [
    {
      title: "Total Products",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Package,
      color: "blue",
    },
    {
      title: "Active Products",
      value: "2,654",
      change: "+8.2%",
      trend: "up",
      icon: TrendingUp,
      color: "green",
    },
    {
      title: "Low Stock",
      value: "23",
      change: "-15.3%",
      trend: "down",
      icon: AlertTriangle,
      color: "amber",
    },
    {
      title: "Avg. Price",
      value: "$89.99",
      change: "+3.1%",
      trend: "up",
      icon: DollarSign,
      color: "purple",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
      green:
        "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400",
      amber:
        "bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
      purple:
        "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2">
                  {stat.value}
                </p>
                <div className="flex items-center mt-2">
                  <span
                    className={`text-sm font-medium ${
                      stat.trend === "up"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400 ml-1">
                    vs last month
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
