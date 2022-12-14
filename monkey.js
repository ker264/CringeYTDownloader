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

//*********************************************************************************************************** */
// let allLinks = [];
// const activeLink = document.createElement('a');
// activeLink.target = "_blank"
// // allLinks = []
// document.querySelectorAll('ytd-playlist-video-renderer').forEach((item, index) => {
//     let link = item.querySelector('#content #container ytd-thumbnail a').getAttribute('href')
//     let name = item.querySelector('#content #container #meta h3 a').innerHTML
//     allLinks.push({
//         "URL": link,
//         "name": name
//     })
// })

// console.log(allLinks);

// // allLinks.forEach((item, index) => {
// //     activeLink.href = `http://localhost:4000/download?URL=https://www.youtube.com${item.URL}&name=${item.name}`
// //     activeLink.click()  	
// // })

// activeLink.href = `http://localhost:4000/download?URL=https://www.youtube.com${allLinks[0].URL}&name=${allLinks[0].name}`
// activeLink.click()

// for (let i = 0; i < allLinks.length; i++) {
//     if (i = 1) break
//     activeLink.href = `http://localhost:4000/download?URL=https://www.youtube.com${allLinks[i].URL}&name=${allLinks[i].name}`
//     activeLink.click()

// }