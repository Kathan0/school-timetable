import express from 'express';
import connection from '../app.js';

const teacherRouter = express.Router();

teacherRouter
    .get('/teacher', getTeacher)
    .post('/teacher', postTeacher)
    .patch('/teacher', patchTeacher)
    .delete('/teacher', deleteTeacher);

export function getTeacher(req, res) {
    if(typeof req.body.teach_id != 'undefined' && req.body.type != 'undefined' && req.body.type == 'details'){ //course, time_slot and room number
        var data = req.body;
        let date = new Date();
        connection.query(`USE school`, (err, result)=>{
            if(err) throw err;
            console.log("Database, getTeacher, "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" on "+("0" + date.getDate()).slice(-2)+"/"+("0" + (date.getMonth() + 1)).slice(-2)+"/"+date.getFullYear());

                connection.query(`SELECT i.course_id FROM teaches i WHERE i.teach_id = ${data.teach_id}`, (err, resultCourse)=>{
                    if(err) throw err
                        var resultArrayCourse = Object.values(JSON.parse(JSON.stringify(resultCourse)));
                        // console.log(resultArrayCourse);
                        if(resultArrayCourse.length>0){
                            
                            var obj = []
                            for(var i=0; i<resultArrayCourse.length; i++)
                            connection.query(`
                            SELECT ts.time_slot, ts.day, c.name, c.year, cl.room_number, cl.block
                            FROM ((((course c INNER JOIN teaches tch ON tch.course_id = c.id AND tch.teach_id = ${data.teach_id})
                            INNER JOIN course_time_slot cts ON cts.course_id = c.id)
                            INNER JOIN class_used cu ON cu.course_id = c.id)
                            INNER JOIN time_slot ts ON ts.time_slot_id = cts.time_id)
                            INNER JOIN classroom cl ON cl.room_number = cu.room_number_id
                            WHERE tch.course_id = ${resultArrayCourse[i].course_id}`, (err, resultCombine)=>{
                                    if(err) throw err;

                                var resultArrayCombine = Object.values(JSON.parse(JSON.stringify(resultCombine)));
                                obj.push(resultArrayCombine);
                            })

                            setTimeout(()=>{console.log(obj), res.send({
                                obj, 
                                message: 1
                            })}, 200*(resultArrayCourse.length))


                        } else res.send({
                            message: 0
                        })
                })
        })
    }

    else res.send({
        message: -1
    })
}

export function postTeacher(req, res) {
    console.log("PostTeacher accessed");
    res.json({
        message: "PostTeacher accessed ",
        id: 2
    });
}

export function patchTeacher(req, res) {
    console.log("PatchTeacher accessed");
    res.json({
        message: "PatchTeacher accessed ",
        id: 2
    });
}

export function deleteTeacher(req, res) {
    console.log("DeleteTeacher accessed");
    res.json({
        message: "DeleteTeacher accessed ",
        id: 2
    });
}

export default teacherRouter;