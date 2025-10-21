import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    console.log("Testing database connection...");
    await connectDB();
    console.log("Database connected successfully");

    // Try to create a test user
    const testUser = new User({
      email: "test@example.com",
      name: "Test User",
      phone: "1234567890",
      isGuest: true,
    });

    await testUser.save();
    console.log("Test user created successfully:", testUser._id);

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      userId: testUser._id,
    });
  } catch (error) {
    console.error("Database test failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Database connection failed",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
