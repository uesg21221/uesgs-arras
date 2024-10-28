const { makeRare } = require('../../../facilitators.js')
const { base, basePolygonDamage, basePolygonHealth } = require('../../../constants.js')

// eggs
Class.arras_egg = {
    PARENT: "food",
    LABEL: "Egg",
    VALUE: 10,
    SHAPE: 0,
    SIZE: 4.5,
    COLOR: "veryLightGrey",
    INTANGIBLE: true,
    BODY: {
        DAMAGE: 0,
        DENSITY: 2,
        HEALTH: 0.5 * basePolygonHealth,
        PENETRATION: 1,
        PUSHABILITY: 0,
        ACCELERATION: 0.015
    },
    DRAW_HEALTH: false,
};
Class.arras_gem = {
    PARENT: "food",
    LABEL: "Gem",
    VALUE: 2e3,
    SHAPE: 6,
    SIZE: 4.5,
    COLOR: "aqua",
    BODY: {
        DAMAGE: basePolygonDamage / 4,
        DENSITY: 4,
        HEALTH: 10,
        PENETRATION: 2,
        RESIST: 2,
        PUSHABILITY: 0.25,
        ACCELERATION: 0.015
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true,
};
Class.arras_jewel = {
    PARENT: "food",
    LABEL: "Jewel",
    VALUE: 1e5,
    SHAPE: 6,
    SIZE: 8,
    COLOR: "yellow",
    BODY: {
        DAMAGE: basePolygonDamage / 4,
        DENSITY: 4,
        HEALTH: 50,
        PENETRATION: 2,
        RESIST: 2,
        PUSHABILITY: 0.25,
        ACCELERATION: 0.015
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true,
};
Class.arras_shinyEgg = makeRare("egg", 0);
Class.arras_legendaryEgg = makeRare("egg", 1);
Class.arras_shadowEgg = makeRare("egg", 2);
Class.arras_rainbowEgg = makeRare("egg", 3);
Class.arras_transEgg = makeRare("egg", 4); //ironic

// squares
Class.arras_square = {
    PARENT: "food",
    LABEL: "Square",
    VALUE: 30,
    SHAPE: 4,
    SIZE: 14,
    COLOR: "gold",
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 4,
        HEALTH: basePolygonHealth,
        PENETRATION: 2,
        ACCELERATION: 0.0075
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false
}
Class.arras_shinySquare = makeRare("square", 0)
Class.arras_legendarySquare = makeRare("square", 1)
Class.arras_shadowSquare = makeRare("square", 2)
Class.arras_rainbowSquare = makeRare("square", 3)
Class.arras_transSquare = makeRare("square", 4)

// triangles
Class.arras_triangle = {
    PARENT: "food",
    LABEL: "Triangle",
    VALUE: 120,
    SHAPE: 3,
    SIZE: 10,
    COLOR: "orange",
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 6,
        HEALTH: 3 * basePolygonHealth,
        RESIST: 1.15,
        PENETRATION: 1.5,
        ACCELERATION: 0.005
    },
    DRAW_HEALTH: true
}
Class.arras_shinyTriangle = makeRare("triangle", 0)
Class.arras_legendaryTriangle = makeRare("triangle", 1)
Class.arras_shadowTriangle = makeRare("triangle", 2)
Class.arras_rainbowTriangle = makeRare("triangle", 3)
Class.arras_transTriangle = makeRare("triangle", 4)

// 3d
Class.arras_cube = {
    PARENT: "food",
    LABEL: "The Cube",
    VALUE: 2e7,
    SIZE: 10,
    COLOR: "egg",
    SHAPE: "M -0.065 0.037 L -0.866 -0.425 L -0.866 0.5 L -0.065 0.962 Z M 0.065 0.037 L 0.065 0.962 L 0.866 0.5 L 0.866 -0.425 Z M 0 -0.075 L 0.801 -0.537 L 0 -1 L -0.801 -0.537 Z",
    BODY: {
        DAMAGE: 4.8,
        DENSITY: 20,
        HEALTH: 40,
        RESIST: 1.25,
        PENETRATION: 17.5,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true,
};
Class.arras_tetrahedron = {
    PARENT: "food",
    LABEL: "The Tetrahedron",
    VALUE: 3e7,
    SIZE: 12,
    COLOR: "egg",
    SHAPE: "M -0.065 0.037 L -0.934 -0.477 L -0.054 1.047 Z M 0.065 0.037 L 0.054 1.047 L 0.934 -0.477 Z M 0 -0.075 L 0.88 -0.57 L -0.88 -0.57 Z",
    BODY: {
        DAMAGE: 6,
        DENSITY: 23,
        HEALTH: 50,
        RESIST: 1.25,
        PENETRATION: 22.5,
        ACCELERATION: 0.002
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true
};

Config.FOOD_TYPES = [
        [2000, [
            [1024, 'arras_egg'], [256, 'arras_square'], [64, 'arras_triangle'], [16, 'pentagon'], [4, 'betaPentagon'], [1, 'alphaPentagon']
        ]],
        [1, [
            [3125, 'arras_gem'], [625, 'arras_shinySquare'], [125, 'arras_shinyTriangle'], [25, 'shinyPentagon'], [5, 'shinyBetaPentagon'], [1, 'shinyAlphaPentagon']
        ]],
        [0.1, [
            [6836, 'arras_jewel'], [1296, 'arras_legendarySquare'], [216, 'arras_legendaryTriangle'], [36, 'legendaryPentagon'], [6, 'legendaryBetaPentagon'], [1, 'legendaryAlphaPentagon']
        ]],
        [0.005, [
            /*[16807, 'arras_egg'], */[2401, 'arras_shadowSquare'], [343, 'arras_shadowTriangle'], [49, 'shadowPentagon'], [7, 'shadowBetaPentagon'], [1, 'shadowAlphaPentagon']
        ]],
        [0.001, [
            /*[65536, 'arras_egg'], */[8192, 'arras_rainbowSquare'], [1024, 'arras_rainbowTriangle'], [64, 'rainbowPentagon'], [8, 'rainbowBetaPentagon'], [1, 'rainbowAlphaPentagon']
        ]],
        [0.0005, [
            [59549, 'arras_egg'], [6561, 'arras_transSquare'], [729, 'arras_transTriangle'], [81, 'transPentagon'], [9, 'transBetaPentagon'], [1, 'transAlphaPentagon']
        ]],
        [0.0001, [
            [100000, 'sphere'], [10000, 'arras_cube'], [1000, 'arras_tetrahedron'], [100, 'octahedron'], [10, 'dodecahedron'], [1, 'icosahedron']
        ]]
    ]
