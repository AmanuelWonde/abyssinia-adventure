<?php
session_start(); // Start the session

header("Access-Control-Allow-Origin: *"); // Allow requests from any origin
header("Access-Control-Allow-Methods: POST");
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

    // Retrieve and sanitize input data
    $username = test_input($data['username']);
    $password = test_input($data['password']);

    // Prepare SQL statement to fetch the user
    $stmt = $conn->prepare("SELECT id, password FROM user WHERE email = ?");
    if ($stmt === false) {
        error_log("Failed to prepare statement: " . print_r($conn->errorInfo(), true));
        die(json_encode(array("message" => "Failed to prepare statement.")));
    }

    // Execute the statement
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        // Verify the password
        if (password_verify($password, $user['password'])) {
            // Set session variables
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $username;

            // Check if "Remember Me" is set
            if (isset($data['remember_me']) && $data['remember_me'] == true) {
                // Set cookie to expire in 30 days
                setcookie('user_id', $user['id'], time() + (30 * 24 * 60 * 60), "/");
                setcookie('username', $username, time() + (30 * 24 * 60 * 60), "/");
            }


            $response = array('success' => true, 'message' => "Login Successful", 'user_id' => $user['id']);
            echo json_encode($response);
        } else {
            $response = array('success' => false, 'message' => "Invalid password.");
            echo json_encode($response);
        }
    } else {
        $response = array('success' => false, 'message' => "User not found.");
        echo json_encode($response);
    }

    // Close the connection
    $conn = null;
} else {
    // If the request method is not POST, return an error message
    echo json_encode(array("message" => "Invalid request method."));
}
