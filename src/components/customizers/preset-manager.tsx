"use client";

import React, { useState } from "react";
import { useThemeStore } from "@/store/theme-store";
import { ThemeConfig } from "@/types/saas-theme";
import {
  Check,
  Star,
  Download,
  Eye,
  Edit3,
  Trash2,
  Plus,
  Search,
  Filter,
} from "lucide-react";

export function PresetManager() {
  const {
    themes,
    activeTheme,
    setActiveTheme,
    setPreviewTheme,
    deleteTheme,
    isLoading,
  } = useThemeStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "created" | "updated">("name");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredThemes = themes
    .filter(
      (theme) =>
        theme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        theme.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "created":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "updated":
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleSetActive = async (themeId: string) => {
    await setActiveTheme(themeId);
  };

  const handlePreview = (theme: ThemeConfig) => {
    setPreviewTheme(theme);
  };

  const handleDelete = async (themeId: string, themeName: string) => {
    if (window.confirm(`Are you sure you want to delete "${themeName}"?`)) {
      await deleteTheme(themeId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex-1">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search themes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Filter
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              size={16}
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="pl-10 pr-8 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="created">Sort by Created</option>
              <option value="updated">Sort by Updated</option>
            </select>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">New Theme</span>
          </button>
        </div>
      </div>

      {/* Theme Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredThemes.map((theme) => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            isActive={activeTheme?.id === theme.id}
            onSetActive={handleSetActive}
            onPreview={handlePreview}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        ))}
      </div>

      {filteredThemes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400 mb-4">
            <Star size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
            No themes found
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            {searchTerm
              ? "Try adjusting your search criteria"
              : "Create your first custom theme"}
          </p>
        </div>
      )}
    </div>
  );
}

interface ThemeCardProps {
  theme: ThemeConfig;
  isActive: boolean;
  onSetActive: (themeId: string) => void;
  onPreview: (theme: ThemeConfig) => void;
  onDelete: (themeId: string, themeName: string) => void;
  isLoading: boolean;
}

function ThemeCard({
  theme,
  isActive,
  onSetActive,
  onPreview,
  onDelete,
  isLoading,
}: ThemeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative group border rounded-xl p-4 transition-all duration-200 ${
        isActive
          ? "border-blue-500 bg-blue-50 dark:bg-blue-950/50"
          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Theme Preview */}
      <div className="relative h-24 rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
        <div className="absolute inset-0 p-2">
          <div className="flex space-x-1 mb-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: theme.colorPalette.primary[500] }}
            />
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: theme.colorPalette.secondary[500] }}
            />
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: theme.colorPalette.accent[500] }}
            />
          </div>
          <div
            className="h-2 rounded mb-1"
            style={{ backgroundColor: theme.colorPalette.neutral[300] }}
          />
          <div
            className="h-2 rounded w-3/4"
            style={{ backgroundColor: theme.colorPalette.neutral[200] }}
          />
        </div>

        {/* Active Badge */}
        {isActive && (
          <div className="absolute top-2 right-2">
            <div className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
              <Check size={12} />
              <span>Active</span>
            </div>
          </div>
        )}
      </div>

      {/* Theme Info */}
      <div className="mb-4">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
          {theme.name}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
          {theme.description}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            v{theme.version}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {new Date(theme.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {!isActive && (
          <button
            onClick={() => onSetActive(theme.id)}
            disabled={isLoading}
            className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {isLoading ? "Setting..." : "Set Active"}
          </button>
        )}

        <button
          onClick={() => onPreview(theme)}
          className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          title="Preview"
        >
          <Eye size={16} />
        </button>

        <button
          className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          title="Edit"
        >
          <Edit3 size={16} />
        </button>

        {!isActive && (
          <button
            onClick={() => onDelete(theme.id, theme.name)}
            className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
