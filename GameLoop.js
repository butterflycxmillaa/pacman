import ChannelHandler from "./ChannelHandler.js"
import GameEntity from "./GameEntity.js"

class GameLoopHandler {
    static on = false
    static intVar = 0
    static framerate = 30

    static init = () => {
        document.getElementById("pauseBtn")
        .addEventListener("click",() => {
            this.pause()
        })
        document.getElementById("restartBtn")
        .addEventListener("click",() => {
            this.start()
        })
        ChannelHandler.defineChannel(0)
        this.start()
    }

    static pause = () => {
        if(this.on) {
            cancelAnimationFrame(this.intVar)
            this.on = false
        }
    }

    static start = () => {
        if(!this.on) {
            const stop = (t) => {
                this.intVar = requestAnimationFrame(() => {
                    let now = new Date()
                    ChannelHandler.sendMsg(0, now - t)
                    stop(now)
                })
            }
            requestAnimationFrame(() => {stop(new Date())})
            this.on = true
        }
    }
}

GameLoopHandler.init()
new GameEntity().setCallback((msg) => {
    return !isNaN(msg)
}, (msg) => {
    console.log("numero")
}).appendToChannel(0)