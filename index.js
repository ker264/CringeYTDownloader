import express from 'express';
import cors from 'cors';
import ytdl from 'ytdl-core';
import path from 'path';
import { getHrefs } from './static/parser.js';
import bodyParser from 'body-parser'

const urlEncodedParser = bodyParser.urlencoded({
    extended: false,
})

const app = express();
const __dirname = path.resolve();

app.set('view engine', 'ejs')
app.set('views', 'ejs')

app.use(cors());
app.use(express.static(path.resolve(__dirname, 'static')))

app.listen(4000, () => {
    console.log('Server Works !!! At port 4000');
});

app.get('/download', (req, res) => {
    var URL = req.query.URL;
    res.header('Content-Disposition', 'attachment; filename="video.mp4"');
    ytdl(URL, {
        quality: "lowestaudio"
    }).pipe(res);
});

app.get('/', (req, res) => {
    res.render('index', { title: "Main Page", active: "main" });
})

app.post('/parseLinks', urlEncodedParser, (req, res) => {
    if (!req.body) return res.sendStatus(400)
    console.log(req.body);
    getHrefs(req.body.URL)
})

// document.querySelectorAll('ytd-playlist-video-renderer').forEach((item, index) => {
//     let link = item.querySelector('#content #container ytd-thumbnail a').getAttribute('href')
//     console.log(`${index}: ${link}`)
//     })    

// let allLinks = document.querySelectorAll('ytd-playlist-video-renderer')
// allLinks.forEach((item, index) => {
//   let link = item.querySelector('#content #container ytd-thumbnail a').getAttribute('href')
//   console.log(`${index}: ${link}`)
// })

// console.log(`https://www.youtube.com${allLinks[0]}`)

// window.location.href = `http://localhost:4000/download?URL=https://www.youtube.com${allLinks[0]}`;