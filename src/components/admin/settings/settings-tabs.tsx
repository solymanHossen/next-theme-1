"use client";

import React, { useState } from "react";
import { Settings, Palette, Bell, Shield, Users } from "lucide-react";

import { AdminThemeSettings } from "./admin-theme-settings";
import { NotificationSettings } from "./notification-settings";
import { GeneralSettings } from "./general-settings";

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.ComponentType;
}

const tabs: Tab[] = [
  {
    id: "general",
    label: "General",
    icon: Settings,
    component: GeneralSettings,
  },
  {
    id: "theme",
    label: "Theme",
    icon: Palette,
    component: AdminThemeSettings,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    component: NotificationSettings,
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
    component: () => (
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Security Settings
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Security settings will be implemented here.
        </p>
      </div>
    ),
  },
  {
    id: "users",
    label: "Users",
    icon: Users,
    component: () => (
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
          User Management
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          User management will be implemented here.
        </p>
      </div>
    ),
  },
];

export function SettingsTabs() {
  const [activeTab, setActiveTab] = useState("general");

  const ActiveComponent =
    tabs.find((tab) => tab.id === activeTab)?.component || GeneralSettings;

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar Navigation */}
      <div className="lg:w-64 flex-shrink-0">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1">
        <ActiveComponent />
      </div>
    </div>
  );
}
