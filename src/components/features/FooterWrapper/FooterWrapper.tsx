"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { Footer } from "./footer";

const FooterWrapper = () => {
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
  return <Footer />;
};

export default FooterWrapper;
