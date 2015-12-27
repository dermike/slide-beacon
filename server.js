'use strict';
let WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({ 'port': 1234 }),
  EddystoneBeacon = require('eddystone-beacon');

wss.on('connection', ws => {
  ws.on('message', (url) => {
    console.log('received: ' + url);
    ws.send('received: ' + url);

    try {
      EddystoneBeacon.advertiseUrl(url);
      console.log('advertising: ' + url);
      ws.send('advertising: ' + url);
      console.log();
    } catch (e) {
      console.log('error: ' + e);
      ws.send('error: ' + e);
      console.log();
    }
  });
});
