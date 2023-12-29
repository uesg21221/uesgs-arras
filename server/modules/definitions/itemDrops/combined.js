let fs = require('fs'),
    path = require('path'),
    groups = fs.readdirSync(path.resolve(__dirname, './groups')),
    ItemDrop_Class = {},
    definitionCount = 0,
    definitionGroupsLoadStart = Date.now();
console.log(`Loading ${groups.length} groups...`);
for (let filename of groups) {
    console.log(`Loading group: ${filename}`);
    let group = require('./groups/' + filename);
    for (let key in group) {
        if (key in ItemDrop_Class) {
            console.warn(`WARNING: ${key} is present in multiple item drop definition groups!`);
        } else {
            definitionCount++;
        }
        ItemDrop_Class[key] = group[key];
    }
}

let definitionGroupsLoadEnd = Date.now();
console.log("Loaded item drop definitions in " + (definitionGroupsLoadEnd - definitionGroupsLoadStart) + " milliseconds. \n");
module.exports = ItemDrop_Class;