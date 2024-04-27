const { combineStats, menu, addAura, makeDeco, makeHybrid, makeAuto, LayeredBoss, newWeapon, weaponArray } = require('../facilitators.js');
const { base, gunCalcNames, basePolygonDamage, basePolygonHealth, dfltskl, statnames } = require('../constants.js');
const g = require('../gunvals.js');

// Menus
Class.developer = {
    PARENT: "genericTank",
    LABEL: "Developer",
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
    DRAW_HEALTH: true,
    ARENA_CLOSER: true,
    INVISIBLE: [0, 0],
    ALPHA: [0, 1],
    HITS_OWN_TYPE: "hardOnlyTanks",
    SHAPE: [
        [-1, -0.8],
        [-0.8, -1],
        [0.8, -1],
        [1, -0.8],
        [0.2, 0],
        [1, 0.8],
        [0.8, 1],
        [-0.8, 1],
        [-1, 0.8],
    ],
    GUNS: [
        {
            POSITION: [18, 10, -1.4, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                TYPE: "developerBullet"
            }
        }
    ]
}
Class.spectator = {
    PARENT: "genericTank",
    LABEL: "Spectator",
    ALPHA: 0,
    IGNORED_BY_AI: true,
    CAN_BE_ON_LEADERBOARD: false,
    ACCEPTS_SCORE: false,
    DRAW_HEALTH: false,
    HITS_OWN_TYPE: "never",
    ARENA_CLOSER: true,
    SKILL_CAP: [0, 0, 0, 0, 0, 0, 0, 0, 0, 255],
    BODY: {
        SPEED: 5,
        FOV: 2.5,
        DAMAGE: 0,
        HEALTH: 1e100,
        SHIELD: 1e100,
        REGEN: 1e100,
    }
}

Class.bosses = menu("Bosses")
Class.bosses.REROOT_UPGRADE_TREE = "bosses"
Class.sentries = menu("Sentries", "pink", 3.5)
Class.sentries.PROPS = [
    {
        POSITION: [9, 0, 0, 0, 360, 1],
        TYPE: "genericEntity"
    }
]
Class.elites = menu("Elites", "pink", 3.5)
Class.mysticals = menu("Mysticals", "gold", 4)
Class.nesters = menu("Nesters", "purple", 5.5)
Class.rogues = menu("Rogues", "darkGrey", 6)
Class.rammers = menu("Rammers", "aqua")
Class.rammers.PROPS = [
    {
        POSITION: [21.5, 0, 0, 360, -1],
        TYPE: "smasherBody",
    }
]
Class.terrestrials = menu("Terrestrials", "orange", 7)
Class.celestials = menu("Celestials", "lightGreen", 9)
Class.eternals = menu("Eternals", "veryLightGrey", 11)
Class.devBosses = menu("Developers", "lightGreen", 4)
Class.devBosses.UPGRADE_COLOR = "rainbow"

Class.tanks = menu("Tanks")
Class.unavailable = menu("Unavailable")
Class.dominators = menu("Dominators")
Class.dominators.PROPS = [
    {
        POSITION: [22, 0, 0, 360, 0],
        TYPE: "dominationBody",
    }
]
Class.sanctuaries = menu("Sanctuaries")
Class.sanctuaries.PROPS = [
    {
        POSITION: [22, 0, 0, 360, 0],
        TYPE: "dominationBody",
    }, {
        POSITION: [13, 0, 0, 360, 1],
        TYPE: "healerSymbol",
    }
]

// Generators
function compileMatrix(matrix, matrix2Entrance) {
    let matrixWidth = matrix[0].length,
        matrixHeight = matrix.length;
    for (let x = 0; x < matrixWidth; x++) for (let y = 0; y < matrixHeight; y++) {
        let str = matrix[y][x],
            LABEL = str[0].toUpperCase() + str.slice(1).replace(/[A-Z]/g, m => ' ' + m) + " Generator",
            code = str + 'Generator';
        Class[code] = matrix[y][x] = {
            PARENT: "spectator",
            LABEL,
            SKILL_CAP: [31, 0, 0, 0, 0, 0, 0, 0, 0, 31],
            TURRETS: [{
                POSITION: [5 + y * 2, 0, 0, 0, 0, 1],
                TYPE: str,
            }],
            GUNS: [{
                POSITION: [14, 12, 1, 4, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.fake]),
                    TYPE: "bullet"
                }
            }, {
                POSITION: [12, 12, 1.4, 4, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0 }]),
                    INDEPENDENT_CHILDREN: true,
                    TYPE: str
                },
            }],
        };
    }
}
function connectMatrix(matrix, matrix2Entrance) {
    let matrixWidth = matrix[0].length,
        matrixHeight = matrix.length;
    for (let x = 0; x < matrixWidth; x++) for (let y = 0; y < matrixHeight; y++) {
        let top = (y + matrixHeight - 1) % matrixHeight,
            bottom = (y + matrixHeight + 1) % matrixHeight,
            left = (x + matrixWidth - 1) % matrixWidth,
            right = (x + matrixWidth + 1) % matrixWidth,

        center = matrix[y     ][x    ];
        top    = matrix[top   ][x    ];
        bottom = matrix[bottom][x    ];
        left   = matrix[y     ][left ];
        right  = matrix[y     ][right];

        matrix[y][x].UPGRADES_TIER_0 = [
            "developer" ,  top    , "spectator",
             left       ,  center ,  right      ,
            "basic"     ,  bottom ,  matrix2Entrance
        ];
    }
}
let generatorMatrix = [
    [ "egg"           , "gem"                , "jewel"                  , "crasher"             , "sentry"               , "shinySentry"        , "EggRelic"           ],
    [ "square"        , "shinySquare"        , "legendarySquare"        , "shadowSquare"        , "rainbowSquare"        , "transSquare"        , "SquareRelic"        ],
    [ "triangle"      , "shinyTriangle"      , "legendaryTriangle"      , "shadowTriangle"      , "rainbowTriangle"      , "transTriangle"      , "TriangleRelic"      ],
    [ "pentagon"      , "shinyPentagon"      , "legendaryPentagon"      , "shadowPentagon"      , "rainbowPentagon"      , "transPentagon"      , "PentagonRelic"      ],
    [ "betaPentagon"  , "shinyBetaPentagon"  , "legendaryBetaPentagon"  , "shadowBetaPentagon"  , "rainbowBetaPentagon"  , "transBetaPentagon"  , "BetaPentagonRelic"  ],
    [ "alphaPentagon" , "shinyAlphaPentagon" , "legendaryAlphaPentagon" , "shadowAlphaPentagon" , "rainbowAlphaPentagon" , "transAlphaPentagon" , "AlphaPentagonRelic" ],
    [ "sphere"        , "cube"               , "tetrahedron"            , "octahedron"          , "dodecahedron"         , "icosahedron"        , "tesseract"          ],
],
gemRelicMatrix = [];
for (let tier of [ "", "Egg", "Square", "Triangle", "Pentagon", "BetaPentagon", "AlphaPentagon" ]) {
    let row = [];
    for (let gem of [ "Power", "Space", "Reality", "Soul", "Time", "Mind" ]) {
        row.push(gem + (tier ? tier + 'Relic' : 'Gem'));
    }
    gemRelicMatrix.push(row);
}

compileMatrix(generatorMatrix);
compileMatrix(gemRelicMatrix);

// Tensor = N-Dimensional Array, BASICALLY
let labyTensor = [];
for (let tier = 0; tier < 6; tier++) {
    let row = [];
    for (let poly of [ "Egg", "Square", "Triangle", "Pentagon", "Hexagon" ]) {
        let column = [];
        for (let shiny of [ "", "Shiny", "Legendary", "Shadow", "Rainbow", "Trans" ]) {
            let str = `laby${tier}${shiny}${poly}`,
                LABEL = str[0].toUpperCase() + str.slice(1).replace(/\d/, d => ["", "Beta", "Alpha", "Omega", "Gamma", "Delta"][d]).replace(/[A-Z]/g, m => ' ' + m) + " Generator",
                code = str + 'Generator';
            column.push(Class[code] = {
                PARENT: "spectator",
                LABEL,
                SKILL_CAP: [31, 0, 0, 0, 0, 0, 0, 0, 0, 31],
                TURRETS: [{
                    POSITION: [5 + tier * 2, 0, 0, 0, 0, 1],
                    TYPE: str,
                }],
                GUNS: [{
                    POSITION: [14, 12, 1, 4, 0, 0, 0],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.fake]),
                        TYPE: "bullet"
                    }
                }, {
                    POSITION: [12, 12, 1.4, 4, 0, 0, 0],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0 }]),
                        INDEPENDENT_CHILDREN: true,
                        TYPE: str
                    },
                }],
            });
        }
        let str = `laby${tier}${poly}Crasher`,
            LABEL = str[0].toUpperCase() + str.slice(1).replace(/\d/, d => ["", "Beta", "Alpha", "Omega", "Gamma", "Delta"][d]).replace(/[A-Z]/g, m => ' ' + m) + " Generator",
            code = str + 'Generator';
        column.push(Class[code] = {
            PARENT: "spectator",
            LABEL,
            SKILL_CAP: [31, 0, 0, 0, 0, 0, 0, 0, 0, 31],
            TURRETS: [{
                POSITION: [5 + tier * 2, 0, 0, 0, 0, 1],
                TYPE: str,
            }],
            GUNS: [{
                POSITION: [14, 12, 1, 4, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.fake]),
                    TYPE: "bullet"
                }
            }, {
                POSITION: [12, 12, 1.4, 4, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0 }]),
                    INDEPENDENT_CHILDREN: true,
                    TYPE: str
                },
            }],
        });
        row.push(column);
    }
    labyTensor.push(row);
}

