'use strict'

// import { Store } from "./utils.js"
// import { Task } from "./tasks.js"


class Render {
    constructor(parrent, content) {
        this.parrent = parrent
        this.content = content
    }

    render() {
        this.parrent.insertAdjacentHTML('beforeend', this.content)
    }
}


export { Render }

