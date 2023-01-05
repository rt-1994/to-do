// import tasks from "./data.js";
let indicator = document.querySelector('.task-list-item-indicator')
let description = document.querySelector('.header-add-text')
let date = document.querySelector('.header-add-date')
let important = document.querySelector('#check')
let addBtn = document.querySelector('.header-add-btn')


class Task {
    constructor(desc, date, status, priority) {
        this.id = this.generateId()
        this.desc = desc
        this.date = date
        this.status = status
        this.priority = priority.checked ? true:false
    }

    generateId(){
        return Math.floor(Math.random() * 100000000) 
    }

    status(){

    }

    create() {
        let task = {
            id: this.id,
            desc: this.desc,
            date: this.date,
            status: this.status,
            important: this.priority
        }
        
        let tasks = localStorage['tasks'] ? JSON.parse(localStorage['tasks']):[]

        tasks.push(task)

        localStorage.setItem("tasks", JSON.stringify(tasks))
    }

    add() {
        let item =
            `<div class="task-list-item">
            <div class="task-list-item-indicator">
                <span ></span>
            </div>
            <p class="task-list-item-text">${this.desc}</p>
            <span class="tast-list-item-date">${this.date}</span>
            <button type="submit" class="btn btn-danger task-list-btn">Delete</button>
            <button type="submit" class="btn btn-info task-list-btn">Edit</button>
        </div>`


        return item
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

// console.log(Array.isArray(localStorage['tasks']));

if(localStorage['tasks']){
    JSON.parse(localStorage['tasks']).forEach(value => {
        let task = new Task(value.desc, value.date, value.status, value.important)
        let taskRender = new Render(document.querySelector('.task-list'), task.add())
        taskRender.render()
    })
}


   


addBtn.addEventListener('click',function(){
    let task = new Task(description.value, date.value, "to-do", important)
    task.create()
    let taskRender = new Render(document.querySelector('.task-list'), task.add())
    taskRender.render()
})





