"use client";

import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  sold: number;
  revenue: number;
  trend: "up" | "down" | "stable";
  trendValue: number;
}

const topProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    image: "/api/placeholder/80/80",
    price: 99.99,
    sold: 284,
    revenue: 28395.16,
    trend: "up",
    trendValue: 12.5,
  },
  {
    id: "2",
    name: "Premium Cotton T-Shirt",
    category: "Clothing",
    image: "/api/placeholder/80/80",
    price: 29.99,
    sold: 156,
    revenue: 4678.44,
    trend: "up",
    trendValue: 8.3,
  },
  {
    id: "3",
    name: "Smart Fitness Watch",
    category: "Electronics",
    image: "/api/placeholder/80/80",
    price: 199.99,
    sold: 89,
    revenue: 17799.11,
    trend: "down",
    trendValue: 5.2,
  },
  {
    id: "4",
    name: "Organic Green Tea",
    category: "Food & Beverage",
    image: "/api/placeholder/80/80",
    price: 24.99,
    sold: 203,
    revenue: 5072.97,
    trend: "up",
    trendValue: 15.7,
  },
  {
    id: "5",
    name: "Leather Crossbody Bag",
    category: "Fashion",
    image: "/api/placeholder/80/80",
    price: 79.99,
    sold: 67,
    revenue: 5359.33,
    trend: "stable",
    trendValue: 0.8,
  },
  {
    id: "6",
    name: "Wireless Phone Charger",
    category: "Electronics",
    image: "/api/placeholder/80/80",
    price: 39.99,
    sold: 145,
    revenue: 5798.55,
    trend: "up",
    trendValue: 22.1,
  },
];

function TrendIndicator({
  trend,
  value,
}: {
  trend: Product["trend"];
  value: number;
}) {
  const getConfig = () => {
    switch (trend) {
      case "up":
        return {
          icon: TrendingUp,
          color: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-100 dark:bg-green-900/20",
          prefix: "+",
        };
      case "down":
        return {
          icon: TrendingDown,
          color: "text-red-600 dark:text-red-400",
          bgColor: "bg-red-100 dark:bg-red-900/20",
          prefix: "-",
        };
      case "stable":
        return {
          icon: Minus,
          color: "text-slate-600 dark:text-slate-400",
          bgColor: "bg-slate-100 dark:bg-slate-700",
          prefix: "",
        };
      default:
        return {
          icon: Minus,
          color: "text-slate-600 dark:text-slate-400",
          bgColor: "bg-slate-100 dark:bg-slate-700",
          prefix: "",
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color} ${config.bgColor}`}
    >
      <Icon className="h-3 w-3" />
      {config.prefix}
      {value}%
    </div>
  );
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function TopProducts() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Top Products
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Best selling products this month
          </p>
        </div>

        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
          View All Products
        </button>
      </div>

      {/* Products List */}
      <div className="space-y-4">
        {topProducts.map((product, index) => (
          <div
            key={product.id}
            className="flex items-center gap-4 p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            {/* Rank */}
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {index + 1}
                </span>
              </div>
            </div>

            {/* Product Image */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-xs font-medium">
                    {product.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                    {product.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {product.category}
                  </p>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <TrendIndicator
                    trend={product.trend}
                    value={product.trendValue}
                  />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex-shrink-0 text-right">
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {formatCurrency(product.revenue)}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {product.sold} sold
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {topProducts
                .reduce((sum, product) => sum + product.sold, 0)
                .toLocaleString()}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Total Units Sold
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {formatCurrency(
                topProducts.reduce((sum, product) => sum + product.revenue, 0)
              )}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Total Revenue
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {formatCurrency(
                topProducts.reduce((sum, product) => sum + product.revenue, 0) /
                  topProducts.reduce((sum, product) => sum + product.sold, 0)
              )}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Avg. Price
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
