function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    /*
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    */

    //document.cookie = "idCookie" +"=" + profile.getId() + ";domain=localhost/www;path=/";
    
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

    window.location.href = "http://localhost/www/home.html";
};

function getUser() {


    var id = getCookie("idCookie");
    //alert(id);
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

    //alert(returndata[0]["name"]);
    document.getElementById("name").innerHTML = returndata[0]["name"];
    // document.getElementById('pic').innerHTML = "<h3>"+ returndata[0]["name"] + "</h3>" +
    // "<img src="+returndata[0]["image_url"] + ">";
        
    document.getElementById('pic').innerHTML = "<img alt=\"User Pic\" src=\"" +
    returndata[0]["image_url"] + "\" class=\"img-circle img-responsive\">"
    //document.write();
    
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

}

function editUser() {
    var id = getCookie("idCookie");
    //alert(id);
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

    //alert(returndata[0]["name"]);
    document.getElementById("name").innerHTML = returndata[0]["name"];
    // document.getElementById('pic').innerHTML = "<h3>"+ returndata[0]["name"] + "</h3>" +
    // "<img src="+returndata[0]["image_url"] + ">";
        
    document.getElementById('pic').innerHTML = "<img alt=\"User Pic\" src=\"" +
    returndata[0]["image_url"] + "\" class=\"img-circle img-responsive\">"
    //document.write();
    
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

    document.getElementById('dob').innerHTML =
    "<input type= \"date\" class=\"form-control\" id= \"dobInput\" placeholder= \"" +
    returndata[0]["dob"] + "\" >";

    $("#genderSelect").val(returndata[0]["gender"]);

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
        "<input type= \"text\" class=\"form-control\" id= \"phoneInput\" value= \"" +
        returndata[0]["phone"] + "\" >";
    } else {
        document.getElementById('phone').innerHTML =
        "<input type= \"tel\" class=\"form-control\" id= \"phoneInput\" placeholder= \"Phone Number\" >"
    }
}

function saveUser() {

    var id = getCookie("idCookie");
    $.ajax({
        url: "http://localhost/www/php/users.php",
        async: false,
        data: JSON.stringify({
            "google_id": id,
            "major": document.getElementById("majorInput").value,
            "minor": document.getElementById("minorInput").value
        }),
        error: function () {
            //alert("Database Error!");
        },
        dataType: "json",
        type: "PUT"
    });

    window.location.href = "http://localhost/www/accountsettings.html";

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