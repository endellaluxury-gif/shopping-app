import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "@/components/providers/loading-provider";
import HeaderWrapper from "@/components/features/header/HeaderWrapper";
import FooterWrapper from "@/components/features/FooterWrapper/FooterWrapper";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Endella Beauty - Premium Beauty Products & Cosmetics",
  description:
    "Discover premium beauty products, cosmetics, and skincare essentials. Quality beauty products delivered to your doorstep with care.",
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
          <div className="min-h-screen bg-background">
            {/* Sticky Header */}
            <HeaderWrapper />

            {/* Main Content */}
            <main className="flex-1">{children}</main>
            <FooterWrapper />
          </div>
        </LoadingProvider>
      </body>
    </html>
  );
}
