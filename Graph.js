import Movement from "./Movement.js"

export default class Graph {
    table = []
    cache = [
        [
            [0,0],
            [Infinity,null]
        ]
    ]

    constructor(map, xs, ys) {
        const transform = Movement.transform
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
                while(sx >= 0 && sx < w && sy >= 0 && sy < h && map[sy][sx] && !count) {
                    success = true
                    fx = sx
                    fy = sy
                    for(let j = 1 - (i%2); j < 4; j+=2) {
                        let [cx,cy] = transform(j)(sx,sy)
                        if(cx >= 0 && cx < w && cy >= 0 && cy < h && map[cy][cx]) {
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
        cache = new Array(this.table.length).fill(null)
    }

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

    shortestPath = (s,e) => {
        // dijkstra: mappa tutti i nodi a partire da quello finale
        let temp = []
        for(let i = 0; i < this.table.length; i++) {
            if(i == e) temp.push([0,i])
            else temp.push([Infinity, null])
        }
        let v = new Array(temp.length).fill(0)
        let u = [e]
        while(u.length) {
            let minDist = Infinity, choice = null
            for(let i = 0; i < u.length; i++) {
                let dist = temp[u[i]][0]
                if(dist < minDist) {
                    minDist = dist
                    choice = i
                }
                else if(dist == minDist) {
                    let rand = Math.round(Math.random())
                    choice = rand ? i : choice
                }
            }
            let elem = u.splice(choice,1)[0]
            v[elem] = 1
            let [x,y,paths] = this.table[elem]
            for(let path of paths) {
                if(!v[path]) {
                    u.push(path)
                    let [xf,yf] = this.table[path]
                    let dist = temp[elem][0] + Math.sqrt(
                        Math.pow(xf-x,2) + Math.pow(yf-y,2)
                    )
                    if(dist < temp[path][0]) {
                        temp[path][0] = dist
                        temp[path][1] = elem
                    }
                }
                
            }
        }
        let res = [s]
        let ref = s
        do {
            ref = temp[ref][1]
            res.push(ref)
        }
        while(ref != e);
        res.forEach((elem) => {
            console.log(this.table[elem])
        })
        return [temp[s][0], res]
    }
}