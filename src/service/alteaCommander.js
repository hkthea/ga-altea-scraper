import Requester from "./requester";

class AlteaCommander extends Requester
{
    constructor(cookieJar, alteaSession)
    {
        super('https://tc34.resdesktop.altea.amadeus.com/');
        this.initCookies(cookieJar);
        this.alteaSession = alteaSession;
    }
    
    async searchAvail(data){
        console.log('Search AVAIL DATA ',this.alteaSession, data);
        return new Promise((resolve)=>{
            setTimeout(()=>resolve({error:0, data:{}}),5000 )   
        })
    }

    async fareRetrieve(data){

    }

    async booking(data){

    }

    async issued(data){
        
    }
}

module.exports = AlteaCommander