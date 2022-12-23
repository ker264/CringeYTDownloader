const ws = new WebSocket('ws://localhost:3000');

let id;

ws.onopen = () => {
    console.log("Сокет открыт!");
    id = (new URL(document.location)).searchParams.get("id")
    ws.send(JSON.stringify({
        type: "dlStart",
        id: id
    }))
}

ws.onclose = () => {
    console.log("Сокет закрыт");
}

ws.onmessage = response => {
    let res = JSON.parse(response.data);
    console.log(res);
    app.msg = "Собака";
    switch (res.type) {
        case "changeStatus":
            switch (res.status) {
                case "error":
                    app.linkList[res.id].status = "Ошибка";
                    break;
                case "readyToDl":
                    app.linkList[res.id].status = "Скачивание началось";
                    const activeLink = document.createElement('a');
                    activeLink.target = "_blank"
                    activeLink.href = `http://localhost:4000/api/downloadByURL?URL=${res.URL}&name=${app.linkList[res.id].name}&id=${res.id}&uid=${id}`
                    activeLink.click();
                    break;
            }
            break;
        default:
            break;
    }
}