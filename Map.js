import Graph from "./Graph.js"
import Movement from "./Movement.js"

export default class Map {
    map = []
    h = 0
    w = 0
    graph

    constructor(_map) {
        this.map = _map
        this.h = this.map.length
        this.w = this.map[0].length
        this.graph = new Graph(this.map,0,Math.floor(this.h/2))
     }

    findShortestPath = (x1,y1,x2,y2) => {
        // e => punto di coordinate x2 e y2
        // s => punto di coordinate x1 e y1
        let s = this.graph.findPosition(x1,y1)
        let e = this.graph.findPosition(x2,y2)
        return this.graph.shortestPath(s,e)
    }

    replace = (old,rep) => {
        let bitmap = new Array(this.graph.table.length).fill(0)
        let queue = [this.graph.findPosition(14,5)]
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
                        this.map[yf][xf] = rep
                    }
                    let dx = Math.sign(xf-x)
                    let dy = Math.sign(yf-y)
                    let finalDir = (dy != 0) + 2 * (dx + dy > 0)
                    let xc = x, yc = y;
                    [xc,yc] = Movement.transform(finalDir)(x,y)
                    while((xc != xf || yc != yf) && this.map[yc][xc] == old) {
                        this.map[yc][xc] = rep;
                        [xc,yc] = Movement.transform(finalDir)(xc,yc)
                    }
                }
            }
        }
    }
}