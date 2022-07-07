import { createRequire } from "module";
const require = createRequire(import.meta.url);

import userRouter  from './routes/Users.js'
import teacherRouter from './routes/Teacher.js'

const { connection } = import('./server/database.js')
import {createDatabase} from './server/database.js'
import { createSampleData } from "./server/sampleData.js";

const express = require('express');
const port = 4000;
const app = express();

    const prompt = require('prompt-sync')();

    var ques1 = prompt('Do you want to create a new Database?(Y/n): ');

    if(ques1 === 'y' || ques2 === 'Y')
    var ques2 = prompt('Are you sure?(Y/n): ');

    if(ques2==='y' || ques2 === 'Y'){
    var ques3 = prompt('Enter a name for the Database: ');
    createDatabase(ques3);

    }

app.use('/', userRouter);
app.use('/', teacherRouter);

app.listen(port, (err, res) => {
    if (err) throw err
    console.log('server is listening on ' + port);
})