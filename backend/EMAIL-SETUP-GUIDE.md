# 📧 Email Setup Guide for Password Reset

This guide helps you configure Gmail to send password reset emails from your Capsort application.

## 🚀 Quick Setup

### Step 1: Enable 2-Factor Authentication

1. Go to https://myaccount.google.com/security
2. Sign in to your Gmail account
3. Find "2-Step Verification" and click "Get started"
4. Follow the setup process to enable 2FA

### Step 2: Generate App Password

1. Go back to https://myaccount.google.com/security
2. Find "App passwords" (you'll only see this after enabling 2FA)
3. Click "App passwords"
4. Select "Mail" from the dropdown
5. Click "Generate"
6. **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

### Step 3: Update .env File

Update your `CAPSORT_FRONT_BACK/backend/.env` file:

```env
# Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-actual-email@gmail.com"
SMTP_PASS="your-16-character-app-password"
SMTP_FROM="noreply@capsort.com"
```

**Replace:**
- `your-actual-email@gmail.com` with your Gmail address
- `your-16-character-app-password` with the app password from Step 2

### Step 4: Test Email Configuration

Run the test script to verify everything works:

```bash
cd CAPSORT_FRONT_BACK/backend
node scripts/test-email.js
```

This will:
- ✅ Check your email configuration
- ✅ Test SMTP connection
- ✅ Send a test email to your Gmail

## 🔧 Troubleshooting

### Issue 1: "Invalid login"
**Solution:** Make sure you're using the App Password, not your regular Gmail password.

### Issue 2: "App passwords not available"
**Solution:** Enable 2-Factor Authentication first, then App passwords will appear.

### Issue 3: "Connection timeout"
**Solution:** Check your internet connection and firewall settings.

### Issue 4: "Authentication failed"
**Solution:** 
1. Double-check your email address
2. Regenerate the App Password
3. Make sure there are no extra spaces in the .env file

## 🎯 How It Works

### Password Reset Flow:

1. **User clicks "Forgot Password?"** on login page
2. **User enters email** in the modal
3. **Backend generates secure token** (1-hour expiry)
4. **Email sent to user** with reset link
5. **User clicks link** in email
6. **User enters new password** on reset page
7. **Password updated** in database

### Email Template Features:

- ✅ Professional HTML design
- ✅ Capsort branding
- ✅ Security warnings
- ✅ 1-hour expiration notice
- ✅ Plain text fallback
- ✅ Mobile-friendly design

## 🛡️ Security Features

- ✅ **JWT tokens** with 1-hour expiration
- ✅ **Secure token storage** in database
- ✅ **Rate limiting** on reset requests
- ✅ **Generic responses** (doesn't reveal if email exists)
- ✅ **Admin protection** (admins can't reset via this method)
- ✅ **Token cleanup** after successful reset

## 📱 Production Deployment

For production (Render), add these environment variables in your Render dashboard:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@capsort.com
CLIENT_URL=https://your-frontend-url.vercel.app
```

## 🎉 Ready to Use!

Once configured, users can:
- Click "Forgot Password?" on the login page
- Enter their email address
- Receive a professional reset email
- Click the link to reset their password
- Login with their new password

The system is secure, user-friendly, and production-ready! 🔐✨