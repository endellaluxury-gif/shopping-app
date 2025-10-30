import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "@/components/providers/loading-provider";
import { CartProvider } from "@/contexts/CartContext";
import HeaderWrapper from "@/components/features/header/HeaderWrapper";
import FooterWrapper from "@/components/features/FooterWrapper/FooterWrapper";
import { Toaster } from "@/components/ui/sonner";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Endella Fashion - Premium Clothing & Streetwear",
  description:
    "Explore premium clothing and streetwear: hoodies, jackets, joggers, kimonos, and vogue-inspired pieces. Quality apparel delivered to your doorstep with care.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoadingProvider>
          <CartProvider>
            <div className="min-h-screen bg-background">
              {/* Sticky Header */}
              <HeaderWrapper />

              {/* Main Content */}
              <main className="flex-1">{children}</main>
              <FooterWrapper />
            </div>
            <Toaster />
          </CartProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
