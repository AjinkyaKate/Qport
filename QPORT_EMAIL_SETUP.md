# Q.port Email Integration Setup

## Quick Setup Guide for Q.port Email Integration

### 📧 Current Configuration

The system is now configured to send emails from Q.port branded addresses:

**From Address:** `Q.port Team <noreply@q-port.com>`
**Internal Notifications:** `demo@q-port.com`

### 🚀 To Enable Real Email Sending

#### Option 1: SendGrid (Recommended)

1. **Create SendGrid Account:**
   - Go to [SendGrid.com](https://sendgrid.com)
   - Sign up with your Q.port email address

2. **Generate API Key:**
   - Settings → API Keys → Create API Key
   - Name: "Q.port Demo Emails"
   - Permissions: Mail Send (Full Access)
   - Copy the API key (starts with `SG.`)

3. **Domain Authentication:**
   - Settings → Sender Authentication
   - Authenticate Domain: `q-port.com`
   - Add DNS records to your domain
   - Wait for verification (24-48 hours)

4. **Update Environment Variables:**
   ```bash
   # In .env.local or .env.production
   EMAIL_PROVIDER=sendgrid
   SENDGRID_API_KEY=SG.your_actual_sendgrid_api_key
   EMAIL_FROM=Q.port Team <noreply@q-port.com>
   EMAIL_BCC=demo@q-port.com
   ```

#### Option 2: Gmail SMTP (Alternative)

1. **Enable App Passwords:**
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Q.port Demo App"

2. **Update API Code:**
   ```javascript
   // In pages/api/book-demo.ts, update buildTransporter():
   const transporter = nodemailer.createTransporter({
     service: 'gmail',
     auth: {
       user: 'noreply@q-port.com',
       pass: 'your_app_password_here'
     }
   });
   ```

3. **Update Environment:**
   ```bash
   EMAIL_PROVIDER=gmail
   EMAIL_FROM=Q.port Team <noreply@q-port.com>
   EMAIL_BCC=demo@q-port.com
   ```

### 📨 Email Templates

The system sends professional emails with Q.port branding:

**Customer Email:**
```
Subject: Book your Q.port demo

Hi [Name],

Thanks for your interest in Q.port. Choose a time for your 30-minute demo here:
https://calendly.com/qport-demo/30min

We're looking forward to speaking with you!

— The Q.port Team
```

**Internal Notification:**
```
Subject: New Demo Request: [Name]

New demo request from [Name] ([Email])
Source: [Website/CTA]
Time: [Timestamp]
```

### 🔧 Required DNS Records (for SendGrid)

Add these to your q-port.com DNS:

```
Type: CNAME
Host: s1._domainkey
Value: [provided by SendGrid]

Type: CNAME
Host: s2._domainkey
Value: [provided by SendGrid]

Type: TXT
Host: @
Value: "v=spf1 include:sendgrid.net ~all"
```

### ✅ Testing

1. **Development Mode:** Emails logged to console (current setup)
2. **Production Mode:** Real emails sent via configured provider

**Test Command:**
```bash
curl -X POST http://localhost:3001/api/book-demo \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com", "source": "website"}'
```

### 🛠️ Deployment

**Environment Variables for Production:**
- `EMAIL_PROVIDER=sendgrid`
- `SENDGRID_API_KEY=SG.your_key`
- `EMAIL_FROM=Q.port Team <noreply@q-port.com>`
- `EMAIL_BCC=demo@q-port.com`

### 📞 Support

- **SendGrid Docs:** https://docs.sendgrid.com/
- **Issues:** Check EMAIL_SETUP.md for troubleshooting
- **Testing:** Use the test-email.js script

---

**Status:** ✅ Q.port email integration configured and ready for production!