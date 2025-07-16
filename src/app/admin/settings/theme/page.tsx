"use client";

import React from "react";
import { AdminThemeSettings } from "@/components/admin/settings/admin-theme-settings";
import { EnterpriseThemeCustomizer } from "@/components/admin/settings/enterprise-theme-customizer";
import { EnterpriseThemeProvider } from "@/contexts/enterprise-theme-context";
import { DynamicThemeProvider } from "@/components/theme/dynamic-theme-provider";

export default function ThemeSettingsPage() {
  return (
    <EnterpriseThemeProvider
      tenantId="default-tenant"
      userId="admin-user"
      userRole="admin"
    >
      <DynamicThemeProvider>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Theme Settings
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Customize your admin panel&apos;s theme and appearance.
            </p>
          </div>

          {/* Theme Settings Content */}
          <EnterpriseThemeCustomizer />
        </div>
      </DynamicThemeProvider>
    </EnterpriseThemeProvider>
  );
}
