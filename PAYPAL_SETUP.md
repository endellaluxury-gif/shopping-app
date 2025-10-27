# PayPal Integration Setup

## Environment Variables

Add these environment variables to your `.env.local` file:

```bash
# PayPal Configuration
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id_here
PAYPAL_CLIENT_SECRET=your_paypal_client_secret_here

# For development (sandbox)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_sandbox_client_id_here
PAYPAL_CLIENT_SECRET=your_sandbox_client_secret_here

# For production
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_live_client_id_here
PAYPAL_CLIENT_SECRET=your_live_client_secret_here
```

## PayPal Developer Setup

### 1. Create PayPal Developer Account
1. Go to [PayPal Developer](https://developer.paypal.com/)
2. Sign in with your PayPal account
3. Create a new application

### 2. Get Credentials
1. **Sandbox (Testing):**
   - Use sandbox credentials for development
   - Test with sandbox PayPal accounts
   
2. **Live (Production):**
   - Use live credentials for production
   - Requires PayPal business account verification

### 3. Configure Webhooks (Optional)
For advanced features, configure webhooks:
- Go to your PayPal app settings
- Add webhook URL: `https://yourdomain.com/api/payments/paypal/webhook`
- Select events: `PAYMENT.CAPTURE.COMPLETED`, `PAYMENT.CAPTURE.DENIED`

## Features Implemented

### ✅ Payment Methods
- **Paystack**: Cards, Bank Transfer, USSD (existing)
- **PayPal**: PayPal Account, Credit/Debit Cards (new)

### ✅ User Experience
- Payment method selection in checkout
- Secure payment processing
- Order confirmation emails
- Cart clearing after successful payment
- Success page with order details

### ✅ Security
- Client-side PayPal SDK
- Server-side payment verification
- Secure API routes
- Environment variable protection

## Testing

### PayPal Sandbox Testing
1. Use sandbox credentials in `.env.local`
2. Create test PayPal accounts in sandbox
3. Test payment flows
4. Verify order creation and email sending

### Production Deployment
1. Update to live PayPal credentials
2. Test with real PayPal accounts
3. Monitor payment success rates
4. Set up webhook notifications

## Troubleshooting

### Common Issues
1. **PayPal buttons not showing**: Check `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
2. **Payment fails**: Verify PayPal credentials and currency settings
3. **Order not created**: Check API route and database connection
4. **Email not sent**: Verify email configuration

### Debug Mode
Enable PayPal debug mode by adding to your environment:
```bash
PAYPAL_DEBUG=true
```

## Currency Support

Currently configured for:
- **Paystack**: Nigerian Naira (NGN)
- **PayPal**: US Dollar (USD)

To support multiple currencies, update the PayPal component currency prop based on user location or preference.
