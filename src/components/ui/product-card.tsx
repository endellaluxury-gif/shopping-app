"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

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
    e.stopPropagation();
    onAddToCart?.(product);
  };

  const handleCardClick = () => {
    onProductClick?.(product);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn("group cursor-pointer", className)}
      onClick={handleCardClick}
    >
      <Card className="overflow-hidden p-2 lg:p-6 border-0 bg-card drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300 relative group">
        {/* Snake border animation on hover */}
        <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-[var(--primary)] transition-all duration-300 opacity-0 group-hover:opacity-100" />

        <div className="relative shadow-sm rounded-lg">
          <img
            src={"/placeholder.webp"}
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
              "absolute top-2 right-2 h-8 w-8 transition-all duration-200 cursor-pointer rounded-full",
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
            className="absolute top-12 right-2 h-8 w-8 bg-transparent border-white text-white hover:bg-white hover:text-black transition-all duration-200 cursor-pointer rounded-full"
            onClick={handleQuickViewClick}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3">
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
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <Button
              size="sm"
              className="w-full bg-[#DEF9EC] text-[#3BB77E] hover:bg-[#DEF9EC]/80 border-[#3BB77E] hover:border-[#3BB77E]/80 transition-all duration-200"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-0.5 md:mr-2" />
              Add
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
