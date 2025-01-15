<?php
header('Content-Type: application/json');
require_once '../includes/config.php';

// Get parameters
$action = isset($_GET['action']) ? $_GET['action'] : '';
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 6;
$search = isset($_GET['search']) ? trim($_GET['search']) : '';
$offset = ($page - 1) * $limit;

try {
    if ($action === 'highlighted') {
        $query = "SELECT title, author, description, image, created_at 
                  FROM articles 
                  WHERE highlighted = 1
                  ORDER BY created_at DESC 
                  LIMIT 5";
        $stmt = $pdo->prepare($query);
    } elseif (!empty($search)) {
        $query = "SELECT title, author, description, image, created_at 
                  FROM articles 
                  WHERE title LIKE :search OR description LIKE :search 
                  ORDER BY created_at DESC 
                  LIMIT :limit OFFSET :offset";
        $stmt = $pdo->prepare($query);
        $searchTerm = "%" . $search . "%";
        $stmt->bindValue(':search', $searchTerm, PDO::PARAM_STR);
        $stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', (int)$offset, PDO::PARAM_INT);
    } else {
        $query = "SELECT title, author, description, image, created_at 
                  FROM articles 
                  ORDER BY created_at DESC 
                  LIMIT :limit OFFSET :offset";
        $stmt = $pdo->prepare($query);
        $stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', (int)$offset, PDO::PARAM_INT);
    }

    $stmt->execute();
    $articles = $stmt->fetchAll();

    echo json_encode([
        'success' => true,
        'data' => $articles
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'An error occurred while fetching articles.'
    ]);
    // Log the error message to the server logs for debugging
    error_log("Articles Fetch Error: " . $e->getMessage());
}
?>