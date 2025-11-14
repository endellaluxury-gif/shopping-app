import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import { sendOrderConfirmationEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    console.log("Starting PayPal order creation...");
    await connectDB();
    console.log("Database connected for PayPal order creation");

    const body = await request.json();
    console.log("PayPal order request body:", body);

    const {
      userInfo,
      items,
      totalAmount,
      shippingAddress,
      isGuest,
      paypalPaymentData,
    } = body as {
      userInfo: Record<string, unknown>;
      items: Record<string, unknown>[];
      totalAmount: number;
      shippingAddress: Record<string, unknown>;
      isGuest: boolean;
      paypalPaymentData: Record<string, unknown>;
    };

    if (!paypalPaymentData || !paypalPaymentData.orderID) {
      return NextResponse.json(
        { success: false, error: "PayPal payment data is required" },
        { status: 400 }
      );
    }

    // Create or find user
    let user;
    try {
      user = await User.findOne({ email: userInfo.email });

      if (user) {
        // Update existing user
        user.name = userInfo.firstName + " " + userInfo.lastName;
        user.phone = userInfo.phone;
        await user.save();
        console.log("Updated existing user:", user._id);
      } else {
        // Create new user
        user = new User({
          email: userInfo.email,
          name: userInfo.firstName + " " + userInfo.lastName,
          phone: userInfo.phone,
          isGuest: isGuest,
        });
        await user.save();
        console.log("Created new user:", user._id);
      }
    } catch (userError) {
      console.error("Error handling user:", userError);
      return NextResponse.json(
        { success: false, error: "Failed to create user" },
        { status: 500 }
      );
    }

    // Generate order number
    const orderNumber = `EDL-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Create order
    const orderData = {
      user: user._id,
      orderNumber: orderNumber,
      items: items.map((item: Record<string, unknown>) => ({
        productId: (item.product as Record<string, unknown>).id,
        name: (item.product as Record<string, unknown>).name,
        price: (item.product as Record<string, unknown>).price,
        quantity: item.quantity,
        size: item.size as string | undefined,
        image: (item.product as Record<string, unknown>).image,
        category: (item.product as Record<string, unknown>).category,
      })),
      totalAmount: totalAmount,
      status: "paid", // PayPal payments are immediately paid
      paymentStatus: "paid",
      paymentMethod: "paypal",
      paymentReference: paypalPaymentData.orderID,
      paymentID: paypalPaymentData.paymentID,
      shippingAddress: {
        firstName: shippingAddress.firstName,
        lastName: shippingAddress.lastName,
        email: shippingAddress.email,
        phone: shippingAddress.phone,
        address: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.state,
        zipCode: shippingAddress.zipCode,
        country: shippingAddress.country,
      },
    };

    const order = new Order(orderData);
    await order.save();
    console.log("PayPal order created successfully:", order._id);

    // Send confirmation emails (optional)
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
        await sendOrderConfirmationEmail(order);
        console.log("PayPal order confirmation email sent successfully");
      } else {
        console.log("Email credentials not configured, skipping email");
      }
    } catch (emailError) {
      console.error(
        "Error sending PayPal order confirmation email:",
        emailError
      );
      // Don't fail the order creation if email fails
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order._id,
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount,
        status: order.status,
        paymentMethod: order.paymentMethod,
        paymentReference: order.paymentReference,
      },
    });
  } catch (error) {
    console.error("Error creating PayPal order:", error);
    console.error("Error details:", {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create PayPal order",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
