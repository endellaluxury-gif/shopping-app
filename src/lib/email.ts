import nodemailer from "nodemailer";
import { IOrder } from "@/models/Order";

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use other services
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendOrderConfirmationEmail(order: IOrder) {
  try {
    // Email to customer
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Order Confirmation - Endella Beauty</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #3BB77E;">Endella Beauty</h1>
              <h2 style="color: #333;">Order Confirmation</h2>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="margin-top: 0;">Order Details</h3>
              <p><strong>Order Number:</strong> ${order.orderNumber}</p>
              <p><strong>Order Date:</strong> ${new Date(
                order.createdAt
              ).toLocaleDateString()}</p>
              <p><strong>Status:</strong> ${order.status}</p>
              <p><strong>Payment Status:</strong> ${order.paymentStatus}</p>
            </div>

            <div style="margin-bottom: 20px;">
              <h3>Items Ordered</h3>
              ${order.items
                .map(
                  (item) => `
                <div style="border-bottom: 1px solid #eee; padding: 10px 0;">
                  <div style="display: flex; align-items: center;">
                    <img src="${item.image}" alt="${
                    item.name
                  }" style="width: 60px; height: 60px; object-fit: cover; margin-right: 15px; border-radius: 4px;">
                    <div>
                      <h4 style="margin: 0; font-size: 16px;">${item.name}</h4>
                      <p style="margin: 5px 0; color: #666; font-size: 14px;">${
                        item.category
                      }${item.size ? ` • Size: ${item.size}` : ""}</p>
                       <p style="margin: 0; font-weight: bold; color: #3BB77E;">₦${item.price.toLocaleString()} x ${
                    item.quantity
                  }</p>
                    </div>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3>Shipping Address</h3>
              <p><strong>${order.shippingAddress.name}</strong></p>
              <p>${order.shippingAddress.address}</p>
              <p>${order.shippingAddress.city}, ${
      order.shippingAddress.state
    } ${order.shippingAddress.zipCode}</p>
              <p>${order.shippingAddress.country}</p>
              <p>Phone: ${order.shippingAddress.phone}</p>
              <p>Email: ${order.shippingAddress.email}</p>
            </div>

            <div style="text-align: center; background: #3BB77E; color: white; padding: 20px; border-radius: 8px;">
               <h3 style="margin: 0; color: white;">Total Amount: ₦${order.totalAmount.toLocaleString()}</h3>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <p>Thank you for your order! We'll process it and send you tracking information soon.</p>
              <p>If you have any questions, please contact us at <a href="mailto:endysworld@yahoo.com">endysworld@yahoo.com</a></p>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: order.shippingAddress.email,
      subject: `Order Confirmation - ${order.orderNumber}`,
      html: customerEmailHtml,
    });

    // Email to admin
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Order - Endella Beauty</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #3BB77E;">New Order Received</h1>
              <h2 style="color: #333;">Endella Beauty</h2>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="margin-top: 0;">Order Details</h3>
              <p><strong>Order Number:</strong> ${order.orderNumber}</p>
              <p><strong>Order Date:</strong> ${new Date(
                order.createdAt
              ).toLocaleDateString()}</p>
              <p><strong>Status:</strong> ${order.status}</p>
              <p><strong>Payment Status:</strong> ${order.paymentStatus}</p>
               <p><strong>Total Amount:</strong> ₦${order.totalAmount.toLocaleString()}</p>
            </div>

            <div style="margin-bottom: 20px;">
              <h3>Customer Information</h3>
              <p><strong>Name:</strong> ${order.shippingAddress.name}</p>
              <p><strong>Email:</strong> ${order.shippingAddress.email}</p>
              <p><strong>Phone:</strong> ${order.shippingAddress.phone}</p>
            </div>

            <div style="margin-bottom: 20px;">
              <h3>Shipping Address</h3>
              <p>${order.shippingAddress.address}</p>
              <p>${order.shippingAddress.city}, ${
      order.shippingAddress.state
    } ${order.shippingAddress.zipCode}</p>
              <p>${order.shippingAddress.country}</p>
            </div>

            <div style="margin-bottom: 20px;">
              <h3>Items Ordered</h3>
              ${order.items
                .map(
                  (item) => `
                <div style="border-bottom: 1px solid #eee; padding: 10px 0;">
                  <div style="display: flex; align-items: center;">
                    <img src="${item.image}" alt="${
                    item.name
                  }" style="width: 60px; height: 60px; object-fit: cover; margin-right: 15px; border-radius: 4px;">
                    <div>
                      <h4 style="margin: 0; font-size: 16px;">${item.name}</h4>
                      <p style="margin: 5px 0; color: #666; font-size: 14px;">${
                        item.category
                      }${item.size ? ` • Size: ${item.size}` : ""}</p>
                       <p style="margin: 0; font-weight: bold; color: #3BB77E;">₦${item.price.toLocaleString()} x ${
                    item.quantity
                  }</p>
                    </div>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>

            <div style="text-align: center; background: #3BB77E; color: white; padding: 20px; border-radius: 8px;">
               <h3 style="margin: 0; color: white;">Total Amount: ₦${order.totalAmount.toLocaleString()}</h3>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "endysworld@yahoo.com",
      subject: `New Order - ${order.orderNumber}`,
      html: adminEmailHtml,
    });

    console.log("Order confirmation emails sent successfully");
  } catch (error) {
    console.error("Error sending order confirmation emails:", error);
    throw error;
  }
}
