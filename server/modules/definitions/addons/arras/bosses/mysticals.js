const { combineStats, menu, weaponArray } = require('../../../facilitators.js')
const { base, statnames } = require('../../../constants.js')
const g = require('../../../gunvals.js')

Class.arras_mysticals = menu("Mysticals", "gold", 4)
Class.arras_bosses.UPGRADES_TIER_0.push("arras_mysticals")
    Class.arras_mysticals.UPGRADES_TIER_0 = ["arras_sorcerer", "arras_summoner", "arras_enchantress", "arras_exorcistor", "arras_shaman"]

// shared stats
Class.arras_genericMystical = {
    PARENT: "miniboss",
    DANGER: 8,
    SIZE: 26,
    VALUE: 2e5,
    BODY: {
        FOV: 0.5
    }
}

// bosses
Class.arras_sorcerer = {
    PARENT: "arras_genericMystical",
    LABEL: "Sorcerer",
    DANGER: 7,
    SHAPE: 0,
    COLOR: "veryLightGrey",
    UPGRADE_COLOR: "veryLightGrey",
    MAX_CHILDREN: 50,
    VALUE: 2e5,
    BODY: {
        SPEED: 0.12 * base.SPEED,
        HEALTH: 6 * base.HEALTH,
        DAMAGE: 2 * base.DAMAGE,
    },
    GUNS: weaponArray({
        POSITION: [3.5, 8.65, 1.2, 8, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.machineGun, g.machineGunner, { damage: 1.8, size: 0.4, spray: 150, speed: 2, shudder: 1.75 }]),
            TYPE: "minichip",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: "drone",
            WAIT_TO_CYCLE: true,
        },
    }, 2)
}
Class.arras_summoner = {
    PARENT: "arras_genericMystical",
    LABEL: "Summoner",
    SHAPE: 4,
    COLOR: "gold",
    UPGRADE_COLOR: "gold",
    MAX_CHILDREN: 28,
    VALUE: 3e5,
    BODY: {
        SPEED: 0.1 * base.SPEED,
        HEALTH: 7 * base.HEALTH,
        DAMAGE: 2.6 * base.DAMAGE,
    },
    GUNS: weaponArray({
        POSITION: [3.5, 8.65, 1.2, 8, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, { size: 0.8 }]),
            TYPE: "summonerDrone",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: "drone",
            WAIT_TO_CYCLE: true,
        },
    }, 4)
}
Class.arras_enchantress = {
    PARENT: "arras_genericMystical",
    LABEL: "Enchantress",
    SHAPE: 3.5,
    COLOR: "orange",
    UPGRADE_COLOR: "orange",
    MAX_CHILDREN: 28,
    VALUE: 4e5,
    BODY: {
        SPEED: 0.09 * base.SPEED,
        HEALTH: 10 * base.HEALTH,
        DAMAGE: 3 * base.DAMAGE,
    },
    GUNS: weaponArray({
        POSITION: [3.5, 8.65, 1.2, 8, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, { size: 0.9, damage: 1.1 }]),
            TYPE: "dorito",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: "drone",
            WAIT_TO_CYCLE: true,
        },
    }, 3)
}
Class.arras_exorcistor = {
    PARENT: "arras_genericMystical",
    LABEL: "Exorcistor",
    SHAPE: 5.5,
    COLOR: "purple",
    UPGRADE_COLOR: "purple",
    MAX_CHILDREN: 20,
    VALUE: 5e5,
    BODY: {
        SPEED: 0.08 * base.SPEED,
        HEALTH: 15 * base.HEALTH,
        DAMAGE: 4 * base.DAMAGE,
    },
    GUNS: weaponArray({
        POSITION: [3.5, 8.65, 1.2, 8, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.destroyer, {maxSpeed: 1.2}]),
            TYPE: "demonchip",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: "drone",
            WAIT_TO_CYCLE: true,
        },
    }, 5)
}
Class.arras_shaman = {
    PARENT: "arras_genericMystical",
    LABEL: "Shaman",
    SHAPE: 6,
    COLOR: "hexagon",
    UPGRADE_COLOR: "hexagon",
    MAX_CHILDREN: 20,
    VALUE: 6e5,
    BODY: {
        SPEED: 0.07 * base.SPEED,
        HEALTH: 20 * base.HEALTH,
        DAMAGE: 5 * base.DAMAGE,
    },
    GUNS: weaponArray({
        POSITION: [3.5, 8.65, 1.2, 8, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.destroyer, { size: 1.1, maxSpeed: 1.2, damage: 1.1 }]),
            TYPE: "realchip",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: "drone",
            WAIT_TO_CYCLE: true,
        },
    }, 6)
}
