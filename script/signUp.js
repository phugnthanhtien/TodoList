window.onload = function loadSignUp() {
    let nearlyLogin = localStorage.getItem("nearlyLogin") ? JSON.parse(localStorage.getItem("nearlyLogin")) : []
    if(nearlyLogin.isLogin == true) {
        window.location.href = '../html/signIn.html'
    }
}
function validateMail(mail, checked){
    if(!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(mail))){
        document.getElementsByClassName('mail-error')[0].innerHTML = '*Email is not valid'
    }
    else{
        let information = localStorage.getItem("information") ? JSON.parse(localStorage.getItem("information")) : []
        let find = information.find(value => value.mail === mail)
        if(!find){
            checked[0] = true
            document.getElementsByClassName('mail-error')[0].innerHTML = ''
        }
        else{
            document.getElementsByClassName('mail-error')[0].innerHTML = 'Email already exists'
        }
    }
}
function validateFullname(fullname, checked){
    if(!(/\s/.test(fullname))){
        document.getElementsByClassName('fullname-error')[0].innerHTML = '*Name must have at least 2 words'
    }
    else{
        checked[1] = true
        document.getElementsByClassName('fullname-error')[0].innerHTML = ''
    }
}
function validatePassword(password, checked){
    if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,50}$/)){
        document.getElementsByClassName('password-error')[0].innerHTML = '*Password must have at least 8 characters,1 special character, 1 numeric digit, 1 uppercase and 1 lowercase letter '
    }
    else{
        checked[2] = true
        document.getElementsByClassName('password-error')[0].innerHTML = ''
    }
}
function validateGender(gender, checked){
    if(!gender){
        document.getElementsByClassName('gender-error')[0].innerHTML = '*You must chose gender'
    }
    else{
        checked[3] = true
        document.getElementsByClassName('gender-error')[0].innerHTML = ''
    }
}
function validateAge(age, checked){
    if(age < 18 || age > 100){
        document.getElementsByClassName('age-error')[0].innerHTML = '*Age must be 18+ and less than 100'
    }
    else{
        checked[4] = true
        document.getElementsByClassName('age-error')[0].innerHTML = ''
    }
}
document.getElementById('submit-button--signup').onclick = function onSubmitForm(){
    const mail = document.getElementById('mail').value
    const fullname = document.getElementById('fullname').value
    const password = document.getElementById('password').value
    const age = document.getElementById('age').value
    const gender = document.querySelector('input[type=radio][name=gender-click]:checked');
    let checked = [false, false, false, false, false]
    validateMail(mail, checked)
    validateFullname(fullname, checked)
    validatePassword(password, checked)
    validateGender(gender, checked)
    validateAge(age,checked)
    if(!checked.includes(false)){
        let information = localStorage.getItem("information") ? JSON.parse(localStorage.getItem("information")) : []
        information.push({
            mail: mail,
            fullname: fullname,
            password: password,
            gender: gender.value,
            age: age,
            checkbox: false,
            isLogin: false,
            todoList: ["Javascript", "CSS", "HTML", "Ruby"]
        })
        localStorage.setItem('information', JSON.stringify(information))
        window.location.href="../html/signIn.html"
    }
}
function redirecLogin(){
    window.location.href = "../html/signIn.html"
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