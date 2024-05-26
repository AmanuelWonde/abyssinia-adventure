<?php
header("Access-Control-Allow-Origin: *"); // Allow requests from any origin
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, X-Requested-With, Content-Type, Accept");

// Include database connection
include_once(__DIR__ . '/../config/database.php');

// Retrieve data from the POST request
$data = json_decode(file_get_contents('php://input'), true);

function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Check the request method
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Initialize database connection
    $database = new Database();
    $conn = $database->getConnection();

    if ($conn === null) {
        // Log the error and stop the execution
        error_log("Database connection failed.");
        die(json_encode(array("message" => "Database connection failed.")));
    }

    // Perform validation and user creation logic here
    $firstName = test_input($data['first_name']);
    $lastName = test_input($data['last_name']);
    $email = test_input($data['email']);
    $country = test_input($data['country']); // Convert country array to a string if necessary
    $phone = test_input($data['phone']);
    $profileImage = test_input($data['profile_image']);
    $gender = test_input($data['gender']);

    // Prepare SQL statement using PDO
    $stmt = $conn->prepare("INSERT INTO user (first_name, last_name, email, country, phone_number, profile_image, gender) VALUES (?, ?, ?, ?, ?, ?, ?)");
    if ($stmt === false) {
        error_log("Failed to prepare statement: " . print_r($conn->errorInfo(), true));
        die(json_encode(array("message" => "Failed to prepare statement.")));
    }

    // Bind parameters using PDO
    $execute = $stmt->execute([$firstName, $lastName, $email, $country, $phone, $profileImage, $gender]);
    if ($execute) {
        $response = array('success' => true, 'message' => "User Created Successfully");
        echo json_encode($response);
    } else {
        error_log("Failed to execute statement: " . print_r($stmt->errorInfo(), true));
        $response = array('success' => false, 'message' => 'Error has occurred. Cannot create User.');
        echo json_encode($response);
    }

    // Close the connection
    $conn = null;
} else {
    // If the request method is not POST, return an error message
    echo json_encode(array("message" => "Invalid request method."));
}
