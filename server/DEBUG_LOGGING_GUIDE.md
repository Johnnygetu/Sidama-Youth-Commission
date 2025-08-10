# Debug Logging System Guide

This document explains the comprehensive debug logging system implemented for both client-side message sending and admin-side reply functionality.

## 📁 Log Files Location

All log files are stored in the `server/logs/` directory:

- `message_creation.log` - Client-side message submissions
- `reply_sending.log` - Admin-side reply sending

## 🔍 Client-Side Logging (Browser Console)

### Message Submission Logs

When a user submits a contact form, the following logs appear in the browser console:

```
🔄 Client: Starting message submission...
📝 Client: Form data: {name: "...", email: "...", subject: "...", messageLength: 123, timestamp: "..."}
🌐 Client: Sending POST request to createMessage.php
📡 Client: Response status: 200
📡 Client: Response headers: {...}
📄 Client: Response data: {success: true, message: "...", data: {...}}
✅ Client: Message sent successfully!
📊 Client: Message ID: 123
🏁 Client: Message submission completed
```

### Error Logs

If something goes wrong:

```
❌ Client: Message sending failed: [error message]
💥 Client: Network error occurred: [error details]
```

## 🖥️ Server-Side Logging (PHP Files)

### Message Creation Logs (`message_creation.log`)

#### Request Processing

```
[2025-08-10 12:00:00] 🔄 Server: Message creation endpoint accessed
[2025-08-10 12:00:00] 📡 Server: Request method | Data: "POST"
[2025-08-10 12:00:00] 📡 Server: Request headers | Data: {...}
```

#### Input Validation

```
[2025-08-10 12:00:00] 📝 Server: Processing message creation request
[2025-08-10 12:00:00] 📄 Server: Raw input received | Data: {...}
[2025-08-10 12:00:00] ✅ Server: JSON input parsed successfully
[2025-08-10 12:00:00] ✅ Server: All validations passed
```

#### Database Operations

```
[2025-08-10 12:00:00] 🔗 Server: Connecting to database
[2025-08-10 12:00:00] ✅ Server: Database connection established
[2025-08-10 12:00:00] 💾 Server: Inserting message into database
[2025-08-10 12:00:00] ✅ Server: Message inserted successfully | Data: {"id": 123}
```

#### Response

```
[2025-08-10 12:00:00] 📤 Server: Sending success response | Data: {...}
```

### Reply Sending Logs (`reply_sending.log`)

#### Request Processing

```
[2025-08-10 12:00:00] 🔄 Server: Reply sending endpoint accessed
[2025-08-10 12:00:00] 📡 Server: Request method | Data: "PUT"
[2025-08-10 12:00:00] 📝 Server: Processing reply request
[2025-08-10 12:00:00] 📄 Server: Raw input received | Data: {...}
[2025-08-10 12:00:00] ✅ Server: Input validation passed
```

#### Database Operations

```
[2025-08-10 12:00:00] 🔗 Server: Connecting to database
[2025-08-10 12:00:00] ✅ Server: Database connection established
[2025-08-10 12:00:00] 🔍 Server: Fetching message details | Data: {"id": 123}
[2025-08-10 12:00:00] ✅ Server: Message found | Data: {...}
[2025-08-10 12:00:00] 🔄 Server: Updating message status to 'replied'
[2025-08-10 12:00:00] ✅ Server: Message status updated successfully
[2025-08-10 12:00:00] 🗑️ Server: Deleting message from database after successful reply
[2025-08-10 12:00:00] ✅ Server: Message deleted successfully from database
```

#### Email Sending

```
[2025-08-10 12:00:00] 📧 Server: Starting email sending process
[2025-08-10 12:00:00] 📦 Server: Loading mailer class
[2025-08-10 12:00:00] ✅ Server: Mailer class loaded successfully
[2025-08-10 12:00:00] 📤 Server: Sending email | Data: {...}
[2025-08-10 12:00:00] 📊 Server: Email sending result | Data: {"success": true, ...}
```

#### Mailer Class Logs

