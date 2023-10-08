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

    servers = [];

window.onmessage = event => iframe.src = `https://${event.data.ip}/app.html` + (event.data.key ? '?key=' + event.data.key : '');

//in iframe: window.top.postMessage('hello', '*')