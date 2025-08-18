# 📧 NestJS Mailer Setup Guide

## 🚀 **Overview**
This project includes a complete email system using NestJS Mailer with Gmail SMTP and Handlebars templates.

## 📋 **Features**
- ✅ Welcome emails for new users
- ✅ Email verification system
- ✅ Custom email templates
- ✅ Gmail SMTP integration
- ✅ Handlebars template engine
- ✅ Health check endpoint

## 🔧 **Setup Instructions**

### **1. Gmail App Password Setup**
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification**
3. Enable 2-Step Verification if not already enabled
4. Go to **Security** → **App passwords**
5. Generate a new app password for "Mail"
6. Copy the generated password

### **2. Environment Variables**
Create a `.env` file in your project root:
```env
# Gmail SMTP Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-digit-app-password

# App Configuration
PORT=3333
NODE_ENV=development
```

### **3. Update Mailer Configuration**
Edit `src/mailer/mailer.config.ts`:
```typescript
export const mailerConfig = {
  transport: {
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
      user: process.env.GMAIL_USER || 'your-email@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD || 'your-app-password',
    },
  },
  // ... rest of config
};
```

## 📧 **Available Endpoints**

### **Health Check**
```bash
GET /mailer/health
```

### **Test Email**
```bash
POST /mailer/test
```

### **Welcome Email**
```bash
POST /mailer/welcome
{
  "to": "user@example.com",
  "name": "John Doe",
  "username": "johndoe",
  "email": "user@example.com"
}
```

### **Verification Email**
```bash
POST /mailer/verification
{
  "to": "user@example.com",
  "name": "John Doe",
  "email": "user@example.com",
  "verificationCode": "123456"
}
```

### **Custom Email**
```bash
POST /mailer/custom
{
  "to": "user@example.com",
  "subject": "Custom Subject",
  "template": "template-name",
  "context": {
    "key": "value"
  }
}
```

## 🎨 **Email Templates**

### **Welcome Template** (`welcome.hbs`)
- Beautiful welcome email for new users
- Includes user's name, username, and login link
- Responsive design with CSS styling

### **Verification Template** (`verification.hbs`)
- Email verification with code display
- Verification button and link
- Expiration warning

## 🔄 **Integration with Admin System**
- Automatically sends welcome emails when creating new admins
- Uses the `isVerified` field for email verification status
- Integrated with the existing admin creation flow

## 🧪 **Testing**
1. Start your application: `npm run start:dev`
2. Test the health endpoint: `GET /mailer/health`
3. Send a test email: `POST /mailer/test`
4. Create a new admin to test welcome email: `POST /admin/create`

## ⚠️ **Important Notes**
- **Never commit your `.env` file** to version control
- **Use App Passwords**, not your regular Gmail password
- **Test emails** will be sent to `test@example.com` (update in code for production)
- **Templates** are located in `src/mailer/templates/`

## 🐛 **Troubleshooting**
- **Authentication failed**: Check your Gmail app password
- **Templates not found**: Ensure templates directory exists
- **Connection refused**: Check if Gmail SMTP is accessible
- **Rate limiting**: Gmail has daily sending limits

## 📚 **Dependencies**
- `@nestjs-modules/mailer`: NestJS mailer integration
- `nodemailer`: Email sending library
- `handlebars`: Template engine
- `@types/nodemailer`: TypeScript types

## 🎯 **Next Steps**
1. Customize email templates
2. Add more email types (password reset, notifications)
3. Implement email queue system for production
4. Add email tracking and analytics 