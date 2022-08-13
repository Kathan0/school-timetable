import { createRequire } from "module";
import { exit } from "process";
const require = createRequire(import.meta.url);
const bodyParser = require('body-parser');
const express = require('express');
const { builtinModules } = require('module');
const port = 4000;
const app = express();
const mysql = require('mysql');
const { NULL } = require('mysql/lib/protocol/constants/types');

import {connection} from '../connection.js';

connection.connect(function(err){

    if(err) throw err;

    connection.query(`USE school`, (err, result)=>{
        if (err) throw err
        console.log("Database in use");
    });
    connection.query(`INSERT INTO student(id,name, password) VALUES (1, 'Will', '1234')`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into student, named: 1, Will`);
    })    
    connection.query(`INSERT INTO student(id,name, password) VALUES (2, 'Rob', '1234')`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into student, named: 2, Rob`);
    })    
    connection.query(`INSERT INTO student(id,name, password) VALUES (3, 'Mat', '1234')`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into student, named: 3, Mat`);
    })    
    connection.query(`INSERT INTO student(id,name, password) VALUES (4, 'Amy', '1234')`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into student, named: 4, Amy`);
    })    
    connection.query(`INSERT INTO student(id,name, password) VALUES (5, 'Sheldon', '1234')`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into student, named: 5, Sheldon`);
        console.log("**********************Student end******************")
    })

        
    connection.query(`INSERT INTO teacher(id,name, password) VALUES (1, 'Ross', '1234')`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into teacher, name, password: 1, Ross`);
    })    
    connection.query(`INSERT INTO teacher(id,name, password) VALUES (2, 'Joey', '1234')`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into teacher, name, password: 2, Joey`);
    })    
    connection.query(`INSERT INTO teacher(id,name, password) VALUES (3, 'Chandler', '1234')`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into teacher, name, password: 3, Chandler`);
    })    
    connection.query(`INSERT INTO teacher(id,name, password) VALUES (4, 'Monica', '1234')`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into teacher, name, password: 4, Monica`);
    })    
    connection.query(`INSERT INTO teacher(id,name, password) VALUES (5, 'Phoebe', '1234')`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into teacher, name, password: 5, Phoebe`);
    })    
    connection.query(`INSERT INTO teacher(id,name, password) VALUES (6, 'Rachel', '1234')`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into teacher, name, password: 6, Rachel`);
        console.log("****************Teacher end******************")
    })

    
    connection.query(`INSERT INTO course(id,name,year) VALUES (1, 'Physics', 6)`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into teacher, named: 5, Phoebe`);
    })    
    connection.query(`INSERT INTO course(id,name,year) VALUES (2, 'Chemistry', 6)`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into teacher, named: 5, Phoebe`);
    })    
    connection.query(`INSERT INTO course(id,name,year) VALUES (3, 'Biology', 6)`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into teacher, named: 5, Phoebe`);
    })    
    connection.query(`INSERT INTO course(id,name,year) VALUES (4, 'Mathematics', 6)`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into teacher, named: 5, Phoebe`);
    })

})