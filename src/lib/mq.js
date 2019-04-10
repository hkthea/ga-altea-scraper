import { rabbit_host, rabbit_port, rabbit_username, rabbit_password } from "../const/env";
import amqplib from "amqplib/callback_api";

class myAmqplib 
{
    constructor(url=false)
    {
        this.url=url || 'amqp://'+rabbit_username+':'+rabbit_password+'@'+rabbit_host+':'+rabbit_port+'/';
        this.channel = false;
        this.connection=false;
    }

    createChannel(url){
        return new Promise((resolve, rejects)=>{
            amqplib.connect(url, (error, connection)=>{
                if(error)rejects(error)
                else {
                    this.connection=connection;
                    connection.createChannel(function(error,ch){
                        if(error)rejects(error)
                        else{
                            resolve(ch)
                        }                        
                    })
                }                
            });
        });
    }

    async sendQueue(q, msg, options={}){
        if(!this.channel)
        {
            this.channel = await this.createChannel(this.url)
        }
        this.channel.assertQueue(q, options)
        this.channel.sendToQueue(q, Buffer.from(msg));
        return true;
        // return false;        
    }

    async consumeQueue(q, onConsumeMsg,options={}, consumerOptions={}){
        if(!this.channel)
        {
            this.channel = await this.createChannel(this.url)
        }
        this.channel.assertQueue(q, options);
        this.channel.consume(q, onConsumeMsg, consumerOptions);
        return false;
    }
}

module.exports = myAmqplib