connectMatrix(generatorMatrix, 'PowerGemGenerator');
connectMatrix(gemRelicMatrix, 'laby0EggGenerator');

let tensorLength = labyTensor[0][0].length,
    tensorWidth = labyTensor[0].length,
    tensorHeight = labyTensor.length;
for (let x = 0; x < tensorWidth; x++) for (let y = 0; y < tensorHeight; y++) for (let z = 0; z < tensorLength; z++) {
    let top = (y + tensorHeight - 1) % tensorHeight,
        bottom = (y + tensorHeight + 1) % tensorHeight,
        left = (x + tensorWidth - 1) % tensorWidth,
        right = (x + tensorWidth + 1) % tensorWidth,
        front = (z + tensorLength - 1) % tensorLength,
        back = (z + tensorLength + 1) % tensorLength,

    center = labyTensor[y     ][x    ][z    ];
    top    = labyTensor[top   ][x    ][z    ];
    bottom = labyTensor[bottom][x    ][z    ];
    left   = labyTensor[y     ][left ][z    ];
    right  = labyTensor[y     ][right][z    ];
    front  = labyTensor[y     ][x    ][front];
    back   = labyTensor[y     ][x    ][back ];

    labyTensor[y][x][z].UPGRADES_TIER_0 = [
        "developer" ,  top                , "spectator",
         left       ,  center             ,  right     ,
        "basic"     ,  bottom             , "eggGenerator",
         front      , "PowerGemGenerator" ,  back
    ];
}

// Testing tanks
Class.diamondShape = {
    PARENT: "basic",
    LABEL: "Rotated Body",
    SHAPE: 4.5
};

Class.rotatedTrap = {
    PARENT: "basic",
    LABEL: "Rotated Inverted Body",
    SHAPE: -3.5
};

Class.mummyHat = {
    SHAPE: 4.5,
    COLOR: -1
};
Class.mummy = {
    PARENT: "drone",
    SHAPE: 4,
    NECRO: [4],
    TURRETS: [{
        POSITION: [20 * Math.SQRT1_2, 0, 0, 180, 360, 1],
        TYPE: ["mummyHat"]
    }]
};
Class.mummifier = {
    PARENT: "genericTank",
    LABEL: "Mummifier",
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: 0.8 * base.SPEED,
    },
    SHAPE: 4,
    MAX_CHILDREN: 10,
    GUNS: [{
        POSITION: [5.5, 13, 1.1, 8, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
            TYPE: "mummy",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro
        }
    },{
        POSITION: [5.5, 13, 1.1, 8, 0, 270, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
            TYPE: "mummy",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro
        }
    }],
    TURRETS: [{
        POSITION: [20 * Math.SQRT1_2, 0, 0, 180, 360, 1],
        TYPE: ["mummyHat"]
    }]
};

Class.colorMan = {
    PARENT: "genericTank",
    LABEL: "Testing Animated Colors",
    SHAPE: 4,
    COLOR: "rainbow",
    TURRETS: [{
        POSITION: [20, -20, -20, 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedBlueRed" }
    },{
        POSITION: [20,  0 , -20, 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedBlueGrey" }
    },{
        POSITION: [20,  20, -20, 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedGreyBlue" }
    },{
        POSITION: [20, -20,  0 , 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedRedGrey" }
    },{
        POSITION: [20,  20,  0 , 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedGreyRed" }
    },{
        POSITION: [20,  20,  20, 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedLesbian" }
    },{
        POSITION: [20,  0 ,  20, 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedTrans" }
    },{
        POSITION: [20,  20,  20, 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedBi" }
    }]
};

Class.miscTestHelper2 = {
    PARENT: "genericTank",
    LABEL: "Turret Reload 3",
    MIRROR_MASTER_ANGLE: true,
    COLOR: -1,
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.noSpread]),
                TYPE: "bullet",
                COLOR: -1,
            },
        },
    ],
};
Class.miscTestHelper = {
    PARENT: "genericTank",
    LABEL: "Turret Reload 2",
    //MIRROR_MASTER_ANGLE: true,
    COLOR: {
        BASE: -1,
        BRIGHTNESS_SHIFT: 15,
    },
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.noSpread]),
                TYPE: "bullet",
                COLOR: -1,
            },
        },
    ],
    TURRETS: [
        {
          POSITION: [20, 0, 20, 30, 0, 1],
          TYPE: "miscTestHelper2",
        }
    ]
};
Class.miscTest = {
    PARENT: "genericTank",
    LABEL: "Turret Reload",
    COLOR: "teal",
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.noSpread]),
                TYPE: "bullet",
            },
        },
    ],
    TURRETS: [
        {
            POSITION: [20, 0, 20, 30, 0, 1],
            TYPE: "miscTestHelper",
        }
    ]
};
Class.mmaTest2 = {
    PARENT: "genericTank",
    MIRROR_MASTER_ANGLE: true,
    COLOR: "grey",
    GUNS: [{
            POSITION: [40, 4, 1, -20, 0, 0, 0],
        }],
}
Class.mmaTest1 = {
    PARENT: "genericTank",
    COLOR: -1,
    // Somehow, removing the gun below causes a crash when the tank is chosen ??????
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
        }
    ],
    TURRETS: [
        {
            POSITION: [10, 0, 0, 0, 360, 1],
            TYPE: "mmaTest2",
        }
    ]
}
Class.mmaTest = {
    PARENT: "genericTank",
    LABEL: "Mirror Master Angle",
    TURRETS: [
        {
            POSITION: [10, 0, 0, 0, 360, 1],
            TYPE: "mmaTest2",
        },
        {
            POSITION: [20, 0, 20, 0, 360, 1],
            TYPE: "mmaTest1",
        },
    ]
}

Class.vulnturrettest_turret = {
    PARENT: "genericTank",
    COLOR: "grey",
    HITS_OWN_TYPE: 'hard',
    LABEL: 'Shield',
    COLOR: 'teal',
}

Class.vulnturrettest = {
    PARENT: "genericTank",
    LABEL: "Vulnerable Turrets",
    TOOLTIP: "[DEV NOTE] Vulnerable turrets are still being worked on and may not function as intended!",
    BODY: {
        FOV: 2,
    },
    DANGER: 6,
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet'
        }
    }],
    TURRETS: (() => {
        let output = []
        for (let i = 0; i < 10; i++) {
            output.push({
                POSITION: {SIZE: 20, X: 40, ANGLE: (360/10)*i},
                TYPE: "vulnturrettest_turret",
                VULNERABLE: true
            })
        }
        return output
    })(),
};

Class.turretLayerTesting = {
    PARENT: 'genericTank',
    LABEL: 'Turret Layer Testing',
    TURRETS: [
        {
            POSITION: [20, 10, 10, 0, 0, 2],
            TYPE: ["basic", {COLOR: "lightGrey", MIRROR_MASTER_ANGLE: true}]
        },
        {
            POSITION: [20, 15, 5, 0, 0, 2],
            TYPE: ["basic", {COLOR: "grey", MIRROR_MASTER_ANGLE: true}]
        },
        {
            POSITION: [20, 10, -5, 0, 0, 1],
            TYPE: ["basic", {COLOR: "darkGrey", MIRROR_MASTER_ANGLE: true}]
        },
        {
            POSITION: [20, -10, -5, 0, 0, -2],
            TYPE: ["basic", {COLOR: "darkGrey", MIRROR_MASTER_ANGLE: true}]
        },
        {
            POSITION: [20, -10, 5, 0, 0, -1],
            TYPE: ["basic", {COLOR: "grey", MIRROR_MASTER_ANGLE: true}]
        },
    ]
}

Class.alphaGunTest = {
    PARENT: "basic",
    LABEL: "Translucent Guns",
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            ALPHA: 0.5
        }
    }]
}

