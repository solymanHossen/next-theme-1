"use client";

import React from "react";
import { GeneralSettings } from "@/components/admin/settings/general-settings";

export default function GeneralSettingsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          General Settings
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage your store&apos;s general configuration and preferences.
        </p>
      </div>

      {/* General Settings Content */}
      <GeneralSettings />
    </div>
  );
}
