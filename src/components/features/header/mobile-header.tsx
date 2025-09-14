"use client";

import { useState, useCallback, useEffect } from "react";
import { Search, Menu, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useDebounce } from "@/hooks/use-debounce";
import { SectionContainer } from "@/components/ui/section-container";
import { LanguageDropdown } from "@/components/features/header/language-dropdown";
import { MobileSearchDialog } from "@/components/search/mobile-search-dialog";
import { MobileMenu } from "@/components/mobile-menu";
import { addRecentSearch } from "@/lib/search-storage";
import Link from "next/link";

export function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [cartCount] = useState(2);
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const debouncedSearch = useDebounce(searchQuery, 500);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
  ];

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      addRecentSearch(query);
      console.log("Searching for:", query);
    }
  };

  const handleSearchInputClick = () => {
    setIsMobileSearchOpen(true);
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="lg:hidden"
    >
      <SectionContainer maxWidth="1440" padding="sm" as="div">
        {/* Top Row - Location, Language, Sign In */}
        <div className="flex items-center justify-between text-[#666666] text-xs py-1 border-b border-gray-100">
          {/* Location */}
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3" />
            <span className="text-[#666666]">Lincoln- 344, Chicago, USA</span>
          </div>

          {/* Language and Sign In */}
          <div className="flex items-center space-x-3">
            <LanguageDropdown
              languages={languages}
              currentLanguage={currentLanguage}
              onLanguageChange={setCurrentLanguage}
              triggerClassName="h-auto px-2 py-1 text-secondary hover:text-primary border-0 focus:outline-none focus:ring-0 cursor-pointer text-xs"
            />

            {/* Vertical Separator */}
            <div className="w-px h-4 bg-gray-300"></div>

            <Link
              href="/auth"
              className="text-secondary hover:text-primary transition-colors cursor-pointer text-xs"
            >
              Sign In
            </Link>
          </div>
        </div>
      </SectionContainer>

      {/* Main Row - Menu, Logo, Icons */}
      <div className="border-b border-gray-200 mb-2">
        <SectionContainer maxWidth="1440" padding="sm" as="div">
          <div className="flex items-center justify-between">
            {/* Menu Button with Primary Background */}
            <Button
              variant="ghost"
              size="icon"
              className="bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white p-2 rounded-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>

            {/* Logo - Centered */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center flex-1"
            >
              <div className="relative w-16 h-16">
                <Image
                  src="/logo/logo.svg"
                  alt="Pride of Afrika"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Right Icons - Wishlist and Cart */}
            <div className="flex items-center space-x-3">
              {/* Wishlist Icon */}
              <Button variant="ghost" size="icon" className="p-1">
                <Image
                  src="/icon/heart.svg"
                  alt="Wishlist"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
              </Button>

              {/* Shopping Cart */}
              <div className="relative">
                <Button variant="ghost" size="icon" className="p-1">
                  <Image
                    src="/icon/cart.svg"
                    alt="Shopping Cart"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </SectionContainer>
      </div>

      {/* Search Row - Full Width */}
      <div className="pb-3">
        <SectionContainer maxWidth="1440" padding="sm" as="div">
          <div className="flex w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search"
                value=""
                readOnly
                onClick={handleSearchInputClick}
                className="pl-10 pr-4 text-sm border-[#808080] rounded-r-none focus:border-[#808080] focus-visible:ring-0 focus:outline-none focus:ring-0 cursor-pointer"
              />
            </div>
            <Button
              onClick={handleSearchInputClick}
              className="bg-[var(--primary)] h-12 hover:bg-[var(--primary)]/90 text-white px-4 rounded-l-none border-l-0 cursor-pointer focus:outline-none focus:ring-0 border-0"
            >
              Search
            </Button>
          </div>
        </SectionContainer>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        isAuthenticated={false} // You can make this dynamic based on your auth state
        cartCount={cartCount}
      />

      {/* Mobile Search Dialog */}
      <MobileSearchDialog
        isOpen={isMobileSearchOpen}
        onClose={() => setIsMobileSearchOpen(false)}
        onSearch={handleSearchSubmit}
      />
    </motion.div>
  );
}
