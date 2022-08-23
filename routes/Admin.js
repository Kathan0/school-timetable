import express from 'express';
import connection from '../app.js';
const adminRouter = express.Router();

userRouter
    .get('/admin', getAdmin)
    .post('/admin', postAdmin)
    // .patch('/admin', patchAdmin)
    // .delete('/admin', deleteAdmin);

export function getAdmin(req, res){

}

export function postAdmin(req, res){

    if(typeof req.body.type !== 'undefined' && req.body.type == 'validate'){
    var data = req.body;

        connection.query(`USE school`,(err, result)=>{
            if(err) throw err;
            console.log("Database in use from getUser at "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" on "+("0" + date.getDate()).slice(-2)+"/"+("0" + (date.getMonth() + 1)).slice(-2)+"/"+date.getFullYear());
        
            
            connection.query(`SELECT * FROM addition`, (err, resultAddn)=>{
                if(err) throw err;

                var resultArrayAddn = Object.values(JSON.parse(JSON.stringify(resultAddn)));
                if(resultArrayAddn.length > 0){

                    // connection.query(`INSERT INTO takes(stud_id, course_id) VALUES (${data.stud_id}, ${resultArrayCourse[0].id})`, (err, result)=>{
                    //     if(err) throw err;
                    // })

                }
            })

            connection.query(`SELECT * FROM substitution`, (err, resultSubn)=>{
                if(err) throw err;

                var resultArraySubn = Object.values(JSON.parse(JSON.stringify(resultSubn)));
                if(resultArraySubn.length > 0){

                    // connection.query(`UPDATE takes t SET t.course_id = ${resultArraySub[0].id} WHERE t.course_id = ${resultArrayCurr[0].id} AND t.stud_id = ${data.stud_id}`, (err, result)=>{
                    //     if(err) throw err;
                    // })

                }
            })

            connection.query(`SELECT * FROM withdrawal`, (err, resultWith)=>{
                if(err) throw err;

                var resultArrayWith = Object.values(JSON.parse(JSON.stringify(resultWith)));
                if(resultArrayWith.length > 0){

                    connection.query(`DELETE FROM takes t WHERE t.stud_id = ${data.stud_id} AND t.course_id = ${resultArrayCid[0].id}`, (err, resultFinal)=>{
                        if(err) throw err;
                        console.log("Course with name:"+data.course_name+", year:"+data.course_year+" and course id:"+resultArrayCid[0].id+" Successfully REMOVED to your course, user id:"+data.stud_id)
                    })

                }
            })
        })

    } else res.send({
        message: -1
    })

}