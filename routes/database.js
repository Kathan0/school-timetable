import connection from '../app.js';
import express from 'express';
import { ExplainVerbosity } from 'mongodb';
const dataRouter = express.Router();

dataRouter
    .get('/data', getData) // During login
    .post('/data', postData) // During registration
    .patch('/data', patchData) // During substitution
    .delete('/data', deleteData); //During withdrawal

export function getData(req, res){
    var data  = req.body;
    let date = new Date();

    if(typeof data.name !== 'undefined' && typeof data.password !== 'undefined'){
        if(data.tableName == 'student'){

            connection.query(`USE school`, (err, result)=>{
                if(err) throw err;
                console.log("Database in use from getData at "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" on "+("0" + date.getDate()).slice(-2)+"/"+("0" + (date.getMonth() + 1)).slice(-2)+"/"+date.getFullYear());
            })

         connection.query(`SELECT s.id FROM student s WHERE s.name = '${data.name}' AND s.password = '${data.password}' AND s.year = ${data.year}`, (err, result)=>{
            if(err) throw err;

            var resultArray = Object.values(JSON.parse(JSON.stringify(result)));

            if(result.length > 0)
            res.send({id: result[0].id, mesage: 1});
            else
            res.send({result, mesage: 0});
        })
    }
    else {        
        connection.query(`USE school`, (err, result)=>{
        if(err) throw err;
        console.log("Database in use at "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" on "+("0" + date.getDate()).slice(-2)+"/"+("0" + (date.getMonth() + 1)).slice(-2)+"/"+date.getFullYear());
    })
         connection.query(`SELECT s.id FROM teacher s WHERE s.name = '${data.name}' AND s.password = '${data.password}'`, (err, result)=>{
            if(err) throw err;

            if(result.length > 0)
            res.send({id: result[0].id, mesage: 1});
            else
            res.send({result, mesage: 0});
        })
    }
    } else {
        res.send({
            message: -1
        })
    }
} // Login for tudent and teacher

export function postData(req, res) { //Working
    var data = req.body;
    let date = new Date();

        connection.query(`USE school`, (err, result)=>{
        if(err) throw err;
        console.log("Database in use from postData at "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" on "+("0" + date.getDate()).slice(-2)+"/"+("0" + (date.getMonth() + 1)).slice(-2)+"/"+date.getFullYear());
    })

        for(var i=0; i<data.length; i++){

        var tableName = data[i].tableName;
        if(typeof data[i].teach_id === 'undefined' &&
        typeof data[i].stud_id === 'undefined' &&
        typeof data[i].course_id === 'undefined' &&
        typeof data[i].time_id === 'undefined' &&
        typeof data[i].room_number_id === 'undefined' ){ // Normal table fill up

            if(typeof data[i].name === 'undefined'){ // Timeslot, classroom

                if(typeof data[i].time_id === 'undefined' && data[i].tableName == 'classroom'){ // classroom
                    var block = `'${data[i].block}'`;

                    connection.query(`INSERT INTO classroom(block) VALUES (${block})`, (err, result)=>{
                        if(err) throw err;
                        console.log(`Data added to classroom, named : ${block}`)
                    })

                } else if ( data[i].tableName == 'time_slot') { // Timeslot
                    var time_slot = data[i].time_slot;
                    var day = `'${data[i].day}'`;

                    connection.query(`INSERT INTO time_slot(time_slot , day) VALUES (${time_slot}, ${day})`, (err, result)=>{
                        if(err) throw err;
                        console.log(`Data added to time slot, named :${time_slot}, ${day} with auto Increment`)
                    })
                }

            } else {    // Student, Teacher, Course
                var name = `'${data[i].name}'`;

                if(typeof data[i].password !== 'undefined' || typeof data[i].password1 !== 'undefined') {   // Student, Teacher
                    
                    if(tableName == "student"){    // Student
                        var password = `'${data[i].password}'`;
                        var year = data[i].year;
                         connection.query(`INSERT INTO student(name, password, year) VALUES (${name}, ${password}, ${year})`, (err, result)=>{
                            if(err) throw err;
                            console.log(`Data added to student, named :${name} ${password} ${year} with auto Increment`)
                        })

                    } else if(data[i].tableName == "teacher") { // Teacher
                         connection.query(`INSERT INTO teacher(name, password) VALUES (${name}, '${data[i].password}')`, (err, result)=>{
                            if(err) throw err;
                            console.log(`Data added to teacher, named : ${name}, ${password} with auto increment`)
                        })
                    } else if(data[i].tableName == "admin") { // Admin
                        var password = `'${data[i].password}'`;
                        var password1 = `'${data[i].password1}'`;
                        connection.query(`INSERT INTO admin(name, password1, password2) VALUES (${name}, ${password}, ${password1})`, (err, result)=>{
                            if(err) throw err;
                            console.log(`Data added to teacher, named : ${name}, ${password}, ${password1} with auto increment`)
                        })
                    }

                } else {    // Course
                    var year = data[i].year;
                     connection.query(`INSERT INTO course(name, year) VALUES (${name}, ${year})`, (err, result)=>{
                        if(err) throw err;
                        console.log(`Data added to course, named :${name}, ${year} with auto increment`)
                    })
                }

            }
            
        } else { // relation table fill up

            if(typeof data[i].course_id !== 'undefined'){ // takes, teaches, course_time_slot, class_used
                var course_id = data[i].course_id;

                if(typeof data[i].teach_id !== 'undefined'){ // teaches
                    var teach_id = data[i].teach_id;
                     connection.query(`INSERT INTO teaches(teach_id, course_id) VALUES (${teach_id}, ${course_id})`, (err, result)=>{
                        if(err) throw err;
                        console.log(`Data added to teaches, named :${teach_id}, ${course_id}`)
                    })
                } 
                else if(typeof data[i].stud_id !== 'undefined') { // takes
                    var stud_id = data[i].stud_id;
                     connection.query(`INSERT INTO takes(stud_id, course_id) VALUES (${stud_id}, ${course_id})`, (err, result)=>{
                        if(err) throw err;
                        console.log(`Data added to takes, named :${stud_id}, ${course_id}`)
                        
                    })
                }

                else if(typeof data[i].time_id !== 'undefined') { //course_time_slot
                    var time_id = data[i].time_id;
                     connection.query(`INSERT INTO course_time_slot(course_id, time_id) VALUES (${course_id}, ${time_id})`, (err, result)=>{
                        if(err) throw err;
                        console.log(`Data added to course_time_slot, named :${course_id}, ${time_id}`)
                        
                    })
                }

                else {  //class_used
                    var room_number_id = data[i].room_number_id;
                     connection.query(`INSERT INTO class_used(course_id, room_number_id) VALUES (${course_id}, ${room_number_id})`, (err, result)=>{
                        if(err) throw err;
                        console.log(`Data added to class used, named :${course_id}, ${room_number_id}`)
                        
                    })
                }

            } else { // Instructs
                var teach_id = data[i].teach_id;
                var stud_id = data[i].stud_id;
                 connection.query(`INSERT INTO instructs(teach_id, stud_id) VALUES (${teach_id}, ${stud_id})`, (err, result)=>{
                    if(err) throw err;
                    console.log(`Data added to instructs, named :${teach_id}, ${stud_id}`)
                })
            }

        }
     }
     res.send({
        message : 1
     })
} // Creating a database OR adding data to database

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