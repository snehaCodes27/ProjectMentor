import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email transporter error:', error.message);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

/**
 * Send email verification link
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.name - User's name
 * @param {string} options.verificationToken - Verification token
 */
export const sendVerificationEmail = async ({ to, name, verificationToken }) => {
  try {
    const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email?token=${verificationToken}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Project Mentor <noreply@projectmentor.com>',
      to,
      subject: '✅ Verify Your Email - Project Mentor',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              margin: 0;
              padding: 40px 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              border-radius: 20px;
              overflow: hidden;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 40px 30px;
              text-align: center;
            }
            .header h1 {
              color: white;
              margin: 0;
              font-size: 32px;
              font-weight: 800;
            }
            .content {
              padding: 40px 30px;
            }
            .content h2 {
              color: #1e293b;
              font-size: 24px;
              margin: 0 0 20px;
            }
            .content p {
              color: #64748b;
              line-height: 1.8;
              margin: 0 0 20px;
              font-size: 16px;
            }
            .verify-button {
              display: inline-block;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 16px 40px;
              text-decoration: none;
              border-radius: 50px;
              font-weight: 600;
              font-size: 16px;
              margin: 20px 0;
              box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
            }
            .footer {
              background: #f8fafc;
              padding: 30px;
              text-align: center;
              border-top: 1px solid #e2e8f0;
            }
            .footer p {
              color: #94a3b8;
              font-size: 14px;
              margin: 5px 0;
            }
            .token-box {
              background: #f8fafc;
              border: 2px dashed #cbd5e1;
              border-radius: 12px;
              padding: 20px;
              margin: 20px 0;
              text-align: center;
            }
            .token-box p {
              color: #475569;
              font-size: 14px;
              margin: 0 0 10px;
            }
            .token-box code {
              background: white;
              padding: 8px 16px;
              border-radius: 8px;
              font-family: monospace;
              color: #667eea;
              font-size: 14px;
              word-break: break-all;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✨ Project Mentor</h1>
            </div>
            
            <div class="content">
              <h2>Verify Your Email Address ✅</h2>
              <p>Hi ${name}!</p>
              <p>Thank you for signing up with Project Mentor! To complete your registration and start building amazing projects, please verify your email address.</p>
              
              <p style="text-align: center;">
                <a href="${verificationUrl}" class="verify-button">
                  Verify Email Address
                </a>
              </p>

              <div class="token-box">
                <p><strong>Or copy this link:</strong></p>
                <code>${verificationUrl}</code>
              </div>

              <p><strong>Why verify?</strong></p>
              <p>Email verification helps us:</p>
              <ul style="color: #64748b; line-height: 1.8;">
                <li>Ensure your account security</li>
                <li>Send you important project updates</li>
                <li>Enable team collaboration features</li>
                <li>Protect against spam and fake accounts</li>
              </ul>

              <p style="color: #94a3b8; font-size: 14px; margin-top: 30px;">
                This link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.
              </p>
            </div>
            
            <div class="footer">
              <p><strong>Project Mentor</strong></p>
              <p>Your AI companion for hackathons and academic projects</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Verify Your Email Address

Hi ${name}!

Thank you for signing up with Project Mentor! Please verify your email address by clicking the link below:

${verificationUrl}

This link will expire in 24 hours.

Project Mentor - Your AI companion for hackathons and academic projects
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Verification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending verification email:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send team invitation email to a member
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.teamName - Name of the team
 * @param {string} options.inviterName - Name of person who invited
 * @param {string} options.projectDetails - Project details
 */
export const sendTeamInvitation = async ({ to, teamName, inviterName, projectDetails }) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Project Mentor <noreply@projectmentor.com>',
      to,
      subject: `🎉 You've been invited to join "${teamName}" on Project Mentor!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              margin: 0;
              padding: 40px 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              border-radius: 20px;
              overflow: hidden;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 40px 30px;
              text-align: center;
            }
            .header h1 {
              color: white;
              margin: 0;
              font-size: 32px;
              font-weight: 800;
            }
            .header .subtitle {
              color: rgba(255, 255, 255, 0.9);
              margin: 10px 0 0;
              font-size: 16px;
            }
            .content {
              padding: 40px 30px;
            }
            .content h2 {
              color: #1e293b;
              font-size: 24px;
              margin: 0 0 20px;
            }
            .content p {
              color: #64748b;
              line-height: 1.8;
              margin: 0 0 20px;
              font-size: 16px;
            }
            .team-info {
              background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
              border-left: 4px solid #667eea;
              padding: 20px;
              border-radius: 12px;
              margin: 30px 0;
            }
            .team-info h3 {
              color: #1e293b;
              margin: 0 0 15px;
              font-size: 18px;
            }
            .team-info p {
              margin: 8px 0;
              color: #475569;
            }
            .team-info strong {
              color: #1e293b;
            }
            .cta-button {
              display: inline-block;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 16px 40px;
              text-decoration: none;
              border-radius: 50px;
              font-weight: 600;
              font-size: 16px;
              margin: 20px 0;
              box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
              transition: transform 0.3s ease;
            }
            .cta-button:hover {
              transform: translateY(-2px);
            }
            .footer {
              background: #f8fafc;
              padding: 30px;
              text-align: center;
              border-top: 1px solid #e2e8f0;
            }
            .footer p {
              color: #94a3b8;
              font-size: 14px;
              margin: 5px 0;
            }
            .features {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              margin: 30px 0;
            }
            .feature {
              background: #f8fafc;
              padding: 15px;
              border-radius: 12px;
              text-align: center;
            }
            .feature-icon {
              font-size: 32px;
              margin-bottom: 8px;
            }
            .feature-text {
              color: #64748b;
              font-size: 14px;
              margin: 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✨ Project Mentor</h1>
              <p class="subtitle">AI-Powered Project Management</p>
            </div>
            
            <div class="content">
              <h2>You're Invited! 🎉</h2>
              <p>Hi there!</p>
              <p><strong>${inviterName}</strong> has invited you to join their team on <strong>Project Mentor</strong>, the AI-powered platform that helps students build amazing projects from idea to completion.</p>
              
              <div class="team-info">
                <h3>Team Details</h3>
                <p><strong>Team Name:</strong> ${teamName}</p>
                <p><strong>Invited By:</strong> ${inviterName}</p>
                ${projectDetails ? `<p><strong>Project:</strong> ${projectDetails}</p>` : ''}
              </div>

              <div class="features">
                <div class="feature">
                  <div class="feature-icon">🤖</div>
                  <p class="feature-text">AI-Powered Guidance</p>
                </div>
                <div class="feature">
                  <div class="feature-icon">🎯</div>
                  <p class="feature-text">Step-by-Step Flow</p>
                </div>
                <div class="feature">
                  <div class="feature-icon">🚀</div>
                  <p class="feature-text">Complete Package</p>
                </div>
                <div class="feature">
                  <div class="feature-icon">👥</div>
                  <p class="feature-text">Team Collaboration</p>
                </div>
              </div>

              <p style="text-align: center;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard" class="cta-button">
                  Join Your Team Now →
                </a>
              </p>

              <p>Once you join, you'll be able to collaborate with your team, track progress, and get AI assistance throughout your project journey.</p>
            </div>
            
            <div class="footer">
              <p><strong>Project Mentor</strong></p>
              <p>Your AI companion for hackathons and academic projects</p>
              <p style="margin-top: 20px; font-size: 12px;">
                This is an automated email. Please do not reply to this message.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
You've been invited to join "${teamName}" on Project Mentor!

${inviterName} has invited you to join their team on Project Mentor, the AI-powered platform that helps students build amazing projects.

Team Details:
- Team Name: ${teamName}
- Invited By: ${inviterName}
${projectDetails ? `- Project: ${projectDetails}` : ''}

Join your team now: ${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard

Project Mentor - Your AI companion for hackathons and academic projects
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send welcome email to new user
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.name - User's name
 */
export const sendWelcomeEmail = async ({ to, name }) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Project Mentor <noreply@projectmentor.com>',
      to,
      subject: '🎉 Welcome to Project Mentor!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              margin: 0;
              padding: 40px 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              border-radius: 20px;
              overflow: hidden;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 40px 30px;
              text-align: center;
            }
            .header h1 {
              color: white;
              margin: 0;
              font-size: 32px;
              font-weight: 800;
            }
            .content {
              padding: 40px 30px;
            }
            .content h2 {
              color: #1e293b;
              font-size: 24px;
              margin: 0 0 20px;
            }
            .content p {
              color: #64748b;
              line-height: 1.8;
              margin: 0 0 20px;
              font-size: 16px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✨ Welcome to Project Mentor!</h1>
            </div>
            <div class="content">
              <h2>Hi ${name}! 👋</h2>
              <p>Welcome to Project Mentor! We're excited to have you on board.</p>
              <p>Get ready to build amazing projects with AI-powered guidance every step of the way!</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    return { success: false, error: error.message };
  }
};

export default transporter;

/**
 * Send email when a member is removed
 */
export const sendMemberRemovedEmail = async ({ to, teamName }) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Project Mentor <noreply@projectmentor.com>',
      to,
      subject: `⚠️ You have been removed from "${teamName}"`,
      html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2>Team Update</h2>
            <p>You have been removed from the team workspace <strong>${teamName}</strong>.</p>
            <p>If you believe this is a mistake, please contact the team leader.</p>
          </div>
        `
    };
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending removal email:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send email when a new leader is appointed
 */
export const sendNewLeaderEmail = async ({ to, teamName, newLeaderName }) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Project Mentor <noreply@projectmentor.com>',
      to,
      subject: `👑 New Team Leader for "${teamName}"`,
      html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2>Team Leadership Update</h2>
            <p><strong>${newLeaderName}</strong> is now the Team Leader of <strong>${teamName}</strong>.</p>
            <p>They now have administrative control over the workspace settings.</p>
          </div>
        `
    };
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending leader email:', error);
    return { success: false, error: error.message };
  }
};
