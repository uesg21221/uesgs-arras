const { combineStats, makeAuto, makeHybrid, makeOver, makeDeco, makeGuard, makeSenior, makeElite, eliteAug, skillSet, addAura } = require('../facilitators.js');
const { base, statnames, gunCalcNames, dfltskl, smshskl } = require('../constants.js');
require('./generics.js');
const g = require('../gunvals.js');
//custom bodies
Class.genericChampion = {
  PARENT: ["genericTank"],
  COLOR: 14,
  DANGER: 10,
  EXTRA_SKILL: 18,
  BODY: {
    HEALTH: 5 * base.HEALTH,
    PENETRATION: 0.25,
    FOV: 1.1 * base.FOV,
    PUSHABILITY: 0,
    HETERO: 0,
    SHIELD: base.SHIELD * 1.3,
	SPEED: base.SPEED * 0.8,
    RESIST: 1.3,
  },
  SKILL_CAP: [
    smshskl,
    smshskl,
    smshskl,
    smshskl,
    smshskl,
    smshskl,
    smshskl,
    smshskl,
    smshskl,
    smshskl,
  ],
  TURRETS: [ {
	POSITION: [14, 0, 0, 0, 0, 1],
	TYPE: ["genericTank", {COLOR: 14}],
	},
  ],
};
// Whatever the hell is needed
Class.missile = {
    PARENT: ["bullet"],
    LABEL: "Missile",
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },
    GUNS: [
        {
            POSITION: [14, 6, 1, 0, -2, 130, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.skimmer,
                    g.doublereload,
                    g.lowpower,
                    g.muchmorerecoil,
                    g.morespeed,
                    g.morespeed,
                ]),
                TYPE: [
                    "bullet",
                    {
                        PERSISTS_AFTER_DEATH: true,
                    },
                ],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [14, 6, 1, 0, 2, 230, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.skimmer,
                    g.doublereload,
                    g.lowpower,
                    g.muchmorerecoil,
                    g.morespeed,
                    g.morespeed,
                ]),
                TYPE: [
                    "bullet",
                    {
                        PERSISTS_AFTER_DEATH: true,
                    },
                ],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        },
    ],
};
Class.hypermissile = {
    PARENT: ["missile"],
    GUNS: [
        {
            POSITION: [14, 6, 1, 0, -2, 150, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                ]),
                TYPE: [
                    "bullet",
                    {
                        PERSISTS_AFTER_DEATH: true,
                    },
                ],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [14, 6, 1, 0, 2, 210, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                ]),
                TYPE: [
                    "bullet",
                    {
                        PERSISTS_AFTER_DEATH: true,
                    },
                ],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [14, 6, 1, 0, -2, 90, 0.5],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                ]),
                TYPE: [
                    "bullet",
                    {
                        PERSISTS_AFTER_DEATH: true,
                    },
                ],
            },
        },
        {
            POSITION: [14, 6, 1, 0, 2, 270, 0.5],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                ]),
                TYPE: [
                    "bullet",
                    {
                        PERSISTS_AFTER_DEATH: true,
                    },
                ],
            },
        },
    ],
};
Class.minimissile = {
    PARENT: ["missile"],
    GUNS: [
        {
            /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [14, 6, 1, 0, 0, 180, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.skimmer,
                    g.doublereload,
                    g.lowpower,
                    g.muchmorerecoil,
                    g.morespeed,
                ]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        },
    ],
};
Class.spinmissile = {
    PARENT: ["bullet"],
    LABEL: "Missile",
    INDEPENDENT: !0,
    BODY: {
        RANGE: 120,
    },
    FACING_TYPE: "fastspin",
    GUNS: [
        {
            POSITION: [14, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                AUTOFIRE: !0,
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.skimmer,
                    g.doublereload,
                    g.lowpower,
                    g.morereload,
                    g.morespeed,
                ]),
                TYPE: [
                    "bullet",
                    {
                        PERSISTS_AFTER_DEATH: !0,
                    },
                ],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [14, 8, 1, 0, 0, 180, 0],
            PROPERTIES: {
                AUTOFIRE: !0,
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.skimmer,
                    g.doublereload,
                    g.lowpower,
                    g.morereload,
                    g.morespeed,
                ]),
                TYPE: [
                    "bullet",
                    {
                        PERSISTS_AFTER_DEATH: !0,
                    },
                ],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        },
    ],
};
Class.hyperspinmissile = {
    PARENT: ["bullet"],
    LABEL: "Missile",
    INDEPENDENT: !0,
    BODY: {
        RANGE: 120,
    },
    FACING_TYPE: "fastspin",
    GUNS: [
        {
            POSITION: [14, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                AUTOFIRE: !0,
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.skimmer,
                    g.doublereload,
                    g.lowpower,
                    g.morereload,
                    g.morespeed,
                ]),
                TYPE: [
                    "bullet",
                    {
                        PERSISTS_AFTER_DEATH: !0,
                    },
                ],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [14, 8, 1, 0, 0, 180, 0],
            PROPERTIES: {
                AUTOFIRE: !0,
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.skimmer,
                    g.doublereload,
                    g.lowpower,
                    g.morereload,
                    g.morespeed,
                ]),
                TYPE: [
                    "bullet",
                    {
                        PERSISTS_AFTER_DEATH: !0,
                    },
                ],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [14, 8, 1, 0, 0, 90, 0],
            PROPERTIES: {
                AUTOFIRE: !0,
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.skimmer,
                    g.doublereload,
                    g.lowpower,
                    g.morereload,
                    g.morespeed,
                ]),
                TYPE: [
                    "bullet",
                    {
                        PERSISTS_AFTER_DEATH: !0,
                    },
                ],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [14, 8, 1, 0, 0, 270, 0],
            PROPERTIES: {
                AUTOFIRE: !0,
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.skimmer,
                    g.doublereload,
                    g.lowpower,
                    g.morereload,
                    g.morespeed,
                ]),
                TYPE: [
                    "bullet",
                    {
                        PERSISTS_AFTER_DEATH: !0,
                    },
                ],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        },
    ],
};

Class.hive = {
    PARENT: ["bullet"],
    LABEL: "Hive",
    BODY: {
        RANGE: 90,
        FOV: 0.5,
    },
    FACING_TYPE: "turnWithSpeed",
    INDEPENDENT: true,
    CONTROLLERS: ["alwaysFire", "nearestDifferentMaster", "targetSelf"],
    AI: {
        NO_LEAD: true,
    },
    GUNS: [
        {
            POSITION: [7, 9.5, 0.6, 7, 0, 108, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bee]),
                TYPE: "bee",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 9.5, 0.6, 7, 0, 180, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bee]),
                TYPE: "bee",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 9.5, 0.6, 7, 0, 252, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bee]),
                TYPE: "bee",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 9.5, 0.6, 7, 0, 324, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bee]),
                TYPE: "bee",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 9.5, 0.6, 7, 0, 36, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bee]),
                TYPE: "bee",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
};
Class.snake = {
    PARENT: ["bullet"],
    LABEL: "Snake",
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },
    GUNS: [
        {
            POSITION: [6, 12, 1.4, 8, 0, 180, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.thruster,
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.hunter,
                    g.hunterSecondary,
                    g.snake,
                    g.snakeskin,
                ]),
                TYPE: [
                    "bullet",
                    {
                        PERSISTS_AFTER_DEATH: true,
                    },
                ],
            },
        },
        {
            POSITION: [10, 12, 0.8, 8, 0, 180, 0.5],
            PROPERTIES: {
                AUTOFIRE: true,
                NEGATIVE_RECOIL: true,
                STAT_CALCULATOR: gunCalcNames.thruster,
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.hunter,
                    g.hunterSecondary,
                    g.snake,
                ]),
                TYPE: [
                    "bullet",
                    {
                        PERSISTS_AFTER_DEATH: true,
                    },
                ],
            },
        },
    ],
};
Class.rocketeerMissile = {
    PARENT: ["bullet"],
    LABEL: "Missile",
    BODY: {
        RANGE: 120,
    },
    GUNS: [
        {
            POSITION: [16.5, 10, 1.5, 0, 0, 180, 7.5],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.missileTrail,
                    g.rocketeerMissileTrail,
                ]),
                TYPE: [
                    "bullet",
                    {
                        PERSISTS_AFTER_DEATH: true,
                    },
                ],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        },
    ],
};
Class.rocketeerMissile.SIZE = 100;

Class.surgeonPillboxTurret = {
    PARENT: ["genericTank"],
    LABEL: "",
    COLOR: 16,
    BODY: {
        FOV: 3,
    },
    HAS_NO_RECOIL: true,
    CONTROLLERS: [["spin", { independent: true, speed: 0.08 }]],
    TURRETS: [
        {
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "healerSymbol",
        },
    ],
    GUNS: [
        {
            POSITION: [17, 11, 1, 0, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.healer, g.turret]),
                TYPE: "healerBullet",
                AUTOFIRE: true,
            },
        },
        {
            POSITION: [14, 11, 1, 0, 0, 90, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.healer, g.turret]),
                TYPE: "healerBullet",
                AUTOFIRE: true,
            },
        },
        {
            POSITION: [17, 11, 1, 0, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.healer, g.turret]),
                TYPE: "healerBullet",
                AUTOFIRE: true,
            },
        },
        {
            POSITION: [14, 11, 1, 0, 0, 270, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.healer, g.turret]),
                TYPE: "healerBullet",
                AUTOFIRE: true,
            },
        },
    ],
};
Class.surgeonPillbox = {
    LABEL: "Pillbox",
    PARENT: ["trap"],
    SHAPE: -6,
    MOTION_TYPE: "motor",
    CONTROLLERS: ["goToMasterTarget", "nearestDifferentMaster"],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
        DAMAGE: 0
    },
    DIE_AT_RANGE: true,
    TURRETS: [
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: "surgeonPillboxTurret",
        },
    ],
};
Class.doctorDrone = {
    PARENT: ["drone"],
    HITS_OWN_TYPE: "normal",
    TURRETS: [
        {
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "healerSymbol",
        },
    ],
};

Class.sunchip = {
    PARENT: ["drone"],
    SHAPE: 4,
    NECRO: true,
    HITS_OWN_TYPE: "hard",
    BODY: {
        FOV: 0.5,
    },
    AI: {
        BLIND: true,
        FARMER: true,
    },
    DRAW_HEALTH: false,
};
Class.eggchip = {
    PARENT: ["sunchip"],
    SHAPE: 0,
};
Class.autosunchip = {
    PARENT: ["sunchip"],
    AI: {
        BLIND: true,
        FARMER: true,
    },
    INDEPENDENT: true,
};
Class.autoeggchip = {
    PARENT: ["eggchip"],
    AI: {
        BLIND: true,
        FARMER: true,
    },
    INDEPENDENT: true,
};
Class.pentachip = {
    PARENT: ["sunchip"],
    SHAPE: 5,
};
Class.summonerDrone = {
    PARENT: ["sunchip"],
    NECRO: false,
};
Class.gunchip = {
    PARENT: ["drone"],
    SHAPE: -2,
    NECRO: true,
    HITS_OWN_TYPE: "hard",
    BODY: {
        FOV: 0.5,
    },
    AI: {
        BLIND: true,
        FARMER: true,
    },
    DRAW_HEALTH: false,
};

Class.minion = {
    PARENT: ["genericTank"],
    LABEL: "Minion",
    TYPE: "minion",
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: "hardWithBuffer",
    FACING_TYPE: "smoothToTarget",
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        "nearestDifferentMaster",
        "mapAltToFire",
        "minion",
        "canRepel",
        "hangOutNearMaster",
    ],
    GUNS: [
        {
            POSITION: [17, 9, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minionGun]),
                WAIT_TO_CYCLE: true,
                TYPE: "bullet",
            },
        },
    ],
};
Class.megaMinion = {
    PARENT: ["minion"],
    LABEL: "Mega Minion",
    BODY: {
        ACCELERATION: base.ACCEL * 0.8,
    },
    GUNS: [
        {
            /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [19.5, 13, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.minionGun]),
                TYPE: "bullet",
            },
        },
    ],
};
Class.tinyMinion = {
    PARENT: ["minion"],
    LABEL: "Tiny Minion",
    ACCEPTS_SCORE: false,
    SHAPE: 0,
    MOTION_TYPE: 'swarm',
    CRAVES_ATTENTION: true,
    BODY: {
        ACCELERATION: 3,
        PENETRATION: 1.5,
        HEALTH: 0.35 * 0.5,
        DAMAGE: 2.25,
        RESIST: 1.6,
        RANGE: 300,
        DENSITY: 12,
        PUSHABILITY: 0.5,
        FOV: 1.5,
    },
    AI: {
        BLIND: true,
    },
    GUNS: [ { /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
        POSITION: [    17,         9,            1,            0,            0,            0,            0,     ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minionGun, g.lowpower]),
            WAIT_TO_CYCLE: true,
            TYPE: "bullet",
        }, }, 
    ],
    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true,
};

Class.setTrap = {
    LABEL: "Set Trap",
    PARENT: ["trap"],
    SHAPE: -4,
    MOTION_TYPE: "motor",
    CONTROLLERS: ["goToMasterTarget"],
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
};
Class.boomerang = {
    LABEL: "Boomerang",
    PARENT: ["trap"],
    CONTROLLERS: ["boomerang"],
    MOTION_TYPE: "motor",
    HITS_OWN_TYPE: "never",
    SHAPE: -5,
    BODY: {
        SPEED: 1.25,
        RANGE: 120,
    },
};
Class.masterBullet = {
    PARENT: ["trap"],
    SHAPE: 0,
    GUNS: [
        {
            /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flankGuard,
                    g.triAngle,
                    g.triAngleFront,
                    g.tonsmorerecoil,
                    g.minionGun,
                    g.weak,
                ]),
                TYPE: "bullet",
                LABEL: "Front",
                AUTOFIRE: true,
            },
        },
        {
            POSITION: [13, 8, 1, 0, -1, 140, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flankGuard,
                    g.triAngle,
                    g.thruster,
                    g.minionGun,
                    g.weak,
                ]),
                TYPE: "bullet",
                LABEL: "Thruster",
                AUTOFIRE: true,
            },
        },
        {
            POSITION: [13, 8, 1, 0, 1, 220, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flankGuard,
                    g.triAngle,
                    g.thruster,
                    g.minionGun,
                    g.weak,
                ]),
                TYPE: "bullet",
                LABEL: "Thruster",
                AUTOFIRE: true,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flankGuard,
                    g.triAngle,
                    g.thruster,
                    g.minionGun,
                    g.weak,
                ]),
                TYPE: "bullet",
                LABEL: "Thruster",
                AUTOFIRE: true,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flankGuard,
                    g.triAngle,
                    g.thruster,
                    g.minionGun,
                    g.weak,
                ]),
                TYPE: "bullet",
                LABEL: "Thruster",
                AUTOFIRE: true,
            },
        },
    ],
};

Class.autoTankGun = {
    PARENT: ["genericTank"],
    LABEL: "",
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
    COLOR: 16,
    GUNS: [
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.auto]),
                TYPE: "bullet",
            },
        },
    ],
};
Class.bansheegun = {
    PARENT: ["genericTank"],
    LABEL: "",
    CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
    COLOR: 16,
    INDEPENDENT: true,
    GUNS: [
        {
            POSITION: [26, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.auto, g.lessreload]),
                TYPE: "bullet",
            },
        },
    ],
};
Class.auto4gun = {
    PARENT: ["genericTank"],
    LABEL: "",
    BODY: {
        FOV: 2,
    },
    CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
    COLOR: 16,
    GUNS: [
        {
            POSITION: [16, 4, 1, 0, -3.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.auto]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 4, 1, 0, 3.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.auto]),
                TYPE: "bullet",
            },
        },
    ],
};
Class.bigauto4gun = {
    PARENT: ["genericTank"],
    LABEL: "",
    CONTROLLERS: [
        "canRepel",
        "onlyAcceptInArc",
        "mapAltToFire",
        "nearestDifferentMaster",
    ],
    COLOR: 16,
    GUNS: [
        {
            POSITION: [14, 5, 1, 0, -4.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.auto,
                    g.gunner,
                    g.twin,
                    g.twin,
                    g.power,
                    g.halfreload,
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 5, 1, 0, 4.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.auto,
                    g.gunner,
                    g.twin,
                    g.twin,
                    g.power,
                    g.halfreload,
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 5, 1, 0, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.auto,
                    g.gunner,
                    g.twin,
                    g.twin,
                    g.power,
                    g.halfreload,
                ]),
                TYPE: "bullet",
            },
        },
    ],
};
Class.megaAutoTankgun = {
    PARENT: ["genericTank"],
    LABEL: "",
    BODY: {
        FOV: 2,
        SPEED: 0.9,
    },
    CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
    COLOR: 16,
    GUNS: [
        {
            POSITION: [22, 14, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.auto]),
                TYPE: "bullet",
            },
        },
    ],
};

Class.autoTurret = {
    PARENT: ["genericTank"],
    LABEL: "Turret",
    BODY: {
        FOV: 0.8,
    },
	CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
    COLOR: 16,
    GUNS: [
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.power, g.turret]),
                TYPE: "bullet",
            },
        },
    ],
};
Class.droneAutoTurret = {
    PARENT: ["genericTank"],
    LABEL: "Turret",
    BODY: {
        FOV: 0.8,
    },
    COLOR: 16,
    GUNS: [
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.overdrive]),
                TYPE: "bullet",
            },
        },
    ],
};
Class.autoSmasherTurret = {
    PARENT: ["genericTank"],
    LABEL: "Turret",
    COLOR: 16,
    GUNS: [
        {
            POSITION: [20, 6, 1, 0, 5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.machineGun, g.pounder, g.morereload, g.morereload]),
                TYPE: "bullet",
                STAT_CALCULATOR: gunCalcNames.fixedReload,
            },
        },
        {
            POSITION: [20, 6, 1, 0, -5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.machineGun, g.pounder, g.morereload, g.morereload]),
                TYPE: "bullet",
                STAT_CALCULATOR: gunCalcNames.fixedReload,
            },
        },
    ],
};
Class.architectGun = {
    PARENT: ["genericTank"],
    LABEL: "",
    COLOR: 16,
	CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
    GUNS: [
        {
            POSITION: [20, 16, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [2, 16, 1.1, 20, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.auto]),
                TYPE: "trap",
            },
        },
    ],
};

Class.pillboxTurret = {
    PARENT: ["genericTank"],
    LABEL: "",
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    GUNS: [
        {
            POSITION: [22, 11, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minionGun, g.turret, g.power, g.auto, g.notdense]),
                TYPE: "bullet",
            },
        },
    ],
};
Class.pillbox = {
    LABEL: "Pillbox",
    PARENT: ["trap"],
    SHAPE: -4,
    MOTION_TYPE: "motor",
    CONTROLLERS: ["goToMasterTarget", "nearestDifferentMaster"],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true,
    TURRETS: [
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: "pillboxTurret",
        },
    ],
};

Class.swarm = {
    LABEL: "Swarm Drone",
    TYPE: "swarm",
    ACCEPTS_SCORE: false,
    SHAPE: 3,
    MOTION_TYPE: "swarm",
    FACING_TYPE: "smoothWithMotion",
    CONTROLLERS: ["nearestDifferentMaster", "mapTargetToGoal"],
    CRAVES_ATTENTION: true,
    BODY: {
        ACCELERATION: 3,
        PENETRATION: 1.5,
        HEALTH: 0.175,
        DAMAGE: 2.25,
        SPEED: 4.5,
        RESIST: 1.6,
        RANGE: 225,
        DENSITY: 12,
        PUSHABILITY: 0.6,
        FOV: 1.5,
    },
    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true,
};
Class.autoswarm = {
    PARENT: ["swarm"],
    AI: {
        FARMER: true,
    },
    INDEPENDENT: true,
};
Class.bee = {
    PARENT: ["swarm"],
    PERSISTS_AFTER_DEATH: true,
    SHAPE: 4,
    LABEL: "Drone",
    HITS_OWN_TYPE: "hardWithBuffer",
};
Class.homingBullet = {
    PARENT: ["autoswarm"],
    SHAPE: 0,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.165,
        DAMAGE: 6,
        PUSHABILITY: 0.3,
    },
    CAN_GO_OUTSIDE_ROOM: true,
};

Class.smasherBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true }]],
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true,
};
Class.landmineBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true, speed: 0.08 }]],
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: !0,
};
Class.spikeBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true }]],
    COLOR: 9,
    SHAPE: 3,
    INDEPENDENT: true,
};
Class.weirdSpikeBody1 = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true, speed: 0.08 }]],
    COLOR: 9,
    SHAPE: 3,
    INDEPENDENT: true,
};
Class.weirdSpikeBody2 = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true, speed: -0.05 }]],
    COLOR: 9,
    SHAPE: 3,
    INDEPENDENT: true,
};

