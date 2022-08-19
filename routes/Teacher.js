import express from 'express';
import connection from '../app.js';

const teacherRouter = express.Router();

teacherRouter
    .get('/teacher', getTeacher)
    .post('/teacher', postTeacher)
    .patch('/teacher', patchTeacher)
    .delete('/teacher', deleteTeacher);

export function getTeacher(req, res) {
    var data = req.body;
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