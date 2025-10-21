"use client";

import { useCart } from "@/contexts/CartContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, CreditCard, Truck, Shield } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function CartSummary() {
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
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

        {/* Order Details */}
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

        {/* Checkout Button */}
        <Link href="/checkout" className="block">
          <Button
            size="lg"
            className="w-full bg-[var(--primary)] hover:bg-[var(--primary)]/90 mb-4"
          >
            <CreditCard className="h-5 w-5 mr-2" />
            Proceed to Checkout
          </Button>
        </Link>

        {/* Continue Shopping */}
        <Link href="/products">
          <Button variant="outline" size="lg" className="w-full">
            <ShoppingBag className="h-5 w-5 mr-2" />
            Continue Shopping
          </Button>
        </Link>

        {/* Security Badges */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Shield className="h-4 w-4" />
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center space-x-1">
              <Truck className="h-4 w-4" />
              <span>Fast Delivery</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
