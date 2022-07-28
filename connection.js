import { createRequire } from "module";
import { exit } from "process";
const require = createRequire(import.meta.url);
const bodyParser = require('body-parser');
const express = require('express');
const { attachment } = require('express/lib/response');
const { builtinModules } = require('module');
const port = 4000;
const app = express();
const mysql = require('mysql');
const { NULL } = require('mysql/lib/protocol/constants/types');

export const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "12345678"
});