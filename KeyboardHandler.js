import ChannelHandler from "./ChannelHandler.js"

export default class KeyboardHandler {
    static directions = [37,38,39,40]

    static init = () => {
        document.body.addEventListener("keyup",(e) => {
            let ind = this.directions.indexOf(e.keyCode)
            if(ind != -1) ChannelHandler.sendMsg(1,ind)
        })
    }
}