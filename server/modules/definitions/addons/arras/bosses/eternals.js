const { combineStats, menu, weaponArray, LayeredBoss, setTurretProjectileRecoil } = require('../../../facilitators.js')
const { base } = require('../../../constants.js')
const g = require('../../../gunvals.js')

Class.arras_eternals = menu("Eternals", "veryLightGrey", 11)
Class.arras_bosses.UPGRADES_TIER_0.push("arras_eternals")
    Class.arras_eternals.UPGRADES_TIER_0 = ["odin", "kronos"]

// shared stats
Class.eternal = {
    PARENT: "miniboss",
    LABEL: "Eternal",
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    VALUE: 4e6,
    SHAPE: 11,
    SIZE: 90,
    CONTROLLERS: [["minion", {orbit: 240}]],
    BODY: {
        FOV: 1,
        HEALTH: 3000,
        SHIELD: 150,
        REGEN: base.REGEN * 0.1,
        SPEED: base.SPEED * 0.15,
        DAMAGE: 18
    }
}

// bosses
let kronos = new LayeredBoss(null, "Kronos", "eternal", 11, "veryLightGrey", "baseTrapTurret", 6, 5.5);
kronos.addLayer({turret: {
    POSITION: [6.5, 9, 0, null, 160, 0],
    TYPE: "kronosSkimmerTurret",
}});
kronos.addLayer({turret: {
    POSITION: [6.5, 9, 0, null, 160, 0],
    TYPE: ["carrierTurret", {GUN_STAT_SCALE: g.battleship}],
}}, true, 4);
kronos.addLayer({turret: {
    POSITION: [8.5, 9, 0, null, 160, 0],
    TYPE: ["tripletTurret", {GUN_STAT_SCALE: {health: 1.15, damage: 1.1, resist: 1.3, speed: 1.1, maxSpeed: 0.9}}],
}}, true, 4);

let odin = new LayeredBoss(null, "Odin", "eternal", 11, "aqua", "baseTrapTurret", 4.5, 3.5);
odin.addLayer({gun: {
    POSITION: [2.25, 3.25, -1.6, 9, 0, null, 0],
    PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.pounder, g.destroyer, {speed: 1.25, maxSpeed: 1.25}]),
        TYPE: ["realchip", {INDEPENDENT: true, DRAW_HEALTH: true, COLOR: 'hexagon'}],
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
    },
}}, true, null, 18);
odin.addLayer({turret: {
    POSITION: [7, 8, 0, null, 160, 0],
    TYPE: "autoSmasherLauncherTurret",
}}, true, 5.5);
odin.addLayer({turret: {
    POSITION: [8, 9, 0, null, 160, 0],
    TYPE: "gunnerCruiserTurret",
}}, true, 4.5);