var fs = require('fs');

fs.readdirSync('./').forEach(file => {
    fs.rename(file, file.toLowerCase().replace(/ /g, '_'), () => console.log(file))
});