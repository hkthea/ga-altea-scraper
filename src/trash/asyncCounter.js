const counter = require('./counter');
var sleep = require('sleep');


module.exports = async function(counter, delay=5000)
{
    // const x= new counter(3);
    // var time=Date.now();
    console.log('Do Running ',delay);            
     
    return counter.getValue();
}