```
[2025-08-10 12:00:00] MAILER: 📧 Mailer: Starting email composition
[2025-08-10 12:00:00] MAILER: 👤 Mailer: Recipient added | Data: {...}
[2025-08-10 12:00:00] MAILER: 📋 Mailer: Subject set | Data: {...}
[2025-08-10 12:00:00] MAILER: 📝 Mailer: Email body composed | Data: {"htmlLength": 1234}
[2025-08-10 12:00:00] MAILER: 📤 Mailer: Attempting to send email
[2025-08-10 12:00:00] MAILER: ✅ Mailer: Email sent successfully
```

## 🚨 Error Logging

### Validation Errors

```
[2025-08-10 12:00:00] ❌ Server: Name validation failed | Data: {"name": "empty"}
[2025-08-10 12:00:00] ❌ Server: Email validation failed | Data: {"email": "invalid"}
[2025-08-10 12:00:00] ❌ Server: Subject validation failed | Data: {"subject": "empty"}
[2025-08-10 12:00:00] ❌ Server: Message validation failed | Data: {"messageLength": 5}
```

### Database Errors

```
[2025-08-10 12:00:00] ❌ Server: Message not found | Data: {"id": 999}
[2025-08-10 12:00:00] 💥 Server: Exception occurred | Data: {"error": "...", "trace": "..."}
```

### Email Errors

```
[2025-08-10 12:00:00] 💥 Server: Email sending exception | Data: {"error": "...", "trace": "..."}
[2025-08-10 12:00:00] MAILER: 💥 Mailer: Exception occurred | Data: {"error": "...", "trace": "..."}
```

## 🔧 How to Use the Logs

### 1. Monitor Real-Time Logs

```bash
# Watch message creation logs
tail -f server/logs/message_creation.log

# Watch reply sending logs
tail -f server/logs/reply_sending.log
```

### 2. Search for Specific Issues

```bash
# Find all errors
grep "❌\|💥" server/logs/message_creation.log

# Find successful operations
grep "✅" server/logs/reply_sending.log

# Find specific message ID
grep "id.*123" server/logs/message_creation.log
```

### 3. Debug Email Issues

```bash
# Check email sending attempts
grep "MAILER" server/logs/reply_sending.log

# Find email failures
grep "💥.*Mailer" server/logs/reply_sending.log
```

## 📊 Log Analysis

### Common Log Patterns

#### Successful Message Flow

1. Client submits form → Console logs show request
2. Server receives request → `message_creation.log` shows processing
3. Database insertion → Log shows success with ID
4. Response sent → Client console shows success

#### Successful Reply Flow

1. Admin sends reply → Console logs show request
2. Server processes reply → `reply_sending.log` shows validation
3. Database update → Log shows status change
4. Email sending → Mailer logs show SMTP process
5. Message deletion → Log shows successful deletion
6. Success response → Admin console shows success and redirects

#### Error Patterns

- **Validation Errors**: Check input data in logs
- **Database Errors**: Check connection and query logs
- **Email Errors**: Check SMTP configuration and mailer logs
- **Network Errors**: Check client console for connection issues

## 🛠️ Troubleshooting

### If Messages Aren't Being Sent

1. Check browser console for client-side errors
2. Check `message_creation.log` for server-side errors
3. Verify database connection and table structure

### If Replies Aren't Being Sent

1. Check admin console for client-side errors
2. Check `reply_sending.log` for server-side errors
3. Check mailer logs for SMTP issues
4. Verify email credentials and server settings

### If Logs Are Empty

1. Ensure log directory exists: `mkdir -p server/logs`
2. Check file permissions: `chmod 755 server/logs`
3. Verify PHP error logging is enabled

## 📝 Log Maintenance

### Log Rotation

Consider implementing log rotation to prevent large log files:

```bash
# Example: Keep last 7 days of logs
find server/logs/ -name "*.log" -mtime +7 -delete
```

### Log Cleanup

```bash
# Clear all logs (use with caution)
rm server/logs/*.log
```

## 🔒 Security Notes

- Logs may contain sensitive information (email addresses, message content)
- Ensure log files are not publicly accessible
- Consider implementing log encryption for production environments
- Regularly review and clean up old logs

## 📞 Support

When reporting issues, please include:

1. Relevant log entries from both client and server
2. Timestamp of the issue
3. Steps to reproduce
4. Expected vs actual behavior
