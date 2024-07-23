
const {
  combineStats,
  skillSet,
  makeAuto,
  makeDeco,
  makeOver,
  makeGuard,
  makeBird,
  makeRadialAuto,
  weaponArray,
  makeTurret,
  makeRelic,
  makeRare,
  makeCrasher,
  makeLaby,
  addAura,
  newWeapon,
  menu,
  LayeredBoss,
} = require("../facilitators.js");
const {
  base,
  statnames,
  dfltskl,
  smshskl,
  basePolygonDamage,
  basePolygonHealth,
} = require("../constants.js");
const g = require("../gunvals.js");
require('./generics.js');
Class.corruptchip = {
    PARENT: "sunchip",
  LABEL: "Corrupted Polygon",
    NECRO: [0, 3, 4, 5],
    SHAPE: -2
}
Class.experimenterTurret = {
  PARENT: ["genericTank"],
  LABEL: "Stationed Turret",
  TYPE: "minion",
  HITS_OWN_TYPE: "hard",
  FACING_TYPE: "smoothToTarget",
  HAS_NO_RECOIL: true,
  BODY: {
    FOV: 1,
    SPEED: 0,
    ACCELERATION: 0,
    HEALTH: 7.5,
    SHIELD: 0,
    DAMAGE: 1.55,
    RESIST: 1,
    PENETRATION: 1,
    RANGE: 100,
    DENSITY: 0.4,
    PUSHABILITY: 0,
  },
  AI: {
    BLIND: true,
  },
  DRAW_HEALTH: true,
  CLEAR_ON_MASTER_UPGRADE: true,
  GIVE_KILL_MESSAGE: false,
  CONTROLLERS: ["nearestDifferentMaster"],
  TURRETS: [
    {
      /*  SIZE     X       Y     ANGLE    ARC */
      POSITION: [25, 0, 0, 0, 361, 0],
      TYPE: "dominationBody",
    },
  ],
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [17.5555, 8, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.single,
          
          
        ]),
        TYPE: ["bullet", {PERSISTS_AFTER_DEATH: true}],
      },
    },

    {
      POSITION: [5.5, 8, -1.8, 6.5, 0, 0, 0],
    },
  ],
};
Class.scientistTurret = {
  PARENT: ["experimenterTurret"],
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [17.5555, 8, 1, 0, -5.5, 0, 0],
      
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.twin,
          g.single,
          
          
        ]),
        TYPE: ["bullet", {PERSISTS_AFTER_DEATH: true}],
      },
    },

    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [17.5555, 8, 1, 0, 5.5, 0, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.twin,
          g.single,
          
          
        ]),
        TYPE: ["bullet", {PERSISTS_AFTER_DEATH: true}],
      },
    },
    {
      POSITION: [5.45, 16.65, -1.25, 6.25, 0, 0, 0],
    },
  ],
};
Class.physicistTurret = {
  PARENT: ["experimenterTurret"],
  GUNS: [
    
        {
            POSITION: [15, 7, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [3, 7, 1.7, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.single]),
                TYPE: ["trap", {PERSISTS_AFTER_DEATH: true}],
            },
        },
    
    {
      POSITION: [5.5, 8, -1.8, 6.5, 0, 0, 0],
    },
  ],
};
Class.researcherTurret = {
  PARENT: ["experimenterTurret"],
  GUNS: [
        {
            POSITION: [7, 7.5, 0.6, 7, -4, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.single]),
                TYPE: ["swarm", {PERSISTS_AFTER_DEATH: true}],
            },
        },
    {
      POSITION: [5.5, 8, -1.8, 6.5, 0, 0, 0],
    },
  ],
};
//Turrets
//Classes

