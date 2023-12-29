/**
 * 
 * @param {object} AddonParams
 * @param {import('../../../../config.js')} AddonParams.Config
 */
module.exports = ({Config}) => {
    Config.WELCOME_MESSAGE = ''
    Config.REPL_WINDOW = true
    Config.BOTS = Config.TEAMS * 5
    Config.TILE_WIDTH = Config.TILE_HEIGHT = 300
}