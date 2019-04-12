import flightCommander from "./class/flightCommander";
import moment from 'moment';
import {searchAvailParser, fareRetrieveParser, validateResp} from './parser/alteaCommander';

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

class AlteaCommander extends flightCommander
{
    constructor(cookieJar, session)
    {
        super('https://tc34.resdesktop.altea.amadeus.com/', cookieJar, session);
        this.page='cryptic/apfplus/modules/cryptic/cryptic?SITE=AGAPAIDL&LANGUAGE=GB&OCTX=ARDW_PROD_WBP,ARDW_ESSENTIAL';
    }

    createParams(cmd)
    {
        let model = this.session.model;
        return {
            jSessionId:model.jSessionId,
            contextId: model.dcxid,
            userId: model.userId,
            organization: model.organization,
            officeId: model.officeId,
            gds: 'AMADEUS',
            tasks:[
                {
                    type:"CRY",
                    command:{
                        command:cmd,
                        prohibitedList:model.prohibitedList
                    }
                }
            ]
        }
    }

    changeDateFormat(date)
    {
        return moment(date, 'DD-MMM-YYYY').format('DDMMM');
    }

    async cmdAN(data, i=0, result=[])
    {
        if(i>10)return result;
        let depDate = this.changeDateFormat(data.departure)
        let str=(i==0)?'AN'+depDate+data.from.code+data.to.code:'MD';
        if(!data.oneway)
        {
            let retDate = this.changeDateFormat(data.return)
            if(i==0)str+='*'+retDate
        }
        let cmd = this.createParams(str)
        
        console.log('Req Search Avail '+i,str);
        
        let params = 'data='+encodeURI(JSON.stringify(cmd))
        
        let resp = (await this.post(this.page, params)).html;
        
        let gds = JSON.parse(resp);
        
        let gdsResp=gds.model.output.crypticResponse.response;
        console.log(str, gdsResp);        
        result.push(gdsResp)
        if(gdsResp.toUpperCase().indexOf('NO MORE LATER')>=0)
        {
            return result;
        }
        i++;
        return await this.cmdAN(data, i, result)
    }
    
    async searchAvail(data){
        let  gdsResp= await this.cmdAN(data);
        return this.parseSearchAvail(gdsResp)        
    }

    parseSearchAvail(resp) {
        let result=searchAvailParser({data:resp});
        return result;
    }

    async addFlight(flights,totPax){
        let resp=[]
        for (let ii = 0; ii < flights.flightData.data.length; ii++) {
            const flight = flights.flightData.data[ii];
            let ddate = this.changeDateFormat(flight.flightData.ddate)
            let fnum=flight.flightNum.replaceAll(' ','')
            let str = 'SS'+fnum+flight.code+ddate+flight.flightData.from+flight.flightData.to+totPax
            let r = await this.execute({command:str})
            // cek oke gk ? kalo gk throw exception
            console.log(str, r);            
            resp.push(r)
        }
        return resp;
    }

    async fareRetrieve(data){        
        let totPax=data.model.adult+data.model.child;
        let oke = await this.addFlight(data.departure, totPax)
        if(oke && !data.model.oneway)
        {
            oke = await this.addFlight(data.return, totPax)
        }

        if(oke)
        {
            let res = await this.execute({command:'FXA'})
            let ig = await this.execute({command:'IG'})
            console.log(res, ig);            
            return fareRetrieveParser(res)
        }
        return {}
        // let gdsResp=await 
    }

    async addBooking(data)
    {

    }
    

    async booking(data){

    }

    async issued(data){
        
    }

    async execute(data){
        let cmd=this.createParams(data.command.toUpperCase())
        console.log(cmd);    
        let params='data='+encodeURI(JSON.stringify(cmd));
        // console.log(params);
        let resp =(await this.post(this.page, params)).html;
        let json = JSON.parse(resp);
        let strResp=json.model.output.crypticResponse.response;
        strResp=strResp.replaceAll('\r\n','\n').replaceAll('\n\r','\n').replaceAll('\r','\n')
        validateResp(strResp, data.command.toUpperCase())
        return  strResp;
    }    
}

module.exports = AlteaCommander