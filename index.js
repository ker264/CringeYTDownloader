import express from 'express';
import cors from 'cors';
import ytdl from 'ytdl-core';
import fs from 'fs';
import stream from 'stream/promises';
import childProcess from 'child_process';
import util from 'util';

const app = express();
const exec = util.promisify(childProcess.exec)

app.use(cors());

app.listen(4000, () => {
    console.log('Server Works !!! At port 4000');
});

app.get('/download', async (req, res) => {

    let cleanShitReg = RegExp("[^\\d\\w\\s()\\[\\],.;!']", "g");
    let URL = req.query.URL;
    let name = req.query.name;
    // let playlist = req.query.playlistName;

    name = name.replace(cleanShitReg, ' ').replace(RegExp('\\s+', 'g'), ' ').trim();
    let pathName = `./audio/${name}.webm`;

    const writeStream = fs.createWriteStream(pathName)

    try {
        //Скачиваем файл на сервер
        await stream.pipeline(ytdl(URL, { quality: "highestaudio" }), writeStream);
        fs.access(pathName, (err) => {
            console.log(`${pathName} ${err ? 'does not exist' : 'exists'}`);
        })

        //Конвертируем файл в mp3
        const { stdout, stderr } = await exec(`d:/ffmpegTest/ffmpeg.exe -y -i "./audio/${name}.webm" "./audio/${name}.mp3"`)
        console.log('stdout:', stdout);
        console.error('stderr:', stderr);

        //Отправляем файл пользователю
        const readStream = fs.createReadStream(`./audio/${name}.mp3`);
        res.header(`Content-Disposition`, `attachment; filename="${name}.mp3"`);
        await stream.pipeline(readStream, res);
    } catch (err) {
        console.log(err);
    } finally {
        // fs.rm(`./audio/${name}.mp3`);
        // fs.rm(`./audio/${name}.webm`);
    }
});