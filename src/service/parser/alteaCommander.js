function parseSearchAvailResult(resp)
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
            let fobj=parseText(d)
            
            result.departure.push(fobj)
        });
    
        ret.forEach(d => {
            let fobj=parseText(d)
            result.return.push(fobj)
        });
        
    });
    let idx=0;
    let last=[];
    result.departure.forEach(flight => {    
        if(flight.number=='')
            last.push(flight)
        else
        {
            if(last.length>0) {
                xx.departure.push({flight:last, id:'departure_GA'+idx, startedPrice:0})
                idx++;
            }
            last=[];
            // last = [];
            last.push(flight)
        }
        
    });
    
    idx=0;
    last=[];
    result.return.forEach(flight => {    
        if(flight.number=='')
            last.push(flight)
        else
        {
            if(last.length>0) {
                xx.return.push({flight:last, id:'return_GA'+idx, startedPrice:0})
                idx++;
            }
            last=[];
            // last = [];
            last.push(flight)
        }
        
    });
    
    console.log(JSON.stringify(xx));
    
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
        
    function parseText(text) {
        let obj={}
        const moment=require('moment')
        obj.number = text.substr(0,2).trim();
        obj.code = text.substr(5,2).trim()
        obj.pict='/pic/'+obj.code.toLowerCase()+'.png'
        obj.flightNumber = obj.code+' '+text.substr(7,4).trim()
        obj.from = text.substr(35,3).trim()
        obj.to = text.substr(41,3).trim()
        obj.dtime=moment(text.substr(48,4).trim(),'HHmm').format('HH:mm')
        obj.atime=moment(text.substr(56,4).trim(),'HHmm').format('HH:mm')
        obj.flightType=text.substr(62,6).trim()
        obj.eta = text.substr(74,5).trim()
        obj.type='sumlocal'
        obj.classGroup=parseClass(text.substr(13,21))
        return obj
    }
    
    function parseClass(text) {
        let classes=text.split(' ')
        let cobj=[];
        classes.forEach(cl => {
            if(cl!='' && cl[1].toLowerCase()!='l')
            {
                let x = {
                    code:cl[0],
                    availCode:cl[1]
                }
                cobj.push(x)
            }
        });
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
    for (let i = 0; i < arr.length; i++) {
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

const failedResp=['INVALID', 'CHECK', 'NOT AVAILABLE', 'WAITLIST CLOSED', 'NOT ALLOWED']

function validateCmd(resp, cmd) {
    for (let ii = 0; ii < failedResp.length; ii++) {
        const fail = failedResp[ii];
        let rarr=resp.split('\n')
        for (let iii = 0; iii < rarr.length; iii++) {
            const rp = rarr[iii];
            if(rp.toUpperCase().indexOf(fail)>=0)
            {
                let message=rp + ' ON CMD '+cmd;
                throw new Error(message);
            }
        }
    }
    return true;    
}

module.exports={
    searchAvailParser:parseSearchAvailResult,
    fareRetrieveParser:parseFareRetrieve,
    validateResp:validateCmd
}