<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, X-Requested-With, Content-Type, Accept');
// Database connection parameters
$servername = "localhost";  // Change this to your MySQL server hostname if it's different
$username = "root";          // MySQL username
$password = "Gurmu@123";              // MySQL password
$databaseName = "traveldb"; // Name of the database you want to connect to

// Create connection
$conn = new mysqli($servername, $username, $password, $databaseName );

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Connected successfully \n";
?>