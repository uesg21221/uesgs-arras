let output = require("../../config.js");

const gamemodes = ["ffa", "growth"]; // ffa default

for (let gamemode of gamemodes) {
    let mode = require(`./gamemodeconfigs/${gamemode}.js`);
    if (gamemode == "maze") for (let y = 0; y < output.Y_GRID; y++) {
        for (let x = 0; x < output.X_GRID; x++)
            if (output.ROOM_SETUP[y][x] == "nest") output.ROOM_SETUP[y][x] = "norm";
    }
    for (let key in mode) {
        if (key === "ROOM_SETUP") {
            for (let y = 0; y < output.Y_GRID; y++) {
                for (let x = 0; x < output.X_GRID; x++) {
                    if (mode[key][y][x]) {
                        if (output[key][y] == null) output[key][y] = [];
                        output[key][y][x] = mode[key][y][x];
                    }
                }
            }
        } else {
            output[key] = mode[key];
        }
    }
}

module.exports = { output };

//everything past this handles 
const nameMap = {
    tdm: "TDM",
    ffa: "FFA",
    opentdm: "Open TDM",
    shiny: "",
    //clanwars: "Clan Wars",
    trainwars: "Train Wars"
};

output.gameModeName = gamemodes.map(x => nameMap[x] || (x[0].toUpperCase() + x.slice(1))).join(' ');

/*if (["Tag", "Domination", "Mothership"].includes(gamemode)) {
    output.gameModeName = `${output.TEAMS} TDM ${gamemode}`;
}*/