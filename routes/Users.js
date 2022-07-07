import express from 'express';
const userRouter = express.Router();

userRouter
    .get('/user', getUser)
    .post('/user', postUser)
    .patch('/user', patchUser)
    .delete('/user', deleteUser);

export function getUser(req, res) {
    console.log("GetUser accessed");
    res.json({
        message: "getUser accessed",
        id: 1
    });
}

export function postUser(req, res) {
    console.log("PostUser accessed");
    res.json({
        message: "PostUser accessed ",
        id: 1
    });
}

export function patchUser(req, res) {
    console.log("PatchUser accessed");
    res.json({
        message: "PatchUser accessed ",
        id: 1
    });
}

export function deleteUser(req, res) {
    console.log("DeleteUser accessed");
    res.json({
        message: "DeleteUser accessed ",
        id: 1
    });
}

export default userRouter;