
/*
app.use(express.static('public'))

app.get('*', (req, res) => {
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})


*/

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import createConnection from './config/ConnectMongodb.js';
import * as personaRouter from './router/RouterPersona.js';
import * as userRouter from './router/RouterUser.js';

const app = express();
const port = process.env.PORT ?? 3000;;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
//app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

createConnection();

app.use(personaRouter.router);
app.use(userRouter.router);

app.listen(port, () => {
    console.log('server is runing on port ', port)
});