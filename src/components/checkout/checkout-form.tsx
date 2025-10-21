"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, CreditCard, Lock } from "lucide-react";

const checkoutSchema = z.object({
  // Contact Information
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),

  // Shipping Address
  address: z.string().min(5, "Please enter a complete address"),
  city: z.string().min(2, "Please enter a valid city"),
  state: z.string().min(2, "Please enter a valid state"),
  zipCode: z.string().min(5, "Please enter a valid zip code"),
  country: z.string().min(2, "Please enter a valid country"),

  // Terms and conditions
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, "You must accept the terms and conditions"),
  subscribeNewsletter: z.boolean().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  isGuest: boolean;
  onGuestToggle: (isGuest: boolean) => void;
}

export function CheckoutForm({ isGuest, onGuestToggle }: CheckoutFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state: cartState, clearCart } = useCart();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      country: "United States",
      acceptTerms: false,
      subscribeNewsletter: false,
    },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);

    try {
      // Calculate totals
      const subtotal = cartState.totalPrice;
      const shipping = subtotal > 100000 ? 0 : 5000; // Free shipping over ₦100,000
      const tax = subtotal * 0.08; // 8% tax
      const totalAmount = subtotal + shipping + tax;

      // Create order data
      const orderData = {
        userInfo: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
        },
        items: cartState.items,
        totalAmount,
        shippingAddress: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
          country: data.country,
        },
        isGuest,
      };

      console.log("Creating order:", orderData);

      // Create order in database
      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!orderResponse.ok) {
        const errorText = await orderResponse.text();
        console.error("Order creation failed:", errorText);
        throw new Error(`Failed to create order: ${errorText}`);
      }

      const orderResult = await orderResponse.json();
      console.log("Order created:", orderResult);

      // Initialize Paystack payment
      const paymentResponse = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderResult.order.id,
          email: data.email,
          amount: totalAmount,
          callbackUrl: `${window.location.origin}/checkout/success`,
        }),
      });

      if (!paymentResponse.ok) {
        const errorText = await paymentResponse.text();
        console.error("Payment initialization failed:", errorText);
        throw new Error(`Failed to initialize payment: ${errorText}`);
      }

      const paymentResult = await paymentResponse.json();
      console.log("Payment initialized:", paymentResult);

      if (!paymentResult.success) {
        throw new Error(paymentResult.error || "Payment initialization failed");
      }

      // Redirect to Paystack payment page
      window.location.href = paymentResult.authorizationUrl;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Guest/User Toggle */}
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="guest-checkout"
                checked={isGuest}
                onCheckedChange={(checked) => onGuestToggle(checked as boolean)}
              />
              <Label htmlFor="guest-checkout" className="text-sm font-medium">
                Checkout as guest
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="user-checkout"
                checked={!isGuest}
                onCheckedChange={(checked) => onGuestToggle(!checked)}
              />
              <Label htmlFor="user-checkout" className="text-sm font-medium">
                Create account
              </Label>
            </div>
          </div>
          {isGuest && (
            <p className="text-sm text-gray-600 mt-2">
              You can create an account after checkout to track your orders.
            </p>
          )}
        </Card>

        {/* Contact Information */}
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <User className="h-5 w-5 text-[var(--primary)]" />
            <h3 className="text-lg font-semibold">Contact Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                {...register("firstName")}
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                {...register("lastName")}
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Shipping Address */}
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="h-5 w-5 text-[var(--primary)]" />
            <h3 className="text-lg font-semibold">Shipping Address</h3>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="address">Street Address *</Label>
              <Input
                id="address"
                {...register("address")}
                className={errors.address ? "border-red-500" : ""}
              />
              {errors.address && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  {...register("city")}
                  className={errors.city ? "border-red-500" : ""}
                />
                {errors.city && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  {...register("state")}
                  className={errors.state ? "border-red-500" : ""}
                />
                {errors.state && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.state.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  {...register("zipCode")}
                  className={errors.zipCode ? "border-red-500" : ""}
                />
                {errors.zipCode && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.zipCode.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                {...register("country")}
                className={errors.country ? "border-red-500" : ""}
              />
              {errors.country && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Payment Information */}
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <CreditCard className="h-5 w-5 text-[var(--primary)]" />
            <h3 className="text-lg font-semibold">Payment</h3>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Lock className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">
                Secure Payment
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Payment will be processed securely through Paystack. You&apos;ll
              be redirected to complete your payment.
            </p>
          </div>
        </Card>

        {/* Terms and Newsletter */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Controller
                name="acceptTerms"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="acceptTerms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={errors.acceptTerms ? "border-red-500" : ""}
                  />
                )}
              />
              <Label htmlFor="acceptTerms" className="text-sm">
                I agree to the{" "}
                <a
                  href="/terms"
                  className="text-[var(--primary)] hover:underline"
                >
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="text-[var(--primary)] hover:underline"
                >
                  Privacy Policy
                </a>
              </Label>
            </div>
            {errors.acceptTerms && (
              <p className="text-sm text-red-500">
                {errors.acceptTerms.message}
              </p>
            )}

            <div className="flex items-start space-x-2">
              <Controller
                name="subscribeNewsletter"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="subscribeNewsletter"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="subscribeNewsletter" className="text-sm">
                Subscribe to our newsletter for updates and exclusive offers
              </Label>
            </div>
          </div>
        </Card>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full bg-[var(--primary)] hover:bg-[var(--primary)]/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Processing...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Lock className="h-5 w-5" />
              <span>Complete Order</span>
            </div>
          )}
        </Button>
      </form>
    </motion.div>
  );
}
