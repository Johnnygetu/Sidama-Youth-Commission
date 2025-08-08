# Sidama Youth Commission - PHP Backend

A vanilla PHP backend API for the Sidama Youth Commission website.

## Features

- RESTful API endpoints
- MySQL database integration with PDO
- CORS support for frontend integration
- Input validation and error handling
- Security headers and .htaccess configuration
- Modular controller structure

## Requirements

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Apache/Nginx web server
- mod_rewrite enabled (for Apache)

## Installation

1. **Clone the repository** (if not already done)

   ```bash
   git clone <repository-url>
   cd Sidama-Youth-Commission/server
   ```

2. **Configure the database**

   - Create a MySQL database
   - Import the schema: `mysql -u root -p < database/schema.sql`
   - Update database credentials in `config/config.php`

3. **Set up the web server**

   - Point your web server to the `server` directory
   - Ensure mod_rewrite is enabled (for Apache)
   - Make sure PHP has write permissions for uploads (if needed)

4. **Test the installation**
   - Visit `http://your-domain/` to see the API welcome message
   - Visit `http://your-domain/health` for health check

## API Endpoints

### Base URL

```
http://your-domain/
```

### Available Endpoints

#### General

- `GET /` - API information and available endpoints
- `GET /health` - Health check

#### News Management

- `GET /news` - Get all news articles
- `POST /news` - Create a new news article
- `GET /news/{id}` - Get a specific news article
- `PUT /news/{id}` - Update a news article
- `DELETE /news/{id}` - Delete a news article

### Request/Response Format

All requests and responses use JSON format.

#### Example News Creation (POST /news)

```json
{
  "title": "New Youth Program Launched",
  "content": "We are excited to announce our new youth empowerment program...",
  "author": "Youth Coordinator",
  "image_url": "https://example.com/image.jpg"
}
```

#### Example Response

```json
{
  "success": true,
  "message": "News created successfully",
  "data": {
    "id": 1,
    "title": "New Youth Program Launched",
    "content": "We are excited to announce...",
    "author": "Youth Coordinator",
    "image_url": "https://example.com/image.jpg",
    "created_at": "2024-01-15 10:30:00"
  },
  "timestamp": "2024-01-15 10:30:00"
}
```

## File Structure

```
server/
├── config/
│   ├── config.php          # Application configuration
│   └── database.php        # Database connection class
├── controllers/
│   └── NewsController.php  # News management controller
├── utils/
│   └── Response.php        # Standardized response utility
├── database/
│   └── schema.sql          # Database schema and sample data
├── uploads/                # File upload directory (create if needed)
├── .htaccess              # Apache configuration
├── index.php              # Main entry point
└── README.md              # This file
```

## Configuration

### Database Configuration

Edit `config/config.php` to update database settings:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'sidama_youth_db');
define('DB_USER', 'your_username');
define('DB_PASS', 'your_password');
```

### Environment Settings

- Set `APP_ENV` to `production` for production deployment
- Update `JWT_SECRET` for security
- Configure file upload settings as needed

## Security Features

- CORS headers for cross-origin requests
- Input validation and sanitization
- SQL injection prevention with prepared statements
- Security headers (XSS protection, content type options)
- File access restrictions via .htaccess

## Development

### Adding New Controllers

1. Create a new controller file in `controllers/`
2. Extend the base functionality as needed
3. Add routes to `index.php`
4. Update the API documentation

### Database Operations

Use the Database class for all database operations:

```php
$db = Database::getInstance();
$results = $db->fetchAll("SELECT * FROM table_name");
```

### Response Formatting

Use the Response utility for consistent API responses:

```php
Response::success($data, 'Operation successful');
Response::error('Error message', 400);
```

## Troubleshooting

### Common Issues

1. **500 Internal Server Error**

   - Check PHP error logs
   - Verify database connection
   - Ensure all required files exist

2. **404 Not Found**

   - Verify .htaccess is working
   - Check mod_rewrite is enabled
   - Ensure proper file permissions

3. **Database Connection Issues**
   - Verify database credentials
   - Check MySQL service is running
   - Ensure database exists

### Debug Mode

For development, error reporting is enabled by default. For production, set `APP_ENV` to `production` in `config/config.php`.

## License

This project is part of the Sidama Youth Commission website.

## Support

For issues and questions, please contact the development team.
