const { menu, weaponArray } = require('../../../facilitators.js')
const { base } = require('../../../constants.js')
const g = require('../../../gunvals.js')

Class.arras_elites = menu("Elites", "pink", 3.5)
Class.arras_bosses.UPGRADES_TIER_0.push("arras_elites")
    Class.arras_elites.UPGRADES_TIER_0 = ["arras_eliteSkimmer"]

// shared stats

// bosses
Class.arras_eliteSkimmer = {
    PARENT: "elite",
    LABEL: "Elite Skimmer",
    COLOR: "orange",
    UPGRADE_COLOR: "orange",
    TURRETS: weaponArray({
        POSITION: [15, 5, 0, 60, 170, 0],
        TYPE: "skimmerTurret",
    }, 3)
};