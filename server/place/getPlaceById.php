<?php
// server/place/getPlaceById.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

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

// Get the place ID from the request
$place_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($place_id <= 0) {
    die(json_encode(array("message" => "Invalid place ID.")));
}

// Query to fetch the place details
$query = "
    SELECT id, name, description, location, city, region
    FROM Place
    WHERE id = :place_id
";
$stmt = $db->prepare($query);

if ($stmt === false) {
    error_log("Failed to prepare statement: " . print_r($db->errorInfo(), true));
    die(json_encode(array("message" => "Failed to prepare statement.")));
}

$stmt->bindParam(':place_id', $place_id, PDO::PARAM_INT);
$stmt->execute();

$place = $stmt->fetch(PDO::FETCH_ASSOC);

if ($place === false) {
    echo json_encode(array("message" => "Place not found."));
    exit;
}

// Initialize the images array
$place['images'] = array();

// Query to fetch the images for the place
$image_query = "
    SELECT image
    FROM PlaceImages
    WHERE place_id = :place_id
";
$image_stmt = $db->prepare($image_query);

if ($image_stmt === false) {
    error_log("Failed to prepare image statement: " . print_r($db->errorInfo(), true));
    die(json_encode(array("message" => "Failed to prepare image statement.")));
}

$image_stmt->bindParam(':place_id', $place_id, PDO::PARAM_INT);
$image_stmt->execute();

while ($image_row = $image_stmt->fetch(PDO::FETCH_ASSOC)) {
    if ($image_row['image'] !== null) {
        $place['images'][] = $image_row['image'];
    }
}

echo json_encode($place);
