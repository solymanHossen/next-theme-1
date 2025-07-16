"use client";

import React, { useState } from "react";
import { Mail, Smartphone, Monitor, Save } from "lucide-react";

interface NotificationSettings {
  emailNotifications: {
    newOrders: boolean;
    lowStock: boolean;
    userRegistrations: boolean;
    systemUpdates: boolean;
    securityAlerts: boolean;
  };
  pushNotifications: {
    newOrders: boolean;
    urgentIssues: boolean;
    dailySummary: boolean;
  };
  inAppNotifications: {
    realTimeUpdates: boolean;
    messageCenter: boolean;
    taskReminders: boolean;
  };
  frequency: "immediate" | "hourly" | "daily" | "weekly";
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

const initialSettings: NotificationSettings = {
  emailNotifications: {
    newOrders: true,
    lowStock: true,
    userRegistrations: false,
    systemUpdates: true,
    securityAlerts: true,
  },
  pushNotifications: {
    newOrders: true,
    urgentIssues: true,
    dailySummary: false,
  },
  inAppNotifications: {
    realTimeUpdates: true,
    messageCenter: true,
    taskReminders: true,
  },
  frequency: "immediate",
  quietHours: {
    enabled: false,
    start: "22:00",
    end: "08:00",
  },
};

export function NotificationSettings() {
  const [settings, setSettings] =
    useState<NotificationSettings>(initialSettings);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailToggle = (key: keyof typeof settings.emailNotifications) => {
    setSettings((prev) => ({
      ...prev,
      emailNotifications: {
        ...prev.emailNotifications,
        [key]: !prev.emailNotifications[key],
      },
    }));
  };

  const handlePushToggle = (key: keyof typeof settings.pushNotifications) => {
    setSettings((prev) => ({
      ...prev,
      pushNotifications: {
        ...prev.pushNotifications,
        [key]: !prev.pushNotifications[key],
      },
    }));
  };

  const handleInAppToggle = (key: keyof typeof settings.inAppNotifications) => {
    setSettings((prev) => ({
      ...prev,
      inAppNotifications: {
        ...prev.inAppNotifications,
        [key]: !prev.inAppNotifications[key],
      },
    }));
  };

  const handleQuietHoursToggle = (
    key: keyof typeof settings.quietHours,
    value?: string | boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      quietHours: {
        ...prev.quietHours,
        [key]: value !== undefined ? value : !prev.quietHours[key],
      },
    }));
  };

  const handleFrequencyChange = (frequency: typeof settings.frequency) => {
    setSettings((prev) => ({ ...prev, frequency }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    console.log("Notification settings saved:", settings);
  };

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Email Notifications
          </h3>
        </div>

        <div className="space-y-4">
          {Object.entries(settings.emailNotifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-slate-900 dark:text-slate-100 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {getDescriptionForKey(key)}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() =>
                    handleEmailToggle(
                      key as keyof typeof settings.emailNotifications
                    )
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Push Notifications */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Smartphone className="h-5 w-5 text-green-600 dark:text-green-400" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Push Notifications
          </h3>
        </div>

        <div className="space-y-4">
          {Object.entries(settings.pushNotifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-slate-900 dark:text-slate-100 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {getDescriptionForKey(key)}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() =>
                    handlePushToggle(
                      key as keyof typeof settings.pushNotifications
                    )
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-green-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* In-App Notifications */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Monitor className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            In-App Notifications
          </h3>
        </div>

        <div className="space-y-4">
          {Object.entries(settings.inAppNotifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-slate-900 dark:text-slate-100 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {getDescriptionForKey(key)}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() =>
                    handleInAppToggle(
                      key as keyof typeof settings.inAppNotifications
                    )
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-purple-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Frequency & Quiet Hours */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Frequency */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Notification Frequency
          </h3>
          <select
            value={settings.frequency}
            onChange={(e) =>
              handleFrequencyChange(e.target.value as typeof settings.frequency)
            }
            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="immediate">Immediate</option>
            <option value="hourly">Hourly Summary</option>
            <option value="daily">Daily Summary</option>
            <option value="weekly">Weekly Summary</option>
          </select>
        </div>

        {/* Quiet Hours */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Quiet Hours
            </h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.quietHours.enabled}
                onChange={() => handleQuietHoursToggle("enabled")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {settings.quietHours.enabled && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={settings.quietHours.start}
                  onChange={(e) =>
                    handleQuietHoursToggle("start", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={settings.quietHours.end}
                  onChange={(e) =>
                    handleQuietHoursToggle("end", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors"
        >
          <Save className="h-4 w-4" />
          {isLoading ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}

function getDescriptionForKey(key: string): string {
  const descriptions: Record<string, string> = {
    newOrders: "Get notified when new orders are placed",
    lowStock: "Alert when inventory levels are low",
    userRegistrations: "Notify about new user registrations",
    systemUpdates: "Important system and security updates",
    securityAlerts: "Critical security notifications",
    urgentIssues: "High-priority system issues",
    dailySummary: "Daily performance summary",
    realTimeUpdates: "Live updates in the admin panel",
    messageCenter: "Messages and communications",
    taskReminders: "Reminders for pending tasks",
  };

  return descriptions[key] || "Notification setting";
}
