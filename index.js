import express from 'express';
import cors from 'cors';
import ytdl from 'ytdl-core';
import path from 'path';
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


let downloadedNames = []

app.get('/download', (req, res) => {
    let URL = req.query.URL;
    let name = req.query.name.trim()    
    res.header('Content-Disposition', `attachment; filename=${downloadedNames.length}.mp3"`);
    downloadedNames.push(name);
    // res.header('Content-Disposition', 'attachment; filename="video.mp4"');
    ytdl(URL, {
        quality: "lowestaudio"
    }).pipe(res);
    console.log(downloadedNames[downloadedNames.length - 1]);
});

app.get('/', (req, res) => {
    res.render('index', { title: "Main Page", active: "main" });
})