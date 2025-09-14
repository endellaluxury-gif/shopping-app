"use client";

import { usePathname } from "next/navigation";
import { TopBar } from "@/components/features/header/top-bar";
import { MainHeader } from "@/components/features/header/main-header";
import { Navigation } from "@/components/features/header/navigation";
import { MobileHeader } from "@/components/features/header/mobile-header";

const HeaderWrapper = () => {
  const pathname = usePathname();

  const authRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
  ];
  if (authRoutes.includes(pathname)) {
    return null; // Hide on auth pages
  }

  return (
    <div className="bg-white sticky top-0 z-50 bg-background">
      <MobileHeader />
      <div className="hidden lg:block">
        <TopBar />
        <MainHeader />
        <Navigation />
      </div>
    </div>
  );
};

export default HeaderWrapper;
