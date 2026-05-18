import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, name, email, phone, subject, message, company, projectType, budget } = body;

    let htmlContent = '';
    let emailSubject = '';

    if (type === 'project') {
      emailSubject = `New Project Inquiry from ${name}`;
      htmlContent = `
        <h2>New Project Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Budget Range:</strong> ${budget || 'Not specified'}</p>
        <p><strong>Project Details:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `;
    } else if (type === 'contact') {
      emailSubject = `New Contact Form Submission from ${name}`;
      htmlContent = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `;
    }

    // Send email to CIT Hub
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'info@cithub.com.au',
      subject: emailSubject,
      html: htmlContent,
      replyTo: email,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'We received your message - CIT Hub',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${name},</p>
        <p>We've received your ${type === 'project' ? 'project inquiry' : 'message'} and will get back to you as soon as possible.</p>
        <p>In the meantime, feel free to reach out directly:</p>
        <p>
          📧 <a href="mailto:info@cithub.com.au">info@cithub.com.au</a><br>
          📞 <a href="tel:+61401298275">+61 401 298 275</a>
        </p>
        <p>Best regards,<br>CIT Hub Team</p>
      `,
    });

    return Response.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    return Response.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
