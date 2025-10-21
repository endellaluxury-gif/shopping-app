"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { SectionContainer } from "@/components/ui/section-container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Package, Home } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface OrderData {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
    image: string;
    category: string;
  }>;
  shippingAddress: {
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const reference = searchParams.get("reference");
    const orderNumber = searchParams.get("orderNumber");

    if (reference) {
      // Verify payment and get order details
      verifyPayment(reference);
    } else if (orderNumber) {
      // Get order by order number
      fetchOrderByNumber(orderNumber);
    } else {
      // For testing purposes, try to get the latest order
      console.log("No reference found, trying to get latest order...");
      fetchLatestOrder();
    }
  }, [searchParams, fetchLatestOrder]);

  const fetchLatestOrder = useCallback(async () => {
    try {
      const response = await fetch("/api/orders");
      const data = await response.json();

      if (data.orders && data.orders.length > 0) {
        // Get the most recent order
        const latestOrder = data.orders[0];
        setOrder(latestOrder);
      } else {
        setError("No orders found");
      }
    } catch (error) {
      console.error("Error fetching latest order:", error);
      setError("Failed to fetch order details");
    } finally {
      setLoading(false);
    }
  }, []);

  const verifyPayment = async (reference: string) => {
    try {
      const response = await fetch("/api/payments/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reference }),
      });

      const data = await response.json();

      if (data.success) {
        // Fetch full order details
        await fetchOrderById(data.order.id);
      } else {
        setError(data.error || "Payment verification failed");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      setError("Failed to verify payment");
      setLoading(false);
    }
  };

  const fetchOrderById = async (orderId: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`);
      const data = await response.json();

      if (data.order) {
        setOrder(data.order);
      } else {
        setError("Order not found");
      }
    } catch (error) {
      console.error("Error fetching order:", error);
      setError("Failed to fetch order details");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderByNumber = async (orderNumber: string) => {
    try {
      const response = await fetch(`/api/orders?orderNumber=${orderNumber}`);
      const data = await response.json();

      if (data.orders && data.orders.length > 0) {
        setOrder(data.orders[0]);
      } else {
        setError("Order not found");
      }
    } catch (error) {
      console.error("Error fetching order:", error);
      setError("Failed to fetch order details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)] mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your order...</p>
        </div>
      </div>
    );
  }

  if (error) {
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
              <div className="h-24 w-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <Package className="h-12 w-12 text-red-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Order Error
              </h1>
              <p className="text-gray-600 mb-8">{error}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-[var(--primary)]]">
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/contact-us">
                <Button variant="outline" size="lg">
                  Contact Support
                </Button>
              </Link>
            </div>
          </motion.div>
        </SectionContainer>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <SectionContainer maxWidth="1440" padding="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Order not found
            </h1>
            <p className="text-gray-600 mb-8">
              We couldn&apos;t find the order you&apos;re looking for.
            </p>
            <Link href="/products">
              <Button
                size="lg"
                className="bg-[var(--primary)] hover:bg-[var(--primary)]/90"
              >
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
          <div className="text-center mb-8">
            <div className="h-24 w-24 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Order Confirmed!
            </h1>
            <p className="text-gray-600 mb-4">
              Thank you for your order. We&apos;ve received your payment and
              will process your order shortly.
            </p>
            <Badge variant="secondary" className="text-green-600 bg-green-100">
              Order #{order.orderNumber}
            </Badge>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.category}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[#3BB77E]">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-[#3BB77E]">
                    ₦{order.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Shipping Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Shipping Information
              </h3>

              <div className="space-y-2">
                <p>
                  <strong>Name:</strong> {order.shippingAddress.name}
                </p>
                <p>
                  <strong>Email:</strong> {order.shippingAddress.email}
                </p>
                <p>
                  <strong>Address:</strong> {order.shippingAddress.address}
                </p>
                <p>
                  <strong>City:</strong> {order.shippingAddress.city}
                </p>
                <p>
                  <strong>State:</strong> {order.shippingAddress.state}
                </p>
                <p>
                  <strong>ZIP Code:</strong> {order.shippingAddress.zipCode}
                </p>
                <p>
                  <strong>Country:</strong> {order.shippingAddress.country}
                </p>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">
                  What&apos;s Next?
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>
                    • We&apos;ll process your order within 1-2 business days
                  </li>
                  <li>• You&apos;ll receive a shipping confirmation email</li>
                  <li>
                    • Your order will be delivered within 3-7 business days
                  </li>
                </ul>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button
                size="lg"
                className="bg-[var(--primary)] hover:bg-[var(--primary)]/90"
              >
                <Home className="h-5 w-5 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <Link href="/contact-us">
              <Button variant="outline" size="lg">
                Contact Support
              </Button>
            </Link>
          </div>
        </motion.div>
      </SectionContainer>
    </div>
  );
}
