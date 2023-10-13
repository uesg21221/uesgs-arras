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
    for (let { pingSocket } of servers) pingSocket.close();
    console.log('setting iframe src\nip:', ip);
    iframe.src = `https://${servers[selected]}/app`;
    iframe.style.display = 'block';
};

list.onclick = () => {
    for (let { pingSocket } of servers) pingSocket.close();
    console.log('redirecting to browser\nip:', ip);
    location.href = `https://${servers[selected]}/browser`;
};

fetch(`https://${location.host}/servers.txt`).then(x => x.text()).then(fetchedServers => {
    for (let ip of fetchedServers.split('\n')) {
        let element = document.createElement('div'),
            pingSocket = new WebSocket(`wss://${ip}/ping`),
            listEntry = { ip, pingSocket, element, loading: true };

        //TODO: actually render the server entries in the list

        pingSocket.pings = [];
        pingSocket.onmessage = ({ data }) => {
            let now = Date.now();
            pingSocket.pings.push(now - parseInt(data));
            pingSocket.send(now.toString());
        };
        pingSocket.onopen = () => pingSocket.send(Date.now().toString());

        servers.push(listEntry);
        fetch(`https://${ip}/motd.json`)
        .then(motd => motd.json()).catch(L=>L)
        .then(motd => listEntry.motd = motd)
        .finally(L => listEntry.loading = false);

    }
});

browser.innerHTML = '';