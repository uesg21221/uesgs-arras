let { normal: norm, nest } = require('../tiles/misc.js'),
	room = Array(15).fill(() => Array(15).fill(norm)).map(x => x());

for (let x = 4; x <= 10; x++) {
	for (let y = 4; y <= 10; y++) {
		room[y][x] = nest;
	}
}

module.exports = room;