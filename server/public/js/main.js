let socket = require('socket.io-client')('http://localhost:5000');

socket.on('connect', () => {
    socket.emit('login', getCookie('lupinCatcherSessionId'));
})

console.log(document.cookie);
socket.on('logged_in', function (data) {
    console.log(data);
})



function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}