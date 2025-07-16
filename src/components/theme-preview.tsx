"use client";

import React from "react";
import { useThemeStore } from "../store/theme-store";

export default function ThemePreview() {
  const { activeTheme, previewTheme, isPreviewMode } = useThemeStore();

  const currentTheme = isPreviewMode ? previewTheme : activeTheme;

  if (!currentTheme) {
    return (
      <div className="theme-preview-container p-6 rounded-lg">
        <div className="text-center">
          <p className="text-neutral-600">Loading preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="theme-preview-container rounded-lg overflow-hidden">
      {/* Preview Header */}
      <div className="bg-white border-b border-neutral-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Live Preview</h2>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-neutral-600">Theme:</span>
            <span className="font-medium">{currentTheme.name}</span>
            {isPreviewMode && (
              <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">
                Preview Mode
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="bg-neutral-50 p-6 min-h-[600px]">
        {/* Hero Section Preview */}
        <section
          className="mb-8 p-8 rounded-lg"
          style={{
            background: `linear-gradient(135deg, ${currentTheme.colorPalette.primary[500]}, ${currentTheme.colorPalette.accent[500]})`,
          }}
        >
          <div className="text-center text-white">
            <h1
              className="text-4xl font-bold mb-4"
              style={{ fontFamily: currentTheme.typography.family }}
            >
              Welcome to Your Store
            </h1>
            <p className="text-lg mb-6 opacity-90">
              Discover amazing products with our new theme
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
                style={{
                  backgroundColor: currentTheme.colorPalette.secondary[500],
                  borderRadius: currentTheme.layout.borderRadius.md,
                }}
              >
                Shop Now
              </button>
              <button
                className="px-6 py-3 rounded-lg font-medium border-2 border-white text-white hover:bg-white hover:text-neutral-900 transition-all"
                style={{ borderRadius: currentTheme.layout.borderRadius.md }}
              >
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Product Grid Preview */}
        <section className="mb-8">
          <h2
            className="text-2xl font-bold mb-6"
            style={{
              fontFamily: currentTheme.typography.family,
              color: currentTheme.colorPalette.neutral[900],
            }}
          >
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="card bg-white overflow-hidden transition-all hover:scale-105"
                style={{ borderRadius: currentTheme.layout.borderRadius.lg }}
              >
                <div
                  className="h-48 w-full"
                  style={{
                    backgroundColor: currentTheme.colorPalette.neutral[200],
                  }}
                ></div>
                <div className="p-4">
                  <h3
                    className="font-semibold mb-2"
                    style={{ color: currentTheme.colorPalette.neutral[900] }}
                  >
                    Product {item}
                  </h3>
                  <p
                    className="text-sm mb-3"
                    style={{ color: currentTheme.colorPalette.neutral[600] }}
                  >
                    This is a sample product description that shows how text
                    appears with the current theme.
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-lg font-bold"
                      style={{ color: currentTheme.colorPalette.primary[600] }}
                    >
                      $99.99
                    </span>
                    <button
                      className="px-4 py-2 text-sm font-medium text-white rounded transition-all hover:opacity-90"
                      style={{
                        backgroundColor: currentTheme.colorPalette.primary[500],
                        borderRadius: currentTheme.layout.borderRadius.md,
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section Preview */}
        <section
          className="mb-8 p-6 rounded-lg"
          style={{
            backgroundColor: currentTheme.colorPalette.neutral[50],
            borderRadius: currentTheme.layout.borderRadius.lg,
          }}
        >
          <h2
            className="text-2xl font-bold text-center mb-8"
            style={{
              fontFamily: currentTheme.typography.family,
              color: currentTheme.colorPalette.neutral[900],
            }}
          >
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Fast Shipping",
                desc: "Free shipping on orders over $50",
              },
              { title: "Quality Products", desc: "Premium quality guaranteed" },
              { title: "24/7 Support", desc: "Customer support anytime" },
            ].map((feature, index) => (
              <div key={index} className="text-center p-4">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{
                    backgroundColor: currentTheme.colorPalette.accent[100],
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{
                      backgroundColor: currentTheme.colorPalette.accent[500],
                    }}
                  ></div>
                </div>
                <h3
                  className="font-semibold mb-2"
                  style={{ color: currentTheme.colorPalette.neutral[900] }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: currentTheme.colorPalette.neutral[600] }}
                >
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation Preview */}
        <section
          className="p-4 rounded-lg border"
          style={{
            backgroundColor: "white",
            borderColor: currentTheme.colorPalette.neutral[200],
            borderRadius: currentTheme.layout.borderRadius.lg,
          }}
        >
          <h3
            className="font-semibold mb-4"
            style={{ color: currentTheme.colorPalette.neutral[900] }}
          >
            Navigation Components
          </h3>
          <div className="flex flex-wrap gap-2">
            {["Home", "Products", "About", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="px-4 py-2 rounded transition-all hover:scale-105"
                style={{
                  backgroundColor: currentTheme.colorPalette.primary[100],
                  color: currentTheme.colorPalette.primary[700],
                  borderRadius: currentTheme.layout.borderRadius.md,
                }}
              >
                {item}
              </a>
            ))}
          </div>

          <div
            className="mt-4 pt-4 border-t"
            style={{ borderColor: currentTheme.colorPalette.neutral[200] }}
          >
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 rounded font-medium"
                style={{
                  backgroundColor: currentTheme.colorPalette.primary[500],
                  color: "white",
                  borderRadius: currentTheme.layout.borderRadius.md,
                }}
              >
                Primary Button
              </button>
              <button
                className="px-4 py-2 rounded font-medium border-2"
                style={{
                  borderColor: currentTheme.colorPalette.primary[500],
                  color: currentTheme.colorPalette.primary[500],
                  borderRadius: currentTheme.layout.borderRadius.md,
                }}
              >
                Secondary Button
              </button>
              <button
                className="px-4 py-2 rounded font-medium"
                style={{
                  backgroundColor: currentTheme.colorPalette.accent[500],
                  color: "white",
                  borderRadius: currentTheme.layout.borderRadius.md,
                }}
              >
                Accent Button
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
