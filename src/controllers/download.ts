import stream from 'stream/promises';
import ytdl from 'ytdl-core';
import fs from 'fs';
import childProcess from 'child_process';
import util from 'util';
import { allLinkList } from './linkList.js';

const exec = util.promisify(childProcess.exec)

export const download = async (listId, vidId) => {

    let URL = `https://www.youtube.com${allLinkList[listId][vidId].URL}`;
    let name = allLinkList[listId][vidId].name;
    let status = "error";
    let pathName = `./audio/${listId}/${name}.webm`;

    const writeStream = fs.createWriteStream(pathName)

    try {
        //Скачиваем файл на сервер
        console.log(`download start: ${name}`);
        await stream.pipeline(ytdl(URL, { quality: "highestaudio" }), writeStream);
        console.log(`download ok: ${name}`);
        console.log(`conversion start: ${name}`);

        //Конвертируем файл в mp3
        const { stdout, stderr } = await exec(`d:/ffmpegTest/ffmpeg.exe -y -i "./audio/${listId}/${name}.webm" "./audio/${listId}/${name}.mp3"`)
        // console.error('stdout:', stdout);
        // console.error('stderr:', stderr);

        fs.rm(`./audio/${listId}/${name}.webm`, { recursive: true }, (err) => {
            if (err) console.log(err);
        })

        URL = `./audio/${listId}/${name}.mp3`;
        status = "readyToDl";

        console.log(`conversion ok: ${name}`);        
    } catch (err) {
        console.log(`some error: ${name}`);
        console.log(err);
    }

    return { status, URL };
}