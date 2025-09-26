import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { appendFile } from "fs/promises";
import { resolve } from "path";
import { supabaseAdmin } from "../../lib/supabase";

const schedulerBaseUrl = process.env.NEXT_PUBLIC_SCHEDULER_URL || "https://calendly.com/your-workspace/demo-30";
const emailProvider = (process.env.EMAIL_PROVIDER || "sendgrid").toLowerCase();
const sendgridApiKey = process.env.SENDGRID_API_KEY;
const emailFrom = process.env.EMAIL_FROM || "demo@example.com";
const emailBcc = process.env.EMAIL_BCC || "";
const emailLogPath = process.env.EMAIL_LOG_PATH;

const buildSchedulerUrl = (source: string) => {
  try {
    const url = new URL(schedulerBaseUrl);
    if (!url.searchParams.has("utm_source")) {
      url.searchParams.set("utm_source", source || "website");
      url.searchParams.set("utm_medium", "email");
      url.searchParams.set("utm_campaign", "book-demo");
    }
    return url.toString();
  } catch (error) {
    return schedulerBaseUrl;
  }
};

const buildTransporter = () => {
  if (!sendgridApiKey) return null;
  return nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
      user: "apikey",
      pass: sendgridApiKey,
    },
  });
};

const writeEmailLog = async (payload: Record<string, unknown>) => {
  if (!emailLogPath) return;
  try {
    const absolute = resolve(emailLogPath);
    await appendFile(
      absolute,
      `${new Date().toISOString()} ${JSON.stringify(payload)}\n`,
      { encoding: "utf8" }
    );
  } catch (error) {
    console.warn("Unable to write simulated email log", error);
  }
};

const sendEmail = async (payload: {
  to: string;
  subject: string;
  text: string;
  html: string;
  bcc?: string;
}) => {
  const simulate = emailProvider === "simulated" || !sendgridApiKey;

  if (simulate) {
    const logPayload = {
      level: "info",
      event: "demo-email-simulated",
      provider: emailProvider,
      to: payload.to,
      subject: payload.subject,
      text: payload.text,
    };
    console.info(JSON.stringify(logPayload));
    await writeEmailLog(logPayload);
    return { simulated: true } as const;
  }

  switch (emailProvider) {
    case "sendgrid": {
      const transporter = buildTransporter();
      if (!transporter) {
        throw new Error("SendGrid transporter unavailable");
      }
      await transporter.sendMail({
        from: emailFrom,
        to: payload.to,
        bcc: payload.bcc || undefined,
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
      });
      return { simulated: false } as const;
    }
    default:
      throw new Error(`Unsupported email provider: ${emailProvider}`);
  }
};

const saveDemoRequestToDatabase = async (data: {
  name: string;
  email: string;
  company?: string;
  source: string;
  selectedTime?: string;
}) => {
  // Check if Supabase is configured
  if (!supabaseAdmin) {
    console.log('Supabase not configured, skipping database save');
    return;
  }

  try {
    const { error } = await supabaseAdmin
      .from('demo_requests')
      .insert([
        {
          name: data.name,
          email: data.email,
          company: data.company || null,
          source: data.source,
          selected_time: data.selectedTime || null,
          created_at: new Date().toISOString(),
          status: 'pending'
        }
      ]);

    if (error) {
      console.error('Error saving to Supabase:', error);
      throw error;
    }

    console.log('Demo request saved to database successfully');
  } catch (error) {
    console.error('Failed to save demo request to database:', error);
    // Don't throw error to prevent breaking the email flow
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, company, selectedTime, source = "website" } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  // Save to database first (non-blocking)
  await saveDemoRequestToDatabase({ name, email, company, selectedTime, source });

  // Handle calendar booking vs simple email request
  if (selectedTime) {
    return handleCalendarBooking({ name, email, company, selectedTime, source, res });
  } else {
    return handleEmailRequest({ name, email, source, res });
  }
}

