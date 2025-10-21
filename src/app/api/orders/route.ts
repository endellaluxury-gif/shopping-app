import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    console.log("Starting order creation...");
    await connectDB();
    console.log("Database connected successfully");

    const body = await request.json();
    console.log("Request body received:", JSON.stringify(body, null, 2));

    const {
      userInfo,
      items,
      totalAmount,
      shippingAddress,
      isGuest = true,
    } = body;

    // Create or find user
    console.log("Creating/finding user...");
    let user;

    // Always check if user exists first (for both guest and registered users)
    console.log("Looking for existing user with email:", userInfo.email);
    user = await User.findOne({ email: userInfo.email });

    if (user) {
      console.log("Existing user found:", user._id);
      // Update user info if needed
      user.name = `${userInfo.firstName} ${userInfo.lastName}`;
      user.phone = userInfo.phone;
      if (isGuest) {
        user.isGuest = true;
      }
      await user.save();
      console.log("User info updated");
    } else {
      // Create new user
      console.log("User not found, creating new user");
      user = new User({
        email: userInfo.email,
        name: `${userInfo.firstName} ${userInfo.lastName}`,
        phone: userInfo.phone,
        isGuest: isGuest,
      });
      await user.save();
      console.log("New user created successfully:", user._id);
    }

    // Create order
    console.log("Creating order...");
    const orderData = {
      user: user._id,
      items: items.map(
        (item: {
          product: {
            id: number;
            name: string;
            price: number;
            image: string;
            category: string;
          };
          quantity: number;
        }) => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image,
          category: item.product.category,
        })
      ),
      totalAmount,
      shippingAddress: {
        name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
        email: shippingAddress.email,
        phone: shippingAddress.phone,
        address: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.state,
        zipCode: shippingAddress.zipCode,
        country: shippingAddress.country,
      },
    };

    console.log("Order data:", JSON.stringify(orderData, null, 2));

    // Generate order number manually
    const orderCount = await Order.countDocuments();
    const orderNumber = `EDL-${Date.now()}-${orderCount + 1}`;
    console.log("Generated order number:", orderNumber);

    const order = new Order({
      ...orderData,
      orderNumber: orderNumber,
    });
    console.log("Order instance created, saving...");

    await order.save();
    console.log("Order saved successfully:", order._id);

    return NextResponse.json({
      success: true,
      order: {
        id: order._id,
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount,
        status: order.status,
      },
    });
  } catch (error) {
    console.error("Error creating order:", error);
    console.error("Error details:", {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create order",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const orderNumber = searchParams.get("orderNumber");

    const query: Record<string, unknown> = {};

    if (email) {
      const user = await User.findOne({ email });
      if (user) {
        query.user = user._id;
      } else {
        return NextResponse.json({ orders: [] });
      }
    }

    if (orderNumber) {
      query.orderNumber = orderNumber;
    }

    const orders = await Order.find(query)
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
