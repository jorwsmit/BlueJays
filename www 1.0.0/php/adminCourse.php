<?php
include "core.php";

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if ($_SERVER["REQUEST_METHOD"] == "GET"){
    $course_id = mysqli_real_escape_string(connectSql(),$_GET["courseId"]);
    echo json_encode(db_select("Courses", "course_id", $course_id));
    
} else if ($_SERVER["REQUEST_METHOD"] == "POST"){
        
        if (db_select("Courses", "course_id", $data["course_id"]) == NULL){
            db_insert("Courses", $data);   
        } else {
            db_update("Courses", $data, "course_id");
        }
       // db_insert("Courses", $data);  
    
    
} else if ($_SERVER["REQUEST_METHOD"] == "PUT"){
    db_update("Request", $data, "to_email");
}

?>