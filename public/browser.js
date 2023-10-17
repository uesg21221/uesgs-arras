//game window
let iframe = document.getElementById('client'),

    //server list
    browser = document.getElementById('browser'),

    //list options
    filters = document.getElementById('filters'),
    sorts = document.getElementById('sorts'),
    favorites = document.getElementById('favorites'),

    //info about current selected server
    metadata = document.getElementById('metadata'),
    name = document.getElementById('name'),
    description = document.getElementById('description'),

    //join selected server
    join = document.getElementById('join'),
    list = document.getElementById('join'),

    //list of server ips
    servers = [],

    selected = 0;

//client wants its src to be renamed
window.onmessage = ({ data: { ip, key, autojoin }}) => {
    console.log('changing iframe src\nip:', ip, '\nkey:', key, '\nautojoin:', autojoin);
    iframe.src = `https://${ip}/app` + (key || autojoin ? '?' : '') + (key ? 'key=' + key : '') + (key && autojoin ? '&' : '') + (autojoin ? 'autojoin=' + autojoin : '');
};

window.onresize = () => {
    iframe.width = window.innerWidth;
    irfame.height = window.innerHeight;
};

join.onclick = () => {
    for (let { motdSocket } of servers) motdSocket.close();
    console.log('setting iframe src\nip:', ip);
    iframe.src = `https://${servers[selected]}/app`;
    iframe.style.display = 'block';
};

list.onclick = () => {
    for (let { motdSocket } of servers) motdSocket.close();
    console.log('redirecting to browser\nip:', ip);
    location.href = `https://${servers[selected]}/browser`;
};

class DOMServerListItem {
    constructor (ip, index) {
        document.createElement('div');

        browser.append(container);
    }
    setMOTD (motd) {}
}

fetch(`https://${location.host}/servers.txt`).then(x => x.text()).then(fetchedServers => {
    for (let ip of fetchedServers.split('\n')) {
        let element = new DOMServerListItem(ip, servers.length),
            motdSocket = new WebSocket(`wss://${ip}/motd`),

            listEntry = { ip, motdSocket, element, loading: true };

        //TODO: actually render the server entries in the list

        motdSocket.pings = [];
        motdSocket.onmessage = ({ data }) => {
            let splitIndex = data.indexOf(' '),
                motd = JSON.parse(data.slice(splitIndex)),
                now = Date.now();
            motd.ping = now - parseInt(data.slice(0, splitIndex));
            motdSocket.send(now.toString());
            element.setMOTD(motd);
        };
        motdSocket.onopen = () => motdSocket.send(Date.now().toString());

        servers.push(listEntry);

    }
});

browser.innerHTML = '';




//most of this is drawText from the game client but modified
function toColored(rawText) {
    let textArrayRaw = rawText.split('§'),
        textArray = [];
    if (!(textArrayRaw.length & 1)) {
        textArrayRaw.unshift('');
    }
    while (textArrayRaw.length) {
        let first = textArrayRaw.shift();
        if (!textArrayRaw.length) {
            textArray.push(first);
        } else if (textArrayRaw[1]) {
            textArray.push(first, textArrayRaw.shift());
        } else {
            textArrayRaw.shift();
            textArray.push(first + '§' + textArrayRaw.shift(), textArrayRaw.shift());
        }
    }

    while (textArray.length) {
        let color = textArray.shift(),
            text = textArray.shift();

        // odd index = this is a color to set the fill style to
        if (i & 1) {

            //reset color to default
            if (str === "reset") {
                context.fillStyle = defaultFillStyle;
            } else {
                // try your best to get a valid color out of it
                if (!isNaN(str)) {
                    str = parseInt(str);
                }
                str = gameDraw.getColor(str) ?? str;
            }
            context.fillStyle = str;

        } else {
            _add_color_to_(str);
            add_text_(str);
        }
    }
}