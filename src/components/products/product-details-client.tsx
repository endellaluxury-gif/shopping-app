"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SectionContainer } from "@/components/ui/section-container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import Image from "next/image";
import Link from "next/link";
import { products, Product } from "@/lib/products-data";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { Minus as MinusIcon, Plus as PlusIcon } from "lucide-react";

interface ProductDetailsClientProps {
  productId: string;
}

export function ProductDetailsClient({ productId }: ProductDetailsClientProps) {
  const { addToCart, removeFromCart, updateQuantity, state } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const [mediaType, setMediaType] = useState<"image" | "video">("video");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const sizes = ["SM", "MD", "LG", "XL", "2XL", "3XL"];

  // Get all images for gallery - always ensure at least one image
  const allImages = useMemo(() => {
    if (!product) return [];

    // If product has images array with items, use it
    if (
      product.images &&
      Array.isArray(product.images) &&
      product.images.length > 0
    ) {
      return product.images;
    }

    // Otherwise, use the single product.image if it exists
    if (product.image) {
      return [product.image];
    }

    // Fallback to empty array
    return [];
  }, [product]);

  // Check if product is in cart (with same size)
  const cartItem = state.items.find(
    (item) => item.product.id === product?.id && item.size === selectedSize
  );
  const isInCart = !!cartItem;
  const cartQuantity = cartItem?.quantity || 0;

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const foundProduct = products.find((p) => p.id.toString() === productId);
      setProduct(foundProduct || null);
      setIsLoading(false);

      // If product has no video, default to image mode
      if (foundProduct && !foundProduct.video) {
        setMediaType("image");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [productId]);

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleCartQuantityChange = (change: number) => {
    if (!product) return;

    const newQuantity = cartQuantity + change;
    if (newQuantity <= 0) {
      removeFromCart(product.id);
      toast.success(`${product.name} removed from cart!`);
    } else {
      updateQuantity(product.id, newQuantity);
      toast.success(`${product.name} quantity updated to ${newQuantity}!`);
    }
  };

  const openGallery = (index?: number) => {
    // Ensure we have images to show
    if (allImages.length === 0) {
      console.warn("No images available to open in gallery");
      return;
    }
    // Use provided index, or fall back to selectedImage, or 0
    const indexToUse =
      index !== undefined ? index : selectedImage >= 0 ? selectedImage : 0;
    // Ensure index is valid (clamp to valid range)
    const validIndex = Math.max(0, Math.min(indexToUse, allImages.length - 1));
    setGalleryIndex(validIndex);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const nextImage = () => {
    setGalleryIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setGalleryIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!isGalleryOpen || allImages.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setGalleryIndex(
          (prev) => (prev - 1 + allImages.length) % allImages.length
        );
      } else if (e.key === "ArrowRight") {
        setGalleryIndex((prev) => (prev + 1) % allImages.length);
      } else if (e.key === "Escape") {
        setIsGalleryOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isGalleryOpen, allImages.length]);

  // Handle touch swipe
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
  };

  const handleAddToCart = () => {
    if (product) {
      if (!selectedSize) {
        toast.error("Please select a size", {
          description: "Size selection is required before adding to cart",
        });
        return;
      }
      // Add the product to cart with the selected quantity and size
      addToCart(product, selectedSize, quantity);
      toast.success(
        `${quantity} ${product.name} (${selectedSize}) added to cart!`,
        {
          description: `₦${(
            product.price * quantity
          ).toLocaleString()} total • View cart to checkout`,
          action: {
            label: "View Cart",
            onClick: () => (window.location.href = "/cart"),
          },
        }
      );
      console.log(
        `Added ${quantity} ${product.name} (${selectedSize}) to cart`
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SectionContainer maxWidth="1440" padding="lg">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Breadcrumb
            items={[
              { label: "Products", href: "/products" },
              { label: product.category },
              { label: product.name },
            ]}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Main Media Display */}
            <div
              className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 group cursor-pointer"
              onClick={() => {
                // Open gallery if we have images (regardless of mediaType, since we're showing an image)
                if (allImages.length > 0) {
                  // Use current selectedImage or default to 0
                  openGallery(selectedImage >= 0 ? selectedImage : 0);
                }
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${mediaType}-${selectedImage}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  {mediaType === "video" && product.video ? (
                    <video
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                      poster={product.image}
                      preload="metadata"
                    >
                      <source src={product.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <Image
                      src={product.images?.[selectedImage] || product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                      priority
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Zoom/Expand Button - Only show for images (visual indicator) */}
              {mediaType === "image" && (
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute bottom-4 right-4 bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                >
                  <ZoomIn className="h-5 w-5" />
                </Button>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <Badge className="bg-red-500 text-white">
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )}
                      % OFF
                    </Badge>
                  )}
                <Badge variant="secondary" className="bg-green-500 text-white">
                  In Stock
                </Badge>
              </div>

              {/* Media Type Toggle */}
              {product.video && (
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant={mediaType === "image" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMediaType("image")}
                    className="text-xs"
                  >
                    Photos
                  </Button>
                  <Button
                    variant={mediaType === "video" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMediaType("video")}
                    className="text-xs"
                  >
                    Video
                  </Button>
                </div>
              )}
            </div>

            {/* Thumbnail Media */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {/* Video Thumbnail */}
              {product.video && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setMediaType("video");
                    setSelectedImage(0);
                  }}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                    mediaType === "video"
                      ? "border-[var(--primary)]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="relative w-full h-full bg-gray-800 flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt="Video thumbnail"
                      fill
                      className="object-cover opacity-70"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-gray-800 ml-0.5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.button>
              )}

              {/* Image Thumbnails */}
              {(product.images || [product.image]).map(
                (image: string, index: number) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setMediaType("image");
                      setSelectedImage(index);
                    }}
                    onDoubleClick={() => {
                      // Double-click to open gallery
                      openGallery(index);
                    }}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                      mediaType === "image" && selectedImage === index
                        ? "border-[var(--primary)]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.button>
                )
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Brand & Category */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="font-medium">Endella Beauty</span>
              <span>•</span>
              <span>{product.category}</span>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900">
                ₦{product.price}
              </span>
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <span className="text-xl text-gray-500 line-through">
                    ₦{product.originalPrice}
                  </span>
                )}
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">
              Discover the perfect blend of quality and style with our premium{" "}
              {product.name.toLowerCase()}. Crafted with attention to detail and
              designed for modern lifestyles, this product offers exceptional
              value and performance.
            </p>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Key Features:</h3>
              <ul className="space-y-2">
                {[
                  "Premium Quality Materials",
                  "Durable Construction",
                  "Modern Design",
                  "Easy to Use",
                  "Long-lasting Performance",
                ].map((feature: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <div className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <div>
                <span className="font-medium text-gray-900 block mb-3">
                  Size:
                </span>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                      className={`h-10 min-w-[60px] ${
                        selectedSize === size
                          ? "bg-[var(--primary)] text-white"
                          : "border-gray-300 hover:border-[var(--primary)]"
                      }`}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-900">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="h-10 w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    className="h-10 w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                {!isInCart ? (
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 h-12 bg-[var(--primary)] hover:bg-[var(--primary)]/90"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                ) : (
                  <div className="flex-1 flex items-center border border-[var(--primary)] rounded-md bg-[#DEF9EC]">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-10 w-10 p-0 hover:bg-[var(--primary)]/10"
                      onClick={() => handleCartQuantityChange(-1)}
                    >
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                    <span className="px-3 text-sm font-medium text-[var(--primary)] min-w-[3rem] text-center">
                      {cartQuantity}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-10 w-10 p-0 hover:bg-[var(--primary)]/10"
                      onClick={() => handleCartQuantityChange(1)}
                    >
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <Button variant="outline" size="icon" className="h-12 w-12">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.badge && (
                <Badge variant="secondary">{product.badge}</Badge>
              )}
              <Badge variant="secondary">Premium</Badge>
              <Badge variant="secondary">Quality</Badge>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {["description", "features", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? "border-[var(--primary)] text-[var(--primary)]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "description" && (
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      Discover the perfect blend of quality and style with our
                      premium {product.name.toLowerCase()}. Crafted with
                      attention to detail and designed for modern lifestyles,
                      this product offers exceptional value and performance.
                    </p>
                  </div>
                )}

                {activeTab === "features" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      "Premium Quality Materials",
                      "Durable Construction",
                      "Modern Design",
                      "Easy to Use",
                      "Long-lasting Performance",
                      "Excellent Value",
                    ].map((feature: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[var(--primary)] rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900 mb-2">
                        {product.rating}
                      </div>
                      <div className="flex justify-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(product.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">
                        Based on {product.reviews} reviews
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Trust Signals */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="p-6 text-center">
            <Truck className="h-8 w-8 text-[var(--primary)] mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Free Shipping</h3>
            <p className="text-sm text-gray-600">On orders over ₦35,000</p>
          </Card>
          <Card className="p-6 text-center">
            <Shield className="h-8 w-8 text-[var(--primary)] mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Secure Payment</h3>
            <p className="text-sm text-gray-600">100% secure checkout</p>
          </Card>
          <Card className="p-6 text-center">
            <RotateCcw className="h-8 w-8 text-[var(--primary)] mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Easy Returns</h3>
            <p className="text-sm text-gray-600">30-day return policy</p>
          </Card>
        </motion.div>
      </SectionContainer>

      {/* Fullscreen Image Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && allImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeGallery}
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
              onClick={closeGallery}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Image Counter */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-sm z-10">
              {galleryIndex + 1} / {allImages.length}
            </div>

            {/* Previous Button */}
            {allImages.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 text-white hover:bg-white/20 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
            )}

            {/* Next Button */}
            {allImages.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 text-white hover:bg-white/20 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            )}

            {/* Main Image */}
            {allImages[galleryIndex] && (
              <motion.div
                key={galleryIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full flex items-center justify-center p-4"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full h-full max-w-7xl max-h-[90vh]">
                  <Image
                    src={allImages[galleryIndex]}
                    alt={`${product?.name} - Image ${galleryIndex + 1}`}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>
            )}

            {/* Thumbnail Strip (if multiple images) */}
            {allImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-4 py-2 bg-black/50 rounded-lg z-10">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setGalleryIndex(index);
                    }}
                    className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      galleryIndex === index
                        ? "border-white"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
