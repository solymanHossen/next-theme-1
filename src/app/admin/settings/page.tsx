import React from "react";
import { SettingsTabs } from "@/components/admin/settings/settings-tabs";

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Settings
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage your store settings and preferences.
        </p>
      </div>

      {/* Settings Content */}
      <SettingsTabs />
    </div>
  );
}
