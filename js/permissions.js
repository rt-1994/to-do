import { User } from "./user.js"
import { Notification } from "./utils.js"

let login = document.querySelector('#login')
let password = document.querySelector('#password')
let generatePass = document.querySelector('#generate')
let showPass = document.querySelector('#showPassword')
let makeAdmin = document.querySelector('#make-admin')
let modalLogin = document.querySelector('#modal-login')
let modalPassword = document.querySelector('#modal-password')
let modalGeneratePass = document.querySelector('#modal-generate')
let modalshowPass = document.querySelector('#modal-show-password')
let modalMakeAdmin = document.querySelector('#modal-make-admin')
let saveBtn = document.querySelector('.save-btn')
let modalSaveBtn = document.querySelector('.modal-save-btn')
let backBtn = document.querySelector('.back-btn')
let userList = document.querySelector('.user-list')
let settingsModal = document.querySelector('.settings-modal')
let exitBtn = document.querySelector('.modal-exit-btn')
let rules = document.querySelector('.modal-drag-and-drop')
let ruleLists = document.querySelectorAll('.rule-list')
let active = document.querySelector('.active-list')
let available = document.querySelector('.available-list')
let userStatus = 'user'
let canEdit = false
let canDelete = false
let canAdd = false

new User().addUser(userList)


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
            new User().updateUsers(userList)
            new User().addUser(userList)
        }
    }
    else {
        new Notification('User already exists', 'red').show()
    }
})

backBtn.addEventListener('click', function () {
    window.location.href = 'main.html'
})

userList.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("delete")) {
        new Notification('User is deleted', 'red').show()
        let id = event.target.closest('.user-list-item').getAttribute('id')
        event.target.closest('.user-list-item').remove()
        new User().removeUser(id)
        new User().updateUsers(userList)
        new User().addUser(userList)
    }

    if (event.target && event.target.classList.contains("change")) {
        let id = event.target.closest('.user-list-item').getAttribute('id')
        settingsModal.classList.remove("hide")
        settingsModal.setAttribute('id', id)
        let user = new User().getUser(id)
        modalLogin.value = user.login
        modalPassword.value = user.password
        new User().clearPermissions(active)
        new User().clearPermissions(available)
        new User().addPermissions(id, active, available)

    }
})

exitBtn.addEventListener('click', function () {
    settingsModal.classList.add("hide")
})



modalshowPass.addEventListener('click', function () {
    if (modalshowPass.checked == true) {
        modalPassword.type = 'text'
    }
    else {
        modalPassword.type = 'password'
    }
})

modalGeneratePass.addEventListener('click', function () {
    if (modalGeneratePass.checked == true) {
        let pass = new User().generatePassword()
        modalPassword.value = pass
    }
})

modalMakeAdmin.addEventListener('click', function () {
    if (modalMakeAdmin.checked == true) {
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

function checkStatus() {
    for (let i = 0; i < active.childNodes.length; i++) {
        if (active.childNodes[i].getAttribute('data-id') == 'canEdit') {
            canEdit = true
        }
        if (active.childNodes[i].getAttribute('data-id') == 'canDelete') {
            canDelete = true
        }
        if (active.childNodes[i].getAttribute('data-id') == 'canAdd') {
            canAdd = true
        }
    }

    for (let i = 0; i < available.childNodes.length; i++) {
        if (available.childNodes[i].getAttribute('data-id') == 'canEdit') {
            canEdit = false
        }
        if (available.childNodes[i].getAttribute('data-id') == 'canDelete') {
            canDelete = false
        }
        if (available.childNodes[i].getAttribute('data-id') == 'canAdd') {
            canAdd = false
        }
    }

    console.log(canAdd);
    console.log(canEdit);
    console.log(canDelete);
}

rules.addEventListener("mousemove", function (event) {
    checkStatus()
    if (event.target && event.target.classList.contains("rule")) {
        let rule = event.target.closest('.rule')
        rule.draggable = true;
        new User().dragAndDrop(rule, ruleLists)
    }
})

modalSaveBtn.addEventListener('click', function () {
    new User().saveUser(settingsModal.getAttribute('id'), modalLogin.value, modalPassword.value, userStatus, canEdit, canDelete, canAdd)
    settingsModal.classList.add("hide")
    modalshowPass.checked = false
    modalGeneratePass.checked = false
    modalMakeAdmin.checked = false
})