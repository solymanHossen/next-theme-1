"use client";

import { AnalyticsCards } from "@/components/admin/dashboard/analytics-cards";
import { RecentOrders } from "@/components/admin/dashboard/recent-orders";
import { SalesChart } from "@/components/admin/dashboard/sales-chart";
import { TopProducts } from "@/components/admin/dashboard/top-products";
import React from "react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Welcome back! Here&apos;s what&apos;s happening with your store today.
        </p>
      </div>

      {/* Analytics Cards */}
      <AnalyticsCards />

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Sales Chart - Takes 2 columns */}
        <div className="xl:col-span-2">
          <SalesChart />
        </div>

        {/* Top Products - Takes 1 column */}
        <div className="xl:col-span-1">
          <TopProducts />
        </div>
      </div>

      {/* Recent Orders */}
      <RecentOrders />
    </div>
  );
}
