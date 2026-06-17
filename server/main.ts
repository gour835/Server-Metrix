import express from 'express';
import type  {Request, Response, Application} from 'express';
import MongoDb from './config/MongoDb.js';

MongoDb();

const app: Application = express();
app.use(express.json());
app.get("/", (req: Request, res: Response)=>{
    res.send('Hello from TypeScript');
});

app.listen(process.env.PORT, ()=>{
    console.log(`Server Running on Port: ${process.env.PORT}`);
})