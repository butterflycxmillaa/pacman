class Graph {
    table = [
        [0,0,[1,2]],
        [4,0,[0,3,4]],
        [0,5,[0]],
        [4,3,[1,5,7,9]],
        [7,0,[1,5]],
        [7,3,[3,4,6]],
        [7,8,[5,7]],
        [4,8,[3,6,8]],
        [2,8,[7,9]],
        [2,3,[3,8]]
    ]

    createNode(x,y) {
        this.table.push([x,y,[]])
    }

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
            console.log(s,this.table[s][2][node],this.table[s][0],this.table[s][1],
                this.table[node][0],this.table[node][1], dist)
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
console.log(g.findShortestPath(0,7))