// unfinished
Class.strokeWidthTest = {
    PARENT: "basic",
    LABEL: "Stroke Width Test",
    STROKE_WIDTH: 2,
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            STROKE_WIDTH: 0.5
        }
    }]
}

Class.onTest = {
    PARENT: 'genericTank',
    LABEL: "ON property test",
    TOOLTIP: "Refer to Class.onTest in dev.js to know more.",
    ON: [{
        event: "fire",
        handler: ({ body, gun }) => {
            switch (gun.identifier) {
                case 'mainGun':
                    body.sendMessage(`I fired my main gun.`)
                    break;
                case 'secondaryGun':
                    body.sendMessage('I fired my secondary gun.')
                    break;
            }
        }
    }, {
        event: "altFire",
        handler: ({ body, gun }) => {
            body.sendMessage(`I fired my alt gun.`)
        }
    }, {
        event: "death",
        handler: ({ body, killers, killTools }) => {
            const killedOrDied = killers.length == 0 ? 'died.' : 'got killed.'
            body.sendMessage(`I ${killedOrDied}`)
        }
    }, {
        event: "collide",
        handler: ({ instance, other }) => {
            instance.sendMessage(`I collided with ${other.label}.`)
        }
    }, {
        event: "damage",
        handler: ({ body, damageInflictor, damageTool }) => { 
            body.sendMessage(`I got hurt`)
        }
    }],
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            IDENTIFIER: 'mainGun'
        }
    }, {
        POSITION: { ANGLE: 90 },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            ALT_FIRE: true
        }
    }, {
        POSITION: { ANGLE: 180, DELAY: 0.5 },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            IDENTIFIER: 'secondaryGun'
        }
    }]
}

Class.auraBasicGen = addAura(3, 1.3);
Class.auraBasic = {
    PARENT: "genericTank",
    LABEL: "Aura Basic",
    TURRETS: [
        {
            POSITION: [14, 0, 0, 0, 0, 1],
            TYPE: "auraBasicGen"
        }
    ],
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
            },
        },
    ],
};
Class.auraHealerGen = addAura(-1);
Class.auraHealer = {
    PARENT: "genericTank",
    LABEL: "Aura Healer",
    TURRETS: [
        {
            POSITION: [14, 0, 0, 0, 0, 1],
            TYPE: "auraHealerGen"
        }
    ],
    GUNS: [
        {
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

Class.ghoster_ghosted = {
    PARENT: 'genericTank',
    TOOLTIP: 'You are now hidden, roam around and find your next target. You will be visible again in 5 seconds',
    LABEL: "Ghoster",
    BODY: {
        SPEED: 20,
        ACCELERATION: 10,
        FOV: base.FOV + 1,
    },
    GUNS: [{
        POSITION: { WIDTH: 20, LENGTH: 20 },
    }],
    ALPHA: 0.6,
}

Class.ghoster = {
    PARENT: 'genericTank',
    LABEL: "Ghoster",
    TOOLTIP: 'Shooting will hide you for 5 seconds',
    BODY: {
        SPEED: base.SPEED,
        ACCELERATION: base.ACCEL,
    },
    ON: [
        {
            event: 'fire',
            handler: ({ body }) => {
                body.define(Class.ghoster_ghosted)
                setTimeout(() => {
                    body.SPEED = 1e-99
                    body.ACCEL = 1e-99
                    body.FOV *= 2
                    body.alpha = 1
                }, 2000)
                setTimeout(() => {
                    body.SPEED = base.SPEED
                    body.define(Class.ghoster)
                }, 2500)
            }
        }
    ],
    GUNS: [{
        POSITION: {WIDTH: 20, LENGTH: 20},
        PROPERTIES: {
            TYPE: 'bullet',
            SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.annihilator]),
        }
    }],
    ALPHA: 1,
}

Class.switcheroo = {
    PARENT: "basic",
    LABEL: 'Switcheroo',
    UPGRADES_TIER_0: [],
    RESET_UPGRADE_MENU: true,
    ON: [
        {
            event: "fire",
            handler: ({ body, globalMasterStore: store, gun }) => {
                if (gun.identifier != 'switcherooGun') return
                store.switcheroo_i ??= 0;
                store.switcheroo_i++;
                store.switcheroo_i %= 6;
                body.define(Class.basic.UPGRADES_TIER_1[store.switcheroo_i]);
                setTimeout(() => body.define("switcheroo"), 6000);
            }
        }
    ],
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            IDENTIFIER: 'switcherooGun'
        }
    }]
}

Class.vanquisher = {
    PARENT: "genericTank",
    DANGER: 8,
    LABEL: "Vanquisher",
    STAT_NAMES: statnames.generic,
    BODY: {
        SPEED: 0.8 * base.SPEED,
    },
    //destroyer
    GUNS: [{
        POSITION: [21, 14, 1, 0, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer]),
            TYPE: "bullet"
        }

    //builder
    },{
        POSITION: [18, 12, 1, 0, 0, 0, 0],
    },{
        POSITION: [2, 12, 1.1, 18, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.setTrap]),
            TYPE: "setTrap",
            STAT_CALCULATOR: gunCalcNames.block
        }

    //launcher
    },{
        POSITION: [10, 9, 1, 9, 0, 90, 0],
    },{
        POSITION: [17, 13, 1, 0, 0, 90, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery]), TYPE: "minimissile", STAT_CALCULATOR: gunCalcNames.sustained }

    //shotgun
    },{
        POSITION: [4, 3, 1, 11, -3, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "bullet" }
    },{
        POSITION: [4, 3, 1, 11, 3, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "bullet" }
    },{
        POSITION: [4, 4, 1, 13, 0, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "casing" }
    },{
        POSITION: [1, 4, 1, 12, -1, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "casing" }
    },{
        POSITION: [1, 4, 1, 11, 1, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "casing" }
    },{
        POSITION: [1, 3, 1, 13, -1, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "bullet" }
    },{
        POSITION: [1, 3, 1, 13, 1, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "bullet" }
    },{
        POSITION: [1, 2, 1, 13, 2, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "casing" }
    }, {
        POSITION: [1, 2, 1, 13, -2, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "casing" }
    }, {
        POSITION: [15, 14, 1, 6, 0, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun, g.fake]), TYPE: "casing" }
    }, {
        POSITION: [8, 14, -1.3, 4, 0, 270, 0]
    }]
}
Class.armyOfOneBullet = {
    PARENT: "bullet",
    LABEL: "Unstoppable",
    TURRETS: [
        {
            POSITION: [18.5, 0, 0, 0, 360, 0],
            TYPE: ["spikeBody", { COLOR: null }]
        },
        {
            POSITION: [18.5, 0, 0, 180, 360, 0],
            TYPE: ["spikeBody", { COLOR: null }]
        }
    ]
}
Class.armyOfOne = {
    PARENT: "genericTank",
    LABEL: "Army Of One",
    DANGER: 9,
    SKILL_CAP: [31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
    BODY: {
        SPEED: 0.5 * base.SPEED,
        FOV: 1.8 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [21, 19, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.destroyer, g.destroyer, g.destroyer, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, { reload: 0.5 }, { reload: 0.5 }, { reload: 0.5 }, { reload: 0.5 }]),
                TYPE: "armyOfOneBullet",
            },
        },{
            POSITION: [21, 11, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.destroyer, g.destroyer, g.destroyer, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, { reload: 0.5 }, { reload: 0.5 }, { reload: 0.5 }, { reload: 0.5 }, g.fake]),
                TYPE: "bullet",
            },
        }
    ],
};
Class.godbasic = {
    PARENT: "genericTank",
    LABEL: "God Basic",
    SKILL_CAP: [31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
    SKILL: [ 31, 31, 31, 31, 31, 31, 31, 31, 31, 31 ],
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
                COLOR: "grey",
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
Class.maximumOverdrive = {
    PARENT: "overdrive",
    LABEL: "Maximum Overdrive",
    SKILL_CAP: Array(10).fill(255),
    SKILL: Array(10).fill(255),
};
Class.weirdAutoBasic = {
    PARENT: "genericTank",
    LABEL: "Weirdly defined Auto-Basic",
    GUNS: [{
        POSITION: {
            LENGTH: 20,
            WIDTH: 10
        },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, [0.8, 0.8, 1.5, 1, 0.8, 0.8, 0.9, 1, 1, 1, 1, 2, 1]]),
            TYPE: "bullet"
        },
    }],
    TURRETS: [{
        POSITION: {
            ANGLE: 180,
            LAYER: 1
        },
        TYPE: ["autoTurret", {
            CONTROLLERS: ["nearestDifferentMaster"],
            INDEPENDENT: true
        }]
    }]
}

Class.tooltipTank = {
    PARENT: 'genericTank',
    LABEL: "Tooltips",
    UPGRADE_TOOLTIP: "Allan please add details"
}

