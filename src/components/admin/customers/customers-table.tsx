"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MoreHorizontal,
  Mail,
  Trash2,
  MapPin,
  Calendar,
  ShoppingBag,
  DollarSign,
} from "lucide-react";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: "active" | "inactive" | "new" | "vip" | "suspended";
  segment:
    | "high-value"
    | "regular"
    | "new-customer"
    | "at-risk"
    | "loyal"
    | "one-time";
  location: string;
  joinDate: string;
  lastOrder: string;
  totalOrders: number;
  totalSpent: number;
  avgOrderValue: number;
  notes?: string;
};

export function CustomersTable() {
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);

  // Mock customer data
  const customers: Customer[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      status: "vip",
      segment: "high-value",
      location: "New York, US",
      joinDate: "2023-01-15",
      lastOrder: "2024-01-20",
      totalOrders: 24,
      totalSpent: 3450.5,
      avgOrderValue: 143.77,
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "m.chen@email.com",
      phone: "+1 (555) 234-5678",
      status: "active",
      segment: "loyal",
      location: "San Francisco, US",
      joinDate: "2023-03-22",
      lastOrder: "2024-01-18",
      totalOrders: 18,
      totalSpent: 2180.0,
      avgOrderValue: 121.11,
    },
    {
      id: "3",
      name: "Emma Wilson",
      email: "emma.w@email.com",
      phone: "+1 (555) 345-6789",
      status: "new",
      segment: "new-customer",
      location: "Toronto, CA",
      joinDate: "2024-01-10",
      lastOrder: "2024-01-12",
      totalOrders: 2,
      totalSpent: 195.99,
      avgOrderValue: 98.0,
    },
    {
      id: "4",
      name: "David Rodriguez",
      email: "d.rodriguez@email.com",
      phone: "+1 (555) 456-7890",
      status: "inactive",
      segment: "at-risk",
      location: "Miami, US",
      joinDate: "2022-11-08",
      lastOrder: "2023-10-15",
      totalOrders: 8,
      totalSpent: 567.4,
      avgOrderValue: 70.93,
    },
    {
      id: "5",
      name: "Lisa Anderson",
      email: "lisa.anderson@email.com",
      phone: "+1 (555) 567-8901",
      status: "active",
      segment: "regular",
      location: "Chicago, US",
      joinDate: "2023-06-14",
      lastOrder: "2024-01-19",
      totalOrders: 12,
      totalSpent: 1289.75,
      avgOrderValue: 107.48,
    },
  ];

  const handleSelectCustomer = (customerId: string) => {
    setSelectedCustomers((prev) =>
      prev.includes(customerId)
        ? prev.filter((id) => id !== customerId)
        : [...prev, customerId]
    );
  };

  const handleSelectAll = () => {
    setSelectedCustomers(
      selectedCustomers.length === customers.length
        ? []
        : customers.map((customer) => customer.id)
    );
  };

  const getStatusBadge = (status: Customer["status"]) => {
    const styles = {
      active:
        "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300",
      inactive:
        "bg-gray-100 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300",
      new: "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
      vip: "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
      suspended: "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300",
    };

    const icons = {
      active: "●",
      inactive: "○",
      new: "★",
      vip: "♦",
      suspended: "⚠",
    };

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}
      >
        <span className="text-xs">{icons[status]}</span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getSegmentBadge = (segment: Customer["segment"]) => {
    const styles = {
      "high-value":
        "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300",
      regular:
        "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
      "new-customer":
        "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300",
      "at-risk": "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300",
      loyal:
        "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
      "one-time":
        "bg-gray-100 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300",
    };

    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles[segment]}`}
      >
        {segment
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getCustomerInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
      {/* Table Header with Bulk Actions */}
      {selectedCustomers.length > 0 && (
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-blue-50 dark:bg-blue-900/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                {selectedCustomers.length} customer
                {selectedCustomers.length !== 1 ? "s" : ""} selected
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
                <Mail className="inline h-3 w-3 mr-1" />
                Send Email
              </button>
              <button className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
                Export
              </button>
              <button className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors">
                <Trash2 className="inline h-3 w-3 mr-1" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="text-left p-4 w-12">
                <input
                  type="checkbox"
                  checked={selectedCustomers.length === customers.length}
                  onChange={handleSelectAll}
                  className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 dark:bg-slate-700"
                />
              </th>
              <th className="text-left p-4 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Customer
              </th>
              <th className="text-left p-4 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left p-4 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Segment
              </th>
              <th className="text-left p-4 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Location
              </th>
              <th className="text-left p-4 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Orders
              </th>
              <th className="text-left p-4 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Total Spent
              </th>
              <th className="text-left p-4 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Avg Order
              </th>
              <th className="text-left p-4 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Last Order
              </th>
              <th className="text-right p-4 w-16"></th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedCustomers.includes(customer.id)}
                    onChange={() => handleSelectCustomer(customer.id)}
                    className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 dark:bg-slate-700"
                  />
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {customer.avatar ? (
                        <Image
                          src={customer.avatar}
                          alt={customer.name}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                            {getCustomerInitials(customer.name)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">
                        {customer.name}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {customer.email}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-500">
                        {customer.phone}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="p-4">{getStatusBadge(customer.status)}</td>

                <td className="p-4">{getSegmentBadge(customer.segment)}</td>

                <td className="p-4">
                  <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                    <MapPin className="h-3 w-3" />
                    {customer.location}
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-1 text-sm font-medium text-slate-900 dark:text-slate-100">
                    <ShoppingBag className="h-3 w-3 text-slate-400" />
                    {customer.totalOrders}
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-1 text-sm font-medium text-slate-900 dark:text-slate-100">
                    <DollarSign className="h-3 w-3 text-slate-400" />
                    {formatCurrency(customer.totalSpent)}
                  </div>
                </td>

                <td className="p-4">
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {formatCurrency(customer.avgOrderValue)}
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                    <Calendar className="h-3 w-3" />
                    {formatDate(customer.lastOrder)}
                  </div>
                </td>

                <td className="p-4 text-right">
                  <div className="relative">
                    <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Showing 1-{customers.length} of {customers.length} customers
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <span className="px-3 py-1.5 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md">
              1
            </span>
            <button className="px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
