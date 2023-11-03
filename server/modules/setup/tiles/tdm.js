let bases = {},

makeBase = (team, hasProtection) => new Tile({
    color: getTeamColor(team),
    init: tile => {
        if (hasProtection) {
            let entity = new Entity(tile.loc)
            entity.define('permanentBaseProtector')
            entity.team = team
            entity.color = getTeamColor(team)
        };
        if (!room.spawnable[team]) room.spawnable[team] = [];
        room.spawnable[team].push(tile);
    },
    tick: tile => {
    	for (let i = 0; i < tile.entities.length; i++) {
    		let entity = tile.entities[i];
    		if (entity.team != team && isPlayerTeam(entity.team)) entity.kill();
    	}
    }
});

for (let i = 1; i < 9; i++) {
	bases['base' + i] = makeBase(-i, false);
	bases['base' + i + 'protected'] = makeBase(-i, true);
}

module.exports = bases;