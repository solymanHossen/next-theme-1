"use client";

import React, { useState, useCallback } from "react";
import { useThemeStore } from "@/store/theme-store";
import { ColorCustomizer } from "./customizers/color-customizer";
import { TypographyCustomizer } from "./customizers/typography-customizer";
import { LayoutCustomizer } from "./customizers/layout-customizer";
import { ComponentCustomizer } from "./customizers/component-customizer";
import { PresetManager } from "./customizers/preset-manager";
import {
  Palette,
  Type,
  Layout,
  Component,
  Settings,
  Undo,
  Redo,
  RotateCcw,
  Download,
  Upload,
} from "lucide-react";

type CustomizerTab =
  | "presets"
  | "colors"
  | "typography"
  | "layout"
  | "components";

export function ModernThemeCustomizer() {
  const [activeTab, setActiveTab] = useState<CustomizerTab>("presets");
  const {
    activeTheme,
    previewTheme,
    updateTheme,
    resetTheme,
    undoThemeChange,
    redoThemeChange,
    canUndo,
    canRedo,
    exportTheme,
    importTheme,
    isLoading,
  } = useThemeStore();

  const currentTheme = previewTheme || activeTheme;

  const tabs = [
    { id: "presets", label: "Presets", icon: Settings },
    { id: "colors", label: "Colors", icon: Palette },
    { id: "typography", label: "Typography", icon: Type },
    { id: "layout", label: "Layout", icon: Layout },
    { id: "components", label: "Components", icon: Component },
  ] as const;

  const handleExport = useCallback(async () => {
    if (currentTheme) {
      await exportTheme(currentTheme.id);
    }
  }, [currentTheme, exportTheme]);

  const handleImport = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        await importTheme(file);
      }
    },
    [importTheme]
  );

  const handleReset = useCallback(() => {
    if (
      currentTheme &&
      window.confirm("Are you sure you want to reset to default theme?")
    ) {
      resetTheme(currentTheme.id);
    }
  }, [currentTheme, resetTheme]);

  if (!currentTheme) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Theme Editor
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Customize your application&apos;s appearance
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={undoThemeChange}
              disabled={!canUndo || isLoading}
              className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Undo"
            >
              <Undo size={16} />
            </button>

            <button
              onClick={redoThemeChange}
              disabled={!canRedo || isLoading}
              className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Redo"
            >
              <Redo size={16} />
            </button>

            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700"></div>

            <button
              onClick={handleReset}
              disabled={isLoading}
              className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Reset to Default"
            >
              <RotateCcw size={16} />
            </button>

            <button
              onClick={handleExport}
              disabled={isLoading}
              className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Export Theme"
            >
              <Download size={16} />
            </button>

            <label
              className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              title="Import Theme"
            >
              <Upload size={16} />
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Current Theme Info */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-slate-900 dark:text-slate-100">
                {currentTheme.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {currentTheme.description}
              </p>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              v{currentTheme.version}
            </span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-slate-200 dark:border-slate-700">
        <nav className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50"
                    : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "presets" && <PresetManager />}
        {activeTab === "colors" && <ColorCustomizer theme={currentTheme} />}
        {activeTab === "typography" && (
          <TypographyCustomizer theme={currentTheme} />
        )}
        {activeTab === "layout" && <LayoutCustomizer theme={currentTheme} />}
        {activeTab === "components" && (
          <ComponentCustomizer theme={currentTheme} />
        )}
      </div>
    </div>
  );
}
