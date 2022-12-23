import { download } from "./download.js";
import { allLinkList } from "./linkList.js";
import fs from 'fs';

export const wsConnect = ws => {
    let id;
    ws.send(JSON.stringify({
        text: 'Соединение установлено',
        id: "hEllO/!/>?"
    }));

    ws.on('message', msgRaw => {
        let msg = JSON.parse(msgRaw.toString());

        switch (msg.type) {
            case "dlStart":
                id = msg.id;
                console.log(`newConnection: ${msg.id}`);

                fs.mkdirSync(`./audio/${msg.id}`, { recursive: true })

                allLinkList[msg.id].forEach((element, index) => {
                    console.log(index, ": ", element.name);
                    dlAndSetStatus(msg.id, index, ws);
                });
                break;
            default:
                break;
        }
    })

    ws.on('close', () => {
        let isAvaliable = true;

        fs.access(`./audio/${id}`, err => {
            console.log(err);
            isAvaliable = false;
        })

        console.log(allLinkList);
        delete allLinkList[id];

        if (isAvaliable) {
            fs.rmdir(`./audio/${id}`, { recursive: true }, (err) => {
                if (err) console.log(err);
                else console.log(id, "- сеанс завершен");
            })
        }
    })
}

async function dlAndSetStatus(listId, vidId, ws) {
    let result = await download(listId, vidId);
    console.log(`vidId: ${vidId}, status: ${result.status}`);
    ws.send(JSON.stringify({
        type: "changeStatus",
        id: vidId,
        status: result.status,
        URL: result.URL
    }))
}