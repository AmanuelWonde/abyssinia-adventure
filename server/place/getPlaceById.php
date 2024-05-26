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

// Query to fetch the place with its images
$query = "
    SELECT p.id, p.name, p.description, p.location, p.city, p.region, pi.image
    FROM Place p
    LEFT JOIN PlaceImages pi ON p.id = pi.place_id
    WHERE p.id = :place_id
";
$stmt = $db->prepare($query);

if ($stmt === false) {
    error_log("Failed to prepare statement: " . print_r($db->errorInfo(), true));
    die(json_encode(array("message" => "Failed to prepare statement.")));
}

$stmt->bindParam(':place_id', $place_id, PDO::PARAM_INT);
$stmt->execute();

$place = null;

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    if ($place === null) {
        $place = array(
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
        $place['images'][] = $row['image'];
    }
}

if ($place !== null) {
    echo json_encode($place);
} else {
    echo json_encode(array("message" => "Place not found."));
}
