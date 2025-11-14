"use client";

import { useCart } from "@/contexts/CartContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star";
import { Minus, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export function CartItems() {
  const { state, updateQuantity, removeFromCart } = useCart();
  const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set());

  const handleQuantityChange = async (
    productId: number,
    newQuantity: number
  ) => {
    setUpdatingItems((prev) => new Set(prev).add(productId));

    // Simulate a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 100));

    updateQuantity(productId, newQuantity);
    setUpdatingItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(productId);
      return newSet;
    });
  };

  const handleRemoveItem = async (productId: number) => {
    setUpdatingItems((prev) => new Set(prev).add(productId));

    // Simulate a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 200));

    removeFromCart(productId);
    setUpdatingItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(productId);
      return newSet;
    });
  };

  return (
    <div className="space-y-4">
      {state.items.map((item, index) => (
        <motion.div
          key={`${item.product.id}-${item.size || 'no-size'}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-4">
              {/* Product Image */}
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-cover rounded-lg"
                />
                {item.product.badge && (
                  <Badge className="absolute -top-2 -left-2 text-xs">
                    {item.product.badge}
                  </Badge>
                )}
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-gray-900 truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.product.category}
                      {item.size && <span className="ml-2 font-medium">• Size: {item.size}</span>}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-2">
                      <StarRating rating={item.product.rating} size="sm" />
                      <span className="text-xs text-gray-500">
                        ({item.product.reviews} reviews)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-[#3BB77E]">
                        ₦{item.product.price.toLocaleString()}
                      </span>
                      {item.product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₦{item.product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem(item.product.id)}
                    disabled={updatingItems.has(item.product.id)}
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                  >
                    {updatingItems.has(item.product.id) ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">
                      Quantity:
                    </span>
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleQuantityChange(
                            item.product.id,
                            item.quantity - 1
                          )
                        }
                        disabled={
                          item.quantity <= 1 ||
                          updatingItems.has(item.product.id)
                        }
                        className="h-8 w-8 p-0 hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>

                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value) || 1;
                          if (newQuantity > 0) {
                            handleQuantityChange(item.product.id, newQuantity);
                          }
                        }}
                        className="w-16 h-8 text-center border-0 focus:ring-0 focus:border-0"
                        min="1"
                        disabled={updatingItems.has(item.product.id)}
                      />

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleQuantityChange(
                            item.product.id,
                            item.quantity + 1
                          )
                        }
                        disabled={updatingItems.has(item.product.id)}
                        className="h-8 w-8 p-0 hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Total</div>
                    <div className="text-lg font-bold text-[#3BB77E]">
                      ₦{(item.product.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
