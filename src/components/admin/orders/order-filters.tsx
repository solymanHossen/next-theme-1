"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";

interface FilterState {
  search: string;
  status: string;
  dateRange: string;
  customer: string;
  paymentMethod: string;
}

export function OrderFilters() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    status: "",
    dateRange: "",
    customer: "",
    paymentMethod: "",
  });

  const statuses = [
    "All Status",
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
    "Refunded",
  ];

  const dateRanges = [
    "All Time",
    "Today",
    "Yesterday",
    "Last 7 days",
    "Last 30 days",
    "Last 3 months",
    "Custom Range",
  ];

  const paymentMethods = [
    "All Methods",
    "Credit Card",
    "PayPal",
    "Bank Transfer",
    "Apple Pay",
    "Google Pay",
  ];

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      status: "",
      dateRange: "",
      customer: "",
      paymentMethod: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Filter Orders
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            <X className="h-4 w-4" />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search orders..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Status */}
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {statuses.map((status) => (
            <option key={status} value={status === "All Status" ? "" : status}>
              {status}
            </option>
          ))}
        </select>

        {/* Date Range */}
        <select
          value={filters.dateRange}
          onChange={(e) => handleFilterChange("dateRange", e.target.value)}
          className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {dateRanges.map((range) => (
            <option key={range} value={range === "All Time" ? "" : range}>
              {range}
            </option>
          ))}
        </select>

        {/* Customer */}
        <div className="relative">
          <input
            type="text"
            placeholder="Customer name..."
            value={filters.customer}
            onChange={(e) => handleFilterChange("customer", e.target.value)}
            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Payment Method */}
        <select
          value={filters.paymentMethod}
          onChange={(e) => handleFilterChange("paymentMethod", e.target.value)}
          className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {paymentMethods.map((method) => (
            <option key={method} value={method === "All Methods" ? "" : method}>
              {method}
            </option>
          ))}
        </select>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => {
            if (!value) return null;
            return (
              <span
                key={key}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full text-sm"
              >
                {key}: {value}
                <button
                  onClick={() =>
                    handleFilterChange(key as keyof FilterState, "")
                  }
                  className="ml-1 hover:text-blue-600 dark:hover:text-blue-200"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            );
          })}
        </div>
      )}

      {/* Quick Date Filters */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Quick filters:
        </span>
        <div className="flex flex-wrap gap-2">
          {["Today", "This Week", "This Month"].map((period) => (
            <button
              key={period}
              onClick={() => handleFilterChange("dateRange", period)}
              className="px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full transition-colors"
            >
              {period}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
