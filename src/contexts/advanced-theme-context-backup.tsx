"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useTheme } from "next-themes";
import { ThemeConfig, ThemeContextType, ThemeHistory, PRESET_THEMES } from "@/types/advanced-theme";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function AdvancedThemeProvider({ children }: ThemeProviderProps) {
  const { theme: nextTheme, setTheme: setNextTheme, resolvedTheme } = useTheme();
  
  // State
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig | null>(null);
  const [themes, setThemes] = useState<ThemeConfig[]>([]);
  const [history, setHistory] = useState<ThemeHistory[]>([]);
  const [previewTheme, setPreviewTheme] = useState<ThemeConfig | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Initialize themes on mount
  useEffect(() => {
    loadThemes();
  }, []);

  // Apply theme to DOM when current theme or mode changes
  useEffect(() => {
    const applyThemeToDOM = (theme: ThemeConfig) => {
      if (typeof window === "undefined") return;

      const root = document.documentElement;

      // Apply colors
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--theme-${key}`, value);
      });

      // Apply typography
      root.style.setProperty("--theme-font-family", theme.typography.fontFamily);
      root.style.setProperty("--theme-font-size", theme.typography.fontSize);
      root.style.setProperty("--theme-heading-scale", theme.typography.headingScale.toString());
      root.style.setProperty("--theme-line-height", theme.typography.lineHeight.toString());
      root.style.setProperty("--theme-letter-spacing", `${theme.typography.letterSpacing}em`);

      // Apply components
      root.style.setProperty("--theme-border-radius", theme.components.borderRadius);
      root.style.setProperty("--theme-container-width", theme.components.containerWidth);

      // Apply layout
      Object.entries(theme.layout.spacing).forEach(([key, value]) => {
        root.style.setProperty(`--theme-spacing-${key}`, value);
      });

      // Set data attributes for CSS selectors
      root.setAttribute("data-theme-id", theme.id);
      root.setAttribute("data-button-style", theme.components.buttonStyle);
      root.setAttribute("data-input-style", theme.components.inputStyle);
      root.setAttribute("data-card-style", theme.components.cardStyle);
      root.setAttribute("data-shadow", theme.components.shadow);

      // Load Google Font if needed
      loadGoogleFont(theme.typography.fontFamily);
    };

    const themeToApply = isPreviewMode ? previewTheme : currentTheme;
    if (themeToApply) {
      applyThemeToDOM(themeToApply);
    }
  }, [currentTheme, previewTheme, isPreviewMode, resolvedTheme]);

  const loadGoogleFont = (fontFamily: string) => {
    if (fontFamily === "system" || fontFamily.includes("sans-serif") || fontFamily.includes("serif")) {
      return; // Skip system fonts
    }

    const fontLink = document.getElementById("google-font") as HTMLLinkElement;
    const fontName = fontFamily.replace(/\s+/g, "+");
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName}:wght@300;400;500;600;700&display=swap`;

    if (fontLink) {
      fontLink.href = fontUrl;
    } else {
      const link = document.createElement("link");
      link.id = "google-font";
      link.rel = "stylesheet";
      link.href = fontUrl;
      document.head.appendChild(link);
    }
  };
    try {
      setIsLoading(true);
      
      // Load built-in themes
      const builtInThemes: ThemeConfig[] = PRESET_THEMES.map((preset, index) => ({
        ...preset,
        id: `builtin-${index}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: "system"
      }));

      // Load custom themes from localStorage
      const savedThemes = localStorage.getItem("custom-themes");
      const customThemes: ThemeConfig[] = savedThemes ? JSON.parse(savedThemes) : [];

      const allThemes = [...builtInThemes, ...customThemes];
      setThemes(allThemes);

      // Load active theme
      const activeThemeId = localStorage.getItem("active-theme-id");
      const activeTheme = allThemes.find(t => t.id === activeThemeId) || allThemes[0];
      
      if (activeTheme) {
        setCurrentTheme(activeTheme);
      }

    } catch (err) {
      setError("Failed to load themes");
      console.error("Theme loading error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const applyThemeToDOM = (theme: ThemeConfig) => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;

    // Apply colors
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });

    // Apply typography
    root.style.setProperty("--theme-font-family", theme.typography.fontFamily);
    root.style.setProperty("--theme-font-size", theme.typography.fontSize);
    root.style.setProperty("--theme-heading-scale", theme.typography.headingScale.toString());
    root.style.setProperty("--theme-line-height", theme.typography.lineHeight.toString());
    root.style.setProperty("--theme-letter-spacing", `${theme.typography.letterSpacing}em`);

    // Apply components
    root.style.setProperty("--theme-border-radius", theme.components.borderRadius);
    root.style.setProperty("--theme-container-width", theme.components.containerWidth);

    // Apply layout
    Object.entries(theme.layout.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--theme-spacing-${key}`, value);
    });

    // Set data attributes for CSS selectors
    root.setAttribute("data-theme-id", theme.id);
    root.setAttribute("data-button-style", theme.components.buttonStyle);
    root.setAttribute("data-input-style", theme.components.inputStyle);
    root.setAttribute("data-card-style", theme.components.cardStyle);
    root.setAttribute("data-shadow", theme.components.shadow);

    // Load Google Font if needed
    loadGoogleFont(theme.typography.fontFamily);
  };

  const loadGoogleFont = (fontFamily: string) => {
    if (fontFamily === "system" || fontFamily.includes("sans-serif") || fontFamily.includes("serif")) {
      return; // Skip system fonts
    }

    const fontLink = document.getElementById("google-font") as HTMLLinkElement;
    const fontName = fontFamily.replace(/\s+/g, "+");
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName}:wght@300;400;500;600;700&display=swap`;

    if (fontLink) {
      fontLink.href = fontUrl;
    } else {
      const link = document.createElement("link");
      link.id = "google-font";
      link.rel = "stylesheet";
      link.href = fontUrl;
      document.head.appendChild(link);
    }
  };

  const addToHistory = (action: ThemeHistory["action"], theme: ThemeConfig, description: string) => {
    const historyEntry: ThemeHistory = {
      id: `history-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action,
      theme: { ...theme },
      description
    };

    setHistory(prev => {
      const newHistory = [...prev, historyEntry].slice(-50); // Keep last 50 entries
      return newHistory;
    });
    setHistoryIndex(prev => prev + 1);
  };

  const saveCustomThemes = (updatedThemes: ThemeConfig[]) => {
    const customThemes = updatedThemes.filter(t => !t.isBuiltIn);
    localStorage.setItem("custom-themes", JSON.stringify(customThemes));
  };

  const createTheme = async (themeData: Omit<ThemeConfig, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setIsLoading(true);
      
      const newTheme: ThemeConfig = {
        ...themeData,
        id: `custom-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const updatedThemes = [...themes, newTheme];
      setThemes(updatedThemes);
      saveCustomThemes(updatedThemes);
      
      addToHistory("create", newTheme, `Created theme "${newTheme.name}"`);
      
    } catch (err) {
      setError("Failed to create theme");
      console.error("Theme creation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTheme = async (id: string, updates: Partial<ThemeConfig>) => {
    try {
      setIsLoading(true);
      
      const updatedThemes = themes.map(theme => 
        theme.id === id 
          ? { ...theme, ...updates, updatedAt: new Date().toISOString() }
          : theme
      );
      
      setThemes(updatedThemes);
      saveCustomThemes(updatedThemes);
      
      // Update current theme if it's the one being updated
      if (currentTheme?.id === id) {
        const updatedTheme = updatedThemes.find(t => t.id === id);
        if (updatedTheme) {
          setCurrentTheme(updatedTheme);
        }
      }
      
      const updatedTheme = updatedThemes.find(t => t.id === id);
      if (updatedTheme) {
        addToHistory("update", updatedTheme, `Updated theme "${updatedTheme.name}"`);
      }
      
    } catch (err) {
      setError("Failed to update theme");
      console.error("Theme update error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTheme = async (id: string) => {
    try {
      setIsLoading(true);
      
      const themeToDelete = themes.find(t => t.id === id);
      if (!themeToDelete) {
        throw new Error("Theme not found");
      }
      
      if (themeToDelete.isBuiltIn) {
        throw new Error("Cannot delete built-in themes");
      }
      
      if (currentTheme?.id === id) {
        throw new Error("Cannot delete the currently active theme");
      }
      
      const updatedThemes = themes.filter(t => t.id !== id);
      setThemes(updatedThemes);
      saveCustomThemes(updatedThemes);
      
      addToHistory("delete", themeToDelete, `Deleted theme "${themeToDelete.name}"`);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete theme");
      console.error("Theme deletion error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const applyTheme = async (id: string) => {
    try {
      const theme = themes.find(t => t.id === id);
      if (!theme) {
        throw new Error("Theme not found");
      }
      
      setCurrentTheme(theme);
      localStorage.setItem("active-theme-id", id);
      
      // Update next-themes mode if different
      if (theme.mode !== "system" && theme.mode !== nextTheme) {
        setNextTheme(theme.mode);
      }
      
      addToHistory("apply", theme, `Applied theme "${theme.name}"`);
      
    } catch (err) {
      setError("Failed to apply theme");
      console.error("Theme application error:", err);
    }
  };

  const duplicateTheme = async (id: string, newName: string) => {
    try {
      const originalTheme = themes.find(t => t.id === id);
      if (!originalTheme) {
        throw new Error("Theme not found");
      }
      
      await createTheme({
        ...originalTheme,
        name: newName,
        description: `Copy of ${originalTheme.name}`,
        isBuiltIn: false,
        createdBy: "user"
      });
      
    } catch (err) {
      setError("Failed to duplicate theme");
      console.error("Theme duplication error:", err);
    }
  };

  const exportTheme = (id: string) => {
    const theme = themes.find(t => t.id === id);
    if (!theme) return;

    const exportData = {
      theme,
      exportedAt: new Date().toISOString(),
      version: "2.0.0"
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${theme.name.toLowerCase().replace(/\s+/g, "-")}-theme.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importTheme = async (file: File) => {
    try {
      setIsLoading(true);
      
      const text = await file.text();
      const importData = JSON.parse(text);
      
      if (!importData.theme) {
        throw new Error("Invalid theme file format");
      }
      
      await createTheme({
        ...importData.theme,
        name: `${importData.theme.name} (Imported)`,
        isBuiltIn: false,
        createdBy: "user"
      });
      
    } catch (err) {
      setError("Failed to import theme");
      console.error("Theme import error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const undoLastChange = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      // Implement undo logic based on history
    }
  };

  const redoLastChange = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      // Implement redo logic based on history
    }
  };

  const contextValue: ThemeContextType = {
    currentTheme,
    themes,
    mode: resolvedTheme as 'light' | 'dark' | 'system',
    createTheme,
    updateTheme,
    deleteTheme,
    applyTheme,
    duplicateTheme,
    exportTheme,
    importTheme,
    history,
    undoLastChange,
    redoLastChange,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
    previewTheme,
    setPreviewTheme: (theme) => {
      setPreviewTheme(theme);
      setIsPreviewMode(!!theme);
    },
    isPreviewMode,
    isLoading,
    error
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAdvancedTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useAdvancedTheme must be used within an AdvancedThemeProvider");
  }
  return context;
}
