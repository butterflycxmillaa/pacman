import GameEntity, { Pacman } from "./GameEntity.js"

export default class GameEntityHandler {
    static entities = new Map()

    static defineEntity = (name,type) => {
        let entity
        switch(type) {
            case 0:
                entity = new Pacman()
        }
        this.entities.set(name,entity)
        return entity
    }
    
    static getEntity = (name) => {
        return this.entities.get(name) || new GameEntity()
    }

    static init = () => {
        this.defineEntity("pacman",0)
    }
}