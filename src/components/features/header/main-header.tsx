"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Search, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Image from "next/image";
import { useDebounce } from "@/hooks/use-debounce";
import { SectionContainer } from "@/components/ui/section-container";
import { SearchDropdown } from "@/components/search/search-dropdown";
import { MobileSearchDialog } from "@/components/search/mobile-search-dialog";
import { addRecentSearch } from "@/lib/search-storage";

export function MainHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [cartCount] = useState(2);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      addRecentSearch(query);
      // Here you would typically navigate to search results page
      console.log("Searching for:", query);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="hidden lg:block"
    >
      <SectionContainer maxWidth="1440" padding="sm" as="div">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center"
          >
            <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
              <Image
                src="/endella.jpg"
                alt="Pride of Afrika"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Search Bar - Desktop */}
          <motion.div
            ref={searchContainerRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="hidden md:flex flex-1 max-w-lg mx-8 relative"
          >
            <div className="flex w-full h-full">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => setIsSearchDropdownOpen(true)}
                  className="pl-10 pr-4 text-sm md:text-base border-[#808080] rounded-r-none focus:border-[#808080] focus-visible:ring-0 focus:outline-none focus:ring-0"
                />
              </div>
              <Button
                onClick={() => handleSearchSubmit(searchQuery)}
                className="bg-[var(--primary)] h-12 hover:bg-[var(--primary)]/90 text-white px-6 rounded-l-none border-l-0 cursor-pointer focus:outline-none focus:ring-0 border-0"
              >
                Search
              </Button>
            </div>

            {/* Search Dropdown */}
            <SearchDropdown
              isOpen={isSearchDropdownOpen}
              query={searchQuery}
              onClose={() => setIsSearchDropdownOpen(false)}
              onQueryChange={handleSearch}
              onSearch={handleSearchSubmit}
            />
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center space-x-4"
          >
            {/* Wishlist Icon */}
            <Button variant="ghost" size="icon" className="hidden md:flex p-0">
              <Image
                src="/icon/heart.svg"
                alt="Wishlist"
                width={32}
                height={32}
                className="h-8 w-8"
              />
            </Button>

            {/* Vertical Separator */}
            <div className="hidden md:block w-px h-8 bg-gray-300"></div>

            {/* Shopping Cart */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Button variant="ghost" size="icon" className="p-0">
                  <Image
                    src="/icon/cart.svg"
                    alt="Shopping Cart"
                    width={32}
                    height={32}
                    className="h-8 w-8"
                  />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </div>
              <div className="hidden md:block text-xs text-muted-foreground">
                <div className="text-[#666666] mb-1">Shopping cart:</div>
                <div className="font-semibold text-foreground">$57.00</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </motion.div>
        </div>

        {/* Mobile Search and Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-border pt-4"
          >
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => setIsMobileSearchOpen(true)}
                  className="pr-12"
                />
                <Button
                  size="sm"
                  onClick={() => setIsMobileSearchOpen(true)}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Account
                </Button>
                <Button variant="ghost" size="sm">
                  <Image
                    src="/icon/heart.svg"
                    alt="Wishlist"
                    width={16}
                    height={16}
                    className="h-4 w-4 mr-2"
                  />
                  Wishlist
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </SectionContainer>

      {/* Mobile Search Dialog */}
      <MobileSearchDialog
        isOpen={isMobileSearchOpen}
        onClose={() => setIsMobileSearchOpen(false)}
        onSearch={handleSearchSubmit}
      />
    </motion.div>
  );
}
