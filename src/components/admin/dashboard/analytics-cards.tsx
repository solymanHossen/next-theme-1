"use client";

import React from "react";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const analyticsData = [
  {
    title: "Total Revenue",
    value: "$54,239",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950",
    sparkline: [20, 25, 30, 28, 35, 40, 45],
  },
  {
    title: "Orders Today",
    value: "1,429",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    sparkline: [15, 22, 18, 25, 28, 32, 29],
  },
  {
    title: "New Users",
    value: "892",
    change: "-2.4%",
    trend: "down",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950",
    sparkline: [30, 28, 25, 20, 18, 15, 12],
  },
  {
    title: "Active Products",
    value: "2,847",
    change: "+5.1%",
    trend: "up",
    icon: Package,
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950",
    sparkline: [10, 15, 12, 18, 22, 25, 28],
  },
];

export function AnalyticsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {analyticsData.map((item) => {
        const Icon = item.icon;
        const TrendIcon = item.trend === "up" ? TrendingUp : TrendingDown;

        return (
          <div
            key={item.title}
            className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${item.bgColor}`}>
                <Icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  item.trend === "up"
                    ? "text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30"
                    : "text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/30"
                }`}
              >
                <TrendIcon className="h-3 w-3" />
                {item.change}
              </div>
            </div>

            {/* Value */}
            <div className="mb-2">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {item.value}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {item.title}
              </p>
            </div>

            {/* Mini Sparkline */}
            <div className="relative h-8">
              <svg className="w-full h-full" viewBox="0 0 100 30">
                <polyline
                  fill="none"
                  stroke={
                    item.color.includes("green")
                      ? "#10b981"
                      : item.color.includes("blue")
                      ? "#3b82f6"
                      : item.color.includes("purple")
                      ? "#8b5cf6"
                      : "#f59e0b"
                  }
                  strokeWidth="2"
                  points={item.sparkline
                    .map(
                      (point, index) =>
                        `${(index * 100) / (item.sparkline.length - 1)},${
                          30 - point
                        }`
                    )
                    .join(" ")}
                />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}
