const axios = require('axios');
const url = require('url');
const path = require('path');

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    axios({
            "method": "POST",
            "url": "http://localhost:5000/auth/local",
            "data": {
                "email": email,
                "password": password
            }
        })
        .then(response => {
            location.href = "../html/main.html";
        })
        .catch(response => {
            alert("로그인 실패");
        })
}

function openRegister() {
    let electron = require('electron');
    let remote = electron.remote;
    const top = remote.getCurrentWindow();
    console.log("ASDASD");
    console.log(top);

    let child = new remote.BrowserWindow({
        parent: top,
        show: false,
        modal: true,
        backgroundColor: "#ffffff"
    })
    child.loadURL(url.format({
        pathname: path.join(__dirname, '../html/register.html'),
        protocol: 'file:',
        slashes: true
      }))
    child.once('ready-to-show', () => {
        child.show();
    })
}