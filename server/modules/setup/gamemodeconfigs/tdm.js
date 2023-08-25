// you can edit this!
let teams = 2,
    maze = false,
	bots_per_team = 0;

// you can edit anything below this if you know what you're doing

let room = Array(15).fill(() => Array(15).fill()).map(x => x());
switch (teams) {
    case 4:
        if (maze) {
            room[1][1] = room[2][1] = room[1][2] = "bas1";
            room[2][2] = "bap1";

            room[13][13] = room[12][13] = room[13][12] = "bas2";
            room[12][12] = "bap2";

            room[1][13] = room[2][13] = room[1][12] = "bas3";
            room[2][12] = "bap3";
            
            room[13][1] = room[13][2] = room[12][1] = "bas4";
            room[12][2] = "bap4";
        } else {
            room[0][0] = room[1][0] = room[0][1] = "bas1";
            room[1][1] = "bap1";

            room[14][14] = room[13][14] = room[14][13] = "bas2";
            room[13][13] = "bap2";

            room[0][14] = room[1][14] = room[0][13] = "bas3";
            room[1][13] = "bap3";
            
            room[14][0] = room[14][1] = room[13][0] = "bas4";
            room[13][1] = "bap4";
        }

        break;
    case 2:
        if (maze) {
            room[1][1] = room[2][1] = room[1][2] = "bas1";
            room[2][2] = "bap1";
        
            room[13][13] = room[12][13] = room[13][12] = "bas2";
            room[12][12] = "bap2";
        } else for (let i = 0; i < room.length; i++) {
            if (i % 4 == 1) room[i][0] = "bap1";
            else room[i][0] = "bas1";

            if (i % 4 == 1) room[i][14] = "bap2";
            else room[i][14] = "bas2";
        }
}

// if (teams > 4) {
// 	   room[14][0] = room[14][1] = room[13][0] = "bas5";
// 	   room[13][1] = "bap5";
// }
// if (teams > 5) {
// 	   room[14][0] = room[14][1] = room[13][0] = "bas6";
// 	   room[13][1] = "bap6";
// }
// if (teams > 6) {
// 	   room[14][0] = room[14][1] = room[13][0] = "bas7";
// 	   room[13][1] = "bap7";
// }
// if (teams > 7) {
// 	   room[14][0] = room[14][1] = room[13][0] = "bas8";
// 	   room[13][1] = "bap8";
// }

module.exports = {
    MODE: "tdm",
    TEAMS: teams,
    BOTS: bots_per_team * teams,
    X_GRID: 15,
    Y_GRID: 15,
    WIDTH: 5000,
    HEIGHT: 5000,
    ROOM_SETUP: room
};