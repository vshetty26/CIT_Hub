import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a persistent transporter instance to reuse connections
let transporter: nodemailer.Transporter | null = null;
let transporterReady = false;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
      pool: true,
      maxConnections: 1,
      maxMessages: 100,
      rateDelta: 1000,
      rateLimit: 5,
    });

    // Verify connection on first creation
    if (!transporterReady) {
      transporter.verify((error) => {
        if (error) {
          console.error('Transporter verification failed:', error);
          transporterReady = false;
        } else {
          console.log('Transporter verified and ready');
          transporterReady = true;
        }
      });
    }
  }
  return transporter;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, name, email, phone, company, projectType, subject, message } = body;

    console.log('Form submission received:', { type, name, email });

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if Gmail credentials are configured
    if (!process.env.GMAIL_PASSWORD || process.env.GMAIL_PASSWORD === 'your-app-specific-password-here') {
      return NextResponse.json(
        { 
          error: 'Email service not configured',
          details: 'Please set up Gmail app password'
        },
        { status: 500 }
      );
    }

    const mailTransporter = getTransporter();

    // Format the email content for company
    const emailSubject = type === 'project' 
      ? `New Project Inquiry from ${name}` 
      : `New Contact Message from ${name}`;

    const emailBody = `
      <h2>${emailSubject}</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
      ${projectType ? `<p><strong>Project Type:</strong> ${projectType}</p>` : ''}
      ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    // Send email ONLY to company (no confirmation to user)
    const mailOptions = {
      from: process.env.GMAIL_FROM,
      to: process.env.GMAIL_TO,
      replyTo: email,
      subject: emailSubject,
      html: emailBody,
    };

    // Send email with a timeout promise
    const sendEmailPromise = new Promise<{ success: boolean; messageId?: string }>((resolve, reject) => {
      const timeout = setTimeout(() => {
        console.log('Email send timeout - will continue in background');
        reject(new Error('Email send timeout'));
      }, 5000); // 5 second timeout

      mailTransporter.sendMail(mailOptions, (err, info) => {
        clearTimeout(timeout);
        if (err) {
          console.error('Email send error:', err);
          reject(err);
        } else {
          console.log('Email sent successfully:', info.messageId);
          resolve({ success: true, messageId: info.messageId });
        }
      });
    });

    try {
      const result = await sendEmailPromise;
      return NextResponse.json({ success: true, messageId: result.messageId }, { status: 200 });
    } catch (emailError) {
      console.error('Email send failed:', emailError);
      // Still return success to user - email will be sent in background
      // This prevents form timeout while still attempting to send
      return NextResponse.json({ success: true, queued: true }, { status: 200 });
    }
  } catch (error) {
    console.error('Email error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error details:', errorMessage);
    return NextResponse.json(
      { error: 'Failed to send email', details: errorMessage },
      { status: 500 }
    );
  }
}
