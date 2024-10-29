const { base } = require('../../constants.js')

Config.BOSS_TYPES = [
    {
        bosses: ["arras_eliteDestroyer", "arras_eliteGunner", "arras_eliteSprayer", "arras_eliteBattleship", "arras_eliteSpawner"],
        amount: [5, 5, 4, 2, 1], chance: 2, nameType: "a",
    },
    {
        bosses: ["roguePalisade"],
        amount: [4, 1], chance: 1, nameType: "castle",
        message: "A strange trembling..."
    },
    {
        bosses: ["arras_summoner", "arras_eliteSkimmer", "nestKeeper"],
        amount: [2, 2, 1], chance: 1, nameType: "a",
        message: "A strange trembling..."
    },
    {
        bosses: ["paladin", "freyja", "zaphkiel", "nyx", "theia"],
        amount: [1], chance: 0.01,
        message: "The world tremors as the celestials are reborn anew!"
    },
    {
        bosses: ["julius", "genghis", "napoleon"],
        amount: [1], chance: 0.1,
        message: "The darkness arrives as the realms are torn apart!"
    }
]
