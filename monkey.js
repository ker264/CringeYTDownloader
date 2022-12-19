import { linkList } from "./build/controllers/linkList";

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

function dlButtonClicked() {
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

    for (let i = 0; i < allLinks.length; i++) {
        //break
        activeLink.href = `http://localhost:4000/download?URL=https://www.youtube.com${allLinks[i].URL}&name=${allLinks[i].name}&playlistName=${allLinks[i].playlistName}`
        activeLink.click()
    }
}

//************************************************************************ */
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

    // for (let i = 0; i < allLinks.length; i++) {
    //     //break
    //     activeLink.href = `http://localhost:4000/download?URL=https://www.youtube.com${allLinks[i].URL}&name=${allLinks[i].name}&playlistName=${allLinks[i].playlistName}`
    //     activeLink.click()
    // }


    const resP = await fetch('http://localhost:4000/linkList', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(allLinks)
    })

    // activeLink.href = `http://localhost:4000/linkList?linkList=${allLinks}`
    // activeLink.click();
}

