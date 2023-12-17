let { spawnNatural } = require('./misc.js');

labyTick = tile => {
    if (++tile.data.foodSpawnCooldown > c.FOOD_SPAWN_COOLDOWN_LABYRINTH) {
        tile.data.foodSpawnCooldown = 0;
        if (tile.data.foodCount < c.FOOD_CAP_LABYRINTH && Math.random() < c.FOOD_SPAWN_CHANCE_LABYRINTH) {
            spawnNatural(tile, c.FOOD_TYPES_LABYRINTH, 'food');
        }
    }
},

inkTick = tile => {
    if (++tile.data.foodSpawnCooldown > c.FOOD_SPAWN_COOLDOWN_INK) {
        tile.data.foodSpawnCooldown = 0;
        if (tile.data.foodCount < c.FOOD_CAP_INK && Math.random() < c.FOOD_SPAWN_CHANCE_INK) {
            spawnNatural(tile, c.FOOD_TYPES_INK, 'food');
        }
    }
},

laby = new Tile({
    color: "darkGrey",
    data: {
        allowMazeWallSpawn: true,
        foodSpawnCooldown: 0, foodCount: 0,
    },
    tick: labyTick
}),

ink = new Tile({
    color: "black",
    data: {
        allowMazeWallSpawn: false,
        foodSpawnCooldown: 0, foodCount: 0,
        enemySpawnCooldown: 0, enemyCount: 0
    },
    tick: inkTick
}),

module.exports = {laby}
