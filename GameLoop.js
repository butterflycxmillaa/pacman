import ChannelHandler from "./ChannelHandler.js"
import GameEntity from "./GameEntity.js"
import GameEntityHandler from "./GameEntityHandler.js"

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

class KeyboardHandler {
    static init = () => {
        ChannelHandler.defineChannel(1)
        document.body.addEventListener("keydown",(e) => {
            ChannelHandler.sendMsg(1, e.keyCode)
        })
    }
}

GameLoopHandler.init()
KeyboardHandler.init()
GameEntityHandler.defineEntity("keyboard").setCallback((msg) => {
    return true
}, (msg) => {
    console.log(msg)
}).appendToChannel(1)