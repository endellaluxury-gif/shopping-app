"use client";

import { useState } from "react";
import {
  Home,
  ShoppingBag,
  Tag,
  Info,
  HelpCircle,
  Mail,
  User,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Heart,
  ShoppingCart,
  X,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { categories, type Category } from "@/data/categories";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated?: boolean;
  user?: {
    name: string;
    email: string;
  };
  cartCount?: number;
}

interface CategoryDrawerProps {
  category: Category;
  onBack: () => void;
  onClose: () => void;
  level: number;
}

function CategoryDrawer({
  category,
  onBack,
  onClose,
  level,
}: CategoryDrawerProps) {
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<Category | null>(null);

  const handleSubCategoryClick = (subCategory: Category) => {
    if (subCategory.subCategories && subCategory.subCategories.length > 0) {
      setSelectedSubCategory(subCategory);
    } else {
      // Navigate to category page
      onClose();
    }
  };

  const handleBack = () => {
    if (selectedSubCategory) {
      setSelectedSubCategory(null);
    } else {
      onBack();
    }
  };

  const currentCategory = selectedSubCategory || category;

  return (
    <motion.div
      className="h-full flex flex-col"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 border-b border-gray-200">
        <div className="p-2 border-b border-gray-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 p-0 h-auto"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Categories
          </Button>
        </div>
        <div className="p-3 border-b border-gray-200">
          <h2 className="font-semibold text-lg">{currentCategory.name}</h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="">
          {currentCategory.subCategories &&
          currentCategory.subCategories.length > 0 ? (
            <div className="space-y-0">
              {currentCategory.subCategories.map((subCategory, index) => (
                <motion.button
                  key={subCategory.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSubCategoryClick(subCategory)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm border-b border-gray-200 text-left hover:bg-gray-50 transition-colors last:border-b-0"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    {subCategory.icon && (
                      <span className="text-lg">{subCategory.icon}</span>
                    )}
                    <span className="text-gray-600">{subCategory.name}</span>
                  </div>
                  {subCategory.subCategories &&
                    subCategory.subCategories.length > 0 && (
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    )}
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No subcategories available
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function MobileMenu({
  isOpen,
  onClose,
  isAuthenticated = false,
  user,
  cartCount = 0,
}: MobileMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);

  const handleCategoryClick = (category: Category) => {
    if (category.subCategories && category.subCategories.length > 0) {
      setSelectedCategory(category);
    } else {
      // Navigate to category page
      onClose();
    }
  };

  const handleBackToMain = () => {
    setSelectedCategory(null);
  };

  const handleClose = () => {
    setSelectedCategory(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={handleClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
              duration: 0.3,
            }}
            className="fixed left-0 top-0 h-full w-3/4 sm:max-w-sm bg-white shadow-xl z-50"
          >
            <div className="h-full flex flex-col">
              {/* Fixed Header - User Section */}
              <div className="bg-[#111827] text-white p-4 flex-shrink-0">
                {isAuthenticated && user ? (
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{user.name}</h3>
                      <p className="text-sm text-blue-100">{user.email}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-blue-100">
                      <span className="text-sm">
                        Welcome to Pride of Africa
                      </span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                        asChild
                      >
                        <Link href="/auth/login">Sign In</Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                        asChild
                      >
                        <Link href="/auth/register">Sign Up</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Main Content - Fixed Navigation */}
              <div className="flex-1 flex flex-col min-h-0">
                {selectedCategory ? (
                  <CategoryDrawer
                    category={selectedCategory}
                    onBack={handleBackToMain}
                    onClose={handleClose}
                    level={1}
                  />
                ) : (
                  <>
                    {/* Fixed Main Navigation */}
                    <div className="p-2 space-y-2 flex-shrink-0">
                      {/* Main Navigation */}
                      <div className="space-y-1">
                        <Link
                          href="/"
                          onClick={handleClose}
                          className="flex items-center gap-3 text-sm p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <Home className="h-5 w-5 text-gray-500" />
                          <span>Home</span>
                        </Link>
                        <Link
                          href="/shop"
                          onClick={handleClose}
                          className="flex items-center gap-3 text-sm p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <ShoppingBag className="h-5 w-5 text-gray-500" />
                          <span>Shop</span>
                        </Link>

                        <Link
                          href="/about"
                          onClick={handleClose}
                          className="flex items-center gap-3 text-sm p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <Info className="h-5 w-5 text-gray-500" />
                          <span>About Us</span>
                        </Link>
                        <Link
                          href="/faq"
                          onClick={handleClose}
                          className="flex items-center gap-3 text-sm p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <HelpCircle className="h-5 w-5 text-gray-500" />
                          <span>FAQ</span>
                        </Link>
                        <Link
                          href="/contact"
                          onClick={handleClose}
                          className="flex items-center gap-3 text-sm p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <Mail className="h-5 w-5 text-gray-500" />
                          <span>Contact Us</span>
                        </Link>
                      </div>

                      <Separator />
                    </div>

                    {/* Scrollable Categories Section - Takes remaining height */}
                    <div className="flex-1 min-h-0 px-2">
                      <div className="h-full flex flex-col">
                        <button
                          onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                          className="w-full flex items-center gap-2 p-3 bg-[#F0FDF4] rounded-lg border-l-4 border-[#16A34A] cursor-pointer flex-shrink-0"
                        >
                          <Menu className="h-4 w-4 text-[#16A34A]" />
                          <span className="font-medium text-[#16A34A]">
                            Categories
                          </span>
                          <motion.div
                            animate={{ rotate: isCategoriesOpen ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-auto"
                          >
                            <ChevronRight className="h-4 w-4 text-[#16A34A]" />
                          </motion.div>
                        </button>

                        {/* Categories List - Scrollable */}
                        <div className="flex-1 overflow-y-auto bg-[#F9F9F9] border-b-2 border-gray-200">
                          <AnimatePresence>
                            {isCategoriesOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-1 py-2"
                              >
                                {categories.map((category, index) => (
                                  <motion.button
                                    key={category.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() =>
                                      handleCategoryClick(category)
                                    }
                                    className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <div className="flex items-center gap-3">
                                      {category.icon && (
                                        <span className="text-sm">
                                          {category.icon}
                                        </span>
                                      )}
                                      <span className="text-gray-900 text-sm">
                                        {category.name}
                                      </span>
                                    </div>
                                    {category.subCategories &&
                                      category.subCategories.length > 0 && (
                                        <ChevronRight className="h-4 w-4 text-gray-400 text-sm" />
                                      )}
                                  </motion.button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>

                    {/* Fixed Bottom Section */}
                    <div className="flex-shrink-0 p-2 space-y-2">
                      <Separator />

                      {/* Account Section */}
                      {isAuthenticated ? (
                        <div className="space-y-1">
                          <Link
                            href="/account"
                            onClick={handleClose}
                            className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <User className="h-5 w-5 text-gray-500" />
                            <span>My Account</span>
                          </Link>
                          <button className="flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full">
                            <LogOut className="h-5 w-5" />
                            <span>Logout</span>
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <Link
                            href="/account"
                            onClick={handleClose}
                            className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <User className="h-5 w-5 text-gray-500" />
                            <span>My Account</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
              onClick={handleClose}
              className="absolute top-4 right-4 z-50 p-1 rounded-full bg-white/90 hover:bg-white shadow-lg"
            >
              <X className="h-4 w-4 text-gray-600" />
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
