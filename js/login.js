import { User } from "./user.js";
import { Store } from "./utils.js";
import { Notification } from "./utils.js";

new User().addAdminUser()

let login = document.querySelector('#login')
let password = document.querySelector('#password')
let loginBtn = document.querySelector('.login-btn')

let users = new Store().getUsersFromLocalStore()

loginBtn.addEventListener('click', ()=>{
    users.forEach(function(user){
        if(user.login == login.value && user.password == password.value){
            localStorage.setItem("currentUser", JSON.stringify({id: user.id, login: user.login}))

            // new User().checkUserPermission()

            window.location.href = 'main.html'
        }
        else{
            new Notification('Login or password incorrect', 'red').show()
        }
    })
})


