/**
 * Advanced SaaS eCommerce Theme System Types
 *
 * Supports complete theme customization for admin users,
 * real-time preview, and customer experience optimization.
 */

// =============================================================================
// USER ROLES & PERMISSIONS
// =============================================================================

export type UserRole = "admin" | "customer" | "guest";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatar?: string;
}

// =============================================================================
// COLOR SYSTEM
// =============================================================================

export interface ColorShade {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface ColorPalette {
  id: string;
  name: string;
  primary: ColorShade;
  secondary: ColorShade;
  accent: ColorShade;
  neutral: ColorShade;
  success: ColorShade;
  warning: ColorShade;
  error: ColorShade;
  info: ColorShade;
}

// =============================================================================
// TYPOGRAPHY SYSTEM
// =============================================================================

export interface FontConfig {
  family: string;
  weights: number[];
  sizes: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
    "4xl": string;
    "5xl": string;
    "6xl": string;
  };
  lineHeights: {
    tight: string;
    normal: string;
    relaxed: string;
  };
  letterSpacing: {
    tight: string;
    normal: string;
    wide: string;
  };
}

// =============================================================================
// ANIMATION SYSTEM
// =============================================================================

export type AnimationType =
  | "smooth"
  | "fast"
  | "scale"
  | "fade"
  | "bounce"
  | "slide";

export interface AnimationConfig {
  type: AnimationType;
  duration: {
    fast: string;
    normal: string;
    slow: string;
  };
  easing: {
    ease: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
  };
  scale: {
    enter: string;
    exit: string;
  };
}

// =============================================================================
// LAYOUT SYSTEM
// =============================================================================

export type LayoutType = "boxed" | "full-width" | "fluid" | "grid" | "masonry";

export interface LayoutConfig {
  type: LayoutType;
  maxWidth: string;
  padding: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  gaps: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
    full: string;
  };
}

// =============================================================================
// COMPONENT CONFIGURATION
// =============================================================================

export interface ButtonConfig {
  sizes: {
    sm: {
      padding: string;
      fontSize: string;
      height: string;
    };
    md: {
      padding: string;
      fontSize: string;
      height: string;
    };
    lg: {
      padding: string;
      fontSize: string;
      height: string;
    };
  };
  variants: {
    primary: string;
    secondary: string;
    outline: string;
    ghost: string;
    destructive: string;
  };
  borderRadius: string;
}

export interface InputConfig {
  sizes: {
    sm: string;
    md: string;
    lg: string;
  };
  borderRadius: string;
  borderWidth: string;
  focusRing: string;
}

export interface CardConfig {
  padding: string;
  borderRadius: string;
  shadow: string;
  border: string;
  hover: {
    shadow: string;
    transform: string;
  };
}

// =============================================================================
// HERO SECTION CONFIGURATION
// =============================================================================

export type HeroStyle = "centered" | "split" | "video" | "carousel" | "minimal";

export interface HeroConfig {
  style: HeroStyle;
  height: string;
  backgroundType: "gradient" | "image" | "video" | "solid";
  backgroundValue: string;
  titleSize: string;
  subtitleSize: string;
  buttonLayout: "horizontal" | "vertical" | "stacked";
}

// =============================================================================
// PRODUCT GRID CONFIGURATION
// =============================================================================

export type ProductGridStyle = "cards" | "list" | "masonry" | "carousel";

export interface ProductGridConfig {
  style: ProductGridStyle;
  columns: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  aspectRatio: string;
  spacing: string;
  showQuickView: boolean;
  showWishlist: boolean;
  showCompare: boolean;
}

// =============================================================================
// MAIN THEME CONFIGURATION
// =============================================================================

export interface ThemeConfig {
  // Meta
  id: string;
  name: string;
  description: string;
  version: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  isActive: boolean;

  // Core Systems
  colorPalette: ColorPalette;
  typography: FontConfig;
  animation: AnimationConfig;
  layout: LayoutConfig;

  // Component Configs
  buttons: ButtonConfig;
  inputs: InputConfig;
  cards: CardConfig;

  // Page Sections
  hero: HeroConfig;
  productGrid: ProductGridConfig;

  // Theme Settings
  darkMode: {
    enabled: boolean;
    default: "light" | "dark" | "system";
  };

  // Custom CSS
  customCSS?: string;
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export interface ThemeApiResponse {
  success: boolean;
  data: ThemeConfig[];
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// =============================================================================
// STORE TYPES
// =============================================================================

export interface ThemeStore {
  // State
  themes: ThemeConfig[];
  activeTheme: ThemeConfig | null;
  previewTheme: ThemeConfig | null;
  isLoading: boolean;
  error: string | null;

  // User & Permissions
  currentUser: User | null;
  isAdmin: boolean;

  // UI State
  isCustomizerOpen: boolean;
  isDarkMode: boolean;
  isPreviewMode: boolean;

  // History for undo/redo
  themeHistory: ThemeConfig[];
  historyIndex: number;
  canUndo: boolean;
  canRedo: boolean;

  // Actions
  loadThemes: () => Promise<void>;
  setActiveTheme: (themeId: string) => Promise<void>;
  setPreviewTheme: (theme: ThemeConfig) => void;
  updateTheme: (
    themeId: string,
    updates: Partial<ThemeConfig>
  ) => Promise<void>;
  createTheme: (
    theme: Omit<ThemeConfig, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  deleteTheme: (themeId: string) => Promise<void>;

  // UI Actions
  toggleCustomizer: () => void;
  toggleDarkMode: () => void;
  togglePreviewMode: () => void;
  setUser: (user: User | null) => void;

  // Theme Application
  applyThemeToDOM: (theme: ThemeConfig) => void;

  // History management
  addToHistory: (theme: ThemeConfig) => void;
  undoThemeChange: () => void;
  redoThemeChange: () => void;

  // Import/Export
  exportTheme: (themeId: string) => Promise<void>;
  importTheme: (file: File) => Promise<void>;

  // Reset
  resetTheme: (themeId: string) => Promise<void>;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}
