import { User } from "./user.js";
import { Store } from "./utils.js";
import { Notification } from "./utils.js";
import { user } from "./data.js";

if(!localStorage['users']){
    localStorage.setItem("users", JSON.stringify(user))
} 

let login = document.querySelector('#login')
let password = document.querySelector('#password')
let loginBtn = document.querySelector('.login-btn')

let users = new Store().getUsersFromLocalStore()

loginBtn.addEventListener('click', ()=>{
    users.forEach(function(user){
        if(user.login == login.value && user.password == password.value){
            localStorage.setItem("currentUser", JSON.stringify({id: user.id, login: user.login}))
            window.location.href = 'main.html'
        }
    })
    new Notification('Login or password incorrect', 'red').show()
})


