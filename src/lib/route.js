import express from 'express';

const server = express();

server.listen(8888, ()=>{
    console.log("server listened");
})

server.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})

server.use(function (err, req, res, next) {
    res.status(500).send(err)
})
  
module.exports=server;