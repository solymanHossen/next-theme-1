"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";

interface FilterState {
  search: string;
  category: string;
  status: string;
  priceRange: string;
  stock: string;
}

export function ProductFilters() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    status: "",
    priceRange: "",
    stock: "",
  });

  const categories = [
    "All Categories",
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports",
    "Books",
    "Health & Beauty",
  ];

  const statuses = ["All Status", "Active", "Inactive", "Draft"];

  const priceRanges = [
    "All Prices",
    "$0 - $25",
    "$25 - $50",
    "$50 - $100",
    "$100 - $250",
    "$250+",
  ];

  const stockLevels = ["All Stock", "In Stock", "Low Stock", "Out of Stock"];

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "",
      status: "",
      priceRange: "",
      stock: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Filter Products
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
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category */}
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {categories.map((category) => (
            <option
              key={category}
              value={category === "All Categories" ? "" : category}
            >
              {category}
            </option>
          ))}
        </select>

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

        {/* Price Range */}
        <select
          value={filters.priceRange}
          onChange={(e) => handleFilterChange("priceRange", e.target.value)}
          className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {priceRanges.map((range) => (
            <option key={range} value={range === "All Prices" ? "" : range}>
              {range}
            </option>
          ))}
        </select>

        {/* Stock */}
        <select
          value={filters.stock}
          onChange={(e) => handleFilterChange("stock", e.target.value)}
          className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {stockLevels.map((level) => (
            <option key={level} value={level === "All Stock" ? "" : level}>
              {level}
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
    </div>
  );
}
