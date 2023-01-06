'use strict'

// window.location.href = "/pages/login.html"

import { Render } from "./render.js"
import { Task } from "./tasks.js"

class User {
    constructor(login, password, status) {
        this.id = this.generateId()
        this.login = login
        this.password = password
        this.status = status
    }

    generateId() {
        return Math.floor(Math.random() * 100000000)
    }

    register(confirm) {
        let user = {
            id: this.id,
            login: this.login,
            password: this.password,
            status: "user",
        }

        if (user.password == confirm) {
            let users = localStorage['users'] ? JSON.parse(localStorage['users']) : []

            users.push(user)

            localStorage.setItem("users", JSON.stringify(users))
        }
    }
}

class Store {
    constructor() {

    }

    getFromLocalStore() {
        if (localStorage['tasks']) {
            JSON.parse(localStorage['tasks']).forEach(value => {
                let task = new Task(value.desc, value.date, value.status, value.important)
                let taskRender = new Render(document.querySelector('.task-list'), task.add(value.id))
                taskRender.render()
            })
        }
    }
}

export { Store }