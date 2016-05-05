<?php
include "core.php";

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if ($_SERVER["REQUEST_METHOD"] == "GET"){
        $email = mysqli_real_escape_string(connectSql(),$_GET["email"]);
        echo json_encode(db_select("StudentTutor", "email", $email));   
    
} else if ($_SERVER["REQUEST_METHOD"] == "POST"){
    
    if (db_select("StudentTutor", "google_id", $data["google_id"]) == NULL){
        db_insert("StudentTutor", $data);   
    }
    
    
} else if ($_SERVER["REQUEST_METHOD"] == "PUT"){
    db_update("StudentTutor", $data, "google_id");
}

?>