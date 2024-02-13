const { skillSet, menu, combineStats } = require('../facilitators.js');
const { base, statnames, gunCalcNames } = require('../constants.js');
const g = require('../gunvals.js');

const baseColor = '#50516e';
const bright1 = {BASE: baseColor, BRIGHTNESS_SHIFT: 7.5, SATURATION_SHIFT: 0.8};
const bright2 = {BASE: baseColor, BRIGHTNESS_SHIFT: 12.5, SATURATION_SHIFT: 0.55};
const dark1 = {BASE: baseColor, BRIGHTNESS_SHIFT: -7.5, SATURATION_SHIFT: 1.25};

const trim = '#cb52f7';

const shape3 = "M 0.78 -1.35 L -1.56 0 L -0.9 0 L -0.44 -0.26 L -0.35 -0.61 L 0 -0.51 L 0.45 -0.78 Z" +
            "M -1.56 0 L 0.78 1.35 L 0.45 0.78 L 0 0.51 L -0.35 0.61 L -0.44 0.26 L -0.9 0 Z" + 
            "M 0.78 1.35 L 0.78 -1.35 L 0.45 -0.78 L 0.45 -0.25 L 0.7 0 L 0.45 0.25 L 0.45 0.78 Z";
const insert3 = "M -0.7 0.11 L -0.39 0.18 L -0.35 0.61 L 0.04 0.43 L 0.25 0.66 L 0.04 0.54 L -0.5 0.87 L -0.48 0.24 Z" + 
            "M -0.7 -0.11 L -0.39 -0.18 L -0.35 -0.61 L 0.04 -0.43 L 0.25 -0.66 L 0.04 -0.54 L -0.5 -0.87 L -0.48 -0.24 Z" +
            "M 0.45 0.55 L 0.35 0.25 L 0.7 0 L 0.35 -0.25 L 0.45 -0.55 L 0.45 -0.3 L 1 0 L 0.45 0.3 Z";
Class.voidlingInsert3 = {
    SHAPE: insert3,
    COLOR: dark1,
    MIRROR_MASTER_ANGLE: true,
}

Class.voidlingCore1 = {
    PARENT: 'auraBase',
    FACING_TYPE: ["spin", {speed: -1}],
    SHAPE: 6,
    COLOR: 6,
    ALPHA: 0.7,
    PARTICLE_EMITTER: {
        RATE: 20,
        SIZE: 10,
        ALPHA: 0.6,
    }
}
Class.voidlingCore2 = {
    PARENT: 'auraBase',
    FACING_TYPE: ["spin", {speed: 0.65}],
    SHAPE: 6,
    COLOR: 6,
    ALPHA: 0.7,
}

Class.genericVoidling = {
    PARENT: "genericTank",
    TYPE: "miniboss",
    DANGER: 15,
    COLOR: baseColor,
    SKILL: skillSet({
        rld: 0.4, // reload
        dam: 0.7, // bullet damage
        pen: 0.6, // bullet pen
        str: 0.8, // bullet health
        spd: 0.8, // bullet speed
        atk: 0.3, // body damage
        hlt: 1,   // max health
        shi: 0.7, // max shield
        rgn: 0,   // shield regen
        mob: 1,   // movement speed
    }),
    // CONTROLLERS: ["nearestDifferentMaster", "canRepel"],
    HITS_OWN_TYPE: "hardOnlyBosses",
    SIZE: 40,
    VALUE: 1e6,
    BODY: {
        PUSHABILITY: 0.6,
        HEALTH: base.HEALTH * 8,
        DAMAGE: base.DAMAGE * 2,
        PENETRATION: base.PENETRATION * 2,
        SHIELD: base.SHIELD * 4,
        REGEN: base.REGEN * 0.3,
        SPEED: base.SPEED * 0.85,
        ACCELERATION: base.ACCEL * 0.7,
        FOV: base.FOV * 0.7,
        DENSITY: base.DENSITY * 8,
    }
}

