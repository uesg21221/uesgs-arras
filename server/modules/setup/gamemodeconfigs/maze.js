let room = Array(15).fill(() => Array(15).fill()).map(x => x());
for (let x = 6; x <= 8; x++) for (let y = 6; y <= 8; y++) room[y][x] = "nest";

module.exports = {
    MAZE: 64,
    X_GRID: 15,
    Y_GRID: 15,
    WIDTH: 10000,
    HEIGHT: 10000,
    CLEAR_NEST: true,
    ROOM_SETUP: room,
};