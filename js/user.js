
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
        return this.users.find((user)=>user.id == currentUser.id)
    }

    checkUser(login){
        return this.users.find((user)=>user.login == login)
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

    editUserInfo(id, login, password){
        this.users.map(function(user){
            if(user.id == id){
                user.login = login
                user.password = password
            }
        })

        localStorage.setItem("users", JSON.stringify(this.users))
    }
}

export { User }