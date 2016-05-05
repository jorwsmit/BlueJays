<?php
include "core.php";

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if ($_SERVER["REQUEST_METHOD"] == "GET"){
    //if (strlen($_GET["course_id"]) <= 4) {
        $id = mysqli_real_escape_string(connectSql(),$_GET["id"]);
        echo json_encode(db_select("StudentCoursesRelation", "email", $id));
//}
    
    
} else if ($_SERVER["REQUEST_METHOD"] == "POST"){
        db_insert("Request", $data);  
    
    
} else if ($_SERVER["REQUEST_METHOD"] == "PUT"){
    db_update("Request", $data, "to_email");
}

?>