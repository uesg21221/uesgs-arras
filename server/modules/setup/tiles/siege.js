let spawnPermanentAntiTankMachineGun = (loc) => {
    let o = new Entity(loc);
    o.define('antiTankMachineGun');
    o.controllers = [new ioTypes.nearestDifferentMaster(o)]
    o.team = TEAM_ROOM;
    o.color = getTeamColor(TEAM_RED);
    o.on('dead', () => spawnPermanentAntiTankMachineGun(loc));
},

atmg = new Tile({ color: "white", init: tile => spawnPermanentAntiTankMachineGun(tile.loc) }),

// we are not yet advanced enough to transition between two color codes
outside = new Tile({ color: "#C5C5C5" }),

bossSpawn = new Tile({
    color: getTeamColor(TEAM_RED),
    init: tile => {
        if (!room.spawnable[TEAM_ENEMIES]) room.spawnable[TEAM_ENEMIES] = [];
        room.spawnable[TEAM_ENEMIES].push(tile);
    },
    tick: tile => {
        for (let i = 0; i < tile.entities; i++) {
            let entity = tile.entities[i];
            if (entity.pushability) {
                let dirToCenter = Math.atan2(entity.y - room.center.y, entity.x - room.center.x);
                entity.velocity.x = Math.cos(centerDir) * 10 * entity.pushability;
                entity.velocity.y = Math.sin(centerDir) * 10 * entity.pushability;
            }
        }
    }
});

module.exports = { bossSpawn, outside, atmg };