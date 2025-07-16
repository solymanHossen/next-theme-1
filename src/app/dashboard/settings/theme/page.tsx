"use client";

import React from "react";
import { ModernThemeCustomizer } from "@/components/modern-theme-customizer";
import { LivePreviewPanel } from "@/components/live-preview-panel";
import { ThemeProvider } from "@/components/theme-provider";

export default function ThemeSettingsPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <nav className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
              <span>Dashboard</span>
              <span>/</span>
              <span>Settings</span>
              <span>/</span>
              <span>Theme Settings</span>
              <span>/</span>
              <span className="text-slate-900 dark:text-slate-100 font-medium">
                Customization
              </span>
            </nav>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  Theme Customizer
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                  Design and customize your application&apos;s visual identity
                  with real-time preview
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  Export Theme
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Theme Customizer Panel */}
            <div className="xl:col-span-1">
              <ModernThemeCustomizer />
            </div>

            {/* Live Preview Panel */}
            <div className="xl:col-span-2">
              <LivePreviewPanel />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