Class.bulletSpawnTest = {
    PARENT: 'genericTank',
    LABEL: "Bullet Spawn Position",
    GUNS: [
        {
            POSITION: [20, 10, 1, 0, -5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, {speed: 0, maxSpeed: 0, shudder: 0, spray: 0, recoil: 0}]),
                TYPE: ['bullet', {BORDERLESS: true}],
                BORDERLESS: true,
            }
        }, {
            POSITION: [50, 10, 1, 0, 5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, {speed: 0, maxSpeed: 0, shudder: 0, spray: 0, recoil: 0}]),
                TYPE: ['bullet', {BORDERLESS: true}],
                BORDERLESS: true,
            }
        }
    ]
}
Class.propTestProp = {
    PARENT: 'genericTank',
    SHAPE: 6,
    COLOR: 0,
    GUNS: [
        {
            POSITION: [20, 10, 1, 0, 0, 45, 0],
            PROPERTIES: {COLOR: 13},
        }, {
            POSITION: [20, 10, 1, 0, 0, -45, 0],
            PROPERTIES: {COLOR: 13},
        }
    ]
}

Class.propTest = {
    PARENT: 'genericTank',
    LABEL: 'Deco Prop Test',
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
            }
        }
    ],
    PROPS: [
        {
            POSITION: [10, 0, 0, 0, 1],
            TYPE: 'propTestProp'
        }
    ]
}

Class.levels = menu("Levels")
Class.levels.UPGRADES_TIER_0 = []
for (let i = 0; i < 12; i++) {
    let LEVEL = i * c.TIER_MULTIPLIER;
    Class["level" + LEVEL] = {
        PARENT: "levels",
        LEVEL,
        LABEL: "Level " + LEVEL
    };
    Class.levels.UPGRADES_TIER_0.push("level" + LEVEL);
}

Class.teams = menu("Teams")
Class.teams.UPGRADES_TIER_0 = []
for (let i = 1; i <= 8; i++) {
    let TEAM = i;
    Class["Team" + TEAM] = {
        PARENT: "teams",
        TEAM: -TEAM,
        COLOR: getTeamColor(-TEAM),
        LABEL: "Team " + TEAM
    };
    Class.teams.UPGRADES_TIER_0.push("Team" + TEAM);
}
Class['Team' + TEAM_ROOM] = {
    PARENT: "teams",
    TEAM: TEAM_ROOM,
    COLOR: "yellow",
    LABEL: "Room Team"
};
Class['Team' + TEAM_ENEMIES] = {
    PARENT: "teams",
    TEAM: TEAM_ENEMIES,
    COLOR: "yellow",
    LABEL: "Enemies Team"
};
Class.teams.UPGRADES_TIER_0.push('Team' + TEAM_ROOM, 'Team' + TEAM_ENEMIES);

Class.testing = menu("Beta Tanks")
Class.features = menu("Features")
Class.overpowered = menu("Dev Funny", "rainbow")
Class.overpowered.UPGRADE_COLOR = "rainbow"
Class.goofytanks = menu("Goofy Shit", "rainbow")
Class.goofytanks.UPGRADE_COLOR = "rainbow"
Class.overpowered.UPGRADE_TOOLTIP = "The Funny v2"
Class.goofytanks.UPGRADE_TOOLTIP = "The Funny v3"
  
Class.addons = menu("Addon Entities")
Class.addons.UPGRADES_TIER_0 = []

Class.whirlwindDeco = makeDeco(6)
Class.whirlwindDeco.CONTROLLERS = [["spin", { independent: true, speed: 0.128 }]]
Class.whirlwind = {
    PARENT: "genericTank",
    LABEL: "Whirlwind",
    ANGLE: 60,
    CONTROLLERS: ["whirlwind"],
    HAS_NO_RECOIL: true,
    STAT_NAMES: statnames.whirlwind,
    TURRETS: [
        {
            POSITION: [8, 0, 0, 0, 360, 1],
            TYPE: "whirlwindDeco"
        }
    ],
    AI: {
        SPEED: 2, 
    }, 
    GUNS: (() => { 
        let output = []
        for (let i = 0; i < 6; i++) { 
            output.push({ 
                POSITION: {WIDTH: 8, LENGTH: 1, DELAY: i * 0.25},
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.satellite]), 
                    TYPE: ["satellite", {ANGLE: i * 60}], 
                    MAX_CHILDREN: 1,   
                    AUTOFIRE: true,  
                    SYNCS_SKILLS: false,
                    WAIT_TO_CYCLE: true
                }
            }) 
        }
        return output
    })()
}

let testLayeredBoss = new LayeredBoss("testLayeredBoss", "Test Layered Boss", "terrestrial", 7, 3, "terrestrialTrapTurret", 5, 7, {SPEED: 10});
testLayeredBoss.addLayer({gun: {
    POSITION: [3.6, 7, -1.4, 8, 0, null, 0],
    PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, { size: 0.5 }]),
        TYPE: ["minion", {INDEPENDENT: true}],
        AUTOFIRE: true,
        SYNCS_SKILLS: true,
    },
}}, true, null, 16);
testLayeredBoss.addLayer({turret: {
    POSITION: [10, 7.5, 0, null, 160, 0],
    TYPE: "crowbarTurret",
}}, true);

