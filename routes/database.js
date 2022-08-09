import connection from '../app.js';
import express from 'express';
const dataRouter = express.Router();

dataRouter
    .get('/data', getData) // During login
    .post('/data', postData) // During registration
    .patch('/data', patchData) // During substitution
    .delete('/data', deleteData); //During withdrawal

export function getData(req, res){
    connection.query(`USE school`, (err, result)=>{
        if(err) throw err;
        console.log('Database in use');
    })
    var data  = req.body;

    if(typeof data.name !== 'undefined' && typeof data.password !== 'undefined'){
        if(data.tableName == 'student'){
         connection.query(`SELECT s.id FROM student s WHERE s.name = '${data.name}' AND s.password = '${data.password}'`, (err, result)=>{
            if(err) throw err;

            if(result.length > 0)
            res.send({result, mesage: 1});
            else
            res.send({result, mesage: 0});
        })
    }
    else {
         connection.query(`SELECT s.id FROM teacher s WHERE s.name = '${data.name}' AND s.password = '${data.password}'`, (err, result)=>{
            if(err) throw err;

            if(result.length > 0)
            res.send({result, mesage: 1});
            else
            res.send({result, mesage: 0});
        })
    }
    } else {
        res.send({
            message: -1
        })
    }
}

export function postData(req, res) { //Working

    connection.query(`USE school`, (err, result)=>{
        if (err) throw err;
        console.log('Database in use');
    })
    var data = req.body;

        for(var i=0; i<data.length; i++){

        var tableName = data[i].tableName;

        if(typeof data[i].teach_id === 'undefined' &&
        typeof data[i].stud_id === 'undefined' &&
        typeof data[i].course_id === 'undefined' &&
        typeof data[i].time_id === 'undefined' &&
        typeof data[i].room_number_id === 'undefined' ){ // Normal table fill up

            if(typeof data[i].id === 'undefined' && typeof data[i].name === 'undefined'){ // Timeslot, classroom

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

                if(typeof data[i].year === 'undefined') {   // Student, Teacher
                    
                    if(tableName == "student"){    // Student
                        var password = `'${data[i].password}'`;
                         connection.query(`INSERT INTO student(name, password) VALUES (${name}, ${password})`, (err, result)=>{
                            if(err) throw err;
                            console.log(`Data added to student, named :${name} ${password} with auto Increment`)
                        })

                    } else { // Teacher
                         connection.query(`INSERT INTO teacher(name, password) VALUES (${name}, '${data[i].password}')`, (err, result)=>{
                            if(err) throw err;
                            console.log(`Data added to teacher, named : ${name}, ${password} with auto increment`)
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
    res.json({
        message: 1
    })
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