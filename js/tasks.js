import {Render} from './render.js'

class Task {
    constructor(desc, date, status, priority) {
        this.id = this.generateId()
        this.desc = desc
        this.date = date
        this.status = status
        this.priority = priority
        this.tasks = JSON.parse(localStorage['tasks'])
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
        let taskIndicatorStatus = ""
        let taskTextStatus = ""
        if (this.priority && this.status == "to-do") {
            taskIndicatorStatus = "important"
        } else if (this.priority && this.status == "done") {
            taskIndicatorStatus = "important done"
            taskTextStatus = "through"
        } else if (!this.priority && this.status == "done") {
            taskIndicatorStatus = "done"
            taskTextStatus = "through"

        } else if (!this.priority && this.status == "to-do") {
            taskIndicatorStatus = "to-do"
            taskTextStatus = ""

        }

        let item =
            `<div class="task-list-item" data-id="${id}" id="${id}">
                <div class="task-list-item-indicator to-do ${taskIndicatorStatus}">
                    <span></span>
                </div>
                <p class="task-list-item-text ${taskTextStatus}">${this.desc}</p>
                <p class="tast-list-item-date">${this.date}</p>
                <button type="submit" class="btn btn-danger task-list-btn delete">Delete</button>
                <button type="submit" class="btn btn-info task-list-btn edit">Edit</button>
            </div>`
        return item
    }

    edit(id) {

        this.tasks.map(function (item) {
            if (id == String(item.id) && item.status != "done") {
                item.status = 'done'
            } else if (id == String(item.id)) {
                item.status = 'to-do'
            }
        });

        localStorage.setItem("tasks", JSON.stringify(this.tasks))

    }

    remove(id) {
        this.tasks.map(function (item, index, array) {
            if (id == String(item.id)) {
                array.splice(index, 1)
            }
        });

        localStorage.setItem("tasks", JSON.stringify(this.tasks))
    }

    editTask(id) {
        return this.tasks.find(item => String(item.id) == id);
    }
    saveTask(id, text, date) {
        this.tasks.map(function (item, index, array) {
            if (id == String(item.id)) {
                item.desc = text
                item.date = date
            }
        });

        localStorage.setItem("tasks", JSON.stringify(this.tasks))
    }

    search(value) {

        this.tasks.filter((item) => {
            return (
                item.desc.toLowerCase().startsWith(value.toLowerCase())
            );
        }).forEach(value => {
            let task = new Task(value.desc, value.date, value.status, value.important)
            let taskRender = new Render(document.querySelector('.task-list'), task.add(value.id))
            taskRender.render()
        })
    }
}


export { Task }