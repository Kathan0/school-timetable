import express from 'express';
import connection from '../app.js';
const userRouter = express.Router();
import { createRequire } from "module";
const require = createRequire(import.meta.url);

userRouter
    .get('/user',  getUser)
    .post('/user',  postUser)
    .patch('/user',  patchUser)
    .delete('/user',  deleteUser);

export function getUser(req, res) { // Login, Details for User, substitution. addition, withdrawal
    let date = new Date();

    var data = req.query;

    if(typeof data.type != 'undefined' && data.type == 'details' && typeof data.stud_id != 'undefined'){
        connection.query(`USE school`, (err, result)=>{
            if(err) throw err
            console.log("Database in use from getUser at "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" on "+("0" + date.getDate()).slice(-2)+"/"+("0" + (date.getMonth() + 1)).slice(-2)+"/"+date.getFullYear());

            connection.query(`SELECT t.course_id FROM takes t WHERE t.stud_id = ${data.stud_id}`, (err, resultTakes)=>{
                if(err) throw err
                var resultArrayTakes = Object.values(JSON.parse(JSON.stringify(resultTakes)));

                if(resultArrayTakes.length > 0){    // All courses which student has taken
                                                    // Course time slot: C_name, c_year, time_slot, day
                                                    // instructs: c_name, c_year, teach_name from teach_id
                    var obj = [];
                    
                    for(var i=0; i<resultArrayTakes.length; i++){ //time_slot, day, c name, year, instructor, classroom, block,

                        connection.query(`
                        SELECT ts.time_slot, ts.day, c.year, c.name, t.name, cls.room_number, cls.block
                        FROM (((((
                            course_time_slot cts INNER JOIN time_slot ts ON cts.time_id = ts.time_slot_id)
                            INNER JOIN course c ON c.id = cts.course_id)
                            INNER JOIN teaches tch ON tch.course_id = c.id)
                            INNER JOIN class_used cu ON cu.course_id = c.id)
                            INNER JOIN classroom cls ON cls.room_number = cu.room_number_id)
                            INNER JOIN teacher t ON t.id = tch.teach_id
                        WHERE c.id = ${resultArrayTakes[i].course_id}`, (err, resultCombine)=>{ //teacher , teaches, cts, time slot
                            if(err) throw err
                            var arrayFinal = Object.values(JSON.parse(JSON.stringify(resultCombine)));
                            obj.push(arrayFinal);
                        })
                        
                    }
                    setTimeout(()=>{res.send({
                        obj,
                        mesage: 1
                    })}, 300*resultArrayTakes.length);

                } else 
                    res.send({
                        message: -2 // No course for user
                    })
            })
        })
    }

    else if(typeof data.type != 'undefined' && data.type == 'addition' && typeof data.stud_id != 'undefined'){

        connection.query(`USE school`, (err, result)=>{
            if(err) throw err
            console.log("Database in use from getUser at "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" on "+("0" + date.getDate()).slice(-2)+"/"+("0" + (date.getMonth() + 1)).slice(-2)+"/"+date.getFullYear());
            
            connection.query(`SELECT a.course_id FROM addition a WHERE a.stud_id = ${data.stud_id}`, (err, resultAddition)=>{
                if(err) throw err
                var resultArrayAddition = Object.values(JSON.parse(JSON.stringify(resultAddition)))

                if(resultArrayAddition.length> 0){

                    var obj = []
                    for(var i=0; i<resultArrayAddition.length; i++){

                        connection.query(`
                        SELECT c.name AS course_name, c.year AS course_year, t.name AS teach_name
                        FROM ((addition a INNER JOIN course c ON a.course_id = c.id) INNER JOIN teaches ts ON ts.course_id = c.id) INNER JOIN teacher t ON t.id = ts.teach_id
                        WHERE a.stud_id = ${data.stud_id}`, (err, resultFinal)=>{
                            if(err) throw err

                            obj.push(Object.values(JSON.parse(JSON.stringify(resultFinal))));
                        })

                    }
                    setTimeout(()=>console.log(obj), 100*(resultArrayAddition.length));
                    res.send({message: 1});

                } else res.send({
                    message: 0
                })
            })
        })
    }

    else if(typeof data.type != 'undefined' && data.type == 'withdrawal' && typeof data.stud_id != 'undefined'){

        connection.query(`USE school`, (err, result)=>{
            if(err) throw err
            console.log("Database in use from getUser at "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" on "+("0" + date.getDate()).slice(-2)+"/"+("0" + (date.getMonth() + 1)).slice(-2)+"/"+date.getFullYear());
            
            connection.query(`SELECT a.course_id FROM withdrawal a WHERE a.stud_id = ${data.stud_id}`, (err, resultWithdrawal)=>{
                if(err) throw err
                var resultArrayWithdrawal = Object.values(JSON.parse(JSON.stringify(resultWithdrawal)))

                if(resultArrayWithdrawal.length> 0){

                    var obj = []
                    for(var i=0; i<resultArrayWithdrawal.length; i++){

                        connection.query(`
                        SELECT c.name AS course_name, c.year AS course_year, t.name AS teach_name
                        FROM ((withdrawal a INNER JOIN course c ON a.course_id = c.id) INNER JOIN teaches ts ON ts.course_id = c.id) INNER JOIN teacher t ON t.id = ts.teach_id
                        WHERE a.stud_id = ${data.stud_id}`, (err, resultFinal)=>{
                            if(err) throw err

                            obj.push(Object.values(JSON.parse(JSON.stringify(resultFinal))));
                        })

                    }
                    setTimeout(()=>console.log(obj), 100*resultArrayWithdrawal);
                    res.send({message: 1});

                } else res.send({
                    message: 0
                })
            })
        })
    }

    else if(typeof data.type != 'undefined' && data.type == 'substitution' && typeof data.stud_id != 'undefined'){

        connection.query(`USE school`, (err, result)=>{
            if(err) throw err
            console.log("Database in use from getUser at "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" on "+("0" + date.getDate()).slice(-2)+"/"+("0" + (date.getMonth() + 1)).slice(-2)+"/"+date.getFullYear());
            
            connection.query(`SELECT s.curr_course_id, s.sub_course_id FROM substitution s WHERE s.stud_id = ${data.stud_id}`, (err, resultSubstitution)=>{
                if(err) throw err
                var resultArraySubstitution = Object.values(JSON.parse(JSON.stringify(resultSubstitution)))

                if(resultArraySubstitution.length> 0){

                    var obj = []
                    for(var i=0; i<resultArraySubstitution.length; i++){

                        connection.query(`
                        SELECT c.name AS course_name, c.year AS course_year, t.name AS teach_name
                        FROM ((substitution s INNER JOIN course c ON s.curr_course_id = c.id) INNER JOIN teaches ts ON ts.course_id = c.id) INNER JOIN teacher t ON t.id = ts.teach_id
                        WHERE s.stud_id = ${data.stud_id}`, (err, resultFinal)=>{
                            if(err) throw err

                            obj.push(Object.values(JSON.parse(JSON.stringify(resultFinal))));
                        })

                        connection.query(`
                        SELECT c.name AS course_name, c.year AS course_year, t.name AS teach_name
                        FROM ((substitution s INNER JOIN course c ON s.sub_course_id = c.id) INNER JOIN teaches ts ON ts.course_id = c.id) INNER JOIN teacher t ON t.id = ts.teach_id
                        WHERE s.stud_id = ${data.stud_id}`, (err, resultFinal)=>{
                            if(err) throw err

                            obj.push(Object.values(JSON.parse(JSON.stringify(resultFinal))));
                        })

                    }
                    setTimeout(()=>console.log(obj), 100);
                    res.send({message: 1});

                } else res.send({
                    message: 0
                })
            })
        })
    }

    else {
        console.log("Invalid credentials in getUser");
        res.send({
            message: -1
        })
    }
}

