var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ port: 1234 }),
    uriBeacon = process.platform === 'linux' ? require('uri-beacon') : false;

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(url) {
    console.log('received: ' + url);
    ws.send('received: ' + url);

    if (uriBeacon) {
      uriBeacon.advertise(url);
      console.log('advertising: ' + url);
      ws.send('advertising: ' + url);
    }
  });
});