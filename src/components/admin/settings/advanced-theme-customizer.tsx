"use client";

import React, { useState, useRef } from "react";
import { useAdvancedTheme } from "@/contexts/advanced-theme-context";
import { GOOGLE_FONTS, ThemeConfig } from "@/types/advanced-theme";
import {
  Palette,
  Type,
  Layout,
  Save,
  Download,
  Upload,
  Copy,
  Trash2,
  Plus,
  Undo,
  Redo,
  RotateCcw,
} from "lucide-react";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-600"
          style={{ backgroundColor: value }}
        />
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer"
        />
      </div>
    </div>
  );
}

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  unit = "",
  onChange,
}: SliderProps) {
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
        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}

export function AdvancedThemeCustomizer() {
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
    undoLastChange,
    redoLastChange,
    canUndo,
    canRedo,
    error,
  } = useAdvancedTheme();

  const [activeTab, setActiveTab] = useState<
    "colors" | "typography" | "components" | "layout"
  >("colors");
  const [selectedTheme, setSelectedTheme] = useState<string>(
    currentTheme?.id || ""
  );
  const [isCreating, setIsCreating] = useState(false);
  const [newThemeName, setNewThemeName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentEditingTheme = previewTheme || currentTheme;

  const handleColorChange = (
    colorKey: keyof ThemeConfig["colors"],
    value: string
  ) => {
    if (!currentEditingTheme) return;

    const updatedTheme = {
      ...currentEditingTheme,
      colors: {
        ...currentEditingTheme.colors,
        [colorKey]: value,
      },
    };

    setPreviewTheme(updatedTheme);
  };

  const handleTypographyChange = (
    key: keyof ThemeConfig["typography"],
    value: string | number
  ) => {
    if (!currentEditingTheme) return;

    const updatedTheme = {
      ...currentEditingTheme,
      typography: {
        ...currentEditingTheme.typography,
        [key]: value,
      },
    };

    setPreviewTheme(updatedTheme);
  };

  const handleComponentChange = (
    key: keyof ThemeConfig["components"],
    value: string
  ) => {
    if (!currentEditingTheme) return;

    const updatedTheme = {
      ...currentEditingTheme,
      components: {
        ...currentEditingTheme.components,
        [key]: value,
      },
    };

    setPreviewTheme(updatedTheme);
  };

  const handleLayoutChange = (key: string, value: string) => {
    if (!currentEditingTheme) return;

    const updatedTheme = {
      ...currentEditingTheme,
      layout: {
        ...currentEditingTheme.layout,
        [key]: value,
      },
    };

    setPreviewTheme(updatedTheme);
  };

  const handleSpacingChange = (
    spacingKey: keyof ThemeConfig["layout"]["spacing"],
    value: string
  ) => {
    if (!currentEditingTheme) return;

    const updatedTheme = {
      ...currentEditingTheme,
      layout: {
        ...currentEditingTheme.layout,
        spacing: {
          ...currentEditingTheme.layout.spacing,
          [spacingKey]: value,
        },
      },
    };

    setPreviewTheme(updatedTheme);
  };

  const saveCurrentTheme = async () => {
    if (!previewTheme) return;

    if (previewTheme.isBuiltIn) {
      // Create a new theme based on built-in theme
      const newName = `${previewTheme.name} (Custom)`;
      await createTheme({
        ...previewTheme,
        name: newName,
        isBuiltIn: false,
        createdBy: "user",
      });
    } else {
      await updateTheme(previewTheme.id, previewTheme);
    }

    setPreviewTheme(null);
  };

  const resetToOriginal = () => {
    setPreviewTheme(null);
  };

  const createNewTheme = async () => {
    if (!newThemeName.trim()) return;

    const baseTheme = currentEditingTheme || themes[0];
    await createTheme({
      ...baseTheme,
      name: newThemeName,
      description: "Custom theme",
      isBuiltIn: false,
      createdBy: "user",
    });

    setNewThemeName("");
    setIsCreating(false);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      importTheme(file);
    }
  };

  if (!currentEditingTheme) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <p className="text-slate-600 dark:text-slate-400">
          Loading theme customizer...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Theme Selector and Actions */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <select
              value={selectedTheme}
              onChange={(e) => {
                setSelectedTheme(e.target.value);
                applyTheme(e.target.value);
              }}
              className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
            >
              {themes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.name} {theme.isBuiltIn ? "(Built-in)" : ""}
                </option>
              ))}
            </select>

            {isPreviewMode && (
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded text-sm">
                Preview Mode
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={undoLastChange}
              disabled={!canUndo}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Undo"
            >
              <Undo className="w-4 h-4" />
            </button>

            <button
              onClick={redoLastChange}
              disabled={!canRedo}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Redo"
            >
              <Redo className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-slate-300 dark:bg-slate-600" />

            {isPreviewMode && (
              <>
                <button
                  onClick={saveCurrentTheme}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>

                <button
                  onClick={resetToOriginal}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </>
            )}

            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
            >
              <Plus className="w-4 h-4" />
              New
            </button>

            <button
              onClick={() =>
                currentEditingTheme &&
                duplicateTheme(
                  currentEditingTheme.id,
                  `${currentEditingTheme.name} Copy`
                )
              }
              className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm"
            >
              <Copy className="w-4 h-4" />
              Duplicate
            </button>

            <button
              onClick={() =>
                currentEditingTheme && exportTheme(currentEditingTheme.id)
              }
              className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm"
            >
              <Download className="w-4 h-4" />
              Export
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm"
            >
              <Upload className="w-4 h-4" />
              Import
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />

            {!currentEditingTheme.isBuiltIn && (
              <button
                onClick={() => deleteTheme(currentEditingTheme.id)}
                className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Create New Theme Modal */}
      {isCreating && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Create New Theme
          </h3>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Theme name"
              value={newThemeName}
              onChange={(e) => setNewThemeName(e.target.value)}
              className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
            />
            <button
              onClick={createNewTheme}
              disabled={!newThemeName.trim()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white rounded-lg"
            >
              Create
            </button>
            <button
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
          <p className="text-red-800 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Customization Tabs */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        {/* Tab Navigation */}
        <div className="border-b border-slate-200 dark:border-slate-700">
          <nav className="flex space-x-1 p-1">
            {[
              { id: "colors", label: "Colors", icon: Palette },
              { id: "typography", label: "Typography", icon: Type },
              { id: "components", label: "Components", icon: Layout },
              { id: "layout", label: "Layout", icon: Layout },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(
                    tab.id as "colors" | "typography" | "components" | "layout"
                  )
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Colors Tab */}
          {activeTab === "colors" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Color Palette
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-slate-900 dark:text-slate-100">
                    Brand Colors
                  </h4>
                  <ColorPicker
                    label="Primary"
                    value={currentEditingTheme.colors.primary}
                    onChange={(value) => handleColorChange("primary", value)}
                  />
                  <ColorPicker
                    label="Secondary"
                    value={currentEditingTheme.colors.secondary}
                    onChange={(value) => handleColorChange("secondary", value)}
                  />
                  <ColorPicker
                    label="Accent"
                    value={currentEditingTheme.colors.accent}
                    onChange={(value) => handleColorChange("accent", value)}
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-slate-900 dark:text-slate-100">
                    Semantic Colors
                  </h4>
                  <ColorPicker
                    label="Success"
                    value={currentEditingTheme.colors.success}
                    onChange={(value) => handleColorChange("success", value)}
                  />
                  <ColorPicker
                    label="Warning"
                    value={currentEditingTheme.colors.warning}
                    onChange={(value) => handleColorChange("warning", value)}
                  />
                  <ColorPicker
                    label="Danger"
                    value={currentEditingTheme.colors.danger}
                    onChange={(value) => handleColorChange("danger", value)}
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-slate-900 dark:text-slate-100">
                    Base Colors
                  </h4>
                  <ColorPicker
                    label="Background"
                    value={currentEditingTheme.colors.background}
                    onChange={(value) => handleColorChange("background", value)}
                  />
                  <ColorPicker
                    label="Text"
                    value={currentEditingTheme.colors.text}
                    onChange={(value) => handleColorChange("text", value)}
                  />
                  <ColorPicker
                    label="Muted"
                    value={currentEditingTheme.colors.muted}
                    onChange={(value) => handleColorChange("muted", value)}
                  />
                  <ColorPicker
                    label="Border"
                    value={currentEditingTheme.colors.border}
                    onChange={(value) => handleColorChange("border", value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Typography Tab */}
          {activeTab === "typography" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Typography Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Font Family
                    </label>
                    <select
                      value={currentEditingTheme.typography.fontFamily}
                      onChange={(e) =>
                        handleTypographyChange("fontFamily", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    >
                      {GOOGLE_FONTS.map((font) => (
                        <option key={font.name} value={font.name}>
                          {font.name} ({font.category})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Base Font Size
                    </label>
                    <select
                      value={currentEditingTheme.typography.fontSize}
                      onChange={(e) =>
                        handleTypographyChange("fontSize", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    >
                      <option value="14px">14px (Small)</option>
                      <option value="16px">16px (Default)</option>
                      <option value="18px">18px (Large)</option>
                      <option value="20px">20px (Extra Large)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <Slider
                    label="Heading Scale"
                    value={currentEditingTheme.typography.headingScale}
                    min={1.1}
                    max={1.5}
                    step={0.05}
                    onChange={(value) =>
                      handleTypographyChange("headingScale", value)
                    }
                  />

                  <Slider
                    label="Line Height"
                    value={currentEditingTheme.typography.lineHeight}
                    min={1.2}
                    max={2.0}
                    step={0.1}
                    onChange={(value) =>
                      handleTypographyChange("lineHeight", value)
                    }
                  />

                  <Slider
                    label="Letter Spacing"
                    value={currentEditingTheme.typography.letterSpacing}
                    min={-0.05}
                    max={0.1}
                    step={0.01}
                    unit="em"
                    onChange={(value) =>
                      handleTypographyChange("letterSpacing", value)
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {/* Components Tab */}
          {activeTab === "components" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Component Styles
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Border Radius
                    </label>
                    <select
                      value={currentEditingTheme.components.borderRadius}
                      onChange={(e) =>
                        handleComponentChange("borderRadius", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    >
                      <option value="0px">None (0px)</option>
                      <option value="4px">Small (4px)</option>
                      <option value="8px">Medium (8px)</option>
                      <option value="12px">Large (12px)</option>
                      <option value="16px">Extra Large (16px)</option>
                      <option value="20px">Rounded (20px)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Shadow Style
                    </label>
                    <select
                      value={currentEditingTheme.components.shadow}
                      onChange={(e) =>
                        handleComponentChange("shadow", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    >
                      <option value="none">None</option>
                      <option value="sm">Small</option>
                      <option value="md">Medium</option>
                      <option value="lg">Large</option>
                      <option value="xl">Extra Large</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Button Style
                    </label>
                    <select
                      value={currentEditingTheme.components.buttonStyle}
                      onChange={(e) =>
                        handleComponentChange("buttonStyle", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    >
                      <option value="rounded">Rounded</option>
                      <option value="square">Square</option>
                      <option value="pill">Pill</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Input Style
                    </label>
                    <select
                      value={currentEditingTheme.components.inputStyle}
                      onChange={(e) =>
                        handleComponentChange("inputStyle", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    >
                      <option value="default">Default</option>
                      <option value="underlined">Underlined</option>
                      <option value="filled">Filled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Card Style
                    </label>
                    <select
                      value={currentEditingTheme.components.cardStyle}
                      onChange={(e) =>
                        handleComponentChange("cardStyle", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    >
                      <option value="flat">Flat</option>
                      <option value="elevated">Elevated</option>
                      <option value="outlined">Outlined</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Container Width
                    </label>
                    <select
                      value={currentEditingTheme.components.containerWidth}
                      onChange={(e) =>
                        handleComponentChange("containerWidth", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    >
                      <option value="1024px">Small (1024px)</option>
                      <option value="1200px">Medium (1200px)</option>
                      <option value="1280px">Large (1280px)</option>
                      <option value="1440px">Extra Large (1440px)</option>
                      <option value="100%">Full Width</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Layout Tab */}
          {activeTab === "layout" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Layout Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-slate-900 dark:text-slate-100">
                    Container Settings
                  </h4>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Container Width
                    </label>
                    <select
                      value={currentEditingTheme.layout.containerWidth}
                      onChange={(e) =>
                        handleLayoutChange("containerWidth", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    >
                      <option value="1024px">1024px</option>
                      <option value="1200px">1200px</option>
                      <option value="1280px">1280px</option>
                      <option value="1440px">1440px</option>
                      <option value="100%">Full Width</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Sidebar Width
                    </label>
                    <select
                      value={currentEditingTheme.layout.sidebarWidth}
                      onChange={(e) =>
                        handleLayoutChange("sidebarWidth", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    >
                      <option value="240px">Narrow (240px)</option>
                      <option value="256px">Default (256px)</option>
                      <option value="280px">Wide (280px)</option>
                      <option value="320px">Extra Wide (320px)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Header Height
                    </label>
                    <select
                      value={currentEditingTheme.layout.headerHeight}
                      onChange={(e) =>
                        handleLayoutChange("headerHeight", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    >
                      <option value="56px">Compact (56px)</option>
                      <option value="64px">Default (64px)</option>
                      <option value="72px">Tall (72px)</option>
                      <option value="80px">Extra Tall (80px)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-slate-900 dark:text-slate-100">
                    Spacing System
                  </h4>

                  {Object.entries(currentEditingTheme.layout.spacing).map(
                    ([key, value]) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          {key.toUpperCase()} Spacing
                        </label>
                        <select
                          value={value}
                          onChange={(e) =>
                            handleSpacingChange(
                              key as keyof ThemeConfig["layout"]["spacing"],
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                        >
                          <option value="2px">2px</option>
                          <option value="4px">4px</option>
                          <option value="6px">6px</option>
                          <option value="8px">8px</option>
                          <option value="12px">12px</option>
                          <option value="16px">16px</option>
                          <option value="20px">20px</option>
                          <option value="24px">24px</option>
                          <option value="28px">28px</option>
                          <option value="32px">32px</option>
                          <option value="36px">36px</option>
                          <option value="40px">40px</option>
                        </select>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
