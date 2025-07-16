"use client";

import React from "react";
import { useThemeStore } from "../store/theme-store";

export default function CustomerThemeView() {
  const { activeTheme } = useThemeStore();

  if (!activeTheme) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-600">Loading store...</p>
      </div>
    );
  }

  return (
    <div className="customer-view min-h-screen">
      {/* Header */}
      <header
        className="bg-white shadow-sm border-b"
        style={{ borderColor: activeTheme.colorPalette.neutral[200] }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1
                className="text-2xl font-bold"
                style={{
                  color: activeTheme.colorPalette.primary[600],
                  fontFamily: activeTheme.typography.family,
                }}
              >
                eCommerce Store
              </h1>
              <nav className="hidden md:flex space-x-6">
                {["Home", "Products", "Categories", "About", "Contact"].map(
                  (item) => (
                    <a
                      key={item}
                      href="#"
                      className="font-medium hover:opacity-75 transition-opacity"
                      style={{ color: activeTheme.colorPalette.neutral[700] }}
                    >
                      {item}
                    </a>
                  )
                )}
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="p-2 rounded-lg hover:opacity-75 transition-opacity"
                style={{
                  backgroundColor: activeTheme.colorPalette.neutral[100],
                }}
              >
                🔍
              </button>
              <button
                className="p-2 rounded-lg hover:opacity-75 transition-opacity"
                style={{
                  backgroundColor: activeTheme.colorPalette.neutral[100],
                }}
              >
                🛒
              </button>
              <button
                className="px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: activeTheme.colorPalette.primary[500],
                  borderRadius: activeTheme.layout.borderRadius.md,
                }}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="py-16"
        style={{
          background: `linear-gradient(135deg, ${activeTheme.colorPalette.primary[50]}, ${activeTheme.colorPalette.accent[50]})`,
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1
            className="text-5xl font-bold mb-6"
            style={{
              color: activeTheme.colorPalette.neutral[900],
              fontFamily: activeTheme.typography.family,
            }}
          >
            Discover Amazing Products
          </h1>
          <p
            className="text-xl mb-8 max-w-2xl mx-auto"
            style={{ color: activeTheme.colorPalette.neutral[600] }}
          >
            Shop the latest trends and find exactly what you&apos;re looking for
            in our curated collection of premium products.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              className="px-8 py-4 rounded-lg font-semibold text-white hover:scale-105 transition-transform"
              style={{
                backgroundColor: activeTheme.colorPalette.primary[500],
                borderRadius: activeTheme.layout.borderRadius.lg,
              }}
            >
              Shop Now
            </button>
            <button
              className="px-8 py-4 rounded-lg font-semibold border-2 hover:scale-105 transition-transform"
              style={{
                borderColor: activeTheme.colorPalette.primary[500],
                color: activeTheme.colorPalette.primary[500],
                borderRadius: activeTheme.layout.borderRadius.lg,
              }}
            >
              View Collections
            </button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section
        className="py-16"
        style={{ backgroundColor: activeTheme.colorPalette.neutral[50] }}
      >
        <div className="container mx-auto px-4">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{
              color: activeTheme.colorPalette.neutral[900],
              fontFamily: activeTheme.typography.family,
            }}
          >
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Electronics", emoji: "📱" },
              { name: "Fashion", emoji: "👕" },
              { name: "Home & Garden", emoji: "🏡" },
              { name: "Sports", emoji: "⚽" },
            ].map((category, index) => (
              <div
                key={index}
                className="group cursor-pointer p-6 rounded-lg text-center hover:scale-105 transition-all duration-300"
                style={{
                  backgroundColor: "white",
                  borderRadius: activeTheme.layout.borderRadius.xl,
                }}
              >
                <div className="text-4xl mb-4">{category.emoji}</div>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: activeTheme.colorPalette.neutral[900] }}
                >
                  {category.name}
                </h3>
                <p
                  className="text-sm mt-2"
                  style={{ color: activeTheme.colorPalette.neutral[600] }}
                >
                  Explore our {category.name.toLowerCase()} collection
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2
              className="text-3xl font-bold"
              style={{
                color: activeTheme.colorPalette.neutral[900],
                fontFamily: activeTheme.typography.family,
              }}
            >
              Featured Products
            </h2>
            <a
              href="#"
              className="font-medium hover:opacity-75 transition-opacity"
              style={{ color: activeTheme.colorPalette.primary[500] }}
            >
              View All Products →
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                style={{ borderRadius: activeTheme.layout.borderRadius.lg }}
              >
                <div
                  className="h-48 w-full group-hover:scale-105 transition-transform duration-300"
                  style={{
                    backgroundColor: activeTheme.colorPalette.neutral[200],
                  }}
                ></div>
                <div className="p-4">
                  <h3
                    className="font-semibold mb-2"
                    style={{ color: activeTheme.colorPalette.neutral[900] }}
                  >
                    Premium Product {item}
                  </h3>
                  <p
                    className="text-sm mb-3"
                    style={{ color: activeTheme.colorPalette.neutral[600] }}
                  >
                    High-quality product with premium features and excellent
                    craftsmanship.
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span
                        className="text-lg font-bold"
                        style={{ color: activeTheme.colorPalette.primary[600] }}
                      >
                        ${(99 + item * 10).toFixed(2)}
                      </span>
                      <span
                        className="text-sm line-through ml-2"
                        style={{ color: activeTheme.colorPalette.neutral[400] }}
                      >
                        ${(129 + item * 10).toFixed(2)}
                      </span>
                    </div>
                    <button
                      className="px-3 py-1 text-sm font-medium text-white rounded hover:opacity-90 transition-opacity"
                      style={{
                        backgroundColor: activeTheme.colorPalette.accent[500],
                        borderRadius: activeTheme.layout.borderRadius.md,
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section
        className="py-16"
        style={{ backgroundColor: activeTheme.colorPalette.primary[500] }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2
            className="text-3xl font-bold text-white mb-4"
            style={{ fontFamily: activeTheme.typography.family }}
          >
            Stay Updated
          </h2>
          <p className="text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new
            products, special offers, and exclusive deals.
          </p>
          <div className="flex justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg border-none outline-none"
              style={{
                borderRadius: `${activeTheme.layout.borderRadius.md} 0 0 ${activeTheme.layout.borderRadius.md}`,
              }}
            />
            <button
              className="px-6 py-3 font-medium text-white rounded-r-lg hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: activeTheme.colorPalette.accent[500],
                borderRadius: `0 ${activeTheme.layout.borderRadius.md} ${activeTheme.layout.borderRadius.md} 0`,
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-12"
        style={{ backgroundColor: activeTheme.colorPalette.neutral[900] }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3
                className="text-lg font-bold text-white mb-4"
                style={{ fontFamily: activeTheme.typography.family }}
              >
                eCommerce Store
              </h3>
              <p className="text-neutral-400 text-sm">
                Your trusted partner for premium products and exceptional
                customer service.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {["About Us", "Contact", "FAQ", "Shipping"].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-neutral-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Categories</h4>
              <ul className="space-y-2 text-sm">
                {["Electronics", "Fashion", "Home", "Sports"].map(
                  (category) => (
                    <li key={category}>
                      <a
                        href="#"
                        className="text-neutral-400 hover:text-white transition-colors"
                      >
                        {category}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex space-x-3">
                {["📘", "📷", "🐦", "📱"].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-75 transition-opacity"
                    style={{
                      backgroundColor: activeTheme.colorPalette.primary[500],
                    }}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-neutral-700 mt-8 pt-8 text-center">
            <p className="text-neutral-400 text-sm">
              © 2025 eCommerce Store. All rights reserved. | Powered by Advanced
              Theme Engine
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