// BASIC TANK AND STARTING UPGRADES
Class.basic = {
    PARENT: ["genericTank"],
    LABEL: "Basic",
    BODY: {
        ACCELERATION: base.ACCEL * 1,
        SPEED: base.SPEED * 1,
        HEALTH: base.HEALTH * 1,
        DAMAGE: base.DAMAGE * 1,
        PENETRATION: base.PENETRATION * 1,
        SHIELD: base.SHIELD * 1,
        REGEN: base.REGEN * 1,
        FOV: base.FOV * 1,
        DENSITY: base.DENSITY * 1,
        PUSHABILITY: 1,
        HETERO: 3,
    },
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
                COLOR: 16,
                LABEL: "",
                STAT_CALCULATOR: 0,
                WAIT_TO_CYCLE: false,
                AUTOFIRE: false,
                SYNCS_SKILLS: false,
                MAX_CHILDREN: 0,
                ALT_FIRE: false,
                NEGATIVE_RECOIL: false,
            },
        },
    ],
};
Class.twin = {
    PARENT: ["genericTank"],
    LABEL: "Twin",
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: "bullet",
            },
        },
    ],
};
Class.sniper = {
    PARENT: ["genericTank"],
    LABEL: "Sniper",
    BODY: {
        FOV: 1.2 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [24, 8.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: "bullet",
            },
        },
    ],
};
Class.machineGun = {
    PARENT: ["genericTank"],
    LABEL: "Machine Gun",
    GUNS: [
        {
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun]),
                TYPE: "bullet",
            },
        },
    ],
};
Class.flankGuard = {
    PARENT: ["genericTank"],
    LABEL: "Flank Guard",
    BODY: {
        SPEED: 1.1 * base.SPEED,
    },
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard]),
                TYPE: "bullet",
            },
        },
    ],
};
Class.director = {
    PARENT: ["genericTank"],
    LABEL: "Director",
    STAT_NAMES: statnames.drone,
    BODY: {
        FOV: base.FOV * 1.1,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [6, 11, 1.3, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                MAX_CHILDREN: 6,
            },
        },
    ],
};
Class.pounderer = {
    PARENT: ["genericTank"],
    LABEL: "pounderer",
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20.5, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder]),
                TYPE: "bullet",
            },
        },
    ],
};
Class.trapper = {
    PARENT: ["genericTank"],
    LABEL: "Trapper",
    STAT_NAMES: statnames.trap,
    GUNS: [
        {
            POSITION: [15, 7, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [3, 7, 1.7, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
};
Class.smasher = {
    PARENT: ["genericTank"],
    LABEL: "Smasher",
    DANGER: 6,
    BODY: {
        FOV: 1.05 * base.FOV,
        DENSITY: 2 * base.DENSITY,
    },
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody",
        },
    ],
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
    STAT_NAMES: statnames.smasher,
};
Class.healer = {
    PARENT: ["genericTank"],
    LABEL: "Healer",
    TURRETS: [
        {
            /** SIZE     X       Y     ANGLE    ARC */
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "healerSymbol",
        },
    ],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 9, -0.5, 12.5, 0, 0, 0],
        },
        {
            POSITION: [18, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.healer]),
                TYPE: "healerBullet",
            },
        },
    ],
};

// TWIN UPGRADES

// DOUBLE TWIN UPGRADES
// MACHINE GUN UPGRADES
Class.sprayer = {
    PARENT: ["genericTank"],
    LABEL: "Sprayer",
    GUNS: [
        {
            POSITION: [23, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.lowpower,
                    g.machineGun,
                    g.morerecoil,
                ]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun]),
                TYPE: "bullet",
            },
        },
    ],
};
// parrysphere
Class.parry = {
    PARENT: ["bullet"],
    LABEL: "",
    TYPE: "bullet",
    MOTION_TYPE: "withMaster",
    ALPHA: 0.25,
    CLEAR_ON_MASTER_UPGRADE: true,
    CAN_GO_OUTSIDE_ROOM: true,
    BODY: {
    PUSHABILITY: 0,
    HEALTH: 10000,
    SHIELD: 10000,
    REGEN: 1000,
	RANGE: 5,
    DAMAGE: 1,
    RESIST: 100,
    STEALTH: 1,
	HETERO: 999,
  },
};
Class.parrysphere = {
    PARENT: ["bullet"],
    LABEL: "",
    TYPE: "parrysphere",
    MOTION_TYPE: "withMaster",
    DAMAGE_EFFECTS: false,
    DIE_AT_RANGE: false,
    ALPHA: 0.25,
    CLEAR_ON_MASTER_UPGRADE: true,
    CAN_GO_OUTSIDE_ROOM: true,
    BODY: {
        REGEN: 1e5,
        HEALTH: 1e6,
        DENSITY: 0,
        DAMAGE: 0.25,
        SPEED: 0,
        PUSHABILITY: 0,
    },
    TURRETS: [
        {
            /*    SIZE         X             Y         ANGLE        ARC       Z*/
            POSITION: [20, 0, 0, 0, 360, 1],
            TYPE: ["genericEntity", { COLOR: 0 }]
        },
    ]
};
Class.parrysphereSymbol = {
    PARENT: ["genericTank"],
   // CONTROLLERS: ["reversespin"],
    INDEPENDENT: true,
    COLOR: 0,
    SHAPE: [
        [-0.598,-0.7796],
        [-0.3817,-0.9053],
        [0.9688,-0.1275],
        [0.97,0.125],
        [-0.3732,0.9116],
        [-0.593,0.785]
    ]
};
Class.parryMove = {
    PARENT: ["genericTank"],
    LABEL: "Parry",
    COLOR: 9,
    GUNS: [
        {
            POSITION: [0, 20, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.parry]),
                TYPE: "parry",
                MAX_CHILDREN: 1,
                ALT_FIRE: true,
                SYNCS_SKILLS: true,
            },
        }, 
    ],
    TURRETS: [
        {
            /*    SIZE         X             Y         ANGLE        ARC       Z*/
            POSITION: [20, 0, 0, 0, 360, 1],
            TYPE: "parrysphereSymbol",
        },
    ]
};
Class.parrysphereGenerator = {
    PARENT: ["genericTank"],
    LABEL: "parrysphere",
    COLOR: 9,
    GUNS: [
        {
            POSITION: [0, 20, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.parrysphere]),
                TYPE: "parrysphere",
                MAX_CHILDREN: 1,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        }, 
    ],
    TURRETS: [
        {
            /*    SIZE         X             Y         ANGLE        ARC       Z*/
            POSITION: [20, 0, 0, 0, 360, 1],
            TYPE: "parrysphereSymbol",
        },
    ]
};
Class.parrysphereHeal = {
    PARENT: ["healerBullet"],
    LABEL: "",
    TYPE: "parrysphere",
    MOTION_TYPE: "withMaster",
    DAMAGE_EFFECTS: false,
    DIE_AT_RANGE: false,
    ALPHA: 0.25,
    CLEAR_ON_MASTER_UPGRADE: true,
    CAN_GO_OUTSIDE_ROOM: true,
    BODY: {
        REGEN: 1e5,
        HEALTH: 1e6,
        DENSITY: 0,
        DAMAGE: 0.25,
        SPEED: 0,
        PUSHABILITY: 0,
    },
    TURRETS: [
        {
            /*    SIZE         X             Y         ANGLE        ARC       Z*/
            POSITION: [20, 0, 0, 0, 360, 1],
            TYPE: ["genericEntity", { COLOR: 12 }]
        },
    ]
};
Class.parrysphereHealerGenerator = {
    PARENT: ["genericTank"],
    LABEL: "parrysphere",
    COLOR: 9,
    GUNS: [
        {
            POSITION: [0, 20, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.healer, g.parrysphere]),
                TYPE: "parrysphereHeal",
                MAX_CHILDREN: 1,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        }, 
    ],
    TURRETS: [
        {
            /*    SIZE         X             Y         ANGLE        ARC       Z*/
            POSITION: [20, 0, 0, 0, 360, 1],
            TYPE: "healerSymbol",
        },
    ]
};
//custom turrets

Class.cosmeticring2 = {
	SHAPE: "m 1 0 a 1 1 90 0 0 -2 0 a 1 1 90 0 0 2 0 m 0 0 M 0.8 0 A 0.8 0.8 90 0 1 -1 0 M -1 0 A 0.8 0.8 90 0 1 0.8 0 M 0.8 0",
	LABEL: '',
	COLOR: 17,
};
Class.cosmeticring = {
	SHAPE: "m 1 0 a 1 1 90 0 0 -2 0 a 1 1 90 0 0 2 0 m 0 0 M 0.8 0 A 0.8 0.8 90 0 1 -0.8 0 A 0.8 0.8 90 0 1 0.8 0 M 0.8 0",
	LABEL: '',
};

Class.bastionchampTurret = {
	PARENT: ["auto4gun"],
	SHAPE: Class.cosmeticring.SHAPE,
};
Class.minijavelinChampionTurret = {
    PARENT: ["genericTank"],
    LABEL: "",
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
    COLOR: 16,
    GUNS: [
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.auto, {damage: 0.65}]),
                TYPE: "bullet",
            },
        },
    ],
};
Class.copterchaingun = {
   PARENT: ["genericTank"],
   HAS_NO_RECOIL: true,
   LABEL: '',
   GUNS: [ {
         POSITION: [ 28, 4, 1, 2, 8, 0, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.nailgun, g.morespeed]),
            TYPE: "bullet",
         },
         }, {
         POSITION: [ 28, 4, 1, 2, -8, 0, 0.66, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.nailgun, g.morespeed]),
            TYPE: "bullet",
         },
         }, {
         POSITION: [ 28, 4, 1, 2, 0, 0, 0.33, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.nailgun, g.morespeed]),
            TYPE: "bullet",
         },
         }, {
         POSITION: [ 4, 24, 1, 9, 0, 0, 0, ],
		 PROPERTIES: {COLOR: 17},
         }, {
         POSITION: [ 4, 24, 1, 18, 0, 0, 0, ],
		 PROPERTIES: {COLOR: 17},
         }, {
         POSITION: [ 23, 18, 1.5, -18, 0, 0, 0, ],
         }, {
         POSITION: [ 20, 4, 1.5, -19, 4, 0, 0, ],
         }, {
         POSITION: [ 20, 4, 1.5, -19, -4, 0, 0, ],
         }, 
     ],
};

Class.copterblade = {
   PARENT: ["genericTank"],
   CONTROLLERS: [["spin", { independent: true, speed: 0.10 }]],
   INDEPENDENT: true,
   COLOR: 17,
   LABEL: '',
   GUNS: [ {
         POSITION: [ 80, 1, 8, 9, 0, 0, 0, ],
		 PROPERTIES: { COLOR: 17},
         }, {
         POSITION: [ 80, 1, 8, 9, 0, 180, 0, ],
		 PROPERTIES: { COLOR: 17},
         }, {
         POSITION: [ 80, 1, 8, 9, 0, -120, 0, ],
		 PROPERTIES: { COLOR: 17},
         }, {
         POSITION: [ 80, 1, 8, 9, 0, 120, 0, ],
		 PROPERTIES: { COLOR: 17},
         }, {
         POSITION: [ 80, 1, 8, 9, 0, -60, 0, ],
		 PROPERTIES: { COLOR: 17},
         }, {
         POSITION: [ 80, 1, 8, 9, 0, 60, 0, ],
		 PROPERTIES: { COLOR: 17},
         }, 
     ],
};
Class.copterpiece = {
	PARENT: ["genericTank"],
	SHAPE: "M-3.18-.22-3.18.22-1.26.44-1.02.77 1.25.77 1.24-.77-1.04-.77-1.28-.44-3.2-.22",
	LABEL: '',
};
Class.junkTurret = {
    PARENT: ["genericTank"],
    LABEL: "Turret",
	HAS_NO_RECOIL: true,
	DRAW_HEALTH: false,
    BODY: {
		DAMAGE: 0,
        FOV: 0.8,
    },
    COLOR: 16,
    GUNS: [
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.junkturret]),
                TYPE: "bullet",
            },
        },
    ],
};
Class.quadjunkTurret = {
    PARENT: ["genericTank"],
    LABEL: "Turret",
	HAS_NO_RECOIL: true,
	DRAW_HEALTH: false,
    INDEPENDENT: true,
    GUNS: [ {
         POSITION: [ 20, 10, 1, 0, 0, -90, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.turret, g.doublereload]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 20, 10, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.turret, g.doublereload]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 20, 10, 1, 0, 0, 90, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.turret, g.doublereload]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 20, 10, 1, 0, 0, -180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.turret, g.doublereload]),
            TYPE: "bullet",
         }, }, 
     ],
};
Class.dissileChampionArm = {
   PARENT: ["genericTank"],
   LABEL: 'Dissile Gauntlet',
   CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire",],
   SHAPE: [[-0.7,-0.7],[0.7,-0.7],[0.7,0.7],[-0.7,0.7]],
   GUNS: [ {
         POSITION: [ 18, 7, -1.5, 0, 6, 0, 0, ],
         }, {
         POSITION: [ 18, 7, -1.5, 0, -6, 0, 0, ],
         }, {
         POSITION: [ 5, 7, 1.5, 17, 6, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.dissile, g.dissilechamp]),
            TYPE: "dissileChampionmissile",
         }, }, {
         POSITION: [ 5, 7, 1.5, 17, -6, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.dissile, g.dissilechamp]),
            TYPE: "dissileChampionmissile",
         }, }, {
         POSITION: [ 13, 6, -2, 0, 0, -75, 0, ],
         }, {
         POSITION: [ 13, 6, -2, 0, 0, 75, 0, ],
         }, {
         POSITION: [ 4, 9, -1.125, 9, 6, 0, 0, ],
		 PROPERTIES: {COLOR:14},
         }, {
         POSITION: [ 4, 9, -1.125, 9, -6, 0, 0, ],
		 PROPERTIES: {COLOR:14},
         }, 
     ],
};
Class.bubblejetturret = (() => {
	let gunstat = [g.basic, g.bubblejetturret],
		delay = 0.1,
		GUNS = [];
	for (let i = 0; i < 4; i++) {
	GUNS.push({
         POSITION: [ 16, 4, 1, 0, 6, 6, delay*i, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats(gunstat),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 16, 4, 1, 0, -6, -6, delay*i, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats(gunstat),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 16, 4, 1, 0, 2, 3, delay*i, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats(gunstat),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 16, 4, 1, 0, -2, -3, delay*i, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats(gunstat),
            TYPE: "bullet",
         }
		
	});
	}
	 
	return {
		PARENT: ["genericTank"],
		LABEL: 'Bubble Jet Turret',
		CONTROLLERS: ["nearestDifferentMaster"],
		GUNS,
	};
	
})();

Class.bubbleturret = {
   PARENT: ["genericTank"],
   CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
   INDEPENDENT: true,
   LABEL: 'Bubble Turret',
   GUNS: [ {
         POSITION: [ 20, 10, 1, 0, 0, -90, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.turret]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 20, 10, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.turret]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 20, 10, 1, 0, 0, 90, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.turret]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 20, 10, 1, 0, 0, -180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.turret]),
            TYPE: "bullet",
         }, }, 
     ],
};

