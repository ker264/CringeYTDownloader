import WebSocket, { WebSocketServer } from "ws";
import { getListById, getWholeList } from "./linkList.js";

export const wsServer = new WebSocketServer({ port: 3000 });

wsServer.on('connection', ws => {
    ws.send(JSON.stringify({
        text: 'Соединение установлено',
        id: "hEllO/!/>?"
    }));

    ws.on('message', msgRaw => {
        let msg = JSON.parse(msgRaw.toString());

        switch (msg.type) {
            case "dlStatus":
                console.log(getWholeList());
                getListById(msg.id).forEach((element, index) => {
                    console.log(index, ": ", element.name);
                });
                break;
            default:
        }
    })
})

console.log("wsServer Working! At port 3000...")

