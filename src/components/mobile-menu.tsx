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
  Shirt,
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
                      <span className="text-sm">Welcome to Endella</span>
                    </div>
                    {/*    <div className="flex gap-2 mt-4">
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
                    </div> */}
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
                          href="/about-us"
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
                          href="/products"
                          onClick={handleClose}
                          className="flex items-center gap-3 text-sm p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <Shirt className="h-5 w-5 text-gray-500" />
                          <span>Products</span>
                        </Link>
                        <Link
                          href="/contact-us"
                          onClick={handleClose}
                          className="flex items-center gap-3 text-sm p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <Mail className="h-5 w-5 text-gray-500" />
                          <span>Contact Us</span>
                        </Link>
                      </div>

                      <Separator />
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
