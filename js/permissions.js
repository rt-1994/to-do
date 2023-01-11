import { User } from "./user.js"
import { Notification } from "./utils.js"

let login = document.querySelector('#login')
let password = document.querySelector('#password')
let generatePass = document.querySelector('#generate')
let showPass = document.querySelector('#showPassword')
let makeAdmin = document.querySelector('#make-admin')
let saveBtn = document.querySelector('.save-btn')
let backBtn = document.querySelector('.back-btn')
let userStatus = 'user'
let canEdit = false
let canDelete = false
let canAdd = false

showPass.addEventListener('click', function () {
    if (showPass.checked == true) {
        password.type = 'text'
    }
    else {
        password.type = 'password'
    }
})

generatePass.addEventListener('click', function () {
    if (generatePass.checked == true) {
        let pass = new User().generatePassword()
        password.value = pass
    }
})

makeAdmin.addEventListener('click', function () {
    if (makeAdmin.checked == true) {
        userStatus = 'admin'
        canEdit = true
        canDelete = true
        canAdd = true
        new Notification('Administrator enabled', 'green').show()
    }
    else {
        userStatus = 'user'
        canEdit = false
        canDelete = false
        canAdd = false
    }
})

saveBtn.addEventListener('click', function () {
    if (!new User().checkUser(login.value)) {
        if (password.value.length < 4) {
            new Notification('Password is too short', 'red').show()
        }
        else if (login.value.length < 4) {
            new Notification('Login is too short', 'red').show()
        }
        else {
            new User(login.value, password.value, userStatus, canEdit, canDelete, canAdd).signUp()
            new Notification('User registered', 'green').show()
            login.value = ""
            password.value = ""
        }
    }
    else {
        new Notification('User already exists', 'red').show()
    }
})

backBtn.addEventListener('click', function () {
    window.location.href = 'main.html'
})

