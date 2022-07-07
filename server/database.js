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

import { createSampleData } from "./sampleData.js";


export const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678"
});

export function createDatabase(databaseName) {

    connection.connect(function(err) {
        
        if(err) throw err;

        connection.query(`SET FOREIGN_KEY_CHECKS=0`, (err, result) => {
            if (err) throw err;
            console.log("Foreign Constraint Removed");
        })

        connection.query(`DROP DATABASE IF EXISTS ${databaseName}`, (err, result) => {
            if (err) throw err;
            console.log("Database dropped");
        })

        connection.query(`CREATE DATABASE ${databaseName}`, (err, result) => {
            if (err) throw err;
            console.log("Database created");
        })

        connection.query(`USE ${databaseName}`, (err, result) => {
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
        capacity INT NOT NULL,
        block VARCHAR(1),
        PRIMARY KEY(room_number)
    )`, (err, result) => {
            if (err) throw err;
            console.log("Table classroom created");
        })

        connection.query(`CREATE TABLE instructs(
        teach_id INT,
        stud_id INT,
        PRIMARY KEY(teach_id)
    )`, (err, result) => {
            if (err) throw err;
            console.log("Table instructs created");
        })

        connection.query(`CREATE TABLE takes(
        stud_id INT NOT NULL AUTO_INCREMENT,
        course_id INT NOT NULL,
        PRIMARY KEY(stud_id)
    )`, (err, result) => {
            if (err) throw err;
            console.log("Table takes created");
        })

        connection.query(`CREATE TABLE teaches(
        teach_id INT NOT NULL AUTO_INCREMENT,
        course_id VARCHAR(20) NOT NULL,
        PRIMARY KEY(teach_id)
    )`, (err, result) => {
            if (err) throw err;
            console.log("Table teaches created");
        })

        connection.query(`CREATE TABLE course_time_slot(
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(20) NOT NULL,
        PRIMARY KEY(id)
    )`, (err, result) => {
            if (err) throw err;
            console.log("Table course_tine_slot created");
        })

        connection.query(`CREATE TABLE class_used(
        course_id INT NOT NULL AUTO_INCREMENT,
        room_number INT NOT NULL,
        PRIMARY KEY(course_id)
    )`, (err, result) => {
            if (err) throw err;
            console.log("Table class_used created: Final Table");

            console.log('\nCreating sample Data:');
            createSampleData(databaseName);
        })
    })
}
