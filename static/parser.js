import axios from 'axios';
import jsdom from 'jsdom';
const { JSDOM } = jsdom;


export function getHrefs(linkURL) {
    console.log("Пытаемся парсить страницу: ", linkURL);
    // axios.get("https://jrnlst.ru/?page=2")
    axios.get(linkURL)
        .then(response => {
            let pageData = response.data;
            
            const dom = new JSDOM(pageData);
            // console.log(dom.window.document.querySelector('body'));
            // console.log(dom.window.document.getElementById('block-views-articles-latest-on-front-block').getElementsByClassName('view-content')[0].getElementsByClassName('flex-teaser-square').length);
            let playlist = dom.window.document.getElementsByClassName('ytd-playlist-video-renderer');
            console.log(playlist);
            for (let i = 0; i < playlist.length; i++){
                console.log(playlist[i]);
            }

            // forEach((item, index) => {
                // let link = item.querySelector('#content #container ytd-thumbnail a').getAttribute('href')
                // console.log(`${index}: ${link}`)
            // })
            console.log('Готово');
            //    console.log(response.data)
        })
}
 // dom.window.document.querySelectorAll('ytd-playlist-video-renderer').forEach((item, index) => {
            //     let link = item.querySelector('#content #container ytd-thumbnail a').getAttribute('href')
            //     console.log(`${index}: ${link}`)                
            // })