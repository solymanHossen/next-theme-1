"use client";

import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  UserPlus,
  UserCheck,
  UserX,
  TrendingUp,
  Calendar,
} from "lucide-react";

export function CustomerAnalytics() {
  // Customer acquisition data
  const acquisitionData = [
    {
      month: "Jan",
      newCustomers: 45,
      activeCustomers: 120,
      churnedCustomers: 8,
    },
    {
      month: "Feb",
      newCustomers: 52,
      activeCustomers: 134,
      churnedCustomers: 6,
    },
    {
      month: "Mar",
      newCustomers: 48,
      activeCustomers: 145,
      churnedCustomers: 9,
    },
    {
      month: "Apr",
      newCustomers: 61,
      activeCustomers: 167,
      churnedCustomers: 7,
    },
    {
      month: "May",
      newCustomers: 55,
      activeCustomers: 178,
      churnedCustomers: 5,
    },
    {
      month: "Jun",
      newCustomers: 67,
      activeCustomers: 195,
      churnedCustomers: 4,
    },
  ];

  // Customer segments data
  const segmentData = [
    { name: "New Customers", value: 28, color: "#3B82F6" },
    { name: "Loyal Customers", value: 35, color: "#10B981" },
    { name: "At Risk", value: 15, color: "#F59E0B" },
    { name: "High Value", value: 22, color: "#8B5CF6" },
  ];

  // Customer demographics data
  const demographicsData = [
    { age: "18-24", customers: 156, percentage: 18 },
    { age: "25-34", customers: 298, percentage: 34 },
    { age: "35-44", customers: 234, percentage: 27 },
    { age: "45-54", customers: 134, percentage: 15 },
    { age: "55+", customers: 52, percentage: 6 },
  ];

  // Customer retention data
  const retentionData = [
    { period: "Month 1", retention: 100 },
    { period: "Month 2", retention: 85 },
    { period: "Month 3", retention: 72 },
    { period: "Month 6", retention: 58 },
    { period: "Month 12", retention: 45 },
  ];

  const formatPercentage = (value: number) => `${value}%`;

  return (
    <div className="space-y-6">
      {/* Customer Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                Total Customers
              </p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                2,847
              </p>
              <p className="text-blue-600 dark:text-blue-400 text-xs flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12.5% vs last month
              </p>
            </div>
            <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                New This Month
              </p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                156
              </p>
              <p className="text-green-600 dark:text-green-400 text-xs flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +18.9% vs last month
              </p>
            </div>
            <UserPlus className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">
                Active Rate
              </p>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                78.5%
              </p>
              <p className="text-purple-600 dark:text-purple-400 text-xs flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +3.2% vs last month
              </p>
            </div>
            <UserCheck className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">
                Churn Rate
              </p>
              <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                2.1%
              </p>
              <p className="text-orange-600 dark:text-orange-400 text-xs flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                -0.8% vs last month
              </p>
            </div>
            <UserX className="h-8 w-8 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Acquisition Trend */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Customer Acquisition
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Monthly customer growth trends
              </p>
            </div>
            <Calendar className="h-5 w-5 text-slate-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={acquisitionData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="month"
                  className="text-xs"
                  stroke="currentColor"
                  opacity={0.6}
                />
                <YAxis
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
                />
                <Line
                  type="monotone"
                  dataKey="newCustomers"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="New Customers"
                />
                <Line
                  type="monotone"
                  dataKey="activeCustomers"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Active Customers"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Segments */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Customer Segments
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Distribution by customer type
              </p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={segmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {segmentData.map((entry, index) => (
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
                  formatter={(value) => [`${value}%`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {segmentData.map((segment) => (
              <div key={segment.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  {segment.name}: {segment.value}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Demographics */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Age Demographics
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Customer distribution by age group
              </p>
            </div>
            <Users className="h-5 w-5 text-slate-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demographicsData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="age"
                  className="text-xs"
                  stroke="currentColor"
                  opacity={0.6}
                />
                <YAxis
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
                />
                <Bar
                  dataKey="customers"
                  fill="#8B5CF6"
                  radius={[4, 4, 0, 0]}
                  name="Customers"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Retention */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Customer Retention
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Retention rate over time
              </p>
            </div>
            <TrendingUp className="h-5 w-5 text-slate-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={retentionData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="period"
                  className="text-xs"
                  stroke="currentColor"
                  opacity={0.6}
                />
                <YAxis
                  domain={[0, 100]}
                  tickFormatter={formatPercentage}
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
                  formatter={(value) => [`${value}%`, "Retention"]}
                />
                <Line
                  type="monotone"
                  dataKey="retention"
                  stroke="#F59E0B"
                  strokeWidth={3}
                  name="Retention Rate"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
