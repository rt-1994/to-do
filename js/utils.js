'use strict'

import { Render } from "./render.js"
import { Task } from "./tasks.js"

class Store {
    constructor() {

    }

    getUsersFromLocalStore(){
        if (localStorage['users']) {
            return JSON.parse(localStorage['users'])
        }
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


class Notification {
    constructor(message, color) {
        this.message = message
        this.color = color
    }

    show() {
        let notification =
            `<div class="notification ${this.color}">
            <p>${this.message}</p>
        </div>`

        new Render(document.querySelector('.notifications'), notification).renderBegin()

        setTimeout(function () {
            document.querySelector('.notification').remove()
        }, 15000)
    }

}

export { Store, Notification }