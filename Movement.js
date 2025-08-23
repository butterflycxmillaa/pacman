export default class Movement {
    static transform = (dir) => {
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
}