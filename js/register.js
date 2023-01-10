import {User} from "./user.js"
import {Notification} from "./utils.js"

let login = document.querySelector('#login')
let password = document.querySelector('#password')
let confirm = document.querySelector('#confirm')
let generatePass = document.querySelector('#generate')
let showPass = document.querySelector('#showPassword')
let registerBtn = document.querySelector('.register-btn')

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

registerBtn.addEventListener('click', function(){
    if(password.value != confirm.value || password.value =="" || confirm.value == ""){
        new Notification('Password does not match or is incorrect', 'red').show()
    }
    else if(login.value.length < 4){
        new Notification('Login is too short', 'red').show()
    }
    else{
        new User(login.value, password.value).signUp()
        new Notification('User registered', 'green').show()
        login.value = ""
        password.value = ""
        confirm.value = ""
    }
})