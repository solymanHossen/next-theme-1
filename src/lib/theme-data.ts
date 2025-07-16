/**
 * Dummy Theme Data & API Utilities
 *
 * Provides 10 modern, diverse themes for fallback when API is unavailable.
 * Each theme represents a different aesthetic and use case.
 */

import { ThemeConfig, ColorPalette, ColorShade } from "@/types/saas-theme";

// =============================================================================
// COLOR PALETTE GENERATORS
// =============================================================================

// Function to generate color shades from a base color
const createColorShade = (baseHex: string): ColorShade => {
  // Convert hex to RGB
  const hex = baseHex.replace("#", "");
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
    500: baseHex,
    600: darken(0.1),
    700: darken(0.2),
    800: darken(0.3),
    900: darken(0.4),
    950: darken(0.5),
  };
};

// =============================================================================
// DUMMY COLOR PALETTES
// =============================================================================

const modernPalettes: Omit<
  ColorPalette,
  | "primary"
  | "secondary"
  | "accent"
  | "neutral"
  | "success"
  | "warning"
  | "error"
  | "info"
>[] = [
  { id: "ocean-breeze", name: "Ocean Breeze" },
  { id: "sunset-glow", name: "Sunset Glow" },
  { id: "forest-green", name: "Forest Green" },
  { id: "royal-purple", name: "Royal Purple" },
  { id: "cherry-blossom", name: "Cherry Blossom" },
  { id: "midnight-blue", name: "Midnight Blue" },
  { id: "golden-hour", name: "Golden Hour" },
  { id: "arctic-white", name: "Arctic White" },
  { id: "terracotta", name: "Terracotta" },
  { id: "neon-cyber", name: "Neon Cyber" },
];

// =============================================================================
// DUMMY THEMES
// =============================================================================

