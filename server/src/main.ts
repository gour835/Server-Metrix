import express, { type Request, type Response } from 'express';
import serverModel from './models/server.model.js';
import { randomUUID } from 'crypto';

interface ServerRequest {
    Ipv4: string,
    Ipv6?: string,
    SecretKey: string
}

const app = express();
app.use(express.json());

app.get('/', function(req, res){
    return res.json('hello');
});

app.post('/api/metrix', function(req, res){
    console.log(req.body);
});

app.post('/api/metrix/register',async function (req: Request<{}, {}, ServerRequest>, res: Response) {
    try {
        //verify that the request is comming from the internal server rather then from everywhere
        const Server_Secret_Key = process.env.SERVER_SECRET_KEY;
        if (!req.body.SecretKey || (Server_Secret_Key !== req.body.SecretKey)) {
            return res.status(400).json({'message' : 'Not Authorised to register this server'})
        }
        const ExistingServer = await serverModel.findOne({Ipv4: req.body.Ipv4});
        if(ExistingServer){
            return res.status(202).json({'message': 'Server is Already Registered.', x_api_key: ExistingServer.x_api_key});
        }
        const x_api_key = randomUUID();
    
        const server = new serverModel();
        server.Ipv4 = req.body.Ipv4
        if (req.body.Ipv6) {
            server.Ipv6 = req.body.Ipv6;
        }
        server.x_api_key = x_api_key;
        
        server.save();
        return res.status(200).json({'success': true, 'message': 'Server Registered Successfully', x_api_key})
    
    } catch (error:any) {
        return res.status(500).json({'success': false, 'message': error.message});
    }
    
});

app.listen(8080, function () {
    console.log('server started on port 8080', 'http://localhost:8080/');
})