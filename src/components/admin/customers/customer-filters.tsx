"use client";

import React, { useState } from "react";
import {
  Search,
  X,
  Calendar,
  MapPin,
  DollarSign,
  ShoppingBag,
  Filter,
} from "lucide-react";

export function CustomerFilters() {
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    segment: "",
    location: "",
    joinDate: "",
    orderCount: "",
    totalSpent: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      status: "",
      segment: "",
      location: "",
      joinDate: "",
      orderCount: "",
      totalSpent: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-600 dark:text-slate-400" />
          <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">
            Filter Customers
          </h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Name, email, phone..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="new">New</option>
            <option value="vip">VIP</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        {/* Customer Segment */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
            Segment
          </label>
          <select
            value={filters.segment}
            onChange={(e) => handleFilterChange("segment", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Segments</option>
            <option value="high-value">High Value</option>
            <option value="regular">Regular</option>
            <option value="new-customer">New Customer</option>
            <option value="at-risk">At Risk</option>
            <option value="loyal">Loyal</option>
            <option value="one-time">One-time Buyer</option>
          </select>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
            <MapPin className="inline h-3 w-3 mr-1" />
            Location
          </label>
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Locations</option>
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <option value="uk">United Kingdom</option>
            <option value="de">Germany</option>
            <option value="fr">France</option>
            <option value="au">Australia</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Join Date */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
            <Calendar className="inline h-3 w-3 mr-1" />
            Join Date
          </label>
          <select
            value={filters.joinDate}
            onChange={(e) => handleFilterChange("joinDate", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Any Time</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last-7-days">Last 7 days</option>
            <option value="last-30-days">Last 30 days</option>
            <option value="last-90-days">Last 90 days</option>
            <option value="last-year">Last year</option>
          </select>
        </div>

        {/* Order Count */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
            <ShoppingBag className="inline h-3 w-3 mr-1" />
            Order Count
          </label>
          <select
            value={filters.orderCount}
            onChange={(e) => handleFilterChange("orderCount", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Any Count</option>
            <option value="0">No Orders</option>
            <option value="1">1 Order</option>
            <option value="2-5">2-5 Orders</option>
            <option value="6-10">6-10 Orders</option>
            <option value="11-20">11-20 Orders</option>
            <option value="20+">20+ Orders</option>
          </select>
        </div>

        {/* Total Spent */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
            <DollarSign className="inline h-3 w-3 mr-1" />
            Total Spent
          </label>
          <select
            value={filters.totalSpent}
            onChange={(e) => handleFilterChange("totalSpent", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Any Amount</option>
            <option value="0">$0</option>
            <option value="1-100">$1 - $100</option>
            <option value="101-500">$101 - $500</option>
            <option value="501-1000">$501 - $1,000</option>
            <option value="1001-5000">$1,001 - $5,000</option>
            <option value="5000+">$5,000+</option>
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200 dark:border-slate-600">
          {Object.entries(filters).map(([key, value]) => {
            if (!value) return null;

            return (
              <span
                key={key}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                <button
                  onClick={() => handleFilterChange(key, "")}
                  className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
