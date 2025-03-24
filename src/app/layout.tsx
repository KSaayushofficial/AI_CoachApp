import type React from "react";

import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/shared/site-header";
import { SiteFooter } from "@/components/shared/site-footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SaaSify - Streamline Your Workflow",
  description:
    "Boost productivity, reduce costs, and scale your business with our all-in-one SaaS platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          variables: {
            colorPrimary: "#454545", // Example customization
            colorBackground: "#000000", // Set background to black
            colorText: "#FFFFFF", // Set text to white
          },
          elements: {
            rootBox: "bg-black text-white", // Apply Tailwind-like classes for additional customization
            inputField:
              "border border-gray-500 hover:border-white focus:border-white !important", // Input field hover and focus styles
            button: "hover:border-white !important", // Button hover border
            iconButton: "hover:border-white !important", // Icon button hover border
          },
        }}
      >
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
            <Toaster />
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
