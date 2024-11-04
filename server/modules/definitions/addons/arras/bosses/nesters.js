const { combineStats, menu, weaponArray } = require('../../../facilitators.js')
const { base } = require('../../../constants.js')
const g = require('../../../gunvals.js')

Class.arras_nesters = menu("Nesters", "purple", 5.5)
Class.arras_bosses.UPGRADES_TIER_0.push("arras_nesters")
    Class.arras_nesters.UPGRADES_TIER_0 = ["arras_nestKeeper", "arras_nestWarden", "arras_nestGuardian"]

// shared stats
Class.arras_genericNester = {
    PARENT: "miniboss",
    COLOR: "purple",
    SHAPE: 5,
    SIZE: 50,
    BODY: {
        FOV: 1.3,
        SPEED: base.SPEED * 0.25,
        HEALTH: base.HEALTH * 9,
        SHIELD: base.SHIELD * 1.5,
        REGEN: base.REGEN,
        DAMAGE: base.DAMAGE * 2.5
    },
    VALUE: 3e5
}

// bosses
Class.arras_nestKeeper = {
    PARENT: "arras_genericNester",
    LABEL: "Nest Keeper",
    UPGRADE_COLOR: "purple",
    MAX_CHILDREN: 15,
    GUNS: weaponArray({
        POSITION: [3.5, 6.65, 1.2, 8, 0, 36, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.nestKeeper]),
            TYPE: "drone",
            AUTOFIRE: true,
            LABEL: "Mega Crasher",
            STAT_CALCULATOR: "drone",
        },
    }, 5),
    TURRETS: [
        ...weaponArray({
            POSITION: [8, 9, 0, 0, 120, 0],
            TYPE: [ "auto4gun", { INDEPENDENT: true, COLOR: -1 } ],
        }, 5),
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: [ "boomerTurret", { INDEPENDENT: true, COLOR: -1 } ],
        },
    ],
}
Class.arras_nestWarden = {
    PARENT: "arras_genericNester",
    LABEL: "Nest Warden",
    UPGRADE_COLOR: "purple",
    GUNS: weaponArray([
        {
            POSITION: [10.7, 8, 1, 0, 0, 36, 0],
        }, {
            POSITION: [1.5, 8, 1.2, 10.7, 0, 36, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, { speed: 1.2 }, g.setTrap, g.constructor]),
                TYPE: "unsetTrap",
                STAT_CALCULATOR: "block"
            },
        }
    ], 5),
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: [ "barricadeTurret", { INDEPENDENT: true, COLOR: -1 } ],
        },
        ...weaponArray({
            POSITION: [8, 9, 0, 0, 120, 0],
            TYPE: [ "cruiserTurret", { INDEPENDENT: true, COLOR: -1 } ],
        }, 5)
    ],
}
Class.arras_nestGuardian = {
    PARENT: "arras_genericNester",
    LABEL: "Nest Guardian",
    UPGRADE_COLOR: "purple",
    GUNS: weaponArray({
        POSITION: [5.5, 7, 1, 6, 0, 36, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.pounder, g.destroyer]),
            TYPE: "bullet",
            LABEL: "Devastator",
        },
    }, 5),
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: [ "twisterTurret", { INDEPENDENT: true, COLOR: -1 } ],
        },
        ...weaponArray({
            POSITION: [8, 9, 0, 0, 120, 0],
            TYPE: [ "swarmerTurret", { INDEPENDENT: true, COLOR: -1 } ],
        }, 5)
    ],
}
