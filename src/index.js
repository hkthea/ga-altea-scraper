import express from 'express';
import {port} from './const/env';
import bodyParser from 'body-parser';
import { core, controller } from './lib/main-core'

const server = express();

let k=core(2, server);

server.listen(port, ()=>{
    console.log("server listened");
})

server.use('/api/v1',function(req,res,next){
    next();
})


server.use(bodyParser.json()); // for parsing application/json
server.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

server.get('/scrapper',function(req,res){
    sc.get('/').then(resp=>{
        console.log(resp.substring(0,30));        
        res.end(resp);
    },error=>console.log(error));
})

server.get('/api',function(req,res){
    res.end('API');
})

server.post('/api/v1',controller.searchAvail);

// server.use(function (req, res, next) {
//     res.end('not FOund');
//     next();
// })

// server.use(function (err, req, res, next) {
//     res.status(500).send(err)
// })
  