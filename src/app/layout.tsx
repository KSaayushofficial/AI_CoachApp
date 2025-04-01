import type React from "react";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/shared/site-header";
import { SiteFooter } from "@/components/shared/site-footer";
import "./globals.css";

// Initialize Inter font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Add a CSS variable for more flexible usage
});

// Metadata for SEO and browser
export const metadata: Metadata = {
  title: {
    default: "CoachAI - Streamline Your Workflow",
    template: "%s | CoachAI",
  },
  description:
    "Boost productivity, reduce costs, and scale your business with our all-in-one SaaS platform.",
  metadataBase: new URL("https://your-domain.com"), // Replace with your actual domain
  openGraph: {
    title: "CoachAI - Streamline Your Workflow",
    description:
      "Boost productivity, reduce costs, and scale your business with our all-in-one SaaS platform.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/favicon.ico", // Add your favicon path
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} scroll-smooth`}
    >
      <body
        className={`
          ${inter.className} 
          min-h-screen 
          bg-background 
          font-sans 
          antialiased
        `}
      >
        <ClerkProvider
          signInFallbackRedirectUrl="/dashboard" // Add this to replace deprecated afterSignInUrl
          appearance={{
            variables: {
              colorPrimary: "#454545",
            },
            elements: {
              rootBox: "text-white",
              inputField:
                "border border-gray-500 hover:border-white focus:border-white !important",
              button: "hover:border-white !important",
              iconButton: "hover:border-white !important",
            },
          }}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <main className="mx-20">{children}</main>
              <SiteFooter />
            </div>

            {/* Moved Toaster outside of theme provider to prevent hydration issues */}
            <Toaster />
          </ThemeProvider>
        </ClerkProvider>

        {/* Client-side scripts and telemetry can be added here if needed */}
      </body>
    </html>
  );
}
