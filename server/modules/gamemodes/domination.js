let config = {
    types: [Class.destroyerDominator, Class.gunnerDominator, Class.trapperDominator],
    neededToWin: 4
};
let gameWon = false;
let spawn = (loc, team, color, type = false) => {
    type = type ? type : ran.choose(config.types);
    let o = new Entity(loc);
    o.define(type);
    o.team = team;
    o.color = [10, 11, 12, 15, 25, 26, 27, 28][-team - 1] || 3;
    o.skill.score = 111069;
    o.name = "Dominator";
    o.SIZE = c.WIDTH / c.X_GRID / 10;
    o.isDominator = true;
    o.controllers = [new ioTypes.nearestDifferentMaster(o), new ioTypes.spin(o, { onlyWhenIdle: true })];
    o.on('dead', () => {
        if (o.team === -100) {
            let killers = [];
            for (let instance of o.collisionArray) {
                if (instance.team > -(c.TEAMS + 1) && instance.team < 0 && o.team !== instance.team) {
                    killers.push(instance);
                }
            }
            let killer = ran.choose(killers),
                newTeam = killer.team;
            spawn(loc, newTeam, killer.color, type);
            sockets.broadcast("A dominator is now controlled by " + ["BLUE", "GREEN", "RED", "PURPLE", "YELLOW", "ORANGE", "BROWN", "CYAN"][-newTeam - 1] + "!");
            room.setType("dom" + ((newTeam < 0 && newTeam > c.TEAMS + 1) ? -newTeam : 0), loc);
            for (let player of sockets.players) {
                if (player.body) {
                    if (player.body.team === newTeam) {
                        player.body.sendMessage("Press H to take control of the dominator.");
                    }
                }
            }
        } else {
            spawn(loc, -100, 3, type);
            room.setType("dom0", loc);
            sockets.broadcast("A dominator is being contested!");
        }
        tally();
    });
};

function winner(teamId) {
    gameWon = true;
    setTimeout(function() {
        let team = ["BLUE", "GREEN", "RED", "PURPLE"][teamId] || "An unknown team";
        sockets.broadcast(team + " has won the game!");
        setTimeout(closeArena, 3000);
    }, 1500);
};

function tally() {
    if (gameWon == true) return;
    let dominators = {};
    for (let i = 0; i < c.TEAMS; i++) dominators[-(i + 1)] = 0;
    loopThrough(entities, function(o) {
        if (o.isDominator && o.team !== -101 && dominators[o.team] != null) dominators[o.team]++;
    });
    if (dominators["-1"] === config.neededToWin) winner(0);
    if (dominators["-2"] === config.neededToWin) winner(1);
    if (dominators["-3"] === config.neededToWin) winner(2);
    if (dominators["-4"] === config.neededToWin) winner(3);
};
const dominatorLoop = { spawn, tally };

module.exports = { dominatorLoop };
