-- Sidama Youth Commission Database Schema
-- Create database if not exists
CREATE DATABASE IF NOT EXISTS sidama_youth_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sidama_youth_db;

-- News table
CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100) DEFAULT 'Anonymous',
    image_url VARCHAR(500) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_created_at (created_at),
    INDEX idx_author (author)
);

-- Users table (for future admin functionality)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'editor', 'viewer') DEFAULT 'viewer',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_username (username)
);

-- Programs table (for youth programs)
CREATE TABLE IF NOT EXISTS programs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    start_date DATE NULL,
    end_date DATE NULL,
    location VARCHAR(255) NULL,
    max_participants INT NULL,
    current_participants INT DEFAULT 0,
    status ENUM('active', 'inactive', 'completed', 'upcoming') DEFAULT 'active',
    image_url VARCHAR(500) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_status (status),
    INDEX idx_dates (start_date, end_date)
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    event_date DATETIME NOT NULL,
    location VARCHAR(255) NULL,
    organizer VARCHAR(100) NOT NULL,
    max_attendees INT NULL,
    current_attendees INT DEFAULT 0,
    status ENUM('upcoming', 'ongoing', 'completed', 'cancelled') DEFAULT 'upcoming',
    image_url VARCHAR(500) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_event_date (event_date),
    INDEX idx_status (status),
    INDEX idx_organizer (organizer)
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('unread', 'read', 'replied', 'archived') DEFAULT 'unread',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    INDEX idx_email (email)
);

-- Insert sample data
INSERT INTO news (title, content, author, image_url) VALUES
('Sidama Youth Commission Launches New Initiative', 'The Sidama Youth Commission is proud to announce the launch of our new youth empowerment initiative...', 'Admin', NULL),
('Community Workshop on Leadership Skills', 'Join us for an interactive workshop focused on developing leadership skills among young people...', 'Youth Coordinator', NULL),
('Annual Youth Conference 2024', 'Mark your calendars for our annual youth conference featuring inspiring speakers and networking opportunities...', 'Event Manager', NULL);

INSERT INTO programs (name, description, category, start_date, end_date, location, max_participants, status) VALUES
('Youth Leadership Training', 'Comprehensive leadership development program for young people', 'Leadership', '2024-01-15', '2024-03-15', 'Hawassa', 50, 'active'),
('Digital Skills Workshop', 'Learn essential digital skills for the modern workplace', 'Technology', '2024-02-01', '2024-02-28', 'Online', 100, 'upcoming'),
('Community Service Program', 'Engage in meaningful community service activities', 'Community', '2024-01-01', '2024-12-31', 'Various Locations', 200, 'active');

INSERT INTO events (title, description, event_date, location, organizer, max_attendees, status) VALUES
('Youth Empowerment Summit', 'A day-long summit focused on empowering young people', '2024-03-15 09:00:00', 'Hawassa Convention Center', 'Sidama Youth Commission', 300, 'upcoming'),
('Career Fair 2024', 'Connect with potential employers and explore career opportunities', '2024-04-20 10:00:00', 'Hawassa University', 'Career Development Team', 500, 'upcoming'),
('Cultural Festival', 'Celebrate Sidama culture through music, dance, and traditional activities', '2024-05-10 14:00:00', 'City Park', 'Cultural Committee', 1000, 'upcoming'); 