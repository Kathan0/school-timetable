import { createRequire } from "module";
const require = createRequire(import.meta.url);

import userRouter  from './routes/Users.js'
import teacherRouter from './routes/Teacher.js'
import dataRouter from './routes/database.js';
import adminRouter from './routes/Admin.js';

import {connection} from './connection.js';

const express = require('express');
const port = 4000;
const app = express();


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/', userRouter);
app.use('/', teacherRouter);
app.use('/', dataRouter);
app.use('/', adminRouter);

export default connection;

app.listen(port, (err, res) => {
    if (err) throw err
    console.log('server is listening on ' + port);
})