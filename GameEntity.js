import ChannelHandler from "./ChannelHandler.js"

export default class GameEntity {
    appendToChannel = (id) => {
        ChannelHandler.getChannel(id).entities.push(this)
    }

    receive = (msg) => {
        console.log(msg)
    }

    setCallback = (filter, callback) => {
        
    }
}