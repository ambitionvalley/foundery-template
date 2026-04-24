import type { Metadata } from "next";

import "./globals.css";

import { brand } from "@/config/brand";
import { inter } from "@/styles/fonts";

export const metadata: Metadata = {
  title: {
    default: brand.name,
    template: `%s · ${brand.name}`,
  },
  description: brand.description,
  metadataBase: new URL(brand.url),
  openGraph: {
    title: brand.name,
    description: brand.description,
    url: brand.url,
    images: [brand.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    site: brand.twitter,
    title: brand.name,
    description: brand.description,
    images: [brand.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
