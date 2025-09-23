// Test script for production email setup
// Run with: node test-email.js

const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

const sendgridApiKey = process.env.SENDGRID_API_KEY;
const emailFrom = process.env.EMAIL_FROM || 'demo@q-port.com';

if (!sendgridApiKey || sendgridApiKey.includes('your_sendgrid_api_key')) {
  console.log('❌ SendGrid API key not configured');
  console.log('Please update SENDGRID_API_KEY in your .env.local file');
  process.exit(1);
}

const transporter = nodemailer.createTransporter({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: sendgridApiKey,
  },
});

async function testEmail() {
  console.log('🧪 Testing SendGrid email configuration...');

  try {
    const testEmail = {
      from: emailFrom,
      to: 'your-test-email@domain.com', // Replace with your email
      subject: 'Qport Email Configuration Test',
      html: `
        <h2>✅ Email Configuration Test Successful!</h2>
        <p>Your Qport demo booking system is ready to send emails.</p>
        <p><strong>From:</strong> ${emailFrom}</p>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        <p>You can now update EMAIL_PROVIDER to "sendgrid" for production use.</p>
      `,
      text: `Email Configuration Test Successful! Your Qport demo booking system is ready to send emails. From: ${emailFrom}, Time: ${new Date().toISOString()}`
    };

    console.log('📧 Sending test email...');
    const result = await transporter.sendMail(testEmail);

    console.log('✅ Test email sent successfully!');
    console.log('📨 Message ID:', result.messageId);
    console.log('📬 Check your inbox at: your-test-email@domain.com');
    console.log('\n🚀 Ready for production! Update EMAIL_PROVIDER to "sendgrid"');

  } catch (error) {
    console.log('❌ Email test failed:');
    console.log('Error:', error.message);

    if (error.code === 'EAUTH') {
      console.log('\n💡 Troubleshooting:');
      console.log('- Check your SendGrid API key is correct');
      console.log('- Verify API key has Mail Send permissions');
      console.log('- Ensure API key starts with "SG."');
    }
  }
}

testEmail();