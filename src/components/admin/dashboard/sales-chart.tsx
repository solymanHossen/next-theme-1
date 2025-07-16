"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { BarChart3, AreaChart as AreaChartIcon } from "lucide-react";

const salesData = {
  today: [
    { time: "00:00", sales: 0, orders: 0 },
    { time: "04:00", sales: 1200, orders: 12 },
    { time: "08:00", sales: 3500, orders: 28 },
    { time: "12:00", sales: 5200, orders: 45 },
    { time: "16:00", sales: 4800, orders: 38 },
    { time: "20:00", sales: 3200, orders: 25 },
    { time: "23:59", sales: 1800, orders: 15 },
  ],
  week: [
    { time: "Mon", sales: 12000, orders: 89 },
    { time: "Tue", sales: 15000, orders: 112 },
    { time: "Wed", sales: 18000, orders: 134 },
    { time: "Thu", sales: 16500, orders: 98 },
    { time: "Fri", sales: 22000, orders: 156 },
    { time: "Sat", sales: 25000, orders: 189 },
    { time: "Sun", sales: 19000, orders: 142 },
  ],
  month: [
    { time: "Week 1", sales: 85000, orders: 634 },
    { time: "Week 2", sales: 92000, orders: 712 },
    { time: "Week 3", sales: 88000, orders: 689 },
    { time: "Week 4", sales: 95000, orders: 756 },
  ],
  year: [
    { time: "Jan", sales: 320000, orders: 2340 },
    { time: "Feb", sales: 285000, orders: 2100 },
    { time: "Mar", sales: 350000, orders: 2580 },
    { time: "Apr", sales: 380000, orders: 2890 },
    { time: "May", sales: 420000, orders: 3200 },
    { time: "Jun", sales: 450000, orders: 3450 },
    { time: "Jul", sales: 480000, orders: 3680 },
    { time: "Aug", sales: 465000, orders: 3520 },
    { time: "Sep", sales: 490000, orders: 3780 },
    { time: "Oct", sales: 510000, orders: 3920 },
    { time: "Nov", sales: 485000, orders: 3680 },
    { time: "Dec", sales: 520000, orders: 4100 },
  ],
};

type TimeFilter = "today" | "week" | "month" | "year";
type ChartType = "area" | "bar";

export function SalesChart() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("week");
  const [chartType, setChartType] = useState<ChartType>("area");

  const data = salesData[timeFilter];

  const formatValue = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value}`;
  };

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ value: number; payload: { orders: number } }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
            {label}
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Sales: {formatValue(payload[0].value)}
          </p>
          <p className="text-sm text-green-600 dark:text-green-400">
            Orders: {payload[1]?.value || payload[0].payload.orders}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Sales Overview
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Track your sales performance over time
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Chart Type Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
            <button
              onClick={() => setChartType("area")}
              className={`p-2 rounded-md transition-colors ${
                chartType === "area"
                  ? "bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
              title="Area Chart"
            >
              <AreaChartIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => setChartType("bar")}
              className={`p-2 rounded-md transition-colors ${
                chartType === "bar"
                  ? "bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
              title="Bar Chart"
            >
              <BarChart3 className="h-4 w-4" />
            </button>
          </div>

          {/* Time Filter */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
            {(["today", "week", "month", "year"] as TimeFilter[]).map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors capitalize ${
                    timeFilter === filter
                      ? "bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                  }`}
                >
                  {filter}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "area" ? (
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                className="text-slate-600 dark:text-slate-400"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={formatValue}
                className="text-slate-600 dark:text-slate-400"
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#salesGradient)"
              />
            </AreaChart>
          ) : (
            <BarChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                className="text-slate-600 dark:text-slate-400"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={formatValue}
                className="text-slate-600 dark:text-slate-400"
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {formatValue(data.reduce((sum, item) => sum + item.sales, 0))}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Total Sales
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {data.reduce((sum, item) => sum + item.orders, 0).toLocaleString()}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Total Orders
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {formatValue(
              data.reduce((sum, item) => sum + item.sales, 0) / data.length
            )}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Avg. Sales
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {formatValue(
              data.reduce((sum, item) => sum + item.sales, 0) /
                data.reduce((sum, item) => sum + item.orders, 0)
            )}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Avg. Order Value
          </p>
        </div>
      </div>
    </div>
  );
}
