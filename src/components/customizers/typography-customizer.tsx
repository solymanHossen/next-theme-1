"use client";

import React, { useState, useCallback } from "react";
import { useThemeStore } from "@/store/theme-store";
import { ThemeConfig } from "@/types/saas-theme";
import {
  Type,
  Bold,
  Italic,
  AlignLeft,
  MoreHorizontal,
  Download,
  Eye,
} from "lucide-react";

interface TypographyCustomizerProps {
  theme: ThemeConfig;
}

// Google Fonts options (most popular ones)
const GOOGLE_FONTS = [
  { name: "Inter", category: "Sans Serif", popularity: "Very High" },
  { name: "Roboto", category: "Sans Serif", popularity: "Very High" },
  { name: "Open Sans", category: "Sans Serif", popularity: "Very High" },
  { name: "Lato", category: "Sans Serif", popularity: "High" },
  { name: "Montserrat", category: "Sans Serif", popularity: "High" },
  { name: "Source Sans Pro", category: "Sans Serif", popularity: "High" },
  { name: "Nunito", category: "Sans Serif", popularity: "High" },
  { name: "Poppins", category: "Sans Serif", popularity: "High" },
  { name: "Playfair Display", category: "Serif", popularity: "Medium" },
  { name: "Merriweather", category: "Serif", popularity: "Medium" },
  { name: "Crimson Text", category: "Serif", popularity: "Medium" },
  { name: "Lora", category: "Serif", popularity: "Medium" },
  { name: "Fira Code", category: "Monospace", popularity: "Medium" },
  { name: "Source Code Pro", category: "Monospace", popularity: "Medium" },
  { name: "JetBrains Mono", category: "Monospace", popularity: "Medium" },
  { name: "Orbitron", category: "Display", popularity: "Low" },
];

