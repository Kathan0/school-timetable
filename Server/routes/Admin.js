import express from 'express';
import connection from '../app.js';
const adminRouter = express.Router();
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const cors = require('cors');

adminRouter
    .get('/admin', getAdmin)
    .post('/admin', postAdmin);

export function getAdmin(req, res){
    // console.log(req.body);
}

export function postAdmin(req, res){

    var data = req.body;
    console.log(data);

    if(typeof data.type !== 'undefined' && data.type == 'validate'){

        connection.query(`USE school`,(err, result)=>{
            if(err) throw err;
            let date = new Date();
            console.log("Database in use from postAdmin at "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" on "+("0" + date.getDate()).slice(-2)+"/"+("0" + (date.getMonth() + 1)).slice(-2)+"/"+date.getFullYear());
        
            
            connection.query(`SELECT * FROM addition`, (err, resultAddn)=>{
                if(err) throw err;

                var resultArrayAddn = Object.values(JSON.parse(JSON.stringify(resultAddn)));
                if(resultArrayAddn.length > 0){
                    for( var i=0;i < resultArrayAddn.length;i++){
                //    console.log(resultArrayAddn);
                var stud_id = resultArrayAddn[i].stud_id;
                var course_id = resultArrayAddn[i].course_id;

                    connection.query(`INSERT INTO takes(stud_id, course_id) VALUES (${stud_id}, ${course_id});
                    DELETE FROM addition a WHERE a.stud_id = ${stud_id} AND a.course_id = ${course_id}`, (err, result)=>{
                        if(err) throw err;
                        console.log(i+" Addition: stud="+stud_id+" course="+course_id)
                    })
                    
                    // connection.query(`DELETE FROM addition a WHERE a.stud_id = ${stud_id} AND a.course_id = ${course_id}`,(err, result)=>{
                    //     if(err) throw err;
                    //     console.log(i+" Addition: stud="+stud_id+" course="+course_id)
                    // })
                }

                }
            })

            connection.query(`SELECT * FROM substitution`, (err, resultSubn)=>{
                if(err) throw err;

                var resultArraySubn = Object.values(JSON.parse(JSON.stringify(resultSubn)));
                if(resultArraySubn.length > 0){
                    var stud_id = resultArraySubn[i].stud_id;
                    var curr_course_id = resultArraySubn[i].course_id;
                    var sub_course_id = resultArraySubn[i].course_id;
                    for(var i=0; i<resultArraySubn.length; i++)
                        connection.query(`UPDATE takes t SET t.course_id = ${sub_course_id} WHERE t.course_id = ${curr_course_id} AND t.stud_id = ${stud_id};
                        DELETE FROM substitution s WHERE s.stud_id = ${stud_id} AND s.sub_course_id = ${sub_course_id} AND s.curr_course_id = ${curr_course_id}`, (err, result)=>{
                            if(err) throw err;
                            console.log(i+" Substitution: stud="+stud_id+" Curr course="+curr_course_id+" => Sub course:"+sub_course_id);
                        })
                            
                        // connection.query(`DELETE FROM substitution s WHERE s.stud_id = ${stud_id} AND s.sub_course_id = ${sub_course_id} AND s.curr_course_id = ${curr_course_id}`,(err, result)=>{
                        //     if(err) throw err;
                        //     console.log(i+" Substitution: stud="+stud_id+" Curr course="+curr_course_id+" => Sub course:"+sub_course_id);
                        // })
                }

            })

            connection.query(`SELECT * FROM withdrawal`, (err, resultWith)=>{
                if(err) throw err;

                var resultArrayWith = Object.values(JSON.parse(JSON.stringify(resultWith)));
                if(resultArrayWith.length > 0){

                    for(var i=0; i<resultArrayWith.length; i++){
                    var stud_id = resultArrayWith[i].stud_id;
                    var course_id = resultArrayWith[i].course_id;

                    connection.query(`DELETE FROM takes t WHERE t.stud_id = ${stud_id} AND t.course_id = ${course_id};
                    DELETE FROM addition s WHERE s.stud_id = ${stud_id} AND s.course_id = ${course_id}`, (err, resultFinal)=>{
                        if(err) throw err;
                        console.log(i+" Withdrawal: stud="+stud_id+" course="+course_id)
                    })

                    // connection.query(`DELETE FROM addition s WHERE s.stud_id = ${stud_id} AND s.course_id = ${course_id}`,(err, result)=>{
                    //     if(err) throw err;

                    //     console.log(i+" Withdrawal: stud="+stud_id+" course="+course_id)
                    // })
                }   

                }
            })
        })
        res.send({
            message: 1
        })

    } 
    
    else if(typeof data.type != "undefined" && data.type == 'login' && typeof data.name != "undefined" && typeof data.password1 != "undefined" && typeof data.password2 != "undefined"){
        let date = new Date();
        connection.query(`USE school`, (err, result)=>{
        if(err) throw err;
        console.log("Database in use from getUser at "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" on "+("0" + date.getDate()).slice(-2)+"/"+("0" + (date.getMonth() + 1)).slice(-2)+"/"+date.getFullYear());
        })
            connection.query(` 
            SELECT s.id 
            FROM admin s
            WHERE s.name = '${data.name}' AND s.password1 = '${data.password1}' AND s.password2 = '${data.password2}'`, (err, result)=>{
            if(err) throw err;
            var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
            if(resultArray.length == 1){
                console.log("Admin "+resultArray[0].id+" is recognised");
                res.send({
                    id: resultArray[0].id,
                    message: 1
            })
            }
            else
            res.send({
                message: 0
            })
        })
    }
    else res.send({
        message: -1
    })

}

export default adminRouter;