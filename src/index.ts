import express from 'express';
import cors from 'cors';
import path from 'path';

import { download } from './controllers/download.js';
import { dlPage, saveList } from './controllers/linkList.js';
import { downloadByURL, getListById } from './controllers/api.js';
import WebSocket, { WebSocketServer } from "ws";
import { wsConnect } from './controllers/wsServer.js';

const __dirname = path.resolve()
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'ejs'));

app.use(express.static(path.resolve(__dirname, 'static')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use(cors());

const wsServer = new WebSocketServer({ port: 3000 });

wsServer.on("connection", ws => wsConnect(ws));

app.listen(4000, () => {
    console.log('Server Works !!! At port 4000');
});

app.get('/dlPage', dlPage);
app.get('/api/getListById/:id', getListById)
app.get('/api/downloadByURL', downloadByURL)

app.post('/saveList', saveList);