//EXPERIMENTER BRANCH(new)
Class.experimenter = {
  PARENT: ["genericTank"],
  LABEL: "Experimenter",
  STAT_NAMES: statnames.mixed,
  BODY: {
    SPEED: base.SPEED * 0.75,
    FOV: base.FOV * 1.15,
  },
  TOOLTIP: 'Right click to spawn a turret, then left click to control their aim!',
  MAX_CHILDREN: 3, 
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [4, 15, 1, 10, 0, 0, 0],
    },

    {
      POSITION: [3, 17, 1, 12, 0, 0, 0],
    },
    {
      POSITION: [2, 15, 1.3, 17, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.factory,
          g.setTrap,
          {speed: 0.25}
          
        ]),
        TYPE: ["experimenterTurret"],
        ALT_FIRE: true,
        SYNCS_SKILLS: true,
        DESTROY_OLDEST_CHILD: true,
      },
    },
    {
      POSITION: [3, 8, -1.8, 7.5, 0, 0, 0],
    },
  ],
};
Class.scientist = {
  PARENT: ["genericTank"],
  LABEL: "Scientist",
  STAT_NAMES: statnames.mixed,
  BODY: {
    SPEED: base.SPEED * 0.75,
    FOV: base.FOV * 1.15,
  },
  MAX_CHILDREN:  3,
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [4, 15, 1, 10, 0, 0, 0],
    },

    {
      POSITION: [3, 17, 1, 12, 0, 0, 0],
    },
    {
      POSITION: [2, 15, 1.3, 17, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.factory,
          g.setTrap,
          {speed: 0.25},
          
        ]),
        TYPE: ["scientistTurret"],
        ALT_FIRE: true,
        DESTROY_OLDEST_CHILD: true,
        SYNCS_SKILLS: true,
      },      
    },
    {
      POSITION: [3, 8, -1.8, 7.5, 0, 0, 0],
    },
  ],
};
//POUNDER BRANCH

//TRAPPER BRANCH

//Legendary Classes

Class.reaper = {
  PARENT: ["genericTank"],
  LABEL: "Reaper",
  DANGER: 7,
  BODY: {
    SPEED: base.SPEED * 1.5,
    HEALTH: base.HEALTH * 2,
    DAMAGE: base.DAMAGE,
    SHIELD: base.SHIELD * 1.5,
    REGEN: base.REGEN * 2,
  },
  GUNS: [
    {
            POSITION: [13, 3, 1, 0, -8, -7, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery, g.twin]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [13, 3, 1, 0, 8, 7, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery, g.twin]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [17, 3, 1, 0, -6, -7, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery, g.twin]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [17, 3, 1, 0, 6, 7, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery, g.twin]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [24, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunterSecondary]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [21, 11, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                TYPE: "bullet",
            },
        },
    {
      POSITION: [5, 12, -1.3, 7, 0, 0, 0],
    },
  ],
};

