const ws = new WebSocket('ws://localhost:3000');

let id;

ws.onopen = () => {
    console.log("Сокет открыт!");
    id = (new URL(document.location)).searchParams.get("id")
    ws.send(JSON.stringify({
        type: "dlStatus",
        b: id
    }))
}

ws.onclose = () => {
    console.log("Сокет закрыт");
}

ws.onmessage = response => {
    let resJSON = JSON.parse(response.data);
    console.log("Пришла собака:", resJSON.text, "Vafu:", resJSON.id);
}