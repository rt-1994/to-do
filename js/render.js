'use strict'

import { Store } from "./utils.js"

class Task {
    constructor(desc, date, status, priority) {
        this.id = this.generateId()
        this.desc = desc
        this.date = date
        this.status = status
        this.priority = priority
    }

    generateId() {
        return Math.floor(Math.random() * 100000000)
    }

    create() {
        let task = {
            id: this.id,
            desc: this.desc,
            date: this.date,
            status: this.status,
            important: this.priority
        }

        let tasks = localStorage['tasks'] ? JSON.parse(localStorage['tasks']) : []

        tasks.push(task)

        localStorage.setItem("tasks", JSON.stringify(tasks))
    }

    add(id) {
        let taskStatus = ""
        if (this.priority && this.status == "to-do") {
            taskStatus = "important"
        } else if (this.priority && this.status == "done") {
            taskStatus = "done"
        } else if (!this.priority && this.status == "done") {
            taskStatus = "to-do"
        } else if (!this.priority && this.status == "to-do") {
            taskStatus = "to-do"
        }

        let item =
            `<div class="task-list-item" data-id="${id}" id="${id}">
                <div class="task-list-item-indicator to-do ${taskStatus}">
                    <span></span>
                </div>
                <p class="task-list-item-text">${this.desc}</p>
                <p class="tast-list-item-date">${this.date}</p>
                <button type="submit" class="btn btn-danger task-list-btn">Delete</button>
                <button type="submit" class="btn btn-info task-list-btn">Edit</button>
            </div>`
        return item
    }

    edit(id) {
        let tasks = JSON.parse(localStorage['tasks'])
        let taskItem = document.getElementById(id)
        tasks.map(function (item) {
            if (id == String(item.id) && item.status != "done") {
                item.status = 'done'
            } else if (id == String(item.id)) {
                item.status = 'to-do'
            }
        });

        localStorage.setItem("tasks", JSON.stringify(tasks))

    }
}


class Render {
    constructor(parrent, content) {
        this.parrent = parrent
        this.content = content
    }

    render() {
        this.parrent.insertAdjacentHTML('beforeend', this.content)
    }
}


export { Render, Task }

