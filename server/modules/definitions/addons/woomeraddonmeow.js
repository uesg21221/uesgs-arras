// An addon is guaranteed to run only after all groups are loaded.
// This is helpful, if your group relies on all other definitions already being loaded.
// Addons that are dependant on other addons should be named something like
// "[PARENT ADDON NAME]-[EXTENSION NAME].js", to make sure that it would run after that addon ran.
module.Class = ({ Class }) => {

const { base } = require('../constants.js');

// This addon is disabled by default.
// You can also disable addons by not making them end with '.js'
// If you want to enable, simply make the line below just not run.
return console.log('[woomeraddonmeow.js] Addon disabled by default');
  
  /*
  Class.littleHunter = {
    PARENT: "genericTank",
    LABEL: "Subduer",
    DANGER: 5,
    BODY: {
        ACCELERATION: base.ACCEL * 0.9,
        FOV: 1.1
    },
    GUNS: [{
        POSITION: [23, 5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.hunter, g.hunterSecondary]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [20, 8, 1, 0, 0, 0, 0.2],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.hunter]),
            TYPE: "bullet"
        }
    }]
};
Class.flankdue = makeMulti({
    PARENT: "genericTank",
    DANGER: 5,
    BODY: {
        ACCELERATION: base.ACCEL * 0.9,
        FOV: 1.1,
        SPEED: base.SPEED * 1.1,
    },
    GUNS: [{
        POSITION: [23, 5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.hunter, g.hunterSecondary]),
            TYPE: "bullet"
        }
    }, {
        POSITION: [20, 8, 1, 0, 0, 0, 0.2],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.hunter]),
            TYPE: "bullet"
        }
    }]
}, 3, "Flankduer")
Class.autolittleHunter = makeAuto(Class.littleHunter, "Auto-Subduer")
Class.littleHunterbrid = makeHybrid('littleHunter', "Subduer-Hybrid")
Class.autolittleHunterbrid = makeHybrid('autolittleHunter', "Auto-Subduer-Hybrid")

*/
}