export const DUMMY_THEMES: ThemeConfig[] = [
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    description: "Clean, minimal design perfect for luxury brands",
    version: "1.0.0",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "system",
    isActive: true,

    colorPalette: {
      id: "ocean-breeze",
      name: "Ocean Breeze",
      primary: createColorShade("#0ea5e9"),
      secondary: createColorShade("#64748b"),
      accent: createColorShade("#06b6d4"),
      neutral: createColorShade("#64748b"),
      success: createColorShade("#10b981"),
      warning: createColorShade("#f59e0b"),
      error: createColorShade("#ef4444"),
      info: createColorShade("#3b82f6"),
    },

    typography: {
      family: "Inter, system-ui, sans-serif",
      weights: [300, 400, 500, 600, 700],
      sizes: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
      },
      lineHeights: {
        tight: "1.25",
        normal: "1.5",
        relaxed: "1.75",
      },
      letterSpacing: {
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
      },
    },

    animation: {
      type: "smooth",
      duration: {
        fast: "150ms",
        normal: "300ms",
        slow: "500ms",
      },
      easing: {
        ease: "ease",
        easeIn: "ease-in",
        easeOut: "ease-out",
        easeInOut: "ease-in-out",
      },
      scale: {
        enter: "1.02",
        exit: "0.98",
      },
    },

    layout: {
      type: "boxed",
      maxWidth: "1440px",
      padding: {
        mobile: "1rem",
        tablet: "2rem",
        desktop: "3rem",
      },
      gaps: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
      borderRadius: {
        none: "0",
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        full: "9999px",
      },
    },

    buttons: {
      sizes: {
        sm: { padding: "0.5rem 1rem", fontSize: "0.875rem", height: "2rem" },
        md: { padding: "0.75rem 1.5rem", fontSize: "1rem", height: "2.5rem" },
        lg: { padding: "1rem 2rem", fontSize: "1.125rem", height: "3rem" },
      },
      variants: {
        primary: "bg-primary hover:bg-primary/90 text-primary-foreground",
        secondary:
          "bg-secondary hover:bg-secondary/90 text-secondary-foreground",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
      },
      borderRadius: "0.5rem",
    },

    inputs: {
      sizes: {
        sm: "2rem",
        md: "2.5rem",
        lg: "3rem",
      },
      borderRadius: "0.5rem",
      borderWidth: "1px",
      focusRing: "2px",
    },

    cards: {
      padding: "1.5rem",
      borderRadius: "0.75rem",
      shadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
      border: "1px solid hsl(var(--border))",
      hover: {
        shadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
        transform: "translateY(-2px)",
      },
    },

    hero: {
      style: "centered",
      height: "80vh",
      backgroundType: "gradient",
      backgroundValue:
        "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)",
      titleSize: "3.75rem",
      subtitleSize: "1.25rem",
      buttonLayout: "horizontal",
    },

    productGrid: {
      style: "cards",
      columns: { mobile: 1, tablet: 2, desktop: 3 },
      aspectRatio: "4/5",
      spacing: "1.5rem",
      showQuickView: true,
      showWishlist: true,
      showCompare: false,
    },

    darkMode: {
      enabled: true,
      default: "light",
    },
  },

  {
    id: "vibrant-energy",
    name: "Vibrant Energy",
    description: "Bold, energetic design for lifestyle brands",
    version: "1.0.0",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "system",
    isActive: false,

    colorPalette: {
      id: "sunset-glow",
      name: "Sunset Glow",
      primary: createColorShade("#f97316"),
      secondary: createColorShade("#ec4899"),
      accent: createColorShade("#8b5cf6"),
      neutral: createColorShade("#6b7280"),
      success: createColorShade("#10b981"),
      warning: createColorShade("#f59e0b"),
      error: createColorShade("#ef4444"),
      info: createColorShade("#3b82f6"),
    },

    typography: {
      family: "Poppins, system-ui, sans-serif",
      weights: [400, 500, 600, 700, 800],
      sizes: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "2.5rem",
        "5xl": "3.5rem",
        "6xl": "4rem",
      },
      lineHeights: {
        tight: "1.2",
        normal: "1.5",
        relaxed: "1.8",
      },
      letterSpacing: {
        tight: "-0.05em",
        normal: "0em",
        wide: "0.05em",
      },
    },

    animation: {
      type: "bounce",
      duration: {
        fast: "200ms",
        normal: "400ms",
        slow: "600ms",
      },
      easing: {
        ease: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        easeIn: "ease-in",
        easeOut: "ease-out",
        easeInOut: "ease-in-out",
      },
      scale: {
        enter: "1.05",
        exit: "0.95",
      },
    },

    layout: {
      type: "full-width",
      maxWidth: "100%",
      padding: {
        mobile: "1rem",
        tablet: "2rem",
        desktop: "4rem",
      },
      gaps: {
        xs: "0.75rem",
        sm: "1.25rem",
        md: "2rem",
        lg: "2.5rem",
        xl: "4rem",
      },
      borderRadius: {
        none: "0",
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "2.5rem",
        "3xl": "3rem",
        full: "9999px",
      },
    },

    buttons: {
      sizes: {
        sm: {
          padding: "0.75rem 1.25rem",
          fontSize: "0.875rem",
          height: "2.25rem",
        },
        md: { padding: "1rem 2rem", fontSize: "1rem", height: "3rem" },
        lg: {
          padding: "1.25rem 2.5rem",
          fontSize: "1.125rem",
          height: "3.5rem",
        },
      },
      variants: {
        primary:
          "bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white",
        secondary:
          "bg-secondary hover:bg-secondary/90 text-secondary-foreground",
        outline: "border-2 border-primary hover:bg-primary hover:text-white",
        ghost: "hover:bg-primary/10 hover:text-primary",
        destructive: "bg-error hover:bg-error/90 text-white",
      },
      borderRadius: "1rem",
    },

    inputs: {
      sizes: {
        sm: "2.25rem",
        md: "3rem",
        lg: "3.5rem",
      },
      borderRadius: "1rem",
      borderWidth: "2px",
      focusRing: "3px",
    },

    cards: {
      padding: "2rem",
      borderRadius: "1.5rem",
      shadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      border: "2px solid hsl(var(--border))",
      hover: {
        shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
        transform: "translateY(-4px) scale(1.02)",
      },
    },

    hero: {
      style: "split",
      height: "100vh",
      backgroundType: "gradient",
      backgroundValue:
        "linear-gradient(45deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 50%, hsl(var(--secondary)) 100%)",
      titleSize: "4rem",
      subtitleSize: "1.5rem",
      buttonLayout: "stacked",
    },

    productGrid: {
      style: "masonry",
      columns: { mobile: 2, tablet: 3, desktop: 4 },
      aspectRatio: "auto",
      spacing: "2rem",
      showQuickView: true,
      showWishlist: true,
      showCompare: true,
    },

    darkMode: {
      enabled: true,
      default: "system",
    },
  },

  // Additional 8 themes would go here...
  // For brevity, I'll add a few more key ones:

  {
    id: "luxury-elegance",
    name: "Luxury Elegance",
    description: "Sophisticated design for premium brands",
    version: "1.0.0",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "system",
    isActive: false,

    colorPalette: {
      id: "midnight-blue",
      name: "Midnight Blue",
      primary: createColorShade("#1e293b"),
      secondary: createColorShade("#d4af37"),
      accent: createColorShade("#94a3b8"),
      neutral: createColorShade("#64748b"),
      success: createColorShade("#10b981"),
      warning: createColorShade("#f59e0b"),
      error: createColorShade("#ef4444"),
      info: createColorShade("#3b82f6"),
    },

    typography: {
      family: "Playfair Display, Georgia, serif",
      weights: [400, 500, 600, 700],
      sizes: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
      },
      lineHeights: {
        tight: "1.25",
        normal: "1.6",
        relaxed: "1.8",
      },
      letterSpacing: {
        tight: "-0.025em",
        normal: "0em",
        wide: "0.05em",
      },
    },

    animation: {
      type: "fade",
      duration: {
        fast: "200ms",
        normal: "500ms",
        slow: "800ms",
      },
      easing: {
        ease: "cubic-bezier(0.4, 0, 0.2, 1)",
        easeIn: "ease-in",
        easeOut: "ease-out",
        easeInOut: "ease-in-out",
      },
      scale: {
        enter: "1.01",
        exit: "0.99",
      },
    },

    layout: {
      type: "boxed",
      maxWidth: "1200px",
      padding: {
        mobile: "1.5rem",
        tablet: "2.5rem",
        desktop: "4rem",
      },
      gaps: {
        xs: "1rem",
        sm: "1.5rem",
        md: "2rem",
        lg: "3rem",
        xl: "4rem",
      },
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        md: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
    },

    buttons: {
      sizes: {
        sm: {
          padding: "0.5rem 1.5rem",
          fontSize: "0.875rem",
          height: "2.5rem",
        },
        md: { padding: "0.75rem 2rem", fontSize: "1rem", height: "3rem" },
        lg: { padding: "1rem 2.5rem", fontSize: "1.125rem", height: "3.5rem" },
      },
      variants: {
        primary:
          "bg-primary hover:bg-primary/90 text-white border border-primary",
        secondary:
          "bg-transparent hover:bg-secondary/10 text-secondary border border-secondary",
        outline: "border border-primary hover:bg-primary hover:text-white",
        ghost: "hover:bg-primary/5 hover:text-primary",
        destructive: "bg-error hover:bg-error/90 text-white",
      },
      borderRadius: "0.25rem",
    },

    inputs: {
      sizes: {
        sm: "2.5rem",
        md: "3rem",
        lg: "3.5rem",
      },
      borderRadius: "0.25rem",
      borderWidth: "1px",
      focusRing: "2px",
    },

    cards: {
      padding: "2rem",
      borderRadius: "0.5rem",
      shadow: "0 2px 4px -1px rgb(0 0 0 / 0.1)",
      border: "1px solid hsl(var(--border))",
      hover: {
        shadow: "0 8px 12px -2px rgb(0 0 0 / 0.1)",
        transform: "translateY(-1px)",
      },
    },

    hero: {
      style: "minimal",
      height: "70vh",
      backgroundType: "solid",
      backgroundValue: "hsl(var(--background))",
      titleSize: "3rem",
      subtitleSize: "1.125rem",
      buttonLayout: "horizontal",
    },

    productGrid: {
      style: "list",
      columns: { mobile: 1, tablet: 2, desktop: 2 },
      aspectRatio: "16/9",
      spacing: "2rem",
      showQuickView: false,
      showWishlist: true,
      showCompare: false,
    },

    darkMode: {
      enabled: true,
      default: "dark",
    },
  },

  {
    id: "forest-nature",
    name: "Forest Nature",
    description: "Organic, earth-toned design for eco-friendly brands",
    version: "1.0.0",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "system",
    isActive: false,

    colorPalette: {
      id: "forest-green",
      name: "Forest Green",
      primary: createColorShade("#22c55e"),
      secondary: createColorShade("#84cc16"),
      accent: createColorShade("#eab308"),
      neutral: createColorShade("#78716c"),
      success: createColorShade("#10b981"),
      warning: createColorShade("#f59e0b"),
      error: createColorShade("#ef4444"),
      info: createColorShade("#06b6d4"),
    },

    typography: {
      family: "Roboto, system-ui, sans-serif",
      weights: [300, 400, 500, 600],
      sizes: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
      },
      lineHeights: {
        tight: "1.25",
        normal: "1.5",
        relaxed: "1.75",
      },
      letterSpacing: {
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
      },
    },

    animation: {
      type: "smooth",
      duration: {
        fast: "250ms",
        normal: "350ms",
        slow: "500ms",
      },
      easing: {
        ease: "ease",
        easeIn: "ease-in",
        easeOut: "ease-out",
        easeInOut: "ease-in-out",
      },
      scale: {
        enter: "1.03",
        exit: "0.97",
      },
    },

    layout: {
      type: "boxed",
      maxWidth: "1300px",
      padding: {
        mobile: "1rem",
        tablet: "2rem",
        desktop: "3rem",
      },
      gaps: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
      borderRadius: {
        none: "0",
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        full: "9999px",
      },
    },

    buttons: {
      sizes: {
        sm: { padding: "0.5rem 1rem", fontSize: "0.875rem", height: "2rem" },
        md: { padding: "0.75rem 1.5rem", fontSize: "1rem", height: "2.5rem" },
        lg: { padding: "1rem 2rem", fontSize: "1.125rem", height: "3rem" },
      },
      variants: {
        primary: "bg-primary hover:bg-primary/90 text-white",
        secondary: "bg-secondary hover:bg-secondary/90 text-white",
        outline: "border border-primary hover:bg-primary hover:text-white",
        ghost: "hover:bg-primary/10 hover:text-primary",
        destructive: "bg-error hover:bg-error/90 text-white",
      },
      borderRadius: "0.5rem",
    },

    inputs: {
      sizes: {
        sm: "2rem",
        md: "2.5rem",
        lg: "3rem",
      },
      borderRadius: "0.5rem",
      borderWidth: "1px",
      focusRing: "2px",
    },

    cards: {
      padding: "1.5rem",
      borderRadius: "0.75rem",
      shadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
      border: "1px solid hsl(var(--border))",
      hover: {
        shadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
        transform: "translateY(-2px)",
      },
    },

    hero: {
      style: "centered",
      height: "85vh",
      backgroundType: "gradient",
      backgroundValue: "linear-gradient(135deg, #22c55e 0%, #84cc16 100%)",
      titleSize: "3.5rem",
      subtitleSize: "1.25rem",
      buttonLayout: "horizontal",
    },

    productGrid: {
      style: "cards",
      columns: { mobile: 1, tablet: 2, desktop: 3 },
      aspectRatio: "1/1",
      spacing: "1.5rem",
      showQuickView: true,
      showWishlist: true,
      showCompare: false,
    },

    darkMode: {
      enabled: true,
      default: "light",
    },
  },

  {
    id: "royal-purple",
    name: "Royal Purple",
    description: "Majestic design with rich purple tones",
    version: "1.0.0",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "system",
    isActive: false,

    colorPalette: {
      id: "royal-purple",
      name: "Royal Purple",
      primary: createColorShade("#7c3aed"),
      secondary: createColorShade("#a855f7"),
      accent: createColorShade("#c084fc"),
      neutral: createColorShade("#6b7280"),
      success: createColorShade("#10b981"),
      warning: createColorShade("#f59e0b"),
      error: createColorShade("#ef4444"),
      info: createColorShade("#3b82f6"),
    },

    typography: {
      family: "Montserrat, system-ui, sans-serif",
      weights: [400, 500, 600, 700, 800],
      sizes: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
      },
      lineHeights: {
        tight: "1.25",
        normal: "1.5",
        relaxed: "1.75",
      },
      letterSpacing: {
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
      },
    },

    animation: {
      type: "smooth",
      duration: {
        fast: "200ms",
        normal: "400ms",
        slow: "600ms",
      },
      easing: {
        ease: "ease",
        easeIn: "ease-in",
        easeOut: "ease-out",
        easeInOut: "ease-in-out",
      },
      scale: {
        enter: "1.05",
        exit: "0.95",
      },
    },

    layout: {
      type: "full-width",
      maxWidth: "100%",
      padding: {
        mobile: "1rem",
        tablet: "2rem",
        desktop: "3rem",
      },
      gaps: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
      borderRadius: {
        none: "0",
        sm: "0.375rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.75rem",
        "3xl": "2.25rem",
        full: "9999px",
      },
    },

    buttons: {
      sizes: {
        sm: { padding: "0.5rem 1rem", fontSize: "0.875rem", height: "2rem" },
        md: { padding: "0.75rem 1.5rem", fontSize: "1rem", height: "2.5rem" },
        lg: { padding: "1rem 2rem", fontSize: "1.125rem", height: "3rem" },
      },
      variants: {
        primary: "bg-primary hover:bg-primary/90 text-white",
        secondary: "bg-secondary hover:bg-secondary/90 text-white",
        outline: "border border-primary hover:bg-primary hover:text-white",
        ghost: "hover:bg-primary/10 hover:text-primary",
        destructive: "bg-error hover:bg-error/90 text-white",
      },
      borderRadius: "0.75rem",
    },

    inputs: {
      sizes: {
        sm: "2rem",
        md: "2.5rem",
        lg: "3rem",
      },
      borderRadius: "0.75rem",
      borderWidth: "1px",
      focusRing: "2px",
    },

    cards: {
      padding: "1.5rem",
      borderRadius: "1rem",
      shadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      border: "1px solid hsl(var(--border))",
      hover: {
        shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
        transform: "translateY(-4px)",
      },
    },

    hero: {
      style: "split",
      height: "90vh",
      backgroundType: "gradient",
      backgroundValue: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
      titleSize: "4rem",
      subtitleSize: "1.5rem",
      buttonLayout: "horizontal",
    },

    productGrid: {
      style: "masonry",
      columns: { mobile: 2, tablet: 3, desktop: 4 },
      aspectRatio: "auto",
      spacing: "2rem",
      showQuickView: true,
      showWishlist: true,
      showCompare: true,
    },

    darkMode: {
      enabled: true,
      default: "system",
    },
  },

  {
    id: "cherry-blossom",
    name: "Cherry Blossom",
    description: "Soft, romantic design with pink and coral tones",
    version: "1.0.0",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "system",
    isActive: false,

    colorPalette: {
      id: "cherry-blossom",
      name: "Cherry Blossom",
      primary: createColorShade("#f472b6"),
      secondary: createColorShade("#fb7185"),
      accent: createColorShade("#fda4af"),
      neutral: createColorShade("#6b7280"),
      success: createColorShade("#10b981"),
      warning: createColorShade("#f59e0b"),
      error: createColorShade("#ef4444"),
      info: createColorShade("#3b82f6"),
    },

    typography: {
      family: "Open Sans, system-ui, sans-serif",
      weights: [300, 400, 500, 600, 700],
      sizes: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
      },
      lineHeights: {
        tight: "1.25",
        normal: "1.6",
        relaxed: "1.8",
      },
      letterSpacing: {
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
      },
    },

    animation: {
      type: "smooth",
      duration: {
        fast: "150ms",
        normal: "300ms",
        slow: "450ms",
      },
      easing: {
        ease: "ease",
        easeIn: "ease-in",
        easeOut: "ease-out",
        easeInOut: "ease-in-out",
      },
      scale: {
        enter: "1.02",
        exit: "0.98",
      },
    },

    layout: {
      type: "boxed",
      maxWidth: "1200px",
      padding: {
        mobile: "1rem",
        tablet: "2rem",
        desktop: "3rem",
      },
      gaps: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
      borderRadius: {
        none: "0",
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "2.5rem",
        "3xl": "3rem",
        full: "9999px",
      },
    },

    buttons: {
      sizes: {
        sm: { padding: "0.5rem 1rem", fontSize: "0.875rem", height: "2rem" },
        md: { padding: "0.75rem 1.5rem", fontSize: "1rem", height: "2.5rem" },
        lg: { padding: "1rem 2rem", fontSize: "1.125rem", height: "3rem" },
      },
      variants: {
        primary: "bg-primary hover:bg-primary/90 text-white",
        secondary: "bg-secondary hover:bg-secondary/90 text-white",
        outline: "border border-primary hover:bg-primary hover:text-white",
        ghost: "hover:bg-primary/10 hover:text-primary",
        destructive: "bg-error hover:bg-error/90 text-white",
      },
      borderRadius: "1rem",
    },

    inputs: {
      sizes: {
        sm: "2rem",
        md: "2.5rem",
        lg: "3rem",
      },
      borderRadius: "1rem",
      borderWidth: "1px",
      focusRing: "2px",
    },

    cards: {
      padding: "2rem",
      borderRadius: "1.5rem",
      shadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      border: "1px solid hsl(var(--border))",
      hover: {
        shadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
        transform: "translateY(-2px)",
      },
    },

    hero: {
      style: "centered",
      height: "75vh",
      backgroundType: "gradient",
      backgroundValue: "linear-gradient(135deg, #f472b6 0%, #fb7185 100%)",
      titleSize: "3.75rem",
      subtitleSize: "1.25rem",
      buttonLayout: "horizontal",
    },

    productGrid: {
      style: "cards",
      columns: { mobile: 1, tablet: 2, desktop: 3 },
      aspectRatio: "4/5",
      spacing: "1.5rem",
      showQuickView: true,
      showWishlist: true,
      showCompare: false,
    },

    darkMode: {
      enabled: true,
      default: "light",
    },
  },

  {
    id: "golden-hour",
    name: "Golden Hour",
    description: "Warm, golden design inspired by sunset colors",
    version: "1.0.0",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "system",
    isActive: false,

    colorPalette: {
      id: "golden-hour",
      name: "Golden Hour",
      primary: createColorShade("#f59e0b"),
      secondary: createColorShade("#f97316"),
      accent: createColorShade("#fbbf24"),
      neutral: createColorShade("#6b7280"),
      success: createColorShade("#10b981"),
      warning: createColorShade("#f59e0b"),
      error: createColorShade("#ef4444"),
      info: createColorShade("#3b82f6"),
    },

    typography: {
      family: "Nunito, system-ui, sans-serif",
      weights: [400, 500, 600, 700, 800],
      sizes: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
      },
      lineHeights: {
        tight: "1.25",
        normal: "1.5",
        relaxed: "1.75",
      },
      letterSpacing: {
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
      },
    },

    animation: {
      type: "bounce",
      duration: {
        fast: "200ms",
        normal: "350ms",
        slow: "500ms",
      },
      easing: {
        ease: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        easeIn: "ease-in",
        easeOut: "ease-out",
        easeInOut: "ease-in-out",
      },
      scale: {
        enter: "1.05",
        exit: "0.95",
      },
    },

    layout: {
      type: "boxed",
      maxWidth: "1400px",
      padding: {
        mobile: "1rem",
        tablet: "2rem",
        desktop: "3rem",
      },
      gaps: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
      borderRadius: {
        none: "0",
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        full: "9999px",
      },
    },

    buttons: {
      sizes: {
        sm: { padding: "0.5rem 1rem", fontSize: "0.875rem", height: "2rem" },
        md: { padding: "0.75rem 1.5rem", fontSize: "1rem", height: "2.5rem" },
        lg: { padding: "1rem 2rem", fontSize: "1.125rem", height: "3rem" },
      },
      variants: {
        primary:
          "bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white",
        secondary: "bg-secondary hover:bg-secondary/90 text-white",
        outline: "border border-primary hover:bg-primary hover:text-white",
        ghost: "hover:bg-primary/10 hover:text-primary",
        destructive: "bg-error hover:bg-error/90 text-white",
      },
      borderRadius: "0.5rem",
    },

    inputs: {
      sizes: {
        sm: "2rem",
        md: "2.5rem",
        lg: "3rem",
      },
      borderRadius: "0.5rem",
      borderWidth: "1px",
      focusRing: "2px",
    },

    cards: {
      padding: "1.5rem",
      borderRadius: "0.75rem",
      shadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      border: "1px solid hsl(var(--border))",
      hover: {
        shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
        transform: "translateY(-4px) scale(1.02)",
      },
    },

    hero: {
      style: "centered",
      height: "85vh",
      backgroundType: "gradient",
      backgroundValue: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
      titleSize: "4rem",
      subtitleSize: "1.5rem",
      buttonLayout: "horizontal",
    },

    productGrid: {
      style: "cards",
      columns: { mobile: 1, tablet: 2, desktop: 3 },
      aspectRatio: "1/1",
      spacing: "2rem",
      showQuickView: true,
      showWishlist: true,
      showCompare: false,
    },

    darkMode: {
      enabled: true,
      default: "light",
    },
  },

  {
    id: "arctic-white",
    name: "Arctic White",
    description: "Clean, minimalist design with crisp white and blue tones",
    version: "1.0.0",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "system",
    isActive: false,

    colorPalette: {
      id: "arctic-white",
      name: "Arctic White",
      primary: createColorShade("#3b82f6"),
      secondary: createColorShade("#e2e8f0"),
      accent: createColorShade("#06b6d4"),
      neutral: createColorShade("#64748b"),
      success: createColorShade("#10b981"),
      warning: createColorShade("#f59e0b"),
      error: createColorShade("#ef4444"),
      info: createColorShade("#3b82f6"),
    },

    typography: {
      family: "Source Sans Pro, system-ui, sans-serif",
      weights: [300, 400, 500, 600, 700],
      sizes: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
      },
      lineHeights: {
        tight: "1.25",
        normal: "1.5",
        relaxed: "1.75",
      },
      letterSpacing: {
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
      },
    },

    animation: {
      type: "fade",
      duration: {
        fast: "150ms",
        normal: "300ms",
        slow: "500ms",
      },
      easing: {
        ease: "ease",
        easeIn: "ease-in",
        easeOut: "ease-out",
        easeInOut: "ease-in-out",
      },
      scale: {
        enter: "1.01",
        exit: "0.99",
      },
    },

    layout: {
      type: "boxed",
      maxWidth: "1200px",
      padding: {
        mobile: "1rem",
        tablet: "2rem",
        desktop: "3rem",
      },
      gaps: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        md: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
    },

    buttons: {
      sizes: {
        sm: { padding: "0.5rem 1rem", fontSize: "0.875rem", height: "2rem" },
        md: { padding: "0.75rem 1.5rem", fontSize: "1rem", height: "2.5rem" },
        lg: { padding: "1rem 2rem", fontSize: "1.125rem", height: "3rem" },
      },
      variants: {
        primary: "bg-primary hover:bg-primary/90 text-white",
        secondary: "bg-secondary hover:bg-secondary/90 text-neutral-900",
        outline: "border border-primary hover:bg-primary hover:text-white",
        ghost: "hover:bg-primary/10 hover:text-primary",
        destructive: "bg-error hover:bg-error/90 text-white",
      },
      borderRadius: "0.25rem",
    },

    inputs: {
      sizes: {
        sm: "2rem",
        md: "2.5rem",
        lg: "3rem",
      },
      borderRadius: "0.25rem",
      borderWidth: "1px",
      focusRing: "2px",
    },

    cards: {
      padding: "1.5rem",
      borderRadius: "0.5rem",
      shadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
      border: "1px solid hsl(var(--border))",
      hover: {
        shadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        transform: "translateY(-1px)",
      },
    },

    hero: {
      style: "minimal",
      height: "70vh",
      backgroundType: "solid",
      backgroundValue: "#ffffff",
      titleSize: "3rem",
      subtitleSize: "1.125rem",
      buttonLayout: "horizontal",
    },

    productGrid: {
      style: "cards",
      columns: { mobile: 1, tablet: 2, desktop: 3 },
      aspectRatio: "4/5",
      spacing: "1.5rem",
      showQuickView: false,
      showWishlist: true,
      showCompare: false,
    },

    darkMode: {
      enabled: false,
      default: "light",
    },
  },

  {
    id: "terracotta-earth",
    name: "Terracotta Earth",
    description: "Warm, earthy design with terracotta and clay tones",
    version: "1.0.0",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "system",
    isActive: false,

    colorPalette: {
      id: "terracotta",
      name: "Terracotta",
      primary: createColorShade("#ea580c"),
      secondary: createColorShade("#92400e"),
      accent: createColorShade("#fed7aa"),
      neutral: createColorShade("#78716c"),
      success: createColorShade("#10b981"),
      warning: createColorShade("#f59e0b"),
      error: createColorShade("#ef4444"),
      info: createColorShade("#3b82f6"),
    },

    typography: {
      family: "Crimson Text, Georgia, serif",
      weights: [400, 500, 600, 700],
      sizes: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
      },
      lineHeights: {
        tight: "1.25",
        normal: "1.6",
        relaxed: "1.8",
      },
      letterSpacing: {
        tight: "-0.025em",
        normal: "0em",
        wide: "0.05em",
      },
    },

    animation: {
      type: "smooth",
      duration: {
        fast: "200ms",
        normal: "400ms",
        slow: "600ms",
      },
      easing: {
        ease: "ease",
        easeIn: "ease-in",
        easeOut: "ease-out",
        easeInOut: "ease-in-out",
      },
      scale: {
        enter: "1.02",
        exit: "0.98",
      },
    },

    layout: {
      type: "boxed",
      maxWidth: "1300px",
      padding: {
        mobile: "1rem",
        tablet: "2rem",
        desktop: "3rem",
      },
      gaps: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
      borderRadius: {
        none: "0",
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        full: "9999px",
      },
    },

    buttons: {
      sizes: {
        sm: { padding: "0.5rem 1rem", fontSize: "0.875rem", height: "2rem" },
        md: { padding: "0.75rem 1.5rem", fontSize: "1rem", height: "2.5rem" },
        lg: { padding: "1rem 2rem", fontSize: "1.125rem", height: "3rem" },
      },
      variants: {
        primary: "bg-primary hover:bg-primary/90 text-white",
        secondary: "bg-secondary hover:bg-secondary/90 text-white",
        outline: "border border-primary hover:bg-primary hover:text-white",
        ghost: "hover:bg-primary/10 hover:text-primary",
        destructive: "bg-error hover:bg-error/90 text-white",
      },
      borderRadius: "0.5rem",
    },

    inputs: {
      sizes: {
        sm: "2rem",
        md: "2.5rem",
        lg: "3rem",
      },
      borderRadius: "0.5rem",
      borderWidth: "1px",
      focusRing: "2px",
    },

    cards: {
      padding: "2rem",
      borderRadius: "0.75rem",
      shadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      border: "1px solid hsl(var(--border))",
      hover: {
        shadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
        transform: "translateY(-2px)",
      },
    },

    hero: {
      style: "split",
      height: "80vh",
      backgroundType: "gradient",
      backgroundValue: "linear-gradient(135deg, #ea580c 0%, #92400e 100%)",
      titleSize: "3.75rem",
      subtitleSize: "1.25rem",
      buttonLayout: "horizontal",
    },

    productGrid: {
      style: "cards",
      columns: { mobile: 1, tablet: 2, desktop: 3 },
      aspectRatio: "3/4",
      spacing: "2rem",
      showQuickView: true,
      showWishlist: true,
      showCompare: false,
    },

    darkMode: {
      enabled: true,
      default: "light",
    },
  },

  {
    id: "neon-cyber",
    name: "Neon Cyber",
    description: "Futuristic design with bright neon accents and dark themes",
    version: "1.0.0",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "system",
    isActive: false,

    colorPalette: {
      id: "neon-cyber",
      name: "Neon Cyber",
      primary: createColorShade("#00f5ff"),
      secondary: createColorShade("#ff00ff"),
      accent: createColorShade("#00ff41"),
      neutral: createColorShade("#1e293b"),
      success: createColorShade("#00ff41"),
      warning: createColorShade("#ffff00"),
      error: createColorShade("#ff0040"),
      info: createColorShade("#00f5ff"),
    },

    typography: {
      family: "Orbitron, monospace",
      weights: [400, 500, 600, 700, 800, 900],
      sizes: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
      },
      lineHeights: {
        tight: "1.25",
        normal: "1.5",
        relaxed: "1.75",
      },
      letterSpacing: {
        tight: "-0.025em",
        normal: "0em",
        wide: "0.1em",
      },
    },

    animation: {
      type: "bounce",
      duration: {
        fast: "100ms",
        normal: "250ms",
        slow: "400ms",
      },
      easing: {
        ease: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        easeIn: "ease-in",
        easeOut: "ease-out",
        easeInOut: "ease-in-out",
      },
      scale: {
        enter: "1.1",
        exit: "0.9",
      },
    },

    layout: {
      type: "full-width",
      maxWidth: "100%",
      padding: {
        mobile: "1rem",
        tablet: "2rem",
        desktop: "4rem",
      },
      gaps: {
        xs: "0.75rem",
        sm: "1.25rem",
        md: "2rem",
        lg: "2.5rem",
        xl: "4rem",
      },
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        md: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
    },

    buttons: {
      sizes: {
        sm: { padding: "0.5rem 1rem", fontSize: "0.875rem", height: "2rem" },
        md: { padding: "0.75rem 1.5rem", fontSize: "1rem", height: "2.5rem" },
        lg: { padding: "1rem 2rem", fontSize: "1.125rem", height: "3rem" },
      },
      variants: {
        primary:
          "bg-primary hover:bg-primary/90 text-black border border-primary shadow-lg shadow-primary/50",
        secondary:
          "bg-secondary hover:bg-secondary/90 text-white border border-secondary shadow-lg shadow-secondary/50",
        outline:
          "border-2 border-primary hover:bg-primary hover:text-black shadow-lg shadow-primary/25",
        ghost: "hover:bg-primary/20 hover:text-primary",
        destructive:
          "bg-error hover:bg-error/90 text-white shadow-lg shadow-error/50",
      },
      borderRadius: "0.25rem",
    },

    inputs: {
      sizes: {
        sm: "2rem",
        md: "2.5rem",
        lg: "3rem",
      },
      borderRadius: "0.25rem",
      borderWidth: "2px",
      focusRing: "3px",
    },

    cards: {
      padding: "1.5rem",
      borderRadius: "0.5rem",
      shadow: "0 0 20px rgb(0 245 255 / 0.2)",
      border: "1px solid rgb(0 245 255 / 0.3)",
      hover: {
        shadow: "0 0 30px rgb(0 245 255 / 0.4)",
        transform: "translateY(-4px) scale(1.02)",
      },
    },

    hero: {
      style: "video",
      height: "100vh",
      backgroundType: "gradient",
      backgroundValue:
        "linear-gradient(135deg, #000000 0%, #1e293b 50%, #000000 100%)",
      titleSize: "4.5rem",
      subtitleSize: "1.5rem",
      buttonLayout: "stacked",
    },

    productGrid: {
      style: "cards",
      columns: { mobile: 1, tablet: 2, desktop: 4 },
      aspectRatio: "1/1",
      spacing: "2rem",
      showQuickView: true,
      showWishlist: true,
      showCompare: true,
    },

    darkMode: {
      enabled: true,
      default: "dark",
    },
  },
];

