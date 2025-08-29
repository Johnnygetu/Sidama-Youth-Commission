<?php
// Installation script for PHPMailer
echo "Setting up PHPMailer...\n";

// Check if composer is available
if (!file_exists('composer.json')) {
    echo "Error: composer.json not found!\n";
    exit(1);
}

// Try to install dependencies
echo "Installing PHPMailer via Composer...\n";
$output = shell_exec('composer install 2>&1');

if ($output === null) {
    echo "Error: Composer command failed. Please install Composer first.\n";
    echo "You can download Composer from: https://getcomposer.org/download/\n";
    exit(1);
}

echo $output;

if (file_exists('vendor/autoload.php')) {
    echo "PHPMailer installed successfully!\n";
    echo "You can now delete this install script.\n";
} else {
    echo "Error: Installation failed. Please check the output above.\n";
    exit(1);
}
