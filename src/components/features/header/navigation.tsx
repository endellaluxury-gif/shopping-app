"use client";

import { useState, useRef } from "react";
import { ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { SectionContainer } from "@/components/ui/section-container";
import { MegaMenu } from "@/components/mega-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const categoriesButtonRef = useRef<HTMLButtonElement>(null);

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About Us", href: "/about-us" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-black text-white hidden lg:block"
    >
      <SectionContainer maxWidth="1440" padding="sm" as="div" className="!py-0">
        <div className="flex items-stretch justify-between h-[60px]">
          {/* Categories Button */}
          <div
            className="relative group h-full"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <div className="flex h-full">
              {/* Hamburger Menu Icon with Green Background */}
              <div className="bg-[var(--primary)] px-3 flex items-center justify-center">
                <div className="w-6 h-4 flex flex-col justify-center">
                  <div className="w-full h-0.5 bg-white mb-1"></div>
                  <div className="w-full h-0.5 bg-white mb-1"></div>
                  <div className="w-full h-0.5 bg-white"></div>
                </div>
              </div>

              {/* All Categories Text with Dark Gray Background */}
              <Button
                ref={categoriesButtonRef}
                variant="default"
                className="bg-[#333333] hover:bg-[#333333]/90 text-white font-medium rounded-l-none border-l-0 h-full px-4 flex items-center cursor-pointer"
              >
                <span className="hidden sm:inline">All Categories</span>
                <span className="sm:hidden">Categories</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Mega Menu - positioned absolutely within the relative container */}
            {isMegaMenuOpen && (
              <div className="absolute top-full left-0 w-[900px] bg-white shadow-2xl border-t z-50">
                <MegaMenu
                  isOpen={isMegaMenuOpen}
                  onClose={() => setIsMegaMenuOpen(false)}
                  triggerRef={categoriesButtonRef}
                />
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition-colors font-medium text-sm lg:text-base ${
                    isActive ? "text-white" : "text-[#999999] hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Phone Number */}
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-white" />
            <span className="text-white font-medium text-sm lg:text-base">
              +234 706 595 2662
            </span>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-3 pt-3 border-t border-border/20">
          <div className="flex flex-wrap gap-2">
            {navigationItems.slice(0, 4).map((item) => {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-secondary-foreground hover:text-primary font-medium text-sm  px-2 py-1`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </SectionContainer>
    </motion.nav>
  );
}
