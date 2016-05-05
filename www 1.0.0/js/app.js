var subject;

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    
    
    document.cookie = "idCookie=" + profile.getId() + "; path=/";
    //POST
    $.ajax({
        url: "http://localhost/www/php/users.php",
        async: false,
        data: JSON.stringify({
            "google_id": profile.getId(),
            "name": profile.getName(),
            "image_url": profile.getImageUrl(),
            "email": profile.getEmail()
        }),
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "POST"
    });

    window.location.href = "http://localhost/www/dashboard.html";
};


function adminOnSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();

    document.cookie = "idCookie=" + profile.getId() + "; path=/";
    //POST
    $.ajax({
        url: "http://localhost/www/php/users.php",
        async: false,
        data: JSON.stringify({
            "google_id": profile.getId(),
            "name": profile.getName(),
            "image_url": profile.getImageUrl(),
            "email": profile.getEmail()
        }),
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "POST"
    });

    window.location.href = "http://localhost/www/adminpanel.html";
};



function getUser() {


    var id = getCookie("idCookie");
    var returndata;
    //GET
    $.ajax({
        url: "http://localhost/www/php/users.php?id=" + id,
        async: false,
        success: function (data) {
            returndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });

    document.getElementById("name").innerHTML = returndata[0]["name"];

        
    document.getElementById('pic').innerHTML = "<img alt=\"User Pic\" src=\"" +
    returndata[0]["image_url"] + "\" class=\"img-circle img-responsive\">"

    
    document.getElementById("email").innerHTML = returndata[0]["email"];

    if (returndata[0]["major"] != null) {
        document.getElementById("major").innerHTML = returndata[0]["major"];
    }

    if (returndata[0]["minor"] != null) {
        document.getElementById("minor").innerHTML = returndata[0]["minor"];
    }

    if (returndata[0]["dob"] != null) {
        document.getElementById("dob").innerHTML = returndata[0]["dob"];
    }

    if (returndata[0]["gender"] != null) {
        document.getElementById("gender").innerHTML = returndata[0]["gender"];
    }

    if (returndata[0]["city"] != null && returndata[0]["state"] != null) {
        document.getElementById("address").innerHTML = returndata[0]["city"] + ", " +
        returndata[0]["state"];
    }

    if (returndata[0]["phone"] != null) {
        document.getElementById("phone").innerHTML = returndata[0]["phone"];
    }

    if (returndata[0]["is_student"] == false) {
        var html = "";
        document.getElementById("tutor").innerHTML = "<a href=\"http://localhost/www/tutordashboard.html\" class=\"btn btn-danger\"><i class=\"fa fa-refresh\"></i> Switch to Tutor View</a>";
    }
    
    if (returndata[0]["is_admin"] == true) {
        document.getElementById("admin").innerHTML = "</br><a href=\"http://localhost/www/adminpanel.html\" class=\"btn btn-danger\"><i class=\"fa fa-refresh\"></i> Switch to Admin View</a>";
    }

}

function editUser() {
    var id = getCookie("idCookie");
    var returndata;
    //GET
    $.ajax({
        url: "http://localhost/www/php/users.php?id=" + id,
        async: false,
        success: function (data) {
            returndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });

    document.getElementById("name").innerHTML = returndata[0]["name"];
    
    document.getElementById('pic').innerHTML = "<img alt=\"User Pic\" src=\"" +
    returndata[0]["image_url"] + "\" class=\"img-circle img-responsive\">"
    
    document.getElementById("email").innerHTML = returndata[0]["email"];
    
    //major edit
    if (returndata[0]["major"] != null) {
        document.getElementById('major').innerHTML =
        "<input type= \"text\" class=\"form-control\" id= \"majorInput\" value= \"" +
        returndata[0]["major"] + "\" >";
    } else {
        document.getElementById('major').innerHTML =
        "<input type= \"text\" class=\"form-control\" id= \"majorInput\" placeholder= \"Major\" >";
    }

    if (returndata[0]["minor"] != null) {
        document.getElementById('minor').innerHTML =
        "<input type= \"text\" class=\"form-control\" id= \"minorInput\" value= \"" +
        returndata[0]["minor"] + "\" >";
    } else {
        document.getElementById('minor').innerHTML =
        "<input type= \"text\" class=\"form-control\" id= \"minorInput\" placeholder= \"Minor\" >";
    }

    if (returndata[0]["dob"] != null) {
        document.getElementById('dob').innerHTML =
        "<input type= \"text\" class=\"form-control\" id= \"dobInput\" value= \"" +
        returndata[0]["dob"] + "\" >";


    } else {
        document.getElementById('dob').innerHTML =
        "<input type= \"text\" class=\"form-control\" id= \"dobInput\" placeholder= \"mm/dd/yyyy\" >";

    }


    if (returndata[0]["gender"] != null) {
        $("#genderSelect").val(returndata[0]["gender"]);
    } else {
        $("#genderSelect").val("S");
    }

    if (returndata[0]["city"] != null && returndata[0]["state"] != null) {
        document.getElementById('address').innerHTML =
        "<input type= \"text\" class=\"form-control\" id= \"cityInput\" value= \"" +
        returndata[0]["city"] + "\" >" +
        "<input type= \"text\" class=\"form-control\" id= \"stateInput\" value= \"" +
        returndata[0]["state"] + "\" >";
    } else {
        document.getElementById('address').innerHTML =
        "<input type= \"text\" class=\"form-control\" id= \"cityInput\" placeholder= \"City\" >" +
        "<br><input type= \"text\" class=\"form-control\" id= \"stateInput\" placeholder= \"State\" >";
    }

    if (returndata[0]["phone"] != null) {
        document.getElementById('phone').innerHTML =
        "<input type= \"tel\" class=\"form-control\" id= \"phoneInput\" value= \"" +
        returndata[0]["phone"] + "\" >";
    } else {
        document.getElementById('phone').innerHTML =
        "<input type= \"tel\" class=\"form-control\" id= \"phoneInput\" placeholder= \"Phone Number\" >"
    }
}

function saveUser() {
    var id = getCookie("idCookie");
    var gender;

    var e = document.getElementById("genderSelect");


    $.ajax({
        url: "http://localhost/www/php/users.php",
        async: false,
        data: JSON.stringify({
            "google_id": id,
            "major": document.getElementById("majorInput").value,
            "minor": document.getElementById("minorInput").value,
            "dob": document.getElementById("dobInput").value,
            "gender": e.options[e.selectedIndex].value,
            "city": document.getElementById("cityInput").value,
            "state": document.getElementById("stateInput").value,
            "phone": document.getElementById("phoneInput").value
        }),
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "PUT"
    });

    window.location.href = "http://localhost/www/accountsettings.html";

}

function saveTutor() {
    var id = getCookie("idCookie");
    var gender;

    var e = document.getElementById("genderSelect");

    $.ajax({
        url: "http://localhost/www/php/users.php",
        async: false,
        data: JSON.stringify({
            "google_id": id,
            "major": document.getElementById("majorInput").value,
            "minor": document.getElementById("minorInput").value,
            "dob": document.getElementById("dobInput").value,
            "gender": e.options[e.selectedIndex].value,
            "city": document.getElementById("cityInput").value,
            "state": document.getElementById("stateInput").value,
            "phone": document.getElementById("phoneInput").value
        }),
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "PUT"
    });

    window.location.href = "http://localhost/www/tutoraccountsettings.html";

}

function getcourses() {
    var returndata;
    var id = getCookie("idCookie");
    //GET email by ID
    $.ajax({
        url: "http://localhost/www/php/users.php?id=" + id,
        async: false,
        success: function (data) {
            returndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });
    
    //GET 
    $.ajax({
        url: "http://localhost/www/php/getstudentcourserelation.php?id=" + returndata[0]["email"],
        async: false,
        success: function (data) {
            returndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });


    var html = "";
    var inc = 0;
    

    for (var i = 0; i < returndata.length; i++) {
        var coursereturndata;
        var course_id = returndata[i]["course_id"];
        $.ajax({
            url: "http://localhost/www/php/getcourse.php?id=" + course_id,
            async: false,
            success: function (data) {
                coursereturndata = data;
            },
            error: function () {
                //alert("Database Error!");
            },
            dataType: "json",
            type: "GET",
            contentType: "application/json"
        });
        
        if (returndata[i]["is_active"] != false) {
            html += "<div class=\"col-xs-12 col-md-4\">" +
            "<div class=\"panel panel-default\">" +
            "<div class=\"panel-heading\">" +
            "<h3 class=\"panel-title\"><b>" + coursereturndata[0]["course_id"] + "</b></br>" + coursereturndata[0]["name"] + "</h3>" +
            "</div>" +
            "<div class=\"panel-body\">" +
            coursereturndata[0]["description"] +
            "</br></br>" + "<button type=\"button\" class=\"btn btn-primary\" onclick=\"listTutors('" + coursereturndata[0]["course_id"] + "')\">Find Tutors</button>" +
            "</div>" +
            "</div>" +
            "</div>";
        }

    }

    document.getElementById('courses').innerHTML = html;


}

function gettutorcourses() {
    var returndata;
    var id = getCookie("idCookie");
    //GET email by ID
    $.ajax({
        url: "http://localhost/www/php/users.php?id=" + id,
        async: false,
        success: function (data) {
            returndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });
    
    //GET 
    $.ajax({
        url: "http://localhost/www/php/gettutorscourses.php?id=" + returndata[0]["email"],
        async: false,
        success: function (data) {
            returndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });


    var html = "";
    var inc = 0;
    for (var i = 0; i < returndata.length; i++) {
        var coursereturndata;
        var course_id = returndata[i]["course_id"];
        $.ajax({
            url: "http://localhost/www/php/getcourse.php?id=" + course_id,
            async: false,
            success: function (data) {
                coursereturndata = data;
            },
            error: function () {
                //alert("Database Error!");
            },
            dataType: "json",
            type: "GET",
            contentType: "application/json"
        });

        if (returndata[i]["is_active"] != false) {
            html += "<div class=\"col-xs-12 col-md-4\">" +
            "<div class=\"panel panel-default\">" +
            "<div class=\"panel-heading\">" +
            "<h3 class=\"panel-title\"><b>" + coursereturndata[0]["course_id"] + "</b></br>" + coursereturndata[0]["name"] + "</h3>" +
            "</div>" +
            "<div class=\"panel-body\">" +
            coursereturndata[0]["description"] +
            "</div>" +
            "</div>" +
            "</div>";
        }

    }

    document.getElementById('courses').innerHTML = html;


}

function listTutors(course_id) {

    subject = course_id;
    var returndata;
    //GET
    $.ajax({
        url: "http://localhost/www/php/gettutorcourserelation.php?course_id=" + course_id,
        async: false,
        success: function (data) {
            returndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });
       
 
    $('#coursecontainer').hide();
    $('#tutortable').show();
    document.getElementById("tutortable").style.visibility = "visible";

    var html = "";

    for (var i = 0; i < returndata.length; i++) {
        html += "<tr><th scope=\"clickable-row\">" + (i + 1) + "</th><td>" +
        returndata[i]["name"] + "</td><td>" + course_id + "</td><td><button type=\"button\" class=\"btn btn-primary\" onclick=\"showTutor('" + returndata[i]["email"] + "')\">View Profile</button></td></tr>";
    }

    
    document.getElementById('tutors').innerHTML = html;



}

function showTutor(email) {
    //GET
    $.ajax({
        url: "http://localhost/www/php/tutoraccount.php?email=" + email,
        async: false,
        success: function (data) {
            returndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });

    document.getElementById("name").innerHTML = returndata[0]["name"];
        
    document.getElementById('pic').innerHTML = "<img alt=\"User Pic\" src=\"" +
    returndata[0]["image_url"] + "\" class=\"img-circle img-responsive\">"
    
    document.getElementById("email").innerHTML = returndata[0]["email"];

    if (returndata[0]["major"] != null) {
        document.getElementById("major").innerHTML = returndata[0]["major"];
    }

    if (returndata[0]["minor"] != null) {
        document.getElementById("minor").innerHTML = returndata[0]["minor"];
    }

    if (returndata[0]["dob"] != null) {
        document.getElementById("dob").innerHTML = returndata[0]["dob"];
    }

    if (returndata[0]["gender"] != null) {
        document.getElementById("gender").innerHTML = returndata[0]["gender"];
    }

    if (returndata[0]["city"] != null && returndata[0]["state"] != null) {

        document.getElementById("address").innerHTML = "<button type=\"button\" class=\"btn btn-success\" onclick=\"showTutorMap('" +
        returndata[0]["city"] + ", " +
        returndata[0]["state"] + "')\">" +
        returndata[0]["city"] + ", " +
        returndata[0]["state"] + "</button>";
    }

    if (returndata[0]["phone"] != null) {
        document.getElementById("phone").innerHTML = returndata[0]["phone"];
    }
    
    
    $('#entiremessagetable').hide();
    $('#messagetable').hide();    
    $('#tutortable').hide();
    $('#tutoraccount').show();
    document.getElementById("tutoraccount").style.visibility = "visible";

}

function showTutorMap(address) {
    document.getElementById("tutormap").innerHTML = "<iframe class=\"embed-responsive-item\"  frameborder=\"0\" style=\"border:0\"" +
    "src=\"https://www.google.com/maps/embed/v1/place?key=ApiKeyHere &q=" + address + "\" allowfullscreen></iframe>";

    $('#tutoraccount').hide();
    $('#tutormap').show();
    document.getElementById("tutormap").style.visibility = "visible";
}

function addCourse() {
    var returndata;
    var id = getCookie("idCookie");
    
    //Get email by ID
    $.ajax({
        url: "http://localhost/www/php/users.php?id=" + id,
        async: false,
        success: function (data) {
            returndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });
    
    //POST    
    $.ajax({
        url: "http://localhost/www/php/addcourse.php",
        async: false,
        data: JSON.stringify({
            "email": returndata[0]["email"],
            "course_id": document.getElementById("addInput").value,
            "is_active": true
        }),
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "POST"
    });

    window.location.href = "http://localhost/www/courses.html";


}

function removeCourse() {
    var returndata;
    var id = getCookie("idCookie");
   
    //Get email by ID
    $.ajax({
        url: "http://localhost/www/php/users.php?id=" + id,
        async: false,
        success: function (data) {
            returndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });
    
    
    //PUT
    $.ajax({
        url: "http://localhost/www/php/removecourse.php",
        async: false,
        data: JSON.stringify({
            "email": returndata[0]["email"],
            "course_id": document.getElementById("removeInput").value,
        }),
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "PUT"
    });

    window.location.href = "http://localhost/www/courses.html";
}

function getMessages() {
    var id = getCookie("idCookie");
    var userreturndata;
    $.ajax({
        url: "http://localhost/www/php/users.php?id=" + id,
        async: false,
        success: function (data) {
            userreturndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });

    var returndata;
    $.ajax({
        url: "http://localhost/www/php/getmessage.php?from_email=" + userreturndata[0]["email"],
        async: false,
        success: function (data) {
            returndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });

    var html = document.getElementById("messagetable").innerHTML;

    for (var i = 0; i < returndata.length; i++) {
        html += "<tr>" +
        "<th scope=\"clickable-row\">" + (i + 1) + "</th>" +
        "<td>" + returndata[i]["to_name"] + "</td>" +
        "<td>" + returndata[i]["subject"] + "</td>" +
        "<td>";
        if (returndata[i]["accept"] == true) { 
            html += "<button type=\"button\" class=\"btn btn-success\" onclick=\"showTutor('" + returndata[i]["to_email"] + "')\"style=\"width:115px;\"><b>Accepted</b></button>";
        } else if (returndata[i]["accept"] == false) {        
            html += "<button type=\"button\" class=\"btn btn-danger\" onclick=\"showTutor('" + returndata[i]["to_email"] + "')\" style=\"width:115px;\"><b>Declined</b></button>";
        } else {         
           html += "<button type=\"button\" class=\"btn btn-primary\" onclick=\"showTutor('" + returndata[i]["to_email"] + "')\"style=\"width:115px;\"><b>No Response</b></button>";
        }

        "</td>" +
        "</tr>";
    }

    document.getElementById("messagetable").innerHTML = html;
}

function findTutor(course_id) {
    
    var returndata;
    //GET
    $.ajax({
        url: "http://localhost/www/php/gettutor.php?course_id=" + course_id,
        async: false,
        success: function (data) {
            returndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });
    
    $('#coursecontainer').hide();
    $('#tutortable').show();
    document.getElementById("tutortable").style.visibility = "visible";
    
    
    console.log(returndata.length);
    var html = "";

    for (var i = 0; i < returndata.length; i++) {
        html += "<tr><th scope=\"clickable-row\">" + (i + 1) + "</th><td>" +
        returndata[i]["tutor_name"] + "</td><td>" + course_id + "</td><td><div class=\"alert alert-success\" role=\"alert\"><a href=\"http://localhost/www/request.html\">View Profile</a></div></td></tr>";
    }

    document.getElementById('tutors').innerHTML = html;

}



function initMap(course_id) {
    
    
    //Google Map with your current location
    
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 6
    });
    var infoWindow = new google.maps.InfoWindow({ map: map });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

}



function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}

function updateIsStudent(tfBool) {
    var id = getCookie("idCookie");
    //PUT
    $.ajax({
        url: "http://localhost/www/php/users.php",
        async: false,
        data: JSON.stringify({
            "google_id": id,
            "is_student": tfBool
        }),
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "PUT"
    });
}

function isTutor() {
    var id = getCookie("idCookie");
    var returndata;
    $.ajax({
        url: "http://localhost/www/php/users.php?id=" + id,
        async: false,
        success: function (data) {
            returndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });

    if (returndata[0]["is_student"] == null || returndata[0]["is_student"] == true) {
        alert("You are not a tutor! Redirecting to student dashboard.");
        window.location.href = "http://localhost/www/dashboard.html";
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function adminMessageId() {
    alert("Not Yet Implemented.")
}

function adminMessageEmail() {
    var email = document.getElementById("emailField").value;
    var returndata;
    //GET
    $.ajax({
        url: "http://localhost/www/php/adminMessageEmail.php?email=" + email,
        async: false,
        success: function (data) {
            returndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });

    document.getElementById("modalTitle").innerHTML = "Messages for " + document.getElementById("emailField").value;


    var html = "";

    if (returndata.length > 0) {

        html += "<h5><b>From Email: </b>" + returndata[0]["from_email"] + "</br><b>From Name: </b>" + returndata[0]["from_name"] +
        "</br><b>Message: </b>" + returndata[0]["message"] + "</br>";
        if (returndata[0]["accept"] == true) {
            html += "<div class=\"alert alert-success\" role=\"alert\"><b>Request Accepted</b></div>";
        } else if (returndata[0]["accept"] == false) {
            html += "<div class=\"alert alert-danger\" role=\"alert\"><b>Request Declined</b></div>";
        } else {
            html += "<div class=\"alert alert-info\" role=\"alert\"><b>No Response to Request</b></div>";
        }
    }

    if (returndata.length > 1)
        for (var i = 1; i < returndata.length; i++) {
            html += "<h5><b>From Email: </b>" + returndata[i]["from_email"] + "</br><b>From Name: </b>" + returndata[0]["from_name"] +
            "</br><b>Message: </b>" + returndata[i]["message"] + "</br>";
            if (returndata[i]["accept"] == true) {
                html += "<div class=\"alert alert-success\" role=\"alert\"><b>Request Accepted</b></div>";
            } else if (returndata[i]["accept"] == false) {
                html += "<div class=\"alert alert-danger\" role=\"alert\"><b>Request Declined</b></div>";
            } else {
                html += "<div class=\"alert alert-info\" role=\"alert\"><b>No Response to Request</b></div>";
            }
        }


    document.getElementById("modalContent").innerHTML = html;

    $('#messageModal').modal('show');
    //alert(returndata);
}

function requestTutor(){
    
    //POST
    var id = getCookie("idCookie");
    var returndata;
    
    //GET
    $.ajax({
        url: "http://localhost/www/php/users.php?id=" + id,
        async: false,
        success: function (data) {
            returndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });
    
    $.ajax({
        url: "http://localhost/www/php/requestTutor.php",
        async: false,
        data: JSON.stringify({
            "to_email": document.getElementById('email').innerHTML,
            "to_name": document.getElementById('name').innerHTML,
            "from_email": returndata[0]["email"],
            "from_name": returndata[0]["name"],
            "subject": subject 
        }),
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "POST"
    });
    
    document.getElementById('requestAlert').innerHTML = '<div class="alert alert-success" role="alert"><b><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> You have successfully sent a request to '+document.getElementById('name').innerHTML+'!</b> Please do not send several requests to this user, as they may not like that sort of thing. Instead, check out thier meeting place for tutoring!</div>';
    $('#requestAlert').show();
}

function adminCourseId() {
    var courseId = document.getElementById("courseField").value;
    var returndata;
    //GET
    $.ajax({
        url: "http://localhost/www/php/adminCourse.php?courseId=" + courseId,
        async: false,
        success: function (data) {
            returndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });

    document.getElementById("modalTitle").innerHTML = "<h3>Course Name: " + returndata[0]["name"] + "</h3> <h4>" + returndata[0]["course_id"] +"</h4>";

    var html = "";
    
    html += "<h4>Description: " + returndata[0]["description"] + "</h4>";
    
    if(returndata[0]["spring"] == true){
        html += "</br><div class=\"alert alert-success\" role=\"alert\">Offered in the Spring</div>"
    }
    
    if(returndata[0]["fall"] == true){
        html += "</br><div class=\"alert alert-info\" role=\"alert\">Offered in the Fall</div>"
    }
    
    if(returndata[0]["summer1"] == true){
        html += "</br><div class=\"alert alert-warning\" role=\"alert\">Offered in Summer Session 1</div>"
    }
    
    if(returndata[0]["summer2"] == true){
        html += "</br><div class=\"alert alert-danger\" role=\"alert\">Offered in Summer Session 2</div>"
    }
    
    document.getElementById("modalContent").innerHTML = html;
    
    document.getElementById("editCourseButton").innerHTML = "<a class=\"btn btn-danger\" onclick=\"adminEditCourse('"+returndata[0]["course_id"]+"')\">Edit Course</a>";
    
    $('#coursesModal').modal('show');
    //alert(returndata);
}

function adminAccount() {
    var email = document.getElementById("emailField").value;
    var returndata;
    //GET
    $.ajax({
        url: "http://localhost/www/php/adminUsers.php?email=" + email,
        async: false,
        success: function (data) {
            returndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });
    
    document.getElementById("modalTitle").innerHTML = "Account for " + document.getElementById("emailField").value;
    
    document.getElementById("name").innerHTML = returndata[0]["name"];
        
    document.getElementById('pic').innerHTML = "<img alt=\"User Pic\" src=\"" +
    returndata[0]["image_url"] + "\" class=\"img-circle img-responsive\">"
    
    document.getElementById("email").innerHTML = returndata[0]["email"];
    
    //major edit
    if (returndata[0]["major"] != null) {
        document.getElementById('major').innerHTML =
        "<input type= \"text\" class=\"form-control\" id= \"majorInput\" value= \"" +
        returndata[0]["major"] + "\" >";
    } else {
        document.getElementById('major').innerHTML =
        "<input type= \"text\" class=\"form-control\" id= \"majorInput\" placeholder= \"Major\" >";
    }

    if (returndata[0]["minor"] != null) {
        document.getElementById('minor').innerHTML =
        "<input type= \"text\" class=\"form-control\" id= \"minorInput\" value= \"" +
        returndata[0]["minor"] + "\" >";
    } else {
        document.getElementById('minor').innerHTML =
        "<input type= \"text\" class=\"form-control\" id= \"minorInput\" placeholder= \"Minor\" >";
    }

    if (returndata[0]["dob"] != null) {
        document.getElementById('dob').innerHTML =
        "<input type= \"text\" class=\"form-control\" id= \"dobInput\" value= \"" +
        returndata[0]["dob"] + "\" >";

    } else {
        document.getElementById('dob').innerHTML =
        "<input type= \"text\" class=\"form-control\" id= \"dobInput\" placeholder= \"mm/dd/yyyy\" >";
    }


    if (returndata[0]["gender"] != null) {
        $("#genderSelect").val(returndata[0]["gender"]);
    } else {
        $("#genderSelect").val("S");
    }

    if (returndata[0]["city"] != null && returndata[0]["state"] != null) {
        document.getElementById('address').innerHTML =
        "<input type= \"text\" class=\"form-control\" id= \"cityInput\" value= \"" +
        returndata[0]["city"] + "\" >" +
        "<input type= \"text\" class=\"form-control\" id= \"stateInput\" value= \"" +
        returndata[0]["state"] + "\" >";
    } else {
        document.getElementById('address').innerHTML =
        "<input type= \"text\" class=\"form-control\" id= \"cityInput\" placeholder= \"City\" >" +
        "<br><input type= \"text\" class=\"form-control\" id= \"stateInput\" placeholder= \"State\" >";
    }

    if (returndata[0]["phone"] != null) {
        document.getElementById('phone').innerHTML =
        "<input type= \"tel\" class=\"form-control\" id= \"phoneInput\" value= \"" +
        returndata[0]["phone"] + "\" >";
    } else {
        document.getElementById('phone').innerHTML =
        "<input type= \"tel\" class=\"form-control\" id= \"phoneInput\" placeholder= \"Phone Number\" >"
    }
    
    $('#accountsModal').modal('show');
}

function adminSaveUser() {
    var email = document.getElementById("emailField").value;
    var gender;

    var e = document.getElementById("genderSelect");

    $.ajax({
        url: "http://localhost/www/php/adminUsers.php",
        async: false,
        data: JSON.stringify({
            "email": email,
            "major": document.getElementById("majorInput").value,
            "minor": document.getElementById("minorInput").value,
            "dob": document.getElementById("dobInput").value,
            "gender": e.options[e.selectedIndex].value,
            "city": document.getElementById("cityInput").value,
            "state": document.getElementById("stateInput").value,
            "phone": document.getElementById("phoneInput").value
        }),
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "PUT"
    });

    window.location.href = "http://localhost/www/adminaccountsettings.html";

}

function checkAdmin(){
    var id = getCookie("idCookie");
    var returndata;
    //GET
    $.ajax({
        url: "http://localhost/www/php/users.php?id=" + id,
        async: false,
        success: function (data) {
            returndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });
    
    if (returndata[0]["is_admin"] != true){
        alert("You do not have admin privileges!!! Redirecting you to the login page...")
        window.location.href = "http://localhost/www/index.html";
    }
    
}

function getRequests() {
    var id = getCookie("idCookie");
    var userreturndata;
    $.ajax({
        url: "http://localhost/www/php/users.php?id=" + id,
        async: false,
        success: function (data) {
            userreturndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });

    var returndata;
    $.ajax({
        url: "http://localhost/www/php/getrequest.php?to_email=" + userreturndata[0]["email"],
        async: false,
        success: function (data) {
            returndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });

    var html = document.getElementById("messagetable").innerHTML;
   
    for (var i = 0; i < returndata.length; i++) {
        html += "<tr>" +
        "<th scope=\"clickable-row\">" + (i + 1) + "</th>" +
        "<td><a href=\"#\" onclick=\"showTutor('" + returndata[i]["from_email"] + "')\"\">" + returndata[i]["from_name"] + "</a></td>" +
        "<td>" + returndata[i]["subject"] + "</td>" +
        "<td>";
        
        if (returndata[i]["accept"] == true) { 
            html += "<div class=\"dropdown\">";
            html += "<button type=\"button\" class=\"btn btn-success dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\" style=\"width:125px;\"><b>Accepted <span class=\"caret\"></span></b></button>";
            html += "<ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu1\">"+
            "<li><a href=\"#\" onclick=\"saveResponse('"+returndata[i]["id"]+"', true)\">Accept</a></li>"+
            "<li><a href=\"#\" onclick=\"saveResponse('"+returndata[i]["id"]+"', false)\">Decline</a></li>"+
            
            "</ul></div>";
        } else if (returndata[i]["accept"] == false) {
            html += "<div class=\"dropdown\">";
            html += "<button type=\"button\" class=\"btn btn-danger dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\" style=\"width:125px;\"><b>Declined <span class=\"caret\"></span></b></button>";
            html += "<ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu1\">"+
            "<li><a href=\"#\" onclick=\"saveResponse('"+returndata[i]["id"]+"', true)\">Accept</a></li>"+
            "<li><a href=\"#\" onclick=\"saveResponse('"+returndata[i]["id"]+"', false)\">Decline</a></li>"+
            "</ul></div>";
        } else {
           html += "<div class=\"dropdown\">";
            html += "<button type=\"button\" class=\"btn btn-primary dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\" style=\"width:125px;\"><b>No Response <span class=\"caret\"></span></b></button>";
            html += "<ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu1\">"+
            "<li><a href=\"#\" onclick=\"saveResponse('"+returndata[i]["id"]+"', 'true')\">Accept</a></li>"+
            "<li><a href=\"#\" onclick=\"saveResponse('"+returndata[i]["id"]+"', 'false')\">Decline</a></li>"+
            "</ul></div>";
        }
        
        "</td>" +
        "</tr>";
    }

    document.getElementById("messagetable").innerHTML = html;
}


function saveResponse(id, response){

    
    $.ajax({
        url: "http://localhost/www/php/tutorresponse.php",
        async: false,
        data: JSON.stringify({
            "id": id,
            "accept": response
        }),
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "PUT"
    });
    
    window.location.href = "http://localhost/www/tutordashboard.html";
    
}

function adminAddCourse(){
    
   if (document.getElementById("courseId").value != '') {
       var course_id = document.getElementById("courseId").value;
       var name = document.getElementById("courseName").value;
       var description = document.getElementById("courseDescription").value;
       var spring, fall, summer1, summer2;
       
       if(document.getElementById('springRadio').checked){
           spring = true;
       } else {
           spring = false;
       }
       
       
       if(document.getElementById('fallRadio').checked){
           fall = true;
       } else {
           fall = false;
       }
       
       if(document.getElementById('summer1Radio').checked){
           summer1 = true;
       } else {
           summer1 = false;
       }
       
       if(document.getElementById('summer2Radio').checked){
           summer2 = true;
       } else {
           summer2 = false;
       }
       
       
       
       $.ajax({
        url: "http://localhost/www/php/adminCourse.php",
        async: false,
        data: JSON.stringify({
            "course_id": course_id,
            "name": name,
            "description": description,
            "spring": spring,
            "fall": fall,
            "summer1": summer1,
            "summer2": summer2
        }),
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "POST"
    });
    
    
   } else {
       alert("A course ID is needed at the very least when adding a course.");
   }

    window.location.href = "http://localhost/www/admincourses.html";
    
}

function adminEditCourse(course_id){
    document.getElementById("courseId").value = course_id;
    $('#coursesModal').modal('show');
    $('#addModal').modal('show');
}

function tutorAddCourse() {
    var returndata;
    var id = getCookie("idCookie");
    
    //Get email by ID
    $.ajax({
        url: "http://localhost/www/php/users.php?id=" + id,
        async: false,
        success: function (data) {
            returndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });
    
    //POST    
    $.ajax({
        url: "http://localhost/www/php/tutoraddcourse.php",
        async: false,
        data: JSON.stringify({
            "email": returndata[0]["email"],
            "course_id": document.getElementById("addInput").value,
            "name": returndata[0]["name"],
            "is_active": true
        }),
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "POST"
    });

    window.location.href = "http://localhost/www/tutorcourses.html";


}

function tutorRemoveCourse() {
    var returndata;
    var id = getCookie("idCookie");
   
    //Get email by ID
    $.ajax({
        url: "http://localhost/www/php/users.php?id=" + id,
        async: false,
        success: function (data) {
            returndata = data;
        },
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "GET",
        contentType: "application/json"
    });
    
    
    //PUT
    $.ajax({
        url: "http://localhost/www/php/tutorremovecourse.php",
        async: false,
        data: JSON.stringify({
            "email": returndata[0]["email"],
            "course_id": document.getElementById("removeInput").value,
        }),
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "PUT"
    });

    window.location.href = "http://localhost/www/tutorcourses.html";
}