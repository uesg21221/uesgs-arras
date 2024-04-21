// socket.talk('M', this.chatInput.value); // send chat msg
// socket.talk('s', global.playerName, 0, 1 * settings.game.autoLevelUp); // spawn
// socket.talk('L'); // level up
// socket.talk('0'); // token tank
// socket.talk('H'); // become
// socket.talk('1'); // kill yourself
// socket.talk('t', toggleIndex);
// socket.talk('x', statIndex, upgradeFully);
// socket.talk('U', upgradeIndex);

// socket.talk('C', xAim, yAim, reverseTank, commandsBitfield);
// socket.talk('k', token);
// socket.talk('p', pingPayload);
// socket.talk('S', syncTime);
// socket.talk('d', lastCamUpdateTime);

// [ 'A', 'B' ]  =>  [ [ 'A', 0 ], [ 'B', 1 ] ]  =>  { A: 0, B: 1 }
let doThing = packettypes => Object.fromEntries(packettypes.map((t, i) => [t, i])),

c2s = doThing([
	'M', // send chat msg
	'spawn', // (re)spawn
	'L', // level up
	'upgradeTankToken', // token tank
	'H', // become
	'1', // suicide
	't', // toggle stuff like autospin autofire etc
	'upgradeSkill', // upgrade stat
	'upgradeTank', // upgrade tank
	'C', // aim and commands
	'k', // token
	'p', // ping
	'S', // sync
	'd'  // last cam update
]),

s2c = doThing([
	'w', // we can spawn
	'R', // room setup
	"r", // room update
	'info', // info
	'c', // teleport camera and set hud data
	'S', // clock syncing
	'm', // message
	'u', // uplink
	"b", // minimap data
	'p', // ping
	'F', // killscreen info
	'K', // kicked
	'z', // name color
	'CHAT_MESSAGE_ENTITY' // currently visible chat messages from entities in range
]);

// export throws an error in cjs files if it exists as a normal statement
try {
    eval('export { c2s, s2c }');
} catch (e) {
    module.exports = { packetTypes: { c2s, s2c } };
}