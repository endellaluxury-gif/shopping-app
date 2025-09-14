"use client";

import { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Globe,
  User,
  ChevronDown,
  LogOut,
  ShoppingBag,
  Heart,
  Eye,
  Coins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { SectionContainer } from "@/components/ui/section-container";
import { LanguageDropdown } from "@/components/features/header/language-dropdown";
import Link from "next/link";
import { createPortal } from "react-dom";

export function TopBar() {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    right: 0,
  });
  const triggerRef = useRef<HTMLDivElement>(null);

  // Mock authentication state - replace with actual auth logic
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userName, setUserName] = useState("John Doe");

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
  ];

  const accountMenuItems = [
    { label: "Profile", href: "/profile", icon: User },
    { label: "Orders", href: "/orders", icon: ShoppingBag },
    { label: "Wishlist", href: "/wishlist", icon: Heart },
    { label: "Recently Viewed", href: "/recently-viewed", icon: Eye },
  ];

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsAccountDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsAccountDropdownOpen(false);
    }, 100); // Small delay to prevent flickering
  };

  // Calculate dropdown position when it opens
  useEffect(() => {
    if (isAccountDropdownOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 4,
        right: window.innerWidth - rect.right - window.scrollX,
      });
    }
  }, [isAccountDropdownOpen]);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white text-secondary text-sm drop-shadow-sm hidden lg:block"
    >
      <SectionContainer maxWidth="1440" padding="sm" as="div">
        <div className="flex items-center justify-between text-[#666666]">
          {/* Location */}
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline text-[#666666]">
              Store Location: Benin City- 344, Sapele Road, Edo State, Nigeria
            </span>
            <span className="sm:hidden text-[#666666]">
              Benin City- 344, Sapele Road, Edo State, Nigeria
            </span>
          </div>

          {/* Language and Account */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <LanguageDropdown
              languages={languages}
              currentLanguage={currentLanguage}
              onLanguageChange={setCurrentLanguage}
              triggerClassName="h-auto px-3 py-1.5 text-secondary hover:text-primary border-0 focus:outline-none focus:ring-0 cursor-pointer"
            />

            {/* Vertical Separator */}
            <div className="w-px h-5 bg-gray-300"></div>

            {/* Account Section */}
            {isAuthenticated ? (
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Account Button */}
                <div
                  ref={triggerRef}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <User className="h-4 w-4 text-[#666666]" />
                  <span className="text-[#666666] text-sm">{userName}</span>
                  <ChevronDown className="h-3 w-3 text-[#666666]" />
                </div>

                {/* Portal Dropdown */}
                {isAccountDropdownOpen &&
                  createPortal(
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="fixed w-48 bg-white border border-gray-200 rounded-md shadow-lg z-[9999]"
                      style={{
                        top: dropdownPosition.top,
                        right: dropdownPosition.right,
                      }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* Points Section */}
                      <div className="px-4 py-2 bg-[var(--primary)] text-white rounded-t-md">
                        <div className="flex items-center space-x-2">
                          <Coins className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            1,250 Points
                          </span>
                        </div>
                      </div>

                      {accountMenuItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      ))}

                      <div className="border-t border-gray-200 my-1"></div>

                      <button
                        onClick={() => setIsAuthenticated(false)}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>,
                    document.body
                  )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/signin"
                  className="text-secondary hover:text-primary transition-colors cursor-pointer text-sm"
                >
                  Sign In
                </Link>
                <span className="text-gray-400">|</span>
                <Link
                  href="/signup"
                  className="text-secondary hover:text-primary transition-colors cursor-pointer text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </SectionContainer>
    </motion.div>
  );
}
