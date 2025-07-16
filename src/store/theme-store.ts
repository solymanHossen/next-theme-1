/**
 * Advanced SaaS eCommerce Theme Store
 *
 * Zustand store with admin permissions, real-time preview,
 * API integration, and persistence.
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ThemeStore, ThemeConfig, User } from "@/types/saas-theme";
import {
  fetchThemes,
  updateTheme,
  createTheme,
  deleteTheme,
} from "@/lib/theme-data";

// =============================================================================
// STORE IMPLEMENTATION
// =============================================================================

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      // State
      themes: [],
      activeTheme: null,
      previewTheme: null,
      isLoading: false,
      error: null,

      // User & Permissions
      currentUser: null,
      isAdmin: false,

      // History for undo/redo
      themeHistory: [],
      historyIndex: -1,

      // UI State
      isCustomizerOpen: false,
      isDarkMode: false,
      isPreviewMode: false,

      // History management
      canUndo: false,
      canRedo: false,

      // Actions
      loadThemes: async () => {
        set({ isLoading: true, error: null });
        try {
          const themes = await fetchThemes();
          const activeTheme =
            themes.find((t) => t.isActive) || themes[0] || null;

          set({
            themes,
            activeTheme,
            isLoading: false,
          });

          // Apply active theme to DOM
          if (activeTheme) {
            get().applyThemeToDOM(activeTheme);
          }
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to load themes",
            isLoading: false,
          });
        }
      },

      setActiveTheme: async (themeId: string) => {
        const { themes, isAdmin } = get();

        // Only admins can change active theme
        if (!isAdmin) {
          set({ error: "Only admin users can change the active theme" });
          return;
        }

        const theme = themes.find((t) => t.id === themeId);
        if (!theme) {
          set({ error: "Theme not found" });
          return;
        }

        set({ isLoading: true });
        try {
          // Update theme as active in API
          await updateTheme(themeId, { isActive: true });

          // Update other themes to inactive
          const updatedThemes = themes.map((t) => ({
            ...t,
            isActive: t.id === themeId,
          }));

          set({
            themes: updatedThemes,
            activeTheme: theme,
            isLoading: false,
          });

          get().applyThemeToDOM(theme);
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to set active theme",
            isLoading: false,
          });
        }
      },

      setPreviewTheme: (theme: ThemeConfig) => {
        const { isAdmin } = get();

        if (!isAdmin) {
          set({ error: "Only admin users can preview themes" });
          return;
        }

        set({
          previewTheme: theme,
          isPreviewMode: true,
        });

        get().applyThemeToDOM(theme);
      },

      updateTheme: async (themeId: string, updates: Partial<ThemeConfig>) => {
        const { themes, isAdmin } = get();

        if (!isAdmin) {
          set({ error: "Only admin users can update themes" });
          return;
        }

        set({ isLoading: true });
        try {
          const updatedTheme = await updateTheme(themeId, updates);
          const updatedThemes = themes.map((t) =>
            t.id === themeId ? updatedTheme : t
          );

          set({
            themes: updatedThemes,
            activeTheme: updatedThemes.find((t) => t.isActive) || null,
            isLoading: false,
          });

          // Apply updated theme if it's active or in preview
          const { activeTheme, previewTheme, isPreviewMode } = get();
          if (isPreviewMode && previewTheme?.id === themeId) {
            get().applyThemeToDOM(updatedTheme);
          } else if (activeTheme?.id === themeId) {
            get().applyThemeToDOM(updatedTheme);
          }
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to update theme",
            isLoading: false,
          });
        }
      },

      createTheme: async (themeData) => {
        const { isAdmin } = get();

        if (!isAdmin) {
          set({ error: "Only admin users can create themes" });
          return;
        }

        set({ isLoading: true });
        try {
          const newTheme = await createTheme({
            ...themeData,
            createdBy: get().currentUser?.id || "unknown",
          });

          set((state) => ({
            themes: [...state.themes, newTheme],
            isLoading: false,
          }));
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to create theme",
            isLoading: false,
          });
        }
      },

      deleteTheme: async (themeId: string) => {
        const { themes, isAdmin, activeTheme } = get();

        if (!isAdmin) {
          set({ error: "Only admin users can delete themes" });
          return;
        }

        if (activeTheme?.id === themeId) {
          set({ error: "Cannot delete the active theme" });
          return;
        }

        set({ isLoading: true });
        try {
          await deleteTheme(themeId);
          const updatedThemes = themes.filter((t) => t.id !== themeId);

          set({
            themes: updatedThemes,
            isLoading: false,
          });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to delete theme",
            isLoading: false,
          });
        }
      },

      // UI Actions
      toggleCustomizer: () => {
        const { isAdmin } = get();

        if (!isAdmin) {
          set({ error: "Only admin users can access the theme customizer" });
          return;
        }

        set((state) => ({
          isCustomizerOpen: !state.isCustomizerOpen,
          error: null,
        }));
      },

      toggleDarkMode: () => {
        set((state) => ({ isDarkMode: !state.isDarkMode }));

        // Apply dark mode class to document
        if (typeof window !== "undefined") {
          document.documentElement.classList.toggle("dark", get().isDarkMode);
        }
      },

      togglePreviewMode: () => {
        const { isAdmin, activeTheme } = get();

        if (!isAdmin) return;

        set((state) => ({
          isPreviewMode: !state.isPreviewMode,
          previewTheme: !state.isPreviewMode ? null : state.previewTheme,
        }));

        // Apply appropriate theme
        const { isPreviewMode, previewTheme } = get();
        if (!isPreviewMode && activeTheme) {
          get().applyThemeToDOM(activeTheme);
        } else if (isPreviewMode && previewTheme) {
          get().applyThemeToDOM(previewTheme);
        }
      },

      setUser: (user: User | null) => {
        const isAdmin = user?.role === "admin";
        set({
          currentUser: user,
          isAdmin,
          // Close customizer if user loses admin privileges
          isCustomizerOpen: isAdmin ? get().isCustomizerOpen : false,
          isPreviewMode: isAdmin ? get().isPreviewMode : false,
          error: null,
        });
      },

      // History functionality
      addToHistory: (theme: ThemeConfig) => {
        const { themeHistory, historyIndex } = get();
        const newHistory = themeHistory.slice(0, historyIndex + 1);
        newHistory.push(theme);

        // Limit history size
        if (newHistory.length > 50) {
          newHistory.shift();
        }

        set({
          themeHistory: newHistory,
          historyIndex: newHistory.length - 1,
          canUndo: newHistory.length > 1,
          canRedo: false,
        });
      },

      undoThemeChange: () => {
        const { themeHistory, historyIndex, isAdmin } = get();

        if (!isAdmin || historyIndex <= 0) return;

        const newIndex = historyIndex - 1;
        const previousTheme = themeHistory[newIndex];

        set({
          historyIndex: newIndex,
          previewTheme: previousTheme,
          canUndo: newIndex > 0,
          canRedo: true,
        });

        get().applyThemeToDOM(previousTheme);
      },

      redoThemeChange: () => {
        const { themeHistory, historyIndex, isAdmin } = get();

        if (!isAdmin || historyIndex >= themeHistory.length - 1) return;

        const newIndex = historyIndex + 1;
        const nextTheme = themeHistory[newIndex];

        set({
          historyIndex: newIndex,
          previewTheme: nextTheme,
          canUndo: true,
          canRedo: newIndex < themeHistory.length - 1,
        });

        get().applyThemeToDOM(nextTheme);
      },

      // Theme export/import
      exportTheme: async (themeId: string) => {
        const { themes } = get();
        const theme = themes.find((t) => t.id === themeId);

        if (!theme) return;

        const exportData = {
          theme,
          exportedAt: new Date().toISOString(),
          version: "1.0.0",
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
          type: "application/json",
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${theme.name
          .toLowerCase()
          .replace(/\s+/g, "-")}-theme.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      },

      importTheme: async (file: File) => {
        const { isAdmin } = get();

        if (!isAdmin) {
          set({ error: "Only admin users can import themes" });
          return;
        }

        try {
          const text = await file.text();
          const importData = JSON.parse(text);

          if (!importData.theme) {
            throw new Error("Invalid theme file format");
          }

          const newTheme = {
            ...importData.theme,
            id: `imported-${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isActive: false,
          };

          const createdTheme = await createTheme(newTheme);

          set((state) => ({
            themes: [...state.themes, createdTheme],
          }));
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to import theme",
          });
        }
      },

      // Reset theme to default
      resetTheme: async (themeId: string) => {
        const { isAdmin, themes } = get();

        if (!isAdmin) {
          set({ error: "Only admin users can reset themes" });
          return;
        }

        // Find default theme or create one
        const defaultTheme =
          themes.find((t) => t.name === "Default") || themes[0];

        if (defaultTheme && themeId !== defaultTheme.id) {
          get().setPreviewTheme(defaultTheme);
        }
      },

      // Helper function to apply theme to DOM
      applyThemeToDOM: (theme: ThemeConfig) => {
        if (typeof window === "undefined") return;

        const root = document.documentElement;

        // Apply color palette as CSS custom properties
        const { colorPalette } = theme;

        // Primary colors
        Object.entries(colorPalette.primary).forEach(([shade, value]) => {
          root.style.setProperty(`--primary-${shade}`, value as string);
        });

        // Secondary colors
        Object.entries(colorPalette.secondary).forEach(([shade, value]) => {
          root.style.setProperty(`--secondary-${shade}`, value as string);
        });

        // Accent colors
        Object.entries(colorPalette.accent).forEach(([shade, value]) => {
          root.style.setProperty(`--accent-${shade}`, value as string);
        });

        // Neutral colors
        Object.entries(colorPalette.neutral).forEach(([shade, value]) => {
          root.style.setProperty(`--neutral-${shade}`, value as string);
        });

        // Semantic colors
        Object.entries(colorPalette.success).forEach(([shade, value]) => {
          root.style.setProperty(`--success-${shade}`, value as string);
        });

        Object.entries(colorPalette.warning).forEach(([shade, value]) => {
          root.style.setProperty(`--warning-${shade}`, value as string);
        });

        Object.entries(colorPalette.error).forEach(([shade, value]) => {
          root.style.setProperty(`--error-${shade}`, value as string);
        });

        Object.entries(colorPalette.info).forEach(([shade, value]) => {
          root.style.setProperty(`--info-${shade}`, value as string);
        });

        // Typography
        root.style.setProperty("--font-family", theme.typography.family);
        Object.entries(theme.typography.sizes).forEach(([size, value]) => {
          root.style.setProperty(`--font-size-${size}`, value as string);
        });

        // Layout
        root.style.setProperty("--max-width", theme.layout.maxWidth);
        Object.entries(theme.layout.borderRadius).forEach(([size, value]) => {
          root.style.setProperty(`--border-radius-${size}`, value as string);
        });

        // Animation
        root.style.setProperty(
          "--animation-duration-fast",
          theme.animation.duration.fast
        );
        root.style.setProperty(
          "--animation-duration-normal",
          theme.animation.duration.normal
        );
        root.style.setProperty(
          "--animation-duration-slow",
          theme.animation.duration.slow
        );

        // Set data attributes for styling
        root.setAttribute("data-theme", theme.id);
        root.setAttribute("data-animation-type", theme.animation.type);
        root.setAttribute("data-layout-type", theme.layout.type);

        // Apply custom CSS if provided
        if (theme.customCSS) {
          let customStyleElement = document.getElementById(
            "custom-theme-styles"
          );
          if (!customStyleElement) {
            customStyleElement = document.createElement("style");
            customStyleElement.id = "custom-theme-styles";
            document.head.appendChild(customStyleElement);
          }
          customStyleElement.textContent = theme.customCSS;
        }
      },
    }),
    {
      name: "saas-theme-store",
      storage: createJSONStorage(() => localStorage),
      // Only persist some state, not functions
      partialize: (state) => ({
        activeTheme: state.activeTheme,
        isDarkMode: state.isDarkMode,
        currentUser: state.currentUser,
      }),
    }
  )
);

// =============================================================================
// UTILITY HOOKS
// =============================================================================

/**
 * Hook for admin-only access to theme customization
 */
export const useAdminThemeAccess = () => {
  const isAdmin = useThemeStore((state) => state.isAdmin);
  const error = useThemeStore((state) => state.error);

  return {
    isAdmin,
    hasAccess: isAdmin,
    error: !isAdmin ? "Admin access required" : error,
  };
};

/**
 * Hook for theme application (read-only for customers)
 */
export const useActiveTheme = () => {
  const activeTheme = useThemeStore((state) => state.activeTheme);
  const previewTheme = useThemeStore((state) => state.previewTheme);
  const isPreviewMode = useThemeStore((state) => state.isPreviewMode);
  const isAdmin = useThemeStore((state) => state.isAdmin);

  // Return preview theme for admins in preview mode, otherwise active theme
  const currentTheme = isAdmin && isPreviewMode ? previewTheme : activeTheme;

  return {
    theme: currentTheme,
    isPreviewMode: isAdmin && isPreviewMode,
    isLoading: useThemeStore((state) => state.isLoading),
  };
};

/**
 * Hook for customer dark mode toggle
 */
export const useDarkModeToggle = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

  return {
    isDarkMode,
    toggleDarkMode,
  };
};
