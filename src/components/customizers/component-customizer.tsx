"use client";

import React, { useCallback } from "react";
import { useThemeStore } from "@/store/theme-store";
import { ThemeConfig } from "@/types/saas-theme";
import {
  Square,
  RectangleHorizontal,
  MousePointer,
  Layers,
} from "lucide-react";

interface ComponentCustomizerProps {
  theme: ThemeConfig;
}

export function ComponentCustomizer({ theme }: ComponentCustomizerProps) {
  const { updateTheme, addToHistory } = useThemeStore();

  // Button customization handlers
  const handleButtonSizeChange = useCallback(
    async (
      size: "sm" | "md" | "lg",
      property: "padding" | "fontSize" | "height",
      value: string
    ) => {
      const updatedTheme = {
        ...theme,
        buttons: {
          ...theme.buttons,
          sizes: {
            ...theme.buttons.sizes,
            [size]: {
              ...theme.buttons.sizes[size],
              [property]: value,
            },
          },
        },
      };

      addToHistory(updatedTheme);
      await updateTheme(theme.id, updatedTheme);
    },
    [theme, updateTheme, addToHistory]
  );

  const handleButtonRadiusChange = useCallback(
    async (radius: string) => {
      const updatedTheme = {
        ...theme,
        buttons: {
          ...theme.buttons,
          borderRadius: radius,
        },
      };

      addToHistory(updatedTheme);
      await updateTheme(theme.id, updatedTheme);
    },
    [theme, updateTheme, addToHistory]
  );

  // Input customization handlers
  const handleInputSizeChange = useCallback(
    async (size: "sm" | "md" | "lg", height: string) => {
      const updatedTheme = {
        ...theme,
        inputs: {
          ...theme.inputs,
          sizes: {
            ...theme.inputs.sizes,
            [size]: height,
          },
        },
      };

      addToHistory(updatedTheme);
      await updateTheme(theme.id, updatedTheme);
    },
    [theme, updateTheme, addToHistory]
  );

  const handleInputRadiusChange = useCallback(
    async (radius: string) => {
      const updatedTheme = {
        ...theme,
        inputs: {
          ...theme.inputs,
          borderRadius: radius,
        },
      };

      addToHistory(updatedTheme);
      await updateTheme(theme.id, updatedTheme);
    },
    [theme, updateTheme, addToHistory]
  );

  const handleInputBorderChange = useCallback(
    async (property: "borderWidth" | "focusRing", value: string) => {
      const updatedTheme = {
        ...theme,
        inputs: {
          ...theme.inputs,
          [property]: value,
        },
      };

      addToHistory(updatedTheme);
      await updateTheme(theme.id, updatedTheme);
    },
    [theme, updateTheme, addToHistory]
  );

  // Card customization handlers
  const handleCardChange = useCallback(
    async (property: keyof typeof theme.cards, value: string) => {
      const updatedTheme = {
        ...theme,
        cards: {
          ...theme.cards,
          [property]: value,
        },
      };

      addToHistory(updatedTheme);
      await updateTheme(theme.id, updatedTheme);
    },
    [theme, updateTheme, addToHistory]
  );

  const handleCardHoverChange = useCallback(
    async (property: "shadow" | "transform", value: string) => {
      const updatedTheme = {
        ...theme,
        cards: {
          ...theme.cards,
          hover: {
            ...theme.cards.hover,
            [property]: value,
          },
        },
      };

      addToHistory(updatedTheme);
      await updateTheme(theme.id, updatedTheme);
    },
    [theme, updateTheme, addToHistory]
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Component Styling
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Customize the appearance of buttons, inputs, cards, and other UI
          components
        </p>
      </div>

      {/* Buttons */}
      <div className="space-y-6">
        <h4 className="font-medium text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <MousePointer size={16} />
          Buttons
        </h4>

        {/* Button Sizes */}
        <div className="space-y-4">
          <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Button Sizes
          </h5>

          <div className="space-y-4">
            {(["sm", "md", "lg"] as const).map((size) => (
              <div key={size} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 capitalize">
                    {size} Button
                  </span>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                    style={{
                      padding: theme.buttons.sizes[size].padding,
                      fontSize: theme.buttons.sizes[size].fontSize,
                      height: theme.buttons.sizes[size].height,
                      borderRadius: theme.buttons.borderRadius,
                    }}
                  >
                    Sample {size.toUpperCase()}
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-slate-600 dark:text-slate-400">
                      Padding
                    </label>
                    <input
                      type="text"
                      value={theme.buttons.sizes[size].padding}
                      onChange={(e) =>
                        handleButtonSizeChange(size, "padding", e.target.value)
                      }
                      className="w-full px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-600 dark:text-slate-400">
                      Font Size
                    </label>
                    <input
                      type="text"
                      value={theme.buttons.sizes[size].fontSize}
                      onChange={(e) =>
                        handleButtonSizeChange(size, "fontSize", e.target.value)
                      }
                      className="w-full px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-600 dark:text-slate-400">
                      Height
                    </label>
                    <input
                      type="text"
                      value={theme.buttons.sizes[size].height}
                      onChange={(e) =>
                        handleButtonSizeChange(size, "height", e.target.value)
                      }
                      className="w-full px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Button Border Radius */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Border Radius
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={theme.buttons.borderRadius}
              onChange={(e) => handleButtonRadiusChange(e.target.value)}
              className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
            <div className="flex gap-2">
              {["0", "0.25rem", "0.5rem", "0.75rem", "1rem", "9999px"].map(
                (radius) => (
                  <button
                    key={radius}
                    onClick={() => handleButtonRadiusChange(radius)}
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${
                      theme.buttons.borderRadius === radius
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {radius === "9999px" ? "Full" : radius}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-6">
        <h4 className="font-medium text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <RectangleHorizontal size={16} />
          Form Inputs
        </h4>

        {/* Input Sizes */}
        <div className="space-y-4">
          <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Input Sizes
          </h5>

          <div className="space-y-3">
            {(["sm", "md", "lg"] as const).map((size) => (
              <div key={size} className="flex items-center gap-4">
                <span className="w-16 text-sm font-medium text-slate-700 dark:text-slate-300 capitalize">
                  {size}
                </span>
                <input
                  type="text"
                  placeholder={`${size.toUpperCase()} input`}
                  className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  style={{
                    height: theme.inputs.sizes[size],
                    borderRadius: theme.inputs.borderRadius,
                    borderWidth: theme.inputs.borderWidth,
                  }}
                  readOnly
                />
                <input
                  type="text"
                  value={theme.inputs.sizes[size]}
                  onChange={(e) => handleInputSizeChange(size, e.target.value)}
                  className="w-20 px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Input Properties */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Border Radius
            </label>
            <input
              type="text"
              value={theme.inputs.borderRadius}
              onChange={(e) => handleInputRadiusChange(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Border Width
            </label>
            <input
              type="text"
              value={theme.inputs.borderWidth}
              onChange={(e) =>
                handleInputBorderChange("borderWidth", e.target.value)
              }
              className="w-full px-3 py-2 mt-1 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Focus Ring
            </label>
            <input
              type="text"
              value={theme.inputs.focusRing}
              onChange={(e) =>
                handleInputBorderChange("focusRing", e.target.value)
              }
              className="w-full px-3 py-2 mt-1 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-6">
        <h4 className="font-medium text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Square size={16} />
          Cards
        </h4>

        {/* Card Preview */}
        <div className="space-y-4">
          <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Card Preview
          </h5>

          <div
            className="bg-white dark:bg-slate-800 transition-all duration-200 hover:scale-105 cursor-pointer"
            style={{
              padding: theme.cards.padding,
              borderRadius: theme.cards.borderRadius,
              boxShadow: theme.cards.shadow,
              border: theme.cards.border,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = theme.cards.hover.shadow;
              e.currentTarget.style.transform = theme.cards.hover.transform;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = theme.cards.shadow;
              e.currentTarget.style.transform = "none";
            }}
          >
            <div className="space-y-3">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded" />
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
            </div>
          </div>
        </div>

        {/* Card Properties */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Padding
            </label>
            <input
              type="text"
              value={theme.cards.padding}
              onChange={(e) => handleCardChange("padding", e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Border Radius
            </label>
            <input
              type="text"
              value={theme.cards.borderRadius}
              onChange={(e) => handleCardChange("borderRadius", e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Shadow
            </label>
            <input
              type="text"
              value={theme.cards.shadow}
              onChange={(e) => handleCardChange("shadow", e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Border
            </label>
            <input
              type="text"
              value={theme.cards.border}
              onChange={(e) => handleCardChange("border", e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>

        {/* Hover Effects */}
        <div className="space-y-3">
          <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
            Hover Effects
          </h5>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Hover Shadow
              </label>
              <input
                type="text"
                value={theme.cards.hover.shadow}
                onChange={(e) =>
                  handleCardHoverChange("shadow", e.target.value)
                }
                className="w-full px-3 py-2 mt-1 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Hover Transform
              </label>
              <input
                type="text"
                value={theme.cards.hover.transform}
                onChange={(e) =>
                  handleCardHoverChange("transform", e.target.value)
                }
                className="w-full px-3 py-2 mt-1 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Component Guidelines */}
      <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
        <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
          <Layers size={16} />
          Design Guidelines
        </h4>
        <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
          <li>
            • Maintain consistent spacing and sizing across similar components
          </li>
          <li>• Use subtle shadows and borders to create visual hierarchy</li>
          <li>
            • Ensure interactive elements have clear hover and focus states
          </li>
          <li>• Test components in both light and dark modes</li>
          <li>• Consider touch target sizes for mobile devices (min 44px)</li>
        </ul>
      </div>
    </div>
  );
}
