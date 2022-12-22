import { getListById, getWholeList } from "./linkList.js";

export const wsConnect = ws => {
    ws.send(JSON.stringify({
        text: 'Соединение установлено',
        id: "hEllO/!/>?"
    }));

    ws.on('message', msgRaw => {
        let msg = JSON.parse(msgRaw.toString());

        switch (msg.type) {
            case "dlStatus":
                console.log("Albedo:", getWholeList());
                console.log("id:", msg.id);
                getListById(msg.id).forEach((element, index) => {
                    console.log(index, ": ", element.name);
                });
                break;
            default:
        }
    })
}
