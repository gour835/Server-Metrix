import express from 'express';


const app = express();
app.use(express.json());

app.get('/', function(req, res){
    return res.json('hello');
});

app.post('/api/metrix', function(req, res){
    console.log(req.body);
});

app.listen(8080, function () {
    console.log('server started on port 8080', 'http://localhost:8080/');
})