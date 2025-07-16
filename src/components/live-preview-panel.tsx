"use client";

import React, { useState } from "react";
import { useThemeStore } from "@/store/theme-store";
import { ThemeConfig } from "@/types/saas-theme";
import {
  Monitor,
  Tablet,
  Smartphone,
  Eye,
  EyeOff,
  ExternalLink,
  Code,
} from "lucide-react";

type ViewportSize = "desktop" | "tablet" | "mobile";
type PreviewMode = "admin" | "customer" | "split";

export function LivePreviewPanel() {
  const { activeTheme, previewTheme, isPreviewMode, togglePreviewMode } =
    useThemeStore();
  const [viewport, setViewport] = useState<ViewportSize>("desktop");
  const [previewMode, setPreviewMode] = useState<PreviewMode>("split");
  const [showCode, setShowCode] = useState(false);

  const currentTheme = previewTheme || activeTheme;

  const viewportSizes = {
    desktop: { width: "100%", height: "600px", icon: Monitor },
    tablet: { width: "768px", height: "600px", icon: Tablet },
    mobile: { width: "375px", height: "600px", icon: Smartphone },
  };

  if (!currentTheme) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Live Preview
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              See your changes in real-time across different devices
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Preview Mode Toggle */}
            <button
              onClick={togglePreviewMode}
              className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                isPreviewMode
                  ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              }`}
            >
              {isPreviewMode ? <Eye size={16} /> : <EyeOff size={16} />}
              {isPreviewMode ? "Preview On" : "Preview Off"}
            </button>

            {/* Code Toggle */}
            <button
              onClick={() => setShowCode(!showCode)}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Code size={16} />
              {showCode ? "Hide Code" : "Show Code"}
            </button>

            <button className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <ExternalLink size={16} />
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          {/* Viewport Selector */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            {(
              Object.entries(viewportSizes) as [
                ViewportSize,
                typeof viewportSizes.desktop
              ][]
            ).map(([size, config]) => {
              const Icon = config.icon;
              return (
                <button
                  key={size}
                  onClick={() => setViewport(size)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                    viewport === size
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                  }`}
                >
                  <Icon size={16} />
                  <span className="capitalize">{size}</span>
                </button>
              );
            })}
          </div>

          {/* Preview Mode Selector */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            {(
              [
                { id: "admin", label: "Admin View" },
                { id: "customer", label: "Customer View" },
                { id: "split", label: "Split View" },
              ] as const
            ).map((mode) => (
              <button
                key={mode.id}
                onClick={() => setPreviewMode(mode.id)}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  previewMode === mode.id
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="p-4">
        {showCode ? (
          <CodePreview theme={currentTheme} />
        ) : (
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 min-h-[600px]">
            <div
              className="mx-auto bg-white dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden transition-all duration-300"
              style={{
                width: viewportSizes[viewport].width,
                height: viewportSizes[viewport].height,
                maxWidth: "100%",
              }}
            >
              {previewMode === "split" ? (
                <div className="grid grid-cols-2 h-full">
                  <AdminPreview theme={currentTheme} />
                  <CustomerPreview theme={currentTheme} />
                </div>
              ) : previewMode === "admin" ? (
                <AdminPreview theme={currentTheme} />
              ) : (
                <CustomerPreview theme={currentTheme} />
              )}
            </div>

            {/* Viewport Info */}
            <div className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
              {viewport === "desktop" && "Desktop View (Full Width)"}
              {viewport === "tablet" && "Tablet View (768px)"}
              {viewport === "mobile" && "Mobile View (375px)"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminPreview({ theme }: { theme: ThemeConfig }) {
  return (
    <div
      className="h-full p-4 overflow-y-auto border-r border-slate-200 dark:border-slate-700"
      style={{
        backgroundColor: `rgb(${theme.colorPalette.neutral[50]
          .replace("#", "")
          .match(/.{2}/g)
          ?.map((hex: string) => parseInt(hex, 16))
          .join(", ")})`,
        fontFamily: theme.typography.family,
      }}
    >
      <div className="space-y-4">
        {/* Header */}
        <div
          className="p-4 rounded-lg"
          style={{
            backgroundColor: theme.colorPalette.primary[500],
            borderRadius: theme.layout.borderRadius.lg,
          }}
        >
          <h2
            className="text-white font-semibold"
            style={{ fontSize: theme.typography.sizes.xl }}
          >
            Admin Dashboard
          </h2>
          <p
            className="text-white/80"
            style={{ fontSize: theme.typography.sizes.sm }}
          >
            Theme customization panel
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-3">
          {["Users", "Orders", "Products", "Revenue"].map((item) => (
            <div
              key={item}
              className="bg-white dark:bg-slate-800 p-3 rounded shadow-sm border"
              style={{
                padding: theme.cards.padding,
                borderRadius: theme.cards.borderRadius,
                boxShadow: theme.cards.shadow,
                border: theme.cards.border,
              }}
            >
              <h3
                className="font-medium text-slate-900 dark:text-slate-100"
                style={{ fontSize: theme.typography.sizes.sm }}
              >
                {item}
              </h3>
              <p
                className="text-2xl font-bold mt-1"
                style={{ color: theme.colorPalette.primary[600] }}
              >
                {Math.floor(Math.random() * 1000)}
              </p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <button
            className="w-full text-white font-medium transition-colors"
            style={{
              backgroundColor: theme.colorPalette.primary[500],
              padding: theme.buttons.sizes.md.padding,
              fontSize: theme.buttons.sizes.md.fontSize,
              borderRadius: theme.buttons.borderRadius,
            }}
          >
            Save Changes
          </button>
          <button
            className="w-full text-slate-700 dark:text-slate-300 font-medium border transition-colors"
            style={{
              borderColor: theme.colorPalette.neutral[300],
              padding: theme.buttons.sizes.md.padding,
              fontSize: theme.buttons.sizes.md.fontSize,
              borderRadius: theme.buttons.borderRadius,
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function CustomerPreview({ theme }: { theme: ThemeConfig }) {
  return (
    <div
      className="h-full p-4 overflow-y-auto"
      style={{
        backgroundColor: `rgb(${theme.colorPalette.neutral[50]
          .replace("#", "")
          .match(/.{2}/g)
          ?.map((hex: string) => parseInt(hex, 16))
          .join(", ")})`,
        fontFamily: theme.typography.family,
      }}
    >
      <div className="space-y-4">
        {/* Hero Section */}
        <div
          className="p-6 rounded-lg text-center"
          style={{
            background: `linear-gradient(135deg, ${theme.colorPalette.primary[500]} 0%, ${theme.colorPalette.secondary[500]} 100%)`,
            borderRadius: theme.layout.borderRadius.xl,
          }}
        >
          <h1
            className="text-white font-bold mb-2"
            style={{ fontSize: theme.typography.sizes["2xl"] }}
          >
            Welcome to Our Store
          </h1>
          <p
            className="text-white/90"
            style={{ fontSize: theme.typography.sizes.base }}
          >
            Discover amazing products
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-2 gap-3">
          {["Product A", "Product B", "Product C", "Product D"].map(
            (product) => (
              <div
                key={product}
                className="bg-white dark:bg-slate-800 rounded shadow-sm border overflow-hidden hover:shadow-lg transition-shadow"
                style={{
                  borderRadius: theme.cards.borderRadius,
                  boxShadow: theme.cards.shadow,
                  border: theme.cards.border,
                }}
              >
                <div
                  className="h-20"
                  style={{ backgroundColor: theme.colorPalette.accent[200] }}
                />
                <div style={{ padding: theme.cards.padding }}>
                  <h3
                    className="font-medium text-slate-900 dark:text-slate-100"
                    style={{ fontSize: theme.typography.sizes.sm }}
                  >
                    {product}
                  </h3>
                  <p
                    style={{
                      color: theme.colorPalette.primary[600],
                      fontSize: theme.typography.sizes.lg,
                      fontWeight: "bold",
                    }}
                  >
                    ${Math.floor(Math.random() * 100) + 10}
                  </p>
                </div>
              </div>
            )
          )}
        </div>

        {/* CTA Button */}
        <button
          className="w-full text-white font-medium transition-all hover:opacity-90"
          style={{
            backgroundColor: theme.colorPalette.accent[500],
            padding: theme.buttons.sizes.lg.padding,
            fontSize: theme.buttons.sizes.lg.fontSize,
            borderRadius: theme.buttons.borderRadius,
          }}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}

function CodePreview({ theme }: { theme: ThemeConfig }) {
  const cssCode = `/* Generated Theme CSS Variables */
:root {
  /* Primary Colors */
  --primary-50: ${theme.colorPalette.primary[50]};
  --primary-500: ${theme.colorPalette.primary[500]};
  --primary-600: ${theme.colorPalette.primary[600]};

  /* Typography */
  --font-family: ${theme.typography.family};
  --font-size-base: ${theme.typography.sizes.base};
  --font-size-xl: ${theme.typography.sizes.xl};

  /* Layout */
  --max-width: ${theme.layout.maxWidth};
  --border-radius-lg: ${theme.layout.borderRadius.lg};
  --spacing-md: ${theme.layout.gaps.md};

  /* Components */
  --button-padding-md: ${theme.buttons.sizes.md.padding};
  --button-radius: ${theme.buttons.borderRadius};
  --card-padding: ${theme.cards.padding};
  --card-radius: ${theme.cards.borderRadius};
  --card-shadow: ${theme.cards.shadow};
}`;

  return (
    <div
      className="bg-slate-900 rounded-lg p-4 overflow-auto"
      style={{ minHeight: "600px" }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-white font-medium">Generated CSS Variables</h4>
        <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors">
          Copy Code
        </button>
      </div>
      <pre className="text-green-400 text-sm overflow-x-auto">
        <code>{cssCode}</code>
      </pre>
    </div>
  );
}
