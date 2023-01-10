'use strict'

class Render {
    constructor(parrent, content) {
        this.parrent = parrent
        this.content = content
    }

    render() {
        this.parrent.insertAdjacentHTML('beforeend', this.content)
    }

    renderBegin() {
        this.parrent.insertAdjacentHTML('afterbegin', this.content)
    }
}


export { Render }

