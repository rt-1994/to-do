'use strict'

import { Render } from "./render.js"
import { Task } from "./tasks.js"
import { Store } from "./utils.js"

let description = document.querySelector('.header-add-text')
let date = document.querySelector('.header-add-date')
let important = document.querySelector('#check')
let addBtn = document.querySelector('.header-add-btn')
let taskList = document.querySelector('.task-list')
let editModal = document.querySelector('.edit-modal')
let exitButton = document.querySelector('.exit-btn')
let saveButton = document.querySelector('.save-btn')
let editModalText = document.querySelector('#edit-modal-text')
let editModalDate = document.querySelector('#edit-modal-date')
let searchInput = document.querySelector('#main-search')

let store = new Store()
store.getFromLocalStore()

addBtn.addEventListener('click', function () {
    let importantStatus = important.checked ? true : false
    let task = new Task(description.value, date.value, "to-do", importantStatus)
    task.create()
    let taskRender = new Render(document.querySelector('.task-list'),
        task.add(JSON.parse(localStorage['tasks'])[JSON.parse(localStorage['tasks']).length - 1].id))
    taskRender.render()
    date.value = ""
    description.value = ""
    important.checked = false
})

taskList.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("task-list-item-text")) {
        let id = event.target.closest('.task-list-item').getAttribute('data-id')
        event.target.previousElementSibling.classList.toggle('done')
        event.target.classList.toggle('through')
        new Task().edit(id)
    }

    if (event.target && event.target.classList.contains("delete")) {
        let id = event.target.closest('.task-list-item').getAttribute('data-id')
        event.target.closest('.task-list-item').remove()
        new Task().remove(id)
    }

    if (event.target && event.target.classList.contains("edit")) {
        let id = event.target.closest('.task-list-item').getAttribute('data-id')
        editModal.classList.add('show')
        let task = new Task()
        let taskItem = task.editTask(id)
        editModal.setAttribute('id', taskItem.id)
        editModalText.value = taskItem.desc
        editModalDate.value = taskItem.date
    }
})

exitButton.addEventListener('click', () => editModal.classList.remove('show'))
saveButton.addEventListener('click', (event) => {
    editModal.classList.remove('show')
    let task = new Task()
    let taskItem = task.saveTask(editModal.id, editModalText.value, editModalDate.value)
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    new Store().getFromLocalStore()
})

searchInput.addEventListener('input', ()=>{
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    let task = new Task()
    task.search(searchInput.value)
})
