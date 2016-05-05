<?php
include "core.php";

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if ($_SERVER["REQUEST_METHOD"] == "GET"){
    if (ctype_digit($_GET["id"])){
        echo json_encode(db_select("StudentTutor", "google_id", $_GET["id"]));
    } else {
        echo "ERROR!!! You have included something strange with your request.";
    }
    
    
} else if ($_SERVER["REQUEST_METHOD"] == "POST"){
    
    if (db_select("StudentTutor", "google_id", $data["google_id"]) == NULL){
        db_insert("StudentTutor", $data);   
    }
    
    
} else if ($_SERVER["REQUEST_METHOD"] == "PUT"){
    //db_update("StudentTutor", $data, "google_id");
    if($data["accept"] == true){
        //db_update("Request", $data, "id");
        //queryrun("UPDATE Request SET accept=1 WHERE to_email='".$data["to_email"]."' AND from_email='".$data["from_email"]."' AND subject='".$data["subject"]."';", connectSql());
        queryrun("UPDATE Request SET accept=1 WHERE id='".$data["id"]."';", connectSql());
    } else if ($data["accept"] == false){
        //db_update("Request", $data, "id");
        //queryrun("UPDATE Request SET accept=0 WHERE to_email='".$data["to_email"]."' AND from_email='".$data["from_email"]."' AND subject='".$data["subject"]."';", connectSql());
        queryrun("UPDATE Request SET accept=0 WHERE id='".$data["id"]."';", connectSql());
    } else {
        //db_update("Request", $data, "id");
        //queryrun("UPDATE Request SET accept=null WHERE to_email='".$data["to_email"]."' AND from_email='".$data["from_email"]."' AND subject='".$data["subject"]."';", connectSql());
        queryrun("UPDATE Request SET accept=NULL WHERE id='".$data["id"]."';", connectSql());
    }
}

?>