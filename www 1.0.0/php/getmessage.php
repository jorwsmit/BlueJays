<?php
include "core.php";

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if ($_SERVER["REQUEST_METHOD"] == "GET"){
    $from_email = mysqli_real_escape_string(connectSql(),$_GET["from_email"]);
    echo json_encode(db_select("Request", "from_email", $from_email));
    
} else if ($_SERVER["REQUEST_METHOD"] == "POST"){
        db_insert("Request", $data);  
    
    
} else if ($_SERVER["REQUEST_METHOD"] == "PUT"){
    db_update("Request", $data, "to_email");
}

?>