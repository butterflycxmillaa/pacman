import GameEntity from "./GameEntity.js"

export default class GameEntityHandler {
    static entities = new Map()

    static defineEntity = (name) => {
        this.entities.set(name, new GameEntity())
        return this.entities.get(name)
    }
}