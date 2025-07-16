/**
 * Enterprise Advanced Theme System Types
 * Comprehensive type definitions for the SaaS theme customization system
 */

// Design Token System
export interface ThemeColors {
  // Primary colors
  primary: string;
  "primary-50": string;
  "primary-100": string;
  "primary-200": string;
  "primary-300": string;
  "primary-400": string;
  "primary-500": string;
  "primary-600": string;
  "primary-700": string;
  "primary-800": string;
  "primary-900": string;

  // Secondary colors
  secondary: string;
  "secondary-50": string;
  "secondary-100": string;
  "secondary-200": string;
  "secondary-300": string;
  "secondary-400": string;
  "secondary-500": string;
  "secondary-600": string;
  "secondary-700": string;
  "secondary-800": string;
  "secondary-900": string;

  // Semantic colors
  success: string;
  warning: string;
  danger: string;
  info: string;

  // Surface colors
  background: string;
  "background-secondary": string;
  surface: string;
  "surface-variant": string;

  // Text colors
  text: string;
  "text-secondary": string;
  "text-muted": string;
  "text-inverse": string;

  // Border colors
  border: string;
  "border-light": string;
  "border-strong": string;

  // Accent and utility
  accent: string;
  muted: string;
  overlay: string;

  // Allow additional color properties
  [key: string]: string;
}

export interface ThemeTypography {
  // Font families
  fontFamily: string;
  headingFont: string;
  monoFont: string;

  // Font sizes
  baseFontSize: string;
  fontSizes: {
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

  // Font weights
  fontWeights: {
    thin: number;
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
    extrabold: number;
  };

  // Line heights
  lineHeights: {
    tight: number;
    normal: number;
    relaxed: number;
    loose: number;
  };

  // Letter spacing
  letterSpacing: {
    tight: string;
    normal: string;
    wide: string;
  };

  // Heading scale
  headingScale: number;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  "4xl": string;
  "5xl": string;
  "6xl": string;
}

export interface ThemeBorderRadius {
  none: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  full: string;
}

export interface ThemeShadows {
  none: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  inner: string;
}

export interface ThemeTransitions {
  duration: {
    fast: string;
    normal: string;
    slow: string;
  };
  timing: {
    ease: string;
    "ease-in": string;
    "ease-out": string;
    "ease-in-out": string;
  };
}

export interface ThemeZIndex {
  dropdown: number;
  sticky: number;
  fixed: number;
  overlay: number;
  modal: number;
  popover: number;
  tooltip: number;
  toast: number;
}

export interface ThemeComponents {
  // Button styles
  button: {
    borderRadius: keyof ThemeBorderRadius;
    shadow: keyof ThemeShadows;
    fontWeight: keyof ThemeTypography["fontWeights"];
    transition: string;
    variants: {
      primary: { bg: string; text: string; border: string };
      secondary: { bg: string; text: string; border: string };
      outline: { bg: string; text: string; border: string };
      ghost: { bg: string; text: string; border: string };
    };
  };

  // Input styles
  input: {
    borderRadius: keyof ThemeBorderRadius;
    borderWidth: string;
    fontSize: keyof ThemeTypography["fontSizes"];
    padding: {
      sm: string;
      md: string;
      lg: string;
    };
  };

  // Card styles
  card: {
    borderRadius: keyof ThemeBorderRadius;
    shadow: keyof ThemeShadows;
    border: string;
    padding: string;
  };

  // Modal styles
  modal: {
    overlay: string;
    background: string;
    borderRadius: keyof ThemeBorderRadius;
    shadow: keyof ThemeShadows;
  };
}

export interface ThemeLayout {
  // Container widths
  containers: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
    full: string;
  };

  // Component dimensions
  sidebar: {
    width: string;
    collapsedWidth: string;
  };

  header: {
    height: string;
  };

  footer: {
    height: string;
  };

  // Grid system
  grid: {
    columns: number;
    gutter: string;
  };

  // Breakpoints
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
  };
}

// White-label branding
export interface ThemeBranding {
  // Logo configuration
  logo: {
    primary: string; // URL or base64
    secondary?: string;
    favicon: string;
    splash?: string;
  };

  // Company information
  company: {
    name: string;
    website?: string;
    email?: string;
  };

  // Login page customization
  loginPage: {
    backgroundImage?: string;
    backgroundColor?: string;
    logoPosition: "center" | "top-left" | "top-center" | "top-right";
    showCompanyName: boolean;
  };

  // Email branding
  email: {
    headerColor?: string;
    footerText?: string;
  };
}

// Multi-tenant configuration
export interface ThemeTenant {
  id: string;
  name: string;
  domain?: string;
  subdomain?: string;
  isActive: boolean;
  subscription: "free" | "premium" | "enterprise";
  limits: {
    customThemes: number;
    whiteLabel: boolean;
    apiAccess: boolean;
  };
}

// Theme versioning
export interface ThemeVersion {
  id: string;
  version: string;
  changelog: string;
  createdAt: string;
  createdBy: string;
  isStable: boolean;
  config: ThemeConfig;
}

// Access control
export interface ThemePermissions {
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canDuplicate: boolean;
  canExport: boolean;
  canImport: boolean;
  canPublish: boolean;
  canSetAsDefault: boolean;
}

export interface ThemeRole {
  id: string;
  name: string;
  permissions: ThemePermissions;
}

// Enhanced Theme Configuration
export interface ThemeConfig {
  // Basic information
  id: string;
  name: string;
  description?: string;

  // Theme settings
  mode: "light" | "dark" | "system";

  // Design tokens
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadows;
  transitions: ThemeTransitions;
  zIndex: ThemeZIndex;
  components: ThemeComponents;
  layout: ThemeLayout;

  // Branding (optional for white-label)
  branding?: ThemeBranding;

  // Multi-tenant information
  tenant?: {
    id: string;
    domain?: string;
  };

  // Access control
  permissions: ThemePermissions;

  // Metadata
  isBuiltIn: boolean;
  isPublic: boolean;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  version: string;
  tags: string[];

  // Versioning
  versions?: ThemeVersion[];

  // Usage statistics
  stats?: {
    downloads: number;
    likes: number;
    views: number;
  };
}

export interface ThemeHistory {
  id: string;
  timestamp: string;
  action:
    | "create"
    | "update"
    | "delete"
    | "apply"
    | "duplicate"
    | "import"
    | "export"
    | "publish";
  theme: ThemeConfig;
  description: string;
  userId?: string;
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
}

// Enhanced Context Type
export interface ThemeContextType {
  // Current state
  currentTheme: ThemeConfig | null;
  themes: ThemeConfig[];
  mode: "light" | "dark" | "system";

  // Multi-tenant
  currentTenant: ThemeTenant | null;
  tenants: ThemeTenant[];

  // Theme management
  createTheme: (
    theme: Omit<
      ThemeConfig,
      "id" | "createdAt" | "updatedAt" | "permissions" | "stats" | "versions"
    >
  ) => Promise<void>;
  updateTheme: (id: string, updates: Partial<ThemeConfig>) => Promise<void>;
  deleteTheme: (id: string) => Promise<void>;
  applyTheme: (id: string) => Promise<void>;
  duplicateTheme: (id: string, newName: string) => Promise<void>;
  publishTheme: (id: string, isPublic: boolean) => Promise<void>;
  setDefaultTheme: (id: string) => Promise<void>;

  // Versioning
  createVersion: (themeId: string, changelog: string) => Promise<void>;
  rollbackToVersion: (themeId: string, versionId: string) => Promise<void>;

  // Import/Export
  exportTheme: (id: string, format?: "json" | "css" | "scss") => void;
  importTheme: (file: File) => Promise<void>;

  // Bulk operations
  exportMultipleThemes: (ids: string[]) => void;
  importMultipleThemes: (files: File[]) => Promise<void>;

