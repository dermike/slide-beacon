var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ port: 1234 }),
    eddystone = require('eddystone-url');

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(url) {
    console.log('received: ' + url);
    ws.send('received: ' + url);

    try {
      eddystone.advertise(url);
      console.log('advertising: ' + url);
      ws.send('advertising: ' + url);
    }
    catch(e) {
      console.log('error: ' + e);
      ws.send('error: ' + e);
    }
  });
});