<?php
header("Access-Control-Allow-Origin: *"); // Allow requests from any origin
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Include database configuration
include_once '../config/database.php';

// Initialize database connection
$database = new Database();
$db = $database->getConnection();

if ($db === null) {
    // Log the error and stop the execution
    error_log("Database connection failed.");
    die(json_encode(array("message" => "Database connection failed.")));
}

$query = "SELECT id, first_name, last_name, email, country, phone_number AS phone, profile_image, gender FROM user";

$stmt = $db->prepare($query);

if ($stmt === false) {
    error_log("Failed to prepare statement: " . print_r($db->errorInfo(), true));
    die(json_encode(array("message" => "Failed to prepare statement.")));
}

$stmt->execute();
$users = array();

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $users[] = $row;
}

echo json_encode(array("success" => true, "data" => $users));

$db = null;

