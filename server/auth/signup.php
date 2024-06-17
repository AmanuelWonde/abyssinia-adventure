<?php
session_start(); // Start the session

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

// Validation function
function validate_data($firstName, $lastName, $email, $country, $phone, $profileImage, $gender, $password)
{
    $errors = array();

    // Validate first name and last name (letters only, between 2 and 50 characters)
    if (!preg_match("/^[a-zA-Z ]{2,50}$/", $firstName)) {
        $errors[] = "Invalid first name.";
    }
    if (!preg_match("/^[a-zA-Z ]{2,50}$/", $lastName)) {
        $errors[] = "Invalid last name.";
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    }

    // Validate country (letters only, between 2 and 50 characters)
    if (!preg_match("/^[a-zA-Z ]{2,50}$/", $country)) {
        $errors[] = "Invalid country.";
    }

    // Validate phone number (digits only, between 10 and 15 characters)
    if (!preg_match("/^[0-9]{10,15}$/", $phone)) {
        $errors[] = "Invalid phone number.";
    }

    // Validate profile image URL (optional, but if present should be a valid URL)
    if (!empty($profileImage) && !filter_var($profileImage, FILTER_VALIDATE_URL)) {
        $errors[] = "Invalid profile image URL.";
    }

    // Validate gender (should be either 'Male', 'Female', or 'Other')
    if (!in_array($gender, ['M', 'F'])) {
        $errors[] = "Invalid gender.";
    }

    // Validate password (at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number)
    if (!preg_match("/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/", $password)) {
        $errors[] = "Invalid password.";
    }

    return $errors;
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
    $country = test_input($data['country']);
    $phone = test_input($data['phone']);
    $profileImage = test_input($data['profile_image']);
    $gender = test_input($data['gender']);
    $password = test_input($data['password']);

    // Validate the input data
    $validation_errors = validate_data($firstName, $lastName, $email, $country, $phone, $profileImage, $gender, $password);

    if (!empty($validation_errors)) {
        die(json_encode(array("success" => false, "message" => "Validation errors.", "errors" => $validation_errors)));
    }

    // Hash the password before storing it
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Prepare SQL statement using PDO
    $stmt = $conn->prepare("INSERT INTO user (first_name, last_name, email, country, phone_number, profile_image, gender, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    if ($stmt === false) {
        error_log("Failed to prepare statement: " . print_r($conn->errorInfo(), true));
        die(json_encode(array("message" => "Failed to prepare statement.")));
    }

    // Bind parameters using PDO
    $execute = $stmt->execute([$firstName, $lastName, $email, $country, $phone, $profileImage, $gender, $hashed_password]);
    if ($execute) {
        // Set session variables
        $_SESSION['user_id'] = $conn->lastInsertId();
        $_SESSION['username'] = $email;

        // Check if "Remember Me" is set and set cookies accordingly
        if (isset($data['remember_me']) && $data['remember_me'] == true) {
            // Set cookies to expire in 30 days
            setcookie('user_id', $_SESSION['user_id'], time() + (30 * 24 * 60 * 60), "/");
            setcookie('username', $email, time() + (30 * 24 * 60 * 60), "/");
        }

        // Send a welcome email
        sendWelcomeEmail($email, $firstName);

        $response = array('success' => true, 'message' => "User Created Successfully", 'session' => $_SESSION);
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

// Function to send a welcome email using mail() function with TLS
function sendWelcomeEmail($to, $firstName) {
    // Set SMTP configuration dynamically
    ini_set('SMTP', 'smtp.gmail.com');
    ini_set('smtp_port', 587);
    ini_set('sendmail_from', 'ammarmyp@gmail.com');
    
    // Construct the email headers
    $headers = "From: ammarmyp@gmail.com\r\n";
    $headers .= "Reply-To: ammarmyp@gmail.com\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "X-Originating-IP: " . $_SERVER['SERVER_ADDR'] . "\r\n";

    // Compose the email content
    $subject = 'Welcome to Our Service';
    $message = "Dear $firstName,<br><br>Welcome to our service! We are glad to have you with us.<br><br>Best regards,<br>Your Company";

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        error_log("Welcome email sent to $to.");
    } else {
        error_log("Failed to send welcome email to $to.");
    }
}

