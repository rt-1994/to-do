'use strict'

import { Render } from "./render.js"
import { User } from "./user.js"
import { Task } from "./tasks.js"
import { Store, Notification } from "./utils.js"

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
let tasksColumn = document.querySelectorAll('.tasks-column')
let categoryInner = document.querySelector('.main-content-category-inner')
let inProcessCategory = document.querySelector('#in-process')
let importantCategory = document.querySelector('#important')
let doneCategory = document.querySelector('#done')
let logout = document.querySelector('.logout')
let nikname = document.querySelector('.header-profile-text')
let permissions = document.querySelector('.permissions')
let addTask = document.querySelector('.header-add')

new Store().getFromLocalStore()

logout.addEventListener('click', ()=>{
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html'
})

if(JSON.parse(localStorage['currentUser'])){
    nikname.innerHTML = JSON.parse(localStorage['currentUser']).login
}
else{
    nikname.innerHTML = 'anonymous'
}

addBtn.addEventListener('click', function () {
    let importantStatus = important.checked ? true : false
    if(importantStatus){
        new Notification('Task status is important', 'orange').show()
    }
    let task = new Task(description.value, date.value, "to-do", importantStatus)
    task.create()
    let taskRender = new Render(document.querySelector('.task-list'),
        task.add(JSON.parse(localStorage['tasks'])[JSON.parse(localStorage['tasks']).length - 1].id))
    taskRender.render()

    new Store().updateTasks(taskList)
    new Store().updateCategories(tasksColumn)
    new Store().getFromLocalStore()
    new Store().getWidthCategories(inProcessCategory, importantCategory, doneCategory)

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
        new Store().updateTasks(taskList)
        new Store().updateCategories(tasksColumn)
        new Store().getFromLocalStore()
        new Store().getWidthCategories(inProcessCategory, importantCategory, doneCategory)
    }

    if (event.target && event.target.classList.contains("delete")) {
        new Notification('Task is deleted', 'red').show()
        let id = event.target.closest('.task-list-item').getAttribute('data-id')
        event.target.closest('.task-list-item').remove()
        new Task().remove(id)
        new Store().updateTasks(taskList)
        new Store().updateCategories(tasksColumn)
        new Store().getFromLocalStore()
        new Store().getWidthCategories(inProcessCategory, importantCategory, doneCategory)
    }

    if (event.target && event.target.classList.contains("edit")) {
        let id = event.target.closest('.task-list-item').getAttribute('data-id')
        editModal.classList.add('show')
        let task = new Task()
        let taskItem = task.editTask(id)
        editModal.setAttribute('id', taskItem.id)
        editModalText.value = taskItem.desc
        editModalDate.value = taskItem.date
        new Store().updateTasks(taskList)
        new Store().updateCategories(tasksColumn)
        new Store().getFromLocalStore()
        new Store().getWidthCategories(inProcessCategory, importantCategory, doneCategory)
    }
})

exitButton.addEventListener('click', () => editModal.classList.remove('show'))
saveButton.addEventListener('click', (event) => {
    new Notification('Task is changed', 'blue').show()
    editModal.classList.remove('show')
    let task = new Task()
    let taskItem = task.saveTask(editModal.id, editModalText.value, editModalDate.value)
    new Store().updateTasks(taskList)
    new Store().updateCategories(tasksColumn)
    new Store().getFromLocalStore()
    new Store().getWidthCategories(inProcessCategory, importantCategory, doneCategory)
})

searchInput.addEventListener('input', () => {
    new Store().updateTasks(taskList)
    let task = new Task()
    task.search(searchInput.value)
})

new Store().getWidthCategories(inProcessCategory, importantCategory, doneCategory)

categoryInner.addEventListener("mousemove", function (event) {
    if (event.target && event.target.classList.contains("task-item")) {
        let task = event.target.closest('.task-item')
        task.draggable = true;
        new Task().dragAndDrop(task, tasksColumn)
    }
    new Store().updateTasks(taskList)
    new Store().getFromLocalStore()
})

categoryInner.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("delete")) {
        let id = event.target.closest('.task-item').getAttribute('id')
        event.target.closest('.task-item').remove()
        new Task().remove(id)
        new Store().updateTasks(taskList)
        new Store().updateCategories(tasksColumn)
        new Store().getFromLocalStore()
        new Store().getWidthCategories(inProcessCategory, importantCategory, doneCategory)
        new Notification('Task is deleted', 'red').show()
    }

    if (event.target && event.target.classList.contains("edit")) {
        let id = event.target.closest('.task-item').getAttribute('id')
        editModal.classList.add('show')
        let task = new Task()
        let taskItem = task.editTask(id)
        editModal.setAttribute('id', taskItem.id)
        editModalText.value = taskItem.desc
        editModalDate.value = taskItem.date
        new Store().updateTasks(taskList)
        new Store().updateCategories(tasksColumn)
        new Store().getFromLocalStore()
        new Store().getWidthCategories(inProcessCategory, importantCategory, doneCategory)
    }
})

if(!new User().checkUserPermission().canAdd){
    addTask.classList.add('hide')
}

if(new User().checkUserPermission().status != 'admin'){
    permissions.classList.add('hide')
}