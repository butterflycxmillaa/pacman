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

    fill = (allowed,rep,qt) => {
        const distr = (xs,ys,xe,ye,qt) => {
            let w = xe + 1 - xs
            let h = ye + 1 - ys
            if(w * h == 1) {
                let xc = xe, yc = ye
                if(allowed.includes(this.map[yc][xc])) {
                    this.map[yc][xc] = rep
                }
            }
            if(qt == 1) {
                let x, y
                do {
                    x = Math.floor(Math.random() * w) + xs
                    y = Math.floor(Math.random() * h) + ys
                } while(!allowed.includes(this.map[y][x]));
                this.map[y][x] = rep
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