const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
    console.log("Собака открыта!");
}

ws.onclose = () => {
    console.log("Собака закрыта");
}

ws.onmessage = response => {
    console.log("Пришла собака:", response.data);
}

function Bonk() {
    ws.send("BonkTheServer!!! ForTheGreaterGood!!!")
}