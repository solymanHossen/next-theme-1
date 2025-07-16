"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor, Palette, Save, RotateCcw } from "lucide-react";

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
}

const DEFAULT_COLORS: ThemeColors = {
  primary: "#3b82f6", // blue-500
  secondary: "#64748b", // slate-500
  accent: "#8b5cf6", // violet-500
};

export function SimpleThemeCustomizer() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [colors, setColors] = useState<ThemeColors>(DEFAULT_COLORS);
  const [isCustomizing, setIsCustomizing] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Load saved colors from localStorage
    const savedColors = localStorage.getItem("theme-colors");
    if (savedColors) {
      try {
        setColors(JSON.parse(savedColors));
      } catch {
        console.warn("Failed to parse saved theme colors");
      }
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Apply custom colors to CSS variables
    const root = document.documentElement;
    root.style.setProperty("--color-primary", colors.primary);
    root.style.setProperty("--color-secondary", colors.secondary);
    root.style.setProperty("--color-accent", colors.accent);

    // Save colors to localStorage
    localStorage.setItem("theme-colors", JSON.stringify(colors));
  }, [colors, mounted]);

  const handleColorChange = (colorType: keyof ThemeColors, value: string) => {
    setColors((prev) => ({
      ...prev,
      [colorType]: value,
    }));
  };

  const resetColors = () => {
    setColors(DEFAULT_COLORS);
    localStorage.removeItem("theme-colors");
  };

  const saveTheme = () => {
    // You can extend this to save theme configurations
    alert("Theme colors saved successfully!");
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Theme Mode Selector */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
            {resolvedTheme === "dark" ? (
              <Moon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            ) : (
              <Sun className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            )}
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Theme Mode
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => setTheme("light")}
            className={`p-3 rounded-lg border transition-colors ${
              theme === "light"
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
            }`}
          >
            <Sun className="w-5 h-5 mx-auto mb-1 text-slate-600 dark:text-slate-400" />
            <span className="text-sm text-slate-700 dark:text-slate-300">
              Light
            </span>
          </button>

          <button
            onClick={() => setTheme("dark")}
            className={`p-3 rounded-lg border transition-colors ${
              theme === "dark"
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
            }`}
          >
            <Moon className="w-5 h-5 mx-auto mb-1 text-slate-600 dark:text-slate-400" />
            <span className="text-sm text-slate-700 dark:text-slate-300">
              Dark
            </span>
          </button>

          <button
            onClick={() => setTheme("system")}
            className={`p-3 rounded-lg border transition-colors ${
              theme === "system"
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
            }`}
          >
            <Monitor className="w-5 h-5 mx-auto mb-1 text-slate-600 dark:text-slate-400" />
            <span className="text-sm text-slate-700 dark:text-slate-300">
              System
            </span>
          </button>
        </div>
      </div>

      {/* Color Customization */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <Palette className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Color Customization
            </h3>
          </div>

          <button
            onClick={() => setIsCustomizing(!isCustomizing)}
            className="px-3 py-1 text-sm bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
          >
            {isCustomizing ? "Hide" : "Customize"}
          </button>
        </div>

        {isCustomizing && (
          <div className="space-y-4">
            {/* Primary Color */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Primary Color
              </label>
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-600"
                  style={{ backgroundColor: colors.primary }}
                />
                <input
                  type="color"
                  value={colors.primary}
                  onChange={(e) => handleColorChange("primary", e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Secondary Color */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Secondary Color
              </label>
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-600"
                  style={{ backgroundColor: colors.secondary }}
                />
                <input
                  type="color"
                  value={colors.secondary}
                  onChange={(e) =>
                    handleColorChange("secondary", e.target.value)
                  }
                  className="w-8 h-8 rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Accent Color */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Accent Color
              </label>
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-600"
                  style={{ backgroundColor: colors.accent }}
                />
                <input
                  type="color"
                  value={colors.accent}
                  onChange={(e) => handleColorChange("accent", e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
              <button
                onClick={saveTheme}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
              >
                <Save className="w-4 h-4" />
                Save
              </button>

              <button
                onClick={resetColors}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg transition-colors text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Preview Section */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Preview
        </h3>

        <div className="space-y-3">
          {/* Primary Button */}
          <button
            className="px-4 py-2 rounded-lg text-white transition-colors"
            style={{ backgroundColor: colors.primary }}
          >
            Primary Button
          </button>

          {/* Secondary Button */}
          <button
            className="px-4 py-2 rounded-lg text-white transition-colors"
            style={{ backgroundColor: colors.secondary }}
          >
            Secondary Button
          </button>

          {/* Accent Button */}
          <button
            className="px-4 py-2 rounded-lg text-white transition-colors"
            style={{ backgroundColor: colors.accent }}
          >
            Accent Button
          </button>
        </div>
      </div>
    </div>
  );
}