export function TypographyCustomizer({ theme }: TypographyCustomizerProps) {
  const { updateTheme, addToHistory } = useThemeStore();
  const [selectedFont, setSelectedFont] = useState(
    theme.typography.family.split(",")[0]
  );
  const [fontCategory, setFontCategory] = useState<string>("all");

  const filteredFonts =
    fontCategory === "all"
      ? GOOGLE_FONTS
      : GOOGLE_FONTS.filter(
          (font) => font.category.toLowerCase() === fontCategory
        );

  const handleFontChange = useCallback(
    async (fontFamily: string) => {
      const fullFontFamily = `${fontFamily}, system-ui, sans-serif`;

      const updatedTheme = {
        ...theme,
        typography: {
          ...theme.typography,
          family: fullFontFamily,
        },
      };

      setSelectedFont(fontFamily);
      addToHistory(updatedTheme);
      await updateTheme(theme.id, updatedTheme);

      // Dynamically load Google Font
      if (
        !document.querySelector(
          `link[href*="${fontFamily.replace(/\s+/g, "+")}"]`
        )
      ) {
        const link = document.createElement("link");
        link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
          /\s+/g,
          "+"
        )}:wght@300;400;500;600;700;800&display=swap`;
        link.rel = "stylesheet";
        document.head.appendChild(link);
      }
    },
    [theme, updateTheme, addToHistory]
  );

  const handleSizeChange = useCallback(
    async (sizeKey: string, value: string) => {
      const updatedTheme = {
        ...theme,
        typography: {
          ...theme.typography,
          sizes: {
            ...theme.typography.sizes,
            [sizeKey]: value,
          },
        },
      };

      addToHistory(updatedTheme);
      await updateTheme(theme.id, updatedTheme);
    },
    [theme, updateTheme, addToHistory]
  );

  const handleLineHeightChange = useCallback(
    async (key: string, value: string) => {
      const updatedTheme = {
        ...theme,
        typography: {
          ...theme.typography,
          lineHeights: {
            ...theme.typography.lineHeights,
            [key]: value,
          },
        },
      };

      addToHistory(updatedTheme);
      await updateTheme(theme.id, updatedTheme);
    },
    [theme, updateTheme, addToHistory]
  );

  const handleLetterSpacingChange = useCallback(
    async (key: string, value: string) => {
      const updatedTheme = {
        ...theme,
        typography: {
          ...theme.typography,
          letterSpacing: {
            ...theme.typography.letterSpacing,
            [key]: value,
          },
        },
      };

      addToHistory(updatedTheme);
      await updateTheme(theme.id, updatedTheme);
    },
    [theme, updateTheme, addToHistory]
  );

  const handleWeightChange = useCallback(
    async (weights: number[]) => {
      const updatedTheme = {
        ...theme,
        typography: {
          ...theme.typography,
          weights,
        },
      };

      addToHistory(updatedTheme);
      await updateTheme(theme.id, updatedTheme);
    },
    [theme, updateTheme, addToHistory]
  );

  const toggleWeight = (weight: number) => {
    const currentWeights = theme.typography.weights;
    const newWeights = currentWeights.includes(weight)
      ? currentWeights.filter((w) => w !== weight)
      : [...currentWeights, weight].sort((a, b) => a - b);

    if (newWeights.length > 0) {
      handleWeightChange(newWeights);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Typography Settings
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Configure fonts, sizes, and text styling for your application
        </p>
      </div>

      {/* Font Family Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-slate-900 dark:text-slate-100">
            Font Family
          </h4>

          {/* Font Category Filter */}
          <select
            value={fontCategory}
            onChange={(e) => setFontCategory(e.target.value)}
            className="px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          >
            <option value="all">All Fonts</option>
            <option value="sans serif">Sans Serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
            <option value="display">Display</option>
          </select>
        </div>

        {/* Current Font Display */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Current: {selectedFont}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {GOOGLE_FONTS.find((f) => f.name === selectedFont)?.category}
            </span>
          </div>
          <div
            className="text-2xl text-slate-900 dark:text-slate-100"
            style={{ fontFamily: `${selectedFont}, system-ui, sans-serif` }}
          >
            The quick brown fox jumps over the lazy dog
          </div>
        </div>

        {/* Font Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
          {filteredFonts.map((font) => (
            <button
              key={font.name}
              onClick={() => handleFontChange(font.name)}
              className={`p-3 text-left rounded-lg border transition-colors ${
                selectedFont === font.name
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950/50"
                  : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {font.name}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {font.category}
                </span>
              </div>
              <div
                className="text-sm text-slate-600 dark:text-slate-400"
                style={{ fontFamily: `${font.name}, system-ui, sans-serif` }}
              >
                Sample text preview
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Font Weights */}
      <div className="space-y-4">
        <h4 className="font-medium text-slate-900 dark:text-slate-100">
          Font Weights
        </h4>

        <div className="grid grid-cols-4 gap-2">
          {[300, 400, 500, 600, 700, 800, 900].map((weight) => (
            <button
              key={weight}
              onClick={() => toggleWeight(weight)}
              className={`p-3 rounded-lg border text-center transition-colors ${
                theme.typography.weights.includes(weight)
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300"
                  : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300"
              }`}
            >
              <div className="text-sm font-medium">{weight}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {weight === 300 && "Light"}
                {weight === 400 && "Regular"}
                {weight === 500 && "Medium"}
                {weight === 600 && "SemiBold"}
                {weight === 700 && "Bold"}
                {weight === 800 && "ExtraBold"}
                {weight === 900 && "Black"}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Font Sizes */}
      <div className="space-y-4">
        <h4 className="font-medium text-slate-900 dark:text-slate-100">
          Font Sizes
        </h4>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(theme.typography.sizes).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 capitalize">
                {key} ({value})
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.125"
                  value={parseFloat(value)}
                  onChange={(e) =>
                    handleSizeChange(key, `${e.target.value}rem`)
                  }
                  className="flex-1"
                />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleSizeChange(key, e.target.value)}
                  className="w-16 px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Line Heights */}
      <div className="space-y-4">
        <h4 className="font-medium text-slate-900 dark:text-slate-100">
          Line Heights
        </h4>

        <div className="grid grid-cols-3 gap-4">
          {Object.entries(theme.typography.lineHeights).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 capitalize">
                {key}
              </label>
              <input
                type="text"
                value={value}
                onChange={(e) => handleLineHeightChange(key, e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Letter Spacing */}
      <div className="space-y-4">
        <h4 className="font-medium text-slate-900 dark:text-slate-100">
          Letter Spacing
        </h4>

        <div className="grid grid-cols-3 gap-4">
          {Object.entries(theme.typography.letterSpacing).map(
            ([key, value]) => (
              <div key={key} className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 capitalize">
                  {key}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    handleLetterSpacingChange(key, e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
            )
          )}
        </div>
      </div>

      {/* Typography Preview */}
      <div className="space-y-4">
        <h4 className="font-medium text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Eye size={16} />
          Typography Preview
        </h4>

        <div
          className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg space-y-4"
          style={{ fontFamily: theme.typography.family }}
        >
          <h1
            style={{
              fontSize: theme.typography.sizes["5xl"],
              lineHeight: theme.typography.lineHeights.tight,
            }}
          >
            Heading 1 - Main Title
          </h1>
          <h2
            style={{
              fontSize: theme.typography.sizes["3xl"],
              lineHeight: theme.typography.lineHeights.tight,
            }}
          >
            Heading 2 - Section Title
          </h2>
          <h3
            style={{
              fontSize: theme.typography.sizes.xl,
              lineHeight: theme.typography.lineHeights.normal,
            }}
          >
            Heading 3 - Subsection
          </h3>
          <p
            style={{
              fontSize: theme.typography.sizes.base,
              lineHeight: theme.typography.lineHeights.relaxed,
            }}
          >
            This is a paragraph of body text. It demonstrates how your
            typography choices will look in real content. The quick brown fox
            jumps over the lazy dog. Typography is the art and technique of
            arranging type to make written language legible, readable, and
            appealing when displayed.
          </p>
          <p
            style={{
              fontSize: theme.typography.sizes.sm,
              lineHeight: theme.typography.lineHeights.normal,
            }}
          >
            This is smaller text, often used for captions, footnotes, or
            secondary information.
          </p>
        </div>
      </div>
    </div>
  );
}