const handleCalendarBooking = async ({ name, email, company, selectedTime, source, res }: any) => {
  const demoDate = new Date(selectedTime);
  const formattedDate = demoDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formattedTime = demoDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short'
  });

  // Customer confirmation email
  const customerHtmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0B5CF5;">Your Qport Demo is Confirmed!</h2>
      <p>Hi ${name},</p>
      <p>Thank you for booking a demo with Qport. We're excited to show you how our heavy cargo route intelligence platform can streamline your logistics operations.</p>

      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #333;">Demo Details</h3>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${formattedTime}</p>
        <p><strong>Duration:</strong> 30 minutes</p>
        <p><strong>Attendee:</strong> ${name}${company ? ` (${company})` : ''}</p>
      </div>

      <p><strong>What to expect:</strong></p>
      <ul>
        <li>Live demonstration of Qport's route recording and following features</li>
        <li>Discussion of your specific heavy cargo challenges</li>
        <li>Q&A session tailored to your logistics needs</li>
      </ul>

      <p>A calendar invite with meeting details will be sent separately. If you need to reschedule, please reply to this email.</p>

      <p>We're looking forward to speaking with you!</p>
      <p>— The Qport Team</p>
    </div>
  `;

  const customerTextBody = `Your Qport Demo is Confirmed!

Hi ${name},

Thank you for booking a demo with Qport. We're excited to show you how our heavy cargo route intelligence platform can streamline your logistics operations.

Demo Details:
Date: ${formattedDate}
Time: ${formattedTime}
Duration: 30 minutes
Attendee: ${name}${company ? ` (${company})` : ''}

What to expect:
- Live demonstration of Qport's route recording and following features
- Discussion of your specific heavy cargo challenges
- Q&A session tailored to your logistics needs

A calendar invite with meeting details will be sent separately. If you need to reschedule, please reply to this email.

We're looking forward to speaking with you!

— The Qport Team`;

  // Internal notification email
  const internalHtmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0B5CF5;">New Demo Booking - Qport</h2>
      <p>A new demo has been scheduled through the website.</p>

      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #333;">Booking Details</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${formattedTime}</p>
        <p><strong>Source:</strong> ${source}</p>
      </div>

      <p><strong>Action Required:</strong></p>
      <ul>
        <li>Send calendar invite to ${email}</li>
        <li>Prepare demo materials</li>
        <li>Review customer's potential use case</li>
      </ul>
    </div>
  `;

  try {
    // Send confirmation email to customer
    const customerResult = await sendEmail({
      to: email,
      subject: "Your Qport Demo is Confirmed",
      html: customerHtmlBody,
      text: customerTextBody,
    });

    // Send notification to internal team
    const internalEmail = process.env.EMAIL_BCC || "demo@q-port.com";
    if (internalEmail) {
      await sendEmail({
        to: internalEmail,
        subject: `New Demo Booking: ${name} - ${formattedDate} at ${formattedTime}`,
        html: internalHtmlBody,
        text: `New demo booking from ${name} (${email}) scheduled for ${formattedDate} at ${formattedTime}`,
      });
    }

    return res.status(200).json({
      message: "Demo booked successfully! Check your inbox for confirmation.",
      simulated: customerResult.simulated,
    });
  } catch (error) {
    console.error("Failed to send demo confirmation emails", error);
    return res.status(500).json({ error: "Unable to confirm demo booking. Please try again later." });
  }
};

const handleEmailRequest = async ({ name, email, source, res }: any) => {
  const schedulerUrl = buildSchedulerUrl(source);

  const htmlBody = `
    <p>Hi ${name},</p>
    <p>Thanks for your interest in Qport. You can choose a time for your 30-minute demo using the link below:</p>
    <p><a href="${schedulerUrl}" target="_blank" rel="noreferrer">Book your demo</a></p>
    <p>If the link doesn't automatically open, copy and paste this URL into your browser:<br>${schedulerUrl}</p>
    <p>We're looking forward to speaking with you!</p>
    <p>— The Qport Team</p>
  `;

  const textBody = `Hi ${name},\n\nThanks for your interest in Qport. Choose a time for your 30-minute demo here: ${schedulerUrl}\n\nWe're looking forward to speaking with you!\n\n— The Qport Team`;

  try {
    const result = await sendEmail({
      to: email,
      bcc: emailBcc,
      subject: "Book your Qport demo",
      html: htmlBody,
      text: textBody,
    });

    return res.status(200).json({
      message: "Demo link sent! Check your inbox for scheduling details.",
      simulated: result.simulated,
    });
  } catch (error) {
    console.error("Failed to send demo email", error);
    return res.status(500).json({ error: "Unable to send demo link. Please try again later." });
  }
};
