let output = require("../../config.js");

// You change gamemodes here
// To change specific things about specific gamemodes (such as team count for tdm), visit their config file in \gamemodeconfigs\
const gamemodes = ['tdm', 'domination'];

for (let gamemode of gamemodes) {
    let mode = require(`./gamemodeconfigs/${gamemode}.js`);
    for (let key in mode) {
        if (key === "ROOM_SETUP") {
            output[key].push(...mode[key]);
        } else {
            output[key] = mode[key];
        }
    }
}

module.exports = { output };

//everything past this handles the display name in the main menu
const nameMap = {
    tdm: "TDM",
    ffa: "FFA",
    opentdm: "Open TDM",
    //clanwars: "Clan Wars",
    trainwars: "Train Wars"
};

output.gameModeName = gamemodes.map(x => nameMap[x] || (x[0].toUpperCase() + x.slice(1))).join(' ');