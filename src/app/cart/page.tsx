"use client";

import { useCart } from "@/contexts/CartContext";
import { CartItems } from "@/components/cart/cart-items";
import { CartSummary } from "@/components/cart/cart-summary";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CartPage() {
  const { state } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <SectionContainer maxWidth="1440" padding="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="mb-8">
              <ShoppingBag className="h-24 w-24 mx-auto text-gray-400 mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Your cart is empty
              </h1>
              <p className="text-gray-600 mb-8">
                Looks like you haven&apos;t added any items to your cart yet.
              </p>
            </div>
            <Link href="/products">
              <Button
                size="lg"
                className="bg-[var(--primary)] hover:bg-[var(--primary)]/90"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        </SectionContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SectionContainer maxWidth="1440" padding="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <SectionHeader
            title="Shopping Cart"
            subtitle={`${state.totalItems} item${
              state.totalItems !== 1 ? "s" : ""
            } in your cart`}
            titleSize="3xl"
            mobileTitleSize="lg"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <CartItems />
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
