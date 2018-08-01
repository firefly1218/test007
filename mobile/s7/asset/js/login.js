$(function () {
    $(".login-contain input").keyup(function () {
        var username = $(".input-name").val();
        var userpass = $(".input-pass").val();
        // console.log(username);
        // console.log(userpass);
        if (username !== "" && userpass !== "") {
            $(".login-btn").removeProp("disabled").addClass("status-normal").removeClass("status-disabled");
        } else {
            $(".login-btn").prop("disable", true).addClass("status-disabled");
        }
    });
    $(".login-btn").click(function () {
        var username = $(".input-name").val();
        var userpass = $(".input-pass").val();
        $(".login-btn").addClass("status-press").removeClass("status-normal");
        dataService.request("login", {username: username, password: userpass}).then(function (result) {
            if (result.code == 200 && result.result.value == 0) {
                sessionStorage.setItem("userinfo",JSON.stringify(result));
                location.href="s7/view/index.html";
            } else {
                location.href="/login.html";
            }
        });
        
    });

});