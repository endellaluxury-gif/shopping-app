import { Metadata } from "next";
import { Suspense } from "react";
import { ProductsClient } from "@/components/products/products-client";

export const metadata: Metadata = {
  metadataBase: new URL("https://endellabeauty.com"),
  title: "Products - Endella Beauty | Premium Beauty & Skincare",
  description:
    "Discover our complete collection of premium beauty products, skincare essentials, and luxury cosmetics. Shop by category with advanced filtering options.",
  keywords: [
    "beauty products",
    "skincare",
    "cosmetics",
    "premium beauty",
    "Endella Beauty",
    "beauty shop",
    "online beauty store",
    "beauty categories",
    "luxury cosmetics",
  ],
  openGraph: {
    title: "Products - Endella Beauty",
    description:
      "Discover our complete collection of premium beauty products, skincare essentials, and luxury cosmetics.",
    type: "website",
    url: "https://endellabeauty.com/products",
    siteName: "Endella Beauty",
    images: [
      {
        url: "/products/vogue_culture.jpg",
        width: 1200,
        height: 630,
        alt: "Endella Beauty Products Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Products - Endella Beauty",
    description:
      "Discover our complete collection of premium beauty products, skincare essentials, and luxury cosmetics.",
    images: ["/products/vogue_culture.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://endellabeauty.com/products",
  },
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ProductsClient />
    </Suspense>
  );
}
