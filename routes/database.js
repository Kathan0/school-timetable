import connection from '../app.js';
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
    connection.query(`USE school`, (err, result)=>{
        if (err) throw err;
        console.log('Database in use');
    })
    var DataReq = req.body;

        for(const data in DataReq){

        var tableName = data.tableName;

        if(typeof data.teach_id === 'undefined' &&
        typeof data.stud_id === 'undefined' &&
        typeof data.course_id === 'undefined' &&
        typeof data.time_id === 'undefined' &&
        typeof data.room_number_id === 'undefined' ){ // Normal table fill up

            if(typeof data.id === 'undefined' && typeof data.name === 'undefined'){ // Timeslot, classroom

                if(typeof data.time_id === 'undefined'){ // classroom
                    var room_number = data.room_number;
                    var capacity = data.capacity;
                    var block = data.block;

                    connection.query(`INSERT INTO classroom(room_number, capacity, block) VALUES (${room_number}, ${capacity}, '${block}')`, (err, result)=>{
                        if(err) console.log(err);
                        console.log(`Data added to classroom, named :${room_number}, ${capacity}, ${block}`)
                        
                    })

                } else { // Timeslot
                    
                    var time_slot_id = data.time_slot_id;
                    var time_slot = data.time_slot;
                    var day = `'${data.day}'`;

                    connection.query(`INSERT INTO time_slot(time_slot, day) VALUES (${time_slot}, '${day}')`, (err, result)=>{
                        if(err) console.log(err);
                        console.log(`Data added to time slot, named :${time_slot}, ${day} with auto Increment`)
                        
                    })
                }

            } else {    // Student, Teacher, Course
                var id = data.id;
                var name = `'${data.name}'`;

                if(typeof data.year === 'undefined') {   // Student, Teacher
                    
                    if(tableName == "student"){    // Student
                        connection.query(`INSERT INTO student(name) VALUES (${name})`, (err, result)=>{
                            if(err) console.log(err);
                            console.log(`Data added to student, named :${name} with auto Increment`)
                            res.json({
                                'message': 1
                            })
                        })

                    } else { // Teacher
                        connection.query(`INSERT INTO teacher(name) VALUES (${name})`, (err, result)=>{
                            if(err) console.log(err);
                            console.log(`Data added to teacher, named : ${name} with auto increment`)
                            res.json({
                                'message': 1
                            })
                        })
                    }

                } else {    // Course
                    var year = data.year;
                    connection.query(`INSERT INTO course(name, year) VALUES (${name}, ${year})`, (err, result)=>{
                        if(err) console.log(err);
                        console.log(`Data added to course, named :${name}, ${year} with auto increment`)
                        
                    })
                }

            }
            
        } else { // relation table fill up
            if(typeof data.course_id !== 'undefined'){ // takes, teaches, course_time_slot, class_used
                var course_id = data.course_id;

                if(typeof data.teach_id !== 'undefined'){ // teaches
                    var teach_id = data.teach_id;
                    connection.query(`INSERT INTO teaches(teach_id, course_id) VALUES (${teach_id}, ${course_id})`, (err, result)=>{
                        if(err) console.log(err);
                        console.log(`Data added to teaches, named :${teach_id}, ${course_id}`)
                        
                    })
                } 
                else if(typeof data.stud_id !== 'undefined') { // takes
                    var stud_id = data.stud_id;
                    connection.query(`INSERT INTO takes(stud_id, course_id) VALUES (${stud_id}, ${course_id})`, (err, result)=>{
                        if(err) console.log(err);
                        console.log(`Data added to takes, named :${stud_id}, ${course_id}`)
                        
                    })
                }

                else if(typeof data.time_id !== 'undefined') { //course_time_slot
                    var time_id = data.time_id;
                    connection.query(`INSERT INTO course_time_table(course_id, time_id) VALUES (${course_id}, ${time_id})`, (err, result)=>{
                        if(err) console.log(err);
                        console.log(`Data added to course_time_table, named :${course_id}, ${time_id}`)
                        
                    })
                }

                else {  //class_used
                    var room_number_id = data.room_number_id;
                    connection.query(`INSERT INTO class_used(course_id, room_number_id) VALUES (${course_id}, ${room_number_id})`, (err, result)=>{
                        if(err) console.log(err);
                        console.log(`Data added to class used, named :${course_id}, ${room_number_id}`)
                        
                    })
                }

            } else { // Instructs
                var teach_id = data.teach_id;
                var stud_id = data.stud_id;
                connection.query(`INSERT INTO instructs(teach_id, stud_id) VALUES (${teach_id}, ${stud_id})`, (err, result)=>{
                    if(err) console.log(err);
                    console.log(`Data added to instructs, named :${teach_id}, ${stud_id}`)
                    res.json({
                        'message': 1
                    })
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