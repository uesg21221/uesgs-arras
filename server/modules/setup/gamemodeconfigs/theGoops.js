let room = new Array(15).fill(null).map(() => new Array(15).fill('goop'));
room[7][7] = 'bas1'; room[8][8] = 'bas1'; room[8][7] = 'bas1'; room[7][8] = 'bas1';
room[0][0] = 'norm'; room[0][14] = 'norm'; room[14][0] = 'norm'; room[14][14] = 'norm';

module.exports = {
    THE_GOOPS_LOOP: true,
    X_GRID: 15,
    Y_GRID: 15,
    WIDTH: 5000,
    HEIGHT: 5000,
    ROOM_SETUP: room,
    LEVEL_CAP: 4096,
    LEVEL_SKILL_POINT_FUNCTION: level => {
        if (level < 2) return 0;
        if (level <= 40) return 1;
        if (level <= 45 && level & 1 == 1) return 1;
        if (level % 3 == 1 && level < 280) return 1;
        return 0;
    },
};