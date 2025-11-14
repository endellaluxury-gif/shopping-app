import mongoose, { Document, Schema } from "mongoose";

export interface IOrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  size?: string; // Size: SM, MD, LG, XL, 2XL, 3XL
  image: string;
  category: string;
}

export interface IOrder extends Document {
  orderNumber: string;
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  status:
    | "pending"
    | "paid"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  paymentMethod?: "paystack" | "paypal";
  paymentReference?: string;
  paymentID?: string; // PayPal payment ID
  shippingAddress: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  productId: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  size: { type: String }, // Optional size field
  image: { type: String, required: true },
  category: { type: String, required: true },
});

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [OrderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "paid",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["paystack", "paypal"],
      default: "paystack",
    },
    paymentReference: {
      type: String,
    },
    paymentID: {
      type: String,
    },
    shippingAddress: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

// Generate order number before saving
OrderSchema.pre("save", async function (next) {
  if (this.isNew && !this.orderNumber) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const count = await (this.constructor as any).countDocuments();
      this.orderNumber = `EDL-${Date.now()}-${count + 1}`;
    } catch (error) {
      console.error("Error generating order number:", error);
      // Fallback to a simple timestamp-based number
      this.orderNumber = `EDL-${Date.now()}`;
    }
  }
  next();
});

export default mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);
