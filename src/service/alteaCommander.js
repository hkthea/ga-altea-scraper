import flightCommander from "./class/flightCommander";
import moment from 'moment';

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
    
    async searchAvail(data){
        
        let depDate = this.changeDateFormat(data.departure)
        let cmd =this.createParams('AN'+depDate+data.from.code+data.to.code)
        console.log('Req Search Avail',cmd);
        let params = 'data='+encodeURI(JSON.stringify(cmd))
        console.log(params);
        let resp = (await this.post(this.page, params)).html;
        
        return  JSON.parse(resp)
    }

    async fareRetrieve(data){

    }

    async booking(data){

    }

    async issued(data){
        
    }

    async execute(data){
        let cmd=this.createParams(data.command)
        let params='data='+encodeURI(cmd);
        let resp =(await this.post(this.page, params)).html;
        return JSON.parse(resp);
    }
}

module.exports = AlteaCommander