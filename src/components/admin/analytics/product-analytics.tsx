"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Package,
  TrendingUp,
  Star,
  Eye,
  ShoppingCart,
  AlertTriangle,
} from "lucide-react";

export function ProductAnalytics() {
  // Top performing products
  const topProductsData = [
    { name: "Wireless Headphones", sales: 1250, revenue: 87500, views: 5600 },
    { name: "Smart Watch", sales: 980, revenue: 147000, views: 4200 },
    { name: "Laptop Stand", sales: 756, revenue: 45360, views: 3800 },
    { name: "USB-C Hub", sales: 543, revenue: 32580, views: 2900 },
    { name: "Bluetooth Speaker", sales: 421, revenue: 25260, views: 2100 },
  ];

  // Product categories performance
  const categoryPerformanceData = [
    { category: "Electronics", sales: 2847, revenue: 284700, margin: 35 },
    { category: "Accessories", sales: 1923, revenue: 96150, margin: 45 },
    { category: "Home & Garden", sales: 1456, revenue: 145600, margin: 28 },
    { category: "Sports", sales: 987, revenue: 78960, margin: 32 },
    { category: "Books", sales: 654, revenue: 19620, margin: 55 },
  ];

  // Inventory status
  const inventoryData = [
    { status: "In Stock", count: 1247, color: "#10B981" },
    { status: "Low Stock", count: 89, color: "#F59E0B" },
    { status: "Out of Stock", count: 23, color: "#EF4444" },
    { status: "Backorder", count: 15, color: "#8B5CF6" },
  ];

  // Product ratings distribution
  const ratingsData = [
    { rating: "5 Stars", count: 1456, percentage: 68 },
    { rating: "4 Stars", count: 432, percentage: 20 },
    { rating: "3 Stars", count: 156, percentage: 7 },
    { rating: "2 Stars", count: 67, percentage: 3 },
    { rating: "1 Star", count: 43, percentage: 2 },
  ];

  // Weekly product views
  const viewsData = [
    { week: "Week 1", views: 15420 },
    { week: "Week 2", views: 18650 },
    { week: "Week 3", views: 16890 },
    { week: "Week 4", views: 21340 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value);
  };

  return (
    <div className="space-y-6">
      {/* Product Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                Total Products
              </p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                1,374
              </p>
              <p className="text-blue-600 dark:text-blue-400 text-xs flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +24 new this month
              </p>
            </div>
            <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                Products Sold
              </p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                6,867
              </p>
              <p className="text-green-600 dark:text-green-400 text-xs flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +18.2% vs last month
              </p>
            </div>
            <ShoppingCart className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 dark:text-yellow-400 text-sm font-medium">
                Avg Rating
              </p>
              <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                4.6
              </p>
              <p className="text-yellow-600 dark:text-yellow-400 text-xs flex items-center gap-1">
                <Star className="h-3 w-3 fill-current" />
                Based on 2,154 reviews
              </p>
            </div>
            <Star className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-6 border border-red-200 dark:border-red-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                Low Stock Items
              </p>
              <p className="text-2xl font-bold text-red-900 dark:text-red-100">
                89
              </p>
              <p className="text-red-600 dark:text-red-400 text-xs flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                Requires attention
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Products */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Top Performing Products
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Best selling products by revenue
              </p>
            </div>
            <Package className="h-5 w-5 text-slate-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProductsData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  type="number"
                  tickFormatter={formatCurrency}
                  className="text-xs"
                  stroke="currentColor"
                  opacity={0.6}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  className="text-xs"
                  stroke="currentColor"
                  opacity={0.6}
                  width={120}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(51, 65, 85, 0.9)",
                    border: "none",
                    borderRadius: "8px",
                    color: "white",
                  }}
                  formatter={(value, name) => [
                    name === "revenue"
                      ? formatCurrency(Number(value))
                      : name === "sales"
                      ? formatNumber(Number(value)) + " units"
                      : formatNumber(Number(value)) + " views",
                    name === "revenue"
                      ? "Revenue"
                      : name === "sales"
                      ? "Sales"
                      : "Views",
                  ]}
                />
                <Bar
                  dataKey="revenue"
                  fill="#3B82F6"
                  radius={[0, 4, 4, 0]}
                  name="revenue"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Category Performance
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Sales and margin by category
              </p>
            </div>
            <TrendingUp className="h-5 w-5 text-slate-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="category"
                  className="text-xs"
                  stroke="currentColor"
                  opacity={0.6}
                />
                <YAxis
                  tickFormatter={formatCurrency}
                  className="text-xs"
                  stroke="currentColor"
                  opacity={0.6}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(51, 65, 85, 0.9)",
                    border: "none",
                    borderRadius: "8px",
                    color: "white",
                  }}
                  formatter={(value, name) => [
                    name === "revenue"
                      ? formatCurrency(Number(value))
                      : name === "sales"
                      ? formatNumber(Number(value)) + " units"
                      : Number(value) + "%",
                    name === "revenue"
                      ? "Revenue"
                      : name === "sales"
                      ? "Sales"
                      : "Margin",
                  ]}
                />
                <Bar
                  dataKey="revenue"
                  fill="#10B981"
                  radius={[4, 4, 0, 0]}
                  name="revenue"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inventory Status */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Inventory Status
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Current stock distribution
              </p>
            </div>
            <Package className="h-5 w-5 text-slate-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={inventoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {inventoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(51, 65, 85, 0.9)",
                    border: "none",
                    borderRadius: "8px",
                    color: "white",
                  }}
                  formatter={(value) => [
                    formatNumber(Number(value)),
                    "Products",
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {inventoryData.map((item) => (
              <div key={item.status} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  {item.status}: {formatNumber(item.count)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Views Trend */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Product Views Trend
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Weekly product page views
              </p>
            </div>
            <Eye className="h-5 w-5 text-slate-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="week"
                  className="text-xs"
                  stroke="currentColor"
                  opacity={0.6}
                />
                <YAxis
                  tickFormatter={formatNumber}
                  className="text-xs"
                  stroke="currentColor"
                  opacity={0.6}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(51, 65, 85, 0.9)",
                    border: "none",
                    borderRadius: "8px",
                    color: "white",
                  }}
                  formatter={(value) => [formatNumber(Number(value)), "Views"]}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  name="Views"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Product Ratings */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Product Ratings Distribution
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Customer satisfaction breakdown
            </p>
          </div>
          <Star className="h-5 w-5 text-slate-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {ratingsData.map((rating, index) => (
            <div key={rating.rating} className="text-center">
              <div className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
                {rating.count}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                {rating.rating}
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    index === 0
                      ? "bg-green-500"
                      : index === 1
                      ? "bg-blue-500"
                      : index === 2
                      ? "bg-yellow-500"
                      : index === 3
                      ? "bg-orange-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${rating.percentage}%` }}
                />
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {rating.percentage}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
