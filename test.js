class Graph {
    table = [
        [0,0,[1,2],[7,1]],
        [Infinity,null,[0,2,3,4],[7,5,2,1]],
        [Infinity,null,[0,1,3],[1,5,4]],
        [Infinity,null,[1,2,4],[2,4,3]],
        [Infinity,null,[1,3],[1,3]],
        [Infinity,0]
    ]

    mapPointA = () => {
        let u = this.table.length - 1
        let visited = new Array(u).fill(0)
        let unvisited = new Array(u).fill(1)
        while(u > 0) {
            let visiting = this.table[this.table.length - 1]
            let visitingN = visiting[1]
            visited[visitingN] = 1
            unvisited[visitingN] = 0
            u--
            let point = this.table[visitingN]
            let localDist = Infinity
            let localP = null
            for(let adj in point[2]) {
                let adjN = point[2][adj]
                if(unvisited[adjN]) {
                    let dist = point[0] + point[3][adj]
                    if(dist < this.table[adjN][0]) {
                        this.table[adjN][0] = dist
                        this.table[adjN][1] = visitingN
                    }
                    if(dist <= localDist) {
                        localDist = dist
                        localP = point[2][adj]
                    }
                }
                this.table[this.table.length - 1] = [localDist, localP]
            }
        }
    }
}

let g = new Graph()
g.mapPointA()
console.log(g.table)