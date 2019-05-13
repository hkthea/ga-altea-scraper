const moment = require('moment');
function parseSearchAvailResult(resp,data)
{
    let result={departure:[], return:[]};
    let xx={departure:[],return:[]}
    
    function filterFlights(fls)
    {
        let dep=[];
        let ret=[];
        let isRet=false;
        var temp=dep;
        for (let ii = 0; ii < fls.length; ii++) {
            const fl = fls[ii];
            if((fl.substr(0,2)=='**')&& !isRet)
            {
                isRet=true;   
                temp= ret;
                continue;
            }
            if(fl.trim()=='')continue;
            if(fl.trim()=='>')continue;
            if(fl.substr(0,2).toLowerCase()=='no')continue;
            if(fl.substr(0,2).toLowerCase()=='ck')continue;
            if(fl.substr(0,2).toLowerCase()=='us')continue;
            temp.push(fl);
        }
        return {dep:dep, ret:ret};
    }
    resp.data.forEach(fl => {
        let fls = fl.split('\n')
        fls.splice(0,2)
        fls.splice(fls.length-1,1)
        let {dep, ret} = filterFlights(fls);
        dep.forEach(d => {
            let fobj=parseText(d, data)
            if(!fobj.classOnly){
                // result.return.push(fobj)
                result.departure.push(fobj)
            }
            else{
                let prev = result.departure.pop()
                prev.classGroup = [...prev.classGroup, ...fobj.classGroup]
                result.departure.push(prev)
            }
        });
    
        ret.forEach(d => {
            let fobj=parseText(d, data, true)
            if(!fobj.classOnly){
                result.return.push(fobj)
            }
            else{
                let prev = result.return.pop()
                prev.classGroup = [...prev.classGroup, ...fobj.classGroup]
                result.return.push(prev)
            }
            // console.log(result.return);
            
        });
        
    });
    let idx=0;
    let last=[];
    // console.log(result);
    
    
    for (let ii = 0; ii < result.departure.length; ii++) {
        const flight = result.departure[ii];
        if(flight.number=='')
            last.push(flight)
        else
        {
            if(last.length>0) {
                xx.departure.push({flight:last, id:'departure_GA'+idx, startedPrice:0})
                idx++;
            }
            last=[];
            last.push(flight)
        }        
    }

    if(last.length>0)xx.departure.push({flight:last, id:'departure_GA'+idx, startedPrice:0})
    
    idx=0;
    last=[];
   
    for (let ii = 0; ii < result.return.length; ii++) {
        const flight = result.return[ii];
        if(flight.number=='')
            last.push(flight)
        else
        {
            if(last.length>0) {
                xx.return.push({flight:last, id:'return_GA'+idx, startedPrice:0})
                idx++;
            }
            last=[];
            last.push(flight)
        }        
    }
    if(last.length>0)xx.return.push({flight:last, id:'return_GA'+idx, startedPrice:0})
    // console.log(JSON.stringify(xx));
    
    function cekFlag(fls)
    {
        let index = -1
        for (let ii = 0; ii < fls.length; ii++) {
            const fl = fls[ii];
            if(fl.toLowerCase().indexOf('no more')>=0)
            {
                index = ii;
                break
            }
    
        }
        return index;
    }
        
    function parseText(text, data, isReturn=false) {
        
        let obj={}
        let classesStr = text.substr(13,21)
        obj.classGroup = parseClass(classesStr);
        obj.classOnly = false;
        if(classesStr.trim() == text.trim()){
            // console.log('Classes sama');
            obj.classOnly = true;
            return obj;
        }
        // const moment=require('moment')
        obj.number = text.substr(0,2).trim();
        obj.code = text.substr(5,2).trim()
        obj.pict='/pic/'+obj.code.toLowerCase()+'.png'
        obj.flightNum = obj.code+' '+text.substr(7,4).trim()
        obj.from = text.substr(35,3).trim()
        obj.to = text.substr(41,3).trim()
        obj.dtime=moment(text.substr(48,4).trim(),'HHmm').format('HH:mm')
        obj.atime=moment(text.substr(56,4).trim(),'HHmm').format('HH:mm')
        let flagOffDate=text.substr(52,2).trim();
        let ddate=(isReturn)?data.return:data.departure
        obj.ddate=moment(ddate,'DD-MMM-YYYY').add(flagOffDate,'days').format('DD-MMM-YYYY')
        obj.flightType=text.substr(62,6).trim()
        obj.eta = text.substr(74,5).trim()
        obj.type='sumlocal'

        // obj.classGroup=parseClass(classesStr)
        return obj
    }
    
    function parseClass(text) {
        let classes=text.split(' ')
        let cobj=[];
        

        for (let ii = classes.length-1; ii >= 0; ii--) {
            const cl = classes[ii];
            if(cl!='' && cl[1].toLowerCase()!='l')
            {
                let x = {
                    code:cl[0],
                    availCode:cl[1],
                    available:true,
                    fare:0,
                    currency:'IDR'
                }
                cobj.push(x)
            }
        }
        return cobj;
    }

    return xx;
}

