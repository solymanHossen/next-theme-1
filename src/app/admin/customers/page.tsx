"use client";

import React, { useState } from "react";
import { CustomersTable } from "@/components/admin/customers/customers-table";
import { CustomerFilters } from "@/components/admin/customers/customer-filters";
import { CustomerStats } from "@/components/admin/customers/customer-stats";
import { Download, Filter, UserPlus, Mail } from "lucide-react";

export default function CustomersPage() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Customers
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage customer accounts and relationships
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
            <Mail className="h-4 w-4" />
            Send Newsletter
          </button>

          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>

          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            <UserPlus className="h-4 w-4" />
            Add Customer
          </button>
        </div>
      </div>

      {/* Customer Stats */}
      <CustomerStats />

      {/* Filters */}
      {showFilters && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <CustomerFilters />
        </div>
      )}

      {/* Customers Table */}
      <CustomersTable />
    </div>
  );
}
