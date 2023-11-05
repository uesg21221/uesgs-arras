let { rock, roid } = require('../tiles/decoration.js'),
    { normal: ____, nest } = require('../tiles/misc.js'),
    { portal: port } = require('../tiles/portal.js')

room = [
    [nest,nest,____,____,____,____,roid,roid,roid,____,____,____,____,nest,nest],
    [nest,nest,____,____,____,____,roid,roid,roid,____,____,____,____,nest,nest],
    [____,____,rock,rock,____,____,____,____,____,____,____,rock,rock,____,____],
    [____,____,rock,rock,____,____,____,____,____,____,____,rock,rock,____,____],
    [____,____,____,____,____,____,____,____,____,____,____,____,____,____,____],
    [____,____,____,____,____,nest,nest,nest,nest,nest,____,____,____,____,____],
    [roid,roid,____,____,____,nest,roid,rock,roid,nest,____,____,____,roid,roid],
    [roid,roid,____,____,____,nest,rock,nest,rock,nest,____,____,____,roid,roid],
    [roid,roid,____,____,____,nest,roid,rock,roid,nest,____,____,____,roid,roid],
    [____,____,____,____,____,nest,nest,nest,nest,nest,____,____,____,____,____],
    [____,____,____,____,____,____,____,____,____,____,____,____,____,____,____],
    [____,____,rock,rock,____,____,____,____,____,____,____,rock,rock,____,____],
    [____,____,rock,rock,____,____,____,____,____,____,____,rock,rock,____,____],
    [nest,nest,____,____,____,____,roid,roid,roid,____,____,____,____,nest,nest],
    [nest,nest,____,____,____,____,roid,roid,roid,____,____,____,____,nest,nest]
];

module.exports = room;