function parseFareRetrieve(data){
    let resp =data
    let arr = resp.split('\n')

    arr.splice(0,2)
    arr.splice(arr.length -1,1)
    // let head=arr[0]
    arr.splice(0,1)

    let result=[];
    for (let i = 0; i < 1; i++) {
        const str = arr[i];
        if(str[0]=='>')continue
        let obj = parseFare(str)
        result.push(obj)
    }

    function parseFare(str) {
        return  {
            number:parseInt(str.substr(0,2)),
            fare_basis:str.substr(3,11).trim(),
            pax:getTotalPax(str.substr(26,12).trim()),
            price:parseInt(str.substr(39,12).trim()),        
        }
    }

    function getTotalPax(str) {
        let s=str.replace('P','')
        s = s.split('-')
        if(s.length==1)return 1;
        return (s[1] - s[0])+1
    }

    let amount=0
    for (let i = 0; i < result.length; i++) {
        const fare = result[i];
        amount+=(fare.pax * fare.price)
    }

    return {
        fare:[{
            amount:amount,
            airlineCode:'GA',
            log:result
        }],
        insurance:0
    }

}

const failedResp=['INVALID', 'CHECK', 'NOT AVAILABLE', 'WAITLIST CLOSED', 'NOT ALLOWED', 'DOES NOT ALLOW','RJT CHRONOLOGICAL ORDER','NEED RECEIVED FROM', 'NEED ITINERARY','NO AVAILABILITY']

function validateCmd(resp, cmd) {
    for (let ii = 0; ii < failedResp.length; ii++) {
        const fail = failedResp[ii];
        let rarr=resp.split('\n')
        for (let iii = 0; iii < rarr.length; iii++) {
            const rp = rarr[iii];
            if(rp.toUpperCase().indexOf(fail)>=0)
            {
                let message=rp;//+ ' ON CMD '+cmd;
                throw new Error(message);
            }
        }
    }
    return true;    
}

function parseBookCode(resp) {
    let arr = resp.split('\n')

    arr.splice(0,1)
    arr.splice(arr.length -1,1)
    // console.log(arr);
    let str=arr[0];
    let t = str.split(' ');
    return t[t.length - 1]
}

function parseFareRetrieveFQQ(resp, total, code)
{
    let arr = resp.split('\n')
    
    
    arr.splice(0,5)
    arr.splice(arr.length -2,2)
    
    
    function parseFQQ(str) {
        let obj = {
            ln:parseInt(str.substr(0,2)),
            fareCode:str.substr(3,10).trim(),
            fare:parseInt(str.substr(14,9).trim()),
            classCode:str.substr(32,1)
        };
        return obj
    }

    let result=[];
    for (let i = 0; i < arr.length; i++) {
        const ln = arr[i];
        result.push(parseFQQ(ln))
    }
    let totalFare=0;
    for (let ii = 0; ii < result.length; ii++) {
        const res = result[ii];
        // console.log(res.classCode.toUpperCase(), code.toUpperCase(), res.classCode.toUpperCase() == code.toUpperCase());        
        if(res.classCode.toUpperCase() == code.toUpperCase())
        {
            totalFare = total * res.fare;
            break;
        }
    }

    console.log(totalFare, 'TOTAL FARE ',code, total);
    return totalFare; //{[fcode]:result}

}

