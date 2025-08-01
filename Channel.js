export default class Channel {
    entities = []
    
    receive = (msg) => {
        for(let entity of this.entities)
        {
            entity.receive(msg)
        }
    }
}