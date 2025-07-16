"use client";

import React, { useState } from "react";
import { useThemeStore } from "../store/theme-store";
import {
  ColorPalette,
  FontConfig,
  LayoutConfig,
  LayoutType,
} from "../types/saas-theme";

export default function AdminThemeCustomizer() {
  const { themes, activeTheme, setActiveTheme, updateTheme, isLoading } =
    useThemeStore();
  const [selectedTab, setSelectedTab] = useState<
    "themes" | "colors" | "typography" | "layout"
  >("themes");

  if (!activeTheme) {
    return (
      <div className="theme-customizer-panel p-6 rounded-lg">
        <div className="text-center">
          <p className="text-neutral-600">Loading theme customizer...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="theme-customizer-panel p-6 rounded-lg h-fit">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Theme Customizer</h2>
        <p className="text-sm text-neutral-600">
          Customize your theme in real-time
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-neutral-100 p-1 rounded-lg">
          {(["themes", "colors", "typography", "layout"] as const).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
                  selectedTab === tab
                    ? "bg-white text-neutral-900 shadow-sm"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
        </div>
      </div>

      {/* Theme Selection */}
      {selectedTab === "themes" && (
        <div className="space-y-4">
          <h3 className="font-medium text-neutral-900">Available Themes</h3>
          <div className="space-y-2">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`p-3 border rounded-lg cursor-pointer transition-all ${
                  activeTheme.id === theme.id
                    ? "border-primary-500 bg-primary-50"
                    : "border-neutral-200 hover:border-neutral-300"
                }`}
                onClick={() => setActiveTheme(theme.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{theme.name}</p>
                    <p className="text-xs text-neutral-600">
                      {theme.description}
                    </p>
                  </div>
                  {activeTheme.id === theme.id && (
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  )}
                </div>
                {/* Theme Color Preview */}
                <div className="flex space-x-1 mt-2">
                  <div
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: theme.colorPalette.primary[500] }}
                  ></div>
                  <div
                    className="w-4 h-4 rounded-full border"
                    style={{
                      backgroundColor: theme.colorPalette.secondary[500],
                    }}
                  ></div>
                  <div
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: theme.colorPalette.accent[500] }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Color Customization */}
      {selectedTab === "colors" && (
        <ColorCustomizer
          colorPalette={activeTheme.colorPalette}
          onColorChange={(palette) => {
            updateTheme(activeTheme.id, { colorPalette: palette });
          }}
        />
      )}

      {/* Typography Customization */}
      {selectedTab === "typography" && (
        <TypographyCustomizer
          typography={activeTheme.typography}
          onTypographyChange={(typography) => {
            updateTheme(activeTheme.id, { typography });
          }}
        />
      )}

      {/* Layout Customization */}
      {selectedTab === "layout" && (
        <LayoutCustomizer
          layout={activeTheme.layout}
          onLayoutChange={(layout) => {
            updateTheme(activeTheme.id, { layout });
          }}
        />
      )}

      {/* Actions */}
      <div className="mt-6 pt-4 border-t border-neutral-200">
        <button disabled={isLoading} className="w-full btn-primary">
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

// Color Customizer Component
function ColorCustomizer({
  colorPalette,
  onColorChange,
}: {
  colorPalette: ColorPalette;
  onColorChange: (palette: ColorPalette) => void;
}) {
  const [selectedColorGroup, setSelectedColorGroup] = useState<
    "primary" | "secondary" | "accent"
  >("primary");

  const updateColor = (shade: string, color: string) => {
    const updatedPalette = {
      ...colorPalette,
      [selectedColorGroup]: {
        ...colorPalette[selectedColorGroup],
        [shade]: color,
      },
    };
    onColorChange(updatedPalette);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-neutral-900">Color Palette</h3>

      {/* Color Group Selection */}
      <div className="flex space-x-2">
        {(["primary", "secondary", "accent"] as const).map((group) => (
          <button
            key={group}
            onClick={() => setSelectedColorGroup(group)}
            className={`px-3 py-1 text-xs rounded-full ${
              selectedColorGroup === group
                ? "bg-neutral-900 text-white"
                : "bg-neutral-200 text-neutral-700"
            }`}
          >
            {group.charAt(0).toUpperCase() + group.slice(1)}
          </button>
        ))}
      </div>

      {/* Color Shades */}
      <div className="space-y-3">
        {Object.entries(colorPalette[selectedColorGroup]).map(
          ([shade, color]) => (
            <div key={shade} className="flex items-center justify-between">
              <span className="text-sm font-medium">{shade}</span>
              <div className="flex items-center space-x-2">
                <div
                  className="w-6 h-6 rounded border border-neutral-300"
                  style={{ backgroundColor: color }}
                ></div>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => updateColor(shade, e.target.value)}
                  className="w-8 h-8 rounded border-none cursor-pointer"
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

// Typography Customizer Component
function TypographyCustomizer({
  typography,
  onTypographyChange,
}: {
  typography: FontConfig;
  onTypographyChange: (typography: FontConfig) => void;
}) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-neutral-900">Typography</h3>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Font Family</label>
          <select
            value={typography.family}
            onChange={(e) =>
              onTypographyChange({ ...typography, family: e.target.value })
            }
            className="input text-sm"
          >
            <option value="Inter, system-ui, sans-serif">Inter</option>
            <option value="Roboto, sans-serif">Roboto</option>
            <option value="Poppins, sans-serif">Poppins</option>
            <option value="Montserrat, sans-serif">Montserrat</option>
            <option value="Open Sans, sans-serif">Open Sans</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Font Sizes</label>
          <div className="space-y-2">
            {Object.entries(typography.sizes).map(([size, value]) => (
              <div key={size} className="flex items-center justify-between">
                <span className="text-sm">{size}</span>
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    onTypographyChange({
                      ...typography,
                      sizes: { ...typography.sizes, [size]: e.target.value },
                    })
                  }
                  className="input text-xs w-20"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Layout Customizer Component
function LayoutCustomizer({
  layout,
  onLayoutChange,
}: {
  layout: LayoutConfig;
  onLayoutChange: (layout: LayoutConfig) => void;
}) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-neutral-900">Layout</h3>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Layout Type</label>
          <select
            value={layout.type}
            onChange={(e) =>
              onLayoutChange({ ...layout, type: e.target.value as LayoutType })
            }
            className="input text-sm"
          >
            <option value="boxed">Boxed</option>
            <option value="full-width">Full Width</option>
            <option value="grid">Grid</option>
            <option value="masonry">Masonry</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Max Width</label>
          <input
            type="text"
            value={layout.maxWidth}
            onChange={(e) =>
              onLayoutChange({ ...layout, maxWidth: e.target.value })
            }
            className="input text-sm"
            placeholder="1200px"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Border Radius
          </label>
          <div className="space-y-2">
            {Object.entries(layout.borderRadius).map(([size, value]) => (
              <div key={size} className="flex items-center justify-between">
                <span className="text-sm">{size}</span>
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    onLayoutChange({
                      ...layout,
                      borderRadius: {
                        ...layout.borderRadius,
                        [size]: e.target.value,
                      },
                    })
                  }
                  className="input text-xs w-20"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
