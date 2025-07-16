"use client";

import React, { useEffect } from "react";
import { useThemeStore } from "@/store/theme-store";
import { AdminThemeCustomizer } from "./admin-theme-customizer";

export function AdminThemeSettings() {
  const { loadThemes, themes, isLoading } = useThemeStore();

  useEffect(() => {
    // Load themes when component mounts
    if (themes.length === 0) {
      loadThemes();
    }
  }, [loadThemes, themes.length]);

  if (isLoading && themes.length === 0) {
    return (
      <div className="space-y-6">
        {/* Loading skeleton */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
            <div className="space-y-2">
              <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Theme Customization
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Customize your admin panel&apos;s appearance with real-time
              preview. Changes are automatically saved and synced across all
              admin users.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded-full text-sm font-medium">
              {themes.length} Theme{themes.length !== 1 ? "s" : ""} Available
            </div>
          </div>
        </div>
      </div>

      {/* Theme Customizer */}
      <AdminThemeCustomizer />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                />
              </svg>
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">
              Color Palette
            </h4>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Customize primary, secondary, and accent colors to match your brand
            identity.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
              </svg>
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">
              Layout Options
            </h4>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Adjust sidebar width, header height, and overall spacing for optimal
            workflow.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-purple-600 dark:text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">
              Components
            </h4>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Fine-tune button styles, form elements, and interactive components.
          </p>
        </div>
      </div>

      {/* Theme Management Tips */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              className="w-4 h-4 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Theme Customization Best Practices
            </h4>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <li>• Use the preview panel to see changes in real-time</li>
              <li>• Export your theme configurations for backup</li>
              <li>• Test on different screen sizes using viewport controls</li>
              <li>• Maintain sufficient contrast for accessibility</li>
              <li>• Consider your brand guidelines when choosing colors</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
