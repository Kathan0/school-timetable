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

import {connection} from '../connection.js';

connection.connect(function(err) {
        
        if(err) throw err;

        connection.query(`SET FOREIGN_KEY_CHECKS=0`, (err, result) => {
            if (err) throw err;
            console.log("Foreign Constraint Removed");
        })

        connection.query(`DROP DATABASE IF EXISTS school`, (err, result) => {
            if (err) throw err;
            console.log("Database dropped");
        })

        connection.query(`CREATE DATABASE school`, (err, result) => {
            if (err) throw err;
            console.log("Database created");
        })

        connection.query(`USE school`, (err, result) => {
            if (err) throw err;
            console.log("Database used");
        })

        connection.query(`CREATE TABLE student(
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(20) NOT NULL,
        PRIMARY KEY(id)
    )`, (err, result) => {
            if (err) throw err;
            console.log("Table student created");
        })

        connection.query(`CREATE TABLE teacher(
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(20) NOT NULL,
        PRIMARY KEY(id)
    )`, (err, result) => {
            if (err) throw err;
            console.log("Table teacher created");
        })

        connection.query(`CREATE TABLE course(
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(20) NOT NULL,
        year INT NOT NULL,
        PRIMARY KEY(id)
    )`, (err, result) => {
            if (err) throw err;
            console.log("Table course created");
        })

        connection.query(`CREATE TABLE time_slot(
        time_slot_id INT NOT NULL AUTO_INCREMENT,
        time_slot INT NOT NULL,
        day VARCHAR(10),
        PRIMARY KEY(time_slot_id)
    )`, (err, result) => {
            if (err) throw err;
            console.log("Table time_slot created");
        })

        connection.query(`CREATE TABLE classroom(
        room_number INT NOT NULL,
        block VARCHAR(1),
        PRIMARY KEY(room_number)
    )`, (err, result) => {
            if (err) throw err;
            console.log("Table classroom created");
        })

        connection.query(`CREATE TABLE instructs(
        teach_id INT NOT NULL,
        stud_id INT NOT NULL,
        PRIMARY KEY(teach_id, stud_id)
    )`, (err, result) => {
            if (err) throw err;
            console.log("Table instructs created");
        })

        connection.query(`CREATE TABLE takes(
        stud_id INT NOT NULL,
        course_id INT NOT NULL,
        PRIMARY KEY(stud_id, course_id)
    )`, (err, result) => {
            if (err) throw err;
            console.log("Table takes created");
        })

        connection.query(`CREATE TABLE teaches(
        teach_id INT NOT NULL,
        course_id INT NOT NULL,
        PRIMARY KEY(teach_id, course_id)
    )`, (err, result) => {
            if (err) throw err;
            console.log("Table teaches created");
        })

        connection.query(`CREATE TABLE course_time_slot(
        course_id INT NOT NULL,
        time_id INT NOT NULL,
        day VARCHAR(10),
        PRIMARY KEY(time_id, day)
    )`, (err, result) => {
            if (err) throw err;
            console.log("Table course_time_slot created");
        })

        connection.query(`CREATE TABLE class_used(
        course_id INT NOT NULL,
        room_number_id INT NOT NULL,
        PRIMARY KEY(course_id)
    )`, (err, result) => {
            if (err) throw err;
            console.log("Table class_used created: Final Table");
        })

        connection.query(`ALTER TABLE teaches ADD FOREIGN KEY(teach_id) REFERENCES teacher(id)`, (err, result)=>{
            if(err) throw err;
            console.log("Foreign Key from teaches to teacher added");
        })

        connection.query(`ALTER TABLE teaches ADD FOREIGN KEY(course_id) REFERENCES course(id)`, (err, result)=>{
            if(err) throw err;
            console.log("Foreign Key from teaches to course added");
        })
        
        connection.query(`ALTER TABLE instructs ADD FOREIGN KEY(teach_id) REFERENCES teacher(id)`, (err, result)=>{
            if(err) throw err;
            console.log("Foreign Key from instructs to teacher added");
        })
        
        connection.query(`ALTER TABLE instructs ADD FOREIGN KEY(stud_id) REFERENCES student(id)`, (err, result)=>{
            if(err) throw err;
            console.log("Foreign Key from instructs to student added");
        })
        
        connection.query(`ALTER TABLE takes ADD FOREIGN KEY(stud_id) REFERENCES student(id)`, (err, result)=>{
            if(err) throw err;
            console.log("Foreign Key from takes to student added");
        })
        
        connection.query(`ALTER TABLE takes ADD FOREIGN KEY(course_id) REFERENCES course(id)`, (err, result)=>{
            if(err) throw err;
            console.log("Foreign Key from takes to course added");
        })
        
        connection.query(`ALTER TABLE class_used ADD FOREIGN KEY(course_id) REFERENCES course(id)`, (err, result)=>{
            if(err) throw err;
            console.log("Foreign Key from class_used to course added");
        })
        
        connection.query(`ALTER TABLE class_used ADD FOREIGN KEY(room_number_id) REFERENCES classroom(room_number)`, (err, result)=>{
            if(err) throw err;
            console.log("Foreign Key from class_used to classroom added");
        })
        
        connection.query(`ALTER TABLE course_time_slot ADD FOREIGN KEY(course_id) REFERENCES course(id)`, (err, result)=>{
            if(err) throw err;
            console.log("Foreign Key from course_time_slot to course added");
        })
        
        connection.query(`ALTER TABLE course_time_slot ADD FOREIGN KEY(time_id) REFERENCES time_slot(time_slot_id)`, (err, result)=>{
            if(err) throw err;
            console.log("Foreign Key from course_time_slot to time_slot added");
            exit();
        })
    })
