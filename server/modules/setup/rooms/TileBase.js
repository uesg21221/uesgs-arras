let { portal: port } = require('../tiles/portal.js'),
    { rock, roid } = require('../tiles/decoration.js'),
    { bossSpawn: boss, atmg, outside: edge } = require('../tiles/siege.js'),
    { wall, normal: norm, nest, nestNoBoss: nost } = require('../tiles/misc.js'),
    {
        dominatorBlue: dom1,
        dominatorGreen: dom2,
        dominatorContested: dom0,
        sanctuaryBlue: san1,
        sanctuaryGreen: san2,
        sanctuaryContested: san0
    } = require('../tiles/dominators.js'),
    {
        base1: bas1, base1protected: bap1,
        base2: bas2, base2protected: bap2,
        base3: bas3, base3protected: bap3,
        base4: bas4, base4protected: bap4,
        base5: bas5, base5protected: bap5,
        base6: bas6, base6protected: bap6,
        base7: bas7, base7protected: bap7,
        base8: bas8, base8protected: bap8
    } = require('../tiles/tdm.js'),

room = [
    [norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm],
    [norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm],
    [norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm],
    [norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm],
    [norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm],
    [norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm],
    [norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm],
    [norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm],
    [norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm],
    [norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm],
    [norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm],
    [norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm,norm],
    [rock,norm,rock,norm,roid,norm,roid,norm,nest,norm,nest,norm,norm,norm,norm,norm,norm,norm,norm],
    [rock,norm,rock,norm,roid,norm,roid,norm,nest,norm,nest,norm,norm,norm,norm,norm,norm,norm,norm],
    [rock,norm,rock,norm,roid,norm,roid,norm,nest,norm,nest,norm,norm,norm,norm,norm,norm,norm,norm]
];

module.exports = room;