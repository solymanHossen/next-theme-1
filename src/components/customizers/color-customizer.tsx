"use client";

import React, { useState, useCallback } from "react";
import { useThemeStore } from "@/store/theme-store";
import { ThemeConfig, ColorShade } from "@/types/saas-theme";
import {
  Palette,
  Eye,
  EyeOff,
  Copy,
  Check,
  RefreshCw,
  Sun,
  Moon,
} from "lucide-react";

interface ColorCustomizerProps {
  theme: ThemeConfig;
}

export function ColorCustomizer({ theme }: ColorCustomizerProps) {
  const { updateTheme, addToHistory } = useThemeStore();
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [showColorCodes, setShowColorCodes] = useState(false);

  const colorCategories = [
    { key: "primary", label: "Primary", description: "Main brand color" },
    { key: "secondary", label: "Secondary", description: "Supporting color" },
    { key: "accent", label: "Accent", description: "Highlight color" },
    { key: "neutral", label: "Neutral", description: "Text and backgrounds" },
    { key: "success", label: "Success", description: "Positive actions" },
    { key: "warning", label: "Warning", description: "Cautionary states" },
    { key: "error", label: "Error", description: "Error states" },
    { key: "info", label: "Info", description: "Informational content" },
  ] as const;

  const handleColorChange = useCallback(
    async (
      category: keyof typeof theme.colorPalette,
      shade: keyof ColorShade,
      color: string
    ) => {
      if (category === "id" || category === "name") return;

      const updatedTheme = {
        ...theme,
        colorPalette: {
          ...theme.colorPalette,
          [category]: {
            ...theme.colorPalette[category],
            [shade]: color,
          },
        },
      };

      addToHistory(updatedTheme);
      await updateTheme(theme.id, updatedTheme);
    },
    [theme, updateTheme, addToHistory]
  );

  const handleCopyColor = useCallback((color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  }, []);

  const generateColorShades = useCallback((baseColor: string): ColorShade => {
    // Convert hex to RGB
    const hex = baseColor.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Generate lighter and darker shades
    const lighten = (amount: number) => {
      const newR = Math.min(255, Math.round(r + (255 - r) * amount));
      const newG = Math.min(255, Math.round(g + (255 - g) * amount));
      const newB = Math.min(255, Math.round(b + (255 - b) * amount));
      return `#${newR.toString(16).padStart(2, "0")}${newG
        .toString(16)
        .padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
    };

    const darken = (amount: number) => {
      const newR = Math.max(0, Math.round(r * (1 - amount)));
      const newG = Math.max(0, Math.round(g * (1 - amount)));
      const newB = Math.max(0, Math.round(b * (1 - amount)));
      return `#${newR.toString(16).padStart(2, "0")}${newG
        .toString(16)
        .padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
    };

    return {
      50: lighten(0.95),
      100: lighten(0.9),
      200: lighten(0.75),
      300: lighten(0.6),
      400: lighten(0.3),
      500: baseColor,
      600: darken(0.1),
      700: darken(0.2),
      800: darken(0.3),
      900: darken(0.4),
      950: darken(0.5),
    };
  }, []);

  const handleBaseColorChange = useCallback(
    async (category: keyof typeof theme.colorPalette, color: string) => {
      if (category === "id" || category === "name") return;

      const newShades = generateColorShades(color);
      const updatedTheme = {
        ...theme,
        colorPalette: {
          ...theme.colorPalette,
          [category]: newShades,
        },
      };

      addToHistory(updatedTheme);
      await updateTheme(theme.id, updatedTheme);
    },
    [theme, updateTheme, addToHistory, generateColorShades]
  );

  return (
    <div className="space-y-8">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Color Palette
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Customize your brand colors and see changes in real-time
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowColorCodes(!showColorCodes)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            {showColorCodes ? <EyeOff size={16} /> : <Eye size={16} />}
            {showColorCodes ? "Hide Codes" : "Show Codes"}
          </button>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            <button className="p-2 text-yellow-600 bg-white dark:bg-slate-700 rounded-md shadow-sm">
              <Sun size={16} />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <Moon size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Color Categories */}
      <div className="space-y-8">
        {colorCategories.map((category) => {
          const colors = theme.colorPalette[category.key] as ColorShade;

          return (
            <div key={category.key} className="space-y-4">
              {/* Category Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-slate-100">
                    {category.label}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {category.description}
                  </p>
                </div>

                {/* Base Color Picker */}
                <div className="flex items-center gap-3">
                  <label className="text-sm text-slate-600 dark:text-slate-400">
                    Base Color:
                  </label>
                  <div className="relative">
                    <input
                      type="color"
                      value={colors[500]}
                      onChange={(e) =>
                        handleBaseColorChange(category.key, e.target.value)
                      }
                      className="w-10 h-10 rounded-lg border border-slate-300 dark:border-slate-600 cursor-pointer"
                    />
                    <button
                      onClick={() => {
                        const newColor = `#${Math.floor(
                          Math.random() * 16777215
                        )
                          .toString(16)
                          .padStart(6, "0")}`;
                        handleBaseColorChange(category.key, newColor);
                      }}
                      className="absolute -right-10 top-1/2 transform -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      title="Generate Random Color"
                    >
                      <RefreshCw size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Color Shades */}
              <div className="grid grid-cols-11 gap-2">
                {Object.entries(colors).map(([shade, color]) => (
                  <div key={shade} className="group">
                    <div
                      className="relative h-16 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden cursor-pointer transition-transform hover:scale-105"
                      style={{ backgroundColor: color }}
                      onClick={() => handleCopyColor(color)}
                    >
                      {/* Copy Feedback */}
                      {copiedColor === color && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <Check className="text-white" size={16} />
                        </div>
                      )}

                      {/* Copy Icon on Hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                        <Copy className="text-white" size={14} />
                      </div>
                    </div>

                    {/* Shade Label */}
                    <div className="mt-2 text-center">
                      <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
                        {shade}
                      </div>
                      {showColorCodes && (
                        <div className="text-xs text-slate-500 dark:text-slate-500 mt-1 font-mono">
                          {color}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    const newColor = `#${Math.floor(Math.random() * 16777215)
                      .toString(16)
                      .padStart(6, "0")}`;
                    handleBaseColorChange(category.key, newColor);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
                >
                  <RefreshCw size={12} />
                  Randomize
                </button>

                <button
                  onClick={() => handleCopyColor(colors[500])}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
                >
                  <Copy size={12} />
                  Copy Base
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Color Harmony Suggestions */}
      <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
        <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
          <Palette size={16} />
          Color Harmony Tips
        </h4>
        <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
          <li>• Use high contrast between text and background colors</li>
          <li>• Limit your palette to 3-5 main colors for consistency</li>
          <li>• Test your colors in both light and dark modes</li>
          <li>• Consider accessibility guidelines (WCAG AA compliance)</li>
        </ul>
      </div>
    </div>
  );
}
