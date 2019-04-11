import Requester from "./requester";

class flightCommander extends Requester
{
    constructor(uri, cookieJar, session)
    {
        super(uri);
        this.initCookies(cookieJar);
        this.session = session;
    }
    
    async searchAvail(data){
        
    }

    async fareRetrieve(data){

    }

    async booking(data){

    }

    async issued(data){
        
    }
}

module.exports = flightCommander