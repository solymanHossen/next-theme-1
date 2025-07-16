"use client";

import React from "react";
import { Eye, Download, MoreHorizontal } from "lucide-react";

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  amount: number;
  date: string;
  items: number;
}

const recentOrders: Order[] = [
  {
    id: "ORD-2024-0001",
    customerName: "Sarah Johnson",
    customerEmail: "sarah.johnson@email.com",
    status: "delivered",
    amount: 129.99,
    date: "2024-01-15",
    items: 3,
  },
  {
    id: "ORD-2024-0002",
    customerName: "Michael Chen",
    customerEmail: "michael.chen@email.com",
    status: "shipped",
    amount: 89.5,
    date: "2024-01-15",
    items: 2,
  },
  {
    id: "ORD-2024-0003",
    customerName: "Emily Rodriguez",
    customerEmail: "emily.rodriguez@email.com",
    status: "processing",
    amount: 245.75,
    date: "2024-01-14",
    items: 5,
  },
  {
    id: "ORD-2024-0004",
    customerName: "David Thompson",
    customerEmail: "david.thompson@email.com",
    status: "pending",
    amount: 67.25,
    date: "2024-01-14",
    items: 1,
  },
  {
    id: "ORD-2024-0005",
    customerName: "Lisa Wang",
    customerEmail: "lisa.wang@email.com",
    status: "cancelled",
    amount: 156.0,
    date: "2024-01-13",
    items: 4,
  },
  {
    id: "ORD-2024-0006",
    customerName: "James Wilson",
    customerEmail: "james.wilson@email.com",
    status: "delivered",
    amount: 199.99,
    date: "2024-01-13",
    items: 2,
  },
];

const statusConfig = {
  pending: {
    label: "Pending",
    color:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400",
    dot: "bg-amber-400",
  },
  processing: {
    label: "Processing",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    dot: "bg-blue-400",
  },
  shipped: {
    label: "Shipped",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
    dot: "bg-purple-400",
  },
  delivered: {
    label: "Delivered",
    color:
      "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    dot: "bg-green-400",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
    dot: "bg-red-400",
  },
};

function StatusBadge({ status }: { status: Order["status"] }) {
  const config = statusConfig[status];

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}
    >
      <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </div>
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function RecentOrders() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Recent Orders
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Latest orders from your customers
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            View All
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider pb-3">
                Order ID
              </th>
              <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider pb-3">
                Customer
              </th>
              <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider pb-3">
                Status
              </th>
              <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider pb-3">
                Amount
              </th>
              <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider pb-3">
                Date
              </th>
              <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider pb-3">
                Items
              </th>
              <th className="text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider pb-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {recentOrders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <td className="py-4">
                  <div className="font-medium text-slate-900 dark:text-slate-100">
                    {order.id}
                  </div>
                </td>
                <td className="py-4">
                  <div>
                    <div className="font-medium text-slate-900 dark:text-slate-100">
                      {order.customerName}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {order.customerEmail}
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <StatusBadge status={order.status} />
                </td>
                <td className="py-4">
                  <div className="font-medium text-slate-900 dark:text-slate-100">
                    {formatCurrency(order.amount)}
                  </div>
                </td>
                <td className="py-4">
                  <div className="text-slate-600 dark:text-slate-400">
                    {formatDate(order.date)}
                  </div>
                </td>
                <td className="py-4">
                  <div className="text-slate-600 dark:text-slate-400">
                    {order.items} {order.items === 1 ? "item" : "items"}
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition-colors"
                      title="View Order"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition-colors"
                      title="More Options"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
        <div className="text-sm text-slate-600 dark:text-slate-400">
          Showing 6 of 1,429 orders
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Previous
          </button>
          <button className="px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
