import { createRequire } from "module";
const require = createRequire(import.meta.url);

import userRouter  from './routes/Users.js'
import teacherRouter from './routes/Teacher.js'
import dataRouter from './routes/database.js';
import adminRouter from './routes/Admin.js';

import {connection} from './connection.js';
const cors = require('cors');

const express = require('express');
const port = 4000;
const app = express();


app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
  }));


app.use('/', userRouter);
app.use('/', teacherRouter);
app.use('/', dataRouter);
app.use('/', adminRouter);

export default connection;

app.listen(port, (err, res) => {
    if (err) throw err
    console.log('server is listening on ' + port);
})