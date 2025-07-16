"use client";

import React from "react";
import { useThemeStore } from "../store/theme-store";
import AdminThemeCustomizer from "../components/admin-theme-customizer";
import CustomerThemeView from "../components/customer-theme-view";
import ThemePreview from "../components/theme-preview";

export default function HomePage() {
  const { isAdmin, setUser } = useThemeStore();

  const toggleUserRole = () => {
    const newRole = isAdmin ? "customer" : "admin";
    setUser({
      id: "1",
      email: "user@example.com",
      role: newRole,
      name: newRole === "admin" ? "Admin User" : "Customer User",
    });
  };

  return (
    <main className="min-h-screen">
      {/* Role Toggle Button - Demo Only */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleUserRole}
          className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors shadow-lg"
        >
          Switch to {isAdmin ? "Customer" : "Admin"} View
        </button>
      </div>
      {/* Admin View */}
      {isAdmin ? (
        <div className="admin-panel">
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-neutral-900 mb-2">
                    Theme Customization Panel
                  </h1>
                  <p className="text-lg text-neutral-600">
                    Customize your eCommerce platform&apos;s theme in real-time
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-neutral-500">
                    Welcome, Admin User
                  </div>
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-medium">
                    A
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Theme Customizer */}
              <div className="lg:col-span-1">
                <AdminThemeCustomizer />
              </div>

              {/* Theme Preview */}
              <div className="lg:col-span-2">
                <ThemePreview />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Customer View */
        <CustomerThemeView />
      )}
    </main>
  );
}
