import ChannelHandler from "./ChannelHandler.js"

export default class GameEntity {
    filters = []
    callbacks = []

    appendToChannel = (id) => {
        ChannelHandler.getChannel(id).entities.push(this)
    }

    receive = (msg) => {
        for(let filter in this.filters) {
            if(this.filters[filter](msg)) {
                this.callbacks[filter](msg)
            }
        }
    }

    setCallback = (filter, callback) => {
        this.filters.push(filter)
        this.callbacks.push(callback)
        return this
    }
}