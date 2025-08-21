class Graph {
    table = [
        // [0,0],
        // [0,5],
        // [2,3],
        // [2,5],
        // [4,3],
        // [4,5],
        // [4,10],
        // [7,2]
    ]

    findPosition = (x,y) => {
        if(this.table.length == 0) return 0
        let l = 0, r = this.table.length
        let m = Math.floor((l + r) / 2)
        while(m >= l && m <= r) {
            if(l == r) return l
            if(this.table[m][0] == x && this.table[m][1] == y) return m
            if(this.table[m][0] < x) l = m + 1
            else if(this.table[m][0] > x) r = m
            else {
                if(this.table[m][1] < y) l = m + 1
                if(this.table[m][1] > y) r = m
            }
            m = Math.floor((l + r) / 2)
        }
    }

    createNode = (x,y) => {
        let pos = this.findPosition(x,y)
        this.table = [...this.table.slice(0,pos),[x,y,[]],...this.table.slice(pos,this.table.length)]
    }

    mapFromPixels = (map, xs, ys) => {
        const transform = (dir) => {
            switch(dir) {
                case 0:
                    // x, -1
                    return (x,y) => [x-1,y]
                case 1:
                    // y, -1
                    return (x,y) => [x,y-1]
                case 2:
                    // x, +1
                    return (x,y) => [x+1,y]
                case 3:
                    // y, +1
                    return (x,y) => [x,y+1]
            }
        }
        let h = map.length
        let w = map[0].length
        let cache = []
        let queueMap = []
        let posMap = []
        for(let i = 0; i < h; i++) {
            let arr1 = new Array(w).fill(0)
            cache.push(arr1)
            let arr2 = new Array(w).fill(0)
            queueMap.push(arr2)
            let arr3 = new Array(w).fill(null)
            posMap.push(arr3)
        }
        let queue = [[xs, ys]]
        let pathList = []
        while(queue.length) {
            let [x,y] = queue.splice(0,1)[0]
            this.createNode(x,y)
            cache[y][x] = 1
            for(let i = 0; i < 4; i++) {
                let [sx,sy] = transform(i)(x,y)
                let count = 0
                let fx = sx, fy = sy, success = false
                while(sx >= 0 && sx < w && sy >= 0 && sy < h && !map[sy][sx] && !count) {
                    success = true
                    fx = sx
                    fy = sy
                    for(let j = 1 - (i%2); j < 4; j+=2) {
                        let [cx,cy] = transform(j)(sx,sy)
                        if(cx >= 0 && cx < w && cy >= 0 && cy < h && !map[cy][cx]) {
                            count++
                        }
                    }
                    [sx,sy] = transform(i)(sx,sy)
                }
                // alla fine trovi il nodo
                if(success && !cache[fy][fx]) {
                    if(!queueMap[fy][fx]) {
                        queue.push([fx,fy])
                    }
                    pathList.push([x,y,fx,fy])
                    queueMap[fy][fx] = 1
                }
            }
        }
        for(let [x1,y1,x2,y2] of pathList) {
            let pos1 = posMap[y1][x1]
            if(pos1 == null) {
                pos1 = this.findPosition(x1,y1)
                posMap[y1][x1] = pos1
            }
            let pos2 = posMap[y2][x2]
            if(pos2 == null) {
                pos2 = this.findPosition(x2,y2)
                posMap[y2][x2] = pos2
            }
            this.table[pos1][2].push(pos2)
            this.table[pos2][2].push(pos1)
        }
    }

    findShortestPath = (x1,y1,x2,y2) => {
        // e => punto di coordinate x2 e y2
        // s => punto di coordinate x1 e y1
        let s = this.findPosition(x1,y1)
        let e = this.findPosition(x2,y2)
        return this.shortestPath(e,new Array(this.table.length).fill(0),[s])
    }

    shortestPath = (e,b,p) => {
        let s = p[p.length - 1]
        if(s == e) return [0, p]
        if(b[s] == 1) return [Infinity, p]
        let shortDist = Infinity
        let shortPath = p
        let newMap = [...b.slice(0,s),1,...b.slice(s+1,b.length)]
        for(let node in this.table[s][2]) {
            let id = this.table[s][2][node]
            let newPath = [...p,id]
            let params = this.shortestPath(e,newMap,newPath)
            let x = this.table[id][0]
            let y = this.table[id][1]
            let dist = Math.sqrt(
                Math.pow(this.table[s][0] - x,2) +
                Math.pow(this.table[s][1] - y,2)
            )
            dist += params[0]
            if(dist < shortDist) {
                shortDist = dist
                shortPath = params[1]
            }
        }
        return [shortDist,shortPath]
    }
}

let g = new Graph()
let map = [
    [0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,0],
    [0,1,1,1,0,1,1,1,0],
    [0,1,1,1,0,1,1,1,0],
    [0,0,0,0,0,0,0,0,0],
    [1,1,1,1,0,1,1,1,1],
    [1,1,1,1,0,1,1,1,1],
    [1,1,1,1,0,1,1,1,1]
]
g.mapFromPixels(map,8,4)
console.log(g.table)
console.log(g.findShortestPath(8,4,0,4))