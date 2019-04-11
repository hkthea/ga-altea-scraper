import express from 'express';
import {port, instance_puppet} from './const/env';
import bodyParser from 'body-parser';
import { core, router } from './lib/main-core'

const server = express();
console.log(instance_puppet);

let k=core(instance_puppet);

server.listen(port, '127.0.0.1', ()=>{
    console.log("server listened");
})

server.use('/api/v1',function(req,res,next){
    next();
})

server.use(bodyParser.json()); // for parsing application/json
server.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
server.use('/altea',router)
  