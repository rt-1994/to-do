import { User } from "./user.js";
import { Notification } from "./utils.js";

let login = document.querySelector('#login')
let password = document.querySelector('#password')
let confirm = document.querySelector('#confirm')
let saveButton = document.querySelector('.save-btn')
let generatePass = document.querySelector('#generate')
let showPass = document.querySelector('#showPassword')
let exitButton = document.querySelector('.exit-btn')

showPass.addEventListener('click', function(){
    if(showPass.checked == true){
        password.type = 'text'
        confirm.type = 'text'
    }
    else{
        password.type = 'password'
        confirm.type = 'password'
    }
})

generatePass.addEventListener('click', function(){
    if(generatePass.checked == true){
      let pass = new User().generatePassword()
      password.value = pass
      confirm.value = pass
    }
})

saveButton.addEventListener('click', function(){
    if(password.value != confirm.value || password.value =="" || confirm.value == ""){
        new Notification('Password does not match or is incorrect', 'red').show()
    }
    else if(login.value.length < 4){
        new Notification('Login is too short', 'red').show()
    }
    else{
        new User().editUserInfo(JSON.parse(localStorage['currentUser']).id, login.value, password.value)
        new Notification('User data changed', 'green').show()
        login.value = ""
        password.value = ""
        confirm.value = ""
    }
})

exitButton.addEventListener('click', ()=> window.location.href = 'main.html')