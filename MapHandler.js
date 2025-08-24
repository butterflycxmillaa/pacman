import Graph from "./Graph.js"
import MapGenerator from "./MapGenerator.js"
import Movement from "./Movement.js"

export default class MapHandler {
    static map
    static h
    static w
    static graph
    static style = ["border","path","sb-border","teleport","pellet","spawn","pow-pellet"]
    static blockSize

    static entitySpawn = (name) => {
        let centerX = Math.floor(this.w/2)
        let centerY = Math.floor(this.h/2)
        switch (name) {
            case "pacman":
                return [centerX,centerY+2]
            case "inky":
                return [centerX-1,centerY]
            case "pinky":
                return [centerX,centerY]
            case "clyde":
                return [centerX+1,centerY]
            case "blinky":
                return [centerX,centerY-2]
        }
    }

    static init = () => {
        this.map = MapGenerator.create()
        this.h = this.map.length
        this.w = this.map[0].length
        this.graph = new Graph(this.map,0,Math.floor(this.h/2))
        let div = document.createElement("div")
        let {h,w} = this
        div.style.aspectRatio = w/h
        div.style.gridTemplateColumns = "repeat(" + w + ", 1fr)"
        div.style.gridTemplateRows = "repeat("+ h + ", 1fr)"
        div.classList.add("grid")
        for(let y = 0; y < h; y++) {
            for(let x = 0; x < w; x++) {
                let div2 = document.createElement("div")
                div2.id = x + "-" + y
                div.appendChild(div2)
                div2.classList.add(this.style[this.map[y][x]])
            }
        }
        document.body.appendChild(div)
        let {width,height} = div.getBoundingClientRect()
        let pixelW = width / w
        let pixelH = height / h
        let avg = Math.round((pixelH + pixelW) / 2 * 100) / 100
        this.blockSize = avg
    }

    static findShortestPath = (x1,y1,x2,y2) => {
        let s = this.graph.findPosition(x1,y1)
        let e = this.graph.findPosition(x2,y2)
        return this.graph.shortestPath(s,e)
    }

    static set = (x,y,cl) => {
        this.map[y][x] = cl
        document.getElementById(x + "-" + y).className = this.style[cl]
    }

    static replace = (old,rep) => {
        let bitmap = new Array(this.graph.table.length).fill(0)
        let queue = [0]
        while(queue.length) {
            let elem = queue.splice(0,1)[0]
            bitmap[elem] = 1
            let [x,y,paths] = this.graph.table[elem]
            for(let path of paths) {
                if(!bitmap[path]) {
                    // riempi il sentiero
                    let [xf,yf] = this.graph.table[path]
                    if(!bitmap[path] && this.map[yf][xf] == old) {
                        queue.push(path)
                        this.set(xf,yf,rep)
                    }
                    let dx = Math.sign(xf-x)
                    let dy = Math.sign(yf-y)
                    let finalDir = (dy != 0) + 2 * (dx + dy > 0)
                    let xc = x, yc = y;
                    [xc,yc] = Movement.transform(finalDir)(x,y)
                    while((xc != xf || yc != yf)) {
                        if(this.map[yc][xc] == old) {
                            this.set(xc,yc,rep)
                        }
                        [xc,yc] = Movement.transform(finalDir)(xc,yc)
                    }
                }
            }
        }
    }

    static fill = (allowed,rep,qt) => {
        const distr = (xs,ys,xe,ye,qt) => {
            let w = xe + 1 - xs
            let h = ye + 1 - ys
            if(w * h == 1) {
                let xc = xe, yc = ye
                if(allowed.includes(this.map[yc][xc])) {
                    this.set(xc,yc,rep)
                }
            }
            if(qt == 1) {
                let x, y
                do {
                    x = Math.floor(Math.random() * w) + xs
                    y = Math.floor(Math.random() * h) + ys
                } while(!allowed.includes(this.map[y][x]));
                this.set(x,y,rep)
                return;
            }
            let div = 0
            for(let i = 2; i <= qt && !div; i++) {
                if(qt % i == 0) div = i
            }
            let max = Math.max(h,w)
            let step = Math.ceil(max / div);
            for (let i = 0; i < div; i++) {
                let start = i * step;
                let end = (i === div - 1 ? max - 1 : (i + 1) * step - 1);
                if (w > h) {
                    distr(xs + start, ys, xs + end, ye, qt / div);
                } else {
                    distr(xs, ys + start, xe, ys + end, qt / div);
                }
            }
        }
        distr(1,1,this.w-2,this.h-2,qt)
    }
}