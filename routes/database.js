import {connection} from '../connection.js';
import express from 'express';
const dataRouter = express.Router();

dataRouter
    .get('/data', getData)
    .post('/data', postData)
    .patch('/data', patchData)
    .delete('/data', deleteData);

export function getData(req, res) {
    console.log("Getdata accessed");
    res.json({
        message: "getdata accessed",
        id: 1
    });
}

export function postData(req, res) {
    // console.log("Postdata accessed");
    // res.json({
    //     message: "Postdata accessed ",
    //     id: 1
    // });
    var data = req.body;

    var tableName = data.tableName;
    var id = data.id;
    var name = data.name;
    var year = data.year;
    var time_slot_id = data.time_slot_id;
    var time_slot = data.time_slot;
    var day = data.day;
    var room_number = data.room_number;
    var capacity = data.capacity
    var block = data.block;

    var teach_id = data.teach_id;
    var stud_id = data.stud_id;
    var course_id = data.course_id;
    var time_id = data.time_id;
    var room_number_id = data.room_number_id;

    if(typeof teach_id === 'undefined' &&
    typeof stud_id === 'undefined' &&
    typeof course_id === 'undefined' &&
    typeof time_id === 'undefined' &&
    typeof room_number_id === 'undefined' ){ // Normal table fill up

        if(typeof id === 'undefined' && typeof name === 'undefined'){ // Timeslot, classroom

            if(typeof time_id === 'undefined'){ // classroom
                connection.query(`INSERT INTO TABLE classroom(room_number, capacity, block) VALUES (${room_number}, ${capacity}, ${block})`, (err, result)=>{
                    if(err) throw err;
                    console.log(`Data added to ${tableName}, named :${room_number}, ${capacity}, ${block}`)
                })

            } else { // Timeslot
                connection.query(`INSERT INTO TABLE time_slot(time_slot_id, time_slot, day) VALUES (${time_slot_id}, ${time_slot}, ${day})`, (err, result)=>{
                    if(err) throw err;
                    console.log(`Data added to ${tableName}, named :${time_slot_id}, ${time_slot}, ${day}`)
                })
            }

        } else {    // Student, Teacher, Course
            if(typeof year === 'undefined') {   // Student, Teacher
                if(tableName === 'student'){    // Student
                    connection.query(`INSERT INTO TABLE student(id, name) VALUES (${id}, ${name})`, (err, result)=>{
                        if(err) throw err;
                        console.log(`Data added to ${tableName}, named :${id}, ${name}`)
                    })

                } else { // Teacher
                    connection.query(`INSERT INTO TABLE teacher(id, name) VALUES (${id}, ${name})`, (err, result)=>{
                        if(err) throw err;
                        console.log(`Data added to ${tableName}, named :`)
                    })
                }

            } else {    // Course
                connection.query(`INSERT INTO TABLE course(id, name, year) VALUES (${id}, ${name}, ${year})`, (err, result)=>{
                    if(err) throw err;
                    console.log(`Data added to ${tableName}, named :${id}, ${name}, ${year}`)
                })
            }

        }
    } else { // relation table fill up
        if(typeof course_id !== 'undefined'){ // takes, teaches, course_time_slot, class_used, 

            if(typeof teach_id !== 'undefined'){ // teaches
                connection.query(`INSERT INTO TABLE teaches(teach_id, course_id) VALUES (${teach_id}, ${course_id})`, (err, result)=>{
                    if(err) throw err;
                    console.log(`Data added to ${tableName}, named :${teach_id}, ${course_id}`)
                })
            } 
            else if(typeof stud_id !== 'undefined') { // takes
                connection.query(`INSERT INTO TABLE takes(stud_id, course_id) VALUES (${stud_id}, ${course_id})`, (err, result)=>{
                    if(err) throw err;
                    console.log(`Data added to ${tableName}, named :`)
                })
            }

            else if(typeof time_id !== 'undefined') { //course_time_slot
                connection.query(`INSERT INTO TABLE course_time_table(course_id, time_id) VALUES (${course_id}, ${time_id})`, (err, result)=>{
                    if(err) throw err;
                    console.log(`Data added to ${tableName}, named :${course_id}, ${time_id}`)
                })
            }

            else {  //class_used
                connection.query(`INSERT INTO TABLE class_used(course_id, room_number_id) VALUES (${course_id}, ${room_number_id})`, (err, result)=>{
                    if(err) throw err;
                    console.log(`Data added to ${tableName}, named :${course_id}, ${room_number_id}`)
                })
            }

        } else { // Intructs
            connection.query(`INSERT INTO TABLE instructs(teach_id, stud_id) VALUES (${teach_id}, ${stud_id})`, (err, result)=>{
                if(err) throw err;
                console.log(`Data added to ${tableName}, named :${teach_id}, ${stud_id}`)
            })
        }

    }
}

export function patchData(req, res) {
    console.log("Patchdata accessed");
    res.json({
        message: "Patchdata accessed ",
        id: 1
    });
}

export function deleteData(req, res) {
    console.log("Deletedata accessed");
    res.json({
        message: "Deletedata accessed ",
        id: 1
    });
}

export default dataRouter;