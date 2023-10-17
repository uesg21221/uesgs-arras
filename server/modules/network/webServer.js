let fs = require('fs'),
    net = require('net'),
    path = require('path'),
    publicRoot = path.join(__dirname, "../../../public"),
    mimeSet = {
        "js": "application/javascript",
        "json": "application/json",
        "css": "text/css",
        "html": "text/html",
        "md": "text/markdown",
        "png": "image/png",
        "ico": "image/x-icon"
    },
    otherServers = fs.readFileSync('../otherServers.txt').toString().split('\n'),

wsServer = new (require('ws').WebSocketServer)({ noServer: true }),

getDefaultFile = (defaultFile = c.DEFAULT_FILE) => path.join(publicRoot, defaultFile),
toDefaultIfFileDoesNotExist = (fileToGet, defaultFile = c.DEFAULT_FILE) => (!fs.existsSync(fileToGet) || !fs.lstatSync(fileToGet).isFile()) ? getDefaultFile(defaultFile) : fileToGet;

if (c.host === 'localhost') {
    util.warn(`config.host is just "localhost", are you sure you don't mean "localhost:${c.port}"?`);
}
if (c.host.match(/localhost:(\d)/) && c.host !== 'localhost:' + c.port) {
    util.warn('config.host is a localhost domain but its port is different to config.port!');
}

let server = require('http').createServer((req, res) => {
    let resStr = "";
    switch (req.url) {
        case "/servers.json":
            resStr = [ c.host, ...otherServers ].join('\n');
            break;

        case "/lib/json/mockups.json":
            resStr = mockupJsonData;
            break;

        case "/lib/json/gamemodeData.json":
            resStr = JSON.stringify({ gameMode: c.gameModeName, players: views.length });
            break;

        case "/serverData.json":
            resStr = JSON.stringify({ ip: c.host });
            break;

        default:
            let fileToGet = path.join(publicRoot, req.url);

            // Some fishy business goin' on here...
            if (!fileToGet.startsWith(publicRoot)) {
                fileToGet = getDefaultFile();

            // We can't send a file that does not exist, so let's check if it does!
            } else {
                fileToGet = toDefaultIfFileDoesNotExist(fileToGet);
                
                // 'https://domain.com/app' looks nicer than 'https://domain.com/app.html'
                if (fileToGet.lastIndexOf('.') < fileToGet.lastIndexOf('/')) {
                    fileToGet += '.html';
                }

                // Just in case we are suddenly very stupid!!!!
                fileToGet = toDefaultIfFileDoesNotExist(fileToGet);
            }

            res.writeHead(200, {
                // If we have no idea what the mine type is of that, just assume it is a html file.
                'Content-Type': mimeSet[ fileToGet.split('.').pop() ] || 'text/html'
            });
            return fs.createReadStream(fileToGet).pipe(res);
    }
    res.writeHead(200);
    res.end(resStr);
}),

//very simplified reimplementation of what the forwarded-for npm package does
getIP = req => {
    let store = req.headers['fastly-client-ip'] || req.headers['x-forwarded-for'] || req.headers['z-forwarded-for'] ||
                req.headers['forwarded']        || req.headers['x-real-ip']       || req.connection.remoteAddress,
        ips = store.split(',');

    if (!ips) {
        throw "Missing IP: " + store;
    }

    for (let i = 0; i < ips.length; i++) {
        if (net.isIPv6(ips[i])) {
            ips[i] = ips[i].trim();
        } else {
            ips[i] = ips[i].split(':')[0].trim();
        }
        if (!net.isIP(ips[i])) {
            throw "Invalid IP(s): " + store;
        }
    }

    return ips[0];
}

motdSocket = ws => {
    socket.on("message", message => {
        if (socket.readyState !== socket.OPEN) return;
        if (message.length > 32) return socket.close();
        socket.send(message + ' ' + c.MOTD_DATA);
    });
    setTimeout(() => socket.readyState === socket.OPEN && socket.close(), 60_000);
};

server.on('upgrade', (req, socket, head) => wsServer.handleUpgrade(req, socket, head, ws => {
    if (req.url == '/motd') {
        try {
            util.log('motd websocket connection from ' + getIP(req));
        } catch (msg) {
            util.log('motd socket refused: ' + msg);
            return socket.close();
        }
        if (c.MOTD_SOCKET) {
            motdSocket(ws);
        } else {
            ws.close();
        }
    } else {
        sockets.connect(ws, req);
    }
}));

server.listen(c.port, () => console.log("Server listening on port", c.port));
module.exports = { server, otherServers, getIP };