"use client";

import React, { useCallback } from "react";
import { useThemeStore } from "@/store/theme-store";
import { ThemeConfig } from "@/types/saas-theme";
import {
  Layout,
  Maximize,
  Square,
  CornerUpLeft,
  Grid,
  Layers,
} from "lucide-react";

interface LayoutCustomizerProps {
  theme: ThemeConfig;
}

export function LayoutCustomizer({ theme }: LayoutCustomizerProps) {
  const { updateTheme, addToHistory } = useThemeStore();

  const handleLayoutTypeChange = useCallback(
    async (type: "boxed" | "full-width" | "fluid") => {
      const updatedTheme = {
        ...theme,
        layout: {
          ...theme.layout,
          type,
          maxWidth:
            type === "boxed"
              ? "1200px"
              : type === "full-width"
              ? "100%"
              : "1400px",
        },
      };

      addToHistory(updatedTheme);
      await updateTheme(theme.id, updatedTheme);
    },
    [theme, updateTheme, addToHistory]
  );

  const handleMaxWidthChange = useCallback(
    async (maxWidth: string) => {
      const updatedTheme = {
        ...theme,
        layout: {
          ...theme.layout,
          maxWidth,
        },
      };

      addToHistory(updatedTheme);
      await updateTheme(theme.id, updatedTheme);
    },
    [theme, updateTheme, addToHistory]
  );

  const handlePaddingChange = useCallback(
    async (device: "mobile" | "tablet" | "desktop", value: string) => {
      const updatedTheme = {
        ...theme,
        layout: {
          ...theme.layout,
          padding: {
            ...theme.layout.padding,
            [device]: value,
          },
        },
      };

      addToHistory(updatedTheme);
      await updateTheme(theme.id, updatedTheme);
    },
    [theme, updateTheme, addToHistory]
  );

  const handleGapChange = useCallback(
    async (size: string, value: string) => {
      const updatedTheme = {
        ...theme,
        layout: {
          ...theme.layout,
          gaps: {
            ...theme.layout.gaps,
            [size]: value,
          },
        },
      };

      addToHistory(updatedTheme);
      await updateTheme(theme.id, updatedTheme);
    },
    [theme, updateTheme, addToHistory]
  );

  const handleBorderRadiusChange = useCallback(
    async (size: string, value: string) => {
      const updatedTheme = {
        ...theme,
        layout: {
          ...theme.layout,
          borderRadius: {
            ...theme.layout.borderRadius,
            [size]: value,
          },
        },
      };

      addToHistory(updatedTheme);
      await updateTheme(theme.id, updatedTheme);
    },
    [theme, updateTheme, addToHistory]
  );

  const layoutTypes = [
    {
      id: "boxed",
      label: "Boxed",
      description: "Content contained within max-width",
      icon: Square,
      maxWidth: "1200px",
    },
    {
      id: "full-width",
      label: "Full Width",
      description: "Content spans entire viewport",
      icon: Maximize,
      maxWidth: "100%",
    },
    {
      id: "fluid",
      label: "Fluid",
      description: "Responsive width with constraints",
      icon: Layout,
      maxWidth: "1400px",
    },
  ] as const;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Layout Settings
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Configure container widths, spacing, and layout structure
        </p>
      </div>

      {/* Layout Type */}
      <div className="space-y-4">
        <h4 className="font-medium text-slate-900 dark:text-slate-100">
          Layout Type
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {layoutTypes.map((layoutType) => {
            const Icon = layoutType.icon;
            return (
              <button
                key={layoutType.id}
                onClick={() => handleLayoutTypeChange(layoutType.id)}
                className={`p-4 rounded-lg border text-left transition-colors ${
                  theme.layout.type === layoutType.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950/50"
                    : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon
                    size={20}
                    className="text-slate-600 dark:text-slate-400"
                  />
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {layoutType.label}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {layoutType.description}
                </p>
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  Max width: {layoutType.maxWidth}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Max Width */}
      <div className="space-y-4">
        <h4 className="font-medium text-slate-900 dark:text-slate-100">
          Container Max Width
        </h4>

        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={theme.layout.maxWidth}
              onChange={(e) => handleMaxWidthChange(e.target.value)}
              className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              placeholder="e.g., 1200px, 100%, 80rem"
            />
          </div>

          {/* Quick Options */}
          <div className="flex flex-wrap gap-2">
            {["1200px", "1400px", "1600px", "100%", "90vw"].map((width) => (
              <button
                key={width}
                onClick={() => handleMaxWidthChange(width)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  theme.layout.maxWidth === width
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {width}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive Padding */}
      <div className="space-y-4">
        <h4 className="font-medium text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers size={16} />
          Responsive Padding
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(theme.layout.padding).map(([device, value]) => (
            <div key={device} className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 capitalize">
                {device}
              </label>
              <input
                type="text"
                value={value}
                onChange={(e) =>
                  handlePaddingChange(
                    device as "mobile" | "tablet" | "desktop",
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                placeholder="e.g., 1rem, 24px"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Spacing Scale */}
      <div className="space-y-4">
        <h4 className="font-medium text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Grid size={16} />
          Spacing Scale
        </h4>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(theme.layout.gaps).map(([size, value]) => (
            <div key={size} className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 uppercase">
                {size}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleGapChange(size, e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
                <div
                  className="w-6 h-6 bg-blue-500 rounded"
                  style={{
                    width: value,
                    height: value,
                    minWidth: "8px",
                    minHeight: "8px",
                  }}
                  title={`Preview: ${value}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Border Radius Scale */}
      <div className="space-y-4">
        <h4 className="font-medium text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <CornerUpLeft size={16} />
          Border Radius Scale
        </h4>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(theme.layout.borderRadius).map(([size, value]) => (
            <div key={size} className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 capitalize">
                {size}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    handleBorderRadiusChange(size, e.target.value)
                  }
                  className="flex-1 px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
                <div
                  className="w-6 h-6 bg-slate-300 dark:bg-slate-600"
                  style={{ borderRadius: value === "9999px" ? "50%" : value }}
                  title={`Preview: ${value}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Layout Preview */}
      <div className="space-y-4">
        <h4 className="font-medium text-slate-900 dark:text-slate-100">
          Layout Preview
        </h4>

        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg relative overflow-hidden">
            <div
              className="mx-auto bg-white dark:bg-slate-900 min-h-32"
              style={{
                maxWidth: theme.layout.maxWidth,
                padding: theme.layout.padding.desktop,
              }}
            >
              <div className="p-4 space-y-3">
                <div
                  className="bg-slate-200 dark:bg-slate-700 h-4 rounded"
                  style={{ borderRadius: theme.layout.borderRadius.md }}
                />
                <div
                  className="bg-slate-200 dark:bg-slate-700 h-4 w-3/4 rounded"
                  style={{ borderRadius: theme.layout.borderRadius.md }}
                />
                <div
                  className="bg-slate-200 dark:bg-slate-700 h-4 w-1/2 rounded"
                  style={{ borderRadius: theme.layout.borderRadius.md }}
                />
              </div>
            </div>
          </div>

          <div className="mt-3 text-xs text-slate-600 dark:text-slate-400 text-center">
            {theme.layout.type === "boxed" &&
              "Content is centered with max-width constraint"}
            {theme.layout.type === "full-width" &&
              "Content spans the full viewport width"}
            {theme.layout.type === "fluid" &&
              "Content adapts fluidly within constraints"}
          </div>
        </div>
      </div>
    </div>
  );
}