Class.twinionsentry = {
    LABEL: "Twinion",
    PARENT: ["trap"],
    MOTION_TYPE: "motor",
    CONTROLLERS: ["goToMasterTarget", "nearestDifferentMaster", "canRepel"],
	FACING_TYPE: "smoothToTarget",
    INDEPENDENT: true,
	HAS_NO_RECOIL: true,
	SHAPE: 0,
    BODY: {
		ACCELERATION: 5,
        SPEED: 0.8,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true,
	GUNS: [ {
         POSITION: [ 15, 8, 1, 0, 6, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g.minionGun]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 15, 8, 1, 0, -6, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g.minionGun]),
            TYPE: "bullet",
         }, }, 
     ],	
};
//custom projectiles
Class.blarearmamentchampbullet = {
	PARENT: ["blarearmamentbullet"],
	TURRETS: [ {
		POSITION: [20, 0, 0, 0, 360, 0],
		TYPE: "spikeBody",
	},
	{
		POSITION: [20, 0, 0, 0, 360, 0],
		TYPE: "weirdSpikeBody1",
	},
	],
};
Class.copterbomb = (() => {
	barrels = 12; 
   let angle = 360/12;
	   GUNS = [];
   for (let i = 0; i < barrels; i++) {
        GUNS.push({
         POSITION: [ 1, 8, 1, 0, 0, angle*i, 99],
         PROPERTIES: {
			SHOOT_ON_DEATH: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.morespeed]),
            TYPE: ["bullet", {PERSISTS_AFTER_DEATH: true,}]}
   });
   }
   return {
	PARENT: ["bullet"],
	LABEL: "Hele-Bomb",
	GUNS,
	TURRETS: [ {
		POSITION: [30, 0, 0, 0, 0, 0,],
		TYPE: "genericTank",
		},
	]
   };
})();
Class.buddydronechamp = {
    PARENT: ["genericTank"],
    LABEL: "Pal of P.A.L.",
	NAME: "Pal of P.A.L.",
    TYPE: "tank",
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: "hardWithBuffer",
    FACING_TYPE: "smoothToTarget",
    BODY: {
        FOV: 0.5,
        SPEED: 0.7,
        ACCELERATION: 0.2,
        HEALTH: 5,
        SHIELD: 1,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 0.25,
        DENSITY: 15,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: true,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        "nearestDifferentMaster",
		"mapTargetToGoal",
        "hangOutNearMaster",
		"minion",
    ],
    GUNS: [ {
         POSITION: [ 13, 8, 1, 0, 0, 0, 0, ],
		 PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.buddychampdrone]),
                TYPE: "bullet",
         }, }, {
         POSITION: [ 12, 2, 1, 2, -4, 0, 0, ],
         }, {
         POSITION: [ 12, 2, 1, 2, 4, 0, 0, ],
         }, {
         POSITION: [ 12, 2, 1, -1, -5, 0, 0, ],
         }, {
         POSITION: [ 12, 2, 1, -1, 5, 0, 0, ],
         }, 
    ],
};
Class.crosschampdrone = {
    LABEL: "Drone",
    TYPE: "drone",
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    MOTION_TYPE: "chase",
    FACING_TYPE: "smoothToTarget",
    CONTROLLERS: [
        "mapTargetToGoal",
        "hangOutNearMaster",
    ],
    AI: {
        BLIND: true,
    },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.5,
        HEALTH: 0.1,
        DAMAGE: 1.375,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.5,
    },
    HITS_OWN_TYPE: "push",
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
	SHAPE: 0,
};
Class.crossdrone = {
    LABEL: "Drone",
    TYPE: "drone",
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    MOTION_TYPE: "chase",
    FACING_TYPE: "smoothToTarget",
    CONTROLLERS: [
        "mapTargetToGoal",
        "hangOutNearMaster",
    ],
    AI: {
        BLIND: true,
    },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.5,
        HEALTH: 0.1,
        DAMAGE: 1.375,
        SPEED: 4.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.5,
    },
    HITS_OWN_TYPE: "push",
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
	SHAPE: 0,
};
Class.blarearmamentbullet = {
    PARENT: ["bullet"],
    LABEL: "Snake",
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },
    GUNS: [
		 {
         POSITION: [ 12, 5, 1.5, 0, 0, 120, 0, ],
		 PROPERTIES: {
			 SHOOT_SETTINGS: combineStats(g.drone, g.cross),
			TYPE: ["crosschampdrone", {CONTROLLERS: ["nearestDifferentMaster"], INDEPENDENT: true, BODY: {ACCELERATION: 0.2, SPEED: 10, FOV: 0.5},}],
             AUTOFIRE: true,
             MAX_CHILDREN: 2,
			 
		 },
         }, {
         POSITION: [ 12, 5, 1.5, 0, 0, -120, 0, ],
		 PROPERTIES: {
			 SHOOT_SETTINGS: combineStats(g.drone, g.cross),
			 TYPE: ["crosschampdrone", {CONTROLLERS: ["nearestDifferentMaster"], INDEPENDENT: true, BODY: {ACCELERATION: 0.2, SPEED: 10, FOV: 0.5,},}],
             AUTOFIRE: true,
             MAX_CHILDREN: 2,
			 
		 },
         },
		 
        {
            POSITION: [6, 12, 1.4, 8, 0, 180, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.thruster,
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.hunter,
                    g.hunterSecondary,
                    g.snake,
                    g.snakeskin,
                ]),
                TYPE: [
                    "bullet",
                    {
                        PERSISTS_AFTER_DEATH: true,
                    },
                ],
            },
        },
        {
            POSITION: [10, 12, 0.8, 8, 0, 180, 0.5],
            PROPERTIES: {
                AUTOFIRE: true,
                NEGATIVE_RECOIL: true,
                STAT_CALCULATOR: gunCalcNames.thruster,
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.hunter,
                    g.hunterSecondary,
                    g.snake,
                ]),
                TYPE: [
                    "bullet",
                    {
                        PERSISTS_AFTER_DEATH: true,
                    },
                ],
            },
        },
		
    ],
};
Class.ant = {
	PARENT: ["drone"],
	SHAPE: "M.54.8A.8.64 90 00.54-.8M.54.8A.8.64 90 01.54-.8 M-.494.92A.92.736 90 00-.494-.92M-.494.92A.92.736 90 01-.494-.92",
	HITS_OWN_TYPE: "hardWithBuffer",
	BODY: {ACCELERATION: 0.25},
	GUNS: [ {
         POSITION: [ 10, 5, 0.01, 3, 0, 105, 0, ],
		 PROPERTIES: {COLOR: 9},
         }, {
         POSITION: [ 10, 5, 0.01, 3, 0, -105, 0, ],
		 PROPERTIES: {COLOR: 9},
         }, {
         POSITION: [ 10, 5, 0.01, 3, 0, 75, 0, ],
		 PROPERTIES: {COLOR: 9},
         }, {
         POSITION: [ 10, 5, 0.01, 3, 0, -75, 0, ],
		 PROPERTIES: {COLOR: 9},
         }, {
		 POSITION: [ 10, 12, 1, -3, 0, 0, 0, ],
		 PROPERTIES: {COLOR: -1},
		 }, {
         POSITION: [ 12, 7, 0.01, 6, 3, 0, 0, ],
		 PROPERTIES: {COLOR: 9},
         }, {
         POSITION: [ 12, 7, 0.01, 6, -3, 0, 0, ],
		 PROPERTIES: {COLOR: 9},
         }, 
	],
};
Class.buddydrone = {
    PARENT: ["genericTank"],
    LABEL: "Buddy's Buddy",
	NAME: "Buddy's Buddy",
    TYPE: "minion",
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: "hardWithBuffer",
    FACING_TYPE: "smoothToTarget",
    BODY: {
        FOV: 0.5,
        SPEED: 0.75,
        ACCELERATION: 1.5,
        HEALTH: 5,
        SHIELD: 1,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: true,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        "nearestDifferentMaster",
		"mapTargetToGoal",
        "hangOutNearMaster",
    ],
    GUNS: [ {
         POSITION: [ 21, 8, 1, 0, 0, 0, 0, ],
		 PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.buddydrone]),
                TYPE: "bullet",
         }, }, {
         POSITION: [ 25, 2, 1, -6, -4, 0, 0, ],
         }, {
         POSITION: [ 25, 2, 1, -6, 4, 0, 0, ],
         }, {
         POSITION: [ 14, 11, -1.5, -1, 0, 0, 0, ],
         },
    ],
};
Class.bottledrone = {
  LABEL: "Brocket",
  ACCEPTS_SCORE: false,
  DANGER: 2,
  CONTROL_RANGE: 0,
  SHAPE: "M-3.18-.22-3.18.22-1.26.44-1.02.77 1.25.77 1.24-.77-1.04-.77-1.28-.44-3.2-.22",
  MOTION_TYPE: "chase",
  FACING_TYPE: "looseToTarget",
  CONTROLLERS: [
    "nearestDifferentMaster",
    "mapTargetToGoal",
  ],
  AI: {
    BLIND: true,
  },
  BODY: {
    PENETRATION: 1.2,
    PUSHABILITY: 0.6,
    ACCELERATION: 0.15,
    HEALTH: 0.3,
    DAMAGE: 3.375,
    SPEED: 1.5,
    RANGE: 200,
    DENSITY: 0.03,
    RESIST: 1.5,
    FOV: 0.5,
  },
  HITS_OWN_TYPE: "hard",
  DRAW_HEALTH: false,
  CLEAR_ON_MASTER_UPGRADE: true,
  BUFF_VS_FOOD: true,
  GUNS: [
    {
      POSITION: [20, 6, 1, 8, 0, 180, 0],
      PROPERTIES: {
        ALT_FIRE: true,
        STAT_CALCULATOR: gunCalcNames.thruster,
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.brocketblast,
          

        ]),
        TYPE: [
          "bullet",
        ],
      }, }, 
      {POSITION: [20, 6, 1, 8, 0, 180, 0],
      PROPERTIES: {
        AUTOFIRE: true,
        STAT_CALCULATOR: gunCalcNames.thruster,
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.weak,
          g.nodamage
          

        ]),
        TYPE: [
          "bullet",
        ],
      },
    },
  ],
    
};
Class.abbdrone = {
  PARENT: ["drone"],
  LABEL: "Abberator Drone",
  DANGER:  7,
  SHAPE: [[-1.4,-1],[0,-1],[1.5,0],[1.5,0],[0,1],[-1.4,1]],
  DIE_AT_RANGE: true,
  BODY: {
    RANGE: 135,
  },
  GUNS: [
    {
      POSITION: [10, 12, 1.4, 8, 0, 180, 0],
      PROPERTIES: {
        AUTOFIRE: true,
        STAT_CALCULATOR: gunCalcNames.thruster,
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.weak,
          g.pounder,
          g.destroyer,
          g.muchmorerecoil,
          g.doublereload,
          g.nodamage
          

        ]),
        TYPE: [
          "bullet",
        ],
      },
    },
    {
      POSITION: [16, 12, 0.8, 8, 0, 180, 0.5],
      PROPERTIES: {
        AUTOFIRE: true,
        NEGATIVE_RECOIL: true,
        STAT_CALCULATOR: gunCalcNames.thruster,
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.weak,
          g.pounder,
          g.destroyer,
          g.muchmorerecoil,
          g.doublereload,
          g.nodamage
        ]),
        TYPE: [
          "bullet",
        ],
      },
    },
  ],
};
Class.razerocket = {
  PARENT: ["bullet"],
  LABEL: "Rocket Race",
  SHAPE: [[-1.4,-1],[0,-1],[1.5,0],[1.5,0],[0,1],[-1.4,1]],
  INDEPENDENT: true,
  BODY: {
    RANGE: 90,
  },
  GUNS: [
    {
      POSITION: [10, 12, 1.4, 8, 0, 180, 0],
      PROPERTIES: {
        AUTOFIRE: true,
        STAT_CALCULATOR: gunCalcNames.thruster,
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.sniper,
          g.hunter,
          g.hunterSecondary,
          g.snake,
          g.snakeskin,
        ]),
        TYPE: [
          "bullet",
          {
            PERSISTS_AFTER_DEATH: false,
          },
        ],
      },
    },
    {
      POSITION: [10, 12, 1.4, 8, 0, 180, 0],
      PROPERTIES: {
		SHOOT_ON_DEATH: true,
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.explosion,
        ]),
        TYPE: [
          "explodebullet",
          {
            PERSISTS_AFTER_DEATH: true,
          },
        ],
      },
    },
  ],
};
Class.dissileChampionmissile = {
  PARENT: ["bullet"],
  LABEL: "Missile",
  SHAPE: [[-1.4,-1],[0,-1],[1.5,0],[1.5,0],[0,1],[-1.4,1]],
  INDEPENDENT: true,
  BODY: {
    RANGE: 90,
  },
  GUNS: [
    {
      POSITION: [10, 12, 1.4, 8, 0, 180, 0],
      PROPERTIES: {
        AUTOFIRE: true,
        STAT_CALCULATOR: gunCalcNames.thruster,
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.sniper,
          g.hunter,
          g.hunterSecondary,
          g.snake,
          g.snakeskin,
		  g.halfreload,
        ]),
        TYPE: [
          "bullet",
          {
            PERSISTS_AFTER_DEATH: true,
          },
        ],
      },
    },
    {
      POSITION: [16, 12, 0.8, 8, 0, 180, 0.5],
      PROPERTIES: {
        AUTOFIRE: true,
        NEGATIVE_RECOIL: true,
        STAT_CALCULATOR: gunCalcNames.thruster,
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.sniper,
          g.hunter,
          g.hunterSecondary,
          g.snake,
		  g.halfreload,
        ]),
        TYPE: [
          "bullet",
          {
            PERSISTS_AFTER_DEATH: true,
          },
        ],
      },
    },
  ],
};
Class.dissilemissile = {
  PARENT: ["bullet"],
  LABEL: "Missile",
  SHAPE: [[-1.4,-1],[0,-1],[1.5,0],[1.5,0],[0,1],[-1.4,1]],
  INDEPENDENT: true,
  BODY: {
    RANGE: 90,
  },
  GUNS: [
    {
      POSITION: [10, 12, 1.4, 8, 0, 180, 0],
      PROPERTIES: {
        AUTOFIRE: true,
        STAT_CALCULATOR: gunCalcNames.thruster,
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.sniper,
          g.hunter,
          g.hunterSecondary,
          g.snake,
          g.snakeskin,
        ]),
        TYPE: [
          "bullet",
          {
            PERSISTS_AFTER_DEATH: true,
          },
        ],
      },
    },
    {
      POSITION: [16, 12, 0.8, 8, 0, 180, 0.5],
      PROPERTIES: {
        AUTOFIRE: true,
        NEGATIVE_RECOIL: true,
        STAT_CALCULATOR: gunCalcNames.thruster,
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.sniper,
          g.hunter,
          g.hunterSecondary,
          g.snake,
        ]),
        TYPE: [
          "bullet",
          {
            PERSISTS_AFTER_DEATH: true,
          },
        ],
      },
    },
  ],
};
//custom playable bosses
Class.Meistro = {
   PARENT: ["genericTank"],
   LABEL: '',
   NAME: "Diepnaut",
   SHAPE: 6,
   COLOR: 6,
   LEVEL: 2000,
   SIZE: 200,
   ARENA_CLOSER: true,
   BODY: {
        REGEN: 1e5,
        HEALTH: 1e6,
        DENSITY: 1e4,
        DAMAGE: 1e5,
        FOV: 0.75,
		SPEED: 2,
		ACCELERATION: 0.1,
		PUSHABILITY: 0,
    },
	SKILL: skillSet({
        rld: 1,
        dam: 1,
        pen: 1,
        str: 1,
        spd: 1,
        atk: 1,
        hlt: 1,
        shi: 1,
        rgn: 1,
        mob: 1,
    }),
   GUNS: [ {
         POSITION: [ 12, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.god]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 12, 8, 1, 0, 0, 120, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.god]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 12, 8, 1, 0, 0, -120, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.god]),
            TYPE: "bullet",
         }, }, 
     ],
};

Class.whistleturret = {
   PARENT: ["genericTank"],
   LABEL: 'whistleturret',
   SHAPE: 6,
   SIZE: 12,
   CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
   INDEPENDENT: true,
   GUNS: [ {
         POSITION: [ 25, 8, 1, 0, 0, 0, 0, ],
         }, {
         POSITION: [ 25, 8, 1, 0, 0, 0, 0, ],
         }, {
         POSITION: [ 10, 7, -1.5, 23, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.champspeed,]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 9, 17, 1.5, -12, 0, 90, 0, ],
         }, {
         POSITION: [ 9, 17, 1.5, -12, 0, -90, 0, ],
         }, 
     ],
};
Class.whistleblower = (() => {
	barrels = 6;
   let angle = 360/6;
		GUNS = [];
   for (let i = 0; i < barrels; i++) {
	if(i == 0) {
        GUNS.push({
         POSITION: [ 12.5, 2, 1, 0, 0, angle*i, 0, ],
         }, {
         POSITION: [ 1.3, 2, -5, 9.5, 0, angle*i, 0, ],
         }, {
         POSITION: [ 3, 1.5, -2, 8, 1.5, angle*i - 22.5, 0, ],
         }, {
         POSITION: [ 3, 1.5, -2, 8, -1.5, angle*i + 22.5, 0, ],
         }, {
         POSITION: [ 2.5, 1.5, -2, 11.5, 0, angle*i, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.nailgun, g.machineGunner, g.morereload, g.halfrange, g.champspeed]),
			ALT_FIRE: true,
			TYPE: "bullet"},
         }
		 
	)} else {
		 GUNS.push({
         POSITION: [ 12.5, 2, 1, 0, 0, angle*i, 0, ],
         }, {
         POSITION: [ 1.3, 2, -5, 9.5, 0, angle*i, 0, ],
         }, {
         POSITION: [ 3, 1.5, -2, 8, 1.5, angle*i - 22.5, 0, ],
         }, {
         POSITION: [ 3, 1.5, -2, 8, -1.5, angle*i + 22.5, 0, ],
         }, {
         POSITION: [ 2.5, 1.5, -2, 11.5, 0, angle*i, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.nailgun, g.machineGunner, g.morereload, g.halfrange, g.champspeed]),
            TYPE: "bullet",
         }, }
	)}};
	return {
		PARENT: ["genericTank"],
		LABEL: 'Whistleblower',
		SHAPE: 6,
		SIZE: 62,
		COLOR: 2,
		LEVEL: 450,
		EXTRA_SKILL: 33,
		SKILL_CAP: Array(10).fill(15),
		DANGER: 10,
		BODY: {
			HEALTH: 800,
			SHIELD: 40,
			SPEED: 0.5,
			DAMAGE: 6,
			PUSHABILITY: 0,
			FOV: 0.75,
			
		},
		GUNS,
		TURRETS: [
			{
			POSITION: [8, 0, 0, 0, 360, 1],
			TYPE: ["whistleturret", {independent: true}],
			},
		],
	 };

})();
//champions
//start of bastion champion
bastionTrapstats = [g.trap, g.champ, {reload: 0.75}];
trapbarrel = {
            SHOOT_SETTINGS: combineStats(bastionTrapstats),
            TYPE: "trap",
            STAT_CALCULATOR: gunCalcNames.trap,
         };
Class.bastionChampion = {
   PARENT: ["genericChampion"],
   LABEL: 'Moving Castle',
   BODY: {
		HEALTH: 450,
		FOV: 0.85,
		SPEED: 0.55 * base.SPEED,
		},
   SIZE: 20,
   GUNS: [ {
         POSITION: [ 12, 14, -1.5, 4, 0, 0, 0, ],
		 PROPERTIES: {COLOR: {BASE: 14, BRIGHTNESS_SHIFT: 5}},
         }, {
         POSITION: [ 5, 5, 1.5, 10, 0, 60 + 120, 0, ],
		 PROPERTIES: trapbarrel
         }, {
         POSITION: [ 5, 5, 1.5, 10, 0, 60 + 240, 0, ],
		 PROPERTIES: trapbarrel
         }, {
         POSITION: [ 5, 5, 1.5, 10, 0, 60 + 0, 0, ],
		 PROPERTIES: trapbarrel
         }, {
         POSITION: [ 15, 10, 1, 0, 0, 120, 0, ],
         }, {
         POSITION: [ 15, 10, 1, 0, 0, 240, 0, ],
         }, {
         POSITION: [ 3, 10, 1.5, 14, 0, 120, 0, ],
		 PROPERTIES: trapbarrel
         }, {
         POSITION: [ 3, 10, 1.5, 14, 0, 240, 0, ],
		 PROPERTIES: trapbarrel
         },
     ],
	 TURRETS: [],
};
for (let i = 0; i < 12; i++) {
	Class.bastionChampion.GUNS.push({
         POSITION: [ 19, 13, 1, 0, 0, 0, 0, ],
		 PROPERTIES: {
			COLOR: {BASE: 17, BRIGHTNESS_SHIFT: 0},
            SHOOT_SETTINGS: combineStats([g.basic, {size: 0.3, damage: 0.6, health: 0.6, spray: 8, reload: 1.5, speed: 0.5, range: 0.25}]),
            TYPE: "bullet",
         },
         },);
}
Class.bastionChampion.GUNS.push({
         POSITION: [ 2, 13, 1.15, 16, 0, 0, 0, ],
		 PROPERTIES: {
			COLOR: 16, //{BASE: 14, BRIGHTNESS_SHIFT: 10},
            SHOOT_SETTINGS: combineStats(bastionTrapstats),
            TYPE: "trap",
            STAT_CALCULATOR: gunCalcNames.trap,
         },
         },)
for (let i = 0; i < 3; i++) {
	Class.bastionChampion.TURRETS.push(
	{
	POSITION: [14.5, 7, 0, 60+120*i, 0, 1],
	TYPE: ["cosmeticring", {COLOR: 17}],
	})
}
Class.bastionChampion.TURRETS.push({
	POSITION: [20, 0, 0, 0, 0, 1],
	TYPE: ["genericTank", {COLOR: 14}],
	})
for (let i = 0; i < 3; i++) {
	Class.bastionChampion.TURRETS.push( 
	{
      POSITION: [10, 5, 0, (360/3) * i, 160, 1],
      TYPE: ["bastionchampTurret", {SHAPE: 4.5, COLOR: 17, INDEPENDENT: true, HAS_NO_RECOIL: true,}],
    })
}
Class.bastionChampion.TURRETS.push({
	POSITION: [14, 0, 0, 0, 0, 1],
	TYPE: ["genericTank", {COLOR: 14}],
	})
Class.bastionChampion.GUNS.push(
		 { //triangle
		 POSITION: [ 18, 21, 0, -12, 0, 0, 0, ], PROPERTIES: {COLOR: 14},
		 }, {
		 POSITION: [ 19, 9, 1, 0, 0, 0, 0, ],
		 PROPERTIES: {COLOR: 16, SHOOT_SETTINGS: combineStats(bastionTrapstats.concat([g.fake])), TYPE: "trap",}
		 }, {
         POSITION: [ 2.5, 10, 1.2, 14, 0, 0, 0, ],
		 PROPERTIES: {COLOR: {BASE: 14, BRIGHTNESS_SHIFT: 15}, SHOOT_SETTINGS: combineStats(bastionTrapstats.concat([g.fake])), TYPE: "trap",}
         }, {
         POSITION: [ 3, 3, 1.5, 12, 0, 120, 0, ],
		 PROPERTIES: {COLOR: {BASE: 14, BRIGHTNESS_SHIFT: 10}, SHOOT_SETTINGS: combineStats(bastionTrapstats.concat([g.fake])), TYPE: "trap",}
         }, {
         POSITION: [ 3, 3, 1.5, 12, 0, 240, 0, ],
		 PROPERTIES: {COLOR: {BASE: 14, BRIGHTNESS_SHIFT: 10}, SHOOT_SETTINGS: combineStats(bastionTrapstats.concat([g.fake])), TYPE: "trap",}
         });
//end of bastion champion

blareAstripecolor = 13;
Class.blarearmamentChampion = {
   PARENT: ["genericChampion"],
   LABEL: 'Blast-Armament',
   SIZE: 16,
   BODY: {
		HEALTH: 200,
		FOV: 1,
		SPEED: 0.55 * base.SPEED,
	},
   GUNS: [ {
         POSITION: [ 20, 20, 0.8, 0, 0, 0, 0, ],
		 PROPERTIES: {COLOR:17},
         }, {
         POSITION: [ 14, 21, -1.3, 0, 0, 0, 0, ],
         }, {
         POSITION: [ 5, 28, 1, -1, 0, 0, 0, ],
         }, {
         POSITION: [ 7, 21, 1.1, 16.5, 0, 0, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.armachamp]),
            TYPE: "blarearmamentchampbullet",
         },
         }, {
         POSITION: [ 14, 5, 1, 0, 4, 0, 0, ],
         PROPERTIES: {
            LABEL: 'stripe',
			COLOR: blareAstripecolor,
			BORDERLESS: true,
         }, }, {
         POSITION: [ 14, 5, 1, 0, -4, 0, 0, ],
         PROPERTIES: {
            LABEL: 'stripe',
			COLOR: blareAstripecolor,
			BORDERLESS: true,
         }, }, {
         POSITION: [ 7, 2.5, 1, 16.5, 2.5, 0, 0, ],
         PROPERTIES: {
            LABEL: 'stripe',
			COLOR: blareAstripecolor,
			BORDERLESS: true,
         }, }, {
         POSITION: [ 7, 2.5, 1, 16.5, -2.5, 0, 0, ],
         PROPERTIES: {
            LABEL: 'stripe',
			COLOR: blareAstripecolor,
			BORDERLESS: true,
         }, }, {
         POSITION: [ 7, 6, -2, 5, 0, -120, 0, ],
		 PROPERTIES: {COLOR:17},
         }, {
         POSITION: [ 7, 6, -2, 5, 0, 120, 0, ],
		 PROPERTIES: {COLOR:17},
         }, 
     ],
	TURRETS: [
	{
		POSITION: [14, 0, 0, 0, 0, 1],
		TYPE: ["genericEntity", {COLOR: 14}],
	},
	{
		POSITION: [16, -7, 0, 0, 0, 0],
		TYPE: ["cosmeticring", {TURRET_FACES_CLIENT: true, COLOR: 13}],
	},
	{
		POSITION: [20, 0, 0, 180, 180, 1],
		TYPE: ["cosmeticring2", {TURRET_FACES_CLIENT: true}],
	},
	],
};
Class.blareChampion = {
   PARENT: ["genericChampion"],
   LABEL: 'Blast',
   GUNS: [ {
         POSITION: [ 20, 16, 1.4, 0, 0, 0, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.blare, g.fake]),
            TYPE: "bullet",
         },
         }, {
         POSITION: [ 4, 2, 1.4, 13, -5, -7.5, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.blare, g.champ, {size: 1.5, spray: 0.3}]),
            TYPE: "bullet",
         },
         }, {
         POSITION: [ 4, 2, 1.4, 13, 5, 7.5, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.blare, g.champ, {size: 1.5, spray: 0.3}]),
            TYPE: "bullet",
         },

         }, {
         POSITION: [ 4, 2, 1.4, 13, -2.5, 0.5, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.blare, g.champ, {size: 1.5, spray: 0.3}]),
            TYPE: "bullet",
         },
         }, {
         POSITION: [ 4, 2, 1.4, 13, 2.5, -0.5, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.blare, g.champ, {size: 1.5, spray: 0.3}]),
            TYPE: "bullet",
         },
         }, {
	    POSITION: [5, 8, -0.4, 6, 0, 180, 0],
	    PROPERTIES: {DRAW_ABOVE: true, COLOR: -1}
	}, {
		POSITION: [5, 8, -0.4, 6, 0, 90, 0],
		PROPERTIES: {DRAW_ABOVE: true, COLOR: -1}
	}, {
		POSITION: [5, 8, -0.4, 6, 0, -90, 0],
		PROPERTIES: {DRAW_ABOVE: true, COLOR: -1}
	}, {
		POSITION: [5, 8, -0.4, 6, 0, 0, 0],
		PROPERTIES: {DRAW_ABOVE: true, COLOR: -1}
	},
     ],
};
Class.buddyChampion = {
   PARENT: ["genericChampion"],
   LABEL: 'P.A.L.',
   MAX_CHILDREN: 1,
   BODY: {FOV: 1.7},
   GUNS: [ {
         POSITION: [ 23, 16, 1, 1, 0, 0, 0, ],
         }, {
         POSITION: [ 24, 20, 1, -10, 0, 0, 0, ],
		 PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.buddychamp]),
         TYPE: "buddydronechamp",
         AUTOFIRE: true,
         SYNCS_SKILLS: true,
         STAT_CALCULATOR: gunCalcNames.drone,
         WAIT_TO_CYCLE: true, 
		 }, }, {
         POSITION: [ 4, 4, 1, 17, 0, 0, 0, ],
         }, {
         POSITION: [ 4, 4, 1, 24, 0, 0, 0, ],
         }, {
         POSITION: [ 11, 5, 1, 15.25, -9, 0, 0, ],
         }, {
         POSITION: [ 11, 5, 1, 15.25, 9, 0, 0, ],
         }, {
         POSITION: [ 11, 8, 1, 4, -9, 0, 0, ],
         }, {
         POSITION: [ 11, 8, 1, 4, 9, 0, 0, ],
         }, {
         POSITION: [ 8.5, 6, 1, -6, -9, 0, 0, ],
         }, {
         POSITION: [ 8.5, 6, 1, -6, 9, 0, 0, ],
         }, 
     ],
};

