import WebSocket, { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: 3000 });

server.on('connection', ws => {
    ws.send('Добро пожаловать в собаку!');

    ws.on('message', message => {
        console.log(server.clients);
        console.log(message.toString);
    })
})