function parseRetrieve(bookData, fareData, airline='GA') {
    
    function parseFare(resp) {
        let arr = resp.split('\n')

        function parseRespMultiPax(arr) {
            // console.log(arr, 'multipax');
            let result=[];
            function getTotalLine(arr) {
                for (let ii = 0; ii < arr.length; ii++) {
                    const a = arr[ii];
                    if(a.toUpperCase().indexOf('TOTALS')>=0)
                    {
                        return ii;
                    }
                }
            }
            let lnTotal = getTotalLine(arr);

            // console.log('Total Line Found @ '+lnTotal);
            for (let ii = 3; ii < lnTotal; ii++) {
                const a = arr[ii];
                if(a.trim()=='')continue;
                result.push({
                    num:parseInt(a.substr(0,2)),
                    name:a.substr(3,17).trim(),
                    type:a.substr(21,3).trim(),
                    numPax:parseInt(a.substr(28,3).trim()),
                    fare:parseInt(a.substr(32,9).trim()),
                    tax:parseInt(a.substr(42,7).trim()),
                    total:parseInt(a.substr(51,9).trim())
                })
            }

            return result;
        }

        function parseRespPax(arr) {
            console.log(arr, 'pax');
            let result=[];
            function parseFareComponent(list) {
                let result=[];
                for (let ii = 0; ii < list.length; ii++) {
                    const l = list[ii];
                    if(l.substr(0,3)=='IDR')
                    {
                        result.push(l);
                    }
                }
                return result;
            }
            let fc=parseFareComponent(arr);
            console.log(fc);
            
            let obj={
                num:parseInt(arr[2].substr(0,2)),
                name:arr[2].substr(3,17).trim().replace('*',''),
                type:'ADT',
                numPax:1,
                fare:parseInt(fc[0].substr(4,8).trim()),
                tax:getTax(arr),
                total:parseInt(fc[4].substr(4,8).trim())
            }

            function getTax(arr) {
                let t = parseInt(fc[1].substr(4,8).trim())
                t += parseInt(fc[2].substr(4,8).trim())
                t += parseInt(fc[3].substr(4,8).trim())
                return t
            }
            result.push(obj)
            return result;
        }

        let result = arr[1].trim()==''?parseRespMultiPax(arr):parseRespPax(arr)
        console.log(result);
        
        return result;
    }
    
    function parseTST(resp) {
        let arr = resp.split('\n')
        console.log(arr);
        
        // console.log(parseLine1(arr[1]));
        let l1 = parseLine1(arr[1]);
        let others = parseOthers(arr)
        console.log(others);
        others.booking_code = l1.booking_code
        others.office = l1.office
        others.booking_time = l1.bookTime
        others.status = 'BOOKED';//getStatus(others)
        // function getStatus(data) {
        //     let status=data.flight_detail[0].status;
        //     if(status.indexOf('HK')>=0)return 'BOOKED'
        //     return 'TICKETED';
        // }
        function parseLine1(str) {
            let arr = str.split(' ');
            let rarr=[];
            for (let ii = 0; ii < arr.length; ii++) {
                const a = arr[ii];
                if(a.trim()=='')continue;
                rarr.push(a)
            }
            return {
                booking_code:rarr[3],
                office:rarr[0],
                bookTime:rarr[2]
            };
        }

        function parseOthers(arr) {
            let res = []
            for (let ii = 2; ii < arr.length; ii++) {
                const a = arr[ii];
                let lineData=checkLine(a);
                if(lineData)res.push(lineData)
            }
            function checkLine(str) {
                console.log(str.substr(0,4).trim(), str.substr(0,4).trim().indexOf('.'));
                
                if(str.substr(0,4).trim().indexOf('.')>=0)return checkPax(str)
                if(str.substr(4,2).trim().length==1)return checkFlight(str)
                if(str.substr(4,2).trim()=='AP')return checkContact(str)
                if(str.substr(4,2).trim()=='FA')return checkTicket(str)
                if(str.substr(4,3).trim()=='OPC')return checkTimelimit(str)
                if(str.substr(4,3).trim()=='SSR')return {type:'ssr', data:str.substr(7, str.length - 8).trim()}
            
                return false;
            }

            function checkTicket(str) {
                let temp=str.substr(7,str.length - 7)
                let a = temp.split('/');
                let tnumber=a[0].replace('PAX','').trim()
                let code = a[1];
                return {type:'ticket', data:{number:tnumber, code:code}}
            }
            
            function checkTimelimit(str) {
                let tl = str.substr(8,10);
                let ta = tl.split(':');
                tl = ta[0]+moment().format('YYYY')+' '+ta[1]
                
                let timelimit = moment(tl,'DDMMMYYYY HHmm').format('DD-MMM-YY, HH:mm')
                console.log(str, tl, timelimit, ta);
                return {type:'timelimit', data:timelimit}
            }
            
            function checkContact(str) {
                let code=str.substr(6,2).trim();
                if(code=='M' || code=='H' || code=='A'){
                    let idx=str.indexOf(code)
                    return {type:'phone', code:code, data:str.substr(idx+1, str.length-idx).trim()}
                }
                if(code=='E')
                {
                    let idx=str.indexOf(code)
                    return {type:'email', code:code, data:str.substr(idx+1, str.length-idx).trim()}
                }
            }
            
            function checkFlight(str) {
                let arr=str.split(' ');
                let fdata=[];
                for (let ii = 0; ii < arr.length; ii++) {
                    const a = arr[ii];
                    if(a.trim()=='')continue
                    fdata.push(a);
                }
                return {type:'FlightData', data:{
                    airline:fdata[1],
                    flightNum:fdata[2],
                    class:fdata[3],
                    depDate:fdata[4],
                    from:fdata[6].substr(0,3),
                    to:fdata[6].substr(3,3),
                    status:fdata[7],
                    dtime:fdata[10],
                    atime:fdata[11]
                }}
            }
            
            
            function checkPax(str) {
                
                let pxs=str.split('.');
                // console.log(pxs, pxs.length);
                let paxes = [];
                for (let ii = 0; ii < pxs.length; ii++) {
                    const pax = pxs[ii];
                    let obj={};
                    let infObj={}
                    let hasInfant=false;
                    
                    if(pax.trim().length<3)continue
                    
                    let rpax=pax;//.trim().split(' ')[0];
                    if(rpax.indexOf('(')>=0)
                    {
                        let x=rpax;
                        x = x.split('(')
                        let det = x[1]
                        let arr = det.split('/')
                        // console.log(arr);
                        
                        if(arr[0]=='INF'){
                            obj.type='ADT'
                            infObj.name=arr[1]
                            infObj.type='INF'
                            infObj.dob=arr[2].replace(')','')
                            hasInfant=true;
                        }   
                        else{
                            obj.type='CHD'
                            obj.dob=arr[1].replace(')','')
                        }
                    }
                    else
                    {
                        obj.type='ADT';
                    }
                    let name = rpax.split('(');
                    // console.log(name);
                    
                    let n = extractName(name[0]);
                    obj.name = n.name
                    obj.title = n.title
                    paxes.push(obj)
                    if(hasInfant)paxes.push(infObj)
                }
                function extractName(str) {
                    let title = ['MR', 'MRS', 'MS','MISS', 'MSTR']
                    let res = {title:'',name:''}
                    
                    for (let i = 0; i < title.length; i++) {
                        const t = title[i];
                        
                        if(str.indexOf(t)>=0)
                        {
                            let ts = str.replace(new RegExp('[0-9]'),'').toUpperCase().trim()
                            let ttls = ts.substr(ts.length - t.length, t.length)
                            if((ttls == t)){
                                res.title = t
                                let ns = ts.split('/')
                                
                                res.name = ns[1].replace(t , '')+' '+ns[0]
                                break;
                            }
                        }
                    }
                    
                    return res
                }
                console.log(paxes);
                
                return {type:'pax', data:paxes};
            }
            let result = {
                pax:[],
                flight_detail:[],
                contact:{
                    phone:[],
                    email:[]
                },
                tickets:[],
                flight_detail:[]
            }
            for (let ii = 0; ii < res.length; ii++) {
                const arr = res[ii];
                if(arr.type=='pax'){
                    for (let iii = 0; iii < arr.data.length; iii++) {
                        const pax = arr.data[iii];
                        result.pax.push(pax)                
                    }
                }
                if(arr.type=='FlightData')result.flight_detail.push(arr.data)
                if(arr.type=='phone')result.contact.phone.push({type:arr.code, number:arr.data})
                if(arr.type=='email')result.contact.email.push(arr.data)
                if(arr.type=='timelimit')result.timelimit=arr.data
                if(arr.type=='ticket')result.tickets.push(arr.data)
            }
            // return res
            return result;
        }

        return others;
    }

    function getFare(fare) {
        let publish=0
        let ntsa = 0
        for (let ii = 0; ii < fare.length; ii++) {
            const fr = fare[ii];
            publish += fr.total
            let c = 0.02 * fr.fare
            ntsa += (fr.total - c)
        }
        return {ntsa:ntsa, publish:publish}
    }

    let fare=parseFare(fareData);
    let pnr=parseTST(bookData)
    pnr.fare = fare;
    let f = getFare(fare)
    pnr.airline_code=airline
    pnr.publish={fare:f.publish, insurance:0}
    pnr.ntsa={fare:f.ntsa, insurance:0}
    if(pnr.flight_detail.length>0)
    {
        pnr.status = pnr.tickets.length>0?'TICKETED':'BOOKED'
        if(pnr.tickets.length>0){
            for (let ii = 0; ii < pnr.pax.length; ii++) {
                const pax = pnr.pax[ii];
                pax.ticket = pnr.tickets[ii].number
                pax.tcode = pnr.tickets[ii].code
            }        
        }
    }
    else
    {
        pnr.status = 'CANCELED'
    }
    // pnr.log
    // pnr.status = getStatus(pnr)
    return pnr 
    
}

module.exports={
    searchAvailParser:parseSearchAvailResult,
    fareRetrieveParser:parseFareRetrieve,
    validateResp:validateCmd,
    parseBookCode:parseBookCode,
    parseFareRetrieveFQQ:parseFareRetrieveFQQ,
    parseRetrieve:parseRetrieve
}