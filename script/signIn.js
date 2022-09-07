window.onload = function() {
    let nearlyLogin = localStorage.getItem("nearlyLogin") ? JSON.parse(localStorage.getItem("nearlyLogin")) : []
    if(nearlyLogin.isLogin == true) {
        window.location.href = '../html/main.html'
    }
    else {
        if(nearlyLogin.length != 0) {
            document.getElementById("mail").value = nearlyLogin.mail
        }
        if(nearlyLogin.checkbox){
            document.getElementById("password").value = nearlyLogin.password
            document.getElementById("checkbox").setAttribute("checked", "checked")
        }
        else{
            document.getElementById("checkbox").disabled
        }
    }
}
document.getElementById('submit-button--login').onclick = function redirecTodoList(){
    const userMail = document.getElementById("mail").value
    const userPassword = document.getElementById("password").value
    checkExistMail(userMail)
    checkExistPassword(userPassword)
    if(userMail && userPassword)
    {   let information = localStorage.getItem("information") ? JSON.parse(localStorage.getItem("information")) : []
        let checkMail = information.find(value => value.mail === userMail)
        if(!checkMail){ 
            document.getElementsByClassName("information__notify")[0].innerHTML = `<p class="error notify-error">*Account does not exist please register</p>`
        }
        else{
            document.getElementsByClassName("information__notify")[0].removeChild
            if(checkMail.password === userPassword) {
                if(document.getElementById("checkbox").checked){
                    checkMail.checkbox = true
                }
                else{
                    checkMail.checkbox = false   
                }
                let nearlyLogin = localStorage.getItem("nearlyLogin") ? JSON.parse(localStorage.getItem("nearlyLogin")) : []
                nearlyLogin = checkMail
                
                nearlyLogin.isLogin = true
                localStorage.setItem('nearlyLogin', JSON.stringify(nearlyLogin))
                
                let nearlyLoginSessioin = sessionStorage.getItem("nearlyLoginSessioin") ? JSON.parse(sessionStorage.getItem("nearlyLoginSessioin")) : []
                nearlyLoginSessioin = nearlyLogin
                sessionStorage.setItem('nearlyLoginSessioin', JSON.stringify(nearlyLoginSessioin))
                
                window.location.href="../html/main.html"
            }
            else {
                document.getElementsByClassName("information__notify")[0].innerHTML = `<p class="error notify-error">*Password is not correct</p>`
            }
        }
    }
}
function redirecSignUp(){
    window.location.href="../html/signUp.html";
}

function checkExistMail(mail){
    if(!mail) {
        document.getElementsByClassName("error mail-error")[0].innerHTML = "*Please input your mail"
        document.getElementsByClassName("information__notify")[0].innerHTML = ""
    }
    else{
        document.getElementsByClassName("error mail-error")[0].innerHTML = ""

    }
}
function checkExistPassword(password){
    if(!password) {
        document.getElementsByClassName("error password-error")[0].innerHTML = "*Please input your password"
        document.getElementsByClassName("information__notify")[0].innerHTML = ""
    }
    else{
        document.getElementsByClassName("error password-error")[0].innerHTML = ""

    }
}
function changeClass(e){
    e.querySelector("i").classList.toggle('fa-eye-slash');
    let input = e.previousElementSibling
    if(input.type == "password") {
        input.type = "text"
    }
    else {
        input.type = "password"
    }
}