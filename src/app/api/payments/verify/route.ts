import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import { sendOrderConfirmationEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    console.log("Starting payment verification...");
    await connectDB();
    console.log("Database connected for payment verification");

    const body = await request.json();
    console.log("Payment verification request body:", body);
    const { reference } = body;

    if (!reference) {
      return NextResponse.json(
        { success: false, error: "Payment reference is required" },
        { status: 400 }
      );
    }

    // Verify payment with Paystack
    console.log("Verifying payment with Paystack for reference:", reference);
    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!paystackResponse.ok) {
      console.error(
        "Paystack API error:",
        paystackResponse.status,
        paystackResponse.statusText
      );
      return NextResponse.json(
        { success: false, error: "Failed to verify payment with Paystack" },
        { status: 400 }
      );
    }

    const paystackData = await paystackResponse.json();
    console.log("Paystack response:", paystackData);

    if (!paystackData.status || paystackData.data.status !== "success") {
      return NextResponse.json(
        { success: false, error: "Payment verification failed" },
        { status: 400 }
      );
    }

    // Find and update order
    console.log("Looking for order with reference:", reference);
    const order = await Order.findOne({ orderNumber: reference });
    if (!order) {
      console.error("Order not found with reference:", reference);
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }
    console.log("Order found:", order._id);

    // Update order status
    order.status = "paid";
    order.paymentStatus = "paid";
    order.paymentReference = reference;
    await order.save();

    // Send confirmation emails (optional)
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
        await sendOrderConfirmationEmail(order);
        console.log("Confirmation email sent successfully");
      } else {
        console.log("Email credentials not configured, skipping email");
      }
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
      // Don't fail the payment verification if email fails
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order._id,
        orderNumber: order.orderNumber,
        status: order.status,
        paymentStatus: order.paymentStatus,
        totalAmount: order.totalAmount,
      },
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
