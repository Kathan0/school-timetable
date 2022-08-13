import express from 'express';
import connection from '../app.js';
const userRouter = express.Router();

userRouter
    .get('/user', getUser)
    .post('/user', postUser)
    // .patch('/user', patchUser)
    // .delete('/user', deleteUser);

export function getUser(req, res) {
    let date = new Date();

    var data = req.body;
    if(typeof data.name != 'undefined' && typeof data.password != 'undefined'){    
        
        connection.query(`USE school`, (err, result)=>{
        if(err) throw err;
        console.log("Database in use from getUser at "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" on "+("0" + date.getDate()).slice(-2)+"/"+("0" + (date.getMonth() + 1)).slice(-2)+"/"+date.getFullYear());
    })
        connection.query(` 
        SELECT s.id 
        FROM student s
        WHERE s.name = '${data.name}' AND s.password = '${data.password}';`, (err, result)=>{
            if(err) throw err;
            if(result.id > 0){
            console.log("User is recognised");
            var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
            res.send({
                id: resultArray[1][0].id,
                message: 1
            })
            }
            else
            res.send({
                message :0 
            })
        })
    }
    else {
        console.log("Invalid credentials");
        res.send({
            message: -1
        })
    }
}

export function postUser(req, res) { // Update password for user
    var data = req.body;
    let date = new Date();

    if(data.tableName == 'student' && typeof data.type !== 'undefined' && data.type == 'register'){
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
                    console.log("No user found");
                } else {
                    console.log("Registration of User invalid");
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

    else if(data.tableName == 'student' && data.tableName !== 'undefined' && typeof data.type !== 'undefined' && data.type == 'login'){
        if(typeof data.id !== 'undefined' 
        && typeof data.confirmPassword != 'undefined' 
        && typeof data.resetPassword != 'undefined' 
        && data.resetPassword == data.confirmPassword){

            connection.query(`USE school`, (err, result)=>{
                if(err) throw err;
                console.log("Database in use from PostUser in login at "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" on "+("0" + date.getDate()).slice(-2)+"/"+("0" + (date.getMonth() + 1)).slice(-2)+"/"+date.getFullYear());
            })

            connection.query(`SELECT s.password FROM student s WHERE s.id = ${data.id}`, (err, result)=>{
                if(err) throw err;
                var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
                // console.log(resultArray);
                if(resultArray[0].password.length > 0){
                    var passwordData = resultArray[0].password;
                    if(passwordData != data.resetPassword){
                        connection.query(`UPDATE student s SET s.password = ${data.resetPassword} WHERE s.id = ${data.id}`, (err, result)=>{
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
    else if(data.tableName == 'course' && data.tableName != 'undefined' && typeof data.type !=='undefined' && data.type == 'addition'){ // Update 'takes' and 'course: id'
        if(typeof data.stud_id !== 'undefined' && typeof data.course_name !== 'undefined' && typeof data.course_year !== 'undefined'){
            
            connection.query(`USE school`, (err, result)=>{
                if(err) throw err;
                console.log("Database in use from PostUser in addition at "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" on "+("0" + date.getDate()).slice(-2)+"/"+("0" + (date.getMonth() + 1)).slice(-2)+"/"+date.getFullYear());
            })    

            connection.query(`SELECT t.course_id FROM takes t WHERE t.stud_id = ${data.stud_id}`, (err, result)=>{
                if(err) throw err;
                var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
                console.log(resultArray);
                if(resultArray.length > 0){

                }
                else {
                    connection.query(``)
                }
            })
        }



    }
    else{   
    console.log("Post User accessed by invalid request");
    res.send({
        message: -2
    })
}
    
}

// export function patchUser(req, res) {
//     console.log("PatchUser accessed");
//     res.json({
//         message: "PatchUser accessed ",
//         id: 1
//     });
// }

// export function deleteUser(req, res) {
//     console.log("DeleteUser accessed");
//     res.json({
//         message: "DeleteUser accessed ",
//         id: 1
//     });
// }

export default userRouter;