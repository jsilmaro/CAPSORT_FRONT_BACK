const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  initializeTransporter() {
    // Gmail configuration
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS // Use App Password, not regular password
      }
    });

    // Alternative configuration for other SMTP providers
    // this.transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST || 'smtp.gmail.com',
    //   port: process.env.SMTP_PORT || 587,
    //   secure: false, // true for 465, false for other ports
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS
    //   }
    // });
  }

  async sendPasswordResetEmail(email, resetLink, userName = 'User') {
    try {
      const mailOptions = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: email,
        subject: 'Capsort - Password Reset Request',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset - Capsort</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #1a1851; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
              .button { display: inline-block; background-color: #1a1851; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
              .button:hover { background-color: #2a2861; }
              .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
              .warning { background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 15px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Capsort</h1>
                <p>Capstone Archiving and Sorting System</p>
              </div>
              <div class="content">
                <h2>Password Reset Request</h2>
                <p>Hello ${userName},</p>
                <p>We received a request to reset your password for your Capsort account. If you made this request, click the button below to reset your password:</p>
                
                <div style="text-align: center;">
                  <a href="${resetLink}" class="button">Reset My Password</a>
                </div>
                
                <p>Or copy and paste this link into your browser:</p>
                <p style="word-break: break-all; background-color: #e9ecef; padding: 10px; border-radius: 4px; font-family: monospace;">
                  ${resetLink}
                </p>
                
                <div class="warning">
                  <strong>Important:</strong>
                  <ul>
                    <li>This link will expire in 1 hour for security reasons</li>
                    <li>If you didn't request this password reset, please ignore this email</li>
                    <li>Your password will remain unchanged until you create a new one</li>
                  </ul>
                </div>
                
                <p>If you're having trouble with the button above, copy and paste the URL into your web browser.</p>
                
                <p>Best regards,<br>The Capsort Team</p>
              </div>
              <div class="footer">
                <p>This is an automated message from Capsort. Please do not reply to this email.</p>
                <p>If you need help, please contact your system administrator.</p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
          Capsort - Password Reset Request
          
          Hello ${userName},
          
          We received a request to reset your password for your Capsort account.
          
          If you made this request, click the link below to reset your password:
          ${resetLink}
          
          This link will expire in 1 hour for security reasons.
          
          If you didn't request this password reset, please ignore this email.
          Your password will remain unchanged until you create a new one.
          
          Best regards,
          The Capsort Team
          
          ---
          This is an automated message from Capsort. Please do not reply to this email.
        `
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Password reset email sent:', info.messageId);
      return { success: true, messageId: info.messageId };

    } catch (error) {
      console.error('Email sending error:', error);
      return { success: false, error: error.message };
    }
  }

  async testConnection() {
    try {
      await this.transporter.verify();
      console.log('SMTP connection verified successfully');
      return { success: true };
    } catch (error) {
      console.error('SMTP connection failed:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new EmailService();