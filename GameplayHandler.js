import ChannelHandler from "./ChannelHandler.js";
import GameEntityHandler from "./GameEntityHandler.js";
import KeyboardHandler from "./KeyboardHandler.js";
import MapHandler from "./MapHandler.js";

class GameplayHandler {
    static init() {
        ChannelHandler.init()
        KeyboardHandler.init()
        GameEntityHandler.init()
        MapHandler.init()
        this.setLevel()
    }

    static setLevel() {
        MapHandler.replace(1,4)
        MapHandler.fill([4],6,6)
    }

    static reset() {
        document.querySelector(".grid")?.remove()
        this.init()
    }
}

export default GameplayHandler