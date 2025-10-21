import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    // Test if the cart context is working
    return NextResponse.json({
      success: true,
      message: "Cart API is working",
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Cart API error" },
      { status: 500 }
    );
  }
}
