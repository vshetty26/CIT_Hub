import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, name, email, phone, company, projectType, subject, message } = body;

    // Configure Gmail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Format email content based on form type
    const isProjectInquiry = type === 'project';
    const emailSubject = isProjectInquiry 
      ? `New Project Inquiry from ${name}` 
      : `New Contact Message from ${name}`;

    const emailContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #000; color: #fff; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #000; margin-bottom: 5px; }
            .value { color: #555; padding: 8px; background-color: #fff; border-left: 3px solid #3b82f6; padding-left: 12px; }
            .message-box { background-color: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 4px; margin-top: 10px; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>${isProjectInquiry ? '🚀 New Project Inquiry' : '💬 New Contact Message'}</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value"><a href="tel:${phone}">${phone}</a></div>
              </div>
              
              ${company ? `
              <div class="field">
                <div class="label">Company:</div>
                <div class="value">${company}</div>
              </div>
              ` : ''}
              
              ${projectType ? `
              <div class="field">
                <div class="label">Project Type:</div>
                <div class="value">${projectType}</div>
              </div>
              ` : ''}
              
              ${subject ? `
              <div class="field">
                <div class="label">Subject:</div>
                <div class="value">${subject}</div>
              </div>
              ` : ''}
              
              <div class="field">
                <div class="label">${isProjectInquiry ? 'Project Details:' : 'Message:'}</div>
                <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
              </div>
              
              <div class="footer">
                <p>This message was sent from your CIT HUB website contact form.</p>
                <p>Reply directly to this email to respond to the sender.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email to your inbox
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT,
      subject: emailSubject,
      html: emailContent,
      replyTo: email,
    });

    // Send confirmation email to the user
    const confirmationEmail = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #000; color: #fff; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
            .message { color: #555; line-height: 1.8; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Thank You, ${name}! 🎉</h2>
            </div>
            <div class="content">
              <div class="message">
                <p>We've received your ${isProjectInquiry ? 'project inquiry' : 'message'} and appreciate you reaching out to CIT HUB.</p>
                <p>Our team will review your submission and get back to you as soon as possible, typically within 24-48 hours.</p>
                <p>In the meantime, feel free to explore our work at <a href="https://cithub.com.au">cithub.com.au</a></p>
              </div>
              <div class="footer">
                <p><strong>CIT HUB</strong></p>
                <p>📧 info@cithub.com.au | 📞 +61 401 298 275</p>
                <p>Building digital experiences that matter</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `We've received your ${isProjectInquiry ? 'project inquiry' : 'message'} - CIT HUB`,
      html: confirmationEmail,
      replyTo: process.env.EMAIL_USER,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
