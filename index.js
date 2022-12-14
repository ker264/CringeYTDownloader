import express from 'express';
import cors from 'cors';
import ytdl from 'ytdl-core';

const app = express();
app.use(cors());

app.listen(4000, () => {
    console.log('Server Works !!! At port 4000');
});

app.get('/download', (req, res) => {

    let cleanShitReg = RegExp("[^\\d\\w\\s()\\[\\],.:;!?/']", "g");
    let URL = req.query.URL;
    let name = req.query.name.trim();
    // let playlist = req.query.playlistName;
    
    name = name.replace(cleanShitReg, ' ')

    res.header(`Content-Disposition`, `attachment; filename="${name}.webm"`);
    ytdl(URL, {
        quality: "highestaudio"
        // quality: "lowestaudio",
        // format: "mp3"
    }).pipe(res);
});