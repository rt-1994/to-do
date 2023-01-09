'use strict'

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
                new Render(document.querySelector('.task-list'), task.add(value.id)).render()
            })
        }
    }

    getWidthCategories(parrent1, parrent2, parrent3) {
        let tasks = {
            toDo: [],
            important: [],
            done: []
        }
        if (localStorage['tasks']) {
            JSON.parse(localStorage['tasks']).forEach(value => {
                if (value.status == 'to-do' && !value.important) {
                    tasks.toDo.push(value)
                } else if (value.status == 'to-do' && value.important) {
                    tasks.important.push(value)
                } else {
                    tasks.done.push(value)
                }
            })
        }

        tasks.toDo.forEach(function (item) {
            let content = new Task().addWidthCategory(item)
            new Render(parrent1, content).render()

        })
        tasks.important.forEach(function (item) {
            let content = new Task().addWidthCategory(item)
            new Render(parrent2, content).render()

        })
        tasks.done.forEach(function (item) {
            let content = new Task().addWidthCategory(item)
            new Render(parrent3, content).render()

        })
    }

    updateTasks(parrent) {
        while (parrent.firstChild) {
            parrent.removeChild(parrent.firstChild);
        }
    }

    updateCategories(parrent) {
        parrent.forEach((child) => {
            while (child.firstChild) {
                child.removeChild(child.firstChild);
            }
        })
    }
}

export { Store }