<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Origin: *'); // Allow requests from your frontend origin
header("Access-Control-Allow-Methods:GET, POST, PUT, DELETE, OPTIONS");
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, X-Requested-With, Content-Type, Accept');


include_once(__DIR__ . '/../Database/dbConnection.php'); // Include database connection

// Retrieve data from the POST request
$data = json_decode(file_get_contents('php://input'), true);


if($_SERVER["REQUEST_METHOD"] == "POST") {
    http_response_code(200);
    header('Access-Control-Max-Age: Access-Control-Allow-Headers');

}

function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// process form data


if($_SERVER["REQUEST_METHOD"] == "POST") {

    // http_response_code(200);

    // Perform validation and user creation logic here
    $firstName =test_input( $data['first_name']);
    $lastName = test_input($data['last_name']);
    $email = test_input($data['email']);
    $country =  test_input($data['country']); // Convert country array to a string
    $phone = test_input($data['phone']);
    $profileImage = test_input($data['profile_image']);
    $gender = test_input($data['gender']);


// Insert data into the database using prepared statements
$stmt = $conn->prepare("INSERT INTO user (first_name, last_name, email, country, phone, profile_image, gender) VALUES ('$firstName', '$lastName', '$email', '$country', '$phone', '$profileImage', '$gender') VALUES (?,?,?,?,?,?,?)");
$stmt->bind_param("sssssss", $firstName, $lastName, $email, $country, $phone,  $profileImage, $gender );

if ($stmt -> execute()) {
    $response = array('success' => true, 'message' => "User Created Successfully");
    echo json_encode($response);
} else {
    $response = array('success' => false, 'message' => 'Error has occured. Can not create User.');
    echo json_encode($response);
}
   $stmt->close();
}
?>