export function postUser(req, res) { // Update password for user, Register for timetable, Addition option
    var data = req.body;
    let date = new Date();
    
    if(typeof data.type != 'undefined' && data.type == 'login' && typeof data.name != 'undefined' && typeof data.password != 'undefined'){    
        
        connection.query(`USE school`, (err, result)=>{
        if(err) throw err;
        console.log("Database in use from getUser at "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" on "+("0" + date.getDate()).slice(-2)+"/"+("0" + (date.getMonth() + 1)).slice(-2)+"/"+date.getFullYear());
    })
            connection.query(` 
            SELECT s.id 
            FROM student s
            WHERE s.name = '${data.name}' AND s.password = '${data.password}';`, (err, result)=>{
            if(err) throw err;
            var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
            if(resultArray.length == 1){
                console.log("User is recognised");
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

    else if(typeof data.type !== 'undefined' && data.type == 'register'){
        if(typeof data.name !== 'undefined' 
        && typeof data.password !== 'undefined' 
        && typeof data.year !== 'undefined'){

        connection.query(`USE school`, (err, result)=>{
            if(err) throw err;
            console.log("Database in use from PostUser in registration at "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" on "+("0" + date.getDate()).slice(-2)+"/"+("0" + (date.getMonth() + 1)).slice(-2)+"/"+date.getFullYear());
        })

            connection.query(`
            SELECT s.id
            FROM student s
            WHERE s.name = '${data.name}'
            AND s.password = '${data.password}'
            AND s.year = ${data.year}`, (err, result)=>{
                if(err) throw err;
                var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
                if(resultArray.length == 0){
                    console.log("No user found"); //Left
                } else {
                    console.log("Registration of User invalid");
                    console.log("----------------------------------------")
                    res.send({
                        message: 0
                    })
                }
            })
        }
        else res.send({
            result:"Nope",
            message: -1
        })
    }

    else if(typeof data.type !== 'undefined' && data.type == 'resetPassword'){
        if(typeof data.stud_id !== 'undefined' 
        && typeof data.confirmPassword != 'undefined' 
        && typeof data.resetPassword != 'undefined' 
        && data.resetPassword == data.confirmPassword){

            connection.query(`USE school`, (err, result)=>{
                if(err) throw err;
                console.log("Database in use from PostUser in login at "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" on "+("0" + date.getDate()).slice(-2)+"/"+("0" + (date.getMonth() + 1)).slice(-2)+"/"+date.getFullYear());
            })

            connection.query(`SELECT s.password FROM student s WHERE s.id = ${data.stud_id}`, (err, result)=>{
                if(err) throw err;
                var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
                // console.log(resultArray);
                if(resultArray[0].password.length > 0){
                    var passwordData = resultArray[0].password;
                    if(passwordData != data.resetPassword){
                        connection.query(`UPDATE student s SET s.password = ${data.resetPassword} WHERE s.id = ${data.stud_id}`, (err, result)=>{
                            if(err) throw err;
                            var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
                            console.log(resultArray);
                            if(resultArray[1] == 1){
                                console.log("Password updated successfully");
                                res.send({
                                    message: 1 //Successful
                                })
                            }
                            else res.send({
                                message: -3
                            })
                        });
                    }
                }
            })
        }
        else 
        res.send({
            message: -1
        })

    }

    else if(typeof data.type !=='undefined' && data.type == 'addition'){ // Update 'takes', message: -1=invalid cred, -2 addn req already, 0=course already present
        if(typeof data.stud_id !== 'undefined' 
        && typeof data.course_name !== 'undefined' 
        && typeof data.course_year !== 'undefined'){
            
            connection.query(`USE school`, (err, result)=>{
                if(err) throw err;
                console.log("Database in use from PostUser in addition at "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" on "+("0" + date.getDate()).slice(-2)+"/"+("0" + (date.getMonth() + 1)).slice(-2)+"/"+date.getFullYear());
            })    

            connection.query(`SELECT t.course_id FROM takes t WHERE t.stud_id = ${data.stud_id}`, (err, result)=>{
                if(err) throw err;

                var resultArray = Object.values(JSON.parse(JSON.stringify(result)));

                    connection.query(`SELECT c.id FROM course c WHERE c.name = '${data.course_name}' AND c.year = ${data.course_year}`, (err, result2)=>{
                        if(err) throw err;
                        
                        var resultArrayCourse = Object.values(JSON.parse(JSON.stringify(result2)));

                        if(resultArray.length > 0){

                            var takenCourse = false;
                            for(var i=0; i<resultArray.length; i++){
                                if(resultArray[i].course_id == resultArrayCourse[0].id)
                                takenCourse = true;
                            }
                            if(takenCourse == false){
                                connection.query(`SELECT * FROM addition a WHERE a.stud_id = ${data.stud_id} AND a.course_id = ${resultArrayCourse[0].id}`, (err, result)=>{
                                    if(err) throw err;
                                    var resultArrayAddition = Object.values(JSON.parse(JSON.stringify(result)));

                                    if(resultArrayAddition.length == 0)

                                    // Admin
                                    // connection.query(`INSERT INTO takes(stud_id, course_id) VALUES (${data.stud_id}, ${resultArrayCourse[0].id})`, (err, result)=>{
                                    // if(err) throw err;
                                    //
                                    
                                        connection.query(`INSERT INTO addition(stud_id, course_id) VALUES(${data.stud_id}, ${resultArrayCourse[0].id})`, (err, result)=>{
                                            if(err) throw err;

                                            console.log("Course with name:"+data.course_name+", year:"+data.course_year+" and course id:"+resultArrayCourse[0].id+" Successfully added to your course, user id:"+data.stud_id);
                                            res.send({
                                                message: 1
                                            })

                                        })
                                    
                                // })
                                else res.send({
                                    message: -2
                                })
                                })
                            }   
                            else
                            res.send({
                                message: 0
                            })
                        }
                        else {
                            connection.query(`SELECT * FROM addition a WHERE a.stud_id = ${data.stud_id} AND a.course_id = ${resultArrayCourse[0].id}`, (err, result)=>{
                                if(err) throw err;
                                var resultArrayAddition = Object.values(JSON.parse(JSON.stringify(result)));
                                if(resultArrayAddition.length == 0)


                                connection.query(`INSERT INTO addition(stud_id, course_id) VALUES(${data.stud_id}, ${resultArrayCourse[0].id})`, (err, result)=>{
                                        if(err) throw err;

                                        console.log("Course with name:"+data.course_name+", year:"+data.course_year+" and course id:"+resultArrayCourse[0].id+" Successfully added to your course, user id:"+data.stud_id);
                                        res.send({
                                            message: 1
                                        })
                                    })
                            // })
                            else res.send({
                                messsage: -2
                            })
                        })
                    }
                })

            })
        }
        else 
        res.send({
            message: -1
        })

    }
    else{   
    console.log("Post User accessed by invalid request");
    res.send({
        message: -2
    })
}
    
}

export function patchUser(req, res) { //Substitution message: 1=> Successful, 0=> No curr_course, -1=>invalid credentials, -2=>sub_course already, -3 Sub request already Done, -4 With request with same course
    var data = req.body;
    let date = new Date();

    if(typeof data.type !== 'undefined' && data.type == 'substitution'){
        if(typeof data.curr_course_name !== 'undefined' 
        && typeof data.curr_course_year !== 'undefined' 
        && typeof data.sub_course_name !== 'undefined' 
        && typeof data.sub_course_year !== 'undefined' 
        && typeof data.stud_id !== undefined 
        && data.curr_course_year == data.sub_course_year){
            connection.query(`USE school`, (err, result)=>{
                if(err) throw err;
                console.log("Database in use from patchUser in substitution at "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" on "+("0" + date.getDate()).slice(-2)+"/"+("0" + (date.getMonth() + 1)).slice(-2)+"/"+date.getFullYear());
            })
            connection.query(`SELECT c.id FROM course c WHERE c.name = '${data.curr_course_name}' AND c.year = ${data.curr_course_year}`, (err, resultCurr)=>{
                if(err) throw err
                var resultArrayCurr = Object.values(JSON.parse(JSON.stringify(resultCurr)))

                connection.query(`SELECT c.id FROM course c WHERE c.name = '${data.sub_course_name}' AND c.year = ${data.sub_course_year}`, (err, resultSub)=>{
                    if(err) throw err
                    var resultArraySub = Object.values(JSON.parse(JSON.stringify(resultSub)))
                    
                        connection.query(`SELECT t.course_id FROM takes t WHERE t.stud_id = ${data.stud_id} AND t.course_id = ${resultArrayCurr[0].id}`, (err, resultTakesCurr)=>{
                            if(err) throw err;
                            var resultArrayTakesCurr = Object.values(JSON.parse(JSON.stringify(resultTakesCurr)));

                            if(resultArrayTakesCurr.length > 0){

                                connection.query(`SELECT t.course_id FROM takes t WHERE t.stud_id = ${data.stud_id} AND t.course_id = ${resultArraySub[0].id}`, (err, resultTakesSub)=>{
                                    if(err) throw err;
                                    var resultArrayTakesSub = Object.values(JSON.parse(JSON.stringify(resultTakesSub)));

                                    if(resultArrayTakesSub.length == 0){

                                        connection.query(`SELECT * FROM substitution s WHERE s.stud_id = ${data.stud_id} AND s.curr_course_id = ${resultArrayCurr[0].id} OR s.curr_course_id = ${resultArraySub[0].id} AND s.sub_course_id = ${resultArraySub[0].id} OR s.sub_course_id = ${resultArrayCurr[0].id}`, (err, result)=>{
                                            if(err) throw err;
                                            var resultArray = Object.values(JSON.parse(JSON.stringify(result)));

                                            if(resultArray.length == 0){

                                                connection.query(`SELECT * FROM withdrawal w WHERE w.stud_id = ${data.stud_id} AND (w.course_id = ${resultArraySub[0].id} OR w.course_id = ${resultArrayCurr[0].id})`, (err, resultWithdraw)=>{
                                                    if(err) throw err;
                                                    resultArrayWith = Object.values(JSON.parse(JSON.stringify(resultWithdraw)));

                                                    if(resultArrayWith.length == 0){

                                                        connection.query(`INSERT INTO substitution(stud_id, curr_course_id, sub_course_id) VALUES (${data.stud_id}, ${resultArrayCurr[0].id}, ${resultArraySub[0].id})`, (err, result)=>{
                                                            if(err) throw err;
                                                            console.log(`Data added after substitution from \n id: `+resultArrayCurr[0].id+` to `+resultArraySub[0].id+`\n name:`+data.curr_course_name+` to `+data.sub_course_name+`\n year:`+data.curr_course_year+` to `+data.sub_course_year+`\n student id:`+data.stud_id);
                                                        })
                                                        
                                                        res.send({
                                                            message: 1
                                                        })

                                                    } else res.send({
                                                        message: -4 // With request with sub or curr course
                                                    })
                                                })
                                            
                                            } else
                                                res.send({
                                                    message: -3 // Sub request already done
                                                })
                                        })
                                    } else
                                        res.send({
                                            message: -2 //sub_course already exist
                                        })
                                })
                            } else
                                res.send({
                                    message: 0 //curr_course doesnt exist
                                })
                        })
                })
            })
        }
        else res.send({
            message: -1
        })
    }
}

export function deleteUser(req, res) { // message=> -1: invalid cred, -2: course no exist
    // console.log("DeleteUser accessed");
    // res.json({
    //     message: "DeleteUser accessed ",
    //     id: 1
    // });

    var data = req.body;
    if(typeof data.course_name != 'undefined' && typeof data.course_year != 'undefined' && typeof data.stud_id != 'undefined'){
        connection.query(`USE school`, (err, result)=>{
            if(err) throw err;
            let date = new Date();
            console.log("Database in use from PostUser in addition at "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" on "+("0" + date.getDate()).slice(-2)+"/"+("0" + (date.getMonth() + 1)).slice(-2)+"/"+date.getFullYear());
            
            connection.query(`SELECT c.id FROM course c WHERE c.name = '${data.course_name}' AND c.year = ${data.course_year}`, (err, resultID)=>{
                if(err) throw err;
                var resultArrayCid = Object.values(JSON.parse(JSON.stringify(resultID)));

                if(resultArrayCid.length > 0){
                    // console.log(resultArrayCid); resultArrayCid[0].id
                    connection.query(`SELECT * FROM takes t WHERE t.stud_id = ${data.stud_id} AND t.course_id = ${resultArrayCid[0].id}`, (err, resultTakes)=>{
                    if(err) throw err;
                        var resultArrayTakes = Object.values(JSON.parse(JSON.stringify(resultTakes)));
                        if(resultArrayTakes.length > 0){

                            connection.query(`SELECT * FROM substitution s WHERE s.stud_id = ${data.stud_id} AND (s.curr_course_id = ${resultArrayCid[0].id} OR s.sub_course_id = ${resultArrayCid[0].id})`, (err, resultSub)=>{
                                if(err) throw err;
                                var resultArraySub = Object.values(JSON.parse(JSON.stringify(resultSub)));
                                if(resultArraySub.length == 0){

                                    connection.query(`SELECT * FROM withdrawal w WHERE w.stud_id = ${data.stud_id} AND w.course_id = ${resultArrayCid[0].id}`, (err, resultWith)=>{
                                        if(err) throw err;
                                        var resultArrayWith = Object.values(JSON.parse(JSON.stringify(resultWith)));

                                        if(resultArrayWith.length == 0){

                                            connection.query(`INSERT INTO withdrawal(stud_id, course_id) VALUES (${data.stud_id}, ${resultArrayCid[0].id})`, (err, resultFinal)=>{
                                                if(err) throw err;
                                            })
                                            res.send({
                                                message: 1
                                            })
                                        
                                        }
                                        else res.send({
                                            message: -4
                                        })
                                    })
                                
                                }
                                else res.send({
                                    message: -4
                                })
                            })
                        } else res.send({
                            message: -3
                        })

                    })
                } else res.send({
                    message: -2
                })
            })
        })

    } else res.send({
        message: -1
    })
}

export default userRouter;