Class.bubbleflankChampion = {
   PARENT: ["genericChampion"],
   LABEL: 'Blackout',
   HAS_NO_RECOIL: true,
   SHAPE: 4,
   SIZE: 24,
   ARENA_CLOSER: true,
   HITS_OWN_TYPE: "never",
   BODY: {
	  HEALTH: 350,
      ACCELERATION: base.ACCEL * 0.4,
      SPEED: base.SPEED * 1.3,
      PENETRATION: 0.4 * base.PENETRATION
   },
   TURRETS: [
		{
			POSITION: [12, 0, 0, 0, 0, 1],
			TYPE: ["copterpiece", {TURRET_FACES_CLIENT: true,}],
		},
		{
			POSITION: [12, 0, 0, 0, 360, 1],
			TYPE: ["copterblade", {COLOR: 14}],
		},
		{
			POSITION: [6, -2, 14, 0, 45, 0],
			TYPE: ["copterchaingun", {COLOR: 17, TURRET_FACES_CLIENT: true,}],
		},
		{
			POSITION: [6, -2, -14, 0, 45, 0],
			TYPE: ["copterchaingun", {COLOR: 17, TURRET_FACES_CLIENT: true,}],
		},
   ],
   GUNS: [ {
         POSITION: [ 8, 6, 0, 0, 0, 0, 0, ],
         PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.copterbomb]),
			TYPE: "copterbomb",
			ALT_FIRE: true,
            LABEL: 'Dropper',
			COLOR: 17,
         }, }, {
         POSITION: [ 7, 2.5, -2, 12, -4, -90, 0, ],
         PROPERTIES: {
            LABEL: 'weaponrod',
			COLOR: 17,
         }, }, {
         POSITION: [ 7, 2.5, -2, 12, 4, 90, 0, ],
         PROPERTIES: {
            LABEL: 'weaponrod',
			COLOR: 17,
         }, }, {
         POSITION: [ 17, 1, -2, 21, 5.5, 0, 0, ],
         PROPERTIES: {
            LABEL: 'stickthing',
         }, }, {
         POSITION: [ 4, 0.75, -3, 36, 5.5, 0, 0, ],
         PROPERTIES: {
            LABEL: 'stickthing',
         }, }, {
         POSITION: [ 10, 5, -2, 9, 0, 157.5, 0, ],
         }, {
         POSITION: [ 10, 5, -2, 9, 0, -157.5, 0, ],
         }, {
         POSITION: [ 14, 4, -1.5, -3, -33, -82.5, 0, ],
         PROPERTIES: {
            LABEL: 'tailwing',
			COLOR: 17,
         }, }, {
         POSITION: [ 14, 4, -1.5, -3, 33, 82.5, 0, ],
         PROPERTIES: {
            LABEL: 'tailwing',
			COLOR: 17,
         }, }, {
         POSITION: [ 27, 4, -3, 10, 0, -180, 0, ],
         PROPERTIES: {
            LABEL: 'tail',
         }, }, {
         POSITION: [ 10, 5, -2, 28, 0, -180, 0, ],
         PROPERTIES: {
            LABEL: 'tail2',
         }, }, {
         POSITION: [ 15, 10, -2, 10, 0, 0, 0, ],
         PROPERTIES: {
            LABEL: 'base',
         }, }, {
         POSITION: [ 20, 20, 1, -10, 0, 0, 0, ],
         PROPERTIES: {
            LABEL: 'base',
         }, }, {
         POSITION: [ 22, 5, 1, -11, 13, 0, 0, ],
         PROPERTIES: {
            LABEL: 'sidethings',
         }, }, {
         POSITION: [ 22, 5, 1, -11, -13, 0, 0, ],
         PROPERTIES: {
            LABEL: 'sidethings',
         }, }, {
         POSITION: [ 4, 3, 1, 16, 5, 0, 0, ],
         PROPERTIES: {
            LABEL: 'windows',
			COLOR: 17,
         }, }, {
         POSITION: [ 4, 3, 1, 16, -5, 0, 0, ],
         PROPERTIES: {
            LABEL: 'windows',
			COLOR: 17,
         }, }, {
         POSITION: [ 2, 6, 1, 18, 0, 0, 0, ],
         PROPERTIES: {
            LABEL: 'windows',
			COLOR: 17,
         }, }, {
         POSITION: [ 7, 5, -1.5, 5, 0, 0, 0, ],
         PROPERTIES: {
            LABEL: 'attach',
			DRAW_ABOVE: true,
         }, }, 
     ],
};

dehumidoffset1 = 6
dehumidoffset2 = -6
Class.dehumidifierChampion = {
   PARENT: ["genericChampion"],
   LABEL: 'Dehumidualizer',
  BODY: {
    FOV: 1.25 * base.FOV,
  },
   GUNS: [ {
         POSITION: [ 40, 8, 1, 0, dehumidoffset1, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.humid]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 40, 8, 1, 0, dehumidoffset1, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.humid, {size: 0.8}]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 40, 8, 1, 0, dehumidoffset1, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.humid]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 40, 8, 1, 0, dehumidoffset1, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.humid, { size: 0.4 }]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 40, 8, 1, 0, dehumidoffset1, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.humid]),
            TYPE: "bullet",
         }, }, {
		 POSITION: [ 40, 8, 1, 0, dehumidoffset1, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.humid, {size: 0.8}]),
            TYPE: "bullet",
         }, }, {
		 POSITION: [ 40, 8, 1, 0, dehumidoffset1, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.humid]),
            TYPE: "bullet",
         }, }, {
		 POSITION: [ 40, 8, 1, 0, dehumidoffset1, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.humid, { size: 0.4 }]),
            TYPE: "bullet",
         }, }, {
		 POSITION: [ 40, 8, 1, 0, dehumidoffset1, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.humid]),
            TYPE: "bullet",
			COLOR: {BASE: 14, BRIGHTNESS_SHIFT: 10},
         }, }, {
         POSITION: [ 40, 8, 1, 0, dehumidoffset2, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.humid]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 40, 8, 1, 0, dehumidoffset2, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.humid, {size: 0.8}]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 40, 8, 1, 0, dehumidoffset2, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.humid]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 40, 8, 1, 0, dehumidoffset2, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.humid, { size: 0.4 }]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 40, 8, 1, 0, dehumidoffset2, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.humid]),
            TYPE: "bullet",
         }, }, {
		 POSITION: [ 40, 8, 1, 0, dehumidoffset2, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.humid, {size: 0.8}]),
            TYPE: "bullet",
         }, }, {
		 POSITION: [ 40, 8, 1, 0, dehumidoffset2, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.humid]),
            TYPE: "bullet",
         }, }, {
		 POSITION: [ 40, 8, 1, 0, dehumidoffset2, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.humid, { size: 0.4 }]),
            TYPE: "bullet",
         }, }, {
		 POSITION: [ 40, 8, 1, 0, dehumidoffset2, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.humid]),
            TYPE: "bullet",
			COLOR: {BASE: 14, BRIGHTNESS_SHIFT: 10},
         }, }, {
         POSITION: [ 4, 32, 1, 32, 0, 0, 0, ],
		 PROPERTIES: {COLOR: {BASE: 14, BRIGHTNESS_SHIFT: 15}},
         }, {
         POSITION: [ 4, 32, 1, 24, 0, 0, 0, ],
		 PROPERTIES: {COLOR: {BASE: 14, BRIGHTNESS_SHIFT: 15}},
         }, {
         POSITION: [ 4, 32, 1, 16, 0, 0, 0, ],
		 PROPERTIES: {COLOR: {BASE: 14, BRIGHTNESS_SHIFT: 15}},
         }, {
         POSITION: [ 9, 28, -0.8, -6, 0, 0, 0, ],
		 PROPERTIES: {COLOR: {BASE: 14, BRIGHTNESS_SHIFT: 5}},
         }, {
         POSITION: [ 8, 33, 0.8, 4, 0, 0, 0, ],
		 PROPERTIES: {COLOR: {BASE: 14, BRIGHTNESS_SHIFT: 15}},
         }, {
         POSITION: [ 34, 5, 0.3, 4, dehumidoffset1, 0, 0, ],
		 PROPERTIES: {COLOR: {BASE: 14, BRIGHTNESS_SHIFT: 23}},
         }, {
         POSITION: [ 34, 5, 0.3, 4, dehumidoffset2, 0, 0, ],
		 PROPERTIES: {COLOR: {BASE: 14, BRIGHTNESS_SHIFT: 23}},
         },
     ],
};
crosschampvals = [g.drone, g.cross, g.champ, g.doublereload];
crosschampmax = 24;
crosschampprojectile = "crosschampdrone",
Class.crossguardianChampion = {
   PARENT: ["genericChampion"],
   LABEL: 'Holy Grail',
   GUNS: [ {
         POSITION: [ 14, 7, -2, 0, 0, 0, 0.25, ],
		 PROPERTIES: {
			 SHOOT_SETTINGS: combineStats(crosschampvals),
			 TYPE: crosschampprojectile,
             AUTOFIRE: true,
             SYNCS_SKILLS: true,
             MAX_CHILDREN: crosschampmax,
			 
		 }, 
         }, {
         POSITION: [ 14, 7, -2, 0, 0, 90, 0.5, ],
		 PROPERTIES: {
			 SHOOT_SETTINGS: combineStats(crosschampvals),
			 TYPE: crosschampprojectile,
             AUTOFIRE: true,
             SYNCS_SKILLS: true,
             MAX_CHILDREN: crosschampmax,
			 
		 }, 
         }, {
         POSITION: [ 14, 7, -2, 0, 0, -90, 0.75, ],
		 PROPERTIES: {
			 SHOOT_SETTINGS: combineStats(crosschampvals),
			 TYPE: crosschampprojectile,
             AUTOFIRE: true,
             SYNCS_SKILLS: true,
             MAX_CHILDREN: crosschampmax,
			 
		 }, 
         }, {
         POSITION: [ 14, 7, -2, 0, 0, -180, 1, ],
		 PROPERTIES: {
			 SHOOT_SETTINGS: combineStats(crosschampvals),
			 TYPE: crosschampprojectile,
             AUTOFIRE: true,
             SYNCS_SKILLS: true,
             MAX_CHILDREN: crosschampmax,
			 
		 }, 
         }, {
         POSITION: [ 14, 2, -2, 0, 0, 0, 0, ],
		 PROPERTIES: {COLOR: 14,}
         }, {
         POSITION: [ 14, 2, -2, 0, 0, -90, 0, ],
		 PROPERTIES: {COLOR: 14,}
         }, {
         POSITION: [ 14, 2, -2, 0, 0, 180, 0, ],
		 PROPERTIES: {COLOR: 14,}
         }, {
         POSITION: [ 14, 2, -2, 0, 0, 90, 0, ],
		 PROPERTIES: {COLOR: 14,}
         }, {
	    POSITION: [5, 8, -0.4, 7, 0, 135, 0],
	    PROPERTIES: {DRAW_ABOVE: true, COLOR: 4}
	}, {
		POSITION: [5, 8, -0.4, 7, 0, 45, 0],
		PROPERTIES: {DRAW_ABOVE: true, COLOR: 4}
	}, {
		POSITION: [5, 8, -0.4, 7, 0, -45, 0],
		PROPERTIES: {DRAW_ABOVE: true, COLOR: 4}
	}, {
		POSITION: [5, 8, -0.4, 7, 0, -135, 0],
		PROPERTIES: {DRAW_ABOVE: true, COLOR: 4}
	},
     ],
	TURRETS: [
		{
			POSITION: [14, 0, 0, 0, 0, 1],
			TYPE: ["genericTank", {COLOR: 14}]
		},
		{
			POSITION: [14, 0, 0, 45, 360, 1,],
			TYPE: "pentabullInnerBody",
		},
	]
};
Class.descendentChampion = {
   PARENT: ["genericChampion"],
   LABEL: 'Broadside',
   GUNS: [ {
         POSITION: [ 22, 10, 1, 0, 6, 0, 0.5, ],
		 PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.desc, g.morereload, g.halfrange]),
             TYPE: "bullet",
         }, }, {
         POSITION: [ 22, 10, 1, 0, -6, 0, 0.5, ],
         PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.desc, g.morereload, g.halfrange]),
             TYPE: "bullet",
         }, }, {
         POSITION: [ 8, 22, -1.15, -2, 0, 0, 0, ],
		 PROPERTIES:{COLOR: 17},
         }, {
         POSITION: [ 6, 25, 1, 8, 0, 0, 0, ],
         }, {
         POSITION: [ 18, 10, 1, 8, 0, 0, 0, ],
         PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.desc, g.morereload, g.halfrange]),
             TYPE: "bullet",
         }, }, {
         POSITION: [ 9, 12, 1, 8, 0, 0, 0, ],
         }, 
     ],
};
Class.dissileChampion = {
   PARENT: ["genericChampion"],
   LABEL: 'Dreadlock',
   SHAPE: [[-1.4,-1],[0,-1],[1.5,0],[1.5,0],[0,1],[-1.4,1]],
   SIZE: 24,
   BODY: {
		HEALTH: 300,
		FOV: 0.9,
		SPEED: 0.6 * base.SPEED,
		},
   GUNS: [
		{
			POSITION: [17.5, 16, 1, 0, 0, 180, 0],
			PROPERTIES: {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -5}},
		}
	],
   TURRETS: [
		{
			POSITION: [16, 3, 18, 0, 225, 0,],
			TYPE: ["dissileChampionArm", {COLOR: -1}],
		},
		{
			POSITION: [16, 3, -18, 0, 225, 0,],
			TYPE: ["dissileChampionArm", {COLOR: -1}],
		},
		
		
		{
			POSITION: [10, -4, 12, 0, 0, 0],
			TYPE: ["genericEntity", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -5}}],
		},
		{
			POSITION: [10, -4, -12, 0, 0, 0],
			TYPE: ["genericEntity", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -5}}],
		},
		{
			POSITION: [16, -4, 0, 0, 0, 1],
			TYPE: ["pentagon", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -5}}],
		},
   ],
   
};
Class.technicChampion = {
   PARENT: ["genericChampion"],
   LABEL: 'T3CHN0',
   GUNS: [ {
         POSITION: [ 15, 2.5, 1, 0, 2, 0, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.nailgun, g.morespeed, g.champ]),
            TYPE: "bullet",
         },
         }, {
         POSITION: [ 15, 2.5, 1, 0, -2, 0, 0.33, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.nailgun, g.morespeed, g.champ]),
            TYPE: "bullet",
         },
         }, {
         POSITION: [ 17, 8, 1, 4, 9, 0, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.halfrecoil]),
            TYPE: "bullet",
		 },
         }, {
         POSITION: [ 17, 8, 1, 4, -9, 0, 0.5, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.halfrecoil]),
            TYPE: "bullet",
		 },
         }, {
         POSITION: [ 17, 19, 1.5, -11, 0, 0, 0, ],
         }, {
         POSITION: [ 6, 29, 1, 3, 0, 0, 0, ],
		 PROPERTIES:{COLOR: 17},
         }, {
         POSITION: [ 6, 13, 1, -14, 0, 0, 0, ],
         }, {
         POSITION: [ 3, 10, 1, 16, 9, 0, 0, ],
         }, {
         POSITION: [ 3, 10, 1, 16, -9, 0, 0, ],
         }, {
         POSITION: [ 12, 8, 1, 0, 0, 180, 0, ],
		 PROPERTIES:{COLOR: 17},
         }, {
         POSITION: [ 10, 2, 1, 7, 0, 0, 0.66, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.halfrecoil]),
            TYPE: "bullet",
		 },
         }, 
     ],
};
Class.jetfireChampion = {
   PARENT: ["genericChampion"],
   LABEL: 'Torrent',
   SHAPE: 5,
   SIZE: 24,
   
   BODY: {
		HEALTH: 450,
		FOV: 0.85,
		SPEED: 0.55 * base.SPEED,
		},
   GUNS: [ 
		 {
         POSITION: [ 8, 8, 1.5, 7, 0, 150, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.thruster, g.doublereload, g.tonsmorerecoil]),
            TYPE: ["bullet", {ALPHA: 0.5}]
         },
         }, {
         POSITION: [ 8, 8, 1.5, 7, 0, -150, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.thruster, g.doublereload, g.tonsmorerecoil]),
            TYPE: ["bullet", {ALPHA: 0.5}]
         },
         }, {
         POSITION: [ 6, 10, 2, 7, 0, 0, 0.5, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.norecoil, {size: 0.8}, g.champ]),
            TYPE: "bullet",
         },
         }, {
         POSITION: [ 19, 6, 1.5, 6, 0, 0, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.norecoil, {size: 0.8}, g.champ]),
            TYPE: "bullet",
         },
         }, {
         POSITION: [ 15, 3, 1.5, 6, 2, 7.5, 0, ],
         }, {
         POSITION: [ 15, 3, 1.5, 6, -2, -7.5, 0, ],
         }, {
         POSITION: [ 7, 3, 1.5, 6, 3, -142.5, 0, ],
		 PROPERTIES:{COLOR: 17},
         }, {
         POSITION: [ 7, 3, 1.5, 6, -3, 142.5, 0, ],
		 PROPERTIES:{COLOR: 17},
         }, {
         POSITION: [ 13, 21, 1.5, -7, 0, -180, 0, ],
         }, {
         POSITION: [ 7, 3, 1.5, 6, 0, -180, 0, ],
		 PROPERTIES:{COLOR: 17},
         }, {
         POSITION: [ 6.5, 6, 1.5, 6, 0, -37.5, 0, ],
		 PROPERTIES:{COLOR: 17},
         }, {
         POSITION: [ 6.5, 6, 1.5, 6, 0, 37.5, 0, ],
		 PROPERTIES:{COLOR: 17},
         },
     ],
	 TURRETS: [
		{
			POSITION: [14, 0, 0, 0, 0, 1],
			TYPE: ["pentagon", {TURRET_FACES_CLIENT: true}]
		},
	 ],
};

