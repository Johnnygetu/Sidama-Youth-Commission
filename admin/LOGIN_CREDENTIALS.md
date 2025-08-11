# Admin Panel Login Credentials

## Default Login Information

**Username:** `administrator`  
**Password:** `Apanelp.12345`

## Security Notes

⚠️ **Important:** These are demo credentials for development purposes. In production, you should:

1. Change the default password immediately
2. Use a strong, unique password
3. Implement proper password hashing
4. Consider adding two-factor authentication
5. Use environment variables for sensitive data

## How to Change Credentials

To change the login credentials, edit the `src/context/AuthContext.jsx` file and update the hardcoded values in the `login` function.

For production use, consider implementing:
- Database-based user authentication
- JWT tokens with proper expiration
- Password reset functionality
- Account lockout after failed attempts

## Access

- **Login URL:** `/login`
- **Default redirect after login:** `/messages`
- **All admin routes are protected** and require authentication
