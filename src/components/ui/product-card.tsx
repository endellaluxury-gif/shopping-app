"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star";
import { ShoppingCart, Heart, Eye, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { Minus as MinusIcon, Plus as PlusIcon } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  badge?: string;
}

interface ProductCardProps {
  product: Product;
  className?: string;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  onProductClick?: (product: Product) => void;
}

export function ProductCard({
  product,
  className,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
  onProductClick,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [modalQuantity, setModalQuantity] = useState(1);
  const { addToCart, removeFromCart, updateQuantity, state } = useCart();
  const router = useRouter();
  
  const sizes = ["SM", "MD", "LG", "XL", "2XL", "3XL"];

  // Debug log to check if cart context is available
  console.log(
    "🛒 ProductCard rendered for:",
    product.name,
    "Cart context available:",
    !!addToCart
  );

  // Check if product is in cart (any size)
  const cartItems = state.items.filter((item) => item.product.id === product.id);
  const isInCart = cartItems.length > 0;
  const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    onAddToWishlist?.(product);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickView?.(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("🛒 Add to cart clicked for:", product.name);
    // Show modal to select size and quantity
    setShowSizeModal(true);
    setSelectedSize("");
    setModalQuantity(1);
  };

  const handleModalAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size", {
        description: "Size selection is required",
      });
      return;
    }
    addToCart(product, selectedSize, modalQuantity);
    toast.success(`${modalQuantity} ${product.name} (${selectedSize}) added to cart!`, {
      description: `₦${(product.price * modalQuantity).toLocaleString()} • View cart to checkout`,
      duration: 4000,
      action: {
        label: "View Cart",
        onClick: () => router.push("/cart"),
      },
      style: {
        background: "#f0fdf4",
        color: "#166534",
        border: "1px solid #22c55e",
        fontWeight: "500",
      },
    });
    setShowSizeModal(false);
    onAddToCart?.(product);
  };

  const handleQuantityChange = (e: React.MouseEvent, change: number) => {
    e.preventDefault();
    e.stopPropagation();

    // For products in cart, we need to handle size-specific items
    // For simplicity, we'll show the modal if there are multiple sizes
    if (cartItems.length > 1) {
      setShowSizeModal(true);
      return;
    }
    
    const cartItem = cartItems[0];
    if (!cartItem) return;

    const newQuantity = cartItem.quantity + change;
    if (newQuantity <= 0) {
      removeFromCart(product.id);
      toast.success(`${product.name} removed from cart!`, {
        duration: 3000,
        style: {
          background: "#fef2f2",
          color: "#dc2626",
          border: "1px solid #ef4444",
          fontWeight: "500",
        },
      });
    } else {
      updateQuantity(product.id, newQuantity);
      toast.success(`${product.name} quantity updated!`, {
        duration: 3000,
        style: {
          background: "#f0fdf4",
          color: "#166534",
          border: "1px solid #22c55e",
          fontWeight: "500",
        },
      });
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Only navigate if the click is not on a button or interactive element
    const target = e.target as HTMLElement;

    // Check if the click is on any interactive element
    if (
      target.closest("button") ||
      target.closest('[role="button"]') ||
      target.closest(".cart-button") ||
      target.closest(".wishlist-button") ||
      target.closest(".quick-view-button")
    ) {
      console.log("🛒 Card click prevented - clicked on interactive element");
      return;
    }

    console.log("🛒 Card clicked - navigating to product details");
    // Navigate to product details page
    router.push(`/products/${product.id}`);
    onProductClick?.(product);
  };

  return (
    <motion.div whileHover={{ scale: 1.02 }} className={cn("group", className)}>
      <Card className="overflow-hidden p-2 lg:p-6 border-0 bg-card drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300 relative group">
        {/* Snake border animation on hover - positioned behind content */}
        <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-[var(--primary)] transition-all duration-300 opacity-0 group-hover:opacity-100 pointer-events-none" />

        <div
          className="relative shadow-sm rounded-lg cursor-pointer"
          onClick={handleCardClick}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg"
          />

          {/* Badge */}
          {product.badge && (
            <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
              {product.badge}
            </Badge>
          )}

          {/* Wishlist button */}
          <Button
            size="icon"
            variant="secondary"
            className={cn(
              "wishlist-button absolute top-2 right-2 h-8 w-8 transition-all duration-200 cursor-pointer rounded-full",
              isWishlisted
                ? "bg-[#FF8A00] hover:bg-[#FF8A00]/90 text-white"
                : "bg-white hover:bg-white/90 text-gray-600"
            )}
            onClick={handleWishlistClick}
          >
            <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
          </Button>

          {/* Quick view button */}
          <Button
            size="icon"
            variant="outline"
            className="quick-view-button absolute top-12 right-2 h-8 w-8 bg-transparent border-white text-white hover:bg-white hover:text-black transition-all duration-200 cursor-pointer rounded-full"
            onClick={handleQuickViewClick}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3 cursor-pointer" onClick={handleCardClick}>
          {/* Category */}
          <p className=" text-[0.7rem] md:text-xs text-[#6B7280] tracking-wide">
            {product.category}
          </p>

          {/* Product name */}
          <h3 className="font-semibold text-card-foreground line-clamp-2 md:text-sm text-xs leading-tight min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Rating and reviews */}
          <div className="flex items-center justify-between">
            <StarRating rating={product.rating} size="sm" />
            <span className="text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </div>

          {/* Price and Add to Cart */}
          <div className="space-y-3">
            <div className="space-x-2">
              <span className="font-bold text-[#3BB77E] text-lg">
                ₦{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₦{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {!isInCart ? (
              <Button
                size="sm"
                className="cart-button w-full cursor-pointer bg-[#DEF9EC] text-[#3BB77E] hover:bg-[#DEF9EC]/80 border-[#3BB77E] hover:border-[#3BB77E]/80 transition-all duration-200"
                onClick={handleAddToCart}
                onMouseDown={(e) => e.stopPropagation()}
                onMouseUp={(e) => e.stopPropagation()}
              >
                <ShoppingCart className="h-4 w-4 mr-0.5 md:mr-2" />
                Add
              </Button>
            ) : (
              <div className="flex items-center border border-[#3BB77E] rounded-md bg-[#DEF9EC]">
                <Button
                  size="sm"
                  variant="ghost"
                  className="cart-button h-8 w-8 p-0 hover:bg-[#3BB77E]/10"
                  onClick={(e) => handleQuantityChange(e, -1)}
                  onMouseDown={(e) => e.stopPropagation()}
                  onMouseUp={(e) => e.stopPropagation()}
                >
                  <MinusIcon className="h-3 w-3" />
                </Button>
                <span className="px-2 text-sm font-medium text-[#3BB77E] min-w-[2rem] text-center">
                  {cartQuantity}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="cart-button h-8 w-8 p-0 hover:bg-[#3BB77E]/10"
                  onClick={(e) => handleQuantityChange(e, 1)}
                  onMouseDown={(e) => e.stopPropagation()}
                  onMouseUp={(e) => e.stopPropagation()}
                >
                  <PlusIcon className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Size Selection Modal */}
      <AnimatePresence>
        {showSizeModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowSizeModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Select Size & Quantity</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSizeModal(false)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {/* Product Info */}
                <div className="flex gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-gray-600">{product.category}</p>
                    <p className="text-lg font-bold text-[#3BB77E]">
                      ₦{product.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">Size *</label>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[60px] ${
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

                {/* Quantity Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">Quantity</label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                        className="h-10 w-10"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                      <span className="px-4 py-2 min-w-[3rem] text-center">
                        {modalQuantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setModalQuantity(modalQuantity + 1)}
                        className="h-10 w-10"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <span className="text-sm text-gray-600">
                      Total: ₦{(product.price * modalQuantity).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={handleModalAddToCart}
                  className="w-full bg-[var(--primary)] hover:bg-[var(--primary)]/90"
                  disabled={!selectedSize}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