Class.minijavelinChampion = (() => {
	let barrels = 5; 
		angle = 360/5;
	    GUNS = [];
		TURRETS = [
		 {
			POSITION: [14, 0, 0, 0, 0, 1],
			TYPE: ["genericEntity", {SHAPE: 5, COLOR: 14, TURRET_FACES_CLIENT: true,}],
		 },
		 {
			POSITION: [8, 0, 0, 0, 0, 1],
			TYPE: ["genericTank", {COLOR: 14}],
		 }
		 ];
   for (let i = 0; i < barrels; i++) {
	   GUNS.push( {
         POSITION: [ 32, 6, 1, 0, 0, angle*i, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.jav, g.champjav,]),
            TYPE: "bullet",
         },//main
         }, {
         POSITION: [ 13, 6, -2, 0, 0, angle*i, 0, ], //holder
		 PROPERTIES: {COLOR: 17},
         }, {
         POSITION: [ 6, 2, 1, 24, 0, angle*i, 0, ], //detail
		 PROPERTIES: {COLOR: 14, SHOOT_SETTINGS: combineStats([g.basic, g.jav, g.fake,]),
            TYPE: "bullet",
         },
         }, {
         POSITION: [ 6, 2, 1, 16, 0, angle*i, 0, ], //detail 2
		 PROPERTIES: {COLOR: 14, SHOOT_SETTINGS: combineStats([g.basic, g.jav, g.fake,]),
            TYPE: "bullet",
         },
         }, {
         POSITION: [ 14, 2, 1, 12, 3, angle*i, 0, ], //side detail
		 PROPERTIES: {COLOR: {BASE: 14, BRIGHTNESS_SHIFT: 15}},
         }, {
         POSITION: [ 14, 2, 1, 12, -3, angle*i, 0, ], //side detail 2
		 PROPERTIES: {COLOR: {BASE: 14, BRIGHTNESS_SHIFT: 15}},
         });
   }
   for (let i = 0; i < barrels; i++) {
	   TURRETS.push(
		 {
			POSITION: [5, 7, 0, 36 + angle*i, 180, 1],
			TYPE: ["minijavelinChampionTurret", {COLOR: {BASE: 14, BRIGHTNESS_SHIFT: 15}, INDEPENDENT: true,}],
		 },
		);
   }
   
   return {
	PARENT: ["genericChampion"],
    LABEL: 'Javelin NEO',
    SHAPE: [[-1,0],[-0.3,0.95],[0.8,0.58],[0.8,-0.58],[-0.3,-0.95]],
    SIZE: 24,
	BODY: {
		HEALTH: 300,
		SHIELD: 6 * base.SHIELD,
		FOV: 1.15,
		SPEED: 0.75 * base.SPEED,
		},
	GUNS,
	TURRETS,

   };

})();
Class.placeholderChampion = (() => {
	let barrels = 5; 
		angle = 360/5;
	    GUNS = [];
   for (let i = 0; i < barrels; i++) {
        GUNS.push( {
         POSITION: [ 6, 6, -1.25, 8, 0, angle*i, 0, ],
           PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.champ]),
             TYPE: "bullet"}, 
		},
		{
         POSITION: [ 4, 7, -1.25, 8, 0, angle*i, 0.5, ],
           PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.champ]),
             TYPE: "bullet"}, 
		});
   }
		 
     return {
		PARENT: ["genericChampion"],
		LABEL: 'Placeholder',
		DANGER: 7,
		SIZE: 24,
		BODY: {
		HEALTH: 300,
		FOV: 0.9,
		SPEED: 0.6 * base.SPEED,
		},
		SHAPE: [
			[-1,0],
			[-0.3,0.95],
			[0.8,0.58],
			[0.8,-0.58],
			[-0.3,-0.95]
		],
		GUNS,
	 };
		 
})();
mcCColor = 15;
Class.megacannonChampion = {
   PARENT: ["genericChampion"],
   TURRETS: [ {
	POSITION: [14, 0, 0, 0, 0, 1],
	TYPE: ["genericTank", {COLOR: 14}],
	},
   ],
   LABEL: 'Brawl',
   SHAPE: [[-0.7,-0.7],[0.7,-0.7],[0.7,0.7],[-0.7,0.7]],
   SIZE: 18,
   HAS_NO_RECOIL: true,
   //FACING_TYPE: 'looseWithMotion',
   BODY: {
    RESIST: 1,
    HEALTH: 550,
    DAMAGE: 1.5 * base.DAMAGE,
    PENETRATION: 0.25,
    FOV: 0.9 * base.FOV,
    PUSHABILITY: 0,
    HETERO: 0,
    ACCEL: 0.06,
    SPEED: 0.5 * base.SPEED,
  },
   GUNS: [ {
         POSITION: [ 15, 5, 1, -7, 12.5, 0, 0, ],
         }, {
         POSITION: [ 15, 5, 1, -7, -12.5, 0, 0, ],
         }, {
         POSITION: [ 27, 8, 1, -14, -8.5, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, {size: 0.8}, g.slow, g.halfrange]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 27, 8, 1, -14, 8.5, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, {size: 0.8}, g.slow, g.halfrange]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 18, 5, -1.5, 1, 0, 0, 0, ],
		 PROPERTIES: {COLOR: 16},
         }, {
         POSITION: [ 8, 6, -1.3, 18, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.power, {speed: 0.65}]),
            TYPE: "bullet",
			COLOR: 16,
         }, }, {
         POSITION: [ 17, 4, -2, 0, 0, -135, 0, ],
		 PROPERTIES: {COLOR: {BASE: 14, BRIGHTNESS_SHIFT: 10}}
         }, {
         POSITION: [ 17, 4, -2, 0, 0, 135, 0, ],
		 PROPERTIES: {COLOR: {BASE: 14, BRIGHTNESS_SHIFT: 10}}
         }, {
         POSITION: [ 6, 14, 0.5, 6, 0, 90, 0, ],
         PROPERTIES: {COLOR: 14},
         }, {
         POSITION: [ 6, 14, 0.5, 6, 0, -180, 0, ],
         PROPERTIES: {COLOR: 14},  
         }, {
         POSITION: [ 6, 14, 0.5, 6, 0, -90, 0, ],
         PROPERTIES: {COLOR: 14},
         }, {
         POSITION: [ 6, 7, 0.5, 6, 0, -30, 0, ],
         PROPERTIES: {COLOR: 14},
         }, {
         POSITION: [ 6, 7, 0.5, 6, 0, 30, 0, ],
         PROPERTIES: {COLOR: 14},
         }, {
         POSITION: [ 8, 7, 0.5, 6, 0, 90, 0, ],
		 PROPERTIES: {COLOR: {BASE: 14, BRIGHTNESS_SHIFT: 10}}
         }, {
         POSITION: [ 8, 7, 0.5, 6, 0, 180, 0, ],
		 PROPERTIES: {COLOR: {BASE: 14, BRIGHTNESS_SHIFT: 10}}
         }, {
         POSITION: [ 8, 7, 0.5, 6, 0, -90, 0, ],
		 PROPERTIES: {COLOR: {BASE: 14, BRIGHTNESS_SHIFT: 10}}
         },
     ],
};
Class.beatsChampion = {
   PARENT: ["genericChampion"],
   LABEL: 'Bass',
   HAS_NO_RECOIL: true,
   GUNS: [ {
         POSITION: [ 16, 6, 1, 0, 7, 15, 0.98, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 16, 6, 1, 0, -7, -15, 0.84, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 18, 8, 1, 0, 5.5, 7.5, 0.7, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 18, 8, 1, 0, -5.5, -7.5, 0.56, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 20, 6, 1, 0, 3, 7.5, 0.42, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 20, 6, 1, 0, -3, -7.5, 0.28, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 3, 14, 1, 10, -4, -15, 0, ],
         }, {
         POSITION: [ 3, 14, 1, 10, 4, 15, 0, ],
         }, {
         POSITION: [ 22, 10, 1, 0, 0, 0, 0.14, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 2, 18, 1, 15, 0, -180, 0, ],
         PROPERTIES: {
            LABEL: 'headlink',
			COLOR: 9
         }, }, {
         POSITION: [ 2, 17, 1, -9, 8, 90, 0, ],
         PROPERTIES: {
            LABEL: 'headlink',
			COLOR: 9
         }, }, {
         POSITION: [ 2, 17, 1, -9, -8, -90, 0, ],
         PROPERTIES: {
            LABEL: 'headlink',
			COLOR: 9
         }, }, {
         POSITION: [ 13, 14, 1, 1, 1.5, 90, 0, ],
		 PROPERTIES: {COLOR:17},
		 
         }, {
         POSITION: [ 13, 14, 1, 1, -1.5, -90, 0, ],
		 PROPERTIES: {COLOR:17},
         },
     ],
};
Class.supersimpleChampion = {
   PARENT: ["genericChampion"],
   LABEL: 'Ultra',
   GUNS: [ {
         POSITION: [ 18, 10, 1, 0, 0, 0, 0, ],
         }, {
         POSITION: [ 12, 10, -2, 0, 0, 0, 0, ],
         }, {
         POSITION: [ 5, 12, -1.2, 17, 0, 0, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.champ, g.morespeed,]),
            TYPE: "bullet",
         },
         }, {
         POSITION: [ 6, 5, -1.2, 7, -2, -15, 0, ],
         }, {
         POSITION: [ 6, 5, -1.2, 7, 2, 15, 0, ],
         }, {
         POSITION: [ 4.5, 5, -1.2, 7, -2, 67.5, 0, ],
         }, {
         POSITION: [ 4.5, 5, -1.2, 7, 2, -67.5, 0, ],
         }, 
     ],
};
Class.augmentationChampion = {
   PARENT: ["genericChampion"],
   LABEL: 'Reinvention',
   SHAPE: 7,
   GUNS: [ {
         POSITION: [ 13, 3, -2, 1, -21, 15, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nailgun, g.champspeed]),
            TYPE: "bullet",
         },}, {
         POSITION: [ 13, 3, -2, 1, 21, -15, 0.5, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nailgun, g.champspeed]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 21, 8, -2, -1, -4, -60, 0, ],
         PROPERTIES: {
            LABEL: 'arm',
			//COLOR: {BASE: 14, BRIGHTNESS_SHIFT: -15},
         }, }, {
         POSITION: [ 21, 8, -2, -1, 4, 60, 0, ],
         PROPERTIES: {
            LABEL: 'arm',
			//COLOR: {BASE: 14, BRIGHTNESS_SHIFT: -15},
         }, }, {
         POSITION: [ 19, 6, -2.5, 4, 2, 120, 0, ],
		 PROPERTIES: {
		 //COLOR: 17,
         }, }, {
         POSITION: [ 19, 6, -2.5, 4, -2, -120, 0, ],
		 PROPERTIES: {
		 //COLOR: 17,
         }, }, {
         POSITION: [ 22, 4, -2.5, 4, 2, 142.5, 0, ],
         }, {
         POSITION: [ 22, 4, -2.5, 4, -2, -142.5, 0, ],
         }, {
         POSITION: [ 19, 4, 1.5, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.machineGunner, g.morereload, g.halfrange, g.champ]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 16, 7, 1.5, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.machineGunner, g.morereload, g.halfrange, g.champ]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 10, 9, -2, 4, 0, -180, 0, ],
		 PROPERTIES: {
		 COLOR: {BASE: 14, BRIGHTNESS_SHIFT: 0},
		 }, }, {
         POSITION: [ 21, 5, -1.5, -10, -11, 7.5, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.morespeed, g.twin, g.nailgun, g.champspeed]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 21, 5, -1.5, -10, 11, -7.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.morespeed, g.twin, g.nailgun, g.champspeed]),
            TYPE: "bullet",
         }, },
     ],
};

//custom tanks
Class.genericNewTank = {
  PARENT: ["genericTank"],
  BODY: {
    DAMAGE: 0,
    ACCELERATION: 0,
    SPEED: 0,
    FOV: 0.4,
    HEALTH: 1e100,
    SHIELD: 1e100,
    REGEN: 1e100,
    PUSHABILITY: 0,
    PENETRATION: 1e100,
  },
  TURRETS: [
	{
		POSITION: [18, 0, 0, 0, 0, 1],
		TYPE: ["genericTank", {COLOR: 17}],
	},
  ],
};
Class.genericSymbol = {
  TYPE: "tank",
};
Class.pentabullBody = {
   SHAPE: 5,
   COLOR: 17,
   CONTROLLERS: ["spin"],
   INDEPENDENT: true,
   GUNS: [ {
         POSITION: [ 10, 10, 1, 0, 0, -36, 0, ],
		 PROPERTIES: {COLOR: 9},
         }, {
         POSITION: [ 10, 10, 1, 0, 0, 36, 0, ],
         PROPERTIES: {COLOR: 9},
         }, {
         POSITION: [ 10, 10, 1, 0, 0, -180, 0, ],
         PROPERTIES: {COLOR: 9},
         }, {
         POSITION: [ 10, 10, 1, 0, 0, 108, 0, ],
         PROPERTIES: {COLOR: 9},  
         }, {
         POSITION: [ 10, 10, 1, 0, 0, -108, 0, ],
         PROPERTIES: {COLOR: 9},  
         }, {
         POSITION: [ 12, 3, 1, 0, 0, 0, 0, ],
         PROPERTIES: {COLOR: 9},  
         }, {
         POSITION: [ 12, 3, 1, 0, 0, 144, 0, ],
         PROPERTIES: {COLOR: 9},  
         }, {
         POSITION: [ 12, 3, 1, 0, 0, -144, 0, ],
         PROPERTIES: {COLOR: 9},  
         }, {
         POSITION: [ 12, 3, 1, 0, 0, -72, 0, ],
         PROPERTIES: {COLOR: 9},  
         }, {
         POSITION: [ 12, 3, 1, 0, 0, 72, 0, ],
         PROPERTIES: {COLOR: 9},  
         }, 
     ],
};
Class.pentabullInnerBody = {
  TYPE: "bullet",
  CONTROLLERS: ["spin"],
  COLOR: 17,
  SHAPE:"M-.4-.4-1.1-.2-1.1.2-.4.4-.2 1.1.2 1.1.4.4 1.1.2 1.1-.2.4-.4.2-1.1-.2-1.1-.4-.4",
  INDEPENDENT: true,
};
Class.backbutton = {PARENT: ["genericNewTank"], LABEL: "Selector",};
Class.basicTanks = {PARENT: ["genericNewTank"], LABEL: "Basic",};
Class.assaultTanks = {PARENT: ["genericNewTank"], LABEL: "Assault",};
Class.sniperTanks = {PARENT: ["genericNewTank"], LABEL: "Sniper",};
Class.swarmTanks = {PARENT: ["genericNewTank"], LABEL: "Swarm",};
Class.heavyTanks = {PARENT: ["genericNewTank"], LABEL: "Heavy",};
Class.utilityTanks = {PARENT: ["genericNewTank"], LABEL: "Utility",};

Class.quickbuild = {PARENT: ["genericNewTank"], LABEL: "Stat Templates",};
	Class.quickbuild_standard = {PARENT: ["quickbuild"], LABEL: "Standard", SET_SKILL: 1-1,
	SKILL: [7,7,7,7,7,0,2,2,0,3]
	};
	Class.quickbuild_glass = {PARENT: ["quickbuild"], LABEL: "Glass", SET_SKILL: 1-1,
	SKILL: [8,9,9,9,8,0,0,0,0,0]
	};
	Class.quickbuild_bulky = {PARENT: ["quickbuild"], LABEL: "Bulky", SET_SKILL: 1-1,
	SKILL: [6,7,7,8,5,0,3,4,2,0]
	};
	
Class.championTanks = {PARENT: ["genericChampion"], LABEL: "Champions", LEVEL: 180, RESET_UPGRADES: true, EXTRA_SKILL: 6};
Class.testTanks = {PARENT: ["genericNewTank"], LABEL: "Test",};
Class.splitshot = {
  PARENT: ["genericTank"],
  LABEL: "Split-Shot",
  DANGER: 7,
  GUNS: [
    {
      POSITION: [18, 4, 1, -4, 5, 4, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [18, 4, 1, -4, -5, -4, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [18, 8, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic]),
        TYPE: "bullet",
      },
    },
	
  ],
};
Class.descendent = {
   PARENT: ["genericTank"],
   LABEL: 'Descendent III',
   DANGER: 7,
   GUNS: [ {
         POSITION: [ 22, 8, 1, 0, 5.5, 0, 0.334, ],
           PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.desc]),
             TYPE: "bullet",
         },}, {
         POSITION: [ 22, 8, 1, 0, -5.5, 0, 0.667, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.desc]),
            TYPE: "bullet",
      },
         }, {
         POSITION: [ 3, 20, -1.15, 8, 0, 0, 0, ],
         }, {
         POSITION: [ 18, 8, -1.25, 8, 0, 0, 0, ],
           PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.desc]),
             TYPE: "bullet",
         }, }, 
     ],
};
Class.pentabull = {
   PARENT: ["genericTank"],
   SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl],
   STAT_NAMES: statnames.smasher,
   DANGER: 7,
   IS_SMASHER: true,
   LABEL: 'Pentabull',
      BODY: {
        DENSITY: 0.2,
        DAMAGE: 1.4 * base.DAMAGE,
        HEALTH: 1.5 * base.HEALTH,
        SPEED: 0.65 * base.SPEED,
        ACCELERATION: 3 * base.ACCEL,
        REGEN: 4.5 * base.REGEN,
        PUSHABILITY: 0.45,
        FOV: 0.8 * base.FOV,
        RESIST: 1.5,
    },
   SHAPE: "M0-.84A.84.84 90 000 .84a.84.84 90 000-1.68",
   SIZE: 20,
     GUNS: [ {
         POSITION: [ 2, 8, 1, 0, 0, 180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.bullboost]),
            TYPE: "bullet",
         }, }, 
     ],
     TURRETS: [
    {
      POSITION: [20, 0, 0, 0, 0, 0],
      TYPE: ["pentabullBody"],
    },
    {
      POSITION: [16, 0, 0, 0, 0, 1],
      TYPE: ["pentabullInnerBody"],
    },
  ],
};
Class.needlez = {
	PARENT: ["genericTank"],
	LABEL: "NeedleZ",
	DANGER: 7,
	BODY: {FOV: 1.25 * base.FOV, SPEED: 1.2 * base.SPEED},
	GUNS: [ {
         POSITION: [ 26, 3, 1, 0, 0, 0, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.jav, g.morespeed, g.lessreload]),
            TYPE: "bullet",
         },
         }, {
         POSITION: [ 12, 2, 1, 4, 6, 0, 0, ],
         }, {
         POSITION: [ 12, 2, 1, 4, -6, 0, 0, ],
         }, {
         POSITION: [ 2, 16, 1, 14, 0, 0, 0, ],
         }, {
         POSITION: [ 3, 5, 1, 19, 0, 0, 0, ],
         }, {
         POSITION: [ 4, 2, 1, 13, 4, 0, 0, ],
         }, {
         POSITION: [ 4, 2, 1, 13, -4, 0, 0, ],
         }, 
     ],
	
};
Class.bride = {
   PARENT: ["genericTank"],
   LABEL: 'Bride',
   DANGER: 7,
   BODY: {FOV: 1.1 * base.FOV},
   GUNS: [ {
         POSITION: [ 26, 5, 1, 0, 6, 0, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin]),
            TYPE: "bullet",
         },
         }, {
         POSITION: [ 26, 5, 1, 0, -6, 0, 0.5, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin]),
            TYPE: "bullet",
         },
         }, {
         POSITION: [ 16, 8, 1, 0, 6, 0, 0, ],
         }, {
         POSITION: [ 16, 8, 1, 0, -6, 0, 0, ],
         }, {
         POSITION: [ 12, 15, 1.2, 0, 0, 180, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone]),
            TYPE: ["drone", {INDEPENDENT: true}],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 2,
            STAT_CALCULATOR: gunCalcNames.drone,
         },
         }, 
     ],
};
Class.dehumidifier = {
   PARENT: ["genericTank"],
   LABEL: 'Dehumidifier',
   DANGER: 7,
  BODY: {
    SPEED: 0.95 * base.SPEED,
    FOV: 1.25 * base.FOV,
  },
   GUNS: [ {
         POSITION: [ 40, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.humid]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 40, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.humid, {size: 0.8}]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 40, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.humid]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 40, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.humid, { size: 0.4 }]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 40, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.humid]),
            TYPE: "bullet",
         }, }, {
		 POSITION: [ 40, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.humid, {size: 0.8}]),
            TYPE: "bullet",
         }, }, {
		 POSITION: [ 40, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.humid]),
            TYPE: "bullet",
         }, }, {
		 POSITION: [ 40, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.humid, { size: 0.4 }]),
            TYPE: "bullet",
         }, }, {
		 POSITION: [ 40, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.humid]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 4, 18, 1, 32, 0, 0, 0, ],
         }, {
         POSITION: [ 4, 18, 1, 24, 0, 0, 0, ],
         }, {
         POSITION: [ 4, 18, 1, 16, 0, 0, 0, ],
         }, {
         POSITION: [ 8, 17, 0.8, 4, 0, 0, 0, ],
         }, {
         POSITION: [ 34, 5, 0.3, 4, 0, 0, 0, ],
         }, 
     ],
};
Class.howler = (() => {
   let s = 19,
	   f = s * -2.5,
	   GUNS = [];
   for (let i = 0; i < 6; i++) {
        GUNS.push({
         POSITION: [ 22, 5, 0, 0, 0, f + s * i, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.howler]),
            TYPE: "howlbullet"}
   });
   }
		 
     return {
		PARENT: ["genericTank"],
		LABEL: 'Howler',
		DANGER: 7,
		BODY: {ACCELERATION: 2 * base.ACCEL},
		INVISIBLE: [0.08, 0.03],
		SKILL_CAP: [
		9, //Reload 
		9, //Penetration 
		0, //Bullet Health 
		9, 
		9, 
		9, 
		9, 
		9, 
		9, 
		9
		],
		GUNS,
	 };
		 
})();
Class.bottlerocketeer = {
   PARENT: ["genericTank"],
   CONTROLLERS: ["alwaysFire"],
   LABEL: 'Bottle Rocketeer',
   TOOLTIP: "Right click to charge your drones.",
   MAX_CHILDREN: 7,
   SHAPE: [[-0.65,-0.65],[0.65,-0.65],[0.65,0.65],[-0.65,0.65]],
   DANGER: 7,
   SIZE: 14,
   GUNS: [ {
         POSITION: [ 17, 13, 1, 0, 0, 90, 0, ],
         }, {
         POSITION: [ 17, 13, 1, 0, 0, -90, 0, ],
         }, {
         POSITION: [ 3, 16, 1, 16, 0, 90, 0, ],
         PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.drone, g.overseer]),
         TYPE: "bottledrone",
         AUTOFIRE: true,
         SYNCS_SKILLS: true,
         STAT_CALCULATOR: gunCalcNames.drone,
         WAIT_TO_CYCLE: true,
         },
         }, {
         POSITION: [ 3, 16, 1, 16, 0, -90, 0, ],
         PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.drone, g.overseer]),
         TYPE: "bottledrone",
         AUTOFIRE: true,
         SYNCS_SKILLS: true,
         STAT_CALCULATOR: gunCalcNames.drone,
         WAIT_TO_CYCLE: true,
         },
         }, {
         POSITION: [ 12, 15, -1.5, 0, 0, 90, 0, ],
         }, {
         POSITION: [ 12, 15, -1.5, 0, 0, -90, 0, ],
         }, 
     ],
};
Class.queen = {
	PARENT: ["genericTank"],
	LABEL: "Queen",
	SHAPE: "M.54.8A.8.64 90 00.54-.8M.54.8A.8.64 90 01.54-.8 M-.494.92A.92.736 90 00-.494-.92M-.494.92A.92.736 90 01-.494-.92",
	SIZE: 16,
	DANGER: 7,
	MAX_CHILDREN: 16,
	GUNS: [ {
         POSITION: [ 13, 12, 1, 0, 0, 0, 0, ],
		 PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.ant]),
         TYPE: ["ant", {COLOR: {BASE: -1, BRIGHTNESS_SHIFT: -15}}],
         AUTOFIRE: true,
         SYNCS_SKILLS: true,
         STAT_CALCULATOR: gunCalcNames.drone,
         WAIT_TO_CYCLE: true, 
		}, }, {
         POSITION: [ 14, 8, 0.01, 6, 0, -30, 0, ],
		 PROPERTIES: {COLOR: 9},
         }, {
         POSITION: [ 14, 8, 0.01, 6, 0, 30, 0, ],
		 PROPERTIES: {COLOR: 9},
         }, {
         POSITION: [ 6, 2, 0.01, 17, -9, 0, 0, ],
		 PROPERTIES: {COLOR: 9},
         }, {
         POSITION: [ 6, 2, 0.01, 17, 9, 0, 0, ],
		 PROPERTIES: {COLOR: 9},
         }, {
		 POSITION: [ 10, 12, 1, -3, 0, 0, 0, ],
		 PROPERTIES: {COLOR: -1},
		 },
     ],
};
Class.buddy = {
   PARENT: ["genericTank"],
   LABEL: 'Buddy',
   DANGER: 7,
   MAX_CHILDREN: 2,
   GUNS: [ {
         POSITION: [ 24, 10, 1, 0, 0, 0, 0, ],
         }, {
         POSITION: [ 25, 3, 1, 0, -6, 0, 0, ],
         }, {
         POSITION: [ 25, 3, 1, 0, 6, 0, 0, ],
         }, {
         POSITION: [ 13, 18, 1, 0, 0, 0, 0, ],
		 PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.buddy]),
         TYPE: "buddydrone",
         AUTOFIRE: true,
         SYNCS_SKILLS: true,
         STAT_CALCULATOR: gunCalcNames.drone,
         WAIT_TO_CYCLE: true, 
			 
			 
		 }, }, {
         POSITION: [ 2, 2, 1, 16, 0, 0, 0, ],
         }, {
         POSITION: [ 2, 2, 1, 20.5, 0, 0, 0, ],
         }, 
     ],
};
Class.riot = {
   PARENT: ["genericTank"],
   LABEL: 'Riot',
   DANGER: 7,
   GUNS: [ {
         POSITION: [ 8, 5, -2, 4, 2, 45, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.halfrange, g.halfrange]),
            TYPE: "swarm",
         }, }, {
         POSITION: [ 8, 5, -2, 4, -2, -45, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.halfrange, g.halfrange]),
            TYPE: "swarm",
         }, }, {
         POSITION: [ 22, 8, -2, 0, 0, 0, 0.5, ],
		 PROPERTIES: {
			 SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
			 TYPE: "bullet",
		 },
         }, {
         POSITION: [ 12, 9, 2.5, 4, 0, 0, 0, ],
		 PROPERTIES: {
			 SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
			 TYPE: "bullet",	
		 },
         }, {
         POSITION: [ 5, 10, 2, 4, 0, 0, 0, ],
		 PROPERTIES: {COLOR: 9},
         }, {
         POSITION: [ 13, 4, -2, 4, 0, 0, 0, ],
		 PROPERTIES: {COLOR: 17},
		 }, 
     ],
};

