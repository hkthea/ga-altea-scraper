import flightCommander from "./class/flightCommander";
import moment from 'moment';
import {searchAvailParser, fareRetrieveParser, parseFareRetrieveFQQ, validateResp, parseBookCode, parseRetrieve } from './parser/alteaCommander';

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
        await this.execute({command:'IG'})
        let  gdsResp= await this.cmdAN(data);
        return this.parseSearchAvail(gdsResp, data)        
    }

    parseSearchAvail(resp, data) {
        let result=searchAvailParser({data:resp},data);
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

    async fareRetrieveOld(data, ignored=true){        
        let totPax=parseInt(data.model.adult)+parseInt(data.model.child);
        let oke = await this.addFlight(data.departure, totPax)
        if(oke && !data.model.oneway)
        {
            oke = await this.addFlight(data.return, totPax)
        }

        if(oke)
        {
            // let res = await this.execute({command:'FXA'})
            if(ignored) await this.execute({command:'IG'})
            // console.log(res);            
            // return fareRetrieveParser(res)
        }
        return {}
        // let gdsResp=await 
    }

    async checkFare(flights,totPax){
        let total=0
        for (let ii = 0; ii < flights.flightData.data.length; ii++) {
            const flight = flights.flightData.data[ii];
            // let ddate = this.changeDateFormat(flight.flightData.ddate)
            // let fnum=flight.flightNum.replaceAll(' ','')
            // let str = 'SS'+fnum+flight.code+ddate+flight.flightData.from+flight.flightData.to+totPax
            let str= 'FQD'+flight.flightData.from+flight.flightData.to+'/IO/R,U'+(ii==0?',AT':'');
            let r = await this.execute({command:str})
            // cek oke gk ? kalo gk throw exception
            let fr=parseFareRetrieveFQQ(r, totPax, flight.code);       
            // console.log(str, fr);    
            total += fr + (ii>0?((0.1*fr)+5000):0);            
        }
        return total;
    }

    async fareRetrieve(data){        
        
        await this.execute({command:'IG'})
        let totPax=parseInt(data.model.adult)+parseInt(data.model.child);
        // let gdsResp=await 
        let fare = [];
        let amount = await this.checkFare(data.departure, totPax)
        
        if(amount && !data.model.oneway)
        {
            amount += await this.checkFare(data.return, totPax)
        }

        return {
            fare:[{
                amount:amount,
                airlineCode:'GA'
            }],
            insurance:0
        }
    }

    parseName(name)
    {
        let t=name.split(' ')
        let lname=t[t.length - 1]
        t.splice(t.length - 1, 1)
        // if(t.length==0);
        let fname=t.join(' ');
        return lname+'/'+(fname.trim()==''?lname:fname);
    }

    changeBoD(date){
        return (moment(date,'DD-MMM-YYYY').format('DDMMMYY')).toUpperCase()
    }

    async doBooking(data)
    {
        for (let ii = 0; ii < data.pax.adult.length; ii++) {
            const adult = data.pax.adult[ii];
            let str =( 'NM1'+this.parseName(adult.firstname)+adult.title).toUpperCase()
            if(adult.infant)
            {
                str+='(INF/'+(this.parseName(adult.infant.firstname)).replaceAll('/','')+'/'+this.changeBoD(adult.infant.dob)+')'
            }
            let resp = await this.execute({command:str});
            console.log(str, adult);                        
        }

        for (let ii = 0; ii < data.pax.child.length; ii++) {
            const child = data.pax.child[ii];
            let str =( 'NM1'+this.parseName(child.firstname)+child.title).toUpperCase()+'(CHD/'+this.changeBoD(child.dob)+')'            
            let resp = await this.execute({command:str});
            console.log(str, child);            
        }

        let cmd = 'APM '+data.contact.phone1;
        await this.execute({command:cmd});
        if(data.contact.phone2)
        {
            cmd = 'APH '+data.contact.phone2;
            await this.execute({command:cmd})
        }
        if(data.contact.mails){
            for (let i = 0; i < data.contact.mails.length; i++) {
                const email = data.contact.mails[i];
                cmd = 'APE-'+email
                await this.execute({command:cmd})
            }
        }
        cmd = 'APE-nextgtravel.office.guntur@gmail.com'
        await this.execute({command:cmd})
        let resp = await this.execute({command:'TKOK'})
        let rf = await this.execute({command:'RF '+data.contact.firstname})
        let er = await this.execute({command:'ER'});
        return parseBookCode(er);
    }

    async retrieve(bookCode){
        await this.execute({command:'IG'})
        let bookData=await this.execute({command:'RT'+bookCode.pnrid})
        let fareData=await this.execute({command:'FXP/R,U'})
        await this.execute({command:'IG'})

        return parseRetrieve(bookData, fareData)
    }
    

    async booking(data){
        let pdata=this.processInfant(data.data);
        await this.execute({command:'IG'})
        let fr = await this.fareRetrieveOld(data.airfare, false)   
        let resp = await this.doBooking(pdata)
        console.log(pdata, resp);        
        return await this.retrieve({pnrid:resp});
    }

    async canceled(data){
        await this.execute({command:'IG'})
        await this.execute({command:'RT'+data.pnrid})
        await this.execute({command:'XI'})
        await this.execute({command:'IG'})
        return {}
    }

    processInfant(paxData)
    {
        if(paxData.pax.infant.length>0)
        {
            for (let i = 0; i < paxData.pax.infant.length; i++) {
                const inf = paxData.pax.infant[i];
                paxData.pax.adult[i].infant = inf
            }
        }
        return paxData;
    }

    async issued(data){
        await this.execute({command:'IG'})
        await this.execute({command:'RT'+data.pnrid})
        await this.execute({command:'FXP/R,U'})
        await this.execute({command:'FP CASH'})
        await this.execute({command:'RFNG'})
        let issued=await this.execute({command:'TTP/RT'})
        await this.execute({command:'IG'})
        console.log(issued,'issued response');
        return await this.retrieve(data)          
    }

    async execute(data){
        let cmd=this.createParams(data.command.toUpperCase())
        console.log(data);    
        let params='data='+encodeURI(JSON.stringify(cmd));
        // console.log(params);
        let resp =(await this.post(this.page, params)).html;
        let json = JSON.parse(resp);
        let strResp='';
        console.log('execute resp ' ,json);
        if(json.model.output.crypticResponse)
        {
            strResp=json.model.output.crypticResponse.response;
            strResp=strResp.replaceAll('\r\n','\n').replaceAll('\r','\n').replaceAll('\n\n','\n')
            try {
                validateResp(strResp, data.command.toUpperCase())                        
            } catch (error) {
                this.execute({command:'IG'});
                throw error;
            }
            return  strResp;
        }
        else 
        {
            strResp=json.model.output.crypticError.message;
            throw new Error(strResp);            
        }
    }    
}

module.exports = AlteaCommander