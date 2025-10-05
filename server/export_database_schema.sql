-- Sidama Youth Commission Database Schema
-- This file contains the complete database structure for local setup

-- Create database
CREATE DATABASE IF NOT EXISTS `sidama_youth_commission` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `sidama_youth_commission`;

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS `contact_messages` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `subject` varchar(500) DEFAULT NULL,
    `message` text NOT NULL,
    `status` enum('unread','read','replied') DEFAULT 'unread',
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `status` (`status`),
    KEY `created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- News Table
CREATE TABLE IF NOT EXISTS `news` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `title` varchar(500) NOT NULL,
    `content` longtext NOT NULL,
    `author` varchar(255) DEFAULT NULL,
    `image_url` varchar(1000) DEFAULT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample Data
INSERT INTO `news` (`title`, `content`, `author`, `image_url`) VALUES
('Welcome to Sidama Youth Commission', 'We are excited to announce the launch of our new website. The Sidama Youth Commission is committed to empowering young people and building a better future for our community.', 'Admin', NULL),
('Youth Development Programs', 'Our youth development programs are designed to provide skills training, education, and opportunities for young people in the Sidama region. Join us in building a brighter future.', 'Admin', NULL);

INSERT INTO `contact_messages` (`name`, `email`, `subject`, `message`, `status`) VALUES
('Test User', 'test@example.com', 'Test Message', 'This is a test message to verify the contact form is working properly.', 'unread');




