Class.appresnare = {
   PARENT: ["genericTank"],
   LABEL: 'Appresnare',
   SHAPE: 5,
   GUNS: [ {
         POSITION: [ 13, 12, -2, -1, 11, 157.5, 0, ],
         }, {
         POSITION: [ 13, 12, -2, -1, -11, -157.5, 0, ],
         }, {
         POSITION: [ 17, 17, 1, 2, 9, 22.5, 0, ],
         }, {
         POSITION: [ 17, 17, 1, 2, -9, -22.5, 0, ],
         }, {
         POSITION: [ 14, 12, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 28, 6, -2, 0, 9, 22.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 28, 6, -2, 0, -9, -22.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "bullet",
         }, }, 
     ],
};
Class.shootingstar = {
   PARENT: ["genericTank"],
   LABEL: 'Shooting Star',
   DANGER: 7,
   HAS_NO_RECOIL: true,
   BODY: {
      ACCELERATION: base.ACCEL * 0.65,
      SPEED: base.SPEED * 2.1,
      PENETRATION: base.PENETRATION * 2,
   },
    GUNS: [ {
         POSITION: [ 15, 8, -2, 0, 0, -75, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.starrange, g.doublereload]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 15, 8, -2, 0, 0, 75, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.starrange, g.doublereload]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 15, 8, -2, 0, 0, -144, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.starrange, g.doublereload]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 15, 8, -2, 0, 0, 144, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.starrange, g.doublereload]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 18, 5, -2, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 15, 8, -2, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.spam]),
            TYPE: "bullet",
         }, }, 
     ],
};
Class.jetfire = {
   PARENT: ["genericTank"],
   LABEL: 'Jetfire',
   DANGER: 7,
   SHAPE: 5,
   BODY: {
	HEALTH: 80,
	SHIELD: 10,
	SPEED: 0.61 * base.SPEED,
	PUSHABILITY: 10,
	FOV: 0.9,
   },
   SIZE: 18,
   GUNS: [ {
         POSITION: [ 8, 8, 1.5, 7, 0, 150, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.thruster, g.doublereload, g.tonsmorerecoil]),
            TYPE: ["bullet", {ALPHA: 0.5}]
         },
         }, {
         POSITION: [ 8, 8, 1.5, 7, 0, -150, 0.5, ],
		  PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.thruster, g.doublereload, g.tonsmorerecoil]),
            TYPE: ["bullet", {ALPHA: 0.5}]
         },
         }, {
         POSITION: [ 8, 12, 1.5, 7, 0, 0, 0.5, ],
		 	PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.norecoil, {size: 0.8}]),
            TYPE: "bullet",
         },
         }, {
         POSITION: [ 16, 7, 1.5, 7, 0, 0, 0, ],
		  PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.norecoil]),
            TYPE: "bullet",
         },
         }, {
         POSITION: [ 13, 19, 1.5, -7, 0, -180, 0, ],
         }, 
     ],
};

Class.beats = {
   PARENT: ["genericTank"],
   LABEL: 'Beats',
   DANGER: 7,
   GUNS: [ {
         POSITION: [ 16, 6, 1, 0, -3, -32.5, 0.75, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g.halfrecoil]),
            TYPE: "bullet",
            LABEL: 'Short',
         }, }, {
         POSITION: [ 16, 6, 1, 0, 3, 32.5, 0.75, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g.halfrecoil]),
            TYPE: "bullet",
            LABEL: 'Short',
         }, }, {
         POSITION: [ 18, 8, 1, 0, 1.5, 10, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.halfrecoil]),
            TYPE: "bullet",
            LABEL: 'Long',
         }, }, {
         POSITION: [ 18, 8, 1, 0, -1.5, -10, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.halfrecoil]),
            TYPE: "bullet",
            LABEL: 'Long',
         }, }, {
         POSITION: [ 16, 6, 1, 0, 0, 7.5, 0.25, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.lowpower, { size: 0.4 }]),
            TYPE: "bullet",
            LABEL: 'ShortClose',
         }, }, {
         POSITION: [ 16, 6, 1, 0, 0, -7.5, 0.25, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.lowpower, { size: 0.4 }]),
            TYPE: "bullet",
            LABEL: 'ShortClose',
         }, }, {
         POSITION: [ 20, 6, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.halfrecoil]),
            TYPE: "bullet",
            LABEL: 'Short',
         }, }, {
         POSITION: [ 13, 12, 1, 0, 2, 90, 0, ],
           
         PROPERTIES: {COLOR:17},
         }, {
         POSITION: [ 13, 12, 1, 0, -2, -90, 0, ],
          
         PROPERTIES: {COLOR:17}, 
         }, {
         POSITION: [ 1, 7, 1, 13, 4, 135, 0, ],
          
         PROPERTIES: {COLOR:9}, 
         }, {
         POSITION: [ 1, 7, 1, 13, -4, -135, 0, ],
           
         PROPERTIES: {COLOR:9},  
         }, {
         POSITION: [ 1, 7, 1, 15, 0, 180, 0, ],
           
         PROPERTIES: {COLOR:9},  
         }, 
     ],
};
Class.bubblejet = {
   PARENT: ["genericTank"],
   LABEL: 'Bubble Jet',
   TOOLTIP: "Hold primary to cycle through every shot in a burst. Right click to jet boost.",
   DANGER: 7,
   GUNS: [ {
         POSITION: [ 14, 14, 1, 0, 0, 180, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.bullboost]),
			ALT_FIRE: true,
            TYPE: "bullet",
         },
         }, {
         POSITION: [ 10, 14, 1.25, 0, 0, 180, 0, ],
         }, 
     ],
	/*  SIZE     X       Y     ANGLE    ARC */
     TURRETS: [
    {
      POSITION: [16, 0, 0, 0, 0, 1],
      TYPE: ["bubblejetturret", {TURRET_FACES_CLIENT: true, COLOR: -1,}],
    },
	],
};

Class.frontline = {
   PARENT: ["genericTank"],
   LABEL: 'Blare-Frontline',
   DANGER: 7,
   GUNS: [ {
         POSITION: [ 24, 16, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer]),
            TYPE: "bullet",
            LABEL: 'Front',
         }, }, {
         POSITION: [ 19, 13, -1.5, 0, 0, -180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.lotsmorrecoil]),
            TYPE: "bullet",
            ALT_FIRE: true,
            LABEL: 'Back',
         }, }, {
         POSITION: [ 10, 20, 1, 0, 0, 180, 0, ],
         }, {
         POSITION: [ 3, 8, 1, 13, 0, 0, 0, ],
         }, {
         POSITION: [ -12, 8, 0, 14, 5.7, 15, 0, ],
         }, {
         POSITION: [ -12, 8, 0, 14, -5.7, -15, 0, ],
         }, 
     ],
};
Class.terraformer = {
   PARENT: ["genericTank"],
   LABEL: 'Terraformer',
   DANGER: 7,
   SIZE: 14,
   BODY: {
      SPEED: base.SPEED * 0.8,
      HEALTH: 60,
	  PUSHABILITY: 0.4,
   },
   GUNS: [ {
         POSITION: [ 14, 7, 2, 0, 0, -45, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.halfreload]),
            MAX_CHILDREN: 2,
            AUTOFIRE: true,
            TYPE: "autosunchip",
            SYNCS_SKILLS: true,
         }, }, {
         POSITION: [ 14, 7, 2, 0, 0, 45, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.halfreload]),
            MAX_CHILDREN: 2,
            AUTOFIRE: true,
            TYPE: "autosunchip",
            SYNCS_SKILLS: true,
         }, }, {
         POSITION: [ 14, 7, 2, 0, 0, -135, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.halfreload]),
            MAX_CHILDREN: 2,
            AUTOFIRE: true,
            TYPE: "autosunchip",
            SYNCS_SKILLS: true,
         }, }, {
         POSITION: [ 14, 7, 2, 0, 0, 135, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.halfreload]),
            MAX_CHILDREN: 2,
            TYPE: "autosunchip",
            SYNCS_SKILLS: true,
         }, }, {
         POSITION: [ 17, 7, -2, 0, 0, 90, 0, ],
         }, {
         POSITION: [ 17, 7, -2, 0, 0, -90, 0, ],
         }, {
         POSITION: [ 17, 7, -2, 0, 0, 0, 0, ],
         }, {
         POSITION: [ 17, 7, -2, 0, 0, 180, 0, ],
         }, {
         POSITION: [ 5, 8, 2, 15, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.terraform]),
            TYPE: "trap",
            MAX_CHILDREN: 12, 
            destroyer_OLDEST_CHILD: true,
         }, }, {
         POSITION: [ 5, 8, 2, 15, 0, -90, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.terraform]),
            TYPE: "trap",
            MAX_CHILDREN: 12,
            destroyer_OLDEST_CHILD: true,
         }, }, {
         POSITION: [ 5, 8, 2, 15, 0, -180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.terraform]),
            TYPE: "trap",
            MAX_CHILDREN: 12,
            destroyer_OLDEST_CHILD: true,
         }, }, {
         POSITION: [ 5, 8, 2, 15, 0, 90, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.terraform]),
            TYPE: "trap",
            MAX_CHILDREN: 12,
            destroyer_OLDEST_CHILD: true,
         }, }, 
     ],
};
Class.abberator = {
   PARENT: ["genericTank"],
   LABEL: 'Abberator',
  //MAX_CHILDREN: 4,
   GUNS: [ {
         POSITION: [ 14, 8, -2, 0, 2, 22.5, 0, ],
         }, {
         POSITION: [ 14, 8, -2, 0, -2, -22.5, 0, ],
         }, {
         POSITION: [ 4, 8, 1.5, 15, 2, 22.5, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.abbdrone]),
            TYPE: "abbdrone",
            //AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            //WAIT_TO_CYCLE: true,
         }, }, {
         POSITION: [ 4, 8, 1.5, 15, -2, -22.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.abbdrone]),
            TYPE: "abbdrone",
            //AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            //WAIT_TO_CYCLE: true,
         }, }, {
         POSITION: [ 2, 10, 1, 13, 2, 22.5, 0, ],
         PROPERTIES: {COLOR:17},
         }, {
         POSITION: [ 2, 10, 1, 13, -2, -22.5, 0, ],
         PROPERTIES: {COLOR:17},
         }, {
         POSITION: [ 8, 2, 1, 2, 9, -135, 0, ],
  
         }, {
         POSITION: [ 8, 2, 1, 2, -9, 135, 0, ],
         
         }, {
         POSITION: [ 15, 6, -2, 0, 0, 0, 0, ],
         PROPERTIES: {COLOR:9},
         }, 
     ],
};
Class.dissile = {
   PARENT: ["genericTank"],
   LABEL: 'D. Missile',
   DANGER: 7,
   GUNS: [ {
         POSITION: [ 18, 7, -1.5, 0, 6, 0, 0, ],
         }, {
         POSITION: [ 18, 7, -1.5, 0, -6, 0, 0, ],
         }, {
         POSITION: [ 5, 7, 1.5, 17, 6, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.dissile]),
            TYPE: "dissilemissile",
         }, }, {
         POSITION: [ 5, 7, 1.5, 17, -6, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.dissile]),
            TYPE: "dissilemissile",
         }, }, {
         POSITION: [ 13, 6, -2, 0, 0, -75, 0, ],
         }, {
         POSITION: [ 13, 6, -2, 0, 0, 75, 0, ],
         }, 
     ],
};
Class.raze = {
   PARENT: ["genericTank"],
   LABEL: 'Raze',
   GUNS: [ {
         POSITION: [ 25, 12, 1, 0, 0, 0, 0, ],
         }, {
         POSITION: [ 17, 3, 1, 0, 7, 0, 0, ],
         }, {
         POSITION: [ 17, 3, 1, 0, -7, 0, 0, ],
         }, {
         POSITION: [ 3, 17, 1, 15, 0, 0, 0, ],
         }, {
         POSITION: [ 9, 20, 1, 1, 0, 0, 0, ],
         }, {
		 //gun
		 PROPERTIES: {
			 SHOOT_SETTINGS: combineStats([g.basic, g.halfreload]),
			 TYPE: "razerocket",
		 },
         POSITION: [ 8, 12, 1.25, 23, 0, 0, 0, ],
         }, {
         POSITION: [ 2, 14, 1.1, 22, 0, 0, 0, ],
         }, {
         POSITION: [ 3, 4, 1, 21, 0, 0, 0, ],
         }, {
         POSITION: [ 7, 8, 1, 1, 6, -157.5, 0, ],
         }, {
         POSITION: [ 7, 8, 1, 1, -6, 157.5, 0, ],
         }, 
     ],
};
Class.caltroppleChampion = {
   PARENT: ["genericChampion"],
   LABEL: 'Maltropical',
   GUNS: [ {
         POSITION: [ 13, 3.5, 1, 0, 8, 0, 0, ],
         }, {
         POSITION: [ 13, 3.5, 1, 0, -8, 0, 0, ],
         }, {
         POSITION: [ 9, 3.5, 1, 0, 15, 0, 0, ],
         }, {
         POSITION: [ 9, 3.5, 1, 0, -15, 0, 0, ],
         }, {
         POSITION: [ 4, 3.5, 2, 9, 15, 0, 1/5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.caltrop]),
            TYPE: "trap",
         }, }, {
         POSITION: [ 4, 3.5, 2, 9, -15, 0, 2/5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.caltrop]),
            TYPE: "trap",
         }, }, {
         POSITION: [ 4, 3.5, 2, 13, 8, 0, 3/5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.caltrop, {health: 1.5}]),
            TYPE: "trap",
         }, }, {
         POSITION: [ 4, 3.5, 2, 13, -8, 0, 4/5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.caltrop, {health: 1.5}]),
            TYPE: "trap",
         }, }, {
         POSITION: [ 17, 6, 1, 0, 0, 0, 0, ],
         }, {
         POSITION: [ 4, 6, 2, 17, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.caltrop, {health: 2}]),
            TYPE: "trap",
         }, }, {
         POSITION: [ 9, 30, 1.25, -5, 0, 0, 0, ],
         }, {
         POSITION: [ 9, 18, 1.25, -12, 0, 0, 0, ],
         }, 
     ],
};

