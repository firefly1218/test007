$(function () {
    var userinfo=JSON.parse(sessionStorage.getItem("userinfo"));
    if (!userinfo) {
        location.href = "../../login.html";
    }
    $("#major-link").click(function () {
        if (location.pathname !== "/login.html") {
            if (userinfo) {
                location.href = "../view/total_analyze.html";
            } else {
                location.href = "../../login.html";
            }
        }
        
    });
    $("#user-link").click(function () {
        if (location.pathname !== "/login.html") {
            if (userinfo) {
                location.href = "../view/user_map.html";
            } else {
                location.href = "../../login.html";
            }
        }
    });
    
    $("#health-link").click(function () {
        if(location.pathname!=="/login.html"){
            if(userinfo){
                location.href = "../view/user_health.html";
            }else{
                location.href = "../../login.html";
            }
        }
    });
    
    //退出登录
    $("#setting").click(function () {
        $(".mask").addClass("login-show").removeClass("login-hide");
    });
    $(".login-out").click(function () {
        $(".mask").addClass("login-hide")
        sessionStorage.removeItem("userinfo");
        location.href = "../../login.html";
    });
});