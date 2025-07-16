"use client";

import React, { useEffect, ReactNode } from "react";
import { useThemeStore } from "../store/theme-store";

interface ThemeProviderProps {
  children: ReactNode;
  userRole?: "admin" | "customer";
}

export function ThemeProvider({
  children,
  userRole = "customer",
}: ThemeProviderProps) {
  const { activeTheme, setUser, loadThemes, applyThemeToDOM } = useThemeStore();

  useEffect(() => {
    // Set user role (mock user for demo)
    setUser({
      id: "1",
      email: "user@example.com",
      role: userRole,
      name: userRole === "admin" ? "Admin User" : "Customer User",
    });

    // Load available themes
    loadThemes();
  }, [userRole, setUser, loadThemes]);

  useEffect(() => {
    // Apply current theme to DOM whenever it changes
    if (activeTheme) {
      applyThemeToDOM(activeTheme);
    }
  }, [activeTheme, applyThemeToDOM]);

  return <div className="theme-provider">{children}</div>;
}

export default ThemeProvider;
