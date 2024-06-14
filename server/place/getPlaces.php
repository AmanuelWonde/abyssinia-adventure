<?php
// server/place/getAllPlaces.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
// header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

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

// Get the category from the URL
$category = isset($_GET['category']) ? $_GET['category'] : null;

if ($category === null) {
    die(json_encode(array("message" => "Category not specified.")));
}

// Query to fetch all places with their images based on category
$query = "
    SELECT p.id, p.name, p.description, p.location, p.city, p.region, pi.image
    FROM Place p
    LEFT JOIN PlaceImages pi ON p.id = pi.place_id
    WHERE p.category = :category
    ORDER BY p.id
";
$stmt = $db->prepare($query);

if ($stmt === false) {
    error_log("Failed to prepare statement: " . print_r($db->errorInfo(), true));
    die(json_encode(array("message" => "Failed to prepare statement.")));
}

$stmt->bindParam(':category', $category, PDO::PARAM_STR);
$stmt->execute();

$places = array();
$current_place_id = null;
$current_place = null;

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    if ($row['id'] !== $current_place_id) {
        if ($current_place !== null) {
            $places[] = $current_place;
        }
        $current_place_id = $row['id'];
        $current_place = array(
            "id" => $row['id'],
            "name" => $row['name'],
            "description" => $row['description'],
            "location" => $row['location'],
            "city" => $row['city'],
            "region" => $row['region'],
            "images" => array()
        );
    }
    if ($row['image'] !== null) {
        $current_place['images'][] = $row['image'];
    }
}

// Add the last place to the list
if ($current_place !== null) {
    $places[] = $current_place;
}

echo json_encode(array("places" => $places));