// FLAIL!!!
Class.flailBallSpike = {
    PARENT: "genericTank",
    COLOR: "black",
    SHAPE: 6,
    INDEPENDENT: true,
};
Class.flailBall = {
    PARENT: "genericTank",
    COLOR: "grey",
    TYPE: "flail",
    BODY: {        
      DENSITY: 2 * base.DENSITY,
      HEALTH: 10000,
      SHIELD: 10000,
      DAMAGE: 4.5,
      REGEN: 10000
    },
    HITS_OWN_TYPE: 'hard',
    INDEPENDENT: true,
    TURRETS: [{
        POSITION: [21.5, 0, 0, 0, 360, 0],
        TYPE: "flailBallSpike",
    }],
};
Class.flailBolt1 = {
    PARENT: "genericTank",
    COLOR: "grey",
    INDEPENDENT: true,
    GUNS: [{
        POSITION: [40, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        POSITION: [48, 56, 0, 0, 360, 1],
        TYPE: "flailBall",
        VULNERABLE: true
    }],
};
Class.flailBolt2 = {
    PARENT: "genericTank",
    COLOR: "grey",
    INDEPENDENT: true,
    GUNS: [{
        POSITION: [30, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        POSITION: [20, 36, 0, 0, 360, 1],
        TYPE: "flailBolt1"
    }],
};
Class.flailBolt3 = {
    PARENT: "genericTank",
    COLOR: "grey",
    GUNS: [{
        POSITION: [30, 5, 1, 8, 0, 0, 0]
    }],
    TURRETS: [{
        POSITION: [18, 36, 0, 0, 360, 1],
        TYPE: "flailBolt2"
    }],
};
Class.genericFlail = {
    PARENT: "genericTank",
    STAT_NAMES: statnames.flail,
    TOOLTIP: "[DEV NOTE] The Flail is not finished yet. This tank is currently just a mockup.",
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, 0, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
}
Class.flail = {
    PARENT: "genericFlail",
    LABEL: "Flail",
    TURRETS: [{
        POSITION: [6, 10, 0, 0, 190, 0],
        TYPE: ["flailBolt3", {
            INDEPENDENT: true
        }]
    }]
}
Class.doubleFlail = {
    PARENT: "genericFlail",
    LABEL: "Double Flail",
    DANGER: 6,
    TURRETS: [{
        POSITION: [6, 10, 0, 0, 190, 0],
        TYPE: ["flailBolt3", {
            INDEPENDENT: true
        }]
    }, {
        POSITION: [6, 10, 0, 180, 190, 0],
        TYPE: ["flailBolt3", {
            INDEPENDENT: true
        }]
    }]
}
Class.tripleFlail = {
    PARENT: "genericFlail",
    LABEL: "Triple Flail",
    DANGER: 7,
    TURRETS: [{
        POSITION: [6, 10, 0, 0, 190, 0],
        TYPE: ["flailBolt3", {
            INDEPENDENT: true
        }]
    }, {
        POSITION: [6, 10, 0, 120, 190, 0],
        TYPE: ["flailBolt3", {
            INDEPENDENT: true
        }]
    }, {
        POSITION: [6, 10, 0, 240, 190, 0],
        TYPE: ["flailBolt3", {
            INDEPENDENT: true
        }]
    }]
}

Class.Trapper_guy = {
    PARENT: "trapper",
    LABEL: "Trapper_guy",
    UPGRADE_COLOR: "blue",
    SHAPE: "https://cdn.glitch.global/5fc7dcb6-aada-495b-828e-66901a470a29/6fcc71bf-255f-4d26-b13e-e3f9f68fb77a.image.png?v=1705291478159",
    GUNS: [
        {
            POSITION: [15, 7, 1, 0, 0, 0, 0]
        },
        {
            POSITION: [3, 7, 1.7, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap
            }
        }, {
            POSITION: [3, 7, 1.7, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.nomove, g.halfrange, g.shockwave]),
                TYPE: "shockwave",
                STAT_CALCULATOR: gunCalcNames.trap,
                ALT_FIRE: true
            }
        }
    ]
};
Class.shockwave = {
    PARENT: "bullet",
    LABEL: "funy",
    SHAPE: 'M 0 -1.1 A 1 1 0 0 0 0 1.1 A 1 1 0 0 0 0 -1.1 Z M 0 -1 A 0.001 0.001 0 0 1 0 1 A 0.001 0.001 0 0 1 0 -1',
    MOTION_TYPE: "trappershockwave"
};
Class.watergun = {
    LABEL: 'Auto Turret',
    SYNCS_SKILLS: true,
    SHAPE: "https://cdn.glitch.global/5fc7dcb6-aada-495b-828e-66901a470a29/e304fc26-480b-47b5-8270-949f7df44d92.image.png?v=1705294702951",
    BODY: {
        FOV: 1,
    },
    COLOR: "blue",
    CONTROLLERS: ['onlyAcceptInArc', 'nearestDifferentMaster'],
    GUNS: [{
        POSITION: [10, 8, 1, 8, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.op, g.shockwave, g.shockwave]),
            TYPE: "bullet",
            HAS_NO_RECOIL: true
          }
        }
    ]
}
Class.watergundormant = {
    LABEL: 'Auto Turret',
    SYNCS_SKILLS: true,
    SHAPE: "https://cdn.glitch.global/5fc7dcb6-aada-495b-828e-66901a470a29/e304fc26-480b-47b5-8270-949f7df44d92.image.png?v=1705294702951",
    BODY: {
        FOV: 1
    },
    COLOR: 16,
    GUNS: [{
        POSITION: [13.5, 10, 1, 8, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.fake]),
            TYPE: "bullet"
          }
        }
    ]
}
Class.waterpet = {
    PARENT: "boomerang",
    LABEL: "Base",
    SHAPE: 0,
    INDEPENDENT: true,
    TURRETS: [{
        POSITION: [25, 0, 0, 180, 360, 1],
        TYPE: "watergun",
    }],
ON: [{
          event: "death",
          handler: ({ body }) => {
            if (!body.master.isDead) return 
            body.master.define(Class.watertank)
        }
    }
  ]
};
Class.watertank = {
    PARENT: "triAngle",
    LABEL: "Waduh",
    DANGER: 6,
    SYNC_TURRET_SKILLS: true,
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.triAngleFront, { recoil: 4 }]),
                TYPE: "bullet",
                LABEL: "Front",
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        }, {
        POSITION: [1, 10, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.boomerang, g.bitlessspeed, g.shockwave, g.xtrahealth]),
            TYPE: "waterpet",
            ALT_FIRE: true,
        }
    }],
    TURRETS: [{
        POSITION: [17, 9.85, 0, 180, 360, 1],
        TYPE: "watergundormant",
      }],
  ON: [{
        event: "altFire",
        handler: ({ body }) => {
            body.define(Class.watertankFire)
        }
      }
    ]
};
Class.watertankFire = {
    PARENT: "genericTank",
    LABEL: "Waduh",
    DANGER: 6,
    GUNS: [{
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.triAngleFront, { recoil: 4 }]),
                TYPE: "bullet",
                LABEL: "Front",
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
    ]
};
Class.piszerbeam = {
  PARENT: "genericTank",
  LABEL: "Pissliner",
  COLOR: "yellow",
  TEAM: TEAM_ROOM,
  DANGER: 7,
  BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 3,
            },
  GUNS: [
        {
            POSITION: [25, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.streamliner]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [23, 8, 1, 0, 0, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.streamliner]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [21, 8, 1, 0, 0, 0, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.streamliner]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 8, 1, 0, 0, 0, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.streamliner]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [17, 8, 1, 0, 0, 0, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.streamliner]),
                TYPE: "bullet",
            },
        },         {
            POSITION: [25, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.streamliner, g.op, g.op]),
                TYPE: "oplaser",
                ALT_FIRE: true
            },
        },
        {
            POSITION: [23, 8, 1, 0, 0, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.streamliner, g.op, g.op]),
                TYPE: "oplaser",
                              ALT_FIRE: true

            },
        },
        {
            POSITION: [21, 8, 1, 0, 0, 0, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.streamliner, g.op, g.op]),
                TYPE: "oplaser",
                              ALT_FIRE: true

            },
        },
        {
            POSITION: [19, 8, 1, 0, 0, 0, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.streamliner, g.op, g.op]),
                TYPE: "oplaser",
                              ALT_FIRE: true

            },
        },
        {
            POSITION: [17, 8, 1, 0, 0, 0, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.streamliner, g.op, g.op]),
                TYPE: "oplaser",
                              ALT_FIRE: true

            },
        },
    ],
};
Class.oplaser = {
  PARENT: "bullet",
  SHAPE: -1,
  MOTION_TYPE: "fuckingnuclearbomb",
  BODY: {
        PENETRATION: 10,
        SPEED: 30,
        RANGE: 155,
        DENSITY: 1.25,
        HEALTH: 999,
        DAMAGE: 999,
        PUSHABILITY: 0.3,
    },
  BUFF_VS_FOOD: true,
}
Class.deltabaseBullet = {
    PARENT: "boomerang",
    LABEL: "Base",
    SHAPE: 'M 0 -1.1 A 1 1 0 0 0 0 1.1 A 1 1 0 0 0 0 -1.1 Z M 0 -1 A 0.001 0.001 0 0 1 0 1 A 0.001 0.001 0 0 1 0 -1',
    CONTROLLERS: [["spin", { independent: true, speed: 0.1 }]],
    INDEPENDENT: true,
    COLOR: "rainbow",
    BODY: {
      COLOR: "rainbow"
    },
    TURRETS: [{
        POSITION: [4.65, 9.85, 0, 90, 220, 1],
        TYPE: ["deltagun", { COLOR: "rainbow" }]
    }, {
        POSITION: [4.65, 9.85, 0, 270, 220, 1],
        TYPE: ["deltagun", { COLOR: "rainbow" }]
    }],
ON: [{
          event: "death",
          handler: ({ body }) => {
            if (!body.master.isDead) return 
            body.master.define(Class.baseThrowerDelta)
        }
    }
  ]
};
Class.deltagun = {
    LABEL: 'Auto Turret',
    SYNCS_SKILLS: true,
    BODY: {
        FOV: 1
    },
    COLOR: 16,
    CONTROLLERS: ['onlyAcceptInArc', 'nearestDifferentMaster'],
    GUNS: [{
        POSITION: [13.5, 10, 1, 8, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.halfreload, g.halfspeed, g.op, g.op, g.op]),
            TYPE: "grenade",
            HAS_NO_RECOIL: true
          }
        }
    ]
}
Class.turretBaseDelta = {
    LABEL: "Basethingygygyyasgsdgajskhg",
    SHAPE: 'M 0 -1.1 A 1 1 0 0 0 0 1.1 A 1 1 0 0 0 0 -1.1 Z M 0 -1 A 0.001 0.001 0 0 1 0 1 A 0.001 0.001 0 0 1 0 -1',
    COLOR: "rainbow",//iT WonT FUckING SpIN
    SYNC_TURRET_SKILLS: true,
    CONTROLLERS: [["spin", { independent: true }]],
    INDEPENDENT: true,
    TURRETS: [{
        POSITION: [4.65, 9.85, 0, 90, 220, 1],
        TYPE: ["deltagun", { COLOR: "rainbow" }]
        }, {
        POSITION: [4.65, 9.85, 0, 270, 220, 1],
        TYPE: ["deltagun", { COLOR: "rainbow" }]
        }]
};
Class.deltaDeco = {
    SHAPE: "https://cdn.glitch.global/5fc7dcb6-aada-495b-828e-66901a470a29/2024_01_15_05q_Kleki.png",
};
Class.baseThrowerDelta = {
    PARENT: "genericTank",
    LABEL: "Delta",
    DANGER: 6,
    SYNC_TURRET_SKILLS: true,
    GUNS: [
        {
            POSITION: [26, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.lowPower, g.machineGun, { recoil: 1.15 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [23, 10, 1, 0, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.lowPower, g.machineGun, { recoil: 1.15 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun]),
                TYPE: "bullet",
            },
        }, {
        POSITION: [1, 38, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.boomerang, g.bitlessspeed, g.op, g.xxtrahealth]),
            TYPE: ["deltabaseBullet", { COLOR: "rainbow" }],
            ALT_FIRE: true,
            ALPHA: 0,
            HAS_NO_RECOIL: true,
        }
    }],
    TURRETS: [{
        POSITION: [34, 0, 0, 0, 360, 0],
        TYPE: "turretBaseDelta"
    }, {
        POSITION: [34, 0, 0, 0, 360, 3],
        TYPE: "deltaDeco"
    }],
  ON: [{
        event: "altFire",
        handler: ({ body }) => {
            body.define(Class.baseThrowerFireDelta)
        }
      }
    ]
};
Class.baseThrowerFireDelta = {
    PARENT: "genericTank",
    LABEL: "Delta Congregation",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [26, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.lowPower, g.halfrecoil, g.machineGun, g.op, g.op, { recoil: 1.15 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [23, 10, 1, 0, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.lowPower, g.halfrecoil, g.machineGun, g.op, g.op, { recoil: 1.15 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.halfrecoil, g.op, g.op]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [24, 1, 1, 0, 0, 0, 2 / 3],
            PROPERTIES: {
                COLOR: 'red',
                SHOOT_SETTINGS: combineStats([g.basic, g.op, g.op, g.halfrecoil, g.op]),
                TYPE: "laser",
                HAS_NO_RECOIL: true,
            },
        }],
  TURRETS: [{
        POSITION: [34, 0, 0, 0, 360, 3],
        TYPE: "deltaDeco"
    }
  ]
};
Class.pounerbullet = {
  PARENT: "bullet",
  SHAPE: 'https://cdn.glitch.global/5fc7dcb6-aada-495b-828e-66901a470a29/74ccbc9f-e1fa-4144-8a05-bebbd593fba3.image.png?v=1705772359444'
};
Class.pouner = {
    PARENT: "genericTank",
    LABEL: "PouNer",
    SHAPE: 'https://cdn.glitch.global/5fc7dcb6-aada-495b-828e-66901a470a29/Untitled979_20240120123618.png?v=1705772311845',
    GUNS: [
        {
            POSITION: [20.5, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.op]),
                TYPE: "pounerbullet"
            }
        }
    ]
}

