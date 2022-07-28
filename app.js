import { createRequire } from "module";
const require = createRequire(import.meta.url);

import userRouter  from './routes/Users.js'
import teacherRouter from './routes/Teacher.js'

const express = require('express');
const port = 4000;
const app = express();


app.use('/', userRouter);
app.use('/', teacherRouter);

app.listen(port, (err, res) => {
    if (err) throw err
    console.log('server is listening on ' + port);
})