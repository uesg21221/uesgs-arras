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

        //actual properties of this entry
        this.loading = true;
        this.loadFail = false;

        //DOM stuff
        this.mainContainer = makeNode('mainContainer');
        this.textContainer = makeNode('textContainer');
        this.statsContainer= makeNode('statsContainer');
        this.icon = makeNode('icon', 'img');
        this.name = makeNode('name');
        this.description = makeNode('description');
        this.ping = makeNode('ping');
        this.players = makeNode('players');
        this.icon.src = `https://${ip}/iconBrowser.png`;
        this.textContainer.append(this.name);
        this.textContainer.append(this.description);
        this.statsContainer.append(this.ping);
        this.statsContainer.append(this.players);
        this.mainContainer.append(this.icon);
        this.mainContainer.append(this.textContainer);
        this.mainContainer.append(this.statsContainer);
        browser.append(this.mainContainer);

        this.mainContainer.addEventListener('click', () => {
            this.mainContainer.classList.add('selected');
            servers[selected].element.mainContainer.classList.remove('selected');
            selected = index;

            //TODO: update info panel on right side
        });
    }
    setMOTD (motd) {}
    socketClosed () {}
}

fetch(`https://${location.host}/servers.txt`).then(x => x.text()).then(fetchedServers => {
    for (let ip of fetchedServers.split('\n')) {
        let element = new DOMServerListItem(ip, servers.length),
            motdSocket = new WebSocket(`wss://${ip}/motd`),

            listEntry = { ip, motdSocket, element, loading: true };

        motdSocket.pings = [];
        motdSocket.onmessage = ({ data }) => {
            let splitIndex = data.indexOf(' '),
                motd = JSON.parse(data.slice(splitIndex)),
                now = Date.now();
            motd.ping = now - parseInt(data.slice(0, splitIndex));
            motdSocket.send(now.toString());
            element.setMOTD(motd);
        };
        motdSocket.onclose = () => element.socketClosed();
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