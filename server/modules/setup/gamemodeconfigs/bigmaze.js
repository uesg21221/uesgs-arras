let bots = 6,
    room = Array(15).fill(() => Array(60).fill()).map(x => x());

room = room.map(x => x.map(y => y = "norm"));
room[1][1] = room[2][1] = room[1][2] = "bas1";
room[2][2] = "bap1";
room[13][58] = room[12][58] = room[13][57] = "bas2";
room[12][57] = "bap2";
room[1][58] = room[2][58] = room[1][57] = "bas3";
room[2][57] = "bap3";
room[13][1] = room[13][2] = room[12][1] = "bas4";
room[12][2] = "bap4";

module.exports = {
    MAZE: [30, 5000, 0],
    MODE: "tdm",
    TEAMS: 4,
    X_GRID: 60,
    Y_GRID: 15,
    WIDTH: 20000,
    HEIGHT: 5000,
    ROOM_SETUP: room,
    BOTS: 4 * bots,
    secondaryGameMode: "Maze"
};