Class.grappletest = {
    PARENT: "genericTank",
    LABEL: "GrappleTest",
    DANGER: 4,
    ON: [
        {
      event: "define",
        handler: ({ body }) => {
          if (body.hasDefined) {
            body.children = []
          body.hasDefined = false
          } else {
            body.hasDefined = true
          }
        }
        },
       {
      event: "tick",
        handler: ({ body }) => {
          if (body.children != null) {
          for (let instance of body.children) {
                 let deltaX = instance.x - body.x,
               deltaY = instance.y - body.y,
               distance = util.getDistance(instance, body)
               angle = Math.atan2(deltaY, deltaX),
               combinedRadii = instance.realSize + body.realSize;
            body.velocity.x += 5 * Math.cos(angle)
            body.velocity.y += 5 * Math.sin(angle)
            if (combinedRadii * 1.3 > distance) {
              body.children = []
              break
            }
            
          }
          }
          if (body.control.fire) {
          for (instance of entities) {
           if (instance != body && instance.type == "wall" && util.getDistance(instance, {
                  x: body.control.target.x + body.x,
                  y: body.control.target.y + body.y
                }) < instance.size * 1.3) {
             if (body.children == 0) {
               body.children.push(instance)
             }
           }
          }
        }
        }
       }
    ]
}
Class.hook = {
  PARENT: "bullet", 
  LABEL: "boolet",
      ON: [
        {
      event: "define",
        handler: ({ body }) => {
          if (body.master.hasDefined) {
            body.master.children = []
          body.master.hasDefined = false
          } else {
            body.master.hasDefined = true
          }
        }
        },
       {
      event: "tick",
        handler: ({ body }) => {
          if (body.master.children != null) {
          for (let instance of body.master.children) {
                 let deltaX = instance.x - body.master.x,
               deltaY = instance.y - body.master.y,
               distance = util.getDistance(instance, body)
               angle = Math.atan2(deltaY, deltaX),
               combinedRadii = instance.realSize + body.realSize;
            body.master.velocity.x += 5 * Math.cos(angle)
            body.master.velocity.y += 5 * Math.sin(angle)
            if (combinedRadii * 1.3 > distance) {
              body.master.children = []
              break
            }
            
          }
          }
          if (body.master.control.fire) {
          for (instance of entities) {
           if (instance != body.master && instance.type == "wall" && util.getDistance(instance, {
                  x: body.master.control.target.x + body.master.x,
                  y: body.master.control.target.y + body.master.y
                }) < instance.size * 1.3) {
             if (body.master.children == 0) {
               body.master.children.push(instance)
             }
           }
          }
        }
        }
       }
    ]
},

Class.devtesttemplate = {
    PARENT: "genericTank",
    LABEL: "Single",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [19, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [5.5, 8, -1.8, 6.5, 0, 0, 0]
        }
    ]
};
Class.speedoflight = {
    PARENT: "genericTank",
    LABEL: "SpeedOfLight",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [24, 4, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.acceltospeedoflight, { range: 999 }]),
                TYPE: ["bullet", { MOTION_TYPE: "acceleratetothespeedoflight" }]
            }
        }
    ]
};
Class.maxStatTank = {
  PARENT: ['genericTank'],
  DANGER: 11,
  BODY: {
    ACCELERATION: base.ACCEL*2,
    SPEED: base.SPEED*2,
    HEALTH: base.HEALTH*2,
    DAMAGE: base.DAMAGE*2,
    PENETRATION: base.PENETRATION*2,
    SHIELD: base.SHIELD*2,
    REGEN: base.REGEN*2,
    FOV: base.FOV*2,
    DENSITY: base.DENSITY*2,
    PUSHABILITY: 2,
    HETERO: 6,
  },
  SKILL_CAP: Array(10).fill(255),
  SKILL: Array(10).fill(255),
}
Class.qlamgSpinnerTurret = {
    PARENT: "genericTank",
    LABEL: "Spinner Turret",
    GUNS: [
        {
            POSITION: [15, 3.5, 1, 0, 0, 0, 0],
              PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.gunner, g.nailgun, g.literallyamachinegun]),
              TYPE: "bullet"
            }
        },         {
            POSITION: [15, 3.5, 1, 0, 0, 0, 0.1],
              PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.gunner, g.nailgun, g.literallyamachinegun]),
              TYPE: "bullet"
            }
        },         {
            POSITION: [15, 3.5, 1, 0, 0, 0, 0.2],
              PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.gunner, g.nailgun, g.literallyamachinegun]),
              TYPE: "bullet"
            }
        },         {
            POSITION: [15, 3.5, 1, 0, 0, 0, 0.3],
              PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.gunner, g.nailgun, g.literallyamachinegun]),
              TYPE: "bullet"
            }
        },         {
            POSITION: [15, 3.5, 1, 0, 0, 0, 0.4],
              PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.gunner, g.nailgun, g.literallyamachinegun]),
              TYPE: "bullet"
            }
        },         {
            POSITION: [15, 3.5, 1, 0, 0, 0, 0.5],
              PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.gunner, g.nailgun, g.literallyamachinegun]),
              TYPE: "bullet"
            }
        },         {
            POSITION: [15, 3.5, 1, 0, 0, 0, 0.6],
              PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.gunner, g.nailgun, g.literallyamachinegun]),
              TYPE: "bullet"
            }
        },         {
            POSITION: [15, 3.5, 1, 0, 0, 0, 0.7],
              PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.gunner, g.nailgun, g.literallyamachinegun]),
              TYPE: "bullet"
            }
        },         {
            POSITION: [15, 3.5, 1, 0, 0, 0, 0.8],
              PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.gunner, g.nailgun, g.literallyamachinegun]),
              TYPE: "bullet"
            }
        },         {
            POSITION: [15, 3.5, 1, 0, 0, 0, 0.9],
              PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.gunner, g.nailgun, g.literallyamachinegun]),
              TYPE: "bullet"
            }
        }, 
    ]
}
Class.quiteliterallyAMachineGun = {
    PARENT: "genericTank",
    LABEL: "Quite Literally a Motherfucking Machine Gun",
	  UPGRADE_COLOR: "red",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.2
    },
    TURRETS: [
        {
            POSITION: [10, 14, 0, 0, 0, 1],
            TYPE: "qlamgSpinnerTurret"
        }, {
            POSITION: [5, 14, 0, 0, 0, 3],
            TYPE: "lamgSpinnerTurret"
        }, {
            POSITION: [10, 14, 0, 0, 0, 2],
            TYPE: "lamgSpinnerTurret"
        }
    ],
    GUNS: [
        {
            POSITION: [22, 8, 1, 0, 0, 0, 0]
        }, {
            POSITION: [2, 3.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.gunner, g.nailgun, g.literallyamachinegun, g.op]),
              TYPE: "bullet"
            }
        }
    ]
}
Class.goofysatellite = { 
    LABEL: "Satellite",
    TYPE: "bullet",
    ACCEPTS_SCORE: false,
    CONTROLLERS: ["orbit"],
    DANGER: 2,
    SHAPE: 0,
    LAYER: 13,
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.75,
        HEALTH: 0.3,
        DAMAGE: 3.375,
        SPEED: 10,
        RANGE: 10,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.5,
    },
    COLOR: 'nero',
    DRAW_HEALTH: true,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
    DIE_AT_RANGE: true,
}

