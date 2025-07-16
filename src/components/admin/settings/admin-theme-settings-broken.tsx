"use client";

import React from "react";
import { AdvancedThemeCustomizer } from "./advanced-theme-customizer";
import { AdvancedThemeProvider } from "@/contexts/advanced-theme-context";

export function AdminThemeSettings() {
  return (
    <AdvancedThemeProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Advanced Theme Customization
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Complete theme customization with colors, typography, components, and layout settings.
                All changes are saved automatically and apply in real-time.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full text-sm font-medium">
                Advanced Theme Engine
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Theme Customizer */}
        <AdvancedThemeCustomizer />

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
                  d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.95 7.07l-.71-.71M6.34 6.34l-.71-.71"
                />
              </svg>
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">
              Dark & Light Mode
            </h4>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Instantly switch between dark and light mode with automatic system
            detection.
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
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">
              Real-time Preview
            </h4>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            See changes instantly as you customize colors and settings.
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
              <li>• Use the preview section to see changes in real-time</li>
              <li>
                • Switch between dark and light mode to ensure consistency
              </li>
              <li>
                • Maintain sufficient contrast for accessibility in both modes
              </li>
              <li>• Colors are automatically saved to your browser</li>
              <li>• Custom colors apply across the entire admin panel</li>
              <li>• Use system theme for automatic dark/light switching</li>
            </ul>
          </div>
        </div>
      </div>
    </AdvancedThemeProvider>
  );
}
