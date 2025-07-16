"use client";

// @ts-nocheck - Temporary suppression for complex type issues

import React, { useState, useRef, useCallback } from "react";
import { useEnterpriseTheme } from "@/contexts/enterprise-theme-context";
import {
  GOOGLE_FONTS,
  ThemeConfig,
  THEME_CATEGORIES,
} from "@/types/advanced-theme";
import {
  Palette,
  Type,
  Layout,
  Smartphone,
  Tablet,
  Monitor,
  Save,
  Download,
  Upload,
  Copy,
  Trash2,
  Plus,
  Undo,
  Redo,
  RotateCcw,
  Eye,
  EyeOff,
  Share,
  Star,
  Search,
  Filter,
  Settings,
  Zap,
  Globe,
  Users,
  BarChart3,
  Layers,
  Paintbrush,
  Image,
  Code,
} from "lucide-react";

interface ColorPaletteProps {
  label: string;
  colors: Record<string, string>;
  onChange: (colors: Record<string, string>) => void;
}

function ColorPalette({ label, colors, onChange }: ColorPaletteProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleColorChange = (key: string, value: string) => {
    onChange({ ...colors, [key]: value });
  };

  const mainColor = colors[label.toLowerCase()] || colors.primary;
  const shades = Object.entries(colors).filter(([key]) =>
    key.startsWith(label.toLowerCase())
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          {isExpanded ? "Less" : "More"}
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div
          className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-600 cursor-pointer"
          style={{ backgroundColor: mainColor }}
        />
        <input
          type="color"
          value={mainColor}
          onChange={(e) =>
            handleColorChange(label.toLowerCase(), e.target.value)
          }
          className="w-10 h-10 rounded cursor-pointer border-0"
        />
        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
          {mainColor}
        </span>
      </div>

      {isExpanded && shades.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {shades.map(([key, value]) => (
            <div key={key} className="text-center">
              <div
                className="w-8 h-8 rounded border border-slate-200 dark:border-slate-600 mb-1"
                style={{ backgroundColor: value }}
              />
              <input
                type="color"
                value={value}
                onChange={(e) => handleColorChange(key, e.target.value)}
                className="w-full h-6 rounded cursor-pointer text-xs"
              />
              <span className="text-xs text-slate-400">
                {key.split("-")[1] || key}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
}

function SliderControl({
  label,
  value,
  min,
  max,
  step,
  unit = "",
  onChange,
}: SliderControlProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
      />
    </div>
  );
}

interface SelectControlProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

function SelectControl({
  label,
  value,
  options,
  onChange,
}: SelectControlProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function EnterpriseThemeCustomizer() {
  const {
    currentTheme,
    themes,
    createTheme,
    updateTheme,
    deleteTheme,
    applyTheme,
    duplicateTheme,
    exportTheme,
    importTheme,
    previewTheme,
    setPreviewTheme,
    isPreviewMode,
    previewDevice,
    setPreviewDevice,
    canUndo,
    canRedo,
    undoLastChange,
    redoLastChange,
    searchThemes,
    filterThemes,
    isLoading,
    error,
    clearError,
  } = useEnterpriseTheme();

  const [activeTab, setActiveTab] = useState("colors");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCreating, setIsCreating] = useState(false);
  const [newThemeName, setNewThemeName] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [editingTheme, setEditingTheme] = useState<ThemeConfig | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tabs = [
    { id: "colors", label: "Colors", icon: Palette },
    { id: "typography", label: "Typography", icon: Type },
    { id: "spacing", label: "Spacing", icon: Layout },
    { id: "components", label: "Components", icon: Layers },
    { id: "layout", label: "Layout", icon: Monitor },
    { id: "branding", label: "Branding", icon: Image },
    { id: "advanced", label: "Advanced", icon: Settings },
  ];

  const deviceOptions = [
    { id: "desktop", label: "Desktop", icon: Monitor },
    { id: "tablet", label: "Tablet", icon: Tablet },
    { id: "mobile", label: "Mobile", icon: Smartphone },
  ];

  const workingTheme = editingTheme || currentTheme;

  const handleThemeUpdate = useCallback(
    (updates: Partial<ThemeConfig>) => {
      if (!workingTheme) return;

      const updatedTheme = { ...workingTheme, ...updates };
      setEditingTheme(updatedTheme);

      if (isPreviewMode) {
        setPreviewTheme(updatedTheme);
      }
    },
    [workingTheme, isPreviewMode, setPreviewTheme]
  );

  const handleSaveTheme = useCallback(async () => {
    if (!editingTheme) return;

    try {
      if (editingTheme.id.startsWith("new-")) {
        await createTheme(editingTheme);
      } else {
        await updateTheme(editingTheme.id, editingTheme);
      }
      setEditingTheme(null);
      setIsCreating(false);
    } catch (err) {
      console.error("Failed to save theme:", err);
    }
  }, [editingTheme, createTheme, updateTheme]);

  const handleCreateNewTheme = useCallback(() => {
    if (!newThemeName.trim()) return;

    const baseTheme = currentTheme || themes[0];
    const newTheme: ThemeConfig = {
      ...baseTheme,
      id: `new-${Date.now()}`,
      name: newThemeName,
      description: `Custom theme based on ${baseTheme.name}`,
      isBuiltIn: false,
      isPublic: false,
      isDefault: false,
      createdBy: "user",
      tags: ["custom"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setEditingTheme(newTheme);
    setIsCreating(false);
    setNewThemeName("");
    setPreviewTheme(newTheme);
  }, [newThemeName, currentTheme, themes, setPreviewTheme]);

  const filteredThemes = React.useMemo(() => {
    let result = themes;

    if (searchQuery) {
      result = searchThemes(searchQuery);
    }

    if (selectedCategory !== "all") {
      result = result.filter(
        (theme) =>
          theme.tags.includes(selectedCategory) ||
          (selectedCategory === "builtin" && theme.isBuiltIn) ||
          (selectedCategory === "custom" && !theme.isBuiltIn)
      );
    }

    return result;
  }, [themes, searchQuery, selectedCategory, searchThemes]);

  const renderColorsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ColorPalette
          label="Primary"
          colors={workingTheme?.colors || {}}
          onChange={(colors) =>
            handleThemeUpdate({
              colors: { ...workingTheme?.colors, ...colors },
            })
          }
        />
        <ColorPalette
          label="Secondary"
          colors={workingTheme?.colors || {}}
          onChange={(colors) =>
            handleThemeUpdate({
              colors: { ...workingTheme?.colors, ...colors },
            })
          }
        />
      </div>

      {/* Semantic Colors */}
      <div>
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Semantic Colors
        </h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {["success", "warning", "danger", "info"].map((colorType) => (
            <div key={colorType} className="space-y-2">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400 capitalize">
                {colorType}
              </label>
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded border border-slate-200 dark:border-slate-600"
                  style={{
                    backgroundColor:
                      workingTheme?.colors[
                        colorType as keyof typeof workingTheme.colors
                      ],
                  }}
                />
                <input
                  type="color"
                  value={
                    workingTheme?.colors[
                      colorType as keyof typeof workingTheme.colors
                    ] || "#000000"
                  }
                  onChange={(e) =>
                    handleThemeUpdate({
                      colors: {
                        ...workingTheme?.colors,
                        [colorType]: e.target.value,
                      },
                    })
                  }
                  className="w-8 h-8 rounded cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Surface Colors */}
      <div>
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Surface Colors
        </h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            "background",
            "background-secondary",
            "surface",
            "surface-variant",
          ].map((colorType) => (
            <div key={colorType} className="space-y-2">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                {colorType.replace("-", " ")}
              </label>
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded border border-slate-200 dark:border-slate-600"
                  style={{
                    backgroundColor:
                      workingTheme?.colors[
                        colorType as keyof typeof workingTheme.colors
                      ],
                  }}
                />
                <input
                  type="color"
                  value={
                    workingTheme?.colors[
                      colorType as keyof typeof workingTheme.colors
                    ] || "#ffffff"
                  }
                  onChange={(e) =>
                    handleThemeUpdate({
                      colors: {
                        ...workingTheme?.colors,
                        [colorType]: e.target.value,
                      },
                    })
                  }
                  className="w-8 h-8 rounded cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTypographyTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SelectControl
          label="Primary Font"
          value={workingTheme?.typography.fontFamily || "Inter"}
          options={GOOGLE_FONTS.map((font) => ({
            value: font.name,
            label: font.name,
          }))}
          onChange={(fontFamily) =>
            handleThemeUpdate({
              typography: { ...workingTheme?.typography, fontFamily },
            })
          }
        />
        <SelectControl
          label="Heading Font"
          value={workingTheme?.typography.headingFont || "Inter"}
          options={GOOGLE_FONTS.map((font) => ({
            value: font.name,
            label: font.name,
          }))}
          onChange={(headingFont) =>
            handleThemeUpdate({
              typography: { ...workingTheme?.typography, headingFont },
            })
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SliderControl
          label="Base Font Size"
          value={parseInt(workingTheme?.typography.baseFontSize || "16")}
          min={12}
          max={20}
          step={1}
          unit="px"
          onChange={(size) =>
            handleThemeUpdate({
              typography: {
                ...workingTheme?.typography,
                baseFontSize: `${size}px`,
              },
            })
          }
        />
        <SliderControl
          label="Heading Scale"
          value={workingTheme?.typography.headingScale || 1.25}
          min={1.1}
          max={1.5}
          step={0.05}
          onChange={(headingScale) =>
            handleThemeUpdate({
              typography: { ...workingTheme?.typography, headingScale },
            })
          }
        />
      </div>

      {/* Font Size Scale */}
      <div>
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Font Size Scale
        </h4>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {Object.entries(workingTheme?.typography.fontSizes || {}).map(
            ([size, value]) => (
              <div key={size} className="space-y-2">
                <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  {size}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    handleThemeUpdate({
                      typography: {
                        ...workingTheme?.typography,
                        fontSizes: {
                          ...workingTheme?.typography.fontSizes,
                          [size]: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full px-2 py-1 text-xs border border-slate-200 dark:border-slate-600 rounded bg-white dark:bg-slate-800"
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );

  const renderSpacingTab = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Spacing Scale
        </h4>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {Object.entries(workingTheme?.spacing || {}).map(([size, value]) => (
            <div key={size} className="space-y-2">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                {size}
              </label>
              <input
                type="text"
                value={value}
                onChange={(e) =>
                  handleThemeUpdate({
                    spacing: {
                      ...workingTheme?.spacing,
                      [size]: e.target.value,
                    },
                  })
                }
                className="w-full px-2 py-1 text-xs border border-slate-200 dark:border-slate-600 rounded bg-white dark:bg-slate-800"
              />
              <div
                className="w-full bg-blue-500 rounded"
                style={{ height: value }}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Border Radius
        </h4>
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(workingTheme?.borderRadius || {}).map(
            ([size, value]) => (
              <div key={size} className="space-y-2">
                <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  {size}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    handleThemeUpdate({
                      borderRadius: {
                        ...workingTheme?.borderRadius,
                        [size]: e.target.value,
                      },
                    })
                  }
                  className="w-full px-2 py-1 text-xs border border-slate-200 dark:border-slate-600 rounded bg-white dark:bg-slate-800"
                />
                <div
                  className="w-full h-8 bg-slate-300 dark:bg-slate-600"
                  style={{ borderRadius: value }}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );

  const renderComponentsTab = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Button Styles
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SelectControl
            label="Border Radius"
            value={workingTheme?.components.button.borderRadius || "base"}
            options={Object.keys(workingTheme?.borderRadius || {}).map(
              (key) => ({
                value: key,
                label: key,
              })
            )}
            onChange={(borderRadius) =>
              handleThemeUpdate({
                components: {
                  ...workingTheme?.components,
                  button: {
                    ...workingTheme?.components.button,
                    borderRadius: borderRadius as any,
                  },
                },
              })
            }
          />
          <SelectControl
            label="Shadow"
            value={workingTheme?.components.button.shadow || "sm"}
            options={Object.keys(workingTheme?.shadows || {}).map((key) => ({
              value: key,
              label: key,
            }))}
            onChange={(shadow) =>
              handleThemeUpdate({
                components: {
                  ...workingTheme?.components,
                  button: {
                    ...workingTheme?.components.button,
                    shadow: shadow as any,
                  },
                },
              })
            }
          />
        </div>
      </div>

      {/* Component Preview */}
      <div>
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Component Preview
        </h4>
        <div className="space-y-4 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
          <div className="flex gap-3 flex-wrap">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Primary Button
            </button>
            <button className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded hover:bg-slate-50 dark:hover:bg-slate-700">
              Secondary Button
            </button>
            <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded">
              Ghost Button
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Sample input field"
              className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800"
            />
            <select className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800">
              <option>Sample select option</option>
            </select>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <h5 className="font-medium mb-2">Sample Card</h5>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              This is a preview of how cards will look with the current theme
              settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLayoutTab = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Container Widths
        </h4>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(workingTheme?.layout.containers || {}).map(
            ([size, value]) => (
              <div key={size} className="space-y-2">
                <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  {size}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    handleThemeUpdate({
                      layout: {
                        ...workingTheme?.layout,
                        containers: {
                          ...workingTheme?.layout.containers,
                          [size]: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full px-2 py-1 text-xs border border-slate-200 dark:border-slate-600 rounded bg-white dark:bg-slate-800"
                />
              </div>
            )
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Component Dimensions
          </h4>
          <input
            type="text"
            placeholder="Sidebar Width"
            value={workingTheme?.layout.sidebar.width || "256px"}
            onChange={(e) =>
              handleThemeUpdate({
                layout: {
                  ...workingTheme?.layout,
                  sidebar: {
                    ...workingTheme?.layout.sidebar,
                    width: e.target.value,
                  },
                },
              })
            }
            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded bg-white dark:bg-slate-800"
          />
          <input
            type="text"
            placeholder="Header Height"
            value={workingTheme?.layout.header.height || "64px"}
            onChange={(e) =>
              handleThemeUpdate({
                layout: {
                  ...workingTheme?.layout,
                  header: {
                    ...workingTheme?.layout.header,
                    height: e.target.value,
                  },
                },
              })
            }
            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded bg-white dark:bg-slate-800"
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Grid System
          </h4>
          <SliderControl
            label="Grid Columns"
            value={workingTheme?.layout.grid.columns || 12}
            min={6}
            max={24}
            step={1}
            onChange={(columns) =>
              handleThemeUpdate({
                layout: {
                  ...workingTheme?.layout,
                  grid: { ...workingTheme?.layout.grid, columns },
                },
              })
            }
          />
          <input
            type="text"
            placeholder="Grid Gutter"
            value={workingTheme?.layout.grid.gutter || "1rem"}
            onChange={(e) =>
              handleThemeUpdate({
                layout: {
                  ...workingTheme?.layout,
                  grid: {
                    ...workingTheme?.layout.grid,
                    gutter: e.target.value,
                  },
                },
              })
            }
            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded bg-white dark:bg-slate-800"
          />
        </div>
      </div>
    </div>
  );

  const renderBrandingTab = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Logo & Branding
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Primary Logo URL
            </label>
            <input
              type="url"
              placeholder="https://example.com/logo.png"
              value={workingTheme?.branding?.logo.primary || ""}
              onChange={(e) =>
                handleThemeUpdate({
                  branding: {
                    ...workingTheme?.branding,
                    logo: {
                      ...workingTheme?.branding?.logo,
                      primary: e.target.value,
                    },
                  },
                })
              }
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded bg-white dark:bg-slate-800"
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Favicon URL
            </label>
            <input
              type="url"
              placeholder="https://example.com/favicon.ico"
              value={workingTheme?.branding?.logo.favicon || ""}
              onChange={(e) =>
                handleThemeUpdate({
                  branding: {
                    ...workingTheme?.branding,
                    logo: {
                      ...workingTheme?.branding?.logo,
                      favicon: e.target.value,
                    },
                  },
                })
              }
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded bg-white dark:bg-slate-800"
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Company Information
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Company Name"
            value={workingTheme?.branding?.company.name || ""}
            onChange={(e) =>
              handleThemeUpdate({
                branding: {
                  ...workingTheme?.branding,
                  company: {
                    ...workingTheme?.branding?.company,
                    name: e.target.value,
                  },
                },
              })
            }
            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded bg-white dark:bg-slate-800"
          />
          <input
            type="url"
            placeholder="Company Website"
            value={workingTheme?.branding?.company.website || ""}
            onChange={(e) =>
              handleThemeUpdate({
                branding: {
                  ...workingTheme?.branding,
                  company: {
                    ...workingTheme?.branding?.company,
                    website: e.target.value,
                  },
                },
              })
            }
            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded bg-white dark:bg-slate-800"
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Login Page Customization
        </h4>
        <div className="space-y-4">
          <SelectControl
            label="Logo Position"
            value={workingTheme?.branding?.loginPage.logoPosition || "center"}
            options={[
              { value: "center", label: "Center" },
              { value: "top-left", label: "Top Left" },
              { value: "top-center", label: "Top Center" },
              { value: "top-right", label: "Top Right" },
            ]}
            onChange={(logoPosition) =>
              handleThemeUpdate({
                branding: {
                  ...workingTheme?.branding,
                  loginPage: {
                    ...workingTheme?.branding?.loginPage,
                    logoPosition: logoPosition as any,
                  },
                },
              })
            }
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showCompanyName"
              checked={
                workingTheme?.branding?.loginPage.showCompanyName || false
              }
              onChange={(e) =>
                handleThemeUpdate({
                  branding: {
                    ...workingTheme?.branding,
                    loginPage: {
                      ...workingTheme?.branding?.loginPage,
                      showCompanyName: e.target.checked,
                    },
                  },
                })
              }
              className="rounded border-slate-300 dark:border-slate-600"
            />
            <label
              htmlFor="showCompanyName"
              className="text-sm text-slate-700 dark:text-slate-300"
            >
              Show Company Name
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdvancedTab = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Theme Export & Import
        </h4>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => workingTheme && exportTheme(workingTheme.id, "json")}
            disabled={!workingTheme}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            Export JSON
          </button>
          <button
            onClick={() => workingTheme && exportTheme(workingTheme.id, "css")}
            disabled={!workingTheme}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50"
          >
            <Code className="h-4 w-4" />
            Export CSS
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            <Upload className="h-4 w-4" />
            Import Theme
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              importTheme(file);
            }
          }}
          className="hidden"
        />
      </div>

      <div>
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          CSS Variables
        </h4>
        <div className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm font-mono overflow-auto max-h-64">
          <div className="space-y-1">
            {workingTheme &&
              Object.entries(workingTheme.colors).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-blue-300">--theme-{key}:</span>
                  <span className="text-green-300">{value};</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Theme Information
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Created:</span>{" "}
            {workingTheme?.createdAt &&
              new Date(workingTheme.createdAt).toLocaleDateString()}
          </div>
          <div>
            <span className="font-medium">Updated:</span>{" "}
            {workingTheme?.updatedAt &&
              new Date(workingTheme.updatedAt).toLocaleDateString()}
          </div>
          <div>
            <span className="font-medium">Version:</span>{" "}
            {workingTheme?.version}
          </div>
          <div>
            <span className="font-medium">Created by:</span>{" "}
            {workingTheme?.createdBy}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Enterprise Theme Studio
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Professional theme customization with real-time preview
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Device Preview Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            {deviceOptions.map((device) => {
              const Icon = device.icon;
              return (
                <button
                  key={device.id}
                  onClick={() => setPreviewDevice(device.id as any)}
                  className={`p-2 rounded ${
                    previewDevice === device.id
                      ? "bg-white dark:bg-slate-700 shadow-sm"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                  title={device.label}
                >
                  <Icon className="h-4 w-4" />
                </button>
              );
            })}
          </div>

          {/* Preview Toggle */}
          <button
            onClick={() => setPreviewTheme(isPreviewMode ? null : editingTheme)}
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              isPreviewMode
                ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                : "text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
            }`}
          >
            {isPreviewMode ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            {isPreviewMode ? "Exit Preview" : "Preview"}
          </button>

          {/* Undo/Redo */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button
              onClick={undoLastChange}
              disabled={!canUndo}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 disabled:opacity-50"
              title="Undo"
            >
              <Undo className="h-4 w-4" />
            </button>
            <button
              onClick={redoLastChange}
              disabled={!canRedo}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 disabled:opacity-50"
              title="Redo"
            >
              <Redo className="h-4 w-4" />
            </button>
          </div>

          {/* Save Theme */}
          {editingTheme && (
            <button
              onClick={handleSaveTheme}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              Save Theme
            </button>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-red-700 dark:text-red-300">{error}</p>
            <button
              onClick={clearError}
              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-12 gap-6">
        {/* Theme Library Sidebar */}
        <div className="col-span-12 lg:col-span-3">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Theme Library
              </h3>
              <button
                onClick={() => setIsCreating(true)}
                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                title="Create New Theme"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Search and Filter */}
            <div className="space-y-3 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search themes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-sm"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-sm"
              >
                <option value="all">All Categories</option>
                <option value="builtin">Built-in</option>
                <option value="custom">Custom</option>
                {THEME_CATEGORIES.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Theme List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredThemes.map((theme) => (
                <div
                  key={theme.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    currentTheme?.id === theme.id
                      ? "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20"
                      : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  }`}
                  onClick={() => applyTheme(theme.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm text-slate-900 dark:text-slate-100">
                      {theme.name}
                    </h4>
                    <div className="flex items-center gap-1">
                      {theme.isBuiltIn && (
                        <Star className="h-3 w-3 text-yellow-500" />
                      )}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingTheme(theme);
                          }}
                          className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                          title="Edit"
                        >
                          <Paintbrush className="h-3 w-3" />
                        </button>
                        {theme.permissions.canDuplicate && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const newName = prompt(
                                "Enter name for duplicated theme:"
                              );
                              if (newName) duplicateTheme(theme.id, newName);
                            }}
                            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                            title="Duplicate"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        )}
                        {theme.permissions.canDelete && !theme.isBuiltIn && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (
                                confirm(
                                  "Are you sure you want to delete this theme?"
                                )
                              ) {
                                deleteTheme(theme.id);
                              }
                            }}
                            className="p-1 text-red-400 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                    {theme.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div
                        className="w-3 h-3 rounded-full border border-white"
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                      <div
                        className="w-3 h-3 rounded-full border border-white"
                        style={{ backgroundColor: theme.colors.secondary }}
                      />
                      <div
                        className="w-3 h-3 rounded-full border border-white"
                        style={{ backgroundColor: theme.colors.success }}
                      />
                    </div>
                    <span className="text-xs text-slate-400">{theme.mode}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Create New Theme Dialog */}
            {isCreating && (
              <div className="mt-4 p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                <input
                  type="text"
                  placeholder="Theme name"
                  value={newThemeName}
                  onChange={(e) => setNewThemeName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-sm mb-3"
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleCreateNewTheme()
                  }
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleCreateNewTheme}
                    disabled={!newThemeName.trim()}
                    className="flex-1 px-3 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => {
                      setIsCreating(false);
                      setNewThemeName("");
                    }}
                    className="flex-1 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Customizer */}
        <div className="col-span-12 lg:col-span-9">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            {/* Tab Navigation */}
            <div className="border-b border-slate-200 dark:border-slate-700">
              <nav className="flex space-x-1 px-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 py-4 px-3 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? "border-blue-500 text-blue-600 dark:text-blue-400"
                          : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
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
            <div className="p-6">
              {!workingTheme ? (
                <div className="text-center py-12">
                  <Palette className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                    Select a Theme to Start Customizing
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    Choose a theme from the library or create a new one to begin
                    customization.
                  </p>
                </div>
              ) : (
                <>
                  {activeTab === "colors" && renderColorsTab()}
                  {activeTab === "typography" && renderTypographyTab()}
                  {activeTab === "spacing" && renderSpacingTab()}
                  {activeTab === "components" && renderComponentsTab()}
                  {activeTab === "layout" && renderLayoutTab()}
                  {activeTab === "branding" && renderBrandingTab()}
                  {activeTab === "advanced" && renderAdvancedTab()}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
