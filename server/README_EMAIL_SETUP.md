# Email System Setup for Sidama Youth Commission

This document explains how to set up the email reply system for the admin panel.

## Prerequisites

1. **Composer** - PHP dependency manager

   - Download from: https://getcomposer.org/download/
   - Install globally on your system

2. **SMTP Credentials** (Already configured)
   - Email: syc@eltechsolutions-et.com
   - Password: syc@eltech
   - SMTP Server: mail.eltechsolutions-et.com
   - Port: 587
   - Security: STARTTLS

## Installation Steps

### 1. Install PHPMailer

Run the installation script:

```bash
cd server
php install_mailer.php
```

Or manually install:

```bash
cd server
composer install
```

### 2. Verify Installation

Check that the following files exist:

- `vendor/autoload.php`
- `vendor/phpmailer/phpmailer/`

### 3. Test Email System

The email system will be automatically used when:

- Admin replies to a message in the admin panel
- The reply is sent to the original message sender's email address

## How It Works

### Email Flow

1. User submits contact form → Message saved to database
2. Admin views message in admin panel
3. Admin clicks on message → Opens message detail page
4. Admin types reply and clicks "Send Reply"
5. System:
   - Updates message status to "replied"
   - Sends email to original sender
   - Shows success/error message

### Email Content

The sent email includes:

- Professional HTML template with Sidama Youth Commission branding
- Original message content
- Admin's reply
- Contact information
- Plain text fallback for email clients that don't support HTML

### Email Template Features

- Responsive design
- Brand colors (blue and orange gradient)
- Original message included for context
- Contact information footer
- Professional formatting

## Troubleshooting

### Common Issues

1. **Composer not found**

   - Install Composer globally
   - Ensure it's in your system PATH

2. **SMTP connection failed**

   - Verify SMTP credentials
   - Check server firewall settings
   - Ensure port 587 is open

3. **Email not sending**
   - Check error logs in PHP error log
   - Verify email address format
   - Test SMTP connection manually

### Error Logging

Email errors are logged to PHP error log. Check your server's error log for details.

## Security Notes

- SMTP credentials are stored in the Mailer class
- Emails are sent using STARTTLS encryption
- Input is sanitized to prevent email injection
- HTML content is properly escaped

## Maintenance

- Regularly update PHPMailer: `composer update phpmailer/phpmailer`
- Monitor email delivery rates
- Check SMTP credentials periodically
- Review error logs for issues

## Support

For technical support, contact the development team or check the error logs for specific issues.
