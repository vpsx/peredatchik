// Передатчик
// Tried to just use server sent events, but eghh
// eeeeegghgghhgghghghghghggghghgghhg

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('Передатчик что-то слышал, лол, ПОДРУБИЛ');
  ws.on('message', function incoming(message) {
    console.log('Услышал: %s', message);
    ws.send(message);
    // Broadcast to everyone else... errrrrrrrrr
      wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        //console.log('forwarding message to one client');
        client.send(message);
      }
    });
  });
});
