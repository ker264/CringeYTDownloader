import express from 'express';
import cors from 'cors';
import path from 'path';

import { download } from './controllers/download.js';
import { dlPage, saveList } from './controllers/linkList.js';
import { getListById } from './controllers/api.js';

const __dirname = path.resolve()
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'ejs'));

app.use(express.static(path.resolve(__dirname, 'static')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use(cors());

app.listen(4000, () => {
    console.log('Server Works !!! At port 4000');
});

app.get('/download', download);
app.get('/dlPage', dlPage);
app.get('/api/getListById/:id', getListById)

app.post('/saveList', saveList);

