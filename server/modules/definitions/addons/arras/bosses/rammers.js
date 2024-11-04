const { menu } = require('../../../facilitators.js')
const { base } = require('../../../constants.js')
const g = require('../../../gunvals.js')

Class.arras_rammers = menu("Rammers", "aqua")
Class.arras_rammers.PROPS = [
    {
        POSITION: [21.5, 0, 0, 360, -1],
        TYPE: "smasherBody",
    }
]
Class.arras_bosses.UPGRADES_TIER_0.push("arras_rammers")
    Class.arras_rammers.UPGRADES_TIER_0 = ["bob", "nemesis"]

// shared stats
Class.arras_genericRammer = {
    PARENT: "genericBoss",
    SHAPE: 0,
    SIZE: 18,
    BODY: {
        FOV: 2,
        SPEED: 2 * base.SPEED,
        HEALTH: 5 * base.HEALTH,
        DAMAGE: 5 * base.DAMAGE,
        REGEN: 8 * base.REGEN,
        FOV: 0.5 * base.FOV,
        DENSITY: 6 * base.DENSITY
    },
    CONTROLLERS: ["nearestDifferentMaster", "canRepel", "mapTargetToGoal"],
}

// bosses
Class.bob = {
    PARENT: "arras_genericRammer",
    LABEL: "Bob",
    COLOR: "aqua",
    UPGRADE_COLOR: "aqua",
    CONTROLLERS: ["nearestDifferentMaster", "mapTargetToGoal"],
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody",
        }, {
            POSITION: [21.5, 0, 0, 30, 360, 0],
            TYPE: "landmineBody",
        }, {
            POSITION: [23.75, 0, 0, 0, 360, 0],
            TYPE: "spikeBody",
        }
    ]
}
Class.nemesis = {
    PARENT: "bob",
    LABEL: "Nemesis",
    COLOR: "red",
    UPGRADE_COLOR: "red",
    BODY: {
        REGEN: 1e5,
        HEALTH: 1e6,
        DENSITY: 30,
        DAMAGE: 1e5,
        FOV: 5,
    },
}
