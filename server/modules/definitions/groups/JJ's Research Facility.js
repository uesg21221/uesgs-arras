const { combineStats, makeAuto, makeOver, makeDeco, makeGuard, makeBird, makeRadialAuto, weaponArray, skillSet } = require('../facilitators.js');
const { base, statnames, dfltskl, smshskl } = require('../constants.js');
require('./generics.js');
const g = require('../gunvals.js');

//ASSETS
//BODYS
Class.negetive3Symbol = {
  COLOR: "grey",
  SHAPE: -3,
}
//BULLETS
//TRAPS
Class.trap = {
    LABEL: "Thrown Trap",
    TYPE: "trap",
    ACCEPTS_SCORE: false,
    SHAPE: -3,
    MOTION_TYPE: "glide",
    FACING_TYPE: "turnWithSpeed",
    HITS_OWN_TYPE: "push",
    DIE_AT_RANGE: true,
    BODY: {
        HEALTH: 0.5,
        DAMAGE: 3,
        RANGE: 450,
        DENSITY: 2.5,
        RESIST: 2.5,
        SPEED: 0,
    },
    COLOR: 'mirror',
  
};
//ENEMEIS
//BOSSES
//TANKS
Class.enemy = {
  PARENT: ["genericTank"],
  SIZE: 10,
  DANGER: 7,
  GIVE_KILL_MESSAGE: true,
  SKILL_CAP: [
    15, //reload
    15, //Penetration
    15, //bullet hp
    15, //bullet dmg
    15, //bullet spd
    15, //shield
    15, //body dmg
    15, // body hp
    15, //shield regen
    15, //body speed
  ],
  SKILL: skillSet({
    rld: 0, //reload
    dam: 0, //bullet damage
    pen: 0, //bullet penetration
    str: 0, //bullet health
    atk: 0, //bullet speed
    spd: 0, //body damage
    hlt: 0, //max health
    shi: 0, //shield capacity
    rgn: 0, //shield regeneration
    mob: 0, //movement speed
  }),
  DRAW_HEALTH: true,
};

Class.JJdeveloper = {
    PARENT: "genericTank",
    LABEL: "JJ's Test Page",
    BODY: {
        SHIELD: 1000,
        REGEN: 10,
        HEALTH: 100,
        DAMAGE: 10,
        DENSITY: 20,
        FOV: 2,
    },
    SKILL_CAP: Array(10).fill(dfltskl),
    IGNORED_BY_AI: true,
    RESET_CHILDREN: true,
    ACCEPTS_SCORE: true,
    CAN_BE_ON_LEADERBOARD: true,
    CAN_GO_OUTSIDE_ROOM: false,
    IS_IMMUNE_TO_TILES: false,
    DRAW_HEALTH: true,
    ARENA_CLOSER: true,
    INVISIBLE: [0, 0],
    COLOR: "#ff9900",
    ALPHA: [0, 1],
    HITS_OWN_TYPE: "hardOnlyTanks",
    SHAPE: 6,
    GUNS: [
        {
            POSITION: [18, 10, -1.4, 0, 4, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.op, g.greaterDamage]),
                TYPE: "developerBullet"
            },
        },
      {
        POSITION: [18, 10, -1.4, 0, -4, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.op, g.greaterDamage]),
                TYPE: "developerBullet"
            },
        },
      {
              POSITION: [20, 10, -1.4, 0, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.op, g.greaterDamage]),
                TYPE: "developerBullet"
            }
        }
    ]
}