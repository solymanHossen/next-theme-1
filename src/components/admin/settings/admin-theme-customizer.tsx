"use client";

import React, { useState } from "react";
import { useThemeStore } from "@/store/theme-store";
import { ColorCustomizer } from "@/components/customizers/color-customizer";
import { TypographyCustomizer } from "@/components/customizers/typography-customizer";
import { LayoutCustomizer } from "@/components/customizers/layout-customizer";
import { ComponentCustomizer } from "@/components/customizers/component-customizer";
import { PresetManager } from "@/components/customizers/preset-manager";
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
  Save,
  Eye,
  Monitor,
  Tablet,
  Smartphone,
} from "lucide-react";

type CustomizerTab =
  | "presets"
  | "colors"
  | "typography"
  | "layout"
  | "components";
type ViewportSize = "desktop" | "tablet" | "mobile";

export function AdminThemeCustomizer() {
  const [activeTab, setActiveTab] = useState<CustomizerTab>("presets");
  const [viewport, setViewport] = useState<ViewportSize>("desktop");
  const [showPreview, setShowPreview] = useState(true);
  const {
    activeTheme,
    previewTheme,
    undoThemeChange,
    redoThemeChange,
    canUndo,
    canRedo,
    isLoading,
    setActiveTheme,
  } = useThemeStore();

  const currentTheme = previewTheme || activeTheme;

  const tabs = [
    { id: "presets", label: "Presets", icon: Settings },
    { id: "colors", label: "Colors", icon: Palette },
    { id: "typography", label: "Typography", icon: Type },
    { id: "layout", label: "Layout", icon: Layout },
    { id: "components", label: "Components", icon: Component },
  ] as const;

  const viewportSizes = {
    desktop: {
      width: "100%",
      height: "500px",
      icon: Monitor,
      label: "Desktop",
    },
    tablet: { width: "768px", height: "500px", icon: Tablet, label: "Tablet" },
    mobile: {
      width: "375px",
      height: "500px",
      icon: Smartphone,
      label: "Mobile",
    },
  };

  const handleSaveTheme = async () => {
    if (previewTheme && activeTheme) {
      setActiveTheme(previewTheme.id);
    }
    // You can add additional save logic here (e.g., API call)
  };

  const handleExportTheme = async () => {
    if (activeTheme) {
      try {
        const { exportTheme } = useThemeStore.getState();
        const themeData = await exportTheme(activeTheme.id);
        const blob = new Blob([JSON.stringify(themeData, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `theme-${activeTheme.name}-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Failed to export theme:", error);
      }
    }
  };

  const handleImportTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const themeData = JSON.parse(e.target?.result as string);
          const { importTheme } = useThemeStore.getState();
          await importTheme(themeData);
        } catch (error) {
          console.error("Failed to import theme:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleResetTheme = async () => {
    if (activeTheme) {
      const { resetTheme } = useThemeStore.getState();
      await resetTheme(activeTheme.id);
    }
  };

  const renderTabContent = () => {
    if (!currentTheme) return null;

    switch (activeTab) {
      case "presets":
        return <PresetManager />;
      case "colors":
        return <ColorCustomizer theme={currentTheme} />;
      case "typography":
        return <TypographyCustomizer theme={currentTheme} />;
      case "layout":
        return <LayoutCustomizer theme={currentTheme} />;
      case "components":
        return <ComponentCustomizer theme={currentTheme} />;
      default:
        return <PresetManager />;
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Theme Customizer Panel */}
      <div className="xl:col-span-1 space-y-6">
        {/* Header with Actions */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Theme Customizer
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Customize your admin panel appearance
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={undoThemeChange}
              disabled={!canUndo || isLoading}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Undo"
            >
              <Undo className="h-4 w-4" />
            </button>
            <button
              onClick={redoThemeChange}
              disabled={!canRedo || isLoading}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Redo"
            >
              <Redo className="h-4 w-4" />
            </button>
            <button
              onClick={handleResetTheme}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Reset to Default"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={handleExportTheme}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Export Theme"
            >
              <Download className="h-4 w-4" />
            </button>
            <label className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 cursor-pointer transition-colors">
              <Upload className="h-4 w-4" />
              <input
                type="file"
                accept=".json"
                onChange={handleImportTheme}
                className="hidden"
              />
            </label>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveTheme}
            disabled={isLoading || !previewTheme}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-lg transition-colors"
          >
            <Save className="h-4 w-4" />
            {isLoading ? "Saving..." : "Save Theme"}
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="border-b border-slate-200 dark:border-slate-700">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                        : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">{renderTabContent()}</div>
        </div>
      </div>

      {/* Live Preview Panel */}
      {showPreview && (
        <div className="xl:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            {/* Preview Header */}
            <div className="border-b border-slate-200 dark:border-slate-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Live Preview
                  </h3>
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
                    {Object.entries(viewportSizes).map(([size, config]) => {
                      const Icon = config.icon;
                      return (
                        <button
                          key={size}
                          onClick={() => setViewport(size as ViewportSize)}
                          className={`p-2 rounded-md transition-colors ${
                            viewport === size
                              ? "bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm"
                              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                          }`}
                          title={config.label}
                        >
                          <Icon className="h-4 w-4" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  Hide Preview
                </button>
              </div>
            </div>

            {/* Preview Content */}
            <div className="p-6 bg-slate-50 dark:bg-slate-900">
              <div
                className="mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
                style={{
                  width: viewportSizes[viewport].width,
                  height: viewportSizes[viewport].height,
                  maxWidth: "100%",
                }}
              >
                {/* Mock Admin Interface Preview */}
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="border-b border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                        <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                          Admin Panel
                        </h1>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 space-y-4">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {["Revenue", "Orders", "Users"].map((stat, index) => (
                        <div
                          key={stat}
                          className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4"
                        >
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            {stat}
                          </div>
                          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                            {index === 0
                              ? "$12,345"
                              : index === 1
                              ? "567"
                              : "890"}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chart Placeholder */}
                    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                        Sales Chart
                      </h3>
                      <div className="h-32 bg-slate-100 dark:bg-slate-700 rounded flex items-center justify-center">
                        <span className="text-slate-500 dark:text-slate-400 text-sm">
                          Chart Preview
                        </span>
                      </div>
                    </div>

                    {/* Table Placeholder */}
                    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                        Recent Orders
                      </h3>
                      <div className="space-y-2">
                        {[1, 2, 3].map((row) => (
                          <div
                            key={row}
                            className="flex items-center gap-4 p-2 bg-slate-50 dark:bg-slate-700 rounded"
                          >
                            <div className="w-8 h-8 bg-slate-200 dark:bg-slate-600 rounded"></div>
                            <div className="flex-1">
                              <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-1/3"></div>
                            </div>
                            <div className="w-16 h-4 bg-slate-200 dark:bg-slate-600 rounded"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Preview Button for collapsed state */}
      {!showPreview && (
        <div className="xl:col-span-2 flex items-center justify-center">
          <button
            onClick={() => setShowPreview(true)}
            className="inline-flex items-center gap-2 px-6 py-4 text-lg font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <Eye className="h-5 w-5" />
            Show Live Preview
          </button>
        </div>
      )}
    </div>
  );
}
