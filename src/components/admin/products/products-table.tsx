"use client";

import React, { useState } from "react";
import { Eye, Edit, Trash2, MoreHorizontal, Package } from "lucide-react";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "inactive" | "draft";
  image: string;
  sales: number;
  createdAt: string;
}

const products: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    sku: "WBH-001",
    category: "Electronics",
    price: 99.99,
    stock: 145,
    status: "active",
    image: "/api/placeholder/60/60",
    sales: 284,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Premium Cotton T-Shirt",
    sku: "PCT-002",
    category: "Clothing",
    price: 29.99,
    stock: 8,
    status: "active",
    image: "/api/placeholder/60/60",
    sales: 156,
    createdAt: "2024-01-12",
  },
  {
    id: "3",
    name: "Smart Fitness Watch",
    sku: "SFW-003",
    category: "Electronics",
    price: 199.99,
    stock: 0,
    status: "inactive",
    image: "/api/placeholder/60/60",
    sales: 89,
    createdAt: "2024-01-10",
  },
  {
    id: "4",
    name: "Organic Green Tea",
    sku: "OGT-004",
    category: "Food & Beverage",
    price: 24.99,
    stock: 234,
    status: "active",
    image: "/api/placeholder/60/60",
    sales: 203,
    createdAt: "2024-01-08",
  },
  {
    id: "5",
    name: "Leather Crossbody Bag",
    sku: "LCB-005",
    category: "Fashion",
    price: 79.99,
    stock: 45,
    status: "draft",
    image: "/api/placeholder/60/60",
    sales: 67,
    createdAt: "2024-01-05",
  },
];

const statusConfig = {
  active: {
    label: "Active",
    color:
      "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    dot: "bg-green-400",
  },
  inactive: {
    label: "Inactive",
    color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
    dot: "bg-red-400",
  },
  draft: {
    label: "Draft",
    color: "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300",
    dot: "bg-slate-400",
  },
};

function StatusBadge({ status }: { status: Product["status"] }) {
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

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0) {
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
        Out of stock
      </span>
    );
  }

  if (stock <= 10) {
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
        Low stock ({stock})
      </span>
    );
  }

  return (
    <span className="text-slate-600 dark:text-slate-400">{stock} in stock</span>
  );
}

export function ProductsTable() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(products.map((p) => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts((prev) => [...prev, productId]);
    } else {
      setSelectedProducts((prev) => prev.filter((id) => id !== productId));
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
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Product Inventory
          </h3>
          <div className="flex items-center gap-2">
            {selectedProducts.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {selectedProducts.length} selected
                </span>
                <button className="px-3 py-1 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                  Delete Selected
                </button>
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
                  checked={selectedProducts.length === products.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                Product
              </th>
              <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                SKU
              </th>
              <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                Category
              </th>
              <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                Price
              </th>
              <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                Stock
              </th>
              <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                Status
              </th>
              <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                Sales
              </th>
              <th className="text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={(e) =>
                      handleSelectProduct(product.id, e.target.checked)
                    }
                    className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <Package className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-slate-900 dark:text-slate-100 truncate">
                        {product.name}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        Added {formatDate(product.createdAt)}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-mono text-sm text-slate-600 dark:text-slate-400">
                    {product.sku}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-slate-600 dark:text-slate-400">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {formatCurrency(product.price)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <StockBadge stock={product.stock} />
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={product.status} />
                </td>
                <td className="px-6 py-4">
                  <span className="text-slate-600 dark:text-slate-400">
                    {product.sales} sold
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition-colors">
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
            Showing 5 of 2,847 products
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
