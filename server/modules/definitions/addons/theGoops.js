// An addon is guaranteed to run only after all groups are loaded.
// This is helpful, if your group relies on all other definitions already being loaded.
// Addons that are dependant on other addons should be named something like
// "[PARENT ADDON NAME]-[EXTENSION NAME].js", to make sure that it would run after that addon ran.

const { base } = require('../constants.js');
const { combineStats, skillSet } = require('../facilitators.js');
const tanks = require('../groups/tanks.js')
const g = require('../gunvals.js');

module.exports = ({ Class }) => {
	//return console.log('[theGoops.js] Addon disabled');

    //One team of tanks fights against a map full of different types of goop blobs
    //The team must clear every single one on the map to win before the time runs out

    Class.goopBlobFood = {
        PARENT: ["pentagon"],
        LABEL: 'Goop',
        COLOR: '#545c24 0 1 0 false',
        SHAPE: 0
    }
    let goopPopGuns = Array(16).fill().map((_, i)=>({
        POSITION: [0, 8, 0, 0, 0, ((360) / 8)*i, 9999],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, {speed: 3}]),
            TYPE: ["goopBlobFood", { PERSISTS_AFTER_DEATH: true, INDEPENDENT: true }],
            SHOOT_ON_DEATH: true,
            INDEPENDENT_CHILDREN: true,
        },
    }))
    Class.goopBlob = {
        PARENT: ["genericTank"],
        LABEL: "Goop Blob",
        VARIES_IN_SIZE: true,
        DANGER: 7,
        SKILL: skillSet({
            rld: 1,
            dam: 1,
            pen: 1,
            str: 1,
            spd: 1,
        }),
        LEVEL: -1,
        BODY: {
            RESIST: 100,
            SPEED: 1.32,
            ACCELERATION: 0.8,
            HEALTH: 590/2,
            DAMAGE: 6,
            PENETRATION: 0.25,
            FOV: 0.5,
            PUSHABILITY: 0,
            HETERO: 0,
            SHIELD: base.SHIELD * 1.4,
        },
        CONTROLLERS: ["nearestDifferentMaster"],
        DISPLAY_NAME: true,
        TURRETS: [
            {
                POSITION: [19, 0, 0, 0, 360, 1],
                TYPE: ["genericTank", {COLOR: '#545c24 0 1 0 false'}]
            }, {
                POSITION: [17, 0, 0, 0, 360, 1],
                TYPE: ["genericTank", {COLOR: '#545c24 0 1 0 false'}]
            }, {
                POSITION: [14, 0, 0, 0, 360, 1],
                TYPE: ["genericTank", {COLOR: '#545c24 0 1 0 false'}]
            }, {
                POSITION: [9, 0, 0, 0, 360, 1],
                TYPE: ["genericTank", {COLOR: '#545c24 0 1 0 false'}]
            }, {
                POSITION: [4, 0, 0, 0, 360, 1],
                TYPE: ["genericTank", {COLOR: '#545c24 0 1 0 false'}]
            },
        ],
        GUNS: [
            ...goopPopGuns
        ],
        CAN_BE_ON_LEADERBOARD: false,
        GIVE_KILL_MESSAGE: true,
        ACCEPTS_SCORE: true,
        HITS_OWN_TYPE: "pushOnlyTeam",
    };
    Class.gooper = {
		PARENT: "genericTank",
		LABEL: "Gooper",
        VARIES_IN_SIZE: true,
        DANGER: 8,
        COLOR: '#545c24 0 1 0 false',
		FACING_TYPE: "looseToTarget",
        CONTROLLERS: ["nearestDifferentMaster", "mapAltToFire", "minion", ["wanderAroundMap", { immitatePlayerMovement: true, lookAtGoal: true }]],
        SKILL: skillSet({
            rld: 0.6,
            dam: 0.6,
            pen: 0.6,
            str: 0.6,
            spd: 0.6,
        }),
        GUNS: [ {
            POSITION: [ 17, 6, 0.0001, 0, 0, -22.5, 0, ],
            PROPERTIES: {
                COLOR: '#545c24 0 1 0 false'
            },
            }, {
            POSITION: [ 17, 6, 0.0001, 0, 0, 22.5, 0, ],
            PROPERTIES: {
                COLOR: '#545c24 0 1 0 false'
            },
            }, {
            POSITION: [ 13, 6, 0.0001, 0, 0, -45, 0, ],
            PROPERTIES: {
                COLOR: '#545c24 0 1 0 false'
            },
            }, {
            POSITION: [ 13, 6, 0.0001, 0, 0, 45, 0, ],
            PROPERTIES: {
                COLOR: '#545c24 0 1 0 false'
            },
            }, {
            POSITION: [ 18, 6, 0.0001, 0, 0, 0, 0, ],
            PROPERTIES: {
                COLOR: '#545c24 0 1 0 false'
            },
            }, {
            POSITION: [ 12, 6, 0.0001, 0, 0, -135, 0, ],
            PROPERTIES: {
                COLOR: '#545c24 0 1 0 false'
            },
            }, {
            POSITION: [ 12, 6, 0.0001, 0, 0, -157.5, 0, ],
            PROPERTIES: {
                COLOR: '#545c24 0 1 0 false'
            },
            }, {
            POSITION: [ 12, 6, 0.0001, 0, 0, 135, 0, ],
            PROPERTIES: {
                COLOR: '#545c24 0 1 0 false'
            },
            }, {
            POSITION: [ 12, 6, 0.0001, 0, 0, 157.5, 0, ],
            PROPERTIES: {
                COLOR: '#545c24 0 1 0 false'
            },
            },
        ],
    };
    Class.gooperSniper = {
        PARENT: ["gooper"],
        LABEL: "Sniper Gooper",
        GUNS: [
            ...tanks.sniper.GUNS,
            ...Class.gooper.GUNS,
        ]
    }
    Class.gooperPounder = {
        PARENT: ["gooper"],
        LABEL: "Pounder Gooper",
        GUNS: [
            ...tanks.pounder.GUNS,
            ...Class.gooper.GUNS,
        ]
    }
    Class.gooperDirector = {
        PARENT: ["gooper"],
        LABEL: "Director Gooper",
        GUNS: [
            ...tanks.director.GUNS,
            ...Class.gooper.GUNS,
        ]
    }
    Class.goopBlobBirther = {
        PARENT: ["goopBlob"],
        GUNS: [ {
            POSITION: [ 13, 14, 0.00001, 0, 0, -45, 0, ],
            PROPERTIES: {
                COLOR: '#545c24 0 1 0 false'
            },
            }, {
            POSITION: [ 13, 14, 0.00001, 0, 0, 45, 0, ],
            PROPERTIES: {
                COLOR: '#545c24 0 1 0 false'
            },
            }, {
            POSITION: [ 13, 14, 0.00001, 0, 0, -135, 0, ],
            PROPERTIES: {
                COLOR: '#545c24 0 1 0 false'
            },
            }, {
            POSITION: [ 13, 14, 0.00001, 0, 0, 135, 0, ],
            PROPERTIES: {
                COLOR: '#545c24 0 1 0 false'
            },
            }, {
            POSITION: [ 13, 14, 0.00001, 0, 0, -90, 0, ],
            PROPERTIES: {
                COLOR: '#545c24 0 1 0 false'
            },
            }, {
            POSITION: [ 13, 14, 0.00001, 0, 0, 90, 0, ],
            PROPERTIES: {
                COLOR: '#545c24 0 1 0 false'
            },
            }, {
            POSITION: [ 13, 14, 0.00001, 0, 0, 0, 0, ],
            PROPERTIES: {
                COLOR: '#545c24 0 1 0 false'
            },
            }, {
            POSITION: [ 13, 14, 0.00001, 0, 0, -180, 0, ],
            PROPERTIES: {
                COLOR: '#545c24 0 1 0 false'
            },
            },
            ...goopPopGuns,
            ...Array(8).fill().map((_, i)=>({
                POSITION: [0, 8, 0, 0, 0, ((360) / 8)*i, 9999],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic]),
                    TYPE: ["gooper", { PERSISTS_AFTER_DEATH: true, INDEPENDENT: true }],
                    SHOOT_ON_DEATH: true,
                    INDEPENDENT_CHILDREN: true,
                    ON_FIRE: ({ body, child }) => {
                        child.define(ran.choose(['gooperSniper','gooperPounder','gooperDirector']))
                        child.skill.score = body.skill.score/2
                    }
                },
            })),
        ],
    }
    Class.goopBlobFarmer = {
        PARENT: ["goopBlob"],
        LABEL: "Goop Blob Farmer",
        GUNS: [
            ...goopPopGuns,
            {
                POSITION: [ 5, 3, 2, 10, 0, 0, (1/6)*0, ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, {reload: 50, recoil: 0}]),
                    TYPE: ["goopBlobFood", { PERSISTS_AFTER_DEATH: true, INDEPENDENT: true }],
                    INDEPENDENT_CHILDREN: true,
                    AUTOFIRE: true,
                }
                }, {
                POSITION: [ 5, 3, 2, 10, 0, -90, (1/6)*1, ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, {reload: 50, recoil: 0}]),
                    TYPE: ["goopBlobFood", { PERSISTS_AFTER_DEATH: true, INDEPENDENT: true }],
                    INDEPENDENT_CHILDREN: true,
                    AUTOFIRE: true,
                }
                }, {
                POSITION: [ 5, 3, 2, 10, 0, -45, (1/6)*2, ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, {reload: 50, recoil: 0}]),
                    TYPE: ["goopBlobFood", { PERSISTS_AFTER_DEATH: true, INDEPENDENT: true }],
                    INDEPENDENT_CHILDREN: true,
                    AUTOFIRE: true,
                }
                }, {
                POSITION: [ 5, 3, 2, 10, 0, 180, (1/6)*3, ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, {reload: 50, recoil: 0}]),
                    TYPE: ["goopBlobFood", { PERSISTS_AFTER_DEATH: true, INDEPENDENT: true }],
                    INDEPENDENT_CHILDREN: true,
                    AUTOFIRE: true,
                }
                }, {
                POSITION: [ 5, 3, 2, 10, 0, 90, (1/6)*4, ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, {reload: 50, recoil: 0}]),
                    TYPE: ["goopBlobFood", { PERSISTS_AFTER_DEATH: true, INDEPENDENT: true, COLOR: '#545c24 0 1 0 false' }],
                    INDEPENDENT_CHILDREN: true,
                    AUTOFIRE: true,
                }
                }, {
                POSITION: [ 5, 3, 2, 10, 0, 135, (1/6)*5, ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, {reload: 50, recoil: 0}]),
                    TYPE: ["goopBlobFood", { PERSISTS_AFTER_DEATH: true, INDEPENDENT: true }],
                    INDEPENDENT_CHILDREN: true,
                    AUTOFIRE: true,
                }
            },
        ]
    }
    Class.goopBlobAttacker = {
        PARENT: ["goopBlob"],
        LABEL: "Goop Blob Attacker",
        GUNS: [ ...goopPopGuns, {
            POSITION: [ 12, 8, 1, 0, 0, 0, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni, {recoil: 0}]),
                TYPE: "bullet",
                AUTOFIRE: true,
            },
            }, {
            POSITION: [ 12, 8, 1, 0, 0, 180, 0.5, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni, {recoil: 0}]),
                TYPE: "bullet",
                AUTOFIRE: true,
            },
            },
        ],
    }
    Class.goopBlobTargeterProjectile = {
        PARENT: ['bullet'],
        DAMAGE_CLASS: 1,
        LABEL: "Hardened Slime",
        FACING_TYPE: "turnWithSpeed",
        SHAPE: -6,
        BODY: {
            PUSHABILITY: 0,
            HEALTH: 10000,
            SHIELD: 10000,
            REGEN: 1000,
            DAMAGE: 0.01,
            RESIST: 100,
            STEALTH: 1,
            DENSITY: 1000,
        },
        VALUE: 0,
        SIZE: 60,
        COLOR: '#545c24 0 1 0 false',
        VARIES_IN_SIZE: true,
        ACCEPTS_SCORE: false,
    };
    Class.goopBlobTargeterTurret = {
        PARENT: ["genericTank"],
        LABEL: "Pusher",
        BODY: {
            FOV: 0.3,
        },
        COLOR: 16,
        GUNS: [
            {
                POSITION: [30, 20, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, {speed: 0.5}]),
                    TYPE: "goopBlobTargeterProjectile",
                },
            },
        ],
    };
    Class.goopBlobTargeter = {
        PARENT: ["goopBlob"],
        LABEL: "Goop Blob Targeter",
        TURRETS: [
            {
                POSITION: [19, 0, 0, 0, 360, 1],
                TYPE: ["genericTank", {COLOR: '#545c24 0 1 0 false'}]
            }, {
                POSITION: [17, 0, 0, 0, 360, 1],
                TYPE: ["genericTank", {COLOR: '#545c24 0 1 0 false'}]
            }, {
                POSITION: [14, 0, 0, 0, 360, 1],
                TYPE: ["genericTank", {COLOR: '#545c24 0 1 0 false'}]
            }, {
                POSITION: [9, 0, 0, 0, 360, 1],
                TYPE: ["genericTank", {COLOR: '#545c24 0 1 0 false'}]
            }, {
                POSITION: [4, 0, 0, 0, 360, 1],
                TYPE: ["goopBlobTargeterTurret", {COLOR: '#545c24 0 1 0 false', INDEPENDENT: true, CONTROLLERS: ["nearestDifferentMaster"]}]
            },
        ],
        GUNS: [
            ...goopPopGuns,
        ]
    }
    Class.goopBlobResistant = {
        PARENT: ["goopBlob"],
        LABEL: "Goop Blob Resistor",
        BODY: {
            RESIST: 100,
            SPEED: 1.32,
            ACCELERATION: 0.8,
            HEALTH: 590,
            DAMAGE: 12,
            PENETRATION: 0.25,
            FOV: 0.5,
            PUSHABILITY: 0,
            HETERO: 0,
            SHIELD: base.SHIELD * 1.4,
        },
        TURRETS: [
            {
                POSITION: [19, 0, 0, 0, 360, 1],
                TYPE: ["genericTank", {COLOR: '#545c24 0 1 0 false'}]
            }, {
                POSITION: [17, 0, 0, 0, 360, 1],
                TYPE: ["genericTank", {COLOR: '#545c24 0 1 0 false'}]
            }, {
                POSITION: [14, 0, 0, 0, 360, 1],
                TYPE: ["genericTank", {COLOR: '#545c24 0 1 0 false'}]
            }, {
                POSITION: [9, 0, 0, 0, 360, 1],
                TYPE: ["genericTank", {COLOR: '#545c24 0 1 0 false'}]
            }, {
                POSITION: [4, 0, 0, 0, 360, 1],
                TYPE: ["genericTank", {COLOR: '#545c24 0 1 0 false'}]
            },{
                POSITION: [22, 0, 0, 0, 360, 0],
                TYPE: "dominationBody",
            },
        ],
        GUNS: [
            ...goopPopGuns,
        ]
    }
	Class.theGoops = {
	    PARENT: "menu",
	    LABEL: "The Goops",
	    UPGRADES_TIER_0: ["goopBlob", "gooper"],
	};2
	Class.addons.UPGRADES_TIER_0.push("theGoops");

	console.log('[theGoops] The Goops...');
};