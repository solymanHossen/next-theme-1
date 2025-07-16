"use client";

import React, { useEffect, useCallback } from "react";
import { useEnterpriseTheme } from "@/contexts/enterprise-theme-context";
import { ThemeConfig } from "@/types/advanced-theme";

interface DynamicThemeProviderProps {
  children: React.ReactNode;
}

export function DynamicThemeProvider({ children }: DynamicThemeProviderProps) {
  const { currentTheme, previewTheme, isPreviewMode } = useEnterpriseTheme();

  const applyThemeToDOM = useCallback(
    (theme: ThemeConfig) => {
      if (typeof window === "undefined") return;

      const root = document.documentElement;

      // Apply primary color variants
      if (theme.colors.primary) {
        root.style.setProperty("--theme-primary", theme.colors.primary);
        root.style.setProperty("--color-primary", theme.colors.primary);
        root.style.setProperty("--primary-500", theme.colors.primary);
      }

      // Apply all color shades
      Object.entries(theme.colors).forEach(([key, value]) => {
        if (value) {
          // Set theme-specific variables
          root.style.setProperty(`--theme-${key}`, value);

          // Set standard color variables
          if (key.includes("-")) {
            root.style.setProperty(`--${key}`, value);
          } else {
            root.style.setProperty(`--${key}-500`, value);
          }

          // Set RGB values for Tailwind compatibility
          const rgb = hexToRgb(value);
          if (rgb) {
            root.style.setProperty(
              `--${key}-rgb`,
              `${rgb.r} ${rgb.g} ${rgb.b}`
            );
            root.style.setProperty(
              `--theme-${key}-rgb`,
              `${rgb.r} ${rgb.g} ${rgb.b}`
            );
          }
        }
      });

      // Apply typography settings
      if (theme.typography) {
        root.style.setProperty(
          "--theme-font-family",
          theme.typography.fontFamily
        );
        root.style.setProperty("--font-family", theme.typography.fontFamily);

        if (theme.typography.headingFont) {
          root.style.setProperty(
            "--theme-heading-font",
            theme.typography.headingFont
          );
        }

        if (theme.typography.baseFontSize) {
          root.style.setProperty(
            "--theme-font-size",
            theme.typography.baseFontSize
          );
          root.style.setProperty(
            "--font-size-base",
            theme.typography.baseFontSize
          );
        }

        if (theme.typography.headingScale) {
          root.style.setProperty(
            "--theme-heading-scale",
            theme.typography.headingScale.toString()
          );
        }

        // Apply font sizes
        if (theme.typography.fontSizes) {
          Object.entries(theme.typography.fontSizes).forEach(
            ([size, value]) => {
              root.style.setProperty(`--font-size-${size}`, value);
              root.style.setProperty(`--theme-font-size-${size}`, value);
            }
          );
        }

        // Apply font weights
        if (theme.typography.fontWeights) {
          Object.entries(theme.typography.fontWeights).forEach(
            ([weight, value]) => {
              root.style.setProperty(
                `--font-weight-${weight}`,
                value.toString()
              );
              root.style.setProperty(
                `--theme-font-weight-${weight}`,
                value.toString()
              );
            }
          );
        }

        // Apply line heights
        if (theme.typography.lineHeights) {
          Object.entries(theme.typography.lineHeights).forEach(
            ([height, value]) => {
              root.style.setProperty(
                `--line-height-${height}`,
                value.toString()
              );
              root.style.setProperty(
                `--theme-line-height-${height}`,
                value.toString()
              );
            }
          );
        }

        // Apply letter spacing
        if (theme.typography.letterSpacing) {
          Object.entries(theme.typography.letterSpacing).forEach(
            ([spacing, value]) => {
              root.style.setProperty(`--letter-spacing-${spacing}`, value);
              root.style.setProperty(
                `--theme-letter-spacing-${spacing}`,
                value
              );
            }
          );
        }
      }

      // Apply spacing values
      if (theme.spacing) {
        Object.entries(theme.spacing).forEach(([size, value]) => {
          root.style.setProperty(`--spacing-${size}`, value);
          root.style.setProperty(`--theme-spacing-${size}`, value);
        });
      }

      // Apply border radius values
      if (theme.borderRadius) {
        Object.entries(theme.borderRadius).forEach(([size, value]) => {
          root.style.setProperty(`--border-radius-${size}`, value);
          root.style.setProperty(`--theme-border-radius-${size}`, value);
        });

        // Set default border radius
        if (theme.borderRadius.base) {
          root.style.setProperty(
            "--theme-border-radius",
            theme.borderRadius.base
          );
        }
      }

      // Apply shadow values
      if (theme.shadows) {
        Object.entries(theme.shadows).forEach(([size, value]) => {
          root.style.setProperty(`--shadow-${size}`, value);
          root.style.setProperty(`--theme-shadow-${size}`, value);
        });
      }

      // Apply transition values
      if (theme.transitions) {
        if (theme.transitions.duration) {
          Object.entries(theme.transitions.duration).forEach(
            ([speed, value]) => {
              root.style.setProperty(`--duration-${speed}`, value);
              root.style.setProperty(`--theme-duration-${speed}`, value);
            }
          );
        }

        if (theme.transitions.timing) {
          Object.entries(theme.transitions.timing).forEach(
            ([timing, value]) => {
              root.style.setProperty(`--timing-${timing}`, value);
              root.style.setProperty(`--theme-timing-${timing}`, value);
            }
          );
        }
      }

      // Apply z-index values
      if (theme.zIndex) {
        Object.entries(theme.zIndex).forEach(([level, value]) => {
          root.style.setProperty(`--z-${level}`, value.toString());
          root.style.setProperty(`--theme-z-${level}`, value.toString());
        });
      }

      // Apply layout values
      if (theme.layout) {
        if (theme.layout.containers) {
          Object.entries(theme.layout.containers).forEach(([size, value]) => {
            root.style.setProperty(`--container-${size}`, value);
            root.style.setProperty(`--theme-container-${size}`, value);
          });
        }

        if (theme.layout.sidebar) {
          root.style.setProperty("--sidebar-width", theme.layout.sidebar.width);
          root.style.setProperty(
            "--theme-sidebar-width",
            theme.layout.sidebar.width
          );

          if (theme.layout.sidebar.collapsedWidth) {
            root.style.setProperty(
              "--sidebar-collapsed-width",
              theme.layout.sidebar.collapsedWidth
            );
            root.style.setProperty(
              "--theme-sidebar-collapsed-width",
              theme.layout.sidebar.collapsedWidth
            );
          }
        }

        if (theme.layout.header) {
          root.style.setProperty("--header-height", theme.layout.header.height);
          root.style.setProperty(
            "--theme-header-height",
            theme.layout.header.height
          );
        }

        if (theme.layout.footer) {
          root.style.setProperty("--footer-height", theme.layout.footer.height);
          root.style.setProperty(
            "--theme-footer-height",
            theme.layout.footer.height
          );
        }

        if (theme.layout.grid) {
          root.style.setProperty(
            "--grid-columns",
            theme.layout.grid.columns.toString()
          );
          root.style.setProperty(
            "--theme-grid-columns",
            theme.layout.grid.columns.toString()
          );

          if (theme.layout.grid.gutter) {
            root.style.setProperty("--grid-gutter", theme.layout.grid.gutter);
            root.style.setProperty(
              "--theme-grid-gutter",
              theme.layout.grid.gutter
            );
          }
        }
      }

      // Set theme metadata attributes
      root.setAttribute("data-theme-id", theme.id);
      root.setAttribute("data-theme-name", theme.name);
      root.setAttribute("data-theme-mode", theme.mode);

      if (isPreviewMode) {
        root.setAttribute("data-preview-mode", "true");
      } else {
        root.removeAttribute("data-preview-mode");
      }

      // Load Google Fonts dynamically
      loadGoogleFont(theme.typography.fontFamily);
      if (
        theme.typography.headingFont &&
        theme.typography.headingFont !== theme.typography.fontFamily
      ) {
        loadGoogleFont(theme.typography.headingFont);
      }
      if (
        theme.typography.monoFont &&
        theme.typography.monoFont !== theme.typography.fontFamily
      ) {
        loadGoogleFont(theme.typography.monoFont);
      }

      // Trigger a custom event for theme change
      window.dispatchEvent(
        new CustomEvent("themeChange", {
          detail: { theme, isPreview: isPreviewMode },
        })
      );
    },
    [isPreviewMode]
  );

  // Helper function to convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  // Helper function to load Google Fonts
  const loadGoogleFont = (fontFamily: string) => {
    if (
      !fontFamily ||
      fontFamily === "system-ui" ||
      fontFamily === "sans-serif"
    )
      return;

    const fontLink = document.querySelector(`link[href*="${fontFamily}"]`);
    if (fontLink) return; // Font already loaded

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
      /\s+/g,
      "+"
    )}:wght@300;400;500;600;700&display=swap`;
    document.head.appendChild(link);
  };

  // Apply theme when it changes
  useEffect(() => {
    const themeToApply = isPreviewMode ? previewTheme : currentTheme;
    if (themeToApply) {
      applyThemeToDOM(themeToApply);
    }
  }, [currentTheme, previewTheme, isPreviewMode, applyThemeToDOM]);

  return <>{children}</>;
}
