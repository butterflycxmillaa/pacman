import ChannelHandler from "./ChannelHandler.js"

export default class GameEntity {
    filters = []
    callbacks = []

    appendToChannel = (id) => {
        ChannelHandler.getChannel(id).entities.push(this)
    }
}

export class Pacman extends GameEntity {
    name = "pacman"
    
    constructor(spawnX,spawnY) {
        super()
        this.appendToChannel(1)
    }

    receive = (msg) => {
        if(!isNaN(msg)) {
            console.log("P",msg)
        }
    }
}