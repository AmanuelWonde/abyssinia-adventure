<?php
// server/place/postPlace.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Include database configuration
include_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Initialize database connection
    $database = new Database();
    $db = $database->getConnection();

    if ($db === null) {
        // Log the error and stop the execution
        error_log("Database connection failed.");
        die(json_encode(array("message" => "Database connection failed.")));
    } else {
        error_log("Database connection successful.");
    }

    $target_dir = "../public/place_images/";
    if (!is_dir($target_dir)) {
        mkdir($target_dir, 0777, true);
    }
    $uploadOk = 1;
    $messages = [];
    $imageFileType = '';
    $uploaded_files = [];

    if (isset($_FILES['images'])) {
        foreach ($_FILES['images']['name'] as $key => $name) {
            $target_file = $target_dir . basename($name);
            $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

            // Check if image file is an actual image or fake image
            $check = getimagesize($_FILES['images']['tmp_name'][$key]);
            if ($check === false) {
                $messages[] = "File $name is not an image.";
                $uploadOk = 0;
                continue;
            }

            // Check if file already exists
            if (file_exists($target_file)) {
                $messages[] = "Sorry, file $name already exists.";
                $uploadOk = 0;
                continue;
            }

            // Allow certain file formats
            if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
                $messages[] = "Sorry, only JPG, JPEG, PNG & GIF files are allowed for file $name.";
                $uploadOk = 0;
                continue;
            }

            // Check if $uploadOk is set to 0 by an error
            if ($uploadOk == 0) {
                $messages[] = "Sorry, file $name was not uploaded.";
            } else {
                if (move_uploaded_file($_FILES['images']['tmp_name'][$key], $target_file)) {
                    $messages[] = "The file $name has been uploaded to $target_file.";
                    $uploaded_files[] = $target_file;
                } else {
                    $messages[] = "Sorry, there was an error uploading your file $name.";
                }
            }
        }
    } else {
        $messages[] = "No files were uploaded.";
    }

    // Get form data
    $name = isset($_POST['name']) ? htmlspecialchars(strip_tags($_POST['name'])) : '';
    $description = isset($_POST['description']) ? htmlspecialchars(strip_tags($_POST['description'])) : '';
    $location = isset($_POST['location']) ? htmlspecialchars(strip_tags($_POST['location'])) : '';
    $city = isset($_POST['city']) ? htmlspecialchars(strip_tags($_POST['city'])) : '';
    $region = isset($_POST['region']) ? htmlspecialchars(strip_tags($_POST['region'])) : '';
    $category = isset($_POST['category']) ? htmlspecialchars(strip_tags($_POST['category'])) : '';

    // Insert place data into the database
    $query = "INSERT INTO Place (name, description, location, city, region, category) VALUES (:name, :description, :location, :city, :region, :category)";
    $stmt = $db->prepare($query);
    if ($stmt === false) {
        error_log("Failed to prepare statement: " . print_r($db->errorInfo(), true));
        die(json_encode(array("message" => "Failed to prepare statement.")));
    }

    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':location', $location);
    $stmt->bindParam(':city', $city);
    $stmt->bindParam(':region', $region);
    $stmt->bindParam(':category', $category);

    if ($stmt->execute()) {
        $place_id = $db->lastInsertId();

        // Insert images into the database
        foreach ($uploaded_files as $file) {
            $query = "INSERT INTO placeimages (image, place_id) VALUES (:image, :place_id)";
            $stmt = $db->prepare($query);
            if ($stmt === false) {
                error_log("Failed to prepare statement for images: " . print_r($db->errorInfo(), true));
                continue;
            }
            $stmt->bindParam(':image', $file);
            $stmt->bindParam(':place_id', $place_id);
            $stmt->execute();
        }

        $messages[] = "Place and images have been successfully saved.";
    } else {
        $messages[] = "Error saving place information.";
        error_log("Error executing statement: " . print_r($stmt->errorInfo(), true));
    }

    echo json_encode(array("messages" => $messages, "formData" => compact('name', 'description', 'location', 'city', 'region', 'category')));
} else {
    echo json_encode(array("message" => "No files or form data were uploaded."));
}