// Relativity
Class.relativityMissileJet = {
    SHAPE: 'M 0.8 0 L 0 1 Q -0.45 0.35 -2 0 Q -0.45 -0.35 0 -1 Z',
    COLOR: 6,
    MIRROR_MASTER_ANGLE: true,
    PARTICLE_EMITTER: {
        RATE: 10,
        SIZE: 8,
        ALPHA: 0.6,
        SPEED: 6,
        ANGLE: {MIN: 150, MAX: 210},
    },
}
Class.relativityMissile = {
    PARENT: 'swarm',
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.165,
        DAMAGE: 6,
        PUSHABILITY: 0.3,
        ACCELERATION: 1,
    },
    SHAPE: "M 1.1 0 L -1.1 1 L -0.5 0 L -1.1 -1 Z",
    COLOR: baseColor,
    GUNS: [
        { // Fins
            POSITION: [9, 5, 0.001, -3, -4.75, 18, 0],
            PROPERTIES: {COLOR: bright2}
        }, {
            POSITION: [9, 5, 0.001, -3, 4.75, -18, 0],
            PROPERTIES: {COLOR: bright2}
        }, {
            POSITION: [6, 4, 0.001, -3, 7.5, 18, 0],
            PROPERTIES: {COLOR: dark1}
        }, {
            POSITION: [6, 4, 0.001, -3, -7.5, -18, 0],
            PROPERTIES: {COLOR: dark1}
        }, { // Shards
            POSITION: [18, 4.8, 0.001, 0, 0.5, 145, 0],
            PROPERTIES: {COLOR: trim, DRAW_ABOVE: true}
        }, {
            POSITION: [18, 4.8, 0.001, 0, -0.5, -145, 0],
            PROPERTIES: {COLOR: trim, DRAW_ABOVE: true}
        }, {
            POSITION: [18, 4.8, 0.001, 0, 0.5, 145, 0],
            PROPERTIES: shadingProperties(trim)
        }, {
            POSITION: [18, 4.8, 0.001, 0, -0.5, -145, 0],
            PROPERTIES: shadingProperties(trim)
        }, { // Center Diamond
            POSITION: [3, 2.75, 0.001, 1.4, 0, 0, 0],
            PROPERTIES: {COLOR: dark1, DRAW_ABOVE: true}
        }, {
            POSITION: [6, 2.75, 0.001, -1, 0, 180, 0],
            PROPERTIES: {COLOR: dark1, DRAW_ABOVE: true}
        }, { // Thruster
            POSITION: [5.75, 14, 0.001, 6.5, 0, 180, 0],
            PROPERTIES: {COLOR: baseColor}
        }, 
    ],
    TURRETS: [
        {
            POSITION: [17, -10, 0, 0, 0, 0],
            TYPE: 'relativityMissileJet'
        }
    ]
}

