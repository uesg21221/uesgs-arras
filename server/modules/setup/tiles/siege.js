atmg = new Tile({ color: "white", init: tile => {
    let entity = new Entity(tile.loc)
    entity.define('permanentAntiTankMachineGun')
    entity.team = TEAM_ROOM
    entity.controllers = [new ioTypes.nearestDifferentMaster(o)]
    entity.color = getTeamColor(TEAM_RED)
} }),

// we are not yet advanced enough to transition between two color codes
outside = new Tile({ color: "#C5C5C5" }),

bossSpawn = new Tile({
    color: getTeamColor(TEAM_RED),
    init: tile => {
        if (!room.spawnable[TEAM_ENEMIES]) room.spawnable[TEAM_ENEMIES] = [];
        room.spawnable[TEAM_ENEMIES].push(tile);
    },
    tick: tile => {
        for (let i = 0; i < tile.entities.length; i++) {
            let entity = tile.entities[i];
            if (entity.pushability) {
                let dirToCenter = Math.atan2(room.center.y - entity.y, room.center.x - entity.x);
                entity.velocity.x = Math.cos(dirToCenter) * 25 * entity.pushability;
                entity.velocity.y = Math.sin(dirToCenter) * 25 * entity.pushability;
            }
        }
    }
});

module.exports = { bossSpawn, outside, atmg };