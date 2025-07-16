"use client";

import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-theme-background">
      {/* Header */}
      <header className="bg-theme-surface border-b border-theme-border shadow-theme-sm">
        <div className="container-theme">
          <div className="flex items-center justify-between py-theme-md">
            <div className="flex items-center space-x-theme-md">
              <h1 className="heading-theme-3 text-theme-primary font-bold">
                Theme Engine
              </h1>
              <span className="badge-theme-primary">Live Demo</span>
            </div>
            <nav className="flex items-center space-x-theme-md">
              <Link
                href="/admin/settings/theme"
                className="btn-theme-primary hover-theme-lift"
              >
                Customize Theme
              </Link>
              <button className="btn-theme-secondary">
                Documentation
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-theme-xl bg-gradient-to-br from-theme-primary/5 to-theme-secondary/5">
        <div className="container-theme text-center">
          <h1 className="heading-theme-1 text-theme-text mb-theme-lg">
            Dynamic Theme System
          </h1>
          <p className="text-theme-text-secondary text-xl mb-theme-xl max-w-2xl mx-auto">
            Experience real-time theme customization with our advanced color
            system. Change colors and see them applied instantly across the
            entire application.
          </p>
          <div className="flex justify-center gap-theme-md">
            <Link
              href="/admin/settings/theme"
              className="btn-theme-primary text-lg px-theme-xl py-theme-lg hover-theme-lift"
            >
              Start Customizing
            </Link>
            <button className="btn-theme-secondary text-lg px-theme-xl py-theme-lg">
              View Examples
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-theme-xl">
        <div className="container-theme">
          <h2 className="heading-theme-2 text-center text-theme-text mb-theme-xl">
            Theme System Features
          </h2>
          <div className="grid-theme grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature Cards */}
            <div className="card-theme hover-theme-lift">
              <div className="w-12 h-12 bg-theme-primary rounded-theme-lg mb-theme-md flex items-center justify-center">
                <svg className="w-6 h-6 text-theme-text-inverse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm3 2h6v2H7V4zm0 4h6v2H7V8zm0 4h6v2H7v-2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="heading-theme-3 text-theme-text mb-theme-sm">
                Real-Time Updates
              </h3>
              <p className="text-theme-text-secondary">
                See your color changes applied instantly across all components
                without page refresh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Component Showcase */}
      <section className="py-theme-xl bg-theme-background-secondary">
        <div className="container-theme">
          <h2 className="heading-theme-2 text-center text-theme-text mb-theme-xl">
            Component Showcase
          </h2>
          
          {/* Buttons */}
          <div className="mb-theme-xl">
            <h3 className="heading-theme-3 text-theme-text mb-theme-md">Buttons</h3>
            <div className="flex gap-theme-md flex-wrap">
              <button className="btn-theme-primary">Primary Button</button>
              <button className="btn-theme-secondary">Secondary Button</button>
              <button className="btn-theme-success">Success Button</button>
              <button className="btn-theme-danger">Danger Button</button>
            </div>
          </div>

          {/* Cards */}
          <div className="mb-theme-xl">
            <h3 className="heading-theme-3 text-theme-text mb-theme-md">Cards</h3>
            <div className="grid-theme grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="card-theme hover-theme-lift">
                <h4 className="heading-theme-4 text-theme-text mb-theme-sm">Card Title</h4>
                <p className="text-theme-text-secondary mb-theme-md">
                  This card automatically adapts to your theme colors and styling.
                </p>
                <button className="btn-theme-primary">Learn More</button>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="mb-theme-xl">
            <h3 className="heading-theme-3 text-theme-text mb-theme-md">Alerts</h3>
            <div className="space-y-theme-md">
              <div className="alert-theme-success">
                <strong>Success!</strong> Your theme changes have been applied successfully.
              </div>
              <div className="alert-theme-warning">
                <strong>Warning!</strong> Some theme changes may require a page refresh.
              </div>
              <div className="alert-theme-danger">
                <strong>Error!</strong> There was an issue applying your theme changes.
              </div>
              <div className="alert-theme-info">
                <strong>Info!</strong> Theme customization is available in the admin panel.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-theme-xl bg-theme-primary text-theme-text-inverse">
        <div className="container-theme text-center">
          <h2 className="heading-theme-2 mb-theme-md">
            Ready to Customize Your Theme?
          </h2>
          <p className="text-xl mb-theme-xl opacity-90 max-w-xl mx-auto">
            Open the theme customizer and start changing colors, typography, and 
            layout settings to see real-time updates across this entire page.
          </p>
          <Link
            href="/admin/settings/theme"
            className="inline-flex items-center gap-theme-sm bg-white text-theme-primary px-theme-xl py-theme-lg rounded-theme-lg font-medium hover-theme-lift shadow-theme-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            Open Theme Customizer
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-theme-surface border-t border-theme-border py-theme-xl">
        <div className="container-theme">
          <div className="grid-theme grid-cols-1 md:grid-cols-3 text-center md:text-left">
            <div>
              <h3 className="heading-theme-4 text-theme-text mb-theme-md">Theme Engine</h3>
              <p className="text-theme-text-secondary">
                Advanced theme customization system for modern web applications.
              </p>
            </div>
            <div>
              <h4 className="heading-theme-4 text-theme-text mb-theme-md">Features</h4>
              <ul className="space-y-theme-sm text-theme-text-secondary">
                <li>Real-time color changes</li>
                <li>Typography customization</li>
                <li>Component theming</li>
                <li>Export capabilities</li>
              </ul>
            </div>
            <div>
              <h4 className="heading-theme-4 text-theme-text mb-theme-md">Get Started</h4>
              <div className="space-y-theme-sm">
                <Link 
                  href="/admin/settings/theme" 
                  className="block text-theme-primary hover:text-theme-primary-600"
                >
                  Theme Customizer
                </Link>
                <a href="#" className="block text-theme-text-secondary hover:text-theme-text">
                  Documentation
                </a>
                <a href="#" className="block text-theme-text-secondary hover:text-theme-text">
                  API Reference
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-theme-border mt-theme-xl pt-theme-md text-center text-theme-text-secondary">
            <p>&copy; 2025 Theme Engine. Built with dynamic theming capabilities.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
