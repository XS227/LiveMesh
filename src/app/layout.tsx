import "./globals.css";
import type { Metadata } from "next";
import React from "react";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

export const metadata: Metadata = {
  title: "LiveMesh",
  description: "Chat-first site builder concept UI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
