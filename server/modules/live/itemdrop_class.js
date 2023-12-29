let ItemDrop_Class = require("../definitions/itemDrops/combined.js"),
    i = 0;
for (let key in ItemDrop_Class) {
    if (!ItemDrop_Class.hasOwnProperty(key)) continue;
    ItemDrop_Class[key].index = i++;
}

global.ensureIsItemDrop_Class = str => {
    if ("object" == typeof str) {
        return str;
    }
    if (str in ItemDrop_Class) {
        return ItemDrop_Class[str];
    }
    throw Error(`Item Drop Definition ${str} is attempted to be gotten but does not exist!`);
}

module.exports = { ItemDrop_Class, ensureIsClass };