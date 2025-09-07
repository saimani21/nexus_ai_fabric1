import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, phone, email, company, project, to, subject } = body;

    // ✅ Validate required fields
    if (!fullName || !phone || !email || !company || !project) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // ✅ Check environment variables
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("❌ Missing SMTP credentials. Check your .env.local file.");
      return NextResponse.json(
        { error: 'SMTP credentials are missing or misconfigured.' },
        { status: 500 }
      );
    }

    // ✅ Create Gmail SMTP transporter with debug logging
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for port 465, false for port 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // MUST be a Gmail App Password
      },
      logger: true, // Enable console logging
      debug: true,  // Extra debugging output
    });

    // ✅ Build HTML email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #22d3ee; margin-bottom: 20px; text-align: center;">New Demo Request - Nexus AI</h2>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #333; margin-bottom: 15px;">Contact Information:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #555;">Full Name:</td>
                <td style="padding: 8px; color: #333;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 8px; color: #333;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #555;">Phone:</td>
                <td style="padding: 8px; color: #333;">+1 ${phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #555;">Company:</td>
                <td style="padding: 8px; color: #333;">${company}</td>
              </tr>
            </table>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #333; margin-bottom: 15px;">Project Description:</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #22d3ee;">
              <p style="margin: 0; color: #333; line-height: 1.6;">${project}</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px;">
              This demo request was submitted from the Nexus AI website.
            </p>
            <p style="color: #666; font-size: 14px;">
              Submitted on: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    `;

    // ✅ Plain text fallback (for email clients that don't support HTML)
    const textContent = `
New Request - Nexus AI

Contact Information:
- Full Name: ${fullName}
- Email: ${email}
- Phone: +1 ${phone}
- Company: ${company}

Project Description:
${project}

Submitted on: ${new Date().toLocaleString()}
    `;

    // ✅ Email options
    const mailOptions = {
      from: `"Nexus AI" <${process.env.SMTP_USER}>`, // MUST match authenticated Gmail
      to: to || 'quantumcodeworks7@gmail.com', // fallback recipient
      subject: subject || 'New Request from Nexus AI Website',
      text: textContent,
      html: htmlContent,
    };

    // ✅ Send the email and log the result
    const result = await transporter.sendMail(mailOptions);
    console.log("📧 Email send result:", result);

    return NextResponse.json(
      { message: 'Request sent successfully', response: result },
      { status: 200 }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to send request';
    console.error('❌ Error sending email:', errorMessage);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
