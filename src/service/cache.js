import redis from 'redis';
import {redis_host, redis_password, redis_user, redis_port} from '../const/env';
import { Promise } from 'es6-promise';
// import { resolve } from 'path';
// import { rejects } from 'assert';

function createCache(db=0) {
    
    let isConnected=false;
    let redisClient=redis.createClient({host:redis_host, port:redis_port, db:db});
    
    redisClient.on('error', (error) => {
        console.log(error.message);
    })
    redisClient.on('connect',()=>{
        isConnected=true;
        console.log('Successfully connected to redis');
    })
    
    const deleteKey=(key)=>{
        return new Promise((resolve, rejects)=>{
            redisClient.del(key, function(error,reply){
                console.log('error','reply','deleteKey Cmd '+db);
                if(error)rejects(error)
                else resolve(reply)
            })
        })
    }

    const readKeys=(keys)=>{
        return new Promise((resolve, rejects)=>{
                redisClient.keys(keys+'*', function(error, reply){
                console.log(error, reply ,'readKeys keys Cmd  '+db);
                if(error)
                {
                    rejects(error);
                }
                else
                {
                    resolve(reply);
                }
            });    
        })
    }
    
    const getKey = (key)=>{
        return new Promise((resolve, rejects)=>{
            redisClient.get(key, function(error, reply){
                console.log(error, reply ,'getkey get Cmd  '+db);
                if(error)
                {
                    rejects(error);
                }
                else
                {
                    resolve(reply)
                }
            });
        })
    }
    
    const setKey = (key, value, timeout = 0)=>{
        return new Promise((resolve, rejects)=>{
            if(timeout>0)
            {
                redisClient.set(key, value, 'EX', timeout, function(error, reply){
                    console.log(error, reply ,'setkey set Cmd  '+db);
                    if(error)
                    {
                        rejects(error);
                    }
                    else
                    {
                        resolve(reply);
                    }
                });
            }
            else{
                redisClient.set(key, value, function(error, reply){
                    console.log(error, reply ,'setkey set Cmd  '+db);
                    if(error)
                    {
                        rejects(error);
                    }
                    else
                    {
                        resolve(reply);
                    }
                });
            }
        })
    }
    
    const requestOTP = async()=>{
        let resp=await readKeys(5, 'otp_key');
        console.log(resp);    
    }

    return {
        readKeys:readKeys,
        getKey:getKey,
        setKey:setKey,
        requestOTP:requestOTP,
        isConnected:isConnected,
        deleteKey:deleteKey,
        redisClient:redisClient
    };
}


module.exports = createCache;