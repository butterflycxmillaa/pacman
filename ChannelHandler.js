import Channel from "./Channel.js"

export default class ChannelHandler {
    static channels = new Map();

    static defineChannel = (id) => {
        this.channels.set(id, new Channel())
    }
    
    static getChannel = (id) => {
        return null || this.channels.get(id)
    }

    static deleteChannel = (id) => {
        this.channels.delete(id)
    }

    static sendMsg = (id, msg) => {
        let channel = this.channels.get(id)
        channel.receive(msg)
    }
}