import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SaaS eCommerce Theme Engine",
  description:
    "Advanced customizable theme system for modern eCommerce platforms",
  keywords: ["ecommerce", "themes", "saas", "customization", "admin"],
  authors: [{ name: "Theme Engine Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider userRole="admin">
          <div id="app-root" className="min-h-screen bg-neutral-50">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
