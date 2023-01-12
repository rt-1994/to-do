import { Render } from "./render.js"
class User {
    constructor(login, password, status = "user", canEdit = false, canDelete = false, canAdd = false) {
        this.id = this.generateId()
        this.login = login
        this.password = password
        this.status = status
        this.canEdit = canEdit
        this.canDelete = canDelete
        this.canAdd = canAdd
        this.users = JSON.parse(localStorage['users']) ? JSON.parse(localStorage['users']) : []
    }



    addUser(parrent) {
        let num = 1
        this.users.forEach(element => {
            let item =
                `<div class="user-list-item" id="${element.id}">
                <div>
                    <span>${num}.</span>
                    <span>${element.login}</span>
                </div>
                <div>
                    <button type="submit" class="btn btn-danger task-list-btn delete">Delete</button>
                    <button type="submit" class="btn btn-info task-list-btn change">Change</button>
                </div>
            </div>`
            new Render(parrent, item).render()
            num++
        });
    }

    addPermissions(id, active, available) {

        let user = this.users.find((user) => user.id == id)
        let canEdit = `<div class="rule" data-id='canEdit'>Can edit</div>`
        let canDelete = `<div class="rule" data-id='canDelete'>Can delete</div>`
        let canAdd = `<div class="rule" data-id='canAdd'>Can add</div>`

        if (user.canAdd) {
            new Render(active, canAdd).render()
        } else {
            new Render(available, canAdd).render()
        }

        if (user.canEdit) {
            new Render(active, canEdit).render()
        } else {
            new Render(available, canEdit).render()
        }

        if (user.canDelete) {
            new Render(active, canDelete).render()
        } else {
            new Render(available, canDelete).render()
        }


    }

    getUser(id) {
        return this.users.find(item => String(item.id) == id);
    }

    saveUser(id, login, password, status, canEdit, canDelete, canAdd) {

        this.users.map(function (item, index, array) {
            if (id == String(item.id)) {
                console.log(item);
                item.login = login
                item.password = password
                item.status = status
                item.canEdit = canEdit
                item.canDelete = canDelete
                item.canAdd = canAdd
            }
        });

        localStorage.setItem("users", JSON.stringify(this.users))
    }



    dragAndDrop(rule, ruleLists) {

        for (let ruleList of ruleLists) {
            ruleList.ondragover = (event) => event.preventDefault()
            ruleList.ondrop = () => {
                ruleList.append(rule)
            }
        }

       
    }

    removeUser(id) {
        this.users.map(function (item, index, array) {
            if (id == String(item.id)) {
                array.splice(index, 1)
            }
        });

        localStorage.setItem("users", JSON.stringify(this.users))

    }

    updateUsers(parrent) {
        while (parrent.firstChild) {
            parrent.removeChild(parrent.firstChild);
        }
    }

    clearPermissions(parrent) {
        while (parrent.firstChild) {
            parrent.removeChild(parrent.firstChild);
        }
    }

    checkUserPermission() {
        let currentUser = JSON.parse(localStorage['currentUser'])
        return this.users.find((user) => user.id == currentUser.id)
    }

    checkUser(login) {
        return this.users.find((user) => user.login == login)
    }

    generateId() {
        return Math.floor(Math.random() * 100000000)
    }

    generatePassword() {
        let chars =
            "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@#$&";
        let passLength = 6;
        let password = "";

        for (let i = 0; i < passLength; i++)
            password += chars[Math.floor(Math.random() * chars.length)];
        return password;
    }

    signUp() {
        let user = {
            id: this.id,
            login: this.login,
            password: this.password,
            status: this.status,
            canEdit: this.canEdit,
            canDelete: this.canDelete,
            canAdd: this.canAdd
        }

        this.users.push(user)

        localStorage.setItem("users", JSON.stringify(this.users))
    }

    editUserInfo(id, login, password) {
        this.users.map(function (user) {
            if (user.id == id) {
                user.login = login
                user.password = password
            }
        })

        localStorage.setItem("users", JSON.stringify(this.users))
    }
}

export { User }