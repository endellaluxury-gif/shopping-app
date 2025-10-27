"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { toast } from "sonner";

interface PayPalOrder {
  id: string;
  status: string;
  payer: {
    email_address: string;
    payer_id: string;
    name: {
      given_name: string;
      surname: string;
    };
  };
  create_time: string;
  update_time: string;
}

interface PayPalPaymentData {
  orderID: string;
  paymentID: string;
  status: string;
  amount: number;
  currency: string;
  payer: {
    email_address: string;
    payer_id: string;
    name: {
      given_name: string;
      surname: string;
    };
  };
  create_time: string;
  update_time: string;
}

interface PayPalPaymentProps {
  amount: number;
  currency?: string;
  onSuccess: (paymentData: PayPalPaymentData) => void;
  onError: (error: Error) => void;
  disabled?: boolean;
}

export function PayPalPayment({
  amount,
  currency = "USD",
  onSuccess,
  onError,
  disabled = false,
}: PayPalPaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const paypalOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
    currency: currency,
    intent: "capture",
    components: "buttons",
    disableFunding: "credit,card",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createOrder = async (data: Record<string, unknown>, actions: any) => {
    try {
      setIsProcessing(true);

      // Convert amount to PayPal format (PayPal expects string with 2 decimal places)
      const paypalAmount = amount.toFixed(2);

      return actions.order.create({
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: paypalAmount,
            },
            description: `Order payment - ${paypalAmount} ${currency}`,
          },
        ],
        application_context: {
          brand_name: "EDL Fashion Store",
          landing_page: "NO_PREFERENCE",
          user_action: "PAY_NOW",
        },
      });
    } catch (error) {
      console.error("Error creating PayPal order:", error);
      onError(error instanceof Error ? error : new Error(String(error)));
      return null;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onApprove = async (data: Record<string, unknown>, actions: any) => {
    try {
      setIsProcessing(true);

      // Capture the payment
      const order = await actions.order.capture();

      console.log("PayPal payment captured:", order);

      // Call the success callback with payment data
      onSuccess({
        orderID: data.orderID as string,
        paymentID: order.id,
        status: order.status,
        amount: amount,
        currency: currency,
        payer: order.payer,
        create_time: order.create_time,
        update_time: order.update_time,
      });

      toast.success("Payment successful!", {
        style: {
          background: "#ffffff",
          color: "#1f2937",
          border: "1px solid #e5e7eb",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
      });
    } catch (error) {
      console.error("Error capturing PayPal payment:", error);
      onError(error instanceof Error ? error : new Error(String(error)));

      toast.error("Payment failed. Please try again.", {
        style: {
          background: "#ffffff",
          color: "#1f2937",
          border: "1px solid #e5e7eb",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPayPalError = (err: any) => {
    console.error("PayPal error:", err);
    setIsProcessing(false);
    onError(err instanceof Error ? err : new Error(String(err)));
  };

  const onCancel = (data: Record<string, unknown>) => {
    console.log("PayPal payment cancelled:", data);
    setIsProcessing(false);
    toast.info("Payment cancelled", {
      style: {
        background: "#ffffff",
        color: "#1f2937",
        border: "1px solid #e5e7eb",
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
    });
  };

  if (!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID) {
    return (
      <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
        <p className="text-red-600 text-sm">
          PayPal is not configured. Please add NEXT_PUBLIC_PAYPAL_CLIENT_ID to
          your environment variables.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <PayPalScriptProvider options={paypalOptions}>
        <div className="min-h-[200px] flex items-center justify-center">
          {isProcessing ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Processing payment...</p>
            </div>
          ) : (
            <PayPalButtons
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onPayPalError}
              onCancel={onCancel}
              disabled={disabled}
              style={{
                layout: "vertical",
                color: "blue",
                shape: "rect",
                label: "paypal",
                height: 45,
              }}
            />
          )}
        </div>
      </PayPalScriptProvider>
    </div>
  );
}
