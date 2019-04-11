import launchPuppet from '../service/puppetScrapper';
import puppeteer  from "puppeteer";

const SESSION_LIST=[];
var TOTAL_SESSION_LIST=0;
const alteaCore = async(instanceNum)=>{

    
    let browser = await puppeteer.launch({
        // headless:true,
        // userDataDir:'../puppeteer/udata',
        // args:['--incognito']
    })
    console.log('browser',browser);
   
    for (let i = 0; i < instanceNum; i++) {
        let page = await browser.newPage()
        console.log('New Page ',i );
        await page.setCacheEnabled(true)

        await _createService(page, 'ALTEA_SESSION_'+i)
    }    

    async function _createService(page, prefix){
        let service = await launchPuppet(page, prefix)
        console.log(service.prefix, service);
        
        return new Promise((resolve, rejects)=>{
            service.listener.on('cookieChanged',(cookiejar=>{
                console.log(service.prefix, 'ON Cookie Changed Event',cookiejar);        
            }))
            service.listener.on('onReady',(()=>{
                console.log(service.prefix, 'ON Ready Event', service, service.isReady());        
                resolve(true)
            }))
            service.listener.on('onNewSession',(s, sl, cookiejar)=>{
                console.log(service.prefix, 'On New Session', s, sl, cookiejar);        
                // let cmd=new commander();
                SESSION_LIST.push({commander:s, cookiejar:cookiejar, prefix:service.prefix, service:service})
                TOTAL_SESSION_LIST = SESSION_LIST.length
                console.log('MAIN_CORE SESSIONS',SESSION_LIST, service.isReady());
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
    return {total:TOTAL_SESSION_LIST, active:SESSION_LIST.length}
}

const SESSION_NOT_FOUND_ERROR = ()=>{
    return {error:404,message:'Worker not Found!Please Try Again Few Minutes Later', workers:getTotal()}
}

function handleRequest(req, callback) {
    return new Promise((resolve, rejects)=>{
        let session=popSession()
        if(session)
        {
            try {
                resolve(callback(req, session));                
            } catch (error) {
                rejects(error)                
            }
        }
        else
        {
            resolve(SESSION_NOT_FOUND_ERROR());            
        }
    })
}

module.exports = {
    core:alteaCore,
    // sessionList:()=>{return SESSION_LIST},
    controller:{
        searchAvail:async (req,res)=>{
            console.log(req.body, req);
            
            let resp = await handleRequest(req, async(req, session)=>{
                let sdata;
                try {
                    console.log(req.body);                    
                    sdata =await session.commander.searchAvail(req.body);                    
                    sdata.total=getTotal()
                    console.log(sdata);                    
                } catch (error) {
                    sdata = {error:500, message:error.message, total:getTotal()}
                }
                pushSession(session)
                return sdata;
            })
            // res.
            res.json(resp);
        },
        booking:async(req, res)=>{
            // let session = 
        }
    }
}
