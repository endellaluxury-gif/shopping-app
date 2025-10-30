import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Endella Natural Beauty",
    default: "Products - Endella Natural Beauty",
  },
  description:
    "Explore our complete collection of premium fashion and streetwear — hoodies, jackets, joggers, kimonos, and vogue-inspired pieces. Shop by category with advanced filtering options.",
  keywords: [
    "fashion",
    "clothing",
    "streetwear",
    "hoodies",
    "jackets",
    "joggers",
    "kimonos",
    "vogue culture",
    "Endella Fashion",
    "online clothing store",
    "premium apparel",
    "men's fashion",
    "women's fashion",
  ],
  openGraph: {
    title: "Products - Endella Natural Beauty",
    description:
      "Discover our complete collection of premium beauty products, skincare essentials, and luxury cosmetics.",
    type: "website",
    siteName: "Endella Beauty",
    images: [
      {
        url: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
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
    images: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
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
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
