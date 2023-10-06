const { combineStats, makeAuto, makeHybrid, makeDeco, makeOver, dereference, makeOversplit, makeGuard } = require('../facilitators.js');
const { base, statnames, gunCalcNames, smshskl } = require('../constants.js');
const g = require('../gunvals.js');

const h = {
    honcho: { size: 1.4, health: 1.5, speed: 1.25 },
}

// extra facilitators!
const makeRotated = (type, name, sides = 3, delayInc = 0) => {
    const unitAngle = 360/sides;
    let newGuns = [];
    let newDef = {};
    newDef = dereference(type);
    newDef.LABEL = name;
    for (let i = 1; i < sides; i++) {
        newDef.GUNS.forEach((gun) => {
            newGuns.push(
                (Array.isArray(gun.POSITION) ? {
                    ...gun,
                    POSITION: [
                        gun.POSITION[0],
                        gun.POSITION[1],
                        gun.POSITION[2],
                        gun.POSITION[3],
                        gun.POSITION[4],
                        gun.POSITION[5]+(i*unitAngle),
                        (gun.POSITION[6]+(i*delayInc))%1
                    ],
                } : {
                    ...gun,
                    POSITION: {
                        ...gun.POSITION,
                        ANGLE:gun.ANGLE+(i*unitAngle),
                        DELAY: (gun.DELAY+(i*delayInc))%1,
                    }
                })
            );
        });
    }
    newGuns.forEach((gun) => {
        newDef.GUNS.push(gun);
    });
    newDef.HAS_NO_RECOIL = true;
    newDef.DANGER = type.DANGER + sides;
    return newDef;
};
const makeSpawnbrid = (type, name = -1) => {
    let output = dereference(type);
    let spawners = [
        {
            /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [4.5, 10, 1, 10.5, 0, 180, 0],
        },
        {
            POSITION: [1, 12, 1, 15, 0, 180, 0],
            PROPERTIES: {
                MAX_CHILDREN: 3,
                SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                TYPE: "minion",
                STAT_CALCULATOR: gunCalcNames.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [11.5, 12, 1, 0, 0, 180, 0],
        },
    ];
    output.GUNS = type.GUNS == null ? spawners : type.GUNS.concat(spawners);
    output.LABEL = name == -1 ? "Spawnbrid " + type.LABEL : name;
    return output;
};
const makeDriveOver = (type, name = -1) => {
    let output = dereference(type);
    let deco = {
        POSITION: [9, 0, 0, 0, 360, 1],
        TYPE: "overdriveDeco",
    };
    output.TURRETS = type.TURRETS == null ? [deco] : type.TURRETS.concat([deco]);
    if (type.GUNS != null) {
        type.GUNS.forEach(gun => {
            if (gun.PROPERTIES) {
                if (Array.isArray(gun.PROPERTIES.TYPE)) {
                    if (gun.PROPERTIES.TYPE[0] == "drone") {
                        gun.PROPERTIES.TYPE[0] = "turretedDrone";
                    }
                } else if (typeof gun.PROPERTIES.TYPE == "string") {
                    if (gun.PROPERTIES.TYPE == "drone") {
                        gun.PROPERTIES.TYPE = "turretedDrone";
                    }
                }
            }
        });
    }
    output.LABEL = name == -1 ? type.LABEL + "drive" : name;
    return output;
};
const makeDriveSwarm = (type, name = -1) => {
    let output = dereference(type);
    let deco = {
        POSITION: [9, 0, 0, 0, 360, 1],
        TYPE: "triangleDeco",
    };
    output.TURRETS = type.TURRETS == null ? [deco] : type.TURRETS.concat([deco]);
    if (type.GUNS != null) {
        type.GUNS.forEach(gun => {
            if (gun.PROPERTIES) {
                if (Array.isArray(gun.PROPERTIES.TYPE)) {
                    if (gun.PROPERTIES.TYPE[0] == "swarm") {
                        gun.PROPERTIES.TYPE[0] = "turretedSwarm";
                    } else if (gun.PROPERTIES.TYPE[0] == "autoswarm") {
                        gun.PROPERTIES.TYPE[0] = "turretedAutoswarm";
                    }
                } else if (typeof gun.PROPERTIES.TYPE == "string") {
                    if (gun.PROPERTIES.TYPE == "swarm") {
                        gun.PROPERTIES.TYPE = "turretedSwarm";
                    } else if (gun.PROPERTIES.TYPE == "autoswarm") {
                        gun.PROPERTIES.TYPE = "turretedAutoswarm";
                    }
                }
            }
        });
    }
    output.LABEL = name == -1 ? type.LABEL + "drive" : name;
    return output;
};
const makeBigbrid = (type, name = -1) => {
    let output = dereference(type);
    let spawner = {
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [13, 14, 1.4, 0, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, h.honcho]),
            TYPE: "drone",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            MAX_CHILDREN: 1,
        },
    };
    output.GUNS = type.GUNS == null ? [spawner] : type.GUNS.concat([spawner]);
    output.LABEL = name == -1 ? "Hybrid " + type.LABEL : name;
    return output;
};
const makeFast = (type, mult = 1.3, name = -1) => {// intended for drones
    let output = dereference(type);
    if (output.BODY.SPEED) output.BODY.SPEED = base.SPEED;
    output.BODY.SPEED *= mult;
    output.LABEL = name == -1 ? "Speedy" + output.LABEL : name;
    return output;
}
const merge = (type1, type2, name = -1, option = "guns&turrets") => {
    let output = dereference(type1);
    if (!output.GUNS) output.GUNS = [];
    if (!output.TURRETS) output.TURRETS = [];
    let g = (!type2.GUNS) ? [] : type2.GUNS;
    let t = (!type2.TURRETS) ? [] : type2.TURRETS;
    switch (option) {
        case "guns":
            output.GUNS = output.GUNS.concat(g);
            break;
        case "turrets":
            output.TURRETS = output.TURRETS.concat(t);
            break;
        case "guns&turrets":
            output.GUNS = output.GUNS.concat(g);
            output.TURRETS = output.TURRETS.concat(t);
            //console.log(output.GUNS);
            break;
    };
    output.LABEL = name == -1 ? type1.LABEL + " - " + type2.LABEL : name;
    return output;
};
const reflect = (type, name = -1) => {
    let output = dereference(type);
    if (!output.GUNS) output.GUNS = [];
    output.GUNS.forEach((g) => {
        output.GUNS.push({...g, POSITION: [g.POSITION[0], g.POSITION[1], g.POSITION[2], g.POSITION[3], -g.POSITION[4], -g.POSITION[5], g.POSITION[6] + 0.5]});
    });
    output.LABEL = name == -1 ? "Reflected " + type.LABEL : name;
    return output;
};

