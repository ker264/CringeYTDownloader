var convertBtn = document.querySelector('.convert-button');
var parseBtn = document.querySelector('.parse-button');
var URLinput = document.querySelector('.URL-input');

convertBtn.addEventListener('click', () => {
    console.log(`URL: ${URLinput.value}`);
    sendURL(URLinput.value);
});

parseBtn.addEventListener('click', () => {
    console.log(`URL: ${URLinput.value}`);
    parseLinks(URLinput.value);
});

function parseLinks(URL) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/parseLinks", true)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`URL=${URL}`)
    xhr.onreadystatechange = () => {
        console.log("Ура, ответ!!!");
        console.log(xhr.readyState);
        console.log('status:', xhr.status);        
    }
}

function sendURL(URL) {
    window.location.href = `http://localhost:4000/download?URL=${URL}`;
}

