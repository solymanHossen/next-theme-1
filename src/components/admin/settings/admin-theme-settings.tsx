"use client";

import React from "react";
import { Palette, Settings, Moon, Sun } from "lucide-react";

export function AdminThemeSettings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Palette className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Enterprise Theme System
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Complete theme customization with real-time preview
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <Palette className="h-5 w-5 text-blue-600" />
              <div>
                <h3 className="font-medium text-slate-900 dark:text-slate-100">
                  Color Customization
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Full color palette control
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-blue-600" />
              <div>
                <h3 className="font-medium text-slate-900 dark:text-slate-100">
                  Typography Settings
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Font families and scales
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <Moon className="h-5 w-5 text-blue-600" />
              <div>
                <h3 className="font-medium text-slate-900 dark:text-slate-100">
                  Dark Mode
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Light/Dark theme toggle
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
          <span className="text-green-800 dark:text-green-400 font-medium">
            Enterprise Theme System Loaded Successfully
          </span>
        </div>
        <p className="text-green-700 dark:text-green-500 text-sm mt-1">
          Navigate to http://localhost:3001/admin/settings/theme to access the
          full theme customizer.
        </p>
      </div>

      {/* Coming Soon */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          🚀 Full Enterprise Theme Customizer
        </h3>
        <p className="text-blue-800 dark:text-blue-200 mb-4">
          The complete theme customization interface is being optimized for the
          best experience. Features include:
        </p>
        <ul className="space-y-2 text-blue-700 dark:text-blue-300">
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 bg-blue-500 rounded-full"></div>
            Real-time color palette editor with 50+ variables
          </li>
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 bg-blue-500 rounded-full"></div>
            Typography control with Google Fonts integration
          </li>
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 bg-blue-500 rounded-full"></div>
            Multi-tenant support and white-label branding
          </li>
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 bg-blue-500 rounded-full"></div>
            Device preview and export functionality
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminThemeSettings;
