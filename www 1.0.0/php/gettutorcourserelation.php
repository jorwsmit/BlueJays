<?php
include "core.php";

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if ($_SERVER["REQUEST_METHOD"] == "GET"){
    //if (strlen($_GET["course_id"]) <= 4) {
        $course_id = mysqli_real_escape_string(connectSql(),$_GET["course_id"]);
        echo json_encode(db_select("TutorCoursesRelation", "course_id", $course_id));
//}
    
    
} else if ($_SERVER["REQUEST_METHOD"] == "POST"){
        db_insert("Request", $data);  
    
    
} else if ($_SERVER["REQUEST_METHOD"] == "PUT"){
    db_update("Request", $data, "to_email");
}

?>