Class.goofywhirlwind = {
    PARENT: "genericTank",
    LABEL: "Goofy Whirlwind",
    ANGLE: 60,
    CONTROLLERS: ["whirlwind"],
    HAS_NO_RECOIL: true,
    STAT_NAMES: statnames.whirlwind,
    TURRETS: [
        {
            POSITION: [8, 0, 0, 0, 360, 1],
            TYPE: "whirlwindDeco"
        }
    ],
    AI: {
        SPEED: 2, 
    }, 
    GUNS: (() => { 
        let output = []
        for (let i = 0; i < 5; i++) { 
            output.push({ 
                POSITION: {WIDTH: 8, LENGTH: 1, DELAY: i * 0.25},
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.satellite]), 
                    TYPE: ["goofysatellite", {ANGLE: i * 72}], 
                    MAX_CHILDREN: 4,   
                    AUTOFIRE: true,  
                    SYNCS_SKILLS: false,
                }
            }) 
        }
        return output
    })()
}

Class.pisseroo = {
    PARENT: ['basic'],
    LABEL: 'Winsor',
    UPGRADES_TIER_0: [],
    RESET_UPGRADE_MENU: true,
    ON: [
        {
            event: "fire",
            handler: ({ body, globalMasterStore: store, gun }) => {
                if (gun.identifier != 'pisserooGun') return
                store.pisseroo_i ??= 0;
                store.pisseroo_i++;
                store.pisseroo_i %= 4;
                body.define(Class.winsor0.UPGRADES_TIER_0[store.pisseroo_i]);
                setTimeout(() => body.define("pisseroo"), 3000);
            }
        }
    ],
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            IDENTIFIER: 'pisserooGun'
        }
    }]
}
Class.adsfoipuasdfiopu = {
    PARENT: "genericTank",
    LABEL: "Random tank i made in music class because i can",
    UPGRADE_TOOLTIP: "send this * to the penis explosion chamber and have his penis exploded immediately",
    GUNS: [{
        POSITION: [21, 10, 0, 0, 1, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.op]),
            TYPE: "bullet"
            }
        }
    ]
}
Class.adsfoipuasdfiopu.UPGRADE_COLOR = "animatednero",
Class.adsfoipuasdfiopu2 = {
    PARENT: "genericTank",
    LABEL: "Random tank i made on the bus because i can",
    UPGRADE_TOOLTIP: "send this non-* to the asshole explosion chamber and have his ashole exploded immediately",
    GUNS: [{
        POSITION: [21, 0, 0, 0, 1, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.op]),
            TYPE: "bullet"
            }
        }, {
        POSITION: [17, 0, 0, 0, 2, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.op]),
            TYPE: "bee",
            MAX_CHILDREN: 30,
          }
        }
    ]
}
Class.adsfoipuasdfiopu2.UPGRADE_COLOR = "animatednero",
//wait whats stuff
Class.placeableWall = {
    PARENT: "rock",
    LABEL: "Wall",
    SIZE: 30,
    SHAPE: 4,
    CLEAR_ON_MASTER_UPGRADE: false,
    TEAM: TEAM_ENEMIES,
    VARIES_IN_SIZE: false,
};
Class.placeableWallSmall = {
    PARENT: "rock",
    LABEL: "Wall",
    SIZE: 15,
    SHAPE: 4,
    CLEAR_ON_MASTER_UPGRADE: false,
    TEAM: TEAM_ENEMIES,
    VARIES_IN_SIZE: false,
};
Class.wallPlacerThing = {
    PARENT: "genericTank",
    SHAPE:0,
    MIRROR_MASTER_ANGLE: true,
    INTANGIBLE: true,
    DRAW_SELF: false,
    COLOR: 16,
    CLEAR_ON_MASTER_UPGRADE: false,
      BODY: {
        ACCELERATION: 0.1,
        SPEED: true,
        HEALTH: 340282366920938463463374607431768211455,
        RESIST: 1,
        SHIELD: 340282366920938463463374607431768211455,
        REGEN: 340282366920938463463374607431768211455,
        DAMAGE: false,
        PENETRATION: true,
        RANGE: true,
        FOV: true,
        SHOCK_ABSORB: 340282366920938463463374607431768211455,
        RECOIL_MULTIPLIER: false,
        DENSITY: 340282366920938463463374607431768211455,
        STEALTH: true,
        PUSHABILITY: false,
        HETERO: false,
    },
        MOTION_TYPE: "aimassist",
        GUNS: [
                 {
            POSITION: [0, 20, 1, 10, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([{reload:10, speed:0, maxSpeed:0, shudder:0.0001, spray:0.0001}]),
                TYPE: "placeableWall",
                COLOR: 16,
                LABEL: "",
                STAT_CALCULATOR: 0,
                WAIT_TO_CYCLE: false,
                AUTOFIRE: false,
                SYNCS_SKILLS: false,
                MAX_CHILDREN: 0,
                ALT_FIRE: false,
                NEGATIVE_RECOIL: false,
              DRAW_FILL:false,
              BORDERLESS:true,
            },
        },
    ],

};
Class.wallPlacer = {
    PARENT: "genericTank",
    LABEL: "Messin' Around",
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
            POSITION: [16, 20, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic,{reload:1/8}]),
                TYPE: "wallPlacerThing",
                COLOR: 16,
                LABEL: "",
                STAT_CALCULATOR: 0,
                WAIT_TO_CYCLE: false,
                AUTOFIRE: false,
                SYNCS_SKILLS: false,
                MAX_CHILDREN: 1,
                ALT_FIRE: false,
                NEGATIVE_RECOIL: false,
            },
        },
    ],
};
Class.legacysidewinder = {
    PARENT: "genericTank",
    LABEL: "Sidewinder",
    DANGER: 7,
    BODY: {
        SPEED: 0.8 * base.SPEED,
        FOV: 1.3 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [10, 11, -0.5, 14, 0, 0, 0],
        },
        {
            POSITION: [21, 12, -1.1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewinder]),
                TYPE: "oldsnake",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
    ],
}
Class.imagetest = {
    PARENT: "genericTank",
    UPGRADE_COLOR: "black",
    LABEL: "PapyrusButBlackHoleOfDeath.exe",
    SHAPE: 'https://cdn.glitch.global/5fc7dcb6-aada-495b-828e-66901a470a29/Papyrus.webp?v=1701450294185',
    DANGER: 7,
    GUNS: [
        {
            POSITION: [2, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                TYPE: "spaghetti"
            }
        }
    ],
    ON: [
       {
        event: "damage",
        handler: ({ body, damageInflictor, damageTool }) => {
            damageTool[0].kill()
        }
    },
       {
        event: "tick",
        handler: ({ body }) => {
          for (let instance of entities) {
                let diffX = instance.x - body.x,
                    diffY = instance.y - body.y,
                    dist2 = diffX ** 2 + diffY ** 2,
                    number1 = 1,
                    number2 = 1,
                    number3 = 1/7,
                    number4 = 1,
                    number5 = 1,
                    distance = 250,
                    forceMulti = (((((body.size / 12)*250) ** 2)** number1) * number2) / dist2;
                if (dist2 <= ((body.size / 12)*250) ** 2) {
                if (instance.id != body.id /*&& !instance.ac && instance.alpha*/) {
                    instance.velocity.x += util.clamp(body.x - instance.x, -90, 90) * instance.damp * ((number5 - (number5/((forceMulti ** number3)* number4)))+ 0.001);//0.05
                    instance.velocity.y += util.clamp(body.y - instance.y, -90, 90) * instance.damp * ((number5 - (number5/((forceMulti ** number3)* number4)))+ 0.001);//0.05
            }
        }
             if (dist2 < body.size ** 2 + instance.size ** 2) {
                if (instance.id != body.id) {
                    instance.isProtected = false;
                    instance.invuln = false;
                    instance.damageReceived = Infinity,
                    instance.kill(),
                    instance.destroy(),
                    instance.removeFromGrid(),
                    instance.isGhost = true;
            }
        }
        }
        }
    },
     ],
}
Class.papyrus = {
    PARENT: "genericTank",
    LABEL: "Papyrus",
    UPGRADE_COLOR: 23,
    SHAPE: 'https://cdn.glitch.global/5fc7dcb6-aada-495b-828e-66901a470a29/Papyrus.webp?v=1701450294185',
    DANGER: 7,
    GUNS: [
        {
            POSITION: [2, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                TYPE: "spaghetti"
            }
        }
    ]
}
Class.oppenheimer = {
    PARENT: "genericTank",
    LABEL: "Oppen Heimer",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [19, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                TYPE: "nuke"
            }
        },
        {
            POSITION: [5.5, 8, -1.8, 6.5, 0, 0, 0]
        }
    ]
}
Class.homingdevbullet = {
    PARENT: "bullet",
    TYPE: "swarm",
    SHAPE: [[-1, -1], [1, -1], [2, 0], [1, 1], [-1, 1]],
    ACCEPTS_SCORE: false,
    MOTION_TYPE: "swarm",
    CONTROLLERS: ["nearestDifferentMaster", "mapTargetToGoal"],
    BUFF_VS_FOOD: true,
    AI: {
        FARMER: true
    },
    INDEPENDENT: true
}
Class.homingdev = {
      PARENT: "developer",
      LABEL: "Homing Developer",
      GUNS: [
        {
            POSITION: [18, 10, -1.4, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                TYPE: "homingdevbullet"
            }
        }
    ]
}
Class.brella = {
    PARENT: "genericTank",
    LABEL: "Nero-Brella",
    DANGER: 7,
    SYNC_TURRET_SKILLS: true,
    GUNS: [{
        POSITION: [20, 8, 1, 0, 0, 0, 0.2],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [1, 10, 0, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.brella]),
            TYPE: "brellaShield",
            ALT_FIRE: true,
            MAX_CHILDREN: 1,
            //ALPHA: 1
        }
    }]
};
Class.winsor0 = {
    PARENT: "genericTank",
    LABEL: "Wi3nsor",
    SHAPE: 'https://cdn.glitch.global/5fc7dcb6-aada-495b-828e-66901a470a29/Papyrus.webp?v=1701450294185',
    DANGER: 7,
    GUNS: [
        {
            POSITION: [2, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                TYPE: "bullet"
            }
        }
    ]
}

