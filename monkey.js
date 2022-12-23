(function () {
    'use strict';

    document.addEventListener("DOMContentLoaded", () => {
        console.log("DOM Loaded")
        let intervalGUI = setInterval(() => {
            if (loadGUI()) clearInterval(intervalGUI)
        }, 1000);
    });
})();

function loadGUI() {
    let playMenuList = document.querySelectorAll(".play-menu")


    playMenuList.forEach(playMenu => {
        let dlButton = document.createElement('button');
        dlButton.innerHTML = "Скачать"
        dlButton.addEventListener('click', dlButtonClicked)
        playMenu.append(dlButton)
    })

    return playMenuList.length
}

async function dlButtonClicked() {
    let allLinks = [];
    const activeLink = document.createElement('a');
    activeLink.target = "_blank"

    document.querySelectorAll('ytd-playlist-video-renderer').forEach(item => {
        let link = item.querySelector('#content #container ytd-thumbnail a').getAttribute('href')
        let name = item.querySelector('#content #container #meta h3 a').innerHTML
        let playlistName = document.querySelector('#display-dialog yt-dynamic-sizing-formatted-string #container yt-formatted-string').innerHTML
        allLinks.push({
            "URL": link,
            "name": name,
            "playlistName": playlistName
        })
    })

    console.log(allLinks);
    let id = Date.now();

    let a = await fetch('http://localhost:4000/saveList', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'allLinks':allLinks,
                             'id': id})
    })

    console.log(a)


    activeLink.href = `http://localhost:4000/dlPage?id=${id}`
    activeLink.click();
}

