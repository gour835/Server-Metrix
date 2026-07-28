import express, { type Request, type Response } from 'express';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import serverModel from './models/server.model.js';
import { randomUUID } from 'crypto';
import MongoDb from './config/MongoDb.config.js';
import client from './config/Redis.config.js';
import ServerMetrixModel from './models/serverMetrix.model.js';
import { SendMetrixs } from './queue.js';

interface ServerRequest {
    Ipv4: string,
    Ipv6?: string,
    SecretKey: string
}

interface ServerMetrixData{
    Ipv4: string,
    x_api_key: string
}

const app = express();
app.use(express.json());

MongoDb();

const limiter = rateLimit({
    windowMs: 2 * 60 * 100,
    max: 10
});
const Speedlimiter = slowDown({
    windowMs: 2 * 60 * 100,
    delayAfter: 3,
    delayMs: () => 2000
});

app.use(Speedlimiter)
app.use(limiter);


app.get('/', async function (req, res) {
    try {
        const work = await SendMetrixs.add('test', {
            email: 'test@gmial.ocm',
            number: '020934'
        })
        return res.json('hello');
    } catch (error) {

        console.log('Failed to add job to queue:', error);
        return res.status(500).json({ error: 'Internal server error' });

    }
});

app.post('/api/metrix', async function (req, res) {
    try {
        //verify the x_api_key from the request
        const x_api_key = req.body.x_api_key;
        if (!x_api_key) {
            return res.status(400).json({ 'success': false, 'message': 'X_Api_Key is required' });
        }
        const server = await serverModel.findOne({ x_api_key });
        if (!server) {
            return res.status(401).json({ 'success': false, 'message': 'X_Api_Key is not valid' });
        }

        const data = {
            'timeStamp': req.body.timeStamp,
            'memory': req.body.memory,
            'cpus': req.body.cpus,
            'metadata': {
                x_api_key,
                'ipv4': server.Ipv4
            }
        }

        await ServerMetrixModel.insertOne(data);

        await client.set(`server:metrics:live:${server.Ipv4}`, JSON.stringify(data), {
            EX: 15
        });

        const redis_data = await client.get(`server:metrics:live:${server.Ipv4}`);

        console.log(redis_data);


    } catch (error: any) {
        return res.status(500).json({ 'success': false, message: error.message });
    }
});

app.post('/api/show-metrix', async function (req, res) {
    try {
        //verify the x_api_key from the request
        const x_api_key = req.body.x_api_key;
        if (!x_api_key) {
            return res.status(400).json({ 'success': false, 'message': 'X_Api_Key is required' });
        }
        const server = await serverModel.findOne({ x_api_key });
        if (!server) {
            return res.status(401).json({ 'success': false, 'message': 'X_Api_Key is not valid' });
        }

        const metadata = {
            x_api_key: server.x_api_key,
            Ipv4: server.Ipv4
        };
        await ServerMetrixModel.findOne({metadata: metadata});

        const data= await ServerMetrixModel.findOne({metadata: metadata}) as ServerMetrixData | null;
        if(data && data.Ipv4 && data.x_api_key){
            return res.status(200).json(data);
        }

        return res.status(404).json({ 'success': false, 'message': 'No data found ' })
    } catch (error: any) {
        return res.status(500).json({ 'success': false, message: error.message });
    }
});

app.post('/api/metrix/register', async function (req: Request<{}, {}, ServerRequest>, res: Response) {
    try {
        //verify that the request is comming from the internal server rather then from everywhere
        const Server_Secret_Key = process.env.SERVER_SECRET_KEY;
        if (Server_Secret_Key != req.body.SecretKey) {
            return res.status(400).json({ 'message': 'Not Authorised to register this server' })
        }
        const ExistingServer = await serverModel.findOne({ Ipv4: req.body.Ipv4 });
        if (ExistingServer) {
            return res.status(202).json({ 'message': 'Server is Already Registered.', x_api_key: ExistingServer.x_api_key });
        }
        const x_api_key = randomUUID();

        const server = new serverModel();
        server.Ipv4 = req.body.Ipv4
        if (req.body.Ipv6) {
            server.Ipv6 = req.body.Ipv6;
        }
        server.x_api_key = x_api_key;

        server.save();
        return res.status(200).json({ 'success': true, 'message': 'Server Registered Successfully', x_api_key })

    } catch (error: any) {
        return res.status(500).json({ 'success': false, 'message': error.message });
    }

});

app.listen(8080, function () {
    console.log('server started on port 8080', 'http://localhost:8080/');
})