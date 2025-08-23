import Map from "./Map.js";
import MapGenerator from "./MapGenerator.js"

class GameplayHandler {
    map;

    static init() {
        const style = ["border","path","sb-border","teleport","pellet","spawn"]
        // gestione del div
        this.map = new Map(MapGenerator.create())
        this.setLevel()
        let h = this.map.h
        let w = this.map.w
        let div = document.createElement("div")
        div.style.aspectRatio = w/h
        div.style.gridTemplateColumns = "repeat(" + w + ", 1fr)"
        div.style.gridTemplateRows = "repeat("+ h + ", 1fr)"
        div.classList.add("grid")
        for(let y = 0; y < h; y++) {
            for(let x = 0; x < w; x++) {
                let div2 = document.createElement("div")
                div2.id = x + "-" + y
                div.appendChild(div2)
                div2.classList.add(style[this.map.map[y][x]])
            }
        }
        document.body.appendChild(div)
    }

    static setLevel() {
        this.map.replace(1,4)
    }
}

export default GameplayHandler