<?php
header('Access-Control-Allow-Origin:*'); // Allow requests from your frontend origin
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, X-Requested-With, Content-Type, Accept');

// Handle preflight OPTIONS request
// if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
//     http_response_code(200);
   
// }

include_once(__DIR__ . '/Database/dbConnection.php'); // Corrected path with proper directory separator
include_once(__DIR__ . '/auth/signup.php');

?>
