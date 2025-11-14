"use client";

import { useCart } from "@/contexts/CartContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StarRating } from "@/components/ui/star";
import { Truck, Shield, CreditCard } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export function CheckoutSummary() {
  const { state } = useCart();

  const subtotal = state.totalPrice;
  const shipping = subtotal > 100000 ? 0 : 5000; // Free shipping over ₦100,000
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="sticky top-8"
    >
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Order Summary</h3>

        {/* Order Items */}
        <div className="space-y-4 mb-6">
          {state.items.map((item, index) => (
            <motion.div
              key={item.product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center space-x-3"
            >
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-cover rounded-lg"
                />
                {item.product.badge && (
                  <Badge className="absolute -top-1 -right-1 text-xs">
                    {item.product.badge}
                  </Badge>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-gray-900 truncate">
                  {item.product.name}
                </h4>
                <p className="text-xs text-gray-600 mb-1">
                  {item.product.category}
                  {item.size && <span className="ml-1 font-medium">• {item.size}</span>}
                </p>
                <div className="flex items-center space-x-1 mb-1">
                  <StarRating rating={item.product.rating} size="sm" />
                  <span className="text-xs text-gray-500">
                    ({item.product.reviews})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Qty: {item.quantity}
                  </span>
                  <span className="text-sm font-semibold text-[#3BB77E]">
                    ₦{(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Separator className="mb-6" />

        {/* Pricing Breakdown */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              Subtotal ({state.totalItems} items)
            </span>
            <span className="font-medium">₦{subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">
              {shipping === 0 ? (
                <Badge
                  variant="secondary"
                  className="text-green-600 bg-green-100"
                >
                  Free
                </Badge>
              ) : (
                `₦${shipping.toLocaleString()}`
              )}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">₦{tax.toLocaleString()}</span>
          </div>

          <Separator />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-[#3BB77E]">₦{total.toLocaleString()}</span>
          </div>
        </div>

        {/* Free Shipping Progress */}
        {subtotal < 100000 && (
          <div className="mb-6 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Truck className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                Free shipping on orders over ₦100,000
              </span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min((subtotal / 100000) * 100, 100)}%`,
                }}
              />
            </div>
            <p className="text-xs text-blue-600 mt-1">
              Add ₦{(100000 - subtotal).toLocaleString()} more for free shipping
            </p>
          </div>
        )}

        {/* Security Features */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Shield className="h-4 w-4 text-green-600" />
            <span>256-bit SSL encryption</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <CreditCard className="h-4 w-4 text-blue-600" />
            <span>Secure payment processing</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Truck className="h-4 w-4 text-orange-600" />
            <span>Fast and reliable delivery</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