Class.necroTyrant = {
  PARENT: ["genericTank"],
  LABEL: "Necro-Tyrant",
  DANGER: 7,
  STAT_NAMES: statnames.drone,
  BODY: {
    SPEED: base.SPEED * 2,
    HEALTH: base.HEALTH * 1.33,
    DAMAGE: base.DAMAGE * 1.33,
    SHIELD: base.SHIELD * 1.34,
    REGEN: base.REGEN * 2,
  },

  SHAPE: 0,
  MAX_CHILDREN: 32,
  GUNS: [
    {
      POSITION: [4, 9, 1.3, 8, 0, 35, 0],
    },
    {
      POSITION: [4, 9, 1.3, 8, 0, 179, 0],
    },
    {
      POSITION: [4, 9, 1.3, 8, 0, 107, 0],
    },
    {
      POSITION: [4, 9, 1.3, 8, 0, 323, 0],
    },
    {
      POSITION: [4, 9, 1.3, 8, 0, 251, 0],
    },
    {
      POSITION: [4, 9.5, 1.3, 8, 0, 60, 0],
    },
    {
      POSITION: [4, 9.5, 1.3, 8, 0, 180, 0.5],
    },
    {
      POSITION: [4, 9.5, 1.3, 8, 0, 300, 1],

    },
    {
      POSITION: [5, 12, 1.2, 8, 0, 90, 0],

    },
    {
      POSITION: [5, 12, 1.2, 8, 0, 270, 0],
    },

    {
      POSITION: [13.2, 5.2, 1.4, 0, -5, 270, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.drone,
          g.sunchip,
          {size: 2},
          {health: 2},
        ]),
        TYPE: ["corruptchip"],
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        //STAT_CALCULATOR: gunCalcNames.necro,
      },
    },
    {
      POSITION: [13.2, 5.2, 1.4, 0, 5, 270, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.drone,
          g.sunchip,
          {size: 2},
          {health: 2},
        ]),
        TYPE: ["corruptchip"],
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
       // STAT_CALCULATOR: gunCalcNames.necro,
      },
    },
    {
      POSITION: [13.2, 5.2, 1.4, 0, -5, 90, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.drone,
          g.sunchip,
          {size: 2},
          {health: 2},
        ]),
        TYPE: ["corruptchip"],
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        //STAT_CALCULATOR: gunCalcNames.necro,
      },
    },
    {
      POSITION: [13.2, 5.2, 1.4, 0, 5, 90, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.drone,
          g.sunchip,
          {size: 2},
          {health: 2},
        ]),
        TYPE: ["corruptchip"],
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
        //STAT_CALCULATOR: gunCalcNames.necro,
      },
    },
  ],
};
Class.rebel = {
  PARENT: ["genericTank"],
  LABEL: "Rebel",
  STAT_NAMES: statnames.mixed,
    BODY: {
        ACCELERATION: base.ACCEL * 1.1,
        SPEED: base.SPEED * 1.75,
        HEALTH: base.HEALTH * 1.55,
        DAMAGE: base.DAMAGE * 1.55,
        PENETRATION: base.PENETRATION * 1.04,
        SHIELD: base.SHIELD * 1.55,
        REGEN: base.REGEN * 1.55,
        FOV: 1.05 * base.FOV,
        DENSITY: 2 * base.DENSITY
    },
  GUNS: [
    {
      POSITION: [10, 8.5, 0.6, 5, 6, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.pounder, {reload: 1.5}, {damage: 1.1}]),
        TYPE: "swarm",
        //STAT_CALCULATOR: gunCalcNames.swarm,
      },
    },
    {
      POSITION: [10, 8.5, 0.6, 5, -6, 0, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.pounder, {reload: 1.5}, {damage: 1.1}]),
        TYPE: "swarm",
       // STAT_CALCULATOR: gunCalcNames.swarm,
      },
    },
    {
      POSITION: [20, 12, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.pounder,
          {damage: 1.1},
          {health: 1.1},
          {penetration: 1.1},
          {damage: 1.5},
          {health: 1.5},
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [19, 8, 1, 0, -4, 152.5, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.thruster,
          {damage: 1.5},
          {health: 1.5},
          {penetration: 1.5},
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [19, 8, 1, 0, 4, -152.5, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.thruster,
          {damage: 1.5},
          {health: 1.5},
          {penetration: 1.5},
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [19, 8, 1, 0, 0, -157.5, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.thruster,
          {damage: 1.5},
          {health: 1.5},
          {penetration: 1.5},
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [19, 8, 1, 0, 0, 157.5, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.thruster,
          {damage: 1.5},
          {health: 1.5},
          {penetration: 1.5},
        ]),
        TYPE: "bullet",
      },
    },
    {
      POSITION: [19, 8, 1, 0, 0, -180, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.thruster,
          {damage: 1.5},
          {health: 1.5},
          {penetration: 1.5},
        ]),
        TYPE: "bullet",
      }, 
    },
  ],
  TURRETS: [
    {
      POSITION: [18, 0, 0, 0, 360, 0],
      TYPE: "spikeBody",
    },
    {
      POSITION: [18, 0, 0, 90, 360, 0],
      TYPE: "spikeBody",
    },
    {
      POSITION: [18, 0, 0, 180, 360, 0],
      TYPE: "spikeBody",
    },
    {
      POSITION: [18, 0, 0, 270, 360, 0],
      TYPE: "spikeBody",
    },
  ],
};
//Misc

//Enemies

//Bosses
Class.Ranardeveloper = {
    PARENT: "genericTank",
    LABEL: "Ranar's Test Page",
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
    COLOR: "teal",
    ALPHA: [0, 1],
    HITS_OWN_TYPE: "hardOnlyTanks",
    SHAPE: 5.5,
    GUNS: weaponArray([
        {
            POSITION: [18, 8, -1.4, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.op, g.doubleDamage]),
                TYPE: "developerBullet"
            }
        }
    ], 5 )
}
Class.RanarsTanks = {
    PARENT: "Ranardeveloper",
    LABEL: "Ranar's Tank Page",
}
Class.RanarsBosses = {
    PARENT: "Ranardeveloper",
    LABEL: "Ranar's Boss Page",
}
Class.RanarsAssets = {
    PARENT: "Ranardeveloper",
    LABEL: "Ranar's Asset Page",
}
Class.RanarsMisc = {
    PARENT: "Ranardeveloper",
    LABEL: "Ranar's Misc Page",
}
Class.Ranardeveloper.UPGRADES_TIER_0 = ["developer", "RanarsTanks"]
Class.RanarsTanks.UPGRADES_TIER_0 = ["scientist", "experimenter", "reaper", "rebel", "necroTyrant"]