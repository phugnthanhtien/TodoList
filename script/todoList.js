let nearlyLogin = localStorage.getItem("nearlyLogin") ? JSON.parse(localStorage.getItem("nearlyLogin")) : []
let information = localStorage.getItem("information") ? JSON.parse(localStorage.getItem("information")) : []
let nearlyLoginSessioin = sessionStorage.getItem("nearlyLoginSessioin") ? JSON.parse(sessionStorage.getItem("nearlyLoginSessioin")) : []

let indexlogin
for(let i=0; i< information.length; i++){
    indexlogin =  information[i].mail == nearlyLogin.mail ? i : 0;
}
window.onload = function checkIsLogin(){
    if(nearlyLogin.length == 0 || nearlyLogin.isLogin == false){
        window.location.href = "../html/signIn.html"
    }
    else if(nearlyLogin.checkbox == false && nearlyLoginSessioin.length == 0 && nearlyLogin.isLogin == true){
        nearlyLogin.isLogin = false
        localStorage.setItem("nearlyLogin", JSON.stringify(nearlyLogin))
        window.location.href = "../html/signIn.html"
    }
    else{
        createTodoList()
        document.getElementsByClassName("userbar__name")[0].innerHTML = "Hello, " + information[indexlogin].fullname
    }
}
document.getElementById("userbar__logOut").onclick = function logOut(){
    nearlyLogin.isLogin = false
    localStorage.setItem("nearlyLogin", JSON.stringify(nearlyLogin))
    window.location.href = "../html/signIn.html"
}
function changeClass(e){
    e.querySelector("i").classList.toggle('fa-circle-check');
    if(e.querySelector("i").className == 'fa-regular fa-circle fa-circle-check') {
        e.style.color = "#71ff54"
    }
    else{
        e.style.color = "#7e868b"
    }
}
function addList(){
    let valuelist = document.getElementById("add-input").value
    if(valuelist) {
        information[indexlogin].todoList.push(valuelist)
        localStorage.setItem("information", JSON.stringify(information))
        createTodoList()
    }
    document.getElementById("add-input").value = ''
}
function editList(index, element){
    let id = "menu-bar__edit--" + index
    let thisEdit = document.getElementById(id)
    let i = thisEdit.querySelector("i")
    let content = document.getElementById(index.toString())
    content.toggleAttribute("contenteditable")
    if(content.hasAttribute('contenteditable')){
        i.classList.replace('fa-pen-to-square', 'fa-floppy-disk');
        thisEdit.style.color = "blue"
    }
    else{
        information[indexlogin].todoList[index] = content.textContent
        i.classList.replace('fa-floppy-disk', 'fa-pen-to-square' );
        thisEdit.style.color = "#800080"
    }
    localStorage.setItem("information", JSON.stringify(information))
}
function removeContent(index, element){
    let remove = document.getElementById(index.toString()).textContent
    information[indexlogin].todoList.forEach((item, indexloginContent) => {
        if(indexloginContent == index){
            information[indexlogin].todoList.splice(indexloginContent, 1)
        }
    })
    localStorage.setItem("information", JSON.stringify(information))
    document.getElementById(index.toString()).parentElement.parentElement.parentElement.remove()
}
function createTodoList() {
    let list = document.getElementById('menu')
    let li = ''
    information[indexlogin].todoList.forEach((element, index)  => {
        li +=   `<div class = 'menu-bar'>
                    <div class = "menu-bar__content">
                        <div class = "menu-bar__icon" onclick = changeClass(this)>
                            <i class="fa-regular fa-circle"></i>
                        </div>
                        <div class = "menu-bar__list">
                            <div class = "menu-bar__name" id = "${index}">${element}</div>
                        </div>
                    </div>
                    <div class = "menu-bar__option">
                        <div class = "menu-bar__edit menu-bar__edit--unchange" id = "menu-bar__edit--${index}" onclick = "editList(${index}, '${element}')">
                            <i class = "fa-solid fa-pen-to-square"></i>
                        </div>
                        <div class = "menu-bar__delete" onclick = "removeContent(${index}, '${element}')"">
                            <i class = "fa-solid fa-trash-can"></i>
                        </div>
                    </div>
                </div>
        `
    });
    list.innerHTML = li
    document.getElementById("add-button").onclick = addList
}
document.getElementById("userbar__avatar").onclick = function dropDownOption() {
    if(document.getElementsByClassName("userbar__content")[0].style.display == "block"){
        document.getElementsByClassName("userbar__content")[0].style.display = "none"
    }
    else{
        document.getElementsByClassName("userbar__content")[0].style.display = "block"
    }
}