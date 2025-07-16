"use client";

import React, { useState } from "react";
import {
  Eye,
  MoreHorizontal,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  status:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "refunded";
  amount: number;
  items: number;
  date: string;
  paymentMethod: string;
  shippingAddress: string;
}

const orders: Order[] = [
  {
    id: "ORD-2024-0001",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
    },
    status: "delivered",
    amount: 129.99,
    items: 3,
    date: "2024-01-15T10:30:00Z",
    paymentMethod: "Credit Card",
    shippingAddress: "123 Main St, New York, NY 10001",
  },
  {
    id: "ORD-2024-0002",
    customer: {
      name: "Michael Chen",
      email: "michael.chen@email.com",
    },
    status: "shipped",
    amount: 89.5,
    items: 2,
    date: "2024-01-15T09:15:00Z",
    paymentMethod: "PayPal",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
  },
  {
    id: "ORD-2024-0003",
    customer: {
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
    },
    status: "processing",
    amount: 245.75,
    items: 5,
    date: "2024-01-14T16:45:00Z",
    paymentMethod: "Credit Card",
    shippingAddress: "789 Pine St, Chicago, IL 60601",
  },
  {
    id: "ORD-2024-0004",
    customer: {
      name: "David Thompson",
      email: "david.thompson@email.com",
    },
    status: "pending",
    amount: 67.25,
    items: 1,
    date: "2024-01-14T14:20:00Z",
    paymentMethod: "Apple Pay",
    shippingAddress: "321 Elm Dr, Miami, FL 33101",
  },
  {
    id: "ORD-2024-0005",
    customer: {
      name: "Lisa Wang",
      email: "lisa.wang@email.com",
    },
    status: "cancelled",
    amount: 156.0,
    items: 4,
    date: "2024-01-13T11:10:00Z",
    paymentMethod: "Credit Card",
    shippingAddress: "654 Cedar Ln, Seattle, WA 98101",
  },
];

const statusConfig = {
  pending: {
    label: "Pending",
    color:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400",
    dot: "bg-amber-400",
    icon: Clock,
  },
  processing: {
    label: "Processing",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    dot: "bg-blue-400",
    icon: Clock,
  },
  shipped: {
    label: "Shipped",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
    dot: "bg-purple-400",
    icon: Truck,
  },
  delivered: {
    label: "Delivered",
    color:
      "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    dot: "bg-green-400",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
    dot: "bg-red-400",
    icon: XCircle,
  },
  refunded: {
    label: "Refunded",
    color: "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300",
    dot: "bg-slate-400",
    icon: XCircle,
  },
};

function StatusBadge({ status }: { status: Order["status"] }) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </div>
  );
}

function PaymentMethodBadge({ method }: { method: string }) {
  const getMethodColor = (method: string) => {
    switch (method.toLowerCase()) {
      case "credit card":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "paypal":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400";
      case "apple pay":
        return "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300";
      case "google pay":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getMethodColor(
        method
      )}`}
    >
      {method}
    </span>
  );
}

export function OrdersTable() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(orders.map((order) => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders((prev) => [...prev, orderId]);
    } else {
      setSelectedOrders((prev) => prev.filter((id) => id !== orderId));
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Order Management
          </h3>
          <div className="flex items-center gap-2">
            {selectedOrders.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {selectedOrders.length} selected
                </span>
                <select className="px-3 py-1 text-sm border border-slate-200 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100">
                  <option value="">Bulk Actions</option>
                  <option value="mark-shipped">Mark as Shipped</option>
                  <option value="mark-delivered">Mark as Delivered</option>
                  <option value="export">Export Selected</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="text-left px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedOrders.length === orders.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                Order ID
              </th>
              <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                Customer
              </th>
              <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                Status
              </th>
              <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                Amount
              </th>
              <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                Items
              </th>
              <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                Payment
              </th>
              <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                Date
              </th>
              <th className="text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {orders.map((order) => {
              const { date, time } = formatDate(order.date);
              return (
                <tr
                  key={order.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={(e) =>
                        handleSelectOrder(order.id, e.target.checked)
                      }
                      className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-mono text-sm font-medium text-slate-900 dark:text-slate-100">
                      {order.id}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {order.customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                          {order.customer.name}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {order.customer.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      {formatCurrency(order.amount)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-600 dark:text-slate-400">
                      {order.items} {order.items === 1 ? "item" : "items"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <PaymentMethodBadge method={order.paymentMethod} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-600 dark:text-slate-400">
                      <div className="text-sm font-medium">{date}</div>
                      <div className="text-xs">{time}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Showing 5 of 1,429 orders
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors disabled:opacity-50">
              Previous
            </button>
            <div className="flex items-center gap-1">
              <button className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg">
                1
              </button>
              <button className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                2
              </button>
              <button className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                3
              </button>
            </div>
            <button className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
