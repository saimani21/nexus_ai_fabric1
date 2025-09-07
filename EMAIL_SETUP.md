# Email Setup Instructions

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Email Configuration for Demo Requests
SMTP_USER=quantumcodeworks7@gmail.com
SMTP_PASS=your_gmail_app_password_here

# Alternative: Gmail App Password (recommended for production)
GMAIL_APP_PASSWORD=your_gmail_app_password_here
```

## Gmail App Password Setup

1. **Enable 2-Factor Authentication** on your Gmail account (quantumcodeworks7@gmail.com)
2. Go to **Google Account settings** > **Security** > **App passwords**
3. Generate a new app password for "Mail"
4. Use that password in the `SMTP_PASS` or `GMAIL_APP_PASSWORD` environment variable

## Installation

After setting up the environment variables, install the required dependencies:

```bash
npm install
```

## How It Works

When a user submits the demo form:
1. Form data is collected and validated
2. A POST request is sent to `/api/send-demo-request`
3. The API endpoint uses nodemailer to send an email to `quantumcodeworks7@gmail.com`
4. The email contains all form data in a nicely formatted HTML template
5. User receives success/error feedback

## Email Template

The email includes:
- Contact information (name, email, phone, company)
- Project description
- Submission timestamp
- Professional HTML formatting
