import { users } from "./data.js"

class User {
    constructor(login, password, status="user", canEdit=false, canDelete=false, canAdd=false) {
        this.id = this.generateId()
        this.login = login
        this.password = password
        this.status = status
        this.canEdit = canEdit
        this.canDelete = canDelete
        this.canAdd = canAdd
        this.users = JSON.parse(localStorage['users']) ? JSON.parse(localStorage['users']) : []
    }

    checkUserPermission(){
        let currentUser = JSON.parse(localStorage['currentUser'])
        this.users.forEach(function(user){
            if(user.id == currentUser.id){
                return 
                    {
                        user.status,
                        canEdit,
                        canDelete,
                        canAdd
                    }
            }
        })
    }

    addAdminUser(){
        if(!localStorage['users']){
            localStorage.setItem("users", JSON.stringify(users))
        } 
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
            status: "user",
            canEdit: this.canEdit,
            canDelete: this.canDelete,
            canAdd: this.canAdd
        }


        let users = localStorage['users'] ? JSON.parse(localStorage['users']) : []

        users.push(user)

        localStorage.setItem("users", JSON.stringify(users))

    }

    singIn(){

    }
}

export { User }