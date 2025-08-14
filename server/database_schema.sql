-- Sidama Youth Commission Database Schema
-- This file documents the current database structure

-- Database: sidama_youth_db (or eltechev_sidamaYouthComission in production)

-- News Table
CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `author` varchar(100) DEFAULT 'Anonymous',
  `image_url` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_created_at` (`created_at`),
  KEY `idx_author` (`author`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Messages Table (for contact form)
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `status` enum('unread','read','replied') DEFAULT 'unread',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_status` (`status`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Notes on Multiple Images Support:
-- The `image_url` field in the news table can store multiple image URLs
-- Format: "url1.jpg,url2.jpg,url3.jpg" (comma-separated)
-- 
-- Example usage:
-- INSERT INTO news (title, content, author, image_url) VALUES 
-- ('News Title', 'News content...', 'Author Name', 'image1.jpg,image2.jpg,image3.jpg');
--
-- To retrieve and split multiple images:
-- $images = explode(',', $row['image_url']);
-- $images = array_map('trim', $images); // Remove whitespace
--
-- This approach allows for flexible image management without changing the database structure




