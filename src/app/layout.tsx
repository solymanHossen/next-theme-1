import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { EnterpriseThemeProvider } from "@/contexts/enterprise-theme-context";
import { DynamicThemeProvider } from "@/components/theme/dynamic-theme-provider";
import "./globals.css";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={false}
        >
          <EnterpriseThemeProvider
            tenantId="global-tenant"
            userId="global-user"
            userRole="admin"
          >
            <DynamicThemeProvider>
              <div
                id="app-root"
                className="min-h-screen bg-theme-background text-theme-text transition-all duration-300"
              >
                {children}
              </div>
            </DynamicThemeProvider>
          </EnterpriseThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
