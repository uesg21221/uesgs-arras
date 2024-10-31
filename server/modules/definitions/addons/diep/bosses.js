const { combineStats, menu, weaponArray } = require('../../facilitators.js')
const { base, statnames, dfltskl, smshskl } = require('../../constants.js')
require('../../groups/dev.js')
const g = require('../../gunvals.js')

Class.diep = menu("Diep Bosses")
Class.addons.UPGRADES_TIER_0.push("diep")
    Class.diep.UPGRADES_TIER_0 = ["guardian", "defender"]

Class.guardian = {
    PARENT: "arras_genericElite",
    LABEL: "Guardian of the Pentagons",
    UPGRADE_LABEL: "Guardian",
    UPGRADE_COLOR: "pink",
    FACING_TYPE: "toTarget",
    GUNS: [
        {
            POSITION: [4, 12, 1.4, 8, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, { size: 0.5 }]),
                TYPE: "swarm",
                AUTOFIRE: true
            }
        }
    ],
    AI: { NO_LEAD: false }
}
Class.defenderAutoTankGun = {
    PARENT: "autoTankGun",
    GUNS: [
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.autoTurret]),
                TYPE: ["bullet", {COLOR: "yellow"}]
            }
        }
    ]
}
Class.defender = {
    PARENT: "arras_genericElite",
    LABEL: "Defender",
    COLOR: "orange",
    UPGRADE_COLOR: "orange",
    GUNS: weaponArray([
        {
            POSITION: [15, 7, 1, -3, 0, 60, 0],
        }, {
            POSITION: [3, 7, 1.7, 12, 0, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.flankGuard, {reload: 4/3, damage: 2.5}]),
                TYPE: ["trap", {COLOR: "yellow"}],
                STAT_CALCULATOR: "trap"
            }
        }
    ], 3),
    TURRETS: weaponArray({
        POSITION: [5, 7, 0, 0, 190, 1],
        TYPE: "defenderAutoTankGun",
    }, 3),
    AI: { NO_LEAD: false }
}