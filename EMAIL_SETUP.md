# Email Configuration Guide for Q.port Demo Booking

## Production Setup Instructions

### 1. SendGrid Account Setup

1. **Create SendGrid Account:**
   - Visit [SendGrid](https://sendgrid.com/)
   - Sign up with your business email
   - Complete email verification

2. **Generate API Key:**
   - Navigate to Settings → API Keys
   - Click "Create API Key"
   - Name it "Qport Demo Booking"
   - Choose "Restricted Access"
   - Grant permissions: **Mail Send (Full Access)**
   - Copy the API key (format: `SG.xxxxxxxxxx`)

3. **Domain Authentication (Recommended):**
   - Go to Settings → Sender Authentication
   - Click "Authenticate Your Domain"
   - Enter your domain (e.g., `q-port.com`)
   - Add the provided DNS records to your domain
   - Wait for verification (24-48 hours)

### 2. Environment Configuration

**For Local Development (.env.local):**
```bash
EMAIL_PROVIDER=simulated
EMAIL_FROM=Q.port Team <noreply@q-port.com>
EMAIL_BCC=demo@q-port.com
```

**For Production (.env.production):**
```bash
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=SG.your_actual_api_key_here
EMAIL_FROM=Q.port Team <noreply@q-port.com>
EMAIL_BCC=demo@q-port.com
```

### 3. Update Your Values

Replace these placeholders with your actual information:

- `SG.your_actual_api_key_here` → Your SendGrid API key
- `noreply@q-port.com` → Your actual Q.port noreply email address
- `demo@q-port.com` → Your Q.port demo team email address
- `https://calendly.com/qport-demo/30min` → Your actual Calendly link

### 4. Email Templates

The system sends two types of emails:

**Customer Confirmation Email:**
- Subject: "Your Q.port Demo is Confirmed"
- Contains: Demo details, what to expect, contact info
- Sent to: Customer's email address

**Internal Notification Email:**
- Subject: "New Demo Booking: [Name] - [Date] at [Time]"
- Contains: Customer details, demo info, action items
- Sent to: EMAIL_BCC address (sales team)

### 5. Testing Production Email

Once configured, test with:

```bash
curl -X POST http://localhost:3001/api/book-demo \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "your-test-email@domain.com",
    "company": "Test Company",
    "selectedTime": "2024-12-25T14:30:00.000Z",
    "source": "calendar-booking"
  }'
```

### 6. Deployment Considerations

**Environment Variables for Hosting Platform:**
- Set `EMAIL_PROVIDER=sendgrid`
- Set `SENDGRID_API_KEY` as a secure environment variable
- Update `EMAIL_FROM` and `EMAIL_BCC` with your domain

**Security Best Practices:**
- Never commit API keys to version control
- Use environment variables for all sensitive data
- Keep `.env.*` files in `.gitignore`
- Rotate API keys regularly

### 7. Alternative Email Providers

The system currently supports SendGrid, but you can easily add other providers by:

1. Adding a new case in the `sendEmail` function in `/pages/api/book-demo.ts`
2. Installing the appropriate email package
3. Updating the environment configuration

### 8. Monitoring and Logs

- SendGrid provides delivery analytics in their dashboard
- Enable webhook events for delivery tracking
- Monitor bounce rates and spam reports
- Set up alerts for failed deliveries

### Troubleshooting

**Common Issues:**
- **Authentication failed:** Check API key format and permissions
- **Emails not sending:** Verify domain authentication status
- **Emails in spam:** Complete domain authentication and SPF/DKIM setup
- **Rate limits:** Monitor SendGrid usage limits

**Support:**
- SendGrid Documentation: https://docs.sendgrid.com/
- SendGrid Support: Available in dashboard