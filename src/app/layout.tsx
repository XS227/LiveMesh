import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import React from "react";

export const metadata: Metadata = {
  title: "CV Card | LiveMesh",
  description: "Compact CV card layout with anchored navigation and clean blocks.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Script id="tailwind-config" strategy="beforeInteractive">
          {`
            tailwind.config = {
              theme: {
                extend: {
                  fontFamily: {
                    sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
                    display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
                  },
                  colors: {
                    accent: "#3b82f6",
                    midnight: "#0f172a",
                  },
                },
              },
            };
          `}
        </Script>
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  );
}
