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
    connection.query(`INSERT INTO student(id,name) VALUES (1, 'Will')`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into student, named: 1, Will`);
    })    
    connection.query(`INSERT INTO student(id,name) VALUES (2, 'Rob')`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into student, named: 2, Rob`);
    })    
    connection.query(`INSERT INTO student(id,name) VALUES (3, 'Mat')`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into student, named: 3, Mat`);
    })    
    connection.query(`INSERT INTO student(id,name) VALUES (4, 'Amy')`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into student, named: 4, Amy`);
    })    
    connection.query(`INSERT INTO student(id,name) VALUES (5, 'Sheldon')`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into student, named: 5, Sheldon`);
        console.log("**********************Student end******************")
    })

        
    connection.query(`INSERT INTO teacher(id,name) VALUES (1, 'Ross')`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into teacher, named: 1, Ross`);
    })    
    connection.query(`INSERT INTO teacher(id,name) VALUES (2, 'Joey')`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into teacher, named: 2, Joey`);
    })    
    connection.query(`INSERT INTO teacher(id,name) VALUES (3, 'Chandler')`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into teacher, named: 3, Chandler`);
    })    
    connection.query(`INSERT INTO teacher(id,name) VALUES (4, 'Monica')`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into teacher, named: 4, Monica`);
    })    
    connection.query(`INSERT INTO teacher(id,name) VALUES (5, 'Phoebe')`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into teacher, named: 5, Phoebe`);
    })    
    connection.query(`INSERT INTO teacher(id,name) VALUES (6, 'Rachel')`,(err, res)=>{
        if(err) throw err
        console.log(`Inserted Data into teacher, named: 6, Rachel`);
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