class Graph {
    table = [
        [[1,2],[3,3]],
        [[0,2,3,4],[3,6,2,3]],
        [[0,1,4,5],[3,6,4,7]],
        [[1,4,5],[2,4,5]],
        [[1,2,3,5],[3,4,4,2]],
        [[2,3,4],[7,5,2]]
    ]

    findShortestPath = (s,e) => {
        return this.shortestPath(e,new Array(this.table.length).fill(0),[s])
    }

    shortestPath = (e,b,p) => {
        let s = p[p.length - 1]
        if(s == e) return [0, p]
        if(b[s] == 1) return [Infinity, p]
        let shortDist = Infinity
        let shortPath = p
        let newMap = [...b.slice(0,s),1,...b.slice(s+1,b.length)]
        for(let node in this.table[s][0]) {
            let newPath = [...p,this.table[s][0][node]]
            let params = this.shortestPath(e,newMap,newPath)
            let dist = this.table[s][1][node] + params[0]
            if(dist < shortDist) {
                shortDist = dist
                shortPath = params[1]
            }
        }
        return [shortDist,shortPath]
    }
}

let g = new Graph()
console.log(g.findShortestPath(5,1))