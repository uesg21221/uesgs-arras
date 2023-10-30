// An addon is guaranteed to run only after all groups are loaded.
// This is helpful, if your group relies on all other definitions already being loaded.
// Addons that are dependant on other addons should be named something like
// "[PARENT ADDON NAME]-[EXTENSION NAME].js", to make sure that it would run after that addon ran.

const { base } = require('../constants.js');
const { combineStats, skillSet } = require('../facilitators.js');
const g = require('../gunvals.js');

module.exports = ({ Class }) => {
	//return console.log('[theGoops.js] Addon disabled');

    //One team of tanks fights against a map full of different types of goop blobs
    //The team must clear every single one on the map to win before the time runs out

	// This adds the tank to the definitions and to the fun menu
	Class.gooper = {
		PARENT: "genericTank",
		LABEL: "Gooper",
        VARIES_IN_SIZE: true,
        DANGER: 5,
        LEVEL: 30,
        COLOR: 'green',
		FACING_TYPE: "looseToTarget",
        CONTROLLERS: ["nearestDifferentMaster", "mapAltToFire", "minion", "fleeAtLowHealth", ["mapFireToAlt", { onlyIfHasAltFireGun: true }], ["wanderAroundMap", { immitatePlayerMovement: true, lookAtGoal: true }]],
        SKILL: skillSet({
            rld: 0.3,
            dam: 0.3,
            pen: 0.3,
            str: 0.3,
            spd: 0.3,
        }),
        GUNS: [ {
            POSITION: [ 20, 6, 1, 0, 0, 0, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.flank, g.flank]),
                TYPE: "bullet",
                COLOR: 'green'
            },
            }, {
            POSITION: [ 17, 6, 0.0001, 0, 0, -22.5, 0, ],
            PROPERTIES: {
                COLOR: 'green'
            },
            }, {
            POSITION: [ 17, 6, 0.0001, 0, 0, 22.5, 0, ],
            PROPERTIES: {
                COLOR: 'green'
            },
            }, {
            POSITION: [ 13, 6, 0.0001, 0, 0, -45, 0, ],
            PROPERTIES: {
                COLOR: 'green'
            },
            }, {
            POSITION: [ 13, 6, 0.0001, 0, 0, 45, 0, ],
            PROPERTIES: {
                COLOR: 'green'
            },
            }, {
            POSITION: [ 18, 6, 0.0001, 0, 0, 0, 0, ],
            PROPERTIES: {
                COLOR: 'green'
            },
            }, {
            POSITION: [ 12, 6, 0.0001, 0, 0, -135, 0, ],
            PROPERTIES: {
                COLOR: 'green'
            },
            }, {
            POSITION: [ 12, 6, 0.0001, 0, 0, -157.5, 0, ],
            PROPERTIES: {
                COLOR: 'green'
            },
            }, {
            POSITION: [ 12, 6, 0.0001, 0, 0, 135, 0, ],
            PROPERTIES: {
                COLOR: 'green'
            },
            }, {
            POSITION: [ 12, 6, 0.0001, 0, 0, 157.5, 0, ],
            PROPERTIES: {
                COLOR: 'green'
            },
            }, 
        ],
    };
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
                TYPE: ["genericTank", {COLOR: 'green'}]
            }, {
                POSITION: [17, 0, 0, 0, 360, 1],
                TYPE: ["genericTank", {COLOR: 'green'}]
            }, {
                POSITION: [14, 0, 0, 0, 360, 1],
                TYPE: ["genericTank", {COLOR: 'green'}]
            }, {
                POSITION: [9, 0, 0, 0, 360, 1],
                TYPE: ["genericTank", {COLOR: 'green'}]
            }, {
                POSITION: [4, 0, 0, 0, 360, 1],
                TYPE: ["genericTank", {COLOR: 'green'}]
            },
        ],
        CAN_BE_ON_LEADERBOARD: false,
        GIVE_KILL_MESSAGE: true,
        ACCEPTS_SCORE: true,
        HITS_OWN_TYPE: "pushOnlyTeam",
    };
    Class.goopBlobBirther = {
        PARENT: ["goopBlob"],
        GUNS: [ {
            POSITION: [ 13, 14, 0.00001, 0, 0, -45, 0, ],
            PROPERTIES: {
                COLOR: 'green'
            },
            }, {
            POSITION: [ 13, 14, 0.00001, 0, 0, 45, 0, ],
            PROPERTIES: {
                COLOR: 'green'
            },
            }, {
            POSITION: [ 13, 14, 0.00001, 0, 0, -135, 0, ],
            PROPERTIES: {
                COLOR: 'green'
            },
            }, {
            POSITION: [ 13, 14, 0.00001, 0, 0, 135, 0, ],
            PROPERTIES: {
                COLOR: 'green'
            },
            }, {
            POSITION: [ 13, 14, 0.00001, 0, 0, -90, 0, ],
            PROPERTIES: {
                COLOR: 'green'
            },
            }, {
            POSITION: [ 13, 14, 0.00001, 0, 0, 90, 0, ],
            PROPERTIES: {
                COLOR: 'green'
            },
            }, {
            POSITION: [ 13, 14, 0.00001, 0, 0, 0, 0, ],
            PROPERTIES: {
                COLOR: 'green'
            },
            }, {
            POSITION: [ 13, 14, 0.00001, 0, 0, -180, 0, ],
            PROPERTIES: {
                COLOR: 'green'
            },
            }, 
            ...Array(8).fill().map((_, i)=>({
                POSITION: [0, 8, 0, 0, 0, ((360) / 8)*i, 9999],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic]),
                    TYPE: ["gooper", { PERSISTS_AFTER_DEATH: true, INDEPENDENT: true }],
                    SHOOT_ON_DEATH: true,
                    INDEPENDENT_CHILDREN: true,
                },
            }))
        ],
    }
    Class.goopBlobFood = {
        PARENT: ["pentagon"],
        COLOR: 'green',
        SHAPE: 0
    }
    Class.goopBlobFarmer = {
        PARENT: ["goopBlob"],
        GUNS: [
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
                    TYPE: ["goopBlobFood", { PERSISTS_AFTER_DEATH: true, INDEPENDENT: true, COLOR: 'green' }],
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
        GUNS: [ {
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
	Class.theGoops = {
	    PARENT: "menu",
	    LABEL: "The Goops",
	    UPGRADES_TIER_0: ["goopBlob", "gooper"]
	};
	Class.addons.UPGRADES_TIER_0.push("theGoops");

	console.log('[theGoops] The Amalgamation has been created..');
};