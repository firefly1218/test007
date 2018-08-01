
function isIE() {
    var userAgent = window.navigator.userAgent;
    return userAgent.indexOf("Edge") > 0 ? true : !(userAgent.indexOf("Chrome") > 0 || userAgent.indexOf("Opera") > 0 || userAgent.indexOf("Firefox") > 0 || userAgent.indexOf("Safari") > 0);
}