Class.caltropple = {
   PARENT: ["genericTank"],
   LABEL: 'Caltropple',
   DANGER: 7,
   GUNS: [ {
         POSITION: [ 13, 3.5, 1, 0, 8, 0, 0, ],
         }, {
         POSITION: [ 13, 3.5, 1, 0, -8, 0, 0, ],
         }, {
         POSITION: [ 17, 5, 1, 0, 0, 0, 0, ],
         }, {
         POSITION: [ 4, 5, 2, 16, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.caltrop]),
            TYPE: "trap",
            LABEL: 'front',
         }, }, {
         POSITION: [ 4, 3.5, 2, 12, 8, 0, 0.33, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.caltrop]),
            TYPE: "trap",
            LABEL: 'sides',
         }, }, {
         POSITION: [ 4, 3.5, 2, 12, -8, 0, 0.66, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.caltrop]),
            TYPE: "trap",
            LABEL: 'sides',
         }, }, 
     ],
};
Class.twinion = {
	PARENT: ["genericTank"],
	LABEL: "Twinion",
	DANGER: 7,
	GUNS: [ {
         POSITION: [ 22, 6, 1, 0, 6, 0, 0.5, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.caltrop]),
            TYPE: "twinionsentry",
			MAX_CHILDREN: 4,
            destroyer_OLDEST_CHILD: true,
         }, }, {
         POSITION: [ 22, 6, 1, 0, -6, 0, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.caltrop]),
            TYPE: "twinionsentry",
			MAX_CHILDREN: 4,
            destroyer_OLDEST_CHILD: true,
         }, }, {
         POSITION: [ 11, 8, 1, 0, 6, 0, 0, ],
         }, {
         POSITION: [ 11, 8, 1, 0, -6, 0, 0, ],
         }, {
         POSITION: [ 5, 18, 1.2, 14.5, 0, 0, 0, ],
         PROPERTIES: {
            LABEL: 'gun',
         }, }, 
     ],
};
Class.trashblower = {
	PARENT: ["genericTank"],
	LABEL: "Lunkajunk",
	TOOLTIP: "Right-click to summon your junk, left click to aim with turrets.",
	SHAPE: 7,
	DANGER: 7,
	GUNS: [ {
         POSITION: [ 23, 8, 1, 0, 0, 0, 0, ],
         }, {
         POSITION: [ 14, 8, -1.5, 0, 0, 0, 0, ],
         }, {
         POSITION: [ 8, 8, 2, 21, 0, 0, 0, ],
		 PROPERTIES: {
			MAX_CHILDREN: 2,
			ALT_FIRE: true,
			destroyer_OLDEST_CHILD: true,
            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.junk, g.halfreload, g.halfreload,]),
            TYPE: ["quadjunkTurret", {CONTROLLERS: ["spin", "alwaysFire"]}],
         }, 
         }, {
         POSITION: [ 8, 8, 2, 21, 0, 0, 0, ],
		 PROPERTIES: {
			MAX_CHILDREN: 2,
			ALT_FIRE: true,
			destroyer_OLDEST_CHILD: true,
            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.junk, g.halfreload, g.halfreload,]),
            TYPE: ["quadjunkTurret", {CONTROLLERS: ["spin", "alwaysFire"]}],
         }, 
         }, {
         POSITION: [ 8, 8, 2, 21, 0, 0, 0, ],
		 PROPERTIES: {
			MAX_CHILDREN: 2,
			destroyer_OLDEST_CHILD: true,
			ALT_FIRE: true,
            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.halfspeed, g.junk, g.halfreload, g.halfreload,]),
            TYPE: "junkTurret",
         },
         }, {
         POSITION: [ 8, 8, 2, 21, 0, 0, 0, ],
		 PROPERTIES: {
			MAX_CHILDREN: 2,
			destroyer_OLDEST_CHILD: true, 
			ALT_FIRE: true,
            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.junk, g.halfreload, g.halfreload,]),
            TYPE: "junkTurret",
         },
         }, {
         POSITION: [ 8, 8, 2, 21, 0, 0, 0, ],
		 PROPERTIES: {
			MAX_CHILDREN: 2,
			destroyer_OLDEST_CHILD: true, 
			ALT_FIRE: true,
            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.junk, g.halfreload, g.halfreload,]),
            TYPE: "junkTurret",
         },
         }, {
         POSITION: [ 8, 8, 2, 21, 0, 0, 0, ],
		 PROPERTIES: {
			MAX_CHILDREN: 2,
			destroyer_OLDEST_CHILD: true, 
			ALT_FIRE: true,
            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.junk, g.halfreload, g.halfreload,]),
            TYPE: "trap",
         },
         }, {
         POSITION: [ 8, 8, 2, 21, 0, 0, 0, ],
		 PROPERTIES: {
			MAX_CHILDREN: 2,
			destroyer_OLDEST_CHILD: true, 
			ALT_FIRE: true,
            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.junk, g.halfreload, g.halfreload,]),
            TYPE: "trap",
         },
         }, {
         POSITION: [ 8, 8, 2, 21, 0, 0, 0, ],
		 PROPERTIES: {
			MAX_CHILDREN: 2,
			destroyer_OLDEST_CHILD: true, 
			ALT_FIRE: true,
            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.junk, g.halfreload, g.halfreload,]),
            TYPE: "trap",
         },
         }, {
         POSITION: [ 8, 8, 2, 21, 0, 0, 0, ],
		 PROPERTIES: {
			MAX_CHILDREN: 2,
			destroyer_OLDEST_CHILD: true, 
			ALT_FIRE: true,
            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.junk, g.halfreload, g.halfreload,]),
            TYPE: "trap",
         },
         }, {
         POSITION: [ 3, 5, 2, 13, 0, 0, 0, ],
         }, {
         POSITION: [ 4, 6, 1.5, 23, 0, 0, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.fake, g.halfreload, g.halfreload,]),
			ALT_FIRE: true,
            TYPE: "bullet",
         },
         }, {
         POSITION: [ 10, 3, 1, 7, 0, 0, 0, ],
         }, {
         POSITION: [ 3, 11, 1, 17, 0, 0, 0, ],
         }, 
     ],

};
roadstats = [g.trap, g.setTrap, g.morespeed, {health: 0.87}],
Class.roadblock = {
	PARENT: ["genericTank"],
	LABEL: 'Roadblock',
	DANGER: 7,
	HAS_NO_RECOIL: true,
	SIZE: 15,
	BODY: {
		SPEED: 0.9 * base.SPEED,
		HEALTH: 70,
		SHIELD: 8,
	},
	SHAPE: 3.5,
	GUNS: [ 
		{
		POSITION: [13, 9, 1.5, 0, 0, 0, 0,],
		PROPERTIES: {
                SHOOT_SETTINGS: combineStats(roadstats),
                TYPE: "setTrap",
        },  },
		{
		POSITION: [13, 9, 1.5, 0, 0, 120, 0,],
		PROPERTIES: {
                SHOOT_SETTINGS: combineStats(roadstats),
                TYPE: "setTrap",
        },  },
		{
		POSITION: [13, 9, 1.5, 0, 0, -120, 0,],
		PROPERTIES: {
                SHOOT_SETTINGS: combineStats(roadstats),
                TYPE: "setTrap",
            },
	},
	],
	TURRETS: [
    {
      POSITION: [9, 8, 0, 60, 160, 0],
      TYPE: ["architectGun", { INDEPENDENT: true}],
    },
    {
      POSITION: [9, 8, 0, -180, 160, 0],
      TYPE: ["architectGun", { INDEPENDENT: true}],
    },
    {
      POSITION: [9, 8, 0, -60, 160, 0],
      TYPE: ["architectGun", { INDEPENDENT: true}],
    },
  ],
};


Class.bastion = {
   PARENT: ["genericTank"],
   LABEL: 'Bastion',
   DANGER: 7,
   GUNS: [ {
         POSITION: [ 18, 10, 1, 0, 0, 0, 0, ],
         }, {
         POSITION: [ 18, 10, 1, 0, 0, 120, 0, ],
         }, {
         POSITION: [ 18, 10, 1, 0, 0, -120, 0, ],
         }, {
         POSITION: [ 5, 10, 1.5, 15, 0, 120, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.morereload]),
            TYPE: "trap",
            STAT_CALCULATOR: gunCalcNames.trap,
         }, }, {
         POSITION: [ 5, 10, 1.5, 15, 0, -120, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.morereload]),
            TYPE: "trap",
            STAT_CALCULATOR: gunCalcNames.trap,
         }, }, {
         POSITION: [ 5, 10, 1.5, 15, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.morereload]),
            TYPE: "trap",
            STAT_CALCULATOR: gunCalcNames.trap,
         }, }, {
         POSITION: [ 4, 3, 1.5, 12, 0, 120, 0, ],
         }, {
         POSITION: [ 4, 3, 1.5, 12, 0, -120, 0, ],
         }, {
         POSITION: [ 4, 3, 1.5, 12, 0, 0, 0, ],
         }, 
		
     ], 
     /*  SIZE     X       Y     ANGLE    ARC */
     TURRETS: [
    {
      POSITION: [13, 8, 0, 60, 160, 0],
      TYPE: [Class.auto4gun, { INDEPENDENT: true}],
    },
    {
      POSITION: [13, 8, 0, -180, 160, 0],
      TYPE: [Class.auto4gun, { INDEPENDENT: true}],
    },
    {
      POSITION: [13, 8, 0, -60, 160, 0],
      TYPE: [Class.auto4gun, { INDEPENDENT: true}],
    },
	{
      POSITION: [16, 7, 0, -60, 0, 0],
      TYPE: ["cosmeticring", {COLOR: 17, INDEPENDENT: true}],
    },
	{
      POSITION: [16, 7, 0, 60, 0, 0],
      TYPE: ["cosmeticring", {COLOR: 17, INDEPENDENT: true}],
    },
	{
      POSITION: [16, 7, 0, -180, 0, 0],
      TYPE: ["cosmeticring", {COLOR: 17, INDEPENDENT: true}],
    },
  ],
};
Class.minijavelin = {
   PARENT: ["genericTank"],
   LABEL: 'Mini-Javelin',
   DANGER: 7,
   SHAPE: [[-1,0],[-0.3,0.95],[0.8,0.58],[0.8,-0.58],[-0.3,-0.95]],
   BODY: {
    FOV: 1.32 * base.FOV,
   },
   GUNS: [ {
         POSITION: [ 32, 8, 1, 0, 0, -72, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.jav]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 32, 8, 1, 0, 0, 72, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.jav]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 32, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.jav]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 32, 8, 1, 0, 0, 144, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.jav]),
			
            TYPE: "bullet",
         }, }, {
         POSITION: [ 32, 8, 1, 0, 0, -144, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.jav]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 13, 8, -2, 0, 0, 0, 0, ],
         }, {
         POSITION: [ 13, 8, -2, 0, 0, 0, 0, ],
         }, {
         POSITION: [ 13, 8, -2, 0, 0, 72, 0, ],
         }, {
         POSITION: [ 13, 8, -2, 0, 0, -72, 0, ],
         }, {
         POSITION: [ 13, 8, -2, 0, 0, 144, 0, ],
         }, {
         POSITION: [ 13, 8, -2, 0, 0, -144, 0, ],
         }, 
     ],
};
//COOL BARREL
/*GUNS: [ {
         POSITION: [ 20, 8, 1, 0, 0, 0, 0, ],
         }, {
         POSITION: [ 16, 10, 1, 0, 0, 0, 0, ],
         }, {
         POSITION: [ 12, 14, 1, 0, 0, 0, 0, ],
         }, {
         POSITION: [ 12, 5, -4, 0, 0, 0, 0, ],
         }, {
         POSITION: [ 11, 2, -4, 0, 6, 97.5, 0, ],
         }, {
         POSITION: [ 11, 2, -4, 0, -6, -97.5, 0, ],
         }, {
         POSITION: [ 7, 2, 1, 19.5, 4, 0, 0, ],
         }, {
         POSITION: [ 7, 2, 1, 19.5, -4, 0, 0, ],
         }, {
         POSITION: [ 2, 12, 1, 19.5, 0, 0, 0, ],
         },
     ],
*/
profbullet = {
				SHOOT_SETTINGS: combineStats([g.basic, g.jav, {health: 0.7, reload: 2.1, size: 0.7}]),
				TYPE: "bullet",
             };
Class.professional = {
   PARENT: ['genericTank'],
   DANGER: 7,
   BODY: {
        FOV: base.FOV * 1.25
    },
   CONTROLLERS: ["zoom"],
   LABEL: 'Professional',
   INVISIBLE: [0.08, 0.03],
   GUNS: [ {
         POSITION: [ 24, 6, 1, 0, 0, 0, 0.06, ],
		 PROPERTIES: profbullet
         }, {
         POSITION: [ 16, 10, 1, 0, 0, 0, 0.12, ],
		 PROPERTIES: profbullet
         }, {
         POSITION: [ 12, 14, 1, 0, 0, 0, 0.18, ],
		 PROPERTIES: profbullet
         }, {
         POSITION: [ 12, 5, -4, 0, 0, 0, 0, ],
         }, {
         POSITION: [ 11, 2, -4, 0, 6, 97.5, 0, ],
         }, {
         POSITION: [ 11, 2, -4, 0, -6, -97.5, 0, ],
         }, {
         POSITION: [ 5.5, 2, 1, 15.5, 4, 0, 0, ],
         }, {
         POSITION: [ 5.5, 2, 1, 15.5, -4, 0, 0, ],
         }, {
         POSITION: [ 2, 12, 1, 15.5, 0, 0, 0, ],
         },
     ],
};
Class.rabbit = {
   PARENT: ["genericTank"],
   LABEL: 'Ace Rabbit',
   DANGER: 7,
   GUNS: [ {
         POSITION: [ 20, 8, 1, 0, 0, 135, 0, ],
         }, {
         POSITION: [ 20, 8, 1, 0, 0, -135, 0, ],
         }, {
         POSITION: [ 14, 8, 2, 14, 9, -165, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin]),
            TYPE: "bullet",
            LABEL: 'Bunny Ear',
         }, }, {
         POSITION: [ 14, 8, 2, 14, -9, 165, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin]),
            TYPE: "bullet",
            LABEL: 'Bunny Ear',
         }, }, {
         POSITION: [ 16, 3, -2, 0, 3, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.slow]),
            TYPE: "bullet",
            LABEL: 'Bunny Teeth',
         }, }, {
         POSITION: [ 16, 3, -2, 0, -3, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.slow]),
            TYPE: "bullet",
            LABEL: 'Bunny Teeth',
         }, }, 
     ],
};
Class.megacannon = {
   PARENT: ["genericTank"],
   LABEL: 'Megacannon',
   TYPE: 'tank',
   SHAPE: [[-0.7,-0.7],[0.7,-0.7],[0.7,0.7],[-0.7,0.7]],
   DANGER: 7,
   SIZE: 18,
   HAS_NO_RECOIL: true,
    BODY: {
    HEALTH: 4 * base.HEALTH,
	SHIELD: 4 * base.SHIELD,
    SPEED: 0.86 * base.SPEED,
    ACCEL: 1,
    REGEN: 4 * base.REGEN,
    PUSHABILITY: 0.4,
    FOV: 0.9 * base.FOV,
  },
   GUNS: [ {
         POSITION: [ 22, 7, 1, -10, 5, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.halfspeed, g.halfrange, {size: 0.8}]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 22, 7, 1, -10, -5, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.halfspeed, g.halfrange, {size: 0.8}]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 16, 7, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.single, g.morespeed, g.halfrange,]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 16, 7, -2, -6, 0, 0, 0, ],
         }, {
         POSITION: [ 16, 7, -2, -6, 0, -180, 0.5, ],
         }, {
         POSITION: [ 11, 7, -2, -1, 0, -135, 0.5, ],
         }, {
         POSITION: [ 11, 7, -2, -1, 0, 135, 0, ],
         }, {
         POSITION: [ 11, 7, -2, -1, 0, 45, 0.5, ],
         }, {
         POSITION: [ 11, 7, -2, -1, 0, -45, 0, ],
         }, {
         POSITION: [ 11, 7, -2, -1, 0, -180, 0.5, ],
         }, {
         POSITION: [ 11, 7, -2, -1, 0, -90, 0, ],
         }, {
         POSITION: [ 11, 7, -2, -1, 0, 90, 0.5, ],
         }, 
     ],
};

Class.technic = {
   PARENT: ["genericTank"],
   LABEL: 'Technic',
   DANGER: 7,
   GUNS: [ {
         POSITION: [ 15, 2.5, 1, 0, 2, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.nailgun, g.morespeed]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 15, 2.5, 1, 0, -2, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.nailgun, g.morespeed]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 17, 8, 1, 4, 9, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.halfrecoil]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 17, 8, 1, 4, -9, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.halfrecoil]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 17, 19, 1.5, -11, 0, 0, 0, ],
         }, 
     ],
};
Class.proteank = {
   PARENT: ["genericTank"],
   LABEL: 'Proteank',
   GUNS: [ {
         POSITION: [ 18, 13, 1.4, 0, 0, 0, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.machineGun, g.morereload, {size: 0.8}]),
            TYPE: "bullet",
         },
         }, {
         POSITION: [ 20, 10, 1.4, 0, 0, 0, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.machineGun, g.morereload, {size: 0.8}]),
            TYPE: "bullet",
         },
         }, {
         POSITION: [ 6, 9, 1, 8, 0, -180, 0, ],
         }, {
         POSITION: [ 4, 9, 2, 13, 0, 180, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.caltrop, g.morereload]),
            TYPE: "trap",
         },
         }, {
         POSITION: [ 12, 11, 1, 0, 0, -90, 0, ],
         }, {
         POSITION: [ 12, 11, 1, 0, 0, 90, 0, ],
         }, {
         POSITION: [ 2, 13, 1, 12, 0, -90, 0, ],
		 PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory]),
                TYPE: ["minion", {INDEPENDENT: true}],
                STAT_CALCULATOR: gunCalcNames.drone,
				MAX_CHILDREN: 1,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
         }, {
         POSITION: [ 2, 13, 1, 12, 0, 90, 0, ],
		 PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory]),
                TYPE: ["minion", {INDEPENDENT: true}],
                STAT_CALCULATOR: gunCalcNames.drone,
				MAX_CHILDREN: 1,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
         }, 
     ],
};
Class.droneaura = addAura(1,1,14)
Class.auradrone = {
	PARENT: ["drone"],
	TURRETS: [
		{
			POSITION: [12, 0, 0, 0, 0, 0],
			TYPE: ["droneaura", {INDEPENDENT: true}],
		},
	],
};
dogChampdroneprop = {
            SHOOT_SETTINGS: combineStats([g.drone, g.champ, g.slow, g.slow]),
            TYPE: "auradrone",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 2,
};
Class.dogChampion = {
   PARENT: ["genericChampion"],
   LABEL: 'Doug',
   GUNS: [ {
         POSITION: [ 16, 6, -2, 0, 0, -90, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morespeed]),
            TYPE: "swarm",
            STAT_CALCULATOR: gunCalcNames.swarm,
         }, 
         }, {
         POSITION: [ 16, 6, -2, 0, 0, 90, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morespeed]),
            TYPE: "swarm",
            STAT_CALCULATOR: gunCalcNames.swarm,
         }, 
         }, {
         POSITION: [ 16, 6, -2, 0, 0, 0, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morespeed]),
            TYPE: "swarm",
            STAT_CALCULATOR: gunCalcNames.swarm,
         }, 
         }, {
         POSITION: [ 16, 6, -2, 0, 0, 180, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morespeed]),
            TYPE: "swarm",
            STAT_CALCULATOR: gunCalcNames.swarm,
         }, 
         }, {
         POSITION: [ 13, 14, 0, 0, 0, -135, 0, ],
		 PROPERTIES: dogChampdroneprop,
         }, {
         POSITION: [ 13, 14, 0, 0, 0, 135, 0, ],
		 PROPERTIES: dogChampdroneprop,
         }, {
         POSITION: [ 13, 14, 0, 0, 0, -45, 0, ],
		 PROPERTIES: dogChampdroneprop,
         }, {
         POSITION: [ 13, 14, 0, 0, 0, 45, 0, ],
		 PROPERTIES: dogChampdroneprop,
         }, {
         POSITION: [ 13, 14, 0, 0, 0, 90, 0, ],
		 PROPERTIES: dogChampdroneprop,
         }, {
         POSITION: [ 13, 14, 0, 0, 0, -90, 0, ],
		 PROPERTIES: dogChampdroneprop,
         }, {
         POSITION: [ 14, 4, 0.5, 0, 0, -135, 0, ],
		 PROPERTIES: {COLOR: 14},
         }, {
         POSITION: [ 14, 4, 0.5, 0, 0, -45, 0, ],
		 PROPERTIES: {COLOR: 14},
         }, {
         POSITION: [ 14, 4, 0.5, 0, 0, 45, 0, ],
		 PROPERTIES: {COLOR: 14},
         }, {
         POSITION: [ 14, 4, 0.5, 0, 0, 135, 0, ],
		 PROPERTIES: {COLOR: 14},
         }, 
     ],
	 
};

Class.dog = {
   PARENT: ["genericTank"],
   LABEL: 'Dog',
   DANGER: 7,
   GUNS: [ {
         POSITION: [ 16, 6, -2, 0, 0, -90, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morespeed]),
            TYPE: "swarm",
            STAT_CALCULATOR: gunCalcNames.swarm,
         }, }, {
         POSITION: [ 16, 6, -2, 0, 0, 90, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morespeed]),
            TYPE: "swarm",
            STAT_CALCULATOR: gunCalcNames.swarm,
         }, }, {
         POSITION: [ 13, 14, 0, 0, 0, -45, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone]),
            TYPE: "drone",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 2,
            STAT_CALCULATOR: gunCalcNames.drone,
         }, }, {
         POSITION: [ 13, 14, 0, 0, 0, 45, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone]),
            TYPE: "drone",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 2,
            STAT_CALCULATOR: gunCalcNames.drone,
         }, }, {
         POSITION: [ 13, 14, 0, 0, 0, 135, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone]),
            TYPE: "drone",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 2,
            STAT_CALCULATOR: gunCalcNames.drone,
         }, }, {
         POSITION: [ 13, 14, 0, 0, 0, -135, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone]),
            TYPE: "drone",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 2,
            STAT_CALCULATOR: gunCalcNames.drone,
         }, },
     ],
};

