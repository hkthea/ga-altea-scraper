import launchPuppet from '../service/puppetScrapper';
import puppeteer  from "puppeteer";
// import express from 'express';

const SESSION_LIST=[];
const SESSION_LIST_REGISTER=[];
var TOTAL_SESSION_LIST=0;
const alteaCore = async(instanceNum)=>{

    
    let browser = await puppeteer.launch({
        // headless:false,
        // userDataDir:'../puppeteer/udata',
        // args:['--incognito']
    })
    console.log('new browser');
   
    for (let i = 0; i < instanceNum; i++) {
        let page = await browser.newPage()
        console.log('New Page ',i );
        await page.setCacheEnabled(true)

        await _createService(page, 'ALTEA_SESSION_'+i)
    }    

    async function _createService(page, prefix){
        let service = await launchPuppet(page, prefix)
        console.log(service.prefix);
        
        return new Promise((resolve, rejects)=>{
            service.listener.on('cookieChanged',(cookiejar=>{
                console.log(service.prefix, 'ON Cookie Changed Event');        
            }))
            service.listener.on('onReady',(()=>{
                console.log(service.prefix, 'ON Ready Event', service.isReady());        
                resolve(true)
            }))
            service.listener.on('onNewSession',(s, sl, cookiejar)=>{
                console.log(service.prefix, 'On New Session');        
                // let cmd=new commander();
                let sx={commander:s, cookiejar:cookiejar, prefix:service.prefix, service:service};
                SESSION_LIST.push(sx)
                SESSION_LIST_REGISTER.push(sx)
                TOTAL_SESSION_LIST = SESSION_LIST.length
                console.log('MAIN_CORE SESSIONS',SESSION_LIST.length, service.isReady());
                // resolve(true)
            })
            service.listener.on('onLocked',(()=>{
                console.log(service.prefix, 'ON Locked Event');        
            }))
        })
    }

    
}

function popSession() {
    if(SESSION_LIST.length==0)return false;
    return SESSION_LIST.pop()
}

function pushSession(session) {
    SESSION_LIST.push(session)
}

function getTotal() {
    return {total:SESSION_LIST_REGISTER.length, active:SESSION_LIST.length}
}

const SESSION_NOT_FOUND_ERROR = ()=>{
    return {error:404,message:'Worker not Found!Please Try Again Few Minutes Later', workers:getTotal()}
}

function handleRequest(req, callback) {
    return new Promise(async (resolve)=>{
        let session=popSession()
        console.log(req.body);                    
        if(session)
        {
            let sdata={error:0, data:{}, total:{}, message:''};
            try {
                sdata.data =await callback(req, session);                    
                sdata.total=getTotal()                    
            } catch (error) {
                sdata.error=500;
                sdata.stack=error.stack
                sdata.name=error.name
                sdata.message=error.message
                sdata.total=getTotal()
            }
            resolve(sdata)
            pushSession(session)
            return sdata;            
        }
        else
        {
            resolve(SESSION_NOT_FOUND_ERROR());            
        }
    })
}

// const app= express()
// const router=app.Router();
var router = require('express').Router()

router.post('/searchAvail',async (req,res)=>{
    let resp = await handleRequest(req, async(req, session)=>{
        return await session.commander.searchAvail(req.body)
    })
    res.json(resp);
})

router.post('/fareRetrieve',async (req,res)=>{
    let resp = await handleRequest(req, async(req, session)=>{
        return await session.commander.fareRetrieve(req.body)
    })
    res.json(resp);
})

router.post('/booking',async (req,res)=>{
    let resp = await handleRequest(req, async(req, session)=>{
        return await session.commander.booking(req.body)
    })
    res.json(resp);
})

router.post('/retrieve',async (req,res)=>{
    let resp = await handleRequest(req, async(req, session)=>{
        return await session.commander.retrieve(req.body)
    })
    res.json(resp);
})

router.post('/issued',async(req,res)=>{
    let resp = await handleRequest(req, async(req, session)=>{
        return await session.commander.issued(req.body)
    })
    res.json(resp);
})

router.post('/canceled',async(req,res)=>{
    let resp = await handleRequest(req, async(req, session)=>{
        return await session.commander.canceled(req.body)
    })
    res.json(resp);
})

router.post('/executeCmd',async(req, res)=>{
    let resp = await handleRequest(req, async(req, session)=>{
        return await session.commander.execute(req.body);                           
    })
    res.json(resp);
})

module.exports = {
    core:alteaCore,
    router:router
}
