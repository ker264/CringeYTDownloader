import { allLinkList } from "./linkList.js"
import stream from 'stream/promises';
import fs from 'fs';

export const getListById = async (req, res) => {
    if (allLinkList[req.params["id"]]) {
        res.status(200).json(allLinkList[req.params["id"]])
    } else {
        res.status(400)
    }
}

export const downloadByURL = async (req, res) => {
    //Отправляем файл пользователю
    const readStream = fs.createReadStream(req.query.URL.toString());
    res.header(`Content-Disposition`, `attachment; filename="${req.query.name.toString()}.mp3"`);
    await stream.pipeline(readStream, res);
    fs.rm(req.query.URL.toString(), (err) => {
        if (err) console.log(err);
        else console.log(`${req.query.name.toString()} удален`);
    })
}