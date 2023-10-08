//game window
let iframe = document.getElementById('client'),

//server list
    browser = document.getElementById('browser'),

//list options
    filters = document.getElementById('filters'),
    sorts = document.getElementById('sorts'),

//info about current selected server
    metadata = document.getElementById('metadata'),
    name = document.getElementById('name'),
    description = document.getElementById('description'),

//join selected server
    join = document.getElementById('join'),

//list of servers and info about them that we display
    servers = [];

//client wants its url to be renamed
window.onmessage = event => iframe.src = `https://${event.data.ip}/app.html` + (event.data.key ? '?key=' + event.data.key : '');

//this will be in socketInit.js or app.js
//in iframe: window.top.postMessage('hello', '*')

//additionally, since clients shouldnt HAVE to run under browsers
// https://stackoverflow.com/a/326076/10793061