module.exports = ({ Class }) => {
    Class.doubleDual = makeRotated(Class.dual, "Double Dual", 2);
    Class.doubleMusket = makeRotated(Class.musket, "Double Musket", 2);
    Class.overDoubleTwin = makeOversplit({
        PARENT: ["genericTank"],
        LABEL: "Overdouble Twin",
        DANGER: 7,
        GUNS: [
            {
                POSITION: [20, 8, 1, 0, 5.5, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, 5.5, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                    TYPE: "bullet",
                },
            },
        ],
    });
    Class.overDoubleTwin.GUNS[4].PROPERTIES.MAX_CHILDREN = 2;// max drones 6 => 5
    Class.splitShot = {
        PARENT: ["genericTank"],
        LABEL: "Split Shot",
        DANGER: 6,
        BODY: {
            SPEED: base.SPEED * 0.9,
        },
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [19, 8, 1, 0, -2, -17.5, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.morereload]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [19, 8, 1, 0, 2, 17.5, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.morereload]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 3.5, 1, 0, 0, -15, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 3.5, 1, 0, 0, 15, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [22, 8, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.morereload]),
                    TYPE: "bullet",
                },
            },
        ],
    };
    Class.wark = {
        PARENT: ["genericTank"],
        LABEL: "Wark",
        STAT_NAMES: statnames.generic,
        DANGER: 7,
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, 5.5, 5, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, 5.5, 5, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, -5.5, -5, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, -5.5, -5, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.waark = {
        PARENT: ["genericTank"],
        LABEL: "Waark",
        STAT_NAMES: statnames.generic,
        DANGER: 7,
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, 5.5, 5, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, 5.5, 5, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, -5.5, -5, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, -5.5, -5, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [15, 8, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [3, 9, 1.5, 15, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.doubleGunner = makeRotated(Class.gunner, "Double Gunner", 2);
    Class.doubleFlankTwin = {
        PARENT: ["genericTank"],
        LABEL: "Double Flank Twin",
        DANGER: 6,
        GUNS: [
            {
                POSITION: [20, 8, 1, 0, 5.5, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, 5.5, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, 0, 90, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, 0, -90, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                    TYPE: "bullet",
                },
            },
        ],
    };

    // NEW lvl 45 (1)
    Class.warkWark = makeRotated(Class.wark, "Warkwark", 2);

    // triple twin upgrades
    Class.quadTwin = makeRotated(Class.twin, "Quad Twin", 4);

    Class.autoTripleTwin = makeAuto(Class.tripleTwin);

    Class.bentTriple = makeRotated(Class.tripleShot, "Bent Triple", 3);

    Class.hewnTriple = {
        PARENT: ["genericTank"],
        LABEL: "Hewn Triple",
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [19, 8, 1, 0, 5.5, 25, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.twin,
                        g.twin,
                        g.double,
                        g.hewn,
                        g.morerecoil,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [19, 8, 1, 0, -5.5, -25, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.twin,
                        g.twin,
                        g.double,
                        g.hewn,
                        g.morerecoil,
                    ]),
                    TYPE: "bullet",
                },
            },
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
            {
                POSITION: [20, 8, 1, 0, 5.5, 120, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, -5.5, 120, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, 5.5, 240, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, -5.5, 240, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                    TYPE: "bullet",
                },
            },
        ],
    };

    Class.tripleFlankTwin = makeRotated({
        PARENT: ["genericTank"],
        GUNS: [
            {
                POSITION: [18, 8, 1, 0, 0, 60, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: "bullet",
                },
            },
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
    }, "Triple Flank Twin", 3);

    Class.tripleGunner = makeRotated(Class.gunner, "Triple Gunner", 3);
    Class.tripleGunner.UPGRADES_TIER_3 = [];

    Class.warkWarkWark = makeRotated({
        PARENT: ["genericTank"],
        STAT_NAMES: statnames.generic,
        DANGER: 7,
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, 5.5, 10, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, 5.5, 10, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, -5.5, 0, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, -5.5, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    }, "Wark Wark Wark", 3);
    // HEWN DOUBLE UPGRADES
    // hewn triple

    Class.autoHewnDouble = makeAuto(Class.hewnDouble);

    Class.cleft = makeRotated({
        PARENT: ["genericTank"],
        DANGER: 7,
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [19, 8, 1, 0, 5.5, 205, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.twin,
                        g.twin,
                        g.double,
                        g.hewn,
                        g.morerecoil,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [19, 8, 1, 0, -5.5, -205, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.twin,
                        g.twin,
                        g.double,
                        g.hewn,
                        g.morerecoil,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, 5.5, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.twin,
                        g.double,
                        g.hewn,
                        g.morerecoil,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.twin,
                        g.double,
                        g.hewn,
                        g.morerecoil,
                    ]),
                    TYPE: "bullet",
                },
            },
        ],
    }, "Cleft", 2);

    Class.skewnDouble = {
        PARENT: ["genericTank"],
        LABEL: "Skewn Double",
        DANGER: 7,
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [17, 8, 1, 0, 5.5, 225, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.twin,
                        g.twin,
                        g.double,
                        g.hewn,
                        g.morerecoil,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [17, 8, 1, 0, -5.5, -225, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.twin,
                        g.twin,
                        g.double,
                        g.hewn,
                        g.morerecoil,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [19, 8, 1, 0, 5.5, 205, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.twin,
                        g.twin,
                        g.double,
                        g.hewn,
                        g.morerecoil,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [19, 8, 1, 0, -5.5, -205, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.twin,
                        g.twin,
                        g.double,
                        g.hewn,
                        g.morerecoil,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, 5.5, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.twin,
                        g.double,
                        g.hewn,
                        g.morerecoil,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.twin,
                        g.double,
                        g.hewn,
                        g.morerecoil,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, 5.5, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                    TYPE: "bullet",
                },
            },
        ],
    };

    Class.hewnFlankDouble = {
        PARENT: ["genericTank"],
        LABEL: "Hewn Flank Double",
        DANGER: 7,
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [19, 8, 1, 0, 5.5, 205, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.twin,
                        g.twin,
                        g.double,
                        g.hewn,
                        g.morerecoil,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [19, 8, 1, 0, -5.5, -205, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.twin,
                        g.twin,
                        g.double,
                        g.hewn,
                        g.morerecoil,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, 5.5, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.twin,
                        g.double,
                        g.hewn,
                        g.morerecoil,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.twin,
                        g.double,
                        g.hewn,
                        g.morerecoil,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, 5.5, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, 0, 90, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, 0, -90, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                    TYPE: "bullet",
                },
            },
        ],
    };

    Class.hewnGunner = {
        PARENT: ["genericTank"],
        LABEL: "Hewn Gunner",
        DANGER: 8,
        GUNS: [
            {
                POSITION: [12, 3.5, 1, 0, 7.25, 210, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [15, 3.5, 1, 0, 3.75, 210, 0.75],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [12, 3.5, 1, 0, -7.25, -210, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [15, 3.5, 1, 0, -3.75, -210, 0.75],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [12, 3.5, 1, 0, 7.25, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [12, 3.5, 1, 0, -7.25, 0, 0.75],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [16, 3.5, 1, 0, 3.75, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [16, 3.5, 1, 0, -3.75, 0, 0.25],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [12, 3.5, 1, 0, 7.25, 180, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [12, 3.5, 1, 0, -7.25, 180, 0.75],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [16, 3.5, 1, 0, 3.75, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [16, 3.5, 1, 0, -3.75, 180, 0.25],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
        ],
    };

    Class.warkwawarkrk = {
        PARENT: ["genericTank"],
        STAT_NAMES: statnames.generic,
        LABEL: "Warkwawarkrk",
        DANGER: 8,
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, -2, 150, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, -2, 150, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, 2, 210, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, 2, 210, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, 5.5, 5, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, 5.5, 5, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, -5.5, -5, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, -5.5, -5, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, 5.5, 185, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, 5.5, 185, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, -5.5, 175, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, -5.5, 175, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.megaAutoTurret = {
        PARENT: ["genericTank"],
        LABEL: "Mega Turret",
        BODY: {
            FOV: 0.8,
        },
        COLOR: 16,
        GUNS: [
            {
                POSITION: [22, 15, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.pound]),
                    TYPE: "bullet",
                },
            },
        ],
    };
    // auto double upgrades
    Class.megaAutoDouble = makeAuto(Class.doubleTwin, "Mega Auto-Double Twin", { type: "megaAutoTurret", independent: true });
    Class.megaAutoDouble.UPGRADES_TIER_3 = []; // fix for cloning upgrades, which are alread defined when this loads

    Class.tripleAutoDoubleTwin = {
        PARENT: ["genericTank"],
        LABEL: "Triple Auto-Double Twin",
        DANGER: 6,
        GUNS: [
            {
                POSITION: [20, 8, 1, 0, 5.5, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, 5.5, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                    TYPE: "bullet",
                },
            },
        ],
        TURRETS: [
            // triple auto
            {
                TYPE: "autoTurret",
                independent: true,
                POSITION: [10, 6.25, 0, 0, 120, 1],
            },
            {
                TYPE: "autoTurret",
                independent: true,
                POSITION: [10, 6.25, 0, 120, 120, 1],
            },
            {
                TYPE: "autoTurret",
                independent: true,
                POSITION: [10, 6.25, 0, 240, 120, 1],
            }
        ],
    };

    Class.autoTripleTwin = makeAuto(Class.tripleTwin);

    Class.autoHewnDouble = makeAuto(Class.hewnDouble);

    Class.autoBentDouble = makeAuto(Class.bentDouble);

    Class.autoDoubleFlankTwin = makeAuto(Class.doubleFlankTwin);

    Class.autoDoubleGunner = makeAuto(Class.doubleGunner);

    Class.autoWarkWark = makeAuto(Class.warkWark);

    // bent double upgrades
    //bent triple
    Class.pentaDouble = makeRotated(Class.pentaShot, "Penta Double", 2);
    // auto bent double
    Class.doubleTriplet = makeRotated(Class.triplet, "Double Triplet", 2);
    //cleft
    Class.doubleSpreadshot = makeRotated({
        PARENT: ["genericTank"],
        LABEL: "Spreadshot",
        DANGER: 7,
        GUNS: [
            {
                POSITION: [14.5, 4, 1, 0, -0.5, -60, 4 / 6],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.gunner,
                        g.arty,
                        g.twin,
                        g.spread,
                    ]),
                    TYPE: "bullet",
                    LABEL: "Spread",
                },
            },
            {
                POSITION: [14.5, 4, 1, 0, 0.5, 60, 4 / 6],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.gunner,
                        g.arty,
                        g.twin,
                        g.spread,
                    ]),
                    TYPE: "bullet",
                    LABEL: "Spread",
                },
            },
            {
                POSITION: [16, 4, 1, 0, -0.5, -45, 3 / 6],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.gunner,
                        g.arty,
                        g.twin,
                        g.spread,
                    ]),
                    TYPE: "bullet",
                    LABEL: "Spread",
                },
            },
            {
                POSITION: [16, 4, 1, 0, 0.5, 45, 3 / 6],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.gunner,
                        g.arty,
                        g.twin,
                        g.spread,
                    ]),
                    TYPE: "bullet",
                    LABEL: "Spread",
                },
            },
            {
                POSITION: [17.5, 4, 1, 0, -0.5, -30, 2 / 6],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.gunner,
                        g.arty,
                        g.twin,
                        g.spread,
                    ]),
                    TYPE: "bullet",
                    LABEL: "Spread",
                },
            },
            {
                POSITION: [17.5, 4, 1, 0, 0.5, 30, 2 / 6],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.gunner,
                        g.arty,
                        g.twin,
                        g.spread,
                    ]),
                    TYPE: "bullet",
                    LABEL: "Spread",
                },
            },
            {
                POSITION: [19, 4, 1, 0, -1, -15, 1 / 6],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.gunner,
                        g.arty,
                        g.twin,
                        g.spread,
                    ]),
                    TYPE: "bullet",
                    LABEL: "Spread",
                },
            },
            {
                POSITION: [19, 4, 1, 0, 1, 15, 1 / 6],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.gunner,
                        g.arty,
                        g.twin,
                        g.spread,
                    ]),
                    TYPE: "bullet",
                    LABEL: "Spread",
                },
            },
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [12, 8, 1, 8, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.pound,
                        g.spreadmain,
                        g.spread,
                    ]),
                    TYPE: "bullet",
                },
            },
        ],
    }, "Double Spreadshot", 2);
    Class.bentFlankDouble = makeRotated({
        PARENT: ["genericTank"],
        DANGER: 6,
        BODY: {
            SPEED: base.SPEED * 0.9,
        },
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [19, 8, 1, 0, -2, -17.5, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [19, 8, 1, 0, 2, 17.5, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [22, 8, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [19, 8, 1, 0, 0, 90, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                    TYPE: "bullet",
                },
            },
        ],
    }, "Bent Flank Double", 2);
    Class.bentDoubleGunner = makeRotated({
        PARENT: ["genericTank"],
        DANGER: 6,
        BODY: {
            SPEED: base.SPEED * 0.9,
        },
        GUNS: [{
            POSITION: [12, 3.5, 1, 0, 7.25, 210, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15, 3.5, 1, 0, 3.75, 210, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 3.5, 1, 0, -7.25, -210, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15, 3.5, 1, 0, -3.75, -210, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 3.5, 1, 0, 3.75, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 3.5, 1, 0, -3.75, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                TYPE: "bullet",
            },
        }]
    }, "Bent Double Gunner", 2);
    Class.bentMinigun = {
        PARENT: ["genericTank"],
        LABEL: "Bent Minigun",
        DANGER: 6,
        BODY: {
            FOV: 1.2,
        },
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [16, 8, 1, 0, 0, 17.5, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [14, 8, 1, 0, 0, 17.5, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                    TYPE: "bullet",
                },
            },
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [16, 8, 1, 0, 0, -17.5, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [14, 8, 1, 0, 0, -17.5, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                    TYPE: "bullet",
                },
            },
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [21, 8, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [19, 8, 1, 0, 0, 0, 1 / 3],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [17, 8, 1, 0, 0, 0, 2 / 3],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                    TYPE: "bullet",
                },
            },
        ],
    };
    Class.bentDoubleMinigun = makeRotated(Class.bentMinigun, "Bent Double Minigun", 2);
    Class.splitDouble = makeRotated(Class.splitShot, "Split Double", 2);
    Class.waarkWaark = makeRotated(Class.waark, "Waarkwaark", 2);

    Class.doubleFlankGunner = {
        PARENT: ["genericTank"],
        LABEL: "Gunner",
        DANGER: 6,
        GUNS: [
            {
                POSITION: [12, 3.5, 1, 0, 7.25, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [12, 3.5, 1, 0, -7.25, 0, 0.75],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [16, 3.5, 1, 0, 3.75, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [16, 3.5, 1, 0, -3.75, 0, 0.25],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [12, 3.5, 1, 0, 7.25, 180, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [12, 3.5, 1, 0, -7.25, 180, 0.75],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [16, 3.5, 1, 0, 3.75, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [16, 3.5, 1, 0, -3.75, 180, 0.25],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [19, 2, 1, 0, -2.5, -90, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.gunner,
                        g.power,
                        g.twin,
                        g.slow,
                        g.flank,
                        g.lotsmorrecoil,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [19, 2, 1, 0, 2.5, -90, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.gunner,
                        g.power,
                        g.twin,
                        g.slow,
                        g.flank,
                        g.lotsmorrecoil,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [12, 11, 1, 0, 0, -90, 0],
            },
            {
                POSITION: [19, 2, 1, 0, -2.5, 90, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.gunner,
                        g.power,
                        g.twin,
                        g.slow,
                        g.flank,
                        g.lotsmorrecoil,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [19, 2, 1, 0, 2.5, 90, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.gunner,
                        g.power,
                        g.twin,
                        g.slow,
                        g.flank,
                        g.lotsmorrecoil,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [12, 11, 1, 0, 0, 90, 0],
            },
        ],
    };

    Class.hipwatch = {
        PARENT: ["genericTank"],
        LABEL: "Hipwatch",
        DANGER: 6,
        GUNS: [
            {
                POSITION: [20, 8, 1, 0, 5.5, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, 5.5, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                    TYPE: "bullet",
                },
            },
        ],
        TURRETS: [
            {
                POSITION: [11, 8, 0, 90, 190, 0],
                TYPE: "autoTankGun",
            },
            {
                POSITION: [11, 8, 0, -90, 190, 0],
                TYPE: "autoTankGun",
            },
        ]
    };

    Class.scuffler = {
        PARENT: ["genericTank"],
        LABEL: "Scuffler",
        DANGER: 6,
        GUNS: [
            {
                POSITION: [20, 8, 1, 0, 5.5, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, 5.5, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                    TYPE: "bullet",
                },
            },
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [16, 12, 1, 0, 0, -90, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                    TYPE: "bullet",
                },
            },
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [16, 12, 1, 0, 0, 90, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                    TYPE: "bullet",
                },
            },
        ],
    };

    Class.warkWaWaWark = {
        PARENT: ["genericTank"],
        LABEL: "Warkwawawark",
        STAT_NAMES: statnames.generic,
        DANGER: 7,
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, 5.5, 5, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, 5.5, 5, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, -5.5, -5, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, -5.5, -5, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, 5.5, 185, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, 5.5, 185, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, -5.5, 175, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, -5.5, 175, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [9, 8, 1, 0, 5.5, 90, 0],
            },
            {
                POSITION: [3, 9, 1.5, 9, 5.5, 90, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [9, 8, 1, 0, -5.5, -90, 0],
            },
            {
                POSITION: [3, 9, 1.5, 9, -5.5, -90, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.doubleNailgun = makeRotated(Class.nailgun, "Double Nailgun", 2);
    Class.doubleMachineGunner = makeRotated(Class.machineGunner, "Double Machine Gunner", 2);
    Class.overDoubleGunner = makeOversplit(makeRotated(Class.weirdGunner, "Double Gunner", 2));
    Class.battery = {
        PARENT: ["genericTank"],
        LABEL: "Gunner",
        DANGER: 6,
        GUNS: [
            {
                POSITION: [12, 3.5, 1, 0, 8, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [12, 3.5, 1, 0, -8, 0, 0.25],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [16, 3.5, 1, 0, 4, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [16, 3.5, 1, 0, -4, 0, 0.75],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 3.5, 1, 0, 0, 0, 0.75],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
        ],
    };
    Class.doubleBattery = makeRotated(Class.battery, "Double Battery", 2);
    Class.rimfire = {
        // For use with -gunner combos only.
        PARENT: ["genericTank"],
        LABEL: "Rimfire",
        DANGER: 6,
        GUNS: [
            {
                POSITION: [19, 2, 1, 0, -2.5, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.gunner,
                        g.power,
                        g.twin,
                        g.slow,
                        g.flank,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [19, 2, 1, 0, 2.5, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.gunner,
                        g.power,
                        g.twin,
                        g.slow,
                        g.flank,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [12, 11, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [12, 3.5, 1, 0, 7.25, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [12, 3.5, 1, 0, -7.25, 0, 0.75],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
        ],
    };
    Class.doubleRimfire = makeRotated(Class.rimfire, "Double Rimfire", 2);
    Class.volley = {
        PARENT: ["genericTank"],
        LABEL: "Volley",
        DANGER: 6,
        GUNS: [
            {
                POSITION: [12, 4.5, 1, 0, 7.25, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.pound, g.doublereload, g.triple]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [12, 4.5, 1, 0, -7.25, 0, 0.75],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.pound, g.doublereload, g.triple]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [16, 4.5, 1, 0, 3.75, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.pound, g.doublereload, g.triple]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [16, 4.5, 1, 0, -3.75, 0, 0.25],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.pound, g.doublereload, g.triple]),
                    TYPE: "bullet",
                },
            },
        ],
    };
    Class.doubleVolley = makeRotated(Class.volley, "Double Volley", 2);
    Class.equalizer = {
        PARENT: ["genericTank"],
        LABEL: "Equalizer",
        DANGER: 6,
        GUNS: [
            {
                POSITION: [12, 3.5, 1, 0, 7.25, 0, 0],
            },
            {
                POSITION: [2.5, 3.5, 1.5, 12, 7.25, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.puregunner, g.morereload, g.one_third_reload, g.micro]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [12, 3.5, 1, 0, -7.25, 0, 0],
            },
            {
                POSITION: [2.5, 3.5, 1.5, 12, -7.25, 0, 0.75],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.puregunner, g.morereload, g.one_third_reload, g.micro]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [16, 3.5, 1, 0, 3.75, 0, 0],
            },
            {
                POSITION: [2.5, 3.5, 1.5, 16, 3.75, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.puregunner, g.morereload, g.one_third_reload, g.micro]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [16, 3.5, 1, 0, -3.75, 0, 0],
            },
            {
                POSITION: [2.5, 3.5, 1.5, 16, -3.75, 0, 0.25],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.puregunner, g.morereload, g.one_third_reload, g.micro]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.doubleEqualizer = makeRotated(Class.equalizer, "Double Equalizer", 2);

    Class.warkwawaWark = {
        PARENT: ["genericTank"],
        LABEL: "WarkwawaWark",
        STAT_NAMES: statnames.generic,
        DANGER: 7,
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, 5.5, 5, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, 5.5, 5, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, -5.5, -5, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, -5.5, -5, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, 5.5, 185, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, 5.5, 185, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, -5.5, 175, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, -5.5, 175, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, 5.5, 90, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, 5.5, 90, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, -5.5, -90, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, -5.5, -90, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.pen = {
        PARENT: ["genericTank"],
        LABEL: "Pen",
        BODY: {
            FOV: 1.2 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [18, 7.5, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [12, 7, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [3, 7, 1.7, 12, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.hutch = {
        PARENT: ["genericTank"],
        LABEL: "Hutch",
        BODY: {
            FOV: 1.1 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [18, 7.5, 1, 0, -5.5, -5, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [11, 7, 1, 0, -5.5, -5, 0],
            },
            {
                POSITION: [3, 7, 1.7, 11, -5.5, -5, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [18, 7.5, 1, 0, 5.5, 5, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [11, 7, 1, 0, 5.5, 5, 0],
            },
            {
                POSITION: [3, 7, 1.7, 11, 5.5, 5, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.guardrail = makeRotated(Class.hutch, "Guardrail", 2);
    Class.machineTrapper = {
        PARENT: ["genericTank"],
        LABEL: "Machine Trapper",
        STAT_NAMES: statnames.trap,
        GUNS: [
            {
                POSITION: [15, 7, 1.6, 0, 0, 0, 0],
            },
            {
                POSITION: [3, 11.2, 1.487, 15, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, {size: 7/11.2}]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.mech = {
        PARENT: ["genericTank"],
        LABEL: "Mech",
        STAT_NAMES: statnames.trap,
        GUNS: [
            {
                POSITION: [4, 7, 1, 11, 0, 0, 0],
            },
            {
                POSITION: [12.5, 10, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [3, 7, 1.9, 15, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap]),
                    TYPE: "mechTrap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.cog = {
        PARENT: ["genericTank"],
        LABEL: "Wark",
        STAT_NAMES: statnames.generic,
        DANGER: 8,
        GUNS: [
            {
                POSITION: [4, 7, 1, 11, -5.5, -5, 0.5],
            },
            {
                POSITION: [12.5, 10, 1, 0, -5.5, -5, 0],
            },
            {
                POSITION: [3, 7, 1.9, 15, -5.5, -5, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap]),
                    TYPE: "mechTrap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [4, 7, 1, 11, 5.5, 5, 0],
            },
            {
                POSITION: [12.5, 10, 1, 0, 5.5, 5, 0],
            },
            {
                POSITION: [3, 7, 1.9, 15, 5.5, 5, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap]),
                    TYPE: "mechTrap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.sealer = makeRotated(Class.cog, "Sealer", 2);
    Class.expeller = {
        PARENT: ["genericTank"],
        LABEL: "Wark",
        STAT_NAMES: statnames.generic,
        DANGER: 8,
        GUNS: [
            {
                POSITION: [15, 7, 1.6, 0, -5.5, -5, 0.5],
            },
            {
                POSITION: [3, 11.2, 1.4875, 15, -5.5, -5, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1.6, 0, 5.5, 5, 0],
            },
            {
                POSITION: [3, 11.2, 1.4875, 15, 5.5, 5, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.setup = makeRotated(Class.expeller, "Setup", 2);
    Class.mechTrap = makeAuto(Class.trap, "Thrown Auto-Trap", { ...Class.droneAutoTurret, independent: true });
    Class.megaTrapper = {
        PARENT: ["genericTank"],
        LABEL: "Mega Trapper",
        STAT_NAMES: statnames.trap,
        GUNS: [
            {
                POSITION: [15, 14, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [6, 14, 1.7, 15, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.megatrap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.sawedOff = {
        PARENT: ["genericTank"],
        DANGER: 7,
        LABEL: "Sawed Off",
        GUNS: [
            {
                POSITION: [4, 3, 1, 11, -3, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun]),
                    TYPE: "trap",
                },
            },
            {
                POSITION: [4, 3, 1, 11, 3, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun]),
                    TYPE: "trap",
                },
            },
            {
                POSITION: [4, 4, 1, 13, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun]),
                    TYPE: "trapCasing",
                },
            },
            {
                POSITION: [1, 4, 1, 12, -1, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun]),
                    TYPE: "trapCasing",
                },
            },
            {
                POSITION: [1, 4, 1, 11, 1, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun]),
                    TYPE: "trapCasing",
                },
            },
            {
                POSITION: [1, 3, 1, 13, -1, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun]),
                    TYPE: "trap",
                },
            },
            {
                POSITION: [1, 3, 1, 13, 1, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun]),
                    TYPE: "trap",
                },
            },
            {
                POSITION: [1, 2, 1, 13, 2, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun]),
                    TYPE: "trapCasing",
                },
            },
            {
                POSITION: [1, 2, 1, 13, -2, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun]),
                    TYPE: "trapCasing",
                },
            },
            {
                POSITION: [15, 14, 1, 6, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun, g.fake]),
                    TYPE: "trapCasing",
                },
            },
            {
                POSITION: [8, 14, -1.3, 4, 0, 0, 0],
            },
            {
                POSITION: [3, 14/1.7, 1.7, 13, 0, 0, 0],
            },
        ],
    };
    Class.tricker = {
        PARENT: ["genericTank"],
        LABEL: "Tricker",
        GUNS: [
            {
                POSITION: [15, 7, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.single]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [5.5, 8, -1.8, 6.5, 0, 0, 0],
            },
        ],
    };
    Class.trapCasing = {
        PARENT: ["trap"],
        LABEL: "Thrown Traps",
        TYPE: "swarm",
    };
    Class.forger = {
        PARENT: ["genericTank"],
        DANGER: 7,
        LABEL: "Forger",
        GUNS: [
            {
                POSITION: [17, 3, 1, 0, -6, -7, 0.25],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                    TYPE: "bullet",
                    LABEL: "Secondary",
                },
            },
            {
                POSITION: [17, 3, 1, 0, 6, 7, 0.75],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                    TYPE: "bullet",
                    LABEL: "Secondary",
                },
            },
            {
                POSITION: [18, 12, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 12, 1.1, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "setTrap",
                },
            },
        ],
    };
    Class.fashioner = makeHybrid(Class.builder, "Fashioner");
    Class.fashioner.UPGRADES_TIER_3 = [];
    Class.stall = {
        PARENT: ["genericTank"],
        DANGER: 6,
        LABEL: "Stall",
        STAT_NAMES: statnames.trap,
        BODY: {
            SPEED: 0.8 * base.SPEED,
            FOV: 1.15 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [23, 7.5, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [18, 12, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 12, 1.1, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "setTrap",
                },
            },
        ],
    };
    Class.blockade = {
        PARENT: ["genericTank"],
        DANGER: 7,
        LABEL: "Blockade",
        STAT_NAMES: statnames.trap,
        BODY: {
            FOV: 1.15,
        },
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [24, 12, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [4, 12, 1.3, 22, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "setTrap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [4, 12, 1.3, 18, 0, 0, 1/3],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block,]),
                    TYPE: "setTrap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [4, 12, 1.3, 14, 0, 0, 2/3],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "setTrap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.trapTrap = {
        PARENT: ["setTrap"],
        INDEPENDENT: true,
        GUNS: [
            {
                POSITION: [1, 3, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun, g.noRandom, g.halfrange, g.halfrange]),
                    TYPE: ["trap", { PERSISTS_AFTER_DEATH: true }],
                    SHOOT_ON_DEATH: true,
                },
            },
            {
                POSITION: [1, 3, 1, 0, 0, 360/5, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun, g.noRandom, g.halfrange, g.halfrange]),
                    TYPE: ["trap", { PERSISTS_AFTER_DEATH: true }],
                    SHOOT_ON_DEATH: true,
                },
            },
            {
                POSITION: [1, 3, 1, 0, 0, 2*360/5, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun, g.noRandom, g.halfrange, g.halfrange]),
                    TYPE: ["trap", { PERSISTS_AFTER_DEATH: true }],
                    SHOOT_ON_DEATH: true,
                },
            },
            {
                POSITION: [1, 3, 1, 0, 0, 3*360/5, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun, g.noRandom, g.halfrange, g.halfrange]),
                    TYPE: ["trap", { PERSISTS_AFTER_DEATH: true }],
                    SHOOT_ON_DEATH: true,
                },
            },
            {
                POSITION: [1, 3, 1, 0, 0, 4*360/5, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun, g.noRandom, g.halfrange, g.halfrange]),
                    TYPE: ["trap", { PERSISTS_AFTER_DEATH: true }],
                    SHOOT_ON_DEATH: true,
                },
            },
        ],
        TURRETS: [
            {
                POSITION: [9, 0, 0, 0, 360, 1],
                TYPE: "pentaDeco",
            },
        ],
    };
    Class.pentaDeco = makeDeco(5);
    Class.pentaPentaDeco = {
        PARENT: ["genericTank"],
        SHAPE: 5,
        COLOR: 16,
        TURRETS: [
            {
                POSITION: [9, 0, 0, 0, 360, 1],
                TYPE: "pentaDeco",
            },
        ],
    };
    Class.charger = {
        PARENT: ["genericTank"],
        DANGER: 7,
        LABEL: "Charger",
        STAT_NAMES: statnames.trap,
        BODY: {
            SPEED: 0.8 * base.SPEED,
            FOV: 1.15 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [18, 12, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 12, 1.1, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "trapTrap",
                },
            },
            {
                POSITION: [2, 0.0001, 40000, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fake]),
                    TYPE: "bullet",
                },
            },
        ],
    };
    Class.ARassembler = {
        PARENT: ["genericTank"],
        LABEL: "Assembler",
        STAT_NAMES: statnames.trap,
        DANGER: 8,
        BODY: {
            SPEED: 0.65 * base.SPEED,
            FOV: 1.15 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [18, 18, 1.2, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 21.6, 1.2, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct, g.destroy]),
                    TYPE: "setTrap",
                },
            },
        ],
    };
    Class.autoContruct = makeAuto(Class.construct);
    Class.mechanic = {
        PARENT: ["genericTank"],
        LABEL: "Mechanic",
        STAT_NAMES: statnames.trap,
        DANGER: 7,
        BODY: {
            SPEED: 0.7 * base.SPEED,
            FOV: 1.15 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [5, 15, 1, 10.5, 0, 0, 0],
            },
            {
                POSITION: [3, 18, 1, 15.5, 0, 0, 0],
            },
            {
                POSITION: [2, 18, 1.3, 18, 0, 0, 0],
                PROPERTIES: {
                    MAX_CHILDREN: 6,
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
                    TYPE: "pillbox",
                    SYNCS_SKILLS: true,
                    DESTROY_OLDEST_CHILD: true,
                },
            },
            {
                POSITION: [8, 18, 1, 4, 0, 0, 0],
            },
        ],
    };
    Class.recoiler = {
        PARENT: ["genericTank"],
        DANGER: 7,
        LABEL: "Recoiler",
        STAT_NAMES: statnames.trap,
        FACING_TYPE: "locksFacing",
        BODY: {
            SPEED: base.SPEED * 0.8,
            FOV: base.FOV * 1.15,
        },
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [5, 16, 1, 14, 0, 0, 0],
            },
            {
                POSITION: [10, 16, -1.2, 3, 0, 0, 0],
            },
            {
                POSITION: [2, 16, 1.3, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang, g.construct]),
                    TYPE: "boomerang",
                },
            },
        ],
    };
    Class.mastermindGun = {
        PARENT: ["genericTank"],
        LABEL: "",
        COLOR: 16,
        GUNS: [
            {
                POSITION: [20, 22, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 22, 1.1, 20, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.auto, g.construct]),
                    TYPE: "setTrap",
                },
            },
        ],
    };
    Class.mastermind = {
        LABEL: "Mastermind",
        BODY: {
            SPEED: 1.1 * base.SPEED,
        },
        PARENT: ["genericTank"],
        DANGER: 6,
        FACING_TYPE: "autospin",
        TURRETS: [
            {
                POSITION: [12, 8, 0, 0, 190, 0],
                TYPE: "mastermindGun",
            },
            {
                POSITION: [12, 8, 0, 120, 190, 0],
                TYPE: "mastermindGun",
            },
            {
                POSITION: [12, 8, 0, 240, 190, 0],
                TYPE: "mastermindGun",
            },
        ],
    };
    Class.overwhelmer = {
        PARENT: ["genericTank"],
        DANGER: 7,
        LABEL: "Overwhelmer",
        STAT_NAMES: statnames.generic,
        BODY: {
            SPEED: 0.8 * base.SPEED,
        },
        GUNS: [
            {
                POSITION: [21, 14, 1, 0, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [18, 18, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 18, 1.1, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
                    TYPE: "setTrap",
                },
            },
        ],
    };
    Class.creator = {
        PARENT: ["genericTank"],
        DANGER: 6,
        LABEL: "Creator",
        GUNS: [
            {
                POSITION: [17, 3, 1, 0, -9, -7, 0.25],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                    TYPE: "bullet",
                    LABEL: "Secondary",
                },
            },
            {
                POSITION: [17, 3, 1, 0, 9, 7, 0.75],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                    TYPE: "bullet",
                    LABEL: "Secondary",
                },
            },
            {
                POSITION: [18, 18, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 18, 1.2, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
                    TYPE: "setTrap",
                },
            },
        ],
    };
    Class.hurdle = {
        PARENT: ["genericTank"],
        DANGER: 6,
        LABEL: "Stall",
        STAT_NAMES: statnames.trap,
        BODY: {
            SPEED: 0.8 * base.SPEED,
            FOV: 1.15 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [23, 7.5, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [18, 18, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 18, 1.1, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
                    TYPE: "setTrap",
                },
            },
        ],
    };
    Class.meld = makeHybrid(Class.construct, "Meld");
    Class.stormer = {
        PARENT: ["genericTank"],
        DANGER: 8,
        LABEL: "Stormer",
        STAT_NAMES: statnames.trap,
        BODY: {
            SPEED: 0.8 * base.SPEED,
            FOV: 1.15 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [18, 18, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 18, 1.1, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
                    TYPE: "trapTrap",
                },
            },
            {
                POSITION: [2, 0.0001, 40000, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fake]),
                    TYPE: "bullet",
                },
            },
        ],
    };
    Class.settler = {
        PARENT: ["genericTank"],
        LABEL: "Settler",
        STAT_NAMES: statnames.trap,
        DANGER: 7,
        INVISIBLE: [0.08, 0.015],// slower invis
        BODY: {
            SPEED: 0.7 * base.SPEED,
            FOV: 1.15 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [18, 15, -1.2, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 15, 1.2, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
                    TYPE: "setTrap",
                },
            },
        ],
    };
    Class.megaAutoBuilder = makeAuto(Class.builder, "Mega Auto-Builder", { type: "megaAutoTurret", independent: true });
    Class.megaAutoBuilder.UPGRADES_TIER_3 = [];
    Class.tripleAutoBuilder = {
        PARENT: ["genericTank"],
        DANGER: 6,
        LABEL: "Triple Auto-Builder",
        STAT_NAMES: statnames.trap,
        BODY: {
            SPEED: 0.8 * base.SPEED,
            FOV: 1.15 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [18, 12, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 12, 1.1, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "setTrap",
                },
            },
        ],
        TURRETS: [
            {
                TYPE: "autoTurret",
                independent: true,
                POSITION: [10, 6.25, 0, 0, 120, 1],
            },
            {
                TYPE: "autoTurret",
                independent: true,
                POSITION: [10, 6.25, 0, 120, 120, 1],
            },
            {
                TYPE: "autoTurret",
                independent: true,
                POSITION: [10, 6.25, 0, 240, 120, 1],
            }
        ],
    };
    Class.autoConstructor = makeAuto(Class.construct);
    Class.autoEngineer = makeAuto(Class.engineer);
    Class.autoBoomer = makeAuto(Class.boomer);
    Class.autoConqueror = makeAuto(Class.conqueror);
    Class.autoForger = makeAuto(Class.forger);
    Class.autoStall = makeAuto(Class.stall);
    Class.autoFashioner = makeAuto(Class.fashioner);
    Class.autoCharger = makeAuto(Class.charger);
    Class.autoBoomerang = {
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
        TURRETS: [
            {
                POSITION: [11, 0, 0, 0, 360, 1],
                TYPE: "pillboxTurret",
            },
        ],
    };
    Class.parryer = {
        PARENT: ["genericTank"],
        DANGER: 7,
        LABEL: "Parryer",
        STAT_NAMES: statnames.trap,
        FACING_TYPE: "locksFacing",
        BODY: {
            SPEED: base.SPEED * 0.8,
            FOV: base.FOV * 1.15,
        },
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [3, 7, 1, 13, 0, 0, 0],
            },
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [3, 10, 1, 16, 0, 0, 0],
            },
            {
                POSITION: [6, 10, -1.5, 7, 0, 0, 0],
            },
            {
                POSITION: [2, 10, 1.3, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
                    TYPE: "autoBoomerang",
                },
            },
        ],
    };
    Class.originatorGun = {
        PARENT: ["genericTank"],
        LABEL: "",
        COLOR: 16,
        GUNS: [
            {
                POSITION: [5, 16/14*11, 1, 10.5, 0, 0, 0],
            },
            {
                POSITION: [3, 16, 1, 15.5, 0, 0, 0],
            },
            {
                POSITION: [2, 14, 1.3, 18, 0, 0, 0],
                PROPERTIES: {
                    MAX_CHILDREN: 6,
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.auto]),
                    TYPE: "pillbox",
                    SYNCS_SKILLS: true,
                    DESTROY_OLDEST_CHILD: true,
                },
            },
            {
                POSITION: [4, 16, 1, 8, 0, 0, 0],
            },
        ],
    };
    Class.originator = {
        LABEL: "Originator",
        BODY: {
            SPEED: 1.1 * base.SPEED,
        },
        PARENT: ["genericTank"],
        DANGER: 8,
        FACING_TYPE: "autospin",
        TURRETS: [
            {
                POSITION: [12, 8, 0, 0, 190, 0],
                TYPE: "originatorGun",
            },
            {
                POSITION: [12, 8, 0, 120, 190, 0],
                TYPE: "originatorGun",
            },
            {
                POSITION: [12, 8, 0, 240, 190, 0],
                TYPE: "originatorGun",
            },
        ],
    };
    Class.vanquisher = {
        PARENT: ["genericTank"],
        DANGER: 7,
        LABEL: "Vanquisher",
        STAT_NAMES: statnames.generic,
        BODY: {
            SPEED: 0.8 * base.SPEED,
        },
        GUNS: [
            {
                POSITION: [21, 14, 1, 0, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [5, 11, 1, 10.5, 0, 0, 0],
            },
            {
                POSITION: [3, 14, 1, 15.5, 0, 0, 0],
            },
            {
                POSITION: [2, 14, 1.3, 18, 0, 0, 0],
                PROPERTIES: {
                    MAX_CHILDREN: 6,
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "pillbox",
                    SYNCS_SKILLS: true,
                    DESTROY_OLDEST_CHILD: true,
                },
            },
            {
                POSITION: [4, 14, 1, 8, 0, 0, 0],
            },
        ],
    };
    Class.producer = {
        PARENT: ["genericTank"],
        DANGER: 8,
        LABEL: "Producer",
        GUNS: [
            {
                POSITION: [14, 3, 1, 0, -6, -7, 0.25],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                    TYPE: "bullet",
                    LABEL: "Secondary",
                },
            },
            {
                POSITION: [14, 3, 1, 0, 6, 7, 0.75],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                    TYPE: "bullet",
                    LABEL: "Secondary",
                },
            },
            {
                POSITION: [5, 11, 1, 10.5, 0, 0, 0],
            },
            {
                POSITION: [3, 14, 1, 15.5, 0, 0, 0],
            },
            {
                POSITION: [2, 14, 1.3, 18, 0, 0, 0],
                PROPERTIES: {
                    MAX_CHILDREN: 6,
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "pillbox",
                    SYNCS_SKILLS: true,
                    DESTROY_OLDEST_CHILD: true,
                },
            },
            {
                POSITION: [4, 14, 1, 8, 0, 0, 0],
            },
        ],
    };
    Class.machinist = makeHybrid(Class.engineer, "Machinist");
    Class.cubicle = {
        PARENT: ["genericTank"],
        DANGER: 8,
        LABEL: "Cubicle",
        STAT_NAMES: statnames.trap,
        BODY: {
            SPEED: 0.8 * base.SPEED,
            FOV: 1.15 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [23, 7.5, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [5, 11, 1, 10.5, 0, 0, 0],
            },
            {
                POSITION: [3, 14, 1, 15.5, 0, 0, 0],
            },
            {
                POSITION: [2, 14, 1.3, 18, 0, 0, 0],
                PROPERTIES: {
                    MAX_CHILDREN: 6,
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "pillbox",
                    SYNCS_SKILLS: true,
                    DESTROY_OLDEST_CHILD: true,
                },
            },
            {
                POSITION: [4, 14, 1, 8, 0, 0, 0],
            },
        ],
    };
    Class.twinPillboxTurret = {
        PARENT: ["genericTank"],
        LABEL: "",
        COLOR: 16,
        BODY: {
            FOV: 2,
        },
        HAS_NO_RECOIL: true,
        GUNS: [
            {
                POSITION: [22, 11, 1, 0, -5.5, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.turret, g.power, g.auto, g.notdense]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [22, 11, 1, 0, 5.5, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.turret, g.power, g.auto, g.notdense]),
                    TYPE: "bullet",
                },
            },
        ],
    };
    Class.twinPillbox = {
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
                TYPE: "twinPillboxTurret",
            },
        ],
    };
    Class.swarmPillboxTurret = {
        PARENT: ["genericTank"],
        LABEL: "",
        COLOR: 16,
        BODY: {
            FOV: 2,
        },
        HAS_NO_RECOIL: true,
        INDEPENDENT: true,
        FACING_TYPE: "autospin",
        GUNS: [
            {
                POSITION: [18, 11, 0.6, 0, 0, 0, 0],
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.turret, g.power, g.auto, g.notdense, g.small, g.bitlessspeed]),
                    TYPE: "swarm",
                },
            },
            {
                POSITION: [18, 11, 0.6, 0, 0, 180, 0.5],
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.turret, g.power, g.auto, g.notdense, g.small, g.bitlessspeed]),
                    TYPE: "swarm",
                },
            },
        ],
    };
    Class.swarmPillbox = {
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
                TYPE: "swarmPillboxTurret",
            },
        ],
    };
    Class.driver = {
        PARENT: ["genericTank"],
        DANGER: 7,
        LABEL: "Driver",
        STAT_NAMES: statnames.trap,
        BODY: {
            SPEED: 0.75 * base.SPEED,
            FOV: 1.15 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [5, 11, 1, 10.5, 0, 0, 0],
            },
            {
                POSITION: [3, 14, 1, 15.5, 0, 0, 0],
            },
            {
                POSITION: [3, 7, 1, 15.5, 0, 0, 0],
            },
            {
                POSITION: [2, 14, 1.3, 18, 0, 0, 0],
                PROPERTIES: {
                    MAX_CHILDREN: 6,
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "twinPillbox",
                    SYNCS_SKILLS: true,
                    DESTROY_OLDEST_CHILD: true,
                },
            },
            {
                POSITION: [4, 14, 1, 8, 0, 0, 0],
            },
            {
                POSITION: [4, 7, 1, 8, 0, 0, 0],
            },
        ],
    };
    Class.specialist = {
        PARENT: ["genericTank"],
        DANGER: 7,
        LABEL: "Specialist",
        STAT_NAMES: statnames.trap,
        BODY: {
            SPEED: 0.75 * base.SPEED,
            FOV: 1.15 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [5, 11, 1, 10.5, 0, 0, 0],
            },
            {
                POSITION: [3, 14, 1, 15.5, 0, 0, 0],
            },
            {
                POSITION: [2, 14, 1.3, 18, 0, 0, 0],
                PROPERTIES: {
                    MAX_CHILDREN: 6,
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "swarmPillbox",
                    SYNCS_SKILLS: true,
                    DESTROY_OLDEST_CHILD: true,
                },
            },
            {
                POSITION: [4, 14, 1, 8, 0, 0, 0],
            },
            {
                POSITION: [3, 6, 0.9, 13.5, 0, 0, 0],
            },
        ],
    };
    Class.deviser = {
        PARENT: ["genericTank"],
        DANGER: 7,
        LABEL: "Deviser",
        STAT_NAMES: statnames.trap,
        BODY: {
            SPEED: 0.75 * base.SPEED,
            FOV: 1.15 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [5, 11, 1, 10.5, 0, 0, 0],
            },
            {
                POSITION: [3, 14, 1, 15.5, 0, 0, 0],
            },
            {
                POSITION: [2, 14, 1.3, 18, 0, 0, 0],
                PROPERTIES: {
                    MAX_CHILDREN: 6,
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "weirdPillbox",
                    SYNCS_SKILLS: true,
                    DESTROY_OLDEST_CHILD: true,
                },
            },
            {
                POSITION: [4, 14, 1, 8, 0, 0, 0],
            },
            {
                POSITION: [2, 0.0001, 40000, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fake]),
                    TYPE: "bullet",
                },
            },
        ],
    };
    Class.weirdPillboxTurret = {
        PARENT: ["genericTank"],
        LABEL: "",
        COLOR: 16,
        BODY: {
            FOV: 2,
        },
        SHAPE: 5,
        HAS_NO_RECOIL: true,
        GUNS: [
            {
                POSITION: [22, 11, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.turret, g.power, g.auto, g.notdense]),
                    TYPE: "bullet",
                },
            },
        ],
    };
    Class.weirdPillbox = {
        LABEL: "Pillbox",
        PARENT: ["trap"],
        SHAPE: -4,
        MOTION_TYPE: "motor",
        CONTROLLERS: ["goToMasterTarget", "nearestDifferentMaster"],
        BODY: {
            SPEED: 1,
            DENSITY: 5,
        },
        DIE_AT_RANGE: true,
        TURRETS: [
            {
                POSITION: [11, 0, 0, 0, 360, 1],
                TYPE: "weirdPillboxTurret",
            },
        ],
        INDEPENDENT: true,
        GUNS: [
            {
                POSITION: [1, 3, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun, g.noRandom, g.halfrange, g.halfrange]),
                    TYPE: ["trap", { PERSISTS_AFTER_DEATH: true }],
                    SHOOT_ON_DEATH: true,
                },
            },
            {
                POSITION: [1, 3, 1, 0, 0, 360/5, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun, g.noRandom, g.halfrange, g.halfrange]),
                    TYPE: ["trap", { PERSISTS_AFTER_DEATH: true }],
                    SHOOT_ON_DEATH: true,
                },
            },
            {
                POSITION: [1, 3, 1, 0, 0, 2*360/5, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun, g.noRandom, g.halfrange, g.halfrange]),
                    TYPE: ["trap", { PERSISTS_AFTER_DEATH: true }],
                    SHOOT_ON_DEATH: true,
                },
            },
            {
                POSITION: [1, 3, 1, 0, 0, 3*360/5, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun, g.noRandom, g.halfrange, g.halfrange]),
                    TYPE: ["trap", { PERSISTS_AFTER_DEATH: true }],
                    SHOOT_ON_DEATH: true,
                },
            },
            {
                POSITION: [1, 3, 1, 0, 0, 4*360/5, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun, g.noRandom, g.halfrange, g.halfrange]),
                    TYPE: ["trap", { PERSISTS_AFTER_DEATH: true }],
                    SHOOT_ON_DEATH: true,
                },
            },
        ],
    };
    Class.ricochetGun = {
        PARENT: ["genericTank"],
        LABEL: "",
        COLOR: 16,
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [5, 11, 1, 14, 0, 0, 0],
            },
            {
                POSITION: [6, 11, -1.5, 7, 0, 0, 0],
            },
            {
                POSITION: [2, 11, 1.3, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang, g.auto]),
                    TYPE: "boomerang",
                },
            },
        ],
    };
    Class.ricochet = {
        LABEL: "Ricochet",
        BODY: {
            SPEED: 1.1 * base.SPEED,
        },
        PARENT: ["genericTank"],
        DANGER: 6,
        FACING_TYPE: "autospin",
        TURRETS: [
            {
                POSITION: [12, 8, 0, 0, 190, 0],
                TYPE: "ricochetGun",
            },
            {
                POSITION: [12, 8, 0, 120, 190, 0],
                TYPE: "ricochetGun",
            },
            {
                POSITION: [12, 8, 0, 240, 190, 0],
                TYPE: "ricochetGun",
            },
        ],
    };
    Class.defeater = {
        PARENT: ["genericTank"],
        DANGER: 7,
        LABEL: "Defeater",
        STAT_NAMES: statnames.generic,
        BODY: {
            SPEED: 0.8 * base.SPEED,
        },
        GUNS: [
            {
                POSITION: [21, 14, 1, 0, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: "bullet",
                },
            },
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [5, 10, 1, 14, 0, 0, 0],
            },
            {
                POSITION: [6, 10, -1.5, 7, 0, 0, 0],
            },
            {
                POSITION: [2, 10, 1.3, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
                    TYPE: "boomerang",
                },
            },
        ],
    };
    Class.rebounder = {
        PARENT: ["genericTank"],
        DANGER: 7,
        LABEL: "Rebounder",
        STAT_NAMES: statnames.trap,
        BODY: {
            SPEED: 0.8 * base.SPEED,
            FOV: 1.15 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [13, 3, 1, 0, -6, -7, 0.25],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                    TYPE: "bullet",
                    LABEL: "Secondary",
                },
            },
            {
                POSITION: [13, 3, 1, 0, 6, 7, 0.75],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                    TYPE: "bullet",
                    LABEL: "Secondary",
                },
            },
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [5, 10, 1, 14, 0, 0, 0],
            },
            {
                POSITION: [6, 10, -1.5, 7, 0, 0, 0],
            },
            {
                POSITION: [2, 10, 1.3, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
                    TYPE: "boomerang",
                },
            },
        ],
    };
    Class.fender = {
        PARENT: ["genericTank"],
        DANGER: 7,
        LABEL: "Fender",
        STAT_NAMES: statnames.trap,
        FACING_TYPE: "locksFacing",
        BODY: {
            SPEED: base.SPEED * 0.8,
            FOV: base.FOV * 1.15,
        },
        GUNS: [
            {
                POSITION: [23, 7.5, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic]),
                    TYPE: "bullet",
                },
            },
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [5, 10, 1, 14, 0, 0, 0],
            },
            {
                POSITION: [6, 10, -1.5, 7, 0, 0, 0],
            },
            {
                POSITION: [2, 10, 1.3, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
                    TYPE: "boomerang",
                },
            },
        ],
    };
    Class.bentBoomer = {
        PARENT: ["genericTank"],
        DANGER: 7,
        LABEL: "Bent Boomer",
        STAT_NAMES: statnames.trap,
        FACING_TYPE: "locksFacing",
        BODY: {
            SPEED: base.SPEED * 0.8,
            FOV: base.FOV * 1.15,
        },
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [5, 10, 1, 14, 0, -45, 0],
            },
            {
                POSITION: [6, 10, -1.5, 7, 0, -45, 0],
            },
            {
                POSITION: [2, 10, 1.3, 18, 0, -45, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
                    TYPE: "boomerang",
                },
            },
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [5, 10, 1, 14, 0, 45, 0],
            },
            {
                POSITION: [6, 10, -1.5, 7, 0, 45, 0],
            },
            {
                POSITION: [2, 10, 1.3, 18, 0, 45, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
                    TYPE: "boomerang",
                },
            },
        ],
    };
    Class.deflector = makeHybrid(Class.boomer, "Deflector");
    Class.artistGun = {
        PARENT: ["genericTank"],
        LABEL: "",
        COLOR: 16,
        GUNS: [
            {
                POSITION: [17, 3, 1, 0, -7, -7, 0.25],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.auto]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [17, 3, 1, 0, 7, 7, 0.75],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.auto]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 16, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 16, 1.1, 20, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.auto]),
                    TYPE: "setTrap",
                },
            },
        ],
    };
    Class.artist = {
        LABEL: "Artist",
        BODY: {
            SPEED: 1.1 * base.SPEED,
        },
        PARENT: ["genericTank"],
        DANGER: 8,
        FACING_TYPE: "autospin",
        TURRETS: [
            {
                POSITION: [12, 8, 0, 0, 190, 0],
                TYPE: "artistGun",
            },
            {
                POSITION: [12, 8, 0, 120, 190, 0],
                TYPE: "artistGun",
            },
            {
                POSITION: [12, 8, 0, 240, 190, 0],
                TYPE: "artistGun",
            },
        ],
    };
    Class.paddockGun = {
        PARENT: ["genericTank"],
        LABEL: "",
        COLOR: 16,
        GUNS: [
            {
                POSITION: [26, 9, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [20, 16, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 16, 1.1, 20, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.auto]),
                    TYPE: "setTrap",
                },
            },
        ],
    };
    Class.paddock = {
        LABEL: "Paddock",
        BODY: {
            SPEED: 1.1 * base.SPEED,
        },
        PARENT: ["genericTank"],
        DANGER: 8,
        FACING_TYPE: "autospin",
        TURRETS: [
            {
                POSITION: [12, 8, 0, 0, 190, 0],
                TYPE: "paddockGun",
            },
            {
                POSITION: [12, 8, 0, 120, 190, 0],
                TYPE: "paddockGun",
            },
            {
                POSITION: [12, 8, 0, 240, 190, 0],
                TYPE: "paddockGun",
            },
        ],
    };
    Class.castle = {
        LABEL: "Castle",
        BODY: {
            SPEED: 1.1 * base.SPEED,
        },
        PARENT: ["genericTank"],
        DANGER: 7,
        FACING_TYPE: "autospin",
        TURRETS: [
            {
                POSITION: [12, 8, 0, 0, 190, 0],
                TYPE: "architectGun",
            },
            {
                POSITION: [12, 8, 0, 120, 190, 0],
                TYPE: "architectGun",
            },
            {
                POSITION: [12, 8, 0, 240, 190, 0],
                TYPE: "architectGun",
            },
        ],
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [7, 8, 0.6, 7, 0, 60, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                    TYPE: "swarm",
                    STAT_CALCULATOR: gunCalcNames.swarm,
                },
            },
            {
                POSITION: [7, 8, 0.6, 7, 2, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                    TYPE: "swarm",
                    STAT_CALCULATOR: gunCalcNames.swarm,
                },
            },
            {
                POSITION: [7, 8, 0.6, 7, -2, 300, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                    TYPE: "swarm",
                    STAT_CALCULATOR: gunCalcNames.swarm,
                },
            },
        ],
    };
    Class.inventor = {
        LABEL: "Inventor",
        BODY: {
            SPEED: 1.1 * base.SPEED,
        },
        PARENT: ["genericTank"],
        DANGER: 7,
        FACING_TYPE: "autospin",
        TURRETS: [
            {
                POSITION: [12, 8, 0, 0*360/7, 190, 0],
                TYPE: "weakarchitectGun",
            },
            {
                POSITION: [12, 8, 0, 1*360/7, 190, 0],
                TYPE: "weakarchitectGun",
            },
            {
                POSITION: [12, 8, 0, 2*360/7, 190, 0],
                TYPE: "weakarchitectGun",
            },
            {
                POSITION: [12, 8, 0, 3*360/7, 190, 0],
                TYPE: "weakarchitectGun",
            },
            {
                POSITION: [12, 8, 0, 4*360/7, 190, 0],
                TYPE: "weakarchitectGun",
            },
            {
                POSITION: [12, 8, 0, 5*360/7, 190, 0],
                TYPE: "weakarchitectGun",
            },
            {
                POSITION: [12, 8, 0, 6*360/7, 190, 0],
                TYPE: "weakarchitectGun",
            },
        ],
    };
    Class.designer = {
        LABEL: "Designer",
        BODY: {
            SPEED: 1.1 * base.SPEED,
        },
        PARENT: ["genericTank"],
        DANGER: 7,
        FACING_TYPE: "autospin",
        TURRETS: [
            {
                POSITION: [12, 8, 0, 0, 190, 0],
                TYPE: "weakarchitectGun",
            },
            {
                POSITION: [12, 8, 0, 60, 190, 0],
                TYPE: "weakarchitectGun",
            },
            {
                POSITION: [12, 8, 0, 120, 190, 0],
                TYPE: "weakarchitectGun",
            },
            {
                POSITION: [12, 8, 0, 180, 190, 0],
                TYPE: "weakarchitectGun",
            },
            {
                POSITION: [12, 8, 0, 240, 190, 0],
                TYPE: "weakarchitectGun",
            },
            {
                POSITION: [12, 8, 0, 299.999999999, 190, 0],// asdrúbal (fix bounding box for client)
                TYPE: "weakarchitectGun",
            },
            {
                POSITION: [11, 0, 0, 0, 360, 1],
                TYPE: [
                    "autoTurret",
                    {
                        CONTROLLERS: ["nearestDifferentMaster"],
                        INDEPENDENT: true,
                    },
                ],
            },
        ],
    };
    Class.draftsmanGun = {
        PARENT: ["genericTank"],
        LABEL: "",
        COLOR: 16,
        GUNS: [
            {
                POSITION: [18, 16, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 16, 1.1, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.auto]),
                    TYPE: "trapTrap",
                },
            },
            {
                POSITION: [2, 0.0001, 16/3*10000, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fake]),
                    TYPE: "bullet",
                },
            },
        ],
    };
    Class.draftsman = {
        LABEL: "Draftsman",
        BODY: {
            SPEED: 1.1 * base.SPEED,
        },
        PARENT: ["genericTank"],
        DANGER: 6,
        FACING_TYPE: "autospin",
        TURRETS: [
            {
                POSITION: [12, 8, 0, 0, 190, 0],
                TYPE: "draftsmanGun",
            },
            {
                POSITION: [12, 8, 0, 120, 190, 0],
                TYPE: "draftsmanGun",
            },
            {
                POSITION: [12, 8, 0, 240, 190, 0],
                TYPE: "draftsmanGun",
            },
        ],
    };
    Class.architectGuard = {
        PARENT: ["genericTank"],
        LABEL: "Architect Guard",
        GUNS: [
            {
                POSITION: [18, 8, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic]),
                    TYPE: "bullet",
                },
            },
        ],
        TURRETS: [
            {
                POSITION: [12, 8, 0, 90, 190, 0],
                TYPE: "architectGun",
            },
            {
                POSITION: [12, 8, 0, 180, 190, 0],
                TYPE: "architectGun",
            },
            {
                POSITION: [12, 8, 0, 270, 190, 0],
                TYPE: "architectGun",
            },
        ],
    };
    Class.obliterator = {
        PARENT: ["genericTank"],
        DANGER: 7,
        LABEL: "Obliterator",
        STAT_NAMES: statnames.generic,
        BODY: {
            SPEED: 0.8 * base.SPEED,
        },
        GUNS: [
            {
                POSITION: [20.5, 19.5, 1, 0, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [18, 12, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 12, 1.1, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "setTrap",
                },
            },
        ],
    };
    Class.annexer = {
        PARENT: ["genericTank"],
        DANGER: 7,
        LABEL: "AAnnexer",
        STAT_NAMES: statnames.generic,
        BODY: {
            SPEED: 0.8 * base.SPEED,
        },
        GUNS: [
            {
                POSITION: [17, 3, 1, 0, -6, -7, 0.25],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                    TYPE: "bullet",
                    LABEL: "Secondary",
                },
            },
            {
                POSITION: [17, 3, 1, 0, 6, 7, 0.75],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                    TYPE: "bullet",
                    LABEL: "Secondary",
                },
            },
            {
                POSITION: [17, 3, 1, 0, -6, 173, 0.25],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                    TYPE: "bullet",
                    LABEL: "Secondary",
                },
            },
            {
                POSITION: [17, 3, 1, 0, 6, 187, 0.75],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                    TYPE: "bullet",
                    LABEL: "Secondary",
                },
            },
            {
                POSITION: [21, 14, 1, 0, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [18, 12, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 12, 1.1, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "setTrap",
                },
            },
        ],
    };
    Class.blusterer = {
        PARENT: ["genericTank"],
        DANGER: 7,
        LABEL: "Blusterer",
        STAT_NAMES: statnames.generic,
        BODY: {
            SPEED: 0.8 * base.SPEED,
        },
        GUNS: [
            {
                POSITION: [21, 14, 1, 0, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [18, 12, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 12, 1.1, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "setTrap",
                },
            },
            {
                POSITION: [19, 2, 1, 0, -2.5, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.gunner,
                        g.power,
                        g.twin,
                        g.slow,
                        g.flank,
                        g.lotsmorrecoil,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [19, 2, 1, 0, 2.5, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.gunner,
                        g.power,
                        g.twin,
                        g.slow,
                        g.flank,
                        g.lotsmorrecoil,
                    ]),
                    TYPE: "bullet",
                },
            },
        ],
    };
    Class.overthrower = {
        PARENT: ["genericTank"],
        DANGER: 7,
        LABEL: "Overthrower",
        STAT_NAMES: statnames.generic,
        BODY: {
            SPEED: 0.8 * base.SPEED,
        },
        GUNS: [
            {
                POSITION: [21, 14, 1, 0, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [23, 7.5, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [18, 12, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 12, 1.1, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "setTrap",
                },
            },
        ],
    };
    Class.pulverizer = {
        PARENT: ["genericTank"],
        DANGER: 7,
        LABEL: "Pulverizer",
        STAT_NAMES: statnames.generic,
        BODY: {
            SPEED: 0.8 * base.SPEED,
        },
        GUNS: [
            {
                POSITION: [15, 14, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [6, 14, 1.7, 15, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.destroy]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [18, 12, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 12, 1.1, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "setTrap",
                },
            },
        ],
    };
    Class.overrunner = {
        PARENT: ["genericTank"],
        DANGER: 7,
        LABEL: "Overrunner",
        STAT_NAMES: statnames.generic,
        BODY: {
            SPEED: 0.8 * base.SPEED,
        },
        GUNS: [
            {
                POSITION: [21, 14, 1, 0, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [18, 12, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 12, 1.1, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "trapTrap",
                },
            },
            {
                POSITION: [2, 0.0001, 40000, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fake]),
                    TYPE: "bullet",
                },
            },
        ],
    };
    Class.massacrer = {
        PARENT: ["genericTank"],
        DANGER: 7,
        LABEL: "Massacrer",
        STAT_NAMES: statnames.generic,
        BODY: {
            SPEED: 0.8 * base.SPEED,
        },
        INVISIBLE: [0.08, 0.015],
        GUNS: [
            {
                POSITION: [21, 14, 0.8, 0, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [18, 12, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 12, 1.1, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "setTrap",
                },
            },
        ],
    };
    Class.planner = Class.artist; // two identical tanks, different names
    Class.former = {
        PARENT: ["genericTank"],
        DANGER: 8,
        LABEL: "Former",
        STAT_NAMES: statnames.trap,
        BODY: {
            SPEED: 0.8 * base.SPEED,
            FOV: 1.15 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [17, 3, 1, 0, -6, -7, 0.25],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                    TYPE: "bullet",
                    LABEL: "Secondary",
                },
            },
            {
                POSITION: [17, 3, 1, 0, 6, 7, 0.75],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                    TYPE: "bullet",
                    LABEL: "Secondary",
                },
            },
            {
                POSITION: [23, 7.5, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [18, 12, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 12, 1.1, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "setTrap",
                },
            },
        ],
    };
    Class.caster = {
        PARENT: ["genericTank"],
        LABEL: "Caster",
        DANGER: 7,
        GUNS: [
            {
                POSITION: [13, 3, 1, 0, -8, -7, 0.6],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                    TYPE: "bullet",
                    LABEL: "Secondary",
                },
            },
            {
                POSITION: [13, 3, 1, 0, 8, 7, 0.8],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                    TYPE: "bullet",
                    LABEL: "Secondary",
                },
            },
            {
                POSITION: [17, 3, 1, 0, -6, -7, 0.2],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                    TYPE: "bullet",
                    LABEL: "Secondary",
                },
            },
            {
                POSITION: [17, 3, 1, 0, 6, 7, 0.4],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                    TYPE: "bullet",
                    LABEL: "Secondary",
                },
            },
            {
                POSITION: [18, 12, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 12, 1.1, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "setTrap",
                },
            },
        ],
    };
    Class.blend = makeAuto(Class.forger, "Blend");
    Class.bounder = {
        PARENT: ["genericTank"],
        DANGER: 8,
        LABEL: "Bounder",
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [14, 3, 1, 0, -6, -7, 0.25],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.bees]),
                    TYPE: ["bee", { INDEPENDENT: true }],
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                    WAIT_TO_CYCLE: true,
                    LABEL: "Secondary",
                },
            },
            {
                POSITION: [14, 3, 1, 0, 6, 7, 0.75],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.bees]),
                    TYPE: ["bee", { INDEPENDENT: true }],
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                    WAIT_TO_CYCLE: true,
                    LABEL: "Secondary",
                },
            },
            {
                POSITION: [18, 12, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 12, 1.1, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "setTrap",
                },
            },
        ],
    };
    Class.shaper = {
        PARENT: ["genericTank"],
        DANGER: 7,
        LABEL: "Shaper",
        GUNS: [
            {
                POSITION: [17, 3, 1, 0, -6, 0, 0.25],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                    TYPE: "bullet",
                    LABEL: "Secondary",
                },
            },
            {
                POSITION: [17, 3, 1, 0, 6, 0, 0.75],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                    TYPE: "bullet",
                    LABEL: "Secondary",
                },
            },
            {
                POSITION: [18, 12, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 12, 1.1, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "setTrap",
                },
            },
        ],
    };
    Class.modeler = {
        PARENT: ["genericTank"],
        DANGER: 6,
        LABEL: "Modeler",
        GUNS: [
            {
                POSITION: [17, 3, 1, 0, -6, -7, 0.25],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                    TYPE: "bullet",
                    LABEL: "Secondary",
                },
            },
            {
                POSITION: [17, 3, 1, 0, 6, 7, 0.75],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                    TYPE: "bullet",
                    LABEL: "Secondary",
                },
            },
            {
                POSITION: [18, 12, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 12, 1.1, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "trapTrap",
                },
            },
            {
                POSITION: [2, 0.0001, 40000, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fake]),
                    TYPE: "bullet",
                },
            },
        ],
    };
    Class.melder = {
        PARENT: ["genericTank"],
        DANGER: 7,
        LABEL: "Melder",
        GUNS: [
            {
                POSITION: [14, 3, 1, 0, 6, 7, 0],
            },
            {
                POSITION: [3, 3, 1.7, 14, 6, 7, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.gunner, g.arty, g.halfrange]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [14, 3, 1, 0, -6, -7, 0],
            },
            {
                POSITION: [3, 3, 1.7, 14, -6, -7, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.gunner, g.arty, g.halfrange]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [18, 12, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 12, 1.1, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "setTrap",
                },
            },
        ],
    };
    Class.delayer = makeHybrid(Class.stall, "Delayer");
    Class.compartment = {
        PARENT: ["genericTank"],
        DANGER: 6,
        LABEL: "Compartment",
        STAT_NAMES: statnames.trap,
        BODY: {
            SPEED: 0.8 * base.SPEED,
            FOV: 1.15 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [23, 7.5, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [18, 12, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 12, 1.1, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "trapTrap",
                },
            },
            {
                POSITION: [2, 0.0001, 40000, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fake]),
                    TYPE: "bullet",
                },
            },
        ],
    };
    Class.overbuilder = makeOver(Class.builder, "Overbuilder");
    Class.stylist = {
        PARENT: ["genericTank"],
        DANGER: 8,
        LABEL: "Stylist",
        STAT_NAMES: statnames.trap,
        BODY: {
            SPEED: 0.8 * base.SPEED,
            FOV: 1.15 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [18, 12, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 12, 1.1, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "setTrap",
                },
            },
            {
                /********* LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
                POSITION: [6, 12, 1.2, 8, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
                    TYPE: ["drone", { INDEPENDENT: true }],
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                    WAIT_TO_CYCLE: false,
                    MAX_CHILDREN: 3,
                },
            },
            {
                POSITION: [7, 7.5, 0.6, 7, 4, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.overdrive]),
                    TYPE: ["autoswarm"],
                    STAT_CALCULATOR: gunCalcNames.swarm,
                    LABEL: "Autonomous",
                },
            },
            {
                POSITION: [7, 7.5, 0.6, 7, -4, 180, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.overdrive]),
                    TYPE: ["autoswarm"],
                    STAT_CALCULATOR: gunCalcNames.swarm,
                    LABEL: "Autonomous",
                },
            },
        ],
    };
    Class.experimenter = makeSpawnbrid(Class.builder, "Experimenter");
    Class.experimenter.UPGRADES_TIER_3 = [];
    Class.fashionerdrive = makeDriveOver(Class.fashioner);
    Class.methodist = makeBigbrid(Class.builder, "Methodist");
    Class.methodist.UPGRADES_TIER_3 = [];
    Class.rallyer = makeHybrid(Class.charger, "Rallyer");
    Class.assailer = {
        PARENT: ["genericTank"],
        DANGER: 8,
        LABEL: "Assailer",
        STAT_NAMES: statnames.trap,
        BODY: {
            SPEED: 0.8 * base.SPEED,
            FOV: 1.15 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [18, 12, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [18, 8, 0.05, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 12, 1.1, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "trapTrap2",
                },
            },
            {
                POSITION: [2, 0.0001, 40000, 18, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fake]),
                    TYPE: "bullet",
                },
            },
        ],
    };
    Class.trapTrap2 = {
        PARENT: ["setTrap"],
        INDEPENDENT: true,
        GUNS: [
            {
                POSITION: [1, 3, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun, g.noRandom, g.halfrange, g.halfrange]),
                    TYPE: ["trap", { PERSISTS_AFTER_DEATH: true }],
                    SHOOT_ON_DEATH: true,
                },
            },
            {
                POSITION: [1, 3, 1, 0, 0, 360/10, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun, g.noRandom, g.halfrange, g.halfrange]),
                    TYPE: ["trap", { PERSISTS_AFTER_DEATH: true }],
                    SHOOT_ON_DEATH: true,
                },
            },
            {
                POSITION: [1, 3, 1, 0, 0, 2*360/10, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun, g.noRandom, g.halfrange, g.halfrange]),
                    TYPE: ["trap", { PERSISTS_AFTER_DEATH: true }],
                    SHOOT_ON_DEATH: true,
                },
            },
            {
                POSITION: [1, 3, 1, 0, 0, 3*360/10, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun, g.noRandom, g.halfrange, g.halfrange]),
                    TYPE: ["trap", { PERSISTS_AFTER_DEATH: true }],
                    SHOOT_ON_DEATH: true,
                },
            },
            {
                POSITION: [1, 3, 1, 0, 0, 4*360/10, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun, g.noRandom, g.halfrange, g.halfrange]),
                    TYPE: ["trap", { PERSISTS_AFTER_DEATH: true }],
                    SHOOT_ON_DEATH: true,
                },
            },
            {
                POSITION: [1, 3, 1, 0, 0, 5*360/10, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun, g.noRandom, g.halfrange, g.halfrange]),
                    TYPE: ["trap", { PERSISTS_AFTER_DEATH: true }],
                    SHOOT_ON_DEATH: true,
                },
            },
            {
                POSITION: [1, 3, 1, 0, 0, 6*360/10, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun, g.noRandom, g.halfrange, g.halfrange]),
                    TYPE: ["trap", { PERSISTS_AFTER_DEATH: true }],
                    SHOOT_ON_DEATH: true,
                },
            },
            {
                POSITION: [1, 3, 1, 0, 0, 7*360/10, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun, g.noRandom, g.halfrange, g.halfrange]),
                    TYPE: ["trap", { PERSISTS_AFTER_DEATH: true }],
                    SHOOT_ON_DEATH: true,
                },
            },
            {
                POSITION: [1, 3, 1, 0, 0, 8*360/10, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun, g.noRandom, g.halfrange, g.halfrange]),
                    TYPE: ["trap", { PERSISTS_AFTER_DEATH: true }],
                    SHOOT_ON_DEATH: true,
                },
            },
            {
                POSITION: [1, 3, 1, 0, 0, 9*360/10, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.shotgun, g.noRandom, g.halfrange, g.halfrange]),
                    TYPE: ["trap", { PERSISTS_AFTER_DEATH: true }],
                    SHOOT_ON_DEATH: true,
                },
            },
        ],
        TURRETS: [
            {
                POSITION: [9, 0, 0, 0, 360, 1],
                TYPE: "pentaPentaDeco",
            },
        ],
    };
    Class.triPen = makeRotated(Class.pen, "Tri-Pen", 3);
    Class.triMech = makeRotated(Class.mech, "Tri-Mech", 3);
    Class.triMachine = makeRotated(Class.machineTrapper, "Tri-Machine", 3);
    Class.triTrapGuard = {
        PARENT: ["genericTank"],
        LABEL: "Tri-Trap Guard",
        STAT_NAMES: statnames.trap,
        GUNS: [
            {
                POSITION: [20, 8, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 90, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 90, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.flank]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.flank]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 270, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 270, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.flank]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.triBarricade = makeRotated(Class.barricade, "Tri-Barricade", 3);
    Class.triMegaTrapper = makeRotated(Class.megaTrapper, "Tri-Mega Trapper", 3);
    Class.corral = makeRotated({
        PARENT: ["genericTank"],
        DANGER: 8,
        STAT_NAMES: statnames.generic,
        BODY: {
            SPEED: 0.8 * base.SPEED,
            FOV: 1.2 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [18, 7.5, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [14, 9, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [4, 9, 1.5, 14, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    }, "Corral", 3);
    Class.corral.GUNS.push({
        POSITION: [7, 7.5, 0.6, 7, 0, 60, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [
                "swarm",
                {
                    CONTROLLERS: ["canRepel"],
                },
            ],
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    },{
        POSITION: [7, 7.5, 0.6, 7, 0, 180, 1/3],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [
                "swarm",
                {
                    CONTROLLERS: ["canRepel"],
                },
            ],
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    },{
        POSITION: [7, 7.5, 0.6, 7, 0, 300, 2/3],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [
                "swarm",
                {
                    CONTROLLERS: ["canRepel"],
                },
            ],
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    },);
    Class.donjon = makeRotated({
        PARENT: ["genericTank"],
        DANGER: 7,
        STAT_NAMES: statnames.generic,
        BODY: {
            SPEED: 0.8 * base.SPEED,
            FOV: 1.2 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [15, 7, 1.6, 0, 0, 0, 0],
            },
            {
                POSITION: [3, 11.2, 1.487, 15, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    }, "Donjon", 3);
    Class.donjon.GUNS.push({
        POSITION: [7, 7.5, 0.6, 7, 0, 60, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [
                "swarm",
                {
                    CONTROLLERS: ["canRepel"],
                },
            ],
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    },{
        POSITION: [7, 7.5, 0.6, 7, 0, 180, 1/3],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [
                "swarm",
                {
                    CONTROLLERS: ["canRepel"],
                },
            ],
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    },{
        POSITION: [7, 7.5, 0.6, 7, 0, 300, 2/3],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [
                "swarm",
                {
                    CONTROLLERS: ["canRepel"],
                },
            ],
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    },);
    Class.bastion = makeRotated({
        PARENT: ["genericTank"],
        DANGER: 8,
        STAT_NAMES: statnames.generic,
        BODY: {
            SPEED: 0.8 * base.SPEED,
            FOV: 1.2 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [7, 7.5, 0.6, 7, 0, 60, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm]),
                    TYPE: [
                        "autoswarm",
                        {
                            CONTROLLERS: [/*"canRepel"*/],
                        },
                    ],
                    STAT_CALCULATOR: gunCalcNames.swarm,
                },
            },
            {
                POSITION: [14, 9, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [4, 9, 1.5, 14, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [7, 7.5, 0.6, 7, 0, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm]),
                    TYPE: [
                        "swarm",
                        {
                            CONTROLLERS: ["canRepel"],
                        },
                    ],
                    STAT_CALCULATOR: gunCalcNames.swarm,
                },
            },
        ],
    }, "Bastion", 3);
    Class.refuge = makeAuto(makeRotated({
        PARENT: ["genericTank"],
        DANGER: 7,
        STAT_NAMES: statnames.generic,
        BODY: {
            SPEED: 0.8 * base.SPEED,
            FOV: 1.2 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [14, 9, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [4, 9, 1.5, 14, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    }, "", 6, 0.5), "Refuge");
    Class.refuge.GUNS.push({//swarms
        POSITION: [7, 7.5, 0.6, 7, 0, 60, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [
                "swarm",
                {
                    CONTROLLERS: ["canRepel"],
                },
            ],
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    },{
        POSITION: [7, 7.5, 0.6, 7, 0, 180, 1/3],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [
                "swarm",
                {
                    CONTROLLERS: ["canRepel"],
                },
            ],
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    },{
        POSITION: [7, 7.5, 0.6, 7, 0, 300, 2/3],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [
                "swarm",
                {
                    CONTROLLERS: ["canRepel"],
                },
            ],
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    },);
    Class.stronghold = makeRotated({
        PARENT: ["genericTank"],
        DANGER: 8,
        STAT_NAMES: statnames.generic,
        BODY: {
            SPEED: 0.8 * base.SPEED,
            FOV: 1.2 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [14, 9, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [4, 9, 1.5, 14, 0, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    }, "Stronghold", 4);
    Class.stronghold.GUNS.push({
        POSITION: [7, 7.5, 0.6, 7, 0, 45, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [
                "swarm",
                {
                    CONTROLLERS: ["canRepel"],
                },
            ],
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    },{
        POSITION: [7, 7.5, 0.6, 7, 0, 135, 0.25],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [
                "swarm",
                {
                    CONTROLLERS: ["canRepel"],
                },
            ],
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    },{
        POSITION: [7, 7.5, 0.6, 7, 0, 225, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [
                "swarm",
                {
                    CONTROLLERS: ["canRepel"],
                },
            ],
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    },{
        POSITION: [7, 7.5, 0.6, 7, 0, 315, 0.75],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: [
                "swarm",
                {
                    CONTROLLERS: ["canRepel"],
                },
            ],
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    },);
    Class.bunker = makeRotated({
        PARENT: ["genericTank"],
        DANGER: 8,
        STAT_NAMES: statnames.generic,
        BODY: {
            SPEED: 0.8 * base.SPEED,
            FOV: 1.2 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [4, 7, 1, 11, 0, 0, 0],
            },
            {
                POSITION: [12.5, 10, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [3, 7, 1.9, 15, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap]),
                    TYPE: "mechTrap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [7, 7.5, 0.6, 7, 0, 60, 0],// missing spiral on swarm spawns
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm]),
                    TYPE: [
                        "swarm",
                        {
                            CONTROLLERS: ["canRepel"],
                        },
                    ],
                    STAT_CALCULATOR: gunCalcNames.swarm,
                },
            },
        ],
    }, "Bunker", 3);
    Class.fortdrive = makeDriveSwarm(Class.fortress, "Fortdrive");
    Class.turretedSwarm = makeAuto(Class.swarm, "Auto-Swarm", { ...Class.droneAutoTurret, independent: true });
    Class.turretedAutoswarm = makeAuto(Class.autoswarm, "Auto-Swarm", { ...Class.droneAutoTurret, independent: true });
    Class.triangleDeco = makeDeco(3);
    Class.palisade = makeRotated({
        PARENT: ["genericTank"],
        DANGER: 8,
        STAT_NAMES: statnames.generic,
        BODY: {
            SPEED: 0.8 * base.SPEED,
            FOV: 1.2 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [14, 9, 1, 0, 0, 240, 0],
            },
            {
                POSITION: [4, 9, 1.5, 14, 0, 240, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [4.5, 7.5, 1, 10.5, 0, 60, 0],
            },
            {
                POSITION: [1, 9, 1, 15, 0, 60, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory, g.swarm]),
                    TYPE: "tinyMinion",
                    STAT_CALCULATOR: gunCalcNames.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                },
            },
            {
                POSITION: [11.5, 9, 1, 0, 0, 60, 0],
            },
        ],
    }, "Palisade", 3);
    Class.outpost = makeRotated({
        PARENT: ["genericTank"],
        DANGER: 8,
        STAT_NAMES: statnames.generic,
        BODY: {
            SPEED: 0.8 * base.SPEED,
            FOV: 1.2 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [14, 9, 1, 0, 0, 240, 0],
            },
            {
                POSITION: [4, 9, 1.5, 14, 0, 240, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [7, 9, 0.6, 7, 0, 60, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.pound]),
                    TYPE: [
                        "swarm",
                        {
                            CONTROLLERS: ["canRepel"],
                        },
                    ],
                    STAT_CALCULATOR: gunCalcNames.swarm,
                },
            },
        ],
    }, "Outpost", 3);
    Class.doperSwarm = makeFast(Class.swarm, 1.3, "Swarm");
    Class.fortalice = makeRotated({
        PARENT: ["genericTank"],
        DANGER: 8,
        STAT_NAMES: statnames.generic,
        BODY: {
            SPEED: 0.8 * base.SPEED,
            FOV: 1.2 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [14, 9, 1, 0, 0, 240, 0],
            },
            {
                POSITION: [4, 9, 1.5, 14, 0, 240, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    }, "Fortalice", 3);
    Class.fortalice.GUNS.push({
        POSITION: [7, 7.5, 0.6, 7, 0, 60, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.pound]),
            TYPE: [
                "doperSwarm",
                {
                    CONTROLLERS: ["canRepel"],
                },
            ],
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    },
    {
        POSITION: [10, 2.5, 0, 7, 0, 60, 0],
    },{
        POSITION: [7, 7.5, 0.6, 7, 0, 180, 1/3],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.pound]),
            TYPE: [
                "doperSwarm",
                {
                    CONTROLLERS: ["canRepel"],
                },
            ],
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    },
    {
        POSITION: [10, 2.5, 0, 7, 0, 180, 1/3],
    },{
        POSITION: [7, 7.5, 0.6, 7, 0, 300, 2/3],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.pound]),
            TYPE: [
                "doperSwarm",
                {
                    CONTROLLERS: ["canRepel"],
                },
            ],
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    },
    {
        POSITION: [10, 2.5, 0, 7, 0, 300, 2/3],
    },);
    Class.megaHexaTrapper = makeAuto(makeRotated({
        PARENT: ["genericTank"],
        DANGER: 8,
        STAT_NAMES: statnames.generic,
        BODY: {
            SPEED: 0.8 * base.SPEED,
            FOV: 1.2 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [14, 9, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [4, 9, 1.5, 14, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    }, "", 6, 0.5), "Mega Hexa-Trapper", { type: "megaAutoTurret", independent: true });
    Class.autoHexaTrapper = makeRotated({// weird naming
        PARENT: ["genericTank"],
        DANGER: 8,
        STAT_NAMES: statnames.generic,
        BODY: {
            SPEED: 0.8 * base.SPEED,
            FOV: 1.2 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [14, 9, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [4, 9, 1.5, 14, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
        TURRETS: [// make rotated does not affect turrets
            {
                TYPE: "autoTurret",
                independent: true,
                POSITION: [10, 6.25, 0, 0, 120, 1],
            },
            {
                TYPE: "autoTurret",
                independent: true,
                POSITION: [10, 6.25, 0, 120, 120, 1],
            },
            {
                TYPE: "autoTurret",
                independent: true,
                POSITION: [10, 6.25, 0, 240, 120, 1],
            }
        ],
    }, "Auto-Hexa-Trapper", 6, 0.5);
    Class.hexaMachine = makeAuto(makeRotated({
        PARENT: ["genericTank"],
        DANGER: 8,
        STAT_NAMES: statnames.generic,
        BODY: {
            SPEED: 0.8 * base.SPEED,
            FOV: 1.2 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [15, 7, 1.6, 0, 0, 0, 0],
            },
            {
                POSITION: [3, 11.2, 1.487, 15, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.hexatrap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    }, "", 6, 0.5), "Hexa Machine");
    Class.octoTrapper = makeAuto(makeRotated({
        PARENT: ["genericTank"],
        DANGER: 8,
        STAT_NAMES: statnames.generic,
        BODY: {
            SPEED: 0.8 * base.SPEED,
            FOV: 1.2 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [15, 7, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    }, "", 8, 0.5), "Octo Trapper");
    Class.cozen = makeAuto(makeRotated({
        PARENT: ["genericTank"],
        DANGER: 8,
        STAT_NAMES: statnames.generic,
        BODY: {
            SPEED: 0.8 * base.SPEED,
            FOV: 1.2 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [14, 9, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [4, 9, 1.5, 14, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [14, 3.5, 1, 0, 0, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                    TYPE: "bullet",
                },
            },
        ],
    }, "", 6, 0.5), "Cozen");
    Class.coop = makeAuto(makeRotated({
        PARENT: ["genericTank"],
        DANGER: 8,
        STAT_NAMES: statnames.generic,
        BODY: {
            SPEED: 0.8 * base.SPEED,
            FOV: 1.2 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [14, 9, 1, 0, 0, 60, 0],
            },
            {
                POSITION: [4, 9, 1.5, 14, 0, 60, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [18, 7.5, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [12, 7, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [3, 7, 1.7, 12, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    }, "", 3, 0.5), "Coop");
    Class.hexaMech = makeAuto(makeRotated({
        PARENT: ["genericTank"],
        DANGER: 8,
        STAT_NAMES: statnames.generic,
        BODY: {
            SPEED: 0.8 * base.SPEED,
            FOV: 1.2 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [4, 7, 1, 11, 0, 0, 0],
            },
            {
                POSITION: [12.5, 10, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [3, 7, 1.9, 15, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: "mechTrap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    }, "", 6, 0.5), "Hexa-Mech");
    Class.hexaTrapGuard = makeAuto({
        PARENT: ["genericTank"],
        DANGER: 7,
        BODY: {
            SPEED: 0.8 * base.SPEED,
        },
        STAT_NAMES: statnames.trap,
        HAS_NO_RECOIL: true,
        GUNS: [
            {
                POSITION: [15, 7, 1, 0, 0, 1/7*360, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 1/7*360, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 2/7*360, 0.5],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 2/7*360, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 3/7*360, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 3/7*360, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 4/7*360, 0.5],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 4/7*360, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 5/7*360, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 5/7*360, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 6/7*360, 0.5],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 6/7*360, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [20, 8, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                    TYPE: "bullet",
                },
            },
        ],
    }, "Hexa-Trap Guard");
    Class.band = makeAuto(makeRotated({
        PARENT: ["genericTank"],
        DANGER: 8,
        STAT_NAMES: statnames.trap,
        GUNS: [
            {
                POSITION: [15, 7, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.flank]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
        TURRETS: [
            {
                POSITION: [11, 8, 0, 60, 190, 0],
                TYPE: "autoTankGun",
            },
            {
                POSITION: [11, 8, 0, 180, 190, 0],
                TYPE: "autoTankGun",
            },
            {
                POSITION: [11, 8, 0, 300, 190, 0],
                TYPE: "autoTankGun",
            },
        ],
    }, "", 3, 0), "Band");
    Class.nonaTrapper = makeRotated({
        PARENT: ["genericTank"],
        DANGER: 7,
        BODY: {
            SPEED: base.SPEED * 0.8,
        },
        STAT_NAMES: statnames.trap,
        HAS_NO_RECOIL: true,
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [15, 7, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ]
    }, "Nona-Trapper", 9);
    Class.septaMachine = makeRotated({
        PARENT: ["genericTank"],
        DANGER: 7,
        BODY: {
            SPEED: base.SPEED * 0.8,
        },
        STAT_NAMES: statnames.trap,
        HAS_NO_RECOIL: true,
        GUNS: [
            {
                POSITION: [15, 7, 1.3, 0, 0, 0, 0],
            },
            {
                POSITION: [3, 9.1, 1.5, 15, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.hexatrap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ]
    }, "Septa-Machine", 7);
    Class.whirlwindAR = makeRotated({
        PARENT: ["genericTank"],
        DANGER: 8,
        BODY: {
            SPEED: base.SPEED * 0.8,
        },
        STAT_NAMES: statnames.trap,
        HAS_NO_RECOIL: true,
        GUNS: [
            {
                POSITION: [13, 3.5, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [3, 3.5, 1.7, 13, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.gunner, g.morespeed, {shudder: 0.7}]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ]
    }, "Whirlwind", 12, 0.25);
    Class.septaMech = makeRotated({
        PARENT: ["genericTank"],
        STAT_NAMES: statnames.trap,
        GUNS: [
            {
                POSITION: [4, 7, 1, 11, 0, 0, 0],
            },
            {
                POSITION: [12.5, 10, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [3, 7, 1.9, 15, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: "mechTrap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    }, "Septa-Mech", 7, 1/7);
    Class.septaTrapGuard = {
        PARENT: ["genericTank"],
        LABEL: "Septa-Trap Guard",
        DANGER: 7,
        BODY: {
            SPEED: 0.8 * base.SPEED,
        },
        STAT_NAMES: statnames.trap,
        HAS_NO_RECOIL: true,
        GUNS: [
            {
                POSITION: [15, 7, 1, 0, 0, 1/8*360, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 1/8*360, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 2/8*360, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 2/8*360, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 3/8*360, 0.5],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 3/8*360, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 4/8*360, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 4/8*360, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 5/8*360, 0.5],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 5/8*360, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 6/8*360, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 6/8*360, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 7/8*360, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 7/8*360, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [20, 8, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                    TYPE: "bullet",
                },
            },
        ],
    };
    Class.encircler = {
        PARENT: ["genericTank"],
        LABEL: "Encircler",
        STAT_NAMES: statnames.trap,
        GUNS: [
            {
                POSITION: [21, 7.5, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [15, 7, 1.6, 0, 0, 0, 0],
            },
            {
                POSITION: [3, 11.2, 1.487, 15, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.triEncircler = makeRotated(Class.encircler, "Tri-Encircler", 3);
    Class.operator = {
        PARENT: ["genericTank"],
        LABEL: "Operator",
        STAT_NAMES: statnames.trap,
        GUNS: [
            {
                POSITION: [21, 7.5, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [4, 7, 1, 11, 0, 0, 0],
            },
            {
                POSITION: [12.5, 10, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [3, 7, 1.9, 15, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap]),
                    TYPE: "mechTrap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.triOperator = makeRotated(Class.operator, "Tri-Operator", 3);
    Class.triIncarcerator = {
        PARENT: ["genericTank"],
        LABEL: "Tri-Incarcerator",
        STAT_NAMES: statnames.trap,
        GUNS: [
            {
                POSITION: [20, 8, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [18, 7.5, 1, 0, 0, 90, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 90, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 90, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.flank]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [18, 7.5, 1, 0, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.flank]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [18, 7.5, 1, 0, 0, 270, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 270, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 270, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.flank]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.machineMech = {
        PARENT: ["genericTank"],
        LABEL: "Machine Mech",
        STAT_NAMES: statnames.trap,
        GUNS: [
            {
                POSITION: [4, 7, 1, 10, 0, 0, 0],
            },
            {
                POSITION: [11.5, 10, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [4, 7, 1.9, 14, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach]),
                    TYPE: "mechTrap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.triMachineMech = makeRotated(Class.machineMech, "Tri-Machine Mech", 3);
    Class.triMechGuard = {
        PARENT: ["genericTank"],
        LABEL: "Tri-Mech Guard",
        STAT_NAMES: statnames.trap,
        GUNS: [
            {
                POSITION: [20, 8, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [4, 7, 1, 11, 0, 90, 0],
            },
            {
                POSITION: [12.5, 10, 1, 0, 0, 90, 0],
            },
            {
                POSITION: [3, 7, 1.9, 15, 0, 90, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.flank]),
                    TYPE: "mechTrap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [4, 7, 1, 11, 0, 180, 0],
            },
            {
                POSITION: [12.5, 10, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [3, 7, 1.9, 15, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.flank]),
                    TYPE: "mechTrap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [4, 7, 1, 11, 0, 270, 0],
            },
            {
                POSITION: [12.5, 10, 1, 0, 0, 270, 0],
            },
            {
                POSITION: [3, 7, 1.9, 15, 0, 270, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.flank]),
                    TYPE: "mechTrap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.triMachineGuard = {
        PARENT: ["genericTank"],
        LABEL: "Tri-Machine Guard",
        STAT_NAMES: statnames.trap,
        GUNS: [
            {
                POSITION: [20, 8, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [15, 7, 1.6, 0, 0, 90, 0],
            },
            {
                POSITION: [3, 11.2, 1.487, 15, 0, 90, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.flank]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1.6, 0, 0, 180, 0],
            },
            {
                POSITION: [3, 11.2, 1.487, 15, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.flank]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1.6, 0, 0, 270, 0],
            },
            {
                POSITION: [3, 11.2, 1.487, 15, 0, 270, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.flank]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.dieselTrapper = {
        PARENT: ["genericTank"],
        LABEL: "Diesel Trapper",
        STAT_NAMES: statnames.trap,
        GUNS: [
            {
                POSITION: [17.8125, 7, 1.9, 0, 0, 0, 0],
            },
            {
                POSITION: [3, 13.3, 1.487, 17.8125, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.mach, {size: 7/13.3}]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.triDieselTrapper = makeRotated(Class.dieselTrapper, "Diesel Trapper", 3);
    Class.triBushwhacker = {
        PARENT: ["genericTank"],
        LABEL: "Tri-Bushwhacker",
        STAT_NAMES: statnames.trap,
        GUNS: [
            {
                POSITION: [20, 8, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 90, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 90, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.flank]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.flank]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 270, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 270, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.flank]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.gunnerTriTrapper = {
        PARENT: ["genericTank"],
        LABEL: "Gunner Tri-Trapper",
        DANGER: 7,
        STAT_NAMES: statnames.generic,
        BODY: {
            FOV: 1.25 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [19, 2, 1, 0, -2.5, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.gunner,
                        g.power,
                        g.twin,
                        g.tonsmorrecoil,
                        g.lotsmorrecoil,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [19, 2, 1, 0, 2.5, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.gunner,
                        g.power,
                        g.twin,
                        g.tonsmorrecoil,
                        g.lotsmorrecoil,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [12, 11, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [13, 11, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [4, 11, 1.7, 13, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.fast]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [13, 11, 1, 0, 0, 90, 0],
            },
            {
                POSITION: [4, 11, 1.7, 13, 0, 90, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.fast]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [13, 11, 1, 0, 0, 270, 0],
            },
            {
                POSITION: [4, 11, 1.7, 13, 0, 270, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.fast]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.quadwark = {
        PARENT: ["genericTank"],
        LABEL: "Quadwark",
        STAT_NAMES: statnames.generic,
        DANGER: 7,
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [20, 8, 1, 0, 5.5, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                    TYPE: "bullet",
                },
            },
            {
                /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                    TYPE: "bullet",
                },
            },
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, 5.5, 185, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, 5.5, 185, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, -5.5, 175, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, -5.5, 175, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, 5.5, 90, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, 5.5, 90, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, -5.5, 270, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, -5.5, 270, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.triPeashooter = {
        PARENT: ["genericTank"],
        LABEL: "Tri-Peashooter",
        STAT_NAMES: statnames.trap,
        GUNS: [
            {
                POSITION: [20, 8, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm]),
                    TYPE: ["autoswarm"],
                    STAT_CALCULATOR: gunCalcNames.swarm,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 90, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 90, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.flank]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.flank]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 270, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 270, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.flank]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.peashooter = {
        PARENT: ["genericTank"],
        LABEL: "Peashooter",
        STAT_NAMES: statnames.generic,
        DANGER: 7,
        GUNS: [
            {
                POSITION: [20, 8, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm]),
                    TYPE: ["autoswarm"],
                    STAT_CALCULATOR: gunCalcNames.swarm,
                },
            },
            {
                POSITION: [13, 8, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [4, 8, 1.7, 13, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.incarcerator = {
        PARENT: ["genericTank"],
        LABEL: "Incarcerator",
        STAT_NAMES: statnames.trap,
        GUNS: [
            {
                POSITION: [20, 8, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [18, 7.5, 1, 0, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.mechGuard = {
        PARENT: ["genericTank"],
        LABEL: "Mech Guard",
        STAT_NAMES: statnames.generic,
        DANGER: 7,
        GUNS: [
            {
                POSITION: [20, 8, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [4, 7, 1, 11, 0, 180, 0],
            },
            {
                POSITION: [12.5, 10, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [3, 7, 1.9, 15, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap]),
                    TYPE: "mechTrap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.autoTrapGuard = makeAuto(Class.trapGuard);
    Class.machineGuard = {
        PARENT: ["genericTank"],
        LABEL: "Machine Guard",
        STAT_NAMES: statnames.generic,
        DANGER: 7,
        GUNS: [
            {
                POSITION: [20, 8, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [15, 7, 1.6, 0, 0, 180, 0],
            },
            {
                POSITION: [3, 11.2, 1.487, 15, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, {size: 7/11.2}]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.garrison = {
        PARENT: ["genericTank"],
        LABEL: "Garrison",
        STAT_NAMES: statnames.generic,
        DANGER: 7,
        GUNS: [
            {
                POSITION: [20, 8, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [15, 14, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [6, 14, 1.7, 15, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.destroy]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.maw = {
        PARENT: ["genericTank"],
        LABEL: "Maw",
        STAT_NAMES: statnames.generic,
        DANGER: 7,
        GUNS: [
            {
                POSITION: [20, 8, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic]),
                    TYPE: "bullet",
                },
            },
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [24, 8, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [4, 8, 1.3, 22, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [4, 8, 1.3, 18, 0, 180, 1/3],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [4, 8, 1.3, 14, 0, 180, 2/3],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.overTrapGuard = makeOversplit(Class.trapGuard);
    Class.custodian = {
        PARENT: ["genericTank"],
        LABEL: "Custodian",
        STAT_NAMES: statnames.generic,
        DANGER: 7,
        GUNS: [
            {
                POSITION: [19, 8, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [5.5, 8, -1.8, 6.5, 0, 0, 0],
            },
            {
                POSITION: [13, 8, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [4, 8, 1.7, 13, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.executor = makeGuard(Class.assassin, "Executor");
    Class.executor.UPGRADES_TIER_3 = [];
    Class.anchor = {
        PARENT: ["genericTank"],
        LABEL: "Anchor",
        STAT_NAMES: statnames.generic,
        DANGER: 8,
        GUNS: [
            {
                POSITION: [24, 8.5, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [15, 7, 1.6, 0, 0, 180, 0],
            },
            {
                POSITION: [3, 11.2, 1.487, 15, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, {size: 7/11.2}]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.butcher = makeGuard(Class.hunter, "Butcher");
    Class.butcher.UPGRADES_TIER_3 = [];
    Class.tommy = makeGuard(Class.minigun, "Tommy");
    Class.tommy.UPGRADES_TIER_3 = [];
    Class.ransacker = makeGuard(Class.rifle, "Ransacker");
    Class.ransacker.UPGRADES_TIER_3 = [];
    Class.raider = {
        PARENT: ["genericTank"],
        LABEL: "Raider",
        BODY: {
            DENSITY: base.DENSITY * 0.6,
        },
        DANGER: 8,
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [24, 8, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.sniper]),
                    TYPE: "bullet",
                    LABEL: "Front",
                },
            },
            {
                POSITION: [18, 8, 1, 0, 0, 130, 0.1],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                    TYPE: "bullet",
                    LABEL: "Wing",
                },
            },
            {
                POSITION: [18, 8, 1, 0, 0, 230, 0.1],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                    TYPE: "bullet",
                    LABEL: "Wing",
                },
            },
            {
                POSITION: [13, 8, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [4, 8, 1.7, 13, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.molder = {
        PARENT: ["genericTank"],
        LABEL: "Molder",
        STAT_NAMES: statnames.generic,
        DANGER: 8,
        GUNS: [
            {
                POSITION: [24, 8.5, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [18, 12, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [2, 12, 1.1, 18, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "setTrap",
                },
            },
        ],
    };
    Class.thrasher = {
        PARENT: ["genericTank"],
        LABEL: "Thrasher",
        STAT_NAMES: statnames.generic,
        DANGER: 8,
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [20, 8, 1, 0, 5.5, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.twin, g.sniper]),
                    TYPE: "bullet",
                },
            },
            {
                /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.twin, g.sniper]),
                    TYPE: "bullet",
                },
            },
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, 5.5, 185, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, 5.5, 185, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, -5.5, 175, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, -5.5, 175, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.autoBushwhacker = makeAuto(Class.bushwhacker);
    Class.blowgun = {
        PARENT: ["genericTank"],
        LABEL: "Blowgun",
        STAT_NAMES: statnames.generic,
        DANGER: 8,
        GUNS: [
            {
                POSITION: [24, 8.5, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm]),
                    TYPE: ["autoswarm"],
                    STAT_CALCULATOR: gunCalcNames.swarm,
                },
            },
            {
                POSITION: [13, 8, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [4, 8, 1.7, 13, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            }
        ],
    };
    Class.lockup = {
        PARENT: ["genericTank"],
        LABEL: "Lockup",
        STAT_NAMES: statnames.generic,
        DANGER: 8,
        GUNS: [
            {
                POSITION: [24, 8.5, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [18, 7.5, 1, 0, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [12, 7, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [3, 7, 1.7, 12, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.watchman = {
        PARENT: ["genericTank"],
        LABEL: "Watchman",
        STAT_NAMES: statnames.generic,
        DANGER: 8,
        GUNS: [
            {
                POSITION: [24, 8.5, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [4, 7, 1, 11, 0, 180, 0],
            },
            {
                POSITION: [12.5, 10, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [3, 7, 1.9, 15, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap]),
                    TYPE: "mechTrap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.triTrapGuardMerger = {
        PARENT: ["genericTank"],
        GUNS: [
            {
                POSITION: [15, 7, 1, 0, 0, 90, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 90, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.flank]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.flank]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 270, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 270, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.flank]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.weirdTrapGunner = {
        // For use with machete combos only.
        PARENT: ["genericTank"],
        GUNS: [
            {
                POSITION: [15, 2, 1, 0, -2.5, 0, 0],
            },
            {
                POSITION: [4, 2, 1.5, 15, -2.5, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.trap,
                        g.gunner,
                        g.power,
                        g.twin,
                        g.slow,
                        g.flank,
                        g.lotsmorrecoil,
                    ]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 2, 1, 0, 2.5, 0, 0.5],
            },
            {
                POSITION: [4, 2, 1.5, 15, 2.5, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.trap,
                        g.gunner,
                        g.power,
                        g.twin,
                        g.slow,
                        g.flank,
                        g.lotsmorrecoil,
                    ]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [12, 11, 1, 0, 0, 0, 0],
            },
        ],
    };
    Class.gunnerTrapperBackMerger = {
        PARENT: ["genericTank"],
        // 1.25x fov
        GUNS: [
            {
                POSITION: [13, 11, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [4, 11, 1.7, 13, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.fast, g.halfrecoil]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.backMachineTrapper = {
        PARENT: ["genericTank"],
        GUNS: [
            {
                POSITION: [15, 7, 1.6, 0, 0, 180, 0],
            },
            {
                POSITION: [3, 11.2, 1.487, 15, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, {size: 7/11.2}]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.cleaver = merge(Class.weirdTrapGunner, Class.gunnerTrapperBackMerger, "Cleaver");
    Class.cleaver.BODY = {
        FOV: 1.25 * base.FOV,
    };
    Class.cleaver.STAT_NAMES = statnames.trap;
    Class.vallation = merge(Class.weirdGunner, Class.backMachineTrapper, "Vallation");
    Class.vallation.BODY = {
        FOV: 1.25 * base.FOV,
    };
    Class.rimgunnerMerger = {
        PARENT: ["genericTank"],
        GUNS: [
            {
                POSITION: [19, 2, 1, 0, -2.5, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.gunner,
                        g.power,
                        g.twin,
                        g.slow,
                        g.flank,
                        g.morerecoil,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [19, 2, 1, 0, 2.5, 0, 0.25],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.gunner,
                        g.power,
                        g.twin,
                        g.slow,
                        g.flank,
                        g.morerecoil,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [12, 2, 1, 0, -6.5, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.gunner,
                        g.power,
                        g.twin,
                        g.slow,
                        g.flank,
                        g.morerecoil,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [12, 2, 1, 0, 6.5, 0, 0.75],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        g.basic,
                        g.gunner,
                        g.power,
                        g.twin,
                        g.slow,
                        g.flank,
                        g.morerecoil,
                    ]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [12, 11, 1, 0, 0, 0, 0],
            },
        ],
    };
    Class.builderBackMerger = {
        PARENT: ["genericTank"],
        GUNS: [
            {
                POSITION: [18, 12, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [2, 12, 1.1, 18, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                    TYPE: "setTrap",
                },
            },
        ],
    };
    Class.megaTrapperBackMerger = {
        PARENT: ["genericTank"],
        GUNS: [
            {
                POSITION: [11, 14, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [6, 14, 1.7, 11, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.destroy]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.lure = merge(Class.rimgunnerMerger, Class.gunnerTrapperBackMerger, "Lure");
    Class.lure.BODY = {
        FOV: 1.25 * base.FOV,
    };
    Class.tacker = merge(Class.nailgun, Class.gunnerTrapperBackMerger, "Tacker");
    Class.tacker.BODY = {
        FOV: 1.25 * base.FOV,
    };
    Class.autoGunnerTrapper = makeAuto(Class.gunnerTrapper);
    Class.gunnerBuilder = merge(Class.weirdGunner, Class.builderBackMerger, "Lure");
    Class.gunnerBuilder.BODY = {
        FOV: 1.2 * base.FOV,
        SPEED: 0.8 * base.SPEED,
    };
    Class.oracle = makeOver(Class.gunnerTrapper, "Oracle");
    Class.gunnerPen = merge(Class.weirdGunner, {
        PARENT: ["genericTank"],
        // 1.25x fov
        GUNS: [
            {
                POSITION: [20, 7.5, 1, 0, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [13, 11, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [4, 11, 1.7, 13, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.fast, g.halfrecoil]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    },"Gunner Pen");
    Class.gunnerMech = merge(Class.weirdGunner, {
        PARENT: ["genericTank"],
        GUNS: [
            {
                POSITION: [13, 11/10*7, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [12, 11, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [3, 11/10*7, 1.9, 14, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap]),
                    TYPE: "mechTrap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    },"Gunner Mech");
    Class.lavisher = merge(Class.weirdGunner, Class.megaTrapperBackMerger, "Lavisher");
    Class.weakarchitectGun = {
        PARENT: ["genericTank"],
        LABEL: "",
        COLOR: 16,
        GUNS: [
            {
                POSITION: [20, 16, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [2, 16, 1.1, 20, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.auto, g.hexatrap]),
                    TYPE: "setTrap",
                },
            },
        ],
    };
    Class.bomberBody = {
        PARENT: ["genericTank"],
        LABEL: "Bomber",
        BODY: {
            DENSITY: base.DENSITY * 0.6,
        },
        DANGER: 7,
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [20, 8, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                    TYPE: "bullet",
                    LABEL: "Front",
                },
            },
            {
                POSITION: [18, 8, 1, 0, 0, 130, 0.1],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                    TYPE: "bullet",
                    LABEL: "Wing",
                },
            },
            {
                POSITION: [18, 8, 1, 0, 0, 230, 0.1],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                    TYPE: "bullet",
                    LABEL: "Wing",
                },
            },
        ],
    };
    Class.blockbuster = merge(Class.bomberBody, Class.builderBackMerger, "Blockbuster");
    Class.shiver = merge(Class.bomberBody, Class.backMachineTrapper, "Shiver");
    Class.striker = {
        PARENT: ["genericTank"],
        LABEL: "Striker",
        STAT_NAMES: statnames.generic,
        DANGER: 8,
        GUNS: [
            {
                POSITION: [18, 8, 1, 0, 0, 130, 0.1],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                    TYPE: "bullet",
                    LABEL: "Wing",
                },
            },
            {
                POSITION: [18, 8, 1, 0, 0, 230, 0.1],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                    TYPE: "bullet",
                    LABEL: "Wing",
                },
            },
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [20, 8, 1, 0, 5.5, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.twin]),
                    TYPE: "bullet",
                },
            },
            {
                /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.twin]),
                    TYPE: "bullet",
                },
            },
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, 5.5, 185, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, 5.5, 185, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, -5.5, 175, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, -5.5, 175, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.fighterArms = {
        PARENT: ["genericTank"],
        LABEL: "Fighter",
        BODY: {
            DENSITY: 0.6 * base.DENSITY,
        },
        DANGER: 7,
        GUNS: [
            {
                POSITION: [16, 8, 1, 0, -1, 90, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                    TYPE: "bullet",
                    LABEL: "Side",
                },
            },
            {
                POSITION: [16, 8, 1, 0, 1, -90, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                    TYPE: "bullet",
                    LABEL: "Side",
                },
            },
        ],
    };
    Class.blitz = merge(Class.bomber, Class.fighterArms, "Blitz");
    Class.assaulter = {
        PARENT: ["genericTank"],
        LABEL: "Assaulter",
        BODY: {
            DENSITY: base.DENSITY * 0.6,
        },
        DANGER: 7,
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [20, 8, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                    TYPE: "bullet",
                    LABEL: "Front",
                },
            },
            {
                POSITION: [15, 8, 1, 0, 0, 125, 0.1],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                    TYPE: "bullet",
                    LABEL: "Wing",
                },
            },
            {
                POSITION: [15, 8, 1, 0, 0, 235, 0.1],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                    TYPE: "bullet",
                    LABEL: "Wing",
                },
            },
            {
                POSITION: [18, 8, 1, 0, 0, 135, 0.6],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                    TYPE: "bullet",
                    LABEL: "Wing",
                },
            },
            {
                POSITION: [18, 8, 1, 0, 0, 225, 0.6],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                    TYPE: "bullet",
                    LABEL: "Wing",
                },
            },
            {
                POSITION: [13, 8, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [4, 8, 1.7, 13, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.autoBomber = makeAuto(Class.bomber);
    Class.sideSwarm = {// 1/2 battleship equivalent
        PARENT: ["genericTank"],
        LABEL: "Swarm",
        DANGER: 7,
        STAT_NAMES: statnames.swarm,
        FACING_TYPE: "locksFacing",
        BODY: {
            FOV: base.FOV * 1.2,
        },
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [7, 8, 0.6, 7, 0, -90, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm]),
                    TYPE: "autoswarm",
                    STAT_CALCULATOR: gunCalcNames.swarm,
                },
            },
            {
                POSITION: [7, 8, 0.6, 7, 0, 90, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm]),
                    TYPE: "autoswarm",
                    STAT_CALCULATOR: gunCalcNames.swarm,
                },
            },
        ],
    };
    Class.frontSwarm = {// 1/2 cruiser equivalent
        PARENT: ["genericTank"],
        LABEL: "Swarm",
        DANGER: 7,
        STAT_NAMES: statnames.swarm,
        FACING_TYPE: "locksFacing",
        BODY: {
            FOV: base.FOV * 1.2,
        },
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [7, 8, 0.6, 7, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm]),
                    TYPE: "swarm",
                    STAT_CALCULATOR: gunCalcNames.swarm,
                },
            },
        ],
    };
    Class.rider = merge(Class.bomber, Class.sideSwarm, "Rider");
    Class.whizzer = merge(Class.bomber, Class.frontSwarm, "Whizzer");
    Class.penBackMerger = {
        PARENT: ["genericTank"],
        LABEL: "Pen",
        BODY: {
            FOV: 1.2 * base.FOV,
        },
        GUNS: [
            {
                POSITION: [18, 7.5, 1, 0, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [12, 7, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [3, 7, 1.7, 12, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.mechBackMerger = {
        PARENT: ["genericTank"],
        LABEL: "Mech",
        STAT_NAMES: statnames.trap,
        GUNS: [
            {
                POSITION: [4, 7, 1, 11, 0, 180, 0],
            },
            {
                POSITION: [12.5, 10, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [3, 7, 1.9, 15, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap]),
                    TYPE: "mechTrap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.nuker = merge(Class.bomberBody, Class.penBackMerger, "Nuker");
    Class.bolter = merge(Class.bomberBody, Class.mechBackMerger, "Bolter");
    Class.frontAuto2 = {
        PARENT: ["genericTank"],
        LABEL: "Auto-2",
        TURRETS: [
            {
                POSITION: [11, 8, 0, -45, 190, 0],
                TYPE: "autoTankGun",
            },
            {
                POSITION: [11, 8, 0, 45, 190, 0],
                TYPE: "autoTankGun",
            },
        ],
    };
    Class.fleeter = merge({
        PARENT: ["genericTank"],
        LABEL: "Bomber",
        BODY: {
            DENSITY: base.DENSITY * 0.6,
        },
        DANGER: 7,
        GUNS: [
            {
                POSITION: [18, 8, 1, 0, 0, 130, 0.1],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                    TYPE: "bullet",
                    LABEL: "Wing",
                },
            },
            {
                POSITION: [18, 8, 1, 0, 0, 230, 0.1],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                    TYPE: "bullet",
                    LABEL: "Wing",
                },
            },
            {
                POSITION: [13, 8, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [4, 8, 1.7, 13, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    }, Class.frontAuto2, "Fleeter");
    Class.parapet = reflect({
        PARENT: ["genericTank"],
        STAT_NAMES: statnames.generic,
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [20, 8, 1, 0, 5.5, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.twin]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [16, 11, 1, 0, 4.75, 190, 0],
            },
            {
                POSITION: [2, 11, 1.1, 16, 4.75, 190, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.auto]),
                    TYPE: "setTrap",
                },
            },
        ],
    }, "Parapet");
    Class.partition = reflect({
        PARENT: ["genericTank"],
        STAT_NAMES: statnames.generic,
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [20, 8, 1, 0, 5.5, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.twin]),
                    TYPE: "bullet",
                },
            },
            {
                POSITION: [15, 7, 1.6, 0, 5.5, 185, 0],
            },
            {
                POSITION: [3, 11.2, 1.487, 15, 5.5, 185, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.mach, {size: 7/11.2}]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    }, "Partition");
    Class.dam = merge(Class.gunner, reflect({
        PARENT: ["genericTank"],
        STAT_NAMES: statnames.generic,
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [13, 8, 1, 0, 5.5, 185, 0],
            },
            {
                POSITION: [3, 9, 1.5, 13, 5.5, 185, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    }, ""), "Dam");
    Class.bentBackTraps = {
        BODY: {
            SPEED: base.SPEED * 0.9,
        },
        GUNS: [
            {
                POSITION: [16, 8, 1, 0, -2, 162.5, 0.5],
            },
            {
                POSITION: [3, 7, 1.7, 16, 0, 162.5, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.bent]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [16, 8, 1, 0, 2, 197.5, 0.5],
            },
            {
                POSITION: [3, 7, 1.7, 16, 0, 197.5, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.bent]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [19, 8, 1, 0, 0, 180, 0],
            },
            {
                POSITION: [3, 7, 1.7, 19, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.bent]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
    Class.bentBulwark = merge(Class.tripleShot, Class.bentBackTraps, "Bent Bulwark");
    Class.bentBulwark.UPGRADES_TIER_3 = [];
    Class.autoBulwark = makeAuto(Class.bulwark);

    // lvl 30
    Class.trapper.UPGRADES_TIER_2.push("pen", "mech", "machineTrapper", "wark");
    Class.pen.UPGRADES_TIER_3 = [];
    Class.wark.UPGRADES_TIER_3 = ["waark"];
    Class.trapper.UPGRADES_TIER_3.push("megaTrapper", "sawedOff", "tricker");
    Class.trapGuard.UPGRADES_TIER_3.push("peashooter", "incarcerator", "mechGuard", "autoTrapGuard", "machineGuard", "triTrapGuard", "garrison", "maw", "overTrapGuard", "custodian");
    // lvl 45
    Class.doubleTwin.UPGRADES_TIER_3.push("doubleFlankTwin", "doubleGunner", "warkWark","overDoubleTwin","doubleMusket","doubleDual");
    Class.tripleShot.UPGRADES_TIER_3.push("splitShot");
    Class.splitShot.UPGRADES_TIER_3 = [];
    Class.bushwhacker.UPGRADES_TIER_3 = ["executor", "anchor", "butcher", "tommy", "ransacker", "raider", "molder", "thrasher", "autoBushwhacker", "blowgun", "lockup", "watchman", "triBushwhacker"];
    // remove assembler
    Class.builder.UPGRADES_TIER_3.splice(Class.builder.UPGRADES_TIER_3.indexOf("assembler"), 1)
    Class.builder.UPGRADES_TIER_3.push("forger", "stall", "fashioner", "charger", "blockade");
    Class.triTrapper.UPGRADES_TIER_3.push("triPen", "triMech", "triMachine", "triTrapGuard", "triBarricade", "triMegaTrapper", "warkWarkWark");
    // arms race tier
    Class.doubleFlankTwin.UPGRADES_TIER_3 = ["quadTwin", "tripleFlankTwin", "hewnFlankDouble", "autoDoubleFlankTwin", "bentFlankDouble", "doubleFlankGunner", "hipwatch", "scuffler", "warkwawaWark"];
    Class.doubleGunner.UPGRADES_TIER_3 = ["tripleGunner", "hewnGunner", "autoDoubleGunner", "bentDoubleGunner", "doubleFlankGunner", "doubleNailgun", "doubleMachineGunner", "doubleBattery", "doubleRimfire", "doubleEqualizer"];
    Class.warkWark.UPGRADES_TIER_3 = ["warkWarkWark", "warkwawarkrk", "autoWarkWark", "waarkWaark", "warkwawaWark", "doubleEqualizer", "guardrail", "sealer", "setup"];
    Class.tripleTwin.UPGRADES_TIER_3 = ["quadTwin", "autoTripleTwin", "bentTriple", "hewnTriple","tripleFlankTwin","tripleGunner","warkWarkWark"];
    Class.hewnDouble.UPGRADES_TIER_3 = ["hewnTriple","autoHewnDouble","cleft","skewnDouble","hewnFlankDouble","hewnGunner", "warkwawarkrk"];
    Class.autoDouble.UPGRADES_TIER_3 = ["megaAutoDouble", "tripleAutoDoubleTwin", "autoTripleTwin", "autoHewnDouble", "autoBentDouble", "autoDoubleFlankTwin", "autoDoubleGunner", "autoWarkWark"];
    Class.bentDouble.UPGRADES_TIER_3 = ["bentTriple", "pentaDouble","autoBentDouble","doubleTriplet", "cleft", "doubleSpreadshot", "bentFlankDouble","bentDoubleGunner", "bentDoubleMinigun", "splitDouble", "waarkWaark"];
    Class.construct.UPGRADES_TIER_3 = ["ARassembler", "autoContruct", "mechanic", "recoiler", "mastermind", "overwhelmer", "creator", "hurdle", "meld", "stormer", "settler"];
    Class.autoBuilder.UPGRADES_TIER_3 = ["megaAutoBuilder", "tripleAutoBuilder", "autoConstructor", "autoEngineer", "autoBoomer", "autoConqueror", "autoForger", "autoStall", "autoFashioner", "autoCharger"];
    Class.engineer.UPGRADES_TIER_3 = ["mechanic", "autoEngineer", "parryer", "originator", "vanquisher", "producer", "cubicle", "machinist", "driver", "specialist", "deviser"];
    Class.boomer.UPGRADES_TIER_3 = ["recoiler", "autoBoomer", "parryer", "ricochet", "defeater", "rebounder", "fender", "bentBoomer", "deflector"];
    Class.architect.UPGRADES_TIER_3 = ["mastermind", "originator", "ricochet", "artist", "paddock", "castle", "inventor", "designer", "draftsman", "architectGuard"];
    Class.conqueror.UPGRADES_TIER_3 = ["obliterator", "overwhelmer", "vanquisher", "defeater", "annexer", "blusterer", "autoConqueror", "overthrower", "pulverizer", "overrunner", "massacrer"];
    Class.forger.UPGRADES_TIER_3 = ["creator", "autoForger", "producer", "rebounder", "planner", "annexer", "former", "caster", "bounder", "blend", "shaper", "modeler", "melder"];
    Class.stall.UPGRADES_TIER_3 = ["hurdle", "autoStall", "cubicle", "fender", "paddock", "overthrower", "former", "delayer", "compartment"];
    Class.fashioner.UPGRADES_TIER_3 = ["overbuilder", "stylist", "experimenter", "fashionerdrive", "methodist", "meld", "autoFashioner", "machinist", "deflector", "blend", "delayer", "rallyer"];
    Class.charger.UPGRADES_TIER_3 = ["assailer", "stormer", "autoCharger", "draftsman", "overrunner", "modeler", "compartment", "rallyer", "deviser"];
    Class.fortress.UPGRADES_TIER_3 = ["corral", "donjon", "bastion", "refuge", "castle", "stronghold", "bunker", "fortdrive", "palisade", "outpost", "fortalice"];
    Class.hexaTrapper.UPGRADES_TIER_3 = ["megaHexaTrapper", "autoHexaTrapper", "hexaMachine", "octoTrapper", "designer", "cozen", "refuge", "coop", "hexaMech", "hexaTrapGuard", "band"];
    Class.septaTrapper.UPGRADES_TIER_3 = ["nonaTrapper", "septaMachine", "octoTrapper", "whirlwindAR", "inventor", "septaMech", "septaTrapGuard"];
    Class.triPen.UPGRADES_TIER_3 = ["corral", "triEncircler", "paddock", "coop", "triOperator", "triIncarcerator"];
    Class.triMech.UPGRADES_TIER_3 = ["bunker", "hexaMech", "triMachineMech", "septaMech", "originator", "triOperator", "triMechGuard"];
    Class.triMachine.UPGRADES_TIER_3 = ["septaMachine", "hexaMachine", "donjon", "triEncircler", "triMachineMech", "triDieselTrapper", "triMachineGuard"];
    Class.triTrapGuard.UPGRADES_TIER_3 = ["triBushwhacker", "gunnerTriTrapper", "quadwark", "triPeashooter", "triIncarcerator", "triMechGuard", "triMachineGuard", "hexaTrapGuard", "septaTrapGuard", "architectGuard"];
    Class.gunnerTrapper.UPGRADES_TIER_3 = ["cleaver", "vallation", "lure", "tacker", "autoGunnerTrapper", "gunnerBuilder", "oracle", "gunnerPen", "gunnerMech", "lavisher", "gunnerTriTrapper"];
    Class.bomber.UPGRADES_TIER_3 = ["blockbuster", "shiver", "striker", "raider", "blitz", "assaulter", "autoBomber", "rider", "whizzer", "nuker", "bolter", "fleeter"];
    Class.bulwark.UPGRADES_TIER_3 = ["parapet", "partition", "thrasher", "dam", "striker", "bentBulwark", "autoBulwark"];
};
/*  DONE LIST

TRAPPER DIRECT UPGRADES

DOUBLE TWIN ALL UPGRADES
BUILDER ALL UPGRADES
TRI-TRAPPER ALL UPGRADES

TRAP GUARD DIRECT UPGRADES

BUSHWHACKER ALL UPGRADES
GUNNER TRAPPER ALL UPGRADES
BOMBER ALL UPGRADES
CONQUERER ALL UPGRADES

*/