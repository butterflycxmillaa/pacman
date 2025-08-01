import Channel from "./Channel"

export default class ChannelHandler {
    channels = new Map();

    static defineChannel = (id) => {
        this.channels.set(id, new Channel())
    }

    static deleteChannel = (id) => {
        this.channels.delete(id)
    }

    static sendMsg = (id, msg) => {
        let channel = this.channels.get(id)
        channel.receive(msg)
    }
}