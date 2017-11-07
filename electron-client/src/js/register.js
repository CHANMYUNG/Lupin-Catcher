let emailValidated = false;

function emailValidation() {
    emailValidated = false;
    const email = document.getElementById("email").value;
    document.getElementById("email").style.border = "";
    document.getElementById("validEmailNotice").style.display = "none";
    document.getElementById("invalidEmailNotice").style.display = "none";

    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        document.getElementById("illegalEmailNotice").style.display = "inline-block";
    } else {
        document.getElementById("illegalEmailNotice").style.display = "none";
    }
}

function emailValidationFromServer() {
    const axios = require('axios');
    const email = document.getElementById("email").value;
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        axios({
                "method": "GET",
                "url": "http://localhost:5000/email/validation/" + email
            })
            .then(response => {
                document.getElementById("email").style.border = "1px solid #00ff00";
                document.getElementById("validEmailNotice").style.display = "inline-block";
                emailValidated = true;
            })
            .catch(response => {
                console.log(response);
                document.getElementById("email").style.border = "1px solid #ff0000";
                document.getElementById("invalidEmailNotice").style.display = "inline-block";
                emailValidated = false;
            })
    }
}

function register(){
    if(!emailValidated){
        alert("빠짐없이 올바르게 입력해주세요.")
        return;
    }
    
}

function exit(){
    let electron = require('electron');
    electron.remote.getCurrentWindow().close();
}