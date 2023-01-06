'use strict'

import {Render, Task} from "./render.js"
import {Store} from "./utils.js"

let indicator = document.querySelector('.task-list-item-indicator')
let description = document.querySelector('.header-add-text')
let date = document.querySelector('.header-add-date')
let important = document.querySelector('#check')
let addBtn = document.querySelector('.header-add-btn')
let taskList = document.querySelector('.task-list')
let tasks = document.querySelectorAll('.task-list-item')



let store = new Store()
store.getFromLocalStore()

addBtn.addEventListener('click',function(){
    let importantStatus = important.checked ? true:false
    let task = new Task(description.value, date.value, "to-do", importantStatus)
    task.create()
    let taskRender = new Render(document.querySelector('.task-list'), 
    task.add(JSON.parse(localStorage['tasks'])[JSON.parse(localStorage['tasks']).length-1].id))
    taskRender.render()

    date.value = ""
    description.value = ""
    important.checked = false
})

taskList.addEventListener("click", function(event){
    if(event.target && event.target.classList.contains("task-list-item-text")){
        let id = event.target.closest('.task-list-item').getAttribute('data-id')
        event.target.previousElementSibling.classList.toggle('done') 
        event.target.classList.toggle('through') 

        let task = new Task()
        task.edit(id)
    } 
})





