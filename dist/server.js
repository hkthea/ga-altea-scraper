"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const scrapper= require('./src/service/baseScrapper');
// const counter=require('./src/counter');
// const x=new counter(82);
// const sc=new scrapper();
var server = (0, _express["default"])();
server.listen(8888, function () {
  console.log("server listened");
});
server.get('/', function (req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    status: 900
  }));
}); // server.get('/scrapper', async (req, res)=>{
//     var resp = await sc.get('/');
//     res.end(resp);
// })
// server.get('/object',(req,res)=>{
//     var obj=x.getObj()
//     console.log('get_object ',obj);
//     if(obj===false)
//     {
//         res.end(JSON.stringify({status:1, message:'Server Busy'}));
//     }
//     else
//     {
//         setTimeout(()=>{
//             x.addObj(obj);
//             res.end(JSON.stringify(obj));
//         },15000)
//     }
// })

server.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});
server.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err);
});