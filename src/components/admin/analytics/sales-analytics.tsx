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
  AreaChart,
  Area,
} from "recharts";
import {
  DollarSign,
  TrendingUp,
  ShoppingCart,
  CreditCard,
  Calendar,
  Target,
} from "lucide-react";

export function SalesAnalytics() {
  // Revenue data
  const revenueData = [
    { month: "Jan", revenue: 45000, orders: 245, avgOrder: 183.67 },
    { month: "Feb", revenue: 52000, orders: 289, avgOrder: 179.93 },
    { month: "Mar", revenue: 48000, orders: 267, avgOrder: 179.78 },
    { month: "Apr", revenue: 61000, orders: 321, avgOrder: 190.03 },
    { month: "May", revenue: 55000, orders: 298, avgOrder: 184.56 },
    { month: "Jun", revenue: 67000, orders: 356, avgOrder: 188.2 },
  ];

  // Daily sales data
  const dailySalesData = [
    { day: "Mon", sales: 8500 },
    { day: "Tue", sales: 9200 },
    { day: "Wed", sales: 7800 },
    { day: "Thu", sales: 10100 },
    { day: "Fri", sales: 11300 },
    { day: "Sat", sales: 12800 },
    { day: "Sun", sales: 9600 },
  ];

  // Payment methods data
  const paymentMethodsData = [
    { method: "Credit Card", amount: 45000, percentage: 67 },
    { method: "PayPal", amount: 15000, percentage: 22 },
    { method: "Bank Transfer", amount: 5000, percentage: 7 },
    { method: "Other", amount: 2500, percentage: 4 },
  ];

  // Sales by category
  const salesByCategoryData = [
    { category: "Electronics", sales: 28000, orders: 156 },
    { category: "Clothing", sales: 22000, orders: 189 },
    { category: "Home & Garden", sales: 18000, orders: 134 },
    { category: "Sports", sales: 12000, orders: 98 },
    { category: "Books", sales: 8000, orders: 87 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Sales Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                Total Revenue
              </p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                $328K
              </p>
              <p className="text-green-600 dark:text-green-400 text-xs flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +15.3% vs last month
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                Total Orders
              </p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                1,776
              </p>
              <p className="text-blue-600 dark:text-blue-400 text-xs flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +8.7% vs last month
              </p>
            </div>
            <ShoppingCart className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">
                Avg Order Value
              </p>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                $184.67
              </p>
              <p className="text-purple-600 dark:text-purple-400 text-xs flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +6.2% vs last month
              </p>
            </div>
            <Target className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">
                Conversion Rate
              </p>
              <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                3.4%
              </p>
              <p className="text-orange-600 dark:text-orange-400 text-xs flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +0.8% vs last month
              </p>
            </div>
            <CreditCard className="h-8 w-8 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Revenue Trend
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Monthly revenue and order trends
              </p>
            </div>
            <Calendar className="h-5 w-5 text-slate-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="month"
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
                    name === "revenue" ? formatCurrency(Number(value)) : value,
                    name === "revenue" ? "Revenue" : "Orders",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10B981"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Sales */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Daily Sales
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Sales performance by day of week
              </p>
            </div>
            <ShoppingCart className="h-5 w-5 text-slate-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailySalesData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="day"
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
                  formatter={(value) => [
                    formatCurrency(Number(value)),
                    "Sales",
                  ]}
                />
                <Bar
                  dataKey="sales"
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                  name="Sales"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Payment Methods
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Revenue distribution by payment type
              </p>
            </div>
            <CreditCard className="h-5 w-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {paymentMethodsData.map((method, index) => (
              <div key={method.method} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {method.method}
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {formatCurrency(method.amount)} ({method.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      index === 0
                        ? "bg-blue-500"
                        : index === 1
                        ? "bg-green-500"
                        : index === 2
                        ? "bg-purple-500"
                        : "bg-orange-500"
                    }`}
                    style={{ width: `${method.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sales by Category */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Sales by Category
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Revenue performance by product category
              </p>
            </div>
            <Target className="h-5 w-5 text-slate-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesByCategoryData} layout="horizontal">
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
                  dataKey="category"
                  className="text-xs"
                  stroke="currentColor"
                  opacity={0.6}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(51, 65, 85, 0.9)",
                    border: "none",
                    borderRadius: "8px",
                    color: "white",
                  }}
                  formatter={(value, name) => [
                    name === "sales" ? formatCurrency(Number(value)) : value,
                    name === "sales" ? "Sales" : "Orders",
                  ]}
                />
                <Bar
                  dataKey="sales"
                  fill="#8B5CF6"
                  radius={[0, 4, 4, 0]}
                  name="Sales"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
