import ChannelHandler from "./ChannelHandler.js"

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
            clearInterval(this.intVar)
            this.on = false
        }
    }

    static start = () => {
        if(!this.on) {
            this.intVar = setInterval(() => {
                console.log("a")
            },this.framerate)
            this.on = true
        }
    }
}

GameLoopHandler.init()