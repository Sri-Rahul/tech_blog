<?php
// Use environment variables or a configuration file for sensitive data
define('DB_HOST', 'localhost');
define('DB_NAME', 'tech_blog');
define('DB_USER', 'root');
define('DB_PASS', '');

// PDO Options
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

// Database Connection
try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
} catch (PDOException $e) {
    // Handle connection error
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Database connection failed.'
    ]);
    // Log the actual error message to server logs
    error_log("Database Connection Error: " . $e->getMessage());
    exit;
}
?>