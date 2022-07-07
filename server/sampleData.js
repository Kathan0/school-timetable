import { createRequire } from "module";
const require = createRequire(import.meta.url);
const bodyParser = require('body-parser');
const express = require('express');
const { attachment } = require('express/lib/response');
const { update } = require('lodash');
const { builtinModules } = require('module');
const port = 4000;
const app = express();
const mysql = require('mysql');
const { NULL } = require('mysql/lib/protocol/constants/types');

import {connection} from './database.js';

export function createSampleData(databaseName){
    
    connection.query(`INSERT INTO student(id,name) VALUES (1, Will)`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into student, named: 1, Will`);
    })    
    connection.query(`INSERT INTO student(id,name) VALUES (2, Rob)`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into student, named: 2, Rob`);
    })    
    connection.query(`INSERT INTO student(id,name) VALUES (3, Mat)`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into student, named: 3, Mat`);
    })    
    connection.query(`INSERT INTO student(id,name) VALUES (4, Amy)`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into student, named: 4, Amy`);
    })    
    connection.query(`INSERT INTO student(id,name) VALUES (5, Sheldon)`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into student, named: 5, Sheldon`);
    })

        
    connection.query(`INSERT INTO student(id,name) VALUES ()`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into student, named: 1, Will`);
    })    
    connection.query(`INSERT INTO student(id,name) VALUES ()`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into student, named: 1, Will`);
    })    
    connection.query(`INSERT INTO student(id,name) VALUES ()`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into student, named: 1, Will`);
    })    
    connection.query(`INSERT INTO student(id,name) VALUES ()`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into student, named: 1, Will`);
    })    
    connection.query(`INSERT INTO student(id,name) VALUES ()`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into student, named: 1, Will`);
    })
}