crossvals = [g.drone, g.cross,];
crossmax = 13;
crossprojectile = "crossdrone",
Class.crossguardian = {
	PARENT: ["genericTank"],
	LABEL: "Cross Guardian",
	DANGER: 7,
	BODY: {
    SPEED: 1.1 * base.SPEED,
    FOV: 1.15 * base.FOV,
	},
	GUNS: [ {
         POSITION: [ 12, 7, -2, 0, 0, -90, 0, ],
		 PROPERTIES: {
			 SHOOT_SETTINGS: combineStats(crossvals),
			 TYPE: crossprojectile,
             AUTOFIRE: true,
             SYNCS_SKILLS: true,
             MAX_CHILDREN: crossmax,
			 
		 }, 
		 }, {
         POSITION: [ 12, 7, -2, 0, 0, 90, 0, ],
		 PROPERTIES: {
			 SHOOT_SETTINGS: combineStats(crossvals),
			 TYPE: crossprojectile,
             AUTOFIRE: true,
             SYNCS_SKILLS: true,
             MAX_CHILDREN: crossmax,
			 
		 },
         }, {
         POSITION: [ 12, 7, -2, 0, 0, 0, 0, ],
		 PROPERTIES: {
			 SHOOT_SETTINGS: combineStats(crossvals),
			 TYPE: crossprojectile,
             AUTOFIRE: true,
             SYNCS_SKILLS: true,
             MAX_CHILDREN: crossmax,
			 
		 },
         }, {
         POSITION: [ 12, 7, -2, 0, 0, -180, 0, ],
		 PROPERTIES: {
			 SHOOT_SETTINGS: combineStats(crossvals),
			 TYPE: crossprojectile,
             AUTOFIRE: true,
             SYNCS_SKILLS: true,
             MAX_CHILDREN: crossmax,
			 
		 },
         }, 
     ],
};
Class.glimmer = {
   PARENT: ["genericTank"],
   LABEL: 'Glimmer',
   DANGER: 7,
   BODY: {
    SPEED: 0.85 * base.SPEED,
    FOV: 1.15 * base.FOV,
},
   GUNS: [ {
         POSITION: [ 30, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.laser]),
            TYPE: "glimmerbullet",
         }, }, {
         POSITION: [ 15, 4, 1, 0, -6, 0, 0, ],
         }, {
         POSITION: [ 15, 4, 1, 0, 6, 0, 0, ],
         }, {
         POSITION: [ 18, 8, -2.5, 0, 0, 0, 0, ],
         }, {
         POSITION: [ 5, 8, -2, 22, 0, 0, 0, ],
         }, 
     ],
};
Class.augmentation = {
   PARENT: ["genericTank"],
   LABEL: 'Augmentation',
   DANGER: 7,
   GUNS: [ {
         POSITION: [ 15, 6, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nailgun]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 13, 3, -2, 1, -21, 15, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.machineGunner]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 13, 3, -2, 1, 21, -15, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.machineGunner]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 19, 7, -2, 1, 2.5, 67.5, 0, ],
         }, {
         POSITION: [ 19, 7, -2, 1, -2.5, -67.5, 0, ],
         }, {
         POSITION: [ 15, 7, -2, 1, 2.5, 112.5, 0, ],
         }, {
         POSITION: [ 15, 7, -2, 1, -2.5, -112.5, 0, ],
         }, {
         POSITION: [ 11, 9, 1, 1, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: "bullet",
         }, }, 
     ],
};
Class.blare = {
   PARENT: ["genericTank"],
   LABEL: 'Blare',
   DANGER: 7,
   GUNS: [ {
         POSITION: [ 4, 3, 1.2, 15, 3, 10.5, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.blare]),
            TYPE: "bullet",
         },
         }, {
         POSITION: [ 4, 3, 1.2, 15, -3, -10.5, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.blare]),
            TYPE: "bullet",
         },
         }, {
         POSITION: [ 4, 3, 1.2, 13, 0, 0, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.blare]),
            TYPE: "bullet",
         },
         }, {
         POSITION: [ 20, 16, 1.2, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.blare, g.fake]),
            TYPE: "bullet",
         }, 
		 }, {
         POSITION: [ 4, 3, 1.2, 13, 4.5, 3.5, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.blare, g.fake]),
            TYPE: "bullet",
         }, 
         }, {
         POSITION: [ 4, 3, 1.2, 13, -4.5, -3.5, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.blare, g.fake]),
            TYPE: "bullet",
         }, 
         }, {
         POSITION: [ 4, 3, 1.2, 13, 0, 0, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.blare, g.fake]),
            TYPE: "bullet",
         }, 
         }, {
         POSITION: [ 10, 20, 1, 0, 0, 0, 0, ],
         }, 
     ],
};
Class.blarearmament = {
   PARENT: ["genericTank"],
   LABEL: 'Blare-Armament',
   DANGER: 7,
   GUNS: [ {
         POSITION: [ 20, 20, 0.8, 0, 0, 0, 0, ],
         }, {
         POSITION: [ 14, 21, -1.3, -1, 0, 0, 0, ],
         }, {
         POSITION: [ 5, 28, 1, -1, 0, 180, 0, ],
         },
		 {
         POSITION: [ 7, 21, 1.1, 16.5, 0, 0, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.annihilator, g.sidewinder, g.morereload, g.arma]),
            TYPE: "blarearmamentbullet",
         }}, 		 
     ],
};
Class.blunt = {
   PARENT: ["genericTank"],
   LABEL: 'Blunt',
   DANGER: 7,
   SIZE: 18,
   GUNS: [ {
         POSITION: [ 14, 8, 1, 0, 0, 0, 0, ],
		 PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.blunt]),
			TYPE: "wavebullet",
         }, }, {
         POSITION: [ 14, 8, 1, 0, 0, 180, 0, ],
		 PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.blunt]),
			ALT_FIRE: true,
			TYPE: "wavebullet",
         }, }, {
         POSITION: [ 14, 5, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.blunt, g.fake]),
			TYPE: "bullet",
			COLOR: -1,
            LABEL: 'stripe',
         }, }, {
         POSITION: [ 14, 5, 1, 0, 0, -180, 0, ],
         PROPERTIES: {
			COLOR: -1,
            LABEL: 'stripe',
			SHOOT_SETTINGS: combineStats([g.basic, g.blunt, g.fake]),
			ALT_FIRE: true,
			TYPE: "bullet",
         }, }, 
     ],
};
Class.supersimple = {
  PARENT: ["genericTank"],
  DANGER: 7,
  LABEL: "Super",
  TOOLTIP: "Right click to parry.",
  
  TURRETS: [
        {
            /*    SIZE         X             Y         ANGLE        ARC       Z*/
            POSITION: [10, 0, 0, 0, 360, 0],
            TYPE: "parryMove",
        },
    ],
  GUNS: [
	{POSITION: [ 19, 8, 1, 0, 0, 0, 0, ]}, 
	
    {
      POSITION: [ 4, 10, 1, 17, 0, 0, 0, ],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.simple]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [5.5, 8, -1.8, 6.5, 0, 0, 0],
    },
  ],
};
Class.bubbleflank = {
   PARENT: ["genericTank"],
   LABEL: 'Propeller-Flank',
   DANGER: 7,
   GUNS: [ {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.simple, g.bflank]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, -180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.simple, g.bflank]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 3, 3, 1, 9, 0, 0, 0, ],
         }, {
         POSITION: [ 3, 3, 1, 9, 0, 180, 0, ],
         }, 
     ],
	 TURRETS: [
	 {
        POSITION: [12, 0, 0, 0, 360, 1],
        TYPE: ["bubbleturret", {independent: true, COLOR: -1}]
     }, 
	 ],
};
Class.forkaura = addAura(8, 1, 0);
Class.fork = {
   PARENT: ["genericTank"],
   LABEL: 'Fork',
	DANGER: 7,
   GUNS: [ {
         POSITION: [ 29, 5, -0.8, 4, 0, 0, 0, ],
         }, {
         POSITION: [ 17, 2.5, 0.5, 36, 7.5, 0, 0, ],
         }, {
         POSITION: [ 17, 2.5, 0.5, 36, -7.5, 0, 0, ],
         }, {
         POSITION: [ 17, 2.5, 0.5, 36, 2.75, 0, 0, ],
         }, {
         POSITION: [ 17, 2.5, 0.5, 36, -2.75, 0, 0, ],
         }, {
         POSITION: [ 8, 18, -0.8, 29, 0, 0, 0, ],
         }, 
     ],
	TURRETS: [ {
            POSITION: [5, 45, 0, 0, 0, 1],
            TYPE: "forkaura",
        }
	],
};
Class.windcutterChampion = {
   PARENT: ["genericChampion"],
   LABEL: 'Razorbreeze',
   SHAPE: "M-.5625-.9-.5625.9.9375 0-.5625-.9",
   GUNS: [ {
         POSITION: [ 3, 5, 1, 19.5, -5, 0, 0, ],
         }, {
         POSITION: [ 25, 8, 1, 0, 0, 0, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.wind, g.champ, {size: 1.35, speed: 1.8, range: 0.4, reload: 0.8}]),
            TYPE: "windbullet",
         },
         }, {
         POSITION: [ 16, 12, 1, 0, 0, 0, 0, ],
         }, {
         POSITION: [ 14, 7, 1, 0, -5, -180, 0, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.champ], {recoil: 2.5}),
            TYPE: ["bullet"],
			ALT_FIRE: true,
         },
         }, {
         POSITION: [ 14, 7, 1, 0, 5, 180, 0.5, ],
		 PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.champ, {recoil: 2.5}]),
            TYPE: ["bullet"],
			ALT_FIRE: true,
         },
         }, {
         POSITION: [ 6, 7, 1, 2, 3, 60, 0, ],
		 PROPERTIES: {COLOR:17},
         }, {
         POSITION: [ 6, 7, 1, 2, -3, -60, 0, ],
		 PROPERTIES: {COLOR:17},
         }, {
         POSITION: [ 6, 3, 1, 1.5, 5, -30, 0, ],
		 PROPERTIES: {COLOR:17},
         }, {
         POSITION: [ 6, 3, 1, 1.5, -5, 30, 0, ],
		 PROPERTIES: {COLOR:17},
         }, {
         POSITION: [ 2, 4, 1, 17, 0, 0, 0, ],
		 PROPERTIES: {COLOR:14},
         }, {
         POSITION: [ 2, 4, 1, 20, 0, 0, 0, ],
		 PROPERTIES: {COLOR:14},
         }, {
         POSITION: [ 2, 4, 1, 23, 0, 0, 0, ],
		 PROPERTIES: {COLOR:14},
         }, {
         POSITION: [ 3, 14, 1, 8, 0, 0, 0, ],
         }, {
         POSITION: [ 3, 14, 1, 0, -4, -30, 0, ],
         }, {
         POSITION: [ 3, 14, 1, 0, 4, 30, 0, ],
         }, {
         POSITION: [ 3, 14, 1, 0, 4, 142.5, 0, ],
         }, {
         POSITION: [ 3, 14, 1, 0, -4, -142.5, 0, ],
         }, {
         POSITION: [ 5, 4, 1, 18.5, -3, 0, 0, ],
         }, {
         POSITION: [ 8, 4, 1, 0, 0, -180, 0, ],
			
         }, {
         POSITION: [ 4.5, 4, 2, 11.5, 0, 0, 0, ],
		 PROPERTIES: {COLOR:17},
         }, 
     ],
};

Class.windcutter = {
   PARENT: ["genericTank"],
   LABEL: 'Windcutter',
   DANGER: 7,
   SHAPE: "M-.5625-.9-.5625.9.9375 0-.5625-.9",
   TOOLTIP: "Right click to shoot back cannons. (You can press F to automate them too)",
   GUNS: [ 
		{POSITION: [ 3, 5, 1, 19.5, -5, 0, 0, ]}, 
		{
         POSITION: [ 25, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.wind]),
            TYPE: "windbullet",
         }, }, 
		 
		 {POSITION: [ 16, 12, 1, 0, 0, 0, 0, ]}, 
		 
		 {
         POSITION: [ 14, 7, 1, 0, -5, 180, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: ["bullet"],
			ALT_FIRE: true,
         }, }, {
         POSITION: [ 14, 7, 1, 0, 5, -180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: "bullet",
			ALT_FIRE: true,
         }, }, {
         POSITION: [ 6, 7, 1, 2, 3, 52.5, 0, ],
		 }, {
         POSITION: [ 6, 7, 1, 2, -3, -52.5, 0, ],
		 }, {
         POSITION: [ 6, 9, 0, -11, 0, 0, 0, ],
         }, 
     ],
};

Class.blazzard = (() => {
	barrels = 12; 
   let angle = 360/12;
	   GUNS = [];
   for (let i = 0; i < barrels; i++) {
        GUNS.push({
         POSITION: [ 18, 4, 1, 0, 7.5, angle*i, 0.04 * i ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.caltrop]),
            TYPE: "trap"}
   });
   }
		 
     return {
		PARENT: ["genericTank"],
		LABEL: 'Blazzard',
		DANGER: 7,
		GUNS,
	 };
		 
})();

// TANK UPGRADE PATHS
// CUSTOM TANK UPGRADE PATHS
Class.basic.UPGRADES_TIER_0 = [
  "backbutton",
  "testTanks",
];
Class.backbutton.UPGRADES_TIER_0 = [
  "basicTanks",
  "assaultTanks",
  "sniperTanks",
  "swarmTanks",
  "heavyTanks",
  "utilityTanks",
  "quickbuild",
  //"testTanks",
];
Class.basicTanks.UPGRADES_TIER_0 = [
	"backbutton", 
	"supersimple",
	"bubbleflank",
	"shootingstar",
	"bubblejet",
	"jetfire",
];
Class.assaultTanks.UPGRADES_TIER_0 = [
  "backbutton",
  "technic",
  "splitshot",
  "augmentation",
  "proteank",
  "descendent",
  "beats",
  //"howler",
];
Class.sniperTanks.UPGRADES_TIER_0 = [
  "backbutton",
  "glimmer",
  "dehumidifier",
  "minijavelin",
  "professional",
  "windcutter",
  "bride",
  "needlez",
];
Class.swarmTanks.UPGRADES_TIER_0 = [
	"backbutton", 
	"dog",
	"crossguardian",
	"abberator",
	"bottlerocketeer",
	"buddy",
	"riot",
	"queen",
];
Class.heavyTanks.UPGRADES_TIER_0 = [
  "backbutton",
  "dissile",
  "blare",
  "frontline",
  "blarearmament",
  "raze",
  "megacannon",
  //"pentabull",
];
Class.utilityTanks.UPGRADES_TIER_0  = [
	"backbutton", 
	"caltropple",
	"bastion",
	"roadblock",
	"twinion",
	"trashblower",
	"blazzard",
	"terraformer",
];
Class.quickbuild.UPGRADES_TIER_0 = [
	"backbutton",
	"quickbuild_standard",
	"quickbuild_glass",
	"quickbuild_bulky",
];
Class.testTanks.UPGRADES_TIER_0  = [
	"backbutton",
	"pentabull",
	"howler",
	"blunt",
	"fork",
	"whistleblower",
	"championTanks",
];
//Direct Upgrades
const tanks2 = [
  "supersimple", //done
  "technic", //done
  "splitshot",
  //"augmentation", Has unique elite form
  "shootingstar",
  "descendent", //done
  "beats", 	//done
  "glimmer", //done
  "dehumidifier", //done
  "minijavelin", //done
  "windcutter", //done
  "dog",
  "abberator",
  "bottlerocketeer",
  "dissile", //done
  "blare", //done
  "frontline",
  "blarearmament", //done
  "megacannon", //done
  "caltropple", 
  "bastion", //done
  "blazzard",
  "riot",
  "buddy", //done
  "queen",
  "twinion",
  "bubbleflank", //done
  "bubblejet",
  "raze",
  "roadblock",
  "needlez",
  "trashblower",
  "crossguardian", //done
  "proteank",
  "jetfire", //done
  "terraformer",
  //unused "fork",
  //unused"blunt",
  "bride",];
Class.championTanks.UPGRADES_TIER_0 = [];

for (let i = 0; i < tanks2.length; i++) {
    Class[tanks2[i] + "2"] = makeSenior(Class[tanks2[i]]);
	Class[tanks2[i] + "3"] = makeElite(makeAuto(Class[tanks2[i]]));
	
	Class[tanks2[i]].UPGRADES_TIER_6 = [tanks2[i] + "2"];
	Class[tanks2[i] + "2"].UPGRADES_TIER_9 = [tanks2[i] + "3"];
	Class[tanks2[i] + "3"].UPGRADES_TIER_12 = ["placeholderChampion"];
	if (Class[tanks2[i] + "Champion"] != null) {
		Class[tanks2[i] + "3"].UPGRADES_TIER_12 = [tanks2[i] + "Champion"];
		Class.championTanks.UPGRADES_TIER_0.push(tanks2[i] + "Champion");
	}
}
//Special upgrade cases
Class.augmentation2 = makeSenior(Class.augmentation);
			Class.augmentation3 = eliteAug(makeAuto(Class.augmentation));
			
					Class.augmentation.UPGRADES_TIER_6 = ["augmentation2"];
					Class.augmentation2.UPGRADES_TIER_9 = ["augmentation3"];
					Class.augmentation3.UPGRADES_TIER_12 = ["augmentationChampion"];
/*Class.basic.UPGRADES_TIER_1 = ["backbutton", "sniper", "howler", "flankGuard", "director", "pounderer", "trapper", "dehumidifier"];
    Class.basic.UPGRADES_TIER_2 = ["smasher"];
        Class.basic.UPGRADES_TIER_3 = ["single"];
        Class.smasher.UPGRADES_TIER_3 = ["megaSmasher", "spike", "autoSmasher", "landmine"];

    Class.twin.UPGRADES_TIER_2 = ["doubleTwin", "tripleShot", "gunner", "hexaTank"];
        Class.twin.UPGRADES_TIER_3 = ["dual", "bulwark", "musket"];
        Class.doubleTwin.UPGRADES_TIER_3 = ["tripleTwin", "hewnDouble", "autoDouble", "bentDouble"];
        Class.tripleShot.UPGRADES_TIER_3 = ["pentaShot", "spreadshot", "bentHybrid", "bentDouble", "triplet"];

    Class.sniper.UPGRADES_TIER_2 = ["assassin", "hunter", "minigun", "rifle"];
        Class.sniper.UPGRADES_TIER_3 = ["bushwhacker"];
        Class.assassin.UPGRADES_TIER_3 = ["ranger", "falcon", "stalker", "autoAssassin"];
        Class.hunter.UPGRADES_TIER_3 = ["predator", "xHunter", "poacher", "ordnance", "dual"];
        Class.rifle.UPGRADES_TIER_3 = ["musket", "crossbow", "armsman"];

    Class.machineGun.UPGRADES_TIER_2 = ["artillery", "minigun", "gunner", "sprayer"];
        Class.minigun.UPGRADES_TIER_3 = ["streamliner", "nailgun", "cropDuster", "barricade", "vulture"];
        Class.gunner.UPGRADES_TIER_3 = ["autoGunner", "nailgun", "auto4", "machineGunner", "gunnerTrapper", "cyclone", "overgunner"];
        Class.sprayer.UPGRADES_TIER_3 = ["redistributor", "phoenix", "atomizer", "focal"];

    Class.flankGuard.UPGRADES_TIER_2 = ["hexaTank", "triAngle", "auto3", "trapGuard", "triTrapper"];
        Class.flankGuard.UPGRADES_TIER_3 = ["tripleTwin"];
        Class.hexaTank.UPGRADES_TIER_3 = ["octoTank", "cyclone", "hexaTrapper"];
        Class.triAngle.UPGRADES_TIER_3 = ["fighter", "booster", "falcon", "bomber", "autoTriAngle", "surfer", "eagle", "phoenix", "vulture"];
        Class.auto3.UPGRADES_TIER_3 = ["auto5", "mega3", "auto4", "banshee"];

    Class.director.UPGRADES_TIER_2 = ["overseer", "cruiser", "underseer", "spawner"];
        Class.director.UPGRADES_TIER_3 = ["manager", "bigCheese"];
        Class.overseer.UPGRADES_TIER_3 = ["overlord", "overtrapper", "overgunner", "banshee", "autoOverseer", "overdrive", "commander"];
        Class.cruiser.UPGRADES_TIER_3 = ["carrier", "battleship", "fortress", "autoCruiser", "commander"];
        Class.underseer.UPGRADES_TIER_3 = ["necromancer", "maleficitor", "infestor"];
        Class.spawner.UPGRADES_TIER_3 = ["factory", "autoSpawner"];

    Class.pounderer.UPGRADES_TIER_2 = ["destroyerer", "builder", "artillery", "launcher"];
        Class.pounderer.UPGRADES_TIER_3 = ["shotgun", "eagle"];
        Class.destroyerer.UPGRADES_TIER_3 = ["conqueror", "annihilatorhilator", "hybrid", "constr"];
        Class.artillery.UPGRADES_TIER_3 = ["mortar", "ordnance", "beekeeper", "fieldGun"];
        Class.launcher.UPGRADES_TIER_3 = ["skimmer", "twister", "swarmer", "sidewinderer", "fieldGun"];

    Class.trapper.UPGRADES_TIER_2 = ["builder", "triTrapper", "trapGuard"];
        Class.trapper.UPGRADES_TIER_3 = ["barricade", "overtrapper"];
        Class.builder.UPGRADES_TIER_3 = ["constr", "autoBuilder", "engineer", "boomer", "architect", "conqueror"];
        Class.triTrapper.UPGRADES_TIER_3 = ["fortress", "hexaTrapper", "septaTrapper", "architect"];
        Class.trapGuard.UPGRADES_TIER_3 = ["bushwhacker", "gunnerTrapper", "bomber", "conqueror", "bulwark"]; */