Class.winsor1 = {
    PARENT: "genericTank",
    LABEL: "Winsor has no Friends 🧐",
    SIZE: 30,
    SHAPE: 'https://cdn.glitch.global/5fc7dcb6-aada-495b-828e-66901a470a29/IMG_20231204_144411762_LAYER.jpg?v=1701714034323',
    DANGER: 7,
    GUNS: [
        {
            POSITION: [2, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.winsor2 = {
    PARENT: "genericTank",
    LABEL: "Winsor has no Brain 🧐🧐",
    SIZE: 30,
    SHAPE: 'https://cdn.glitch.global/5fc7dcb6-aada-495b-828e-66901a470a29/IMG_20231204_144409218_LAYER.jpg?v=1701714037274',
    DANGER: 7,
    GUNS: [
        {
            POSITION: [2, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.winsor3 = {
    PARENT: "genericTank",
    LABEL: "Winsor has no Muscle 🧐🧐🧐",
    SIZE: 30,
    SHAPE: 'https://cdn.glitch.global/5fc7dcb6-aada-495b-828e-66901a470a29/IMG_20231204_144406913_LAYER.jpg?v=1701714040278',
    DANGER: 7,
    GUNS: [
        {
            POSITION: [2, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.winsor4 = {
    PARENT: "genericTank",
    LABEL: "And Winsor certainly, has no Bitches 🧐🧐🧐🧐",
    SIZE: 30,
    SHAPE: 'https://cdn.glitch.global/5fc7dcb6-aada-495b-828e-66901a470a29/IMG_20231204_144358408_LAYER.jpg?v=1701714043765',
    DANGER: 7,
    GUNS: [
        {
            POSITION: [2, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                TYPE: "bullet"
            }
        }
    ]
}

Class.utilities = {
    PARENT: "genericTank",
    LABEL: "Utilities",
    SHAPE: 'https://cdn.glitch.global/5fc7dcb6-aada-495b-828e-66901a470a29/Gear-icon-transparent-background.png?v=1705579178381'
};
Class.AIT = menu("AIT")

Class.developer.UPGRADES_TIER_0 = ["basic", "tanks", "AIT", "utilities", "addons"]
    Class.tanks.UPGRADES_TIER_0 = ["developer", "overpowered", "testing", "unavailable", "features"]
        Class.AIT.UPGRADES_TIER_0 = ["developer", "bosses", "dominators", "sanctuaries", "mothership", "baseProtector", "antiTankMachineGun", "arenaCloser"]
        Class.utilities.UPGRADES_TIER_0 = ["developer", "levels", "teams", "eggGenerator", "spectator", "wallPlacer"]
        Class.unavailable.UPGRADES_TIER_0 = ["developer", "healer", "flail", "doubleFlail", "winsor0", "legacysidewinder"]
            //Class.flail.UPGRADES_TIER_2 = ["doubleFlail"]
                Class.doubleFlail.UPGRADES_TIER_3 = ["tripleFlail"]
        Class.testing.UPGRADES_TIER_0 = ["tanks", "vanquisher", "mummifier", "tracker3", ["grappletest", "basic"], "brella"]
        Class.dominators.UPGRADES_TIER_0 = ["AIT", "destroyerDominator", "gunnerDominator", "trapperDominator"]
        Class.sanctuaries.UPGRADES_TIER_0 = ["AIT", "sanctuaryTier1", "sanctuaryTier2", "sanctuaryTier3", "sanctuaryTier4", "sanctuaryTier5", "sanctuaryTier6"]

    Class.bosses.UPGRADES_TIER_0 = ["AIT", "sentries", "elites", "mysticals", "nesters", "rogues", "rammers", "terrestrials", "celestials", "eternals", "devBosses"]
        Class.sentries.UPGRADES_TIER_0 = ["bosses", "sentrySwarm", "sentryGun", "sentryTrap", "shinySentrySwarm", "shinySentryGun", "shinySentryTrap", "sentinelMinigun", "sentinelLauncher", "sentinelCrossbow"]
        Class.elites.UPGRADES_TIER_0 = ["bosses", "eliteDestroyer", "eliteGunner", "eliteSprayer", "eliteBattleship", "eliteSpawner", "eliteTrapGuard", "eliteSpinner", "eliteSkimmer", "legionaryCrasher", "guardian", "defender", "sprayerLegion"]
        Class.mysticals.UPGRADES_TIER_0 = ["bosses", "sorcerer", "summoner", "enchantress", "exorcistor", "shaman"]
        Class.nesters.UPGRADES_TIER_0 = ["bosses", "nestKeeper", "nestWarden", "nestGuardian"]
        Class.rogues.UPGRADES_TIER_0 = ["bosses", "roguePalisade", "rogueArmada", "julius", "genghis", "napoleon"]
	      Class.rammers.UPGRADES_TIER_0 = ["bosses", "bob", "nemesis"]
        Class.terrestrials.UPGRADES_TIER_0 = ["bosses", "ares", "gersemi", "ezekiel", "eris", "selene"]
        Class.celestials.UPGRADES_TIER_0 = ["bosses", "paladin", "freyja", "zaphkiel", "nyx", "theia", "atlas", "rhea", "julius", "genghis", "napoleon"]
        Class.eternals.UPGRADES_TIER_0 = ["bosses", "odin", "kronos"]
        Class.devBosses.UPGRADES_TIER_0 = ["taureonBoss", "zephiBoss", "dogeiscutBoss", "trplnrBoss", "frostBoss", "toothlessBoss"]

        Class.features.UPGRADES_TIER_0 = ["tanks", "diamondShape", "rotatedTrap", "colorMan", "miscTest", "mmaTest", "vulnturrettest", "onTest", "alphaGunTest", "strokeWidthTest", "testLayeredBoss", "tooltipTank", "turretLayerTesting", "bulletSpawnTest", "propTest", "auraBasic", "auraHealer", "weirdAutoBasic", "ghoster", "switcheroo", ["developer", "developer"]]
        Class.overpowered.UPGRADES_TIER_0 = ["tanks", "goofytanks", "armyOfOne", "godbasic", "maximumOverdrive", "oppenheimer", "homingdev", ["maxStatTank", "basic"], "quiteliterallyAMachineGun", "speedoflight"]
        Class.goofytanks.UPGRADES_TIER_0 = ["overpowered", "pisseroo", "papyrus", "Trapper_guy", "watertank", "piszerbeam", "baseThrowerDelta", "pouner", "adsfoipuasdfiopu", "goofywhirlwind"]

        //the "winsor" tank needs this to function, it worked before the "ON" thing was added
              Class.winsor0.UPGRADES_TIER_0 = ["winsor1", "winsor2", "winsor3", "winsor4"]
              Class.papyrus.UPGRADES_TIER_0 = ["imagetest"]
              Class.adsfoipuasdfiopu.UPGRADES_TIER_0 = ["adsfoipuasdfiopu2"]