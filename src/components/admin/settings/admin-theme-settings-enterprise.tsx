"use client";

import React from "react";
import { EnterpriseThemeProvider } from "@/contexts/enterprise-theme-context";
import { EnterpriseThemeCustomizer } from "./enterprise-theme-customizer";
import {
  Palette,
  Wand2,
  Globe,
  Users,
  BarChart3,
  Shield,
  Crown,
  Zap,
  Download,
  Upload,
  Star,
  Layers,
} from "lucide-react";

export function AdminThemeSettings() {
  const features = [
    {
      icon: Palette,
      title: "Advanced Color System",
      description:
        "Full color palette control with 50+ shades per color, semantic colors, and real-time preview",
      status: "available",
    },
    {
      icon: Wand2,
      title: "Typography Designer",
      description:
        "Complete typography control with Google Fonts, font scales, and responsive text sizing",
      status: "available",
    },
    {
      icon: Layers,
      title: "Component Styling",
      description:
        "Customize buttons, inputs, cards, and all UI components with advanced style options",
      status: "available",
    },
    {
      icon: Globe,
      title: "White-label Branding",
      description:
        "Upload custom logos, set company information, and fully brand your application",
      status: "premium",
    },
    {
      icon: Users,
      title: "Multi-tenant Support",
      description:
        "Separate themes per tenant with domain-based isolation and role-based permissions",
      status: "enterprise",
    },
    {
      icon: BarChart3,
      title: "Theme Analytics",
      description:
        "Track theme usage, performance metrics, and user engagement with detailed analytics",
      status: "enterprise",
    },
    {
      icon: Shield,
      title: "Access Control",
      description:
        "Role-based permissions for theme editing, publishing, and management",
      status: "available",
    },
    {
      icon: Crown,
      title: "Theme Marketplace",
      description:
        "Access to premium themes, community themes, and ability to publish your own",
      status: "premium",
    },
    {
      icon: Zap,
      title: "Real-time Collaboration",
      description:
        "Work on themes with your team in real-time with live cursors and changes",
      status: "enterprise",
    },
    {
      icon: Download,
      title: "Export & Import",
      description:
        "Export themes as JSON, CSS, or SCSS and import from various formats",
      status: "available",
    },
    {
      icon: Upload,
      title: "Version Control",
      description:
        "Theme versioning, rollback capabilities, and change history tracking",
      status: "premium",
    },
    {
      icon: Star,
      title: "AI Theme Generator",
      description:
        "Generate themes using AI based on your brand guidelines and preferences",
      status: "coming-soon",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300">
            Available
          </span>
        );
      case "premium":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
            Premium
          </span>
        );
      case "enterprise":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
            Enterprise
          </span>
        );
      case "coming-soon":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300">
            Coming Soon
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <EnterpriseThemeProvider
      tenantId="tenant-1"
      userId="admin-1"
      userRole="admin"
    >
      <div className="space-y-8">
        {/* Header Section */}
        <div className="text-center py-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="max-w-3xl mx-auto px-6">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Palette className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Enterprise Theme Studio
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
              Complete design system control with advanced customization
              capabilities, white-label branding, and enterprise-grade features.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Professional Design Tools
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Real-time Preview
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Multi-tenant Ready
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Theme System Features
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Comprehensive theme customization with enterprise-grade
              capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                      <Icon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    {getStatusBadge(feature.status)}
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              50+
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Design Tokens
            </div>
          </div>
          <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              12
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Google Fonts
            </div>
          </div>
          <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              ∞
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Custom Themes
            </div>
          </div>
          <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              3
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Device Previews
            </div>
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Quick Start Guide
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 dark:text-blue-400 font-semibold">
                  1
                </span>
              </div>
              <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">
                Choose a Base Theme
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Start with one of our built-in themes or create a new one from
                scratch
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 dark:text-green-400 font-semibold">
                  2
                </span>
              </div>
              <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">
                Customize Design Tokens
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Adjust colors, typography, spacing, and components to match your
                brand
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 dark:text-purple-400 font-semibold">
                  3
                </span>
              </div>
              <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">
                Apply & Preview
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Preview your changes in real-time and apply when you&apos;re
                satisfied
              </p>
            </div>
          </div>
        </div>

        {/* Theme Customizer */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Theme Customizer
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Professional theme editor with real-time preview and advanced
                  controls
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm font-medium rounded-full">
                  Live
                </span>
              </div>
            </div>
          </div>

          <div className="p-0">
            <EnterpriseThemeCustomizer />
          </div>
        </div>

        {/* Additional Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Theme Documentation
            </h4>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Learn about design tokens, component styling, and advanced theming
              techniques.
            </p>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
              <Globe className="h-4 w-4" />
              View Documentation
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800 p-6">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Theme Marketplace
            </h4>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Discover premium themes created by our community and professional
              designers.
            </p>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors">
              <Star className="h-4 w-4" />
              Browse Themes
            </button>
          </div>
        </div>

        {/* Support Information */}
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Need Help with Theme Customization?
            </h4>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Our team is here to help you create the perfect theme for your
              application.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                Contact Support
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </EnterpriseThemeProvider>
  );
}