  // Search and filter
  searchThemes: (query: string) => ThemeConfig[];
  filterThemes: (filters: ThemeFilters) => ThemeConfig[];

  // History and undo/redo
  history: ThemeHistory[];
  undoLastChange: () => void;
  redoLastChange: () => void;
  canUndo: boolean;
  canRedo: boolean;

  // Preview system
  previewTheme: ThemeConfig | null;
  setPreviewTheme: (theme: ThemeConfig | null) => void;
  isPreviewMode: boolean;
  previewDevice: "desktop" | "tablet" | "mobile";
  setPreviewDevice: (device: "desktop" | "tablet" | "mobile") => void;

  // Real-time collaboration
  isCollaborationEnabled: boolean;
  activeUsers: { id: string; name: string; avatar?: string }[];

  // Theme marketplace
  marketplaceThemes: ThemeConfig[];
  downloadMarketplaceTheme: (id: string) => Promise<void>;
  uploadToMarketplace: (id: string) => Promise<void>;

  // Analytics
  getThemeAnalytics: (id: string) => Promise<ThemeAnalytics>;

  // Multi-tenant operations
  switchTenant: (tenantId: string) => Promise<void>;
  createTenant: (tenant: Omit<ThemeTenant, "id">) => Promise<void>;

  // Loading states and error handling
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

// Filtering system
export interface ThemeFilters {
  mode?: "light" | "dark" | "system";
  tags?: string[];
  createdBy?: string;
  isPublic?: boolean;
  isBuiltIn?: boolean;
  tenant?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

// Analytics interface
export interface ThemeAnalytics {
  id: string;
  views: number;
  downloads: number;
  likes: number;
  usage: {
    daily: { date: string; count: number }[];
    monthly: { date: string; count: number }[];
  };
  topComponents: string[];
  userFeedback: {
    rating: number;
    comments: string[];
  };
}

// API Responses
export interface ThemeApiResponse {
  success: boolean;
  data?: ThemeConfig | ThemeConfig[];
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Enhanced preset themes with full design token system
export const PRESET_THEMES: Omit<
  ThemeConfig,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "createdBy"
  | "permissions"
  | "tenant"
  | "stats"
  | "versions"
>[] = [
  {
    name: "Ocean Breeze",
    description: "Cool blues and ocean-inspired colors",
    mode: "light",
    colors: {
      primary: "#0D47A1",
      "primary-50": "#E3F2FD",
      "primary-100": "#BBDEFB",
      "primary-200": "#90CAF9",
      "primary-300": "#64B5F6",
      "primary-400": "#42A5F5",
      "primary-500": "#2196F3",
      "primary-600": "#1E88E5",
      "primary-700": "#1976D2",
      "primary-800": "#1565C0",
      "primary-900": "#0D47A1",

      secondary: "#64B5F6",
      "secondary-50": "#F3E5F5",
      "secondary-100": "#E1BEE7",
      "secondary-200": "#CE93D8",
      "secondary-300": "#BA68C8",
      "secondary-400": "#AB47BC",
      "secondary-500": "#9C27B0",
      "secondary-600": "#8E24AA",
      "secondary-700": "#7B1FA2",
      "secondary-800": "#6A1B9A",
      "secondary-900": "#4A148C",

      success: "#2E7D32",
      warning: "#F57F17",
      danger: "#C62828",
      info: "#0288D1",

      background: "#FFFFFF",
      "background-secondary": "#F8FAFC",
      surface: "#FFFFFF",
      "surface-variant": "#F1F5F9",

      text: "#212121",
      "text-secondary": "#64748B",
      "text-muted": "#94A3B8",
      "text-inverse": "#FFFFFF",

      border: "#E2E8F0",
      "border-light": "#F1F5F9",
      "border-strong": "#CBD5E1",

      accent: "#00ACC1",
      muted: "#757575",
      overlay: "rgba(0, 0, 0, 0.5)",
    },
    typography: {
      fontFamily: "Inter",
      headingFont: "Inter",
      monoFont: "JetBrains Mono",
      baseFontSize: "16px",
      fontSizes: {
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
      fontWeights: {
        thin: 100,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      lineHeights: {
        tight: 1.25,
        normal: 1.6,
        relaxed: 1.75,
        loose: 2,
      },
      letterSpacing: {
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
      },
      headingScale: 1.25,
    },
    spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      "2xl": "2.5rem",
      "3xl": "3rem",
      "4xl": "4rem",
      "5xl": "5rem",
      "6xl": "6rem",
    },
    borderRadius: {
      none: "0",
      sm: "0.25rem",
      base: "0.375rem",
      md: "0.5rem",
      lg: "0.75rem",
      xl: "1rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
      full: "9999px",
    },
    shadows: {
      none: "none",
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    },
    transitions: {
      duration: {
        fast: "150ms",
        normal: "250ms",
        slow: "350ms",
      },
      timing: {
        ease: "ease",
        "ease-in": "ease-in",
        "ease-out": "ease-out",
        "ease-in-out": "ease-in-out",
      },
    },
    zIndex: {
      dropdown: 1000,
      sticky: 1010,
      fixed: 1020,
      overlay: 1030,
      modal: 1040,
      popover: 1050,
      tooltip: 1060,
      toast: 1070,
    },
    components: {
      button: {
        borderRadius: "base",
        shadow: "sm",
        fontWeight: "medium",
        transition: "all 150ms ease-in-out",
        variants: {
          primary: {
            bg: "var(--theme-primary)",
            text: "var(--theme-text-inverse)",
            border: "var(--theme-primary)",
          },
          secondary: {
            bg: "var(--theme-secondary)",
            text: "var(--theme-text)",
            border: "var(--theme-secondary)",
          },
          outline: {
            bg: "transparent",
            text: "var(--theme-primary)",
            border: "var(--theme-primary)",
          },
          ghost: {
            bg: "transparent",
            text: "var(--theme-text)",
            border: "transparent",
          },
        },
      },
      input: {
        borderRadius: "base",
        borderWidth: "1px",
        fontSize: "base",
        padding: {
          sm: "0.5rem 0.75rem",
          md: "0.625rem 1rem",
          lg: "0.75rem 1.25rem",
        },
      },
      card: {
        borderRadius: "lg",
        shadow: "md",
        border: "1px solid var(--theme-border)",
        padding: "1.5rem",
      },
      modal: {
        overlay: "rgba(0, 0, 0, 0.5)",
        background: "var(--theme-background)",
        borderRadius: "xl",
        shadow: "2xl",
      },
    },
    layout: {
      containers: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        full: "100%",
      },
      sidebar: {
        width: "256px",
        collapsedWidth: "64px",
      },
      header: {
        height: "64px",
      },
      footer: {
        height: "80px",
      },
      grid: {
        columns: 12,
        gutter: "1rem",
      },
      breakpoints: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    isBuiltIn: true,
    isPublic: true,
    isDefault: false,
    version: "2.0.0",
    tags: ["blue", "ocean", "professional", "light"],
  },

  // 2. Sunset Vibes - Warm oranges and reds
  {
    name: "Sunset Vibes",
    description: "Warm oranges and sunset-inspired colors",
    mode: "light",
    colors: {
      primary: "#EA580C",
      "primary-50": "#FFF7ED",
      "primary-100": "#FFEDD5",
      "primary-200": "#FED7AA",
      "primary-300": "#FDBA74",
      "primary-400": "#FB923C",
      "primary-500": "#F97316",
      "primary-600": "#EA580C",
      "primary-700": "#C2410C",
      "primary-800": "#9A3412",
      "primary-900": "#7C2D12",

      secondary: "#DC2626",
      "secondary-50": "#FEF2F2",
      "secondary-100": "#FEE2E2",
      "secondary-200": "#FECACA",
      "secondary-300": "#FCA5A5",
      "secondary-400": "#F87171",
      "secondary-500": "#EF4444",
      "secondary-600": "#DC2626",
      "secondary-700": "#B91C1C",
      "secondary-800": "#991B1B",
      "secondary-900": "#7F1D1D",

      success: "#059669",
      warning: "#D97706",
      danger: "#DC2626",
      info: "#0284C7",

      background: "#FFFBEB",
      "background-secondary": "#FEF3C7",
      surface: "#FFFFFF",
      "surface-variant": "#FEF3C7",

      text: "#1F2937",
      "text-secondary": "#6B7280",
      "text-muted": "#9CA3AF",
      "text-inverse": "#FFFFFF",

      border: "#F3E8FF",
      "border-light": "#FEF3C7",
      "border-strong": "#E5E7EB",

      accent: "#F59E0B",
      muted: "#6B7280",
      overlay: "rgba(0, 0, 0, 0.5)",
    },
    typography: {
      fontFamily: "Poppins",
      headingFont: "Poppins",
      monoFont: "JetBrains Mono",
      baseFontSize: "16px",
      fontSizes: {
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
      fontWeights: {
        thin: 100,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      lineHeights: {
        tight: 1.25,
        normal: 1.6,
        relaxed: 1.75,
        loose: 2,
      },
      letterSpacing: {
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
      },
      headingScale: 1.25,
    },
    spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      "2xl": "2.5rem",
      "3xl": "3rem",
      "4xl": "4rem",
      "5xl": "5rem",
      "6xl": "6rem",
    },
    borderRadius: {
      none: "0",
      sm: "0.25rem",
      base: "0.375rem",
      md: "0.5rem",
      lg: "0.75rem",
      xl: "1rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
      full: "9999px",
    },
    shadows: {
      none: "none",
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    },
    transitions: {
      duration: {
        fast: "150ms",
        normal: "250ms",
        slow: "350ms",
      },
      timing: {
        ease: "ease",
        "ease-in": "ease-in",
        "ease-out": "ease-out",
        "ease-in-out": "ease-in-out",
      },
    },
    zIndex: {
      dropdown: 1000,
      sticky: 1010,
      fixed: 1020,
      overlay: 1030,
      modal: 1040,
      popover: 1050,
      tooltip: 1060,
      toast: 1070,
    },
    components: {
      button: {
        borderRadius: "base",
        shadow: "sm",
        fontWeight: "medium",
        transition: "all 150ms ease-in-out",
        variants: {
          primary: {
            bg: "var(--theme-primary)",
            text: "var(--theme-text-inverse)",
            border: "var(--theme-primary)",
          },
          secondary: {
            bg: "var(--theme-secondary)",
            text: "var(--theme-text)",
            border: "var(--theme-secondary)",
          },
          outline: {
            bg: "transparent",
            text: "var(--theme-primary)",
            border: "var(--theme-primary)",
          },
          ghost: {
            bg: "transparent",
            text: "var(--theme-text)",
            border: "transparent",
          },
        },
      },
      input: {
        borderRadius: "base",
        borderWidth: "1px",
        fontSize: "base",
        padding: {
          sm: "0.5rem 0.75rem",
          md: "0.625rem 1rem",
          lg: "0.75rem 1.25rem",
        },
      },
      card: {
        borderRadius: "lg",
        shadow: "md",
        border: "1px solid var(--theme-border)",
        padding: "1.5rem",
      },
      modal: {
        overlay: "rgba(0, 0, 0, 0.5)",
        background: "var(--theme-background)",
        borderRadius: "xl",
        shadow: "2xl",
      },
    },
    layout: {
      containers: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        full: "100%",
      },
      sidebar: {
        width: "256px",
        collapsedWidth: "64px",
      },
      header: {
        height: "64px",
      },
      footer: {
        height: "80px",
      },
      grid: {
        columns: 12,
        gutter: "1rem",
      },
      breakpoints: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    isBuiltIn: true,
    isPublic: true,
    isDefault: false,
    version: "2.0.0",
    tags: ["orange", "warm", "sunset", "energetic"],
  },

  // 3. Forest Green - Nature-inspired greens
  {
    name: "Forest Green",
    description: "Nature-inspired greens and earth tones",
    mode: "light",
    colors: {
      primary: "#047857",
      "primary-50": "#ECFDF5",
      "primary-100": "#D1FAE5",
      "primary-200": "#A7F3D0",
      "primary-300": "#6EE7B7",
      "primary-400": "#34D399",
      "primary-500": "#10B981",
      "primary-600": "#059669",
      "primary-700": "#047857",
      "primary-800": "#065F46",
      "primary-900": "#064E3B",

      secondary: "#92400E",
      "secondary-50": "#FFFBEB",
      "secondary-100": "#FEF3C7",
      "secondary-200": "#FDE68A",
      "secondary-300": "#FCD34D",
      "secondary-400": "#FBBF24",
      "secondary-500": "#F59E0B",
      "secondary-600": "#D97706",
      "secondary-700": "#B45309",
      "secondary-800": "#92400E",
      "secondary-900": "#78350F",

      success: "#059669",
      warning: "#D97706",
      danger: "#DC2626",
      info: "#0284C7",

      background: "#F0FDF4",
      "background-secondary": "#DCFCE7",
      surface: "#FFFFFF",
      "surface-variant": "#F3F4F6",

      text: "#1F2937",
      "text-secondary": "#4B5563",
      "text-muted": "#6B7280",
      "text-inverse": "#FFFFFF",

      border: "#D1D5DB",
      "border-light": "#F3F4F6",
      "border-strong": "#9CA3AF",

      accent: "#10B981",
      muted: "#6B7280",
      overlay: "rgba(0, 0, 0, 0.5)",
    },
    typography: {
      fontFamily: "Roboto",
      headingFont: "Roboto",
      monoFont: "JetBrains Mono",
      baseFontSize: "16px",
      fontSizes: {
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
      fontWeights: {
        thin: 100,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      lineHeights: {
        tight: 1.25,
        normal: 1.6,
        relaxed: 1.75,
        loose: 2,
      },
      letterSpacing: {
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
      },
      headingScale: 1.25,
    },
    spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      "2xl": "2.5rem",
      "3xl": "3rem",
      "4xl": "4rem",
      "5xl": "5rem",
      "6xl": "6rem",
    },
    borderRadius: {
      none: "0",
      sm: "0.25rem",
      base: "0.375rem",
      md: "0.5rem",
      lg: "0.75rem",
      xl: "1rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
      full: "9999px",
    },
    shadows: {
      none: "none",
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    },
    transitions: {
      duration: {
        fast: "150ms",
        normal: "250ms",
        slow: "350ms",
      },
      timing: {
        ease: "ease",
        "ease-in": "ease-in",
        "ease-out": "ease-out",
        "ease-in-out": "ease-in-out",
      },
    },
    zIndex: {
      dropdown: 1000,
      sticky: 1010,
      fixed: 1020,
      overlay: 1030,
      modal: 1040,
      popover: 1050,
      tooltip: 1060,
      toast: 1070,
    },
    components: {
      button: {
        borderRadius: "base",
        shadow: "sm",
        fontWeight: "medium",
        transition: "all 150ms ease-in-out",
        variants: {
          primary: {
            bg: "var(--theme-primary)",
            text: "var(--theme-text-inverse)",
            border: "var(--theme-primary)",
          },
          secondary: {
            bg: "var(--theme-secondary)",
            text: "var(--theme-text)",
            border: "var(--theme-secondary)",
          },
          outline: {
            bg: "transparent",
            text: "var(--theme-primary)",
            border: "var(--theme-primary)",
          },
          ghost: {
            bg: "transparent",
            text: "var(--theme-text)",
            border: "transparent",
          },
        },
      },
      input: {
        borderRadius: "base",
        borderWidth: "1px",
        fontSize: "base",
        padding: {
          sm: "0.5rem 0.75rem",
          md: "0.625rem 1rem",
          lg: "0.75rem 1.25rem",
        },
      },
      card: {
        borderRadius: "lg",
        shadow: "md",
        border: "1px solid var(--theme-border)",
        padding: "1.5rem",
      },
      modal: {
        overlay: "rgba(0, 0, 0, 0.5)",
        background: "var(--theme-background)",
        borderRadius: "xl",
        shadow: "2xl",
      },
    },
    layout: {
      containers: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        full: "100%",
      },
      sidebar: {
        width: "256px",
        collapsedWidth: "64px",
      },
      header: {
        height: "64px",
      },
      footer: {
        height: "80px",
      },
      grid: {
        columns: 12,
        gutter: "1rem",
      },
      breakpoints: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    isBuiltIn: true,
    isPublic: true,
    isDefault: false,
    version: "2.0.0",
    tags: ["green", "nature", "forest", "eco"],
  },

  // 4. Purple Passion - Rich purples and magentas
  {
    name: "Purple Passion",
    description: "Rich purples and creative magenta accents",
    mode: "light",
    colors: {
      primary: "#7C3AED",
      "primary-50": "#F5F3FF",
      "primary-100": "#EDE9FE",
      "primary-200": "#DDD6FE",
      "primary-300": "#C4B5FD",
      "primary-400": "#A78BFA",
      "primary-500": "#8B5CF6",
      "primary-600": "#7C3AED",
      "primary-700": "#6D28D9",
      "primary-800": "#5B21B6",
      "primary-900": "#4C1D95",

      secondary: "#BE185D",
      "secondary-50": "#FDF2F8",
      "secondary-100": "#FCE7F3",
      "secondary-200": "#FBCFE8",
      "secondary-300": "#F9A8D4",
      "secondary-400": "#F472B6",
      "secondary-500": "#EC4899",
      "secondary-600": "#DB2777",
      "secondary-700": "#BE185D",
      "secondary-800": "#9D174D",
      "secondary-900": "#831843",

      success: "#059669",
      warning: "#D97706",
      danger: "#DC2626",
      info: "#7C3AED",

      background: "#FEFCFF",
      "background-secondary": "#F9FAFB",
      surface: "#FFFFFF",
      "surface-variant": "#F3F4F6",

      text: "#1F2937",
      "text-secondary": "#4B5563",
      "text-muted": "#6B7280",
      "text-inverse": "#FFFFFF",

      border: "#E5E7EB",
      "border-light": "#F3F4F6",
      "border-strong": "#9CA3AF",

      accent: "#EC4899",
      muted: "#6B7280",
      overlay: "rgba(0, 0, 0, 0.5)",
    },
    typography: {
      fontFamily: "Montserrat",
      headingFont: "Montserrat",
      monoFont: "JetBrains Mono",
      baseFontSize: "16px",
      fontSizes: {
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
      fontWeights: {
        thin: 100,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      lineHeights: {
        tight: 1.25,
        normal: 1.6,
        relaxed: 1.75,
        loose: 2,
      },
      letterSpacing: {
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
      },
      headingScale: 1.25,
    },
    spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      "2xl": "2.5rem",
      "3xl": "3rem",
      "4xl": "4rem",
      "5xl": "5rem",
      "6xl": "6rem",
    },
    borderRadius: {
      none: "0",
      sm: "0.25rem",
      base: "0.375rem",
      md: "0.5rem",
      lg: "0.75rem",
      xl: "1rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
      full: "9999px",
    },
    shadows: {
      none: "none",
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    },
    transitions: {
      duration: {
        fast: "150ms",
        normal: "250ms",
        slow: "350ms",
      },
      timing: {
        ease: "ease",
        "ease-in": "ease-in",
        "ease-out": "ease-out",
        "ease-in-out": "ease-in-out",
      },
    },
    zIndex: {
      dropdown: 1000,
      sticky: 1010,
      fixed: 1020,
      overlay: 1030,
      modal: 1040,
      popover: 1050,
      tooltip: 1060,
      toast: 1070,
    },
    components: {
      button: {
        borderRadius: "base",
        shadow: "sm",
        fontWeight: "medium",
        transition: "all 150ms ease-in-out",
        variants: {
          primary: {
            bg: "var(--theme-primary)",
            text: "var(--theme-text-inverse)",
            border: "var(--theme-primary)",
          },
          secondary: {
            bg: "var(--theme-secondary)",
            text: "var(--theme-text)",
            border: "var(--theme-secondary)",
          },
          outline: {
            bg: "transparent",
            text: "var(--theme-primary)",
            border: "var(--theme-primary)",
          },
          ghost: {
            bg: "transparent",
            text: "var(--theme-text)",
            border: "transparent",
          },
        },
      },
      input: {
        borderRadius: "base",
        borderWidth: "1px",
        fontSize: "base",
        padding: {
          sm: "0.5rem 0.75rem",
          md: "0.625rem 1rem",
          lg: "0.75rem 1.25rem",
        },
      },
      card: {
        borderRadius: "lg",
        shadow: "md",
        border: "1px solid var(--theme-border)",
        padding: "1.5rem",
      },
      modal: {
        overlay: "rgba(0, 0, 0, 0.5)",
        background: "var(--theme-background)",
        borderRadius: "xl",
        shadow: "2xl",
      },
    },
    layout: {
      containers: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        full: "100%",
      },
      sidebar: {
        width: "256px",
        collapsedWidth: "64px",
      },
      header: {
        height: "64px",
      },
      footer: {
        height: "80px",
      },
      grid: {
        columns: 12,
        gutter: "1rem",
      },
      breakpoints: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    isBuiltIn: true,
    isPublic: true,
    isDefault: false,
    version: "2.0.0",
    tags: ["purple", "creative", "bold", "artistic"],
  },

  // 5. Midnight Dark - Professional dark theme
  {
    name: "Midnight Dark",
    description: "Professional dark theme with cool blue accents",
    mode: "dark",
    colors: {
      primary: "#3B82F6",
      "primary-50": "#EFF6FF",
      "primary-100": "#DBEAFE",
      "primary-200": "#BFDBFE",
      "primary-300": "#93C5FD",
      "primary-400": "#60A5FA",
      "primary-500": "#3B82F6",
      "primary-600": "#2563EB",
      "primary-700": "#1D4ED8",
      "primary-800": "#1E40AF",
      "primary-900": "#1E3A8A",

      secondary: "#64748B",
      "secondary-50": "#F8FAFC",
      "secondary-100": "#F1F5F9",
      "secondary-200": "#E2E8F0",
      "secondary-300": "#CBD5E1",
      "secondary-400": "#94A3B8",
      "secondary-500": "#64748B",
      "secondary-600": "#475569",
      "secondary-700": "#334155",
      "secondary-800": "#1E293B",
      "secondary-900": "#0F172A",

      success: "#10B981",
      warning: "#F59E0B",
      danger: "#EF4444",
      info: "#3B82F6",

      background: "#0F172A",
      "background-secondary": "#1E293B",
      surface: "#1E293B",
      "surface-variant": "#334155",

      text: "#F8FAFC",
      "text-secondary": "#CBD5E1",
      "text-muted": "#94A3B8",
      "text-inverse": "#0F172A",

      border: "#334155",
      "border-light": "#475569",
      "border-strong": "#64748B",

      accent: "#06B6D4",
      muted: "#64748B",
      overlay: "rgba(0, 0, 0, 0.7)",
    },
    typography: {
      fontFamily: "Inter",
      headingFont: "Inter",
      monoFont: "JetBrains Mono",
      baseFontSize: "16px",
      fontSizes: {
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
      fontWeights: {
        thin: 100,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      lineHeights: {
        tight: 1.25,
        normal: 1.6,
        relaxed: 1.75,
        loose: 2,
      },
      letterSpacing: {
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
      },
      headingScale: 1.25,
    },
    spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      "2xl": "2.5rem",
      "3xl": "3rem",
      "4xl": "4rem",
      "5xl": "5rem",
      "6xl": "6rem",
    },
    borderRadius: {
      none: "0",
      sm: "0.25rem",
      base: "0.375rem",
      md: "0.5rem",
      lg: "0.75rem",
      xl: "1rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
      full: "9999px",
    },
    shadows: {
      none: "none",
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
      base: "0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.2)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)",
    },
    transitions: {
      duration: {
        fast: "150ms",
        normal: "250ms",
        slow: "350ms",
      },
      timing: {
        ease: "ease",
        "ease-in": "ease-in",
        "ease-out": "ease-out",
        "ease-in-out": "ease-in-out",
      },
    },
    zIndex: {
      dropdown: 1000,
      sticky: 1010,
      fixed: 1020,
      overlay: 1030,
      modal: 1040,
      popover: 1050,
      tooltip: 1060,
      toast: 1070,
    },
    components: {
      button: {
        borderRadius: "base",
        shadow: "sm",
        fontWeight: "medium",
        transition: "all 150ms ease-in-out",
        variants: {
          primary: {
            bg: "var(--theme-primary)",
            text: "var(--theme-text-inverse)",
            border: "var(--theme-primary)",
          },
          secondary: {
            bg: "var(--theme-secondary)",
            text: "var(--theme-text)",
            border: "var(--theme-secondary)",
          },
          outline: {
            bg: "transparent",
            text: "var(--theme-primary)",
            border: "var(--theme-primary)",
          },
          ghost: {
            bg: "transparent",
            text: "var(--theme-text)",
            border: "transparent",
          },
        },
      },
      input: {
        borderRadius: "base",
        borderWidth: "1px",
        fontSize: "base",
        padding: {
          sm: "0.5rem 0.75rem",
          md: "0.625rem 1rem",
          lg: "0.75rem 1.25rem",
        },
      },
      card: {
        borderRadius: "lg",
        shadow: "md",
        border: "1px solid var(--theme-border)",
        padding: "1.5rem",
      },
      modal: {
        overlay: "rgba(0, 0, 0, 0.7)",
        background: "var(--theme-background)",
        borderRadius: "xl",
        shadow: "2xl",
      },
    },
    layout: {
      containers: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        full: "100%",
      },
      sidebar: {
        width: "256px",
        collapsedWidth: "64px",
      },
      header: {
        height: "64px",
      },
      footer: {
        height: "80px",
      },
      grid: {
        columns: 12,
        gutter: "1rem",
      },
      breakpoints: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    isBuiltIn: true,
    isPublic: true,
    isDefault: false,
    version: "2.0.0",
    tags: ["dark", "professional", "blue", "midnight"],
  },

  // 6. Rose Gold - Elegant pink and gold tones
  {
    name: "Rose Gold",
    description: "Elegant rose gold with sophisticated pink tones",
    mode: "light",
    colors: {
      primary: "#E11D48",
      "primary-50": "#FFF1F2",
      "primary-100": "#FFE4E6",
      "primary-200": "#FECDD3",
      "primary-300": "#FDA4AF",
      "primary-400": "#FB7185",
      "primary-500": "#F43F5E",
      "primary-600": "#E11D48",
      "primary-700": "#BE123C",
      "primary-800": "#9F1239",
      "primary-900": "#881337",

      secondary: "#A855F7",
      "secondary-50": "#FAF5FF",
      "secondary-100": "#F3E8FF",
      "secondary-200": "#E9D5FF",
      "secondary-300": "#D8B4FE",
      "secondary-400": "#C084FC",
      "secondary-500": "#A855F7",
      "secondary-600": "#9333EA",
      "secondary-700": "#7C3AED",
      "secondary-800": "#6B21A8",
      "secondary-900": "#581C87",

      success: "#059669",
      warning: "#D97706",
      danger: "#DC2626",
      info: "#0284C7",

      background: "#FFF8F8",
      "background-secondary": "#FEF2F2",
      surface: "#FFFFFF",
      "surface-variant": "#F9FAFB",

      text: "#1F2937",
      "text-secondary": "#4B5563",
      "text-muted": "#6B7280",
      "text-inverse": "#FFFFFF",

      border: "#F3E8FF",
      "border-light": "#FEF2F2",
      "border-strong": "#E5E7EB",

      accent: "#F59E0B",
      muted: "#6B7280",
      overlay: "rgba(0, 0, 0, 0.5)",
    },
    typography: {
      fontFamily: "Playfair Display",
      headingFont: "Playfair Display",
      monoFont: "JetBrains Mono",
      baseFontSize: "16px",
      fontSizes: {
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
      fontWeights: {
        thin: 100,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      lineHeights: {
        tight: 1.25,
        normal: 1.6,
        relaxed: 1.75,
        loose: 2,
      },
      letterSpacing: {
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
      },
      headingScale: 1.25,
    },
    spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      "2xl": "2.5rem",
      "3xl": "3rem",
      "4xl": "4rem",
      "5xl": "5rem",
      "6xl": "6rem",
    },
    borderRadius: {
      none: "0",
      sm: "0.25rem",
      base: "0.375rem",
      md: "0.5rem",
      lg: "0.75rem",
      xl: "1rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
      full: "9999px",
    },
    shadows: {
      none: "none",
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    },
    transitions: {
      duration: {
        fast: "150ms",
        normal: "250ms",
        slow: "350ms",
      },
      timing: {
        ease: "ease",
        "ease-in": "ease-in",
        "ease-out": "ease-out",
        "ease-in-out": "ease-in-out",
      },
    },
    zIndex: {
      dropdown: 1000,
      sticky: 1010,
      fixed: 1020,
      overlay: 1030,
      modal: 1040,
      popover: 1050,
      tooltip: 1060,
      toast: 1070,
    },
    components: {
      button: {
        borderRadius: "xl",
        shadow: "md",
        fontWeight: "medium",
        transition: "all 150ms ease-in-out",
        variants: {
          primary: {
            bg: "var(--theme-primary)",
            text: "var(--theme-text-inverse)",
            border: "var(--theme-primary)",
          },
          secondary: {
            bg: "var(--theme-secondary)",
            text: "var(--theme-text)",
            border: "var(--theme-secondary)",
          },
          outline: {
            bg: "transparent",
            text: "var(--theme-primary)",
            border: "var(--theme-primary)",
          },
          ghost: {
            bg: "transparent",
            text: "var(--theme-text)",
            border: "transparent",
          },
        },
      },
      input: {
        borderRadius: "lg",
        borderWidth: "1px",
        fontSize: "base",
        padding: {
          sm: "0.5rem 0.75rem",
          md: "0.625rem 1rem",
          lg: "0.75rem 1.25rem",
        },
      },
      card: {
        borderRadius: "xl",
        shadow: "lg",
        border: "1px solid var(--theme-border)",
        padding: "1.5rem",
      },
      modal: {
        overlay: "rgba(0, 0, 0, 0.5)",
        background: "var(--theme-background)",
        borderRadius: "2xl",
        shadow: "2xl",
      },
    },
    layout: {
      containers: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        full: "100%",
      },
      sidebar: {
        width: "256px",
        collapsedWidth: "64px",
      },
      header: {
        height: "64px",
      },
      footer: {
        height: "80px",
      },
      grid: {
        columns: 12,
        gutter: "1rem",
      },
      breakpoints: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    isBuiltIn: true,
    isPublic: true,
    isDefault: false,
    version: "2.0.0",
    tags: ["rose", "gold", "elegant", "feminine"],
  },

  // 7. Cyber Neon - Futuristic neon colors
  {
    name: "Cyber Neon",
    description: "Futuristic cyber theme with neon accents",
    mode: "dark",
    colors: {
      primary: "#00F5FF",
      "primary-50": "#F0FDFF",
      "primary-100": "#CCFBF1",
      "primary-200": "#99F6E4",
      "primary-300": "#5EEAD4",
      "primary-400": "#2DD4BF",
      "primary-500": "#14B8A6",
      "primary-600": "#0D9488",
      "primary-700": "#0F766E",
      "primary-800": "#115E59",
      "primary-900": "#134E4A",

      secondary: "#FF00FF",
      "secondary-50": "#FEF7FF",
      "secondary-100": "#FFEAFF",
      "secondary-200": "#FFD6FF",
      "secondary-300": "#FFB3FF",
      "secondary-400": "#FF80FF",
      "secondary-500": "#FF4DFF",
      "secondary-600": "#FF1AFF",
      "secondary-700": "#E600E6",
      "secondary-800": "#B300B3",
      "secondary-900": "#800080",

      success: "#00FF00",
      warning: "#FFFF00",
      danger: "#FF0040",
      info: "#00F5FF",

      background: "#0A0A0A",
      "background-secondary": "#1A1A1A",
      surface: "#1A1A1A",
      "surface-variant": "#2A2A2A",

      text: "#FFFFFF",
      "text-secondary": "#CCCCCC",
      "text-muted": "#999999",
      "text-inverse": "#000000",

      border: "#333333",
      "border-light": "#404040",
      "border-strong": "#666666",

      accent: "#00FFFF",
      muted: "#666666",
      overlay: "rgba(0, 0, 0, 0.8)",
    },
    typography: {
      fontFamily: "JetBrains Mono",
      headingFont: "JetBrains Mono",
      monoFont: "JetBrains Mono",
      baseFontSize: "16px",
      fontSizes: {
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
      fontWeights: {
        thin: 100,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      lineHeights: {
        tight: 1.25,
        normal: 1.6,
        relaxed: 1.75,
        loose: 2,
      },
      letterSpacing: {
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
      },
      headingScale: 1.25,
    },
    spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      "2xl": "2.5rem",
      "3xl": "3rem",
      "4xl": "4rem",
      "5xl": "5rem",
      "6xl": "6rem",
    },
    borderRadius: {
      none: "0",
      sm: "0.25rem",
      base: "0.375rem",
      md: "0.5rem",
      lg: "0.75rem",
      xl: "1rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
      full: "9999px",
    },
    shadows: {
      none: "none",
      sm: "0 0 5px rgba(0, 245, 255, 0.3)",
      base: "0 0 10px rgba(0, 245, 255, 0.4)",
      md: "0 0 15px rgba(0, 245, 255, 0.5)",
      lg: "0 0 20px rgba(0, 245, 255, 0.6)",
      xl: "0 0 25px rgba(0, 245, 255, 0.7)",
      "2xl": "0 0 30px rgba(0, 245, 255, 0.8)",
      inner: "inset 0 0 10px rgba(0, 245, 255, 0.3)",
    },
    transitions: {
      duration: {
        fast: "150ms",
        normal: "250ms",
        slow: "350ms",
      },
      timing: {
        ease: "ease",
        "ease-in": "ease-in",
        "ease-out": "ease-out",
        "ease-in-out": "ease-in-out",
      },
    },
    zIndex: {
      dropdown: 1000,
      sticky: 1010,
      fixed: 1020,
      overlay: 1030,
      modal: 1040,
      popover: 1050,
      tooltip: 1060,
      toast: 1070,
    },
    components: {
      button: {
        borderRadius: "sm",
        shadow: "md",
        fontWeight: "medium",
        transition: "all 150ms ease-in-out",
        variants: {
          primary: {
            bg: "var(--theme-primary)",
            text: "var(--theme-text-inverse)",
            border: "var(--theme-primary)",
          },
          secondary: {
            bg: "var(--theme-secondary)",
            text: "var(--theme-text)",
            border: "var(--theme-secondary)",
          },
          outline: {
            bg: "transparent",
            text: "var(--theme-primary)",
            border: "var(--theme-primary)",
          },
          ghost: {
            bg: "transparent",
            text: "var(--theme-text)",
            border: "transparent",
          },
        },
      },
      input: {
        borderRadius: "sm",
        borderWidth: "1px",
        fontSize: "base",
        padding: {
          sm: "0.5rem 0.75rem",
          md: "0.625rem 1rem",
          lg: "0.75rem 1.25rem",
        },
      },
      card: {
        borderRadius: "base",
        shadow: "lg",
        border: "1px solid var(--theme-border)",
        padding: "1.5rem",
      },
      modal: {
        overlay: "rgba(0, 0, 0, 0.8)",
        background: "var(--theme-background)",
        borderRadius: "lg",
        shadow: "2xl",
      },
    },
    layout: {
      containers: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        full: "100%",
      },
      sidebar: {
        width: "256px",
        collapsedWidth: "64px",
      },
      header: {
        height: "64px",
      },
      footer: {
        height: "80px",
      },
      grid: {
        columns: 12,
        gutter: "1rem",
      },
      breakpoints: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    isBuiltIn: true,
    isPublic: true,
    isDefault: false,
    version: "2.0.0",
    tags: ["cyber", "neon", "futuristic", "gaming"],
  },

  // 8. Minimalist White - Clean and minimal
  {
    name: "Minimalist White",
    description: "Ultra-clean minimalist design with subtle grays",
    mode: "light",
    colors: {
      primary: "#000000",
      "primary-50": "#F9FAFB",
      "primary-100": "#F3F4F6",
      "primary-200": "#E5E7EB",
      "primary-300": "#D1D5DB",
      "primary-400": "#9CA3AF",
      "primary-500": "#6B7280",
      "primary-600": "#4B5563",
      "primary-700": "#374151",
      "primary-800": "#1F2937",
      "primary-900": "#111827",

      secondary: "#6B7280",
      "secondary-50": "#F9FAFB",
      "secondary-100": "#F3F4F6",
      "secondary-200": "#E5E7EB",
      "secondary-300": "#D1D5DB",
      "secondary-400": "#9CA3AF",
      "secondary-500": "#6B7280",
      "secondary-600": "#4B5563",
      "secondary-700": "#374151",
      "secondary-800": "#1F2937",
      "secondary-900": "#111827",

      success: "#10B981",
      warning: "#F59E0B",
      danger: "#EF4444",
      info: "#3B82F6",

      background: "#FFFFFF",
      "background-secondary": "#FAFAFA",
      surface: "#FFFFFF",
      "surface-variant": "#F9FAFB",

      text: "#000000",
      "text-secondary": "#374151",
      "text-muted": "#6B7280",
      "text-inverse": "#FFFFFF",

      border: "#E5E7EB",
      "border-light": "#F3F4F6",
      "border-strong": "#D1D5DB",

      accent: "#3B82F6",
      muted: "#9CA3AF",
      overlay: "rgba(0, 0, 0, 0.4)",
    },
    typography: {
      fontFamily: "Inter",
      headingFont: "Inter",
      monoFont: "JetBrains Mono",
      baseFontSize: "16px",
      fontSizes: {
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
      fontWeights: {
        thin: 100,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      lineHeights: {
        tight: 1.25,
        normal: 1.6,
        relaxed: 1.75,
        loose: 2,
      },
      letterSpacing: {
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
      },
      headingScale: 1.25,
    },
    spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      "2xl": "2.5rem",
      "3xl": "3rem",
      "4xl": "4rem",
      "5xl": "5rem",
      "6xl": "6rem",
    },
    borderRadius: {
      none: "0",
      sm: "0.125rem",
      base: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
      "3xl": "1.5rem",
      full: "9999px",
    },
    shadows: {
      none: "none",
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    },
    transitions: {
      duration: {
        fast: "150ms",
        normal: "250ms",
        slow: "350ms",
      },
      timing: {
        ease: "ease",
        "ease-in": "ease-in",
        "ease-out": "ease-out",
        "ease-in-out": "ease-in-out",
      },
    },
    zIndex: {
      dropdown: 1000,
      sticky: 1010,
      fixed: 1020,
      overlay: 1030,
      modal: 1040,
      popover: 1050,
      tooltip: 1060,
      toast: 1070,
    },
    components: {
      button: {
        borderRadius: "base",
        shadow: "none",
        fontWeight: "medium",
        transition: "all 150ms ease-in-out",
        variants: {
          primary: {
            bg: "var(--theme-primary)",
            text: "var(--theme-text-inverse)",
            border: "var(--theme-primary)",
          },
          secondary: {
            bg: "var(--theme-secondary)",
            text: "var(--theme-text)",
            border: "var(--theme-secondary)",
          },
          outline: {
            bg: "transparent",
            text: "var(--theme-primary)",
            border: "var(--theme-primary)",
          },
          ghost: {
            bg: "transparent",
            text: "var(--theme-text)",
            border: "transparent",
          },
        },
      },
      input: {
        borderRadius: "base",
        borderWidth: "1px",
        fontSize: "base",
        padding: {
          sm: "0.5rem 0.75rem",
          md: "0.625rem 1rem",
          lg: "0.75rem 1.25rem",
        },
      },
      card: {
        borderRadius: "lg",
        shadow: "sm",
        border: "1px solid var(--theme-border)",
        padding: "1.5rem",
      },
      modal: {
        overlay: "rgba(0, 0, 0, 0.4)",
        background: "var(--theme-background)",
        borderRadius: "lg",
        shadow: "xl",
      },
    },
    layout: {
      containers: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        full: "100%",
      },
      sidebar: {
        width: "256px",
        collapsedWidth: "64px",
      },
      header: {
        height: "64px",
      },
      footer: {
        height: "80px",
      },
      grid: {
        columns: 12,
        gutter: "1rem",
      },
      breakpoints: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    isBuiltIn: true,
    isPublic: true,
    isDefault: false,
    version: "2.0.0",
    tags: ["minimal", "clean", "white", "simple"],
  },

  // 9. Autumn Harvest - Warm autumn colors
  {
    name: "Autumn Harvest",
    description: "Warm autumn colors with rich browns and oranges",
    mode: "light",
    colors: {
      primary: "#DC2626",
      "primary-50": "#FEF2F2",
      "primary-100": "#FEE2E2",
      "primary-200": "#FECACA",
      "primary-300": "#FCA5A5",
      "primary-400": "#F87171",
      "primary-500": "#EF4444",
      "primary-600": "#DC2626",
      "primary-700": "#B91C1C",
      "primary-800": "#991B1B",
      "primary-900": "#7F1D1D",

      secondary: "#92400E",
      "secondary-50": "#FFFBEB",
      "secondary-100": "#FEF3C7",
      "secondary-200": "#FDE68A",
      "secondary-300": "#FCD34D",
      "secondary-400": "#FBBF24",
      "secondary-500": "#F59E0B",
      "secondary-600": "#D97706",
      "secondary-700": "#B45309",
      "secondary-800": "#92400E",
      "secondary-900": "#78350F",

      success: "#059669",
      warning: "#D97706",
      danger: "#DC2626",
      info: "#0284C7",

      background: "#FFFBEB",
      "background-secondary": "#FEF3C7",
      surface: "#FFFFFF",
      "surface-variant": "#FDF6E3",

      text: "#78350F",
      "text-secondary": "#92400E",
      "text-muted": "#A16207",
      "text-inverse": "#FFFFFF",

      border: "#FDE68A",
      "border-light": "#FEF3C7",
      "border-strong": "#F59E0B",

      accent: "#EA580C",
      muted: "#A16207",
      overlay: "rgba(0, 0, 0, 0.5)",
    },
    typography: {
      fontFamily: "Merriweather",
      headingFont: "Merriweather",
      monoFont: "JetBrains Mono",
      baseFontSize: "16px",
      fontSizes: {
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
      fontWeights: {
        thin: 100,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      lineHeights: {
        tight: 1.25,
        normal: 1.6,
        relaxed: 1.75,
        loose: 2,
      },
      letterSpacing: {
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
      },
      headingScale: 1.25,
    },
    spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      "2xl": "2.5rem",
      "3xl": "3rem",
      "4xl": "4rem",
      "5xl": "5rem",
      "6xl": "6rem",
    },
    borderRadius: {
      none: "0",
      sm: "0.25rem",
      base: "0.375rem",
      md: "0.5rem",
      lg: "0.75rem",
      xl: "1rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
      full: "9999px",
    },
    shadows: {
      none: "none",
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    },
    transitions: {
      duration: {
        fast: "150ms",
        normal: "250ms",
        slow: "350ms",
      },
      timing: {
        ease: "ease",
        "ease-in": "ease-in",
        "ease-out": "ease-out",
        "ease-in-out": "ease-in-out",
      },
    },
    zIndex: {
      dropdown: 1000,
      sticky: 1010,
      fixed: 1020,
      overlay: 1030,
      modal: 1040,
      popover: 1050,
      tooltip: 1060,
      toast: 1070,
    },
    components: {
      button: {
        borderRadius: "lg",
        shadow: "md",
        fontWeight: "medium",
        transition: "all 150ms ease-in-out",
        variants: {
          primary: {
            bg: "var(--theme-primary)",
            text: "var(--theme-text-inverse)",
            border: "var(--theme-primary)",
          },
          secondary: {
            bg: "var(--theme-secondary)",
            text: "var(--theme-text)",
            border: "var(--theme-secondary)",
          },
          outline: {
            bg: "transparent",
            text: "var(--theme-primary)",
            border: "var(--theme-primary)",
          },
          ghost: {
            bg: "transparent",
            text: "var(--theme-text)",
            border: "transparent",
          },
        },
      },
      input: {
        borderRadius: "lg",
        borderWidth: "1px",
        fontSize: "base",
        padding: {
          sm: "0.5rem 0.75rem",
          md: "0.625rem 1rem",
          lg: "0.75rem 1.25rem",
        },
      },
      card: {
        borderRadius: "xl",
        shadow: "lg",
        border: "1px solid var(--theme-border)",
        padding: "1.5rem",
      },
      modal: {
        overlay: "rgba(0, 0, 0, 0.5)",
        background: "var(--theme-background)",
        borderRadius: "xl",
        shadow: "2xl",
      },
    },
    layout: {
      containers: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        full: "100%",
      },
      sidebar: {
        width: "256px",
        collapsedWidth: "64px",
      },
      header: {
        height: "64px",
      },
      footer: {
        height: "80px",
      },
      grid: {
        columns: 12,
        gutter: "1rem",
      },
      breakpoints: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    isBuiltIn: true,
    isPublic: true,
    isDefault: false,
    version: "2.0.0",
    tags: ["autumn", "warm", "harvest", "cozy"],
  },

  // 10. Electric Blue - Vibrant electric theme
  {
    name: "Electric Blue",
    description: "High-energy electric blue with vibrant accents",
    mode: "light",
    colors: {
      primary: "#0EA5E9",
      "primary-50": "#F0F9FF",
      "primary-100": "#E0F2FE",
      "primary-200": "#BAE6FD",
      "primary-300": "#7DD3FC",
      "primary-400": "#38BDF8",
      "primary-500": "#0EA5E9",
      "primary-600": "#0284C7",
      "primary-700": "#0369A1",
      "primary-800": "#075985",
      "primary-900": "#0C4A6E",

      secondary: "#8B5CF6",
      "secondary-50": "#F5F3FF",
      "secondary-100": "#EDE9FE",
      "secondary-200": "#DDD6FE",
      "secondary-300": "#C4B5FD",
      "secondary-400": "#A78BFA",
      "secondary-500": "#8B5CF6",
      "secondary-600": "#7C3AED",
      "secondary-700": "#6D28D9",
      "secondary-800": "#5B21B6",
      "secondary-900": "#4C1D95",

      success: "#10B981",
      warning: "#F59E0B",
      danger: "#EF4444",
      info: "#0EA5E9",

      background: "#F0F9FF",
      "background-secondary": "#E0F2FE",
      surface: "#FFFFFF",
      "surface-variant": "#F8FAFC",

      text: "#0C4A6E",
      "text-secondary": "#0369A1",
      "text-muted": "#0284C7",
      "text-inverse": "#FFFFFF",

      border: "#BAE6FD",
      "border-light": "#E0F2FE",
      "border-strong": "#38BDF8",

      accent: "#06B6D4",
      muted: "#64748B",
      overlay: "rgba(0, 0, 0, 0.5)",
    },
    typography: {
      fontFamily: "Source Sans Pro",
      headingFont: "Source Sans Pro",
      monoFont: "Fira Code",
      baseFontSize: "16px",
      fontSizes: {
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
      fontWeights: {
        thin: 100,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      lineHeights: {
        tight: 1.25,
        normal: 1.6,
        relaxed: 1.75,
        loose: 2,
      },
      letterSpacing: {
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
      },
      headingScale: 1.25,
    },
    spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      "2xl": "2.5rem",
      "3xl": "3rem",
      "4xl": "4rem",
      "5xl": "5rem",
      "6xl": "6rem",
    },
    borderRadius: {
      none: "0",
      sm: "0.25rem",
      base: "0.375rem",
      md: "0.5rem",
      lg: "0.75rem",
      xl: "1rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
      full: "9999px",
    },
    shadows: {
      none: "none",
      sm: "0 1px 2px 0 rgba(14, 165, 233, 0.1)",
      base: "0 1px 3px 0 rgba(14, 165, 233, 0.2), 0 1px 2px 0 rgba(14, 165, 233, 0.1)",
      md: "0 4px 6px -1px rgba(14, 165, 233, 0.2), 0 2px 4px -1px rgba(14, 165, 233, 0.1)",
      lg: "0 10px 15px -3px rgba(14, 165, 233, 0.2), 0 4px 6px -2px rgba(14, 165, 233, 0.1)",
      xl: "0 20px 25px -5px rgba(14, 165, 233, 0.2), 0 10px 10px -5px rgba(14, 165, 233, 0.1)",
      "2xl": "0 25px 50px -12px rgba(14, 165, 233, 0.4)",
      inner: "inset 0 2px 4px 0 rgba(14, 165, 233, 0.1)",
    },
    transitions: {
      duration: {
        fast: "150ms",
        normal: "250ms",
        slow: "350ms",
      },
      timing: {
        ease: "ease",
        "ease-in": "ease-in",
        "ease-out": "ease-out",
        "ease-in-out": "ease-in-out",
      },
    },
    zIndex: {
      dropdown: 1000,
      sticky: 1010,
      fixed: 1020,
      overlay: 1030,
      modal: 1040,
      popover: 1050,
      tooltip: 1060,
      toast: 1070,
    },
    components: {
      button: {
        borderRadius: "lg",
        shadow: "lg",
        fontWeight: "semibold",
        transition: "all 150ms ease-in-out",
        variants: {
          primary: {
            bg: "var(--theme-primary)",
            text: "var(--theme-text-inverse)",
            border: "var(--theme-primary)",
          },
          secondary: {
            bg: "var(--theme-secondary)",
            text: "var(--theme-text)",
            border: "var(--theme-secondary)",
          },
          outline: {
            bg: "transparent",
            text: "var(--theme-primary)",
            border: "var(--theme-primary)",
          },
          ghost: {
            bg: "transparent",
            text: "var(--theme-text)",
            border: "transparent",
          },
        },
      },
      input: {
        borderRadius: "lg",
        borderWidth: "2px",
        fontSize: "base",
        padding: {
          sm: "0.5rem 0.75rem",
          md: "0.625rem 1rem",
          lg: "0.75rem 1.25rem",
        },
      },
      card: {
        borderRadius: "xl",
        shadow: "xl",
        border: "1px solid var(--theme-border)",
        padding: "1.5rem",
      },
      modal: {
        overlay: "rgba(0, 0, 0, 0.5)",
        background: "var(--theme-background)",
        borderRadius: "2xl",
        shadow: "2xl",
      },
    },
    layout: {
      containers: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        full: "100%",
      },
      sidebar: {
        width: "256px",
        collapsedWidth: "64px",
      },
      header: {
        height: "64px",
      },
      footer: {
        height: "80px",
      },
      grid: {
        columns: 12,
        gutter: "1rem",
      },
      breakpoints: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    isBuiltIn: true,
    isPublic: true,
    isDefault: false,
    version: "2.0.0",
    tags: ["electric", "blue", "vibrant", "energy"],
  },
];

export const GOOGLE_FONTS = [
  {
    name: "Inter",
    category: "sans-serif",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: "Poppins",
    category: "sans-serif",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: "Roboto",
    category: "sans-serif",
    weights: [100, 300, 400, 500, 700, 900],
  },
  {
    name: "Open Sans",
    category: "sans-serif",
    weights: [300, 400, 500, 600, 700, 800],
  },
  { name: "Lato", category: "sans-serif", weights: [100, 300, 400, 700, 900] },
  {
    name: "Montserrat",
    category: "sans-serif",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: "Source Sans Pro",
    category: "sans-serif",
    weights: [200, 300, 400, 600, 700, 900],
  },
  {
    name: "Nunito",
    category: "sans-serif",
    weights: [200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: "Playfair Display",
    category: "serif",
    weights: [400, 500, 600, 700, 800, 900],
  },
  { name: "Merriweather", category: "serif", weights: [300, 400, 700, 900] },
  {
    name: "JetBrains Mono",
    category: "monospace",
    weights: [100, 200, 300, 400, 500, 600, 700, 800],
  },
  {
    name: "Fira Code",
    category: "monospace",
    weights: [300, 400, 500, 600, 700],
  },
];

// Theme categories for organization
export const THEME_CATEGORIES = [
  { id: "business", name: "Business", icon: "briefcase" },
  { id: "creative", name: "Creative", icon: "palette" },
  { id: "minimal", name: "Minimal", icon: "minus" },
  { id: "dark", name: "Dark", icon: "moon" },
  { id: "colorful", name: "Colorful", icon: "rainbow" },
  { id: "professional", name: "Professional", icon: "tie" },
];

// Default permissions for different user roles
export const DEFAULT_PERMISSIONS: Record<string, ThemePermissions> = {
  admin: {
    canView: true,
    canEdit: true,
    canDelete: true,
    canDuplicate: true,
    canExport: true,
    canImport: true,
    canPublish: true,
    canSetAsDefault: true,
  },
  editor: {
    canView: true,
    canEdit: true,
    canDelete: false,
    canDuplicate: true,
    canExport: true,
    canImport: true,
    canPublish: false,
    canSetAsDefault: false,
  },
  viewer: {
    canView: true,
    canEdit: false,
    canDelete: false,
    canDuplicate: true,
    canExport: false,
    canImport: false,
    canPublish: false,
    canSetAsDefault: false,
  },
};
