//literally not needed, but looks cleaner
let getNode = id => document.getElementById(id),
    makeNode = (cssClass, tag = 'div') => {
        let temp = document.createElement(tag);
        temp.classList.add(cssClass);
        return temp;
    },

    //game window
    iframe = getNode('client'),

    //server list
    browser = getNode('browser'),

    //list options
    filters = getNode('filters'),
    sorts = getNode('sorts'),
    favorites = getNode('favorites'),

    //info about current selected server
    metadata = getNode('metadata'),
    name = getNode('name'),
    description = getNode('description'),

    //join selected server
    join = getNode('join'),
    list = getNode('list'),

    //list of server ips
    servers = [],

    selected = 0;

//client wants its src to be renamed
window.onmessage = ({ data: { secure, ip, key, autojoin }}) => {
    console.log('changing iframe src\nip:', ip, '\nkey:', key, '\nautojoin:', autojoin);
    iframe.src = `${secure ? 'https' : 'http'}://${ip}/app` + (key || autojoin ? '?' : '') + (key ? 'key=' + key : '') + (key && autojoin ? '&' : '') + (autojoin ? 'autojoin=' + autojoin : '');
};

window.onresize = () => {
    iframe.width = window.innerWidth;
    iframe.height = window.innerHeight;
};

join.onclick = () => {
    for (let { motdSocket } of servers) motdSocket.close();
    console.log('setting iframe src\nip:', ip);
    iframe.src = `${servers[selected].secure ? 'https' : 'http'}://${servers[selected].ip}/app`;
    iframe.style.display = 'block';
};

list.onclick = () => {
    for (let { motdSocket } of servers) motdSocket.close();
    console.log('redirecting to browser\nip:', ip);
    location.href = `${servers[selected].secure ? 'https' : 'http'}://${servers[selected].ip}/browser`;
};

class DOMServerListItem {
    constructor (secure, ip, index) {
        this.ip = ip;
        this.errors = [];

        //DOM stuff
        this.mainContainer = makeNode('mainContainer');
        this.textContainer = makeNode('textContainer');
        this.statsContainer= makeNode('statsContainer');
        this.notLoaded = makeNode('notLoaded');
        this.icon = makeNode('icon', 'img');
        this.name = makeNode('name');
        this.description = makeNode('description');
        this.ping = makeNode('ping');
        this.players = makeNode('players');
        this.icon.hidden = true;
        this.notLoaded.innerHTML = this.ip + '<br><br>Loading...';
        this.icon.src = `${secure ? 'https' : 'http'}://${ip}/iconBrowser.png`;
        this.icon.onerror = () => this.error("Server Icon didn't load successfully");
        this.textContainer.append(this.name);
        this.textContainer.append(this.description);
        this.statsContainer.append(this.players);
        this.statsContainer.append(this.ping);
        this.mainContainer.append(this.notLoaded);
        this.mainContainer.append(this.icon);
        this.mainContainer.append(this.textContainer);
        this.mainContainer.append(this.statsContainer);
        browser.append(this.mainContainer);

        this.mainContainer.addEventListener('click', () => {
            servers[selected].element.mainContainer.classList.remove('selected');
            this.mainContainer.classList.add('selected');
            selected = index;

            //TODO: update info panel on right side
        });
    }
    setMOTD (motd) {
        this.notLoaded.hidden = true;
        this.icon.hidden = false;
        this.name.innerHTML = toColored(motd.name);
        this.description.innerHTML = toColored(motd.description);
        this.ping.innerText = motd.ping + 'ms Ping';
        this.players.innerText = motd.players + '/' + motd.maxPlayers + ' Players';
    }
    socketClosed () {}
    error (msg) {
        this.errors.push('Error: ' + msg);
        this.icon.hidden = true;
        this.notLoaded.hidden = false;
        this.notLoaded.style.color = '#f00';
        this.notLoaded.innerHTML = this.ip + '<br><br>' + this.errors.join('<br>');
    }
}

fetch(`${location.protocol}//${location.host}/servers.json`).then(x => x.json()).then(fetchedServers => {
    browser.innerHTML = '';
    for (let { secure, ip } of fetchedServers) {
        let element = new DOMServerListItem(secure, ip, servers.length),
            motdSocket = new WebSocket(`${secure ? 'wss' : 'ws'}://${ip}/motd`),

            listEntry = { ip, motdSocket, element };

        motdSocket.pings = [];
        motdSocket.onmessage = ({ data: str }) => {
            try {
                let data = str.split(' '),
                    reqSent = parseInt(data[0], 16),
                    askAgainInMS = parseInt(data[1]),
                    motd = JSON.parse(data.slice(2).join(' '));
                motd.ping = (Date.now() - reqSent) >> 1;
                element.setMOTD(motd);
                setTimeout(() => motdSocket.send(Date.now().toString(16)), askAgainInMS);
            } catch (err) {
                element.error('received motdSocket message made no sense');
            }
        };
        motdSocket.onopen = () => motdSocket.send(Date.now().toString(16));
        motdSocket.onclose = () => element.socketClosed();
        motdSocket.onerror = () => element.error('motdSocket initiation failed');

        servers.push(listEntry);
    }
});

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

    let color = 'reset',
        final = '';
    while (textArray.length) {
        let str = textArray.shift();

        // odd index = this is a color to set the fill style to
        if (textArray.length & 1) {
            color = str;

        //completely horrid
        } else {
            let textSegment = document.createElement('span')
            textSegment.innerText = str;
            if (color && color != 'reset') {
                textSegment.style.color = color;
            }
            final += textSegment.outerHTML;
        }
    }

    return final;
}