Class.relativity = {
    PARENT: 'genericVoidling',
    LABEL: "Relativity",
    SHAPE: shape3,
    GUNS: [
        {
            POSITION: [0, 5.5, 1, 0, 0, 0, 0,],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([]),
                TYPE: 'voidlingCore1',
                MAX_CHILDREN: 1,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                BORDERLESS: true,
            }, 
        }, {
            POSITION: [0, 6.5, 1, 0, 0, 0, 0,],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([]),
                TYPE: 'voidlingCore2',
                MAX_CHILDREN: 1,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                BORDERLESS: true,
            }, 
        },
    ],
    TURRETS: [
        {
            POSITION: [20, 0, 0, 0, 0, 1],
            TYPE: 'voidlingInsert3',
        }
    ]
}
function shadingProperties(color = bright1) {
    return {
        COLOR: color,
        BORDERLESS: true,
        DRAW_ABOVE: true,
    }
}
for (let a = 0; a < 3; a++) {
    Class.relativity.GUNS.push(
    {
        POSITION: [2.2, 8.625, 1.35, 13.6, 0, 120 * a, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, {damage: 0.7, health: 0.8, speed: 1.8, maxSpeed: 3.25, range: 2.2, size: 0.7}]),
            TYPE: 'relativityMissile',
            STAT_CALCULATOR: gunCalcNames.swarm,
            BORDERLESS: true,
            DRAW_FILL: false,
        }, 
    }, { // Body shading
        POSITION: [1.5, 6, 1.4, 4.4, 6, 120 * a, 0],
        PROPERTIES: shadingProperties()
    }, {
        POSITION: [1.5, 6, 1.4, 4.4, -6, 120 * a, 0],
        PROPERTIES: shadingProperties()
    }, {
        POSITION: [1, 4, 0.8, 5.8, 3.5, 120 * a, 0],
        PROPERTIES: shadingProperties()
    }, {
        POSITION: [1, 4, 0.8, 5.8, -3.5, 120 * a, 0],
        PROPERTIES: shadingProperties()
    }, {
        POSITION: [0.65, 4.5, 0.7, 5, 4.5, 120 * a, 0],
        PROPERTIES: shadingProperties(trim)
    }, {
        POSITION: [0.65, 4.5, 0.7, 5, -4.5, 120 * a, 0],
        PROPERTIES: shadingProperties(trim)
    }, { // Bracing
        POSITION: [0.6, 4.5, 1, 5, 0, 120 * a + 60, 0],
        PROPERTIES: {COLOR: bright1}
    }, {
        POSITION: [0.6, 4.5, 1, 6.5, 0, 120 * a + 60, 0],
        PROPERTIES: {COLOR: bright1}
    }, { // Shards
        POSITION: [9, 5, 0.001, 6, -4.5, 120 * a + 68, 0],
        PROPERTIES: {COLOR: trim},
    }, {
        POSITION: [9, 5, 0.001, 6, 4.5, 120 * a - 68, 0],
        PROPERTIES: {COLOR: trim},
    }, { // Guns
        POSITION: [2.7, 10, -1.2, 8, 0, 120 * a, 0],
        PROPERTIES: {COLOR: bright2}
    }, {
        POSITION: [2.7, 8.5, 1, 8, 0, 120 * a, 0],
        PROPERTIES: {COLOR: baseColor}
    }, {
        POSITION: [1.1, 11.5, 1, 10.7, 0, 120 * a, 0],
        PROPERTIES: {COLOR: baseColor}
    }, {
        POSITION: [1.1, 11.5, 0.75, 11.8, 0, 120 * a, 0],
        PROPERTIES: {COLOR: baseColor}
    }, {
        POSITION: [2.2, 8.625, 1.35, 13.6, 0, 120 * a, 0],
        PROPERTIES: {COLOR: baseColor}
    }, {
        POSITION: [1.2, 8.3, 0.8, 13.6, 0, 120 * a, 0],
        PROPERTIES: {COLOR: dark1, BORDERLESS: true}
    }, {
        POSITION: [0.7, 10, 1, 12.9, 0, 120 * a, 0],
        PROPERTIES: {COLOR: trim}
    }, {
        POSITION: [6.3, 4.3, 0.7, 8, 0, 120 * a, 0],
        PROPERTIES: {COLOR: bright2}
    })
}
function blinkerProperties(i) {
    return {
        COLOR: trim,
        BORDERLESS: true,
        DRAW_ABOVE: true,
        BLINKER: {
            REPEAT: 800,
            START: 125 * i,
            END: 400 + 125 * i,
            OFF_COLOR: dark1,
        }
    }
}
for (let a = 0; a < 3; a++) {
    // Blinkers
    for (let i = 0; i < 3; i++) {
        Class.relativity.GUNS.push({
            POSITION: [0.7, 1.2, 0.9, 6 + 1.4 * i, 4.3 - 0.9 * i, 120 * a + 60, 0],
            PROPERTIES: blinkerProperties(i)
        }, {
            POSITION: [0.7, 1.2, 0.9, 6 + 1.4 * i, -4.3 + 0.9 * i, 120 * a - 60, 0],
            PROPERTIES: blinkerProperties(i)
        })
    }
}

Class.voidlingsMenu = menu("Voidlings");
Class.voidlingsMenu.SHAPE = 3.5;
Class.voidlingsMenu.COLOR = baseColor;

Class.addons.UPGRADES_TIER_0.push("voidlingsMenu");
    Class.voidlingsMenu.UPGRADES_TIER_0 = ["relativity"];
