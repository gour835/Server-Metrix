import express from 'express';

import MongoDb from './config/MongoDb.js';

MongoDb();
const app = express();
app.listen(process.env.PORT, ()=>{
    console.log(`Server Running on Port: ${process.env.PORT}`);
})