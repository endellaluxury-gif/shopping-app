# Cart System Setup Guide

This guide will help you set up the complete cart and checkout system for your Endella Beauty shopping website.

## 🚀 Features Implemented

- ✅ Shopping cart with add/remove/update functionality
- ✅ Guest and user checkout options
- ✅ Paystack payment integration
- ✅ Email notifications for orders
- ✅ Order management system
- ✅ Responsive design

## 📋 Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Database
MONGODB_URI=mongodb+srv://endellaluxury_db_user:aqNlUWVo5P1Z64Ed@production.xadlq8p.mongodb.net/?retryWrites=true&w=majority&appName=production

# Paystack
PAYSTACK_SECRET_KEY=your_paystack_secret_key_here
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key_here

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password_here

# App Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 2. Paystack Setup

1. **Create a Paystack account** at [paystack.com](https://paystack.com)
2. **Get your API keys** from the Paystack dashboard:
   - Go to Settings > API Keys & Webhooks
   - Copy your Secret Key and Public Key
   - Add them to your `.env.local` file

3. **Configure webhooks** (optional but recommended):
   - Add webhook URL: `https://yourdomain.com/api/payments/webhook`
   - Select events: `charge.success`, `charge.failed`

### 3. Email Setup

1. **Gmail Setup** (recommended):
   - Enable 2-factor authentication on your Gmail account
   - Generate an App Password:
     - Go to Google Account settings
     - Security > 2-Step Verification > App passwords
     - Generate a new app password for "Mail"
   - Use your Gmail address and the app password in `.env.local`

2. **Alternative email services**:
   - You can use other SMTP services like SendGrid, Mailgun, etc.
   - Update the transporter configuration in `src/lib/email.ts`

### 4. Database Setup

The MongoDB connection is already configured. The system will automatically create the necessary collections when you run the application.

## 🛠️ Usage

### Cart Functionality

- **Add to Cart**: Click the "Add" button on any product card
- **View Cart**: Click the cart icon in the header
- **Update Quantities**: Use the +/- buttons in the cart
- **Remove Items**: Click the trash icon next to any item

### Checkout Process

1. **Cart Page**: Review items and proceed to checkout
2. **Checkout Form**: Fill in shipping and contact information
3. **Payment**: Redirected to Paystack for secure payment
4. **Confirmation**: Order confirmation page with details

### Order Management

- Orders are automatically created in MongoDB
- Email notifications sent to customer and admin
- Order status tracking available

## 📧 Email Notifications

The system sends two types of emails:

1. **Customer Confirmation**: Sent to the customer's email with order details
2. **Admin Notification**: Sent to `endysworld@yahoo.com` with new order details

## 🔧 Customization

### Styling
- All components use Tailwind CSS
- Primary color is defined in CSS variables (`--primary`)
- Responsive design for mobile and desktop

### Payment Integration
- Currently integrated with Paystack
- Easy to switch to other payment providers
- Webhook support for payment verification

### Email Templates
- HTML email templates in `src/lib/email.ts`
- Customizable styling and content
- Support for order details and customer information

## 🚨 Important Notes

1. **Security**: Never commit your `.env.local` file to version control
2. **Paystack Keys**: Use test keys for development, live keys for production
3. **Email Limits**: Gmail has daily sending limits (500 emails/day for free accounts)
4. **Database**: Ensure your MongoDB cluster is accessible from your application

## 🐛 Troubleshooting

### Common Issues

1. **Cart not updating**: Check if CartProvider is wrapping your app
2. **Payment not working**: Verify Paystack keys are correct
3. **Emails not sending**: Check email credentials and SMTP settings
4. **Database connection**: Verify MongoDB URI and network access

### Debug Steps

1. Check browser console for JavaScript errors
2. Check server logs for API errors
3. Verify environment variables are loaded
4. Test database connection
5. Test email sending separately

## 📞 Support

If you encounter any issues:

1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Test each component individually
4. Contact support if issues persist

## 🎉 Next Steps

After setup:

1. Test the complete checkout flow
2. Customize email templates
3. Add order tracking functionality
4. Implement user accounts (optional)
5. Add inventory management
6. Set up analytics tracking

Your cart system is now ready to use! 🛒✨
