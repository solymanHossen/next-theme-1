"use client";

import React, { useState } from "react";
import { ProductsTable } from "@/components/admin/products/products-table";
import { ProductFilters } from "@/components/admin/products/product-filters";
import { ProductStats } from "@/components/admin/products/product-stats";
import { Plus, Download, Upload, Filter } from "lucide-react";

export default function ProductsPage() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Products
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your inventory and product catalog
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              showFilters
                ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                : "text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
            }`}
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>

          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>

          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <Upload className="h-4 w-4" />
            Import
          </button>

          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            <Plus className="h-4 w-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Product Stats */}
      <ProductStats />

      {/* Filters */}
      {showFilters && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <ProductFilters />
        </div>
      )}

      {/* Products Table */}
      <ProductsTable />
    </div>
  );
}
