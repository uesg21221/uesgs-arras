const bossRush = new BossRush()

const modesInit = () => {
    if (c.MOTHERSHIP_LOOP) mothershipLoop.spawn();
    if (c.SPECIAL_BOSS_SPAWNS) bossRush.init();
}
const basepro = () => {
    for (let team = 1; team < c.TEAMS + 1; team++) {
        room["bap" + team].forEach((loc) => {
            let o = new Entity(loc);
            o.define(Class.baseProtector);
            o.team = -team;
            o.color = [10, 11, 12, 15, 25, 26, 27, 28][team - 1];
        });
    }
    if (c.SPACE_MODE) {
        console.log("Spawned moon.");
        let o = new Entity({
            x: room.width / 2,
            y: room.height / 2,
        });
        o.define(Class.moon);
        o.define({
            BODY: {
                ACCELERATION: 0.015 / (Class.moon.FOOD.LEVEL + 1),
            },
        });
        o.team = -102;
        o.SIZE = room.width / 10;
        room.blackHoles.push(o);
    }
}

if (c.MAZE && typeof c.MAZE == "number") generateMaze(c.MAZE);
if (c.GROWTH && typeof c.GROWTH == "number") {
    c.LEVEL_SKILL_POINT_FUNCTION = level => {
        if (level < 2) return 0;
        if (level <= c.SKILL_CHEAT_CAP) return 1;
        if (level <= (c.GROWTH + 1) * 2 - c.SKILL_CHEAT_CAP && level & 1 == 1) return 1;
        return 0;
    };
}
if (c.DOMINATOR_LOOP) for (let loc of room.dom0) dominatorLoop.spawn(loc, -100, 3);
modesInit();

let logger = new LagLogger();
const gamemodeLoop = function() {
    logger.set();
    if (c.MOTHERSHIP_LOOP) mothershipLoop.loop();
    if (c.SPECIAL_BOSS_SPAWNS) bossRush.loop();
    logger.mark();
    if (logger.totalTime > 100) {
        console.log("Gamemode loop is taking a long time!");
        console.log(`Gamemode loop took ${logger.totalTime}ms to complete!`);
        console.log(`Gamemode loop log history: (Last ${logger.sum.length} entries)`);
        console.log(logger.sum.map(entry => `Run at: ${entry.at}. Time: ${entry.time}.`).join("\n"));
    }
};

module.exports = { gamemodeLoop, modesInit, basepro };