// =============================================================================
// API MOCK FUNCTIONS
// =============================================================================

export const mockApiDelay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const fetchThemes = async (): Promise<ThemeConfig[]> => {
  try {
    // Simulate API call
    await mockApiDelay(1000);

    // In a real app, this would be:
    // const response = await fetch('/api/v1/themes');
    // if (!response.ok) throw new Error('Failed to fetch themes');
    // return response.json();

    // For now, return dummy data
    return DUMMY_THEMES;
  } catch (error) {
    console.warn("API unavailable, using dummy themes:", error);
    return DUMMY_THEMES;
  }
};

export const updateTheme = async (
  themeId: string,
  updates: Partial<ThemeConfig>
): Promise<ThemeConfig> => {
  await mockApiDelay(300);

  // In real app:
  // const response = await fetch(`/api/v1/themes/${themeId}`, {
  //   method: 'PATCH',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(updates)
  // });

  const theme = DUMMY_THEMES.find((t) => t.id === themeId);
  if (!theme) throw new Error("Theme not found");

  const updated = { ...theme, ...updates, updatedAt: new Date().toISOString() };
  return updated;
};

export const createTheme = async (
  themeData: Omit<ThemeConfig, "id" | "createdAt" | "updatedAt">
): Promise<ThemeConfig> => {
  await mockApiDelay(500);

  const newTheme: ThemeConfig = {
    ...themeData,
    id: `theme-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return newTheme;
};

export const deleteTheme = async (themeId: string): Promise<void> => {
  await mockApiDelay(300);

  // In real app:
  // await fetch(`/api/v1/themes/${themeId}`, { method: 'DELETE' });

  console.log(`Theme ${themeId} deleted`);
};
