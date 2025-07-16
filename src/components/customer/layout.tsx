"use client";

import React from "react";
import { SimpleThemeProvider } from "@/components/theme-provider-simple";
import { CustomerHeader } from "@/components/customer/header";
import { CustomerFooter } from "@/components/customer/footer";

interface CustomerLayoutProps {
  children: React.ReactNode;
}

export function CustomerLayout({ children }: CustomerLayoutProps) {
  return (
    <SimpleThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
        <CustomerHeader />
        <main>{children}</main>
        <CustomerFooter />
      </div>
    </SimpleThemeProvider>
  );
}
