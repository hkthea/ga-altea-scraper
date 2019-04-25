let resp ='--- TST RLR ---\nRP/SUBGI2207/SUBGI2207            AA/SU  24APR19/0852Z   SJSRQJ\n  1.ANWAR/AHMADMR(INF/TAUFIQ/14AUG18)   2.INDRI/MRS\n  3.MANURUNG/JIMMIMSTR(CHD/14MAY12)\n  4  GA 074 Y 30APR 2 CGKTKG HK3  1155 3  1240 1335   *1A/E*\n  5 AP M 082114050228\n  6 APE NEXTGTRAVEL.OFFICE.GUNTUR@GMAIL.COM\n  7 TK OK24APR/SUBGI2207\n  8 SSR INFT GA HK1 ANWAR/TAUFIQ 14AUG18/S4/P1\n  9 SSR CHLD GA HK1 14MAY12/P3\n 10 OPC-25APR:1552/1C8/GA CANCELLATION DUE TO NO TICKET SUB TIME\n        ZONE/TKT/S4/P1-3\n 11 FE PAX CONDITION APPLIES/S4/P1-2\n 12 FE PAX CONDITION APPLIES/S4/P3\n 13 FE INF CONDITION APPLIES/S4/P1\n 14 FV PAX GA/S4/P1-2\n 15 FV PAX GA/S4/P3\n 16 FV INF GA/S4/P1\n\u003e'
let resp2 ='--- TST RLR ---\nRP/SUBGI2207/SUBGI2207            AA/SU  24APR19/0840Z   SJEI3Q\n  1.ANWAR/AHMADMR\n  2  GA 212 J 29APR 1 CGKJOG HK1  1325 3  1410 1535   *1A/E*\n  3 AP M 082114050228\n  4 APE NEXTGTRAVEL.OFFICE.GUNTUR@GMAIL.COM\n  5 TK OK24APR/SUBGI2207\n  6 OPC-25APR:1540/1C8/GA CANCELLATION DUE TO NO TICKET SUB TIME\n        ZONE/TKT/S2\n  7 FE PAX CONDITION APPLIES/S2\n  8 FV PAX GA/S2\n\u003e'
let arr = resp.split('\n')

// console.log(parseLine1(arr[1]));
// console.log();
let l1 = parseLine1(arr[1]);
let others = parseOthers(arr)
others.booking_code = l1.booking_code
others.office = l1.office
others.booking_time = l1.bookTime
others.status = getStatus(others)
console.log(others);
function getStatus(data) {
    let status=data.flightData[0].status;
    if(status.indexOf('HK')>=0)return 'BOOKED'
    return 'TICKETED';
}
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
        if(str.substr(0,4).trim().indexOf('.')>=0)return checkPax(str)
        if(str.substr(4,2).trim().length==1)return checkFlight(str)
        if(str.substr(4,2).trim()=='AP')return checkContact(str)
        if(str.substr(4,3).trim()=='OPC')return checkTimelimit(str)
        if(str.substr(4,3).trim()=='SSR')return {type:'ssr', data:str.substr(7, str.length - 8).trim()}
    
        return false;
    }
    
    function checkTimelimit(str) {
        return {type:'timelimit', data:str.substr(8,10)}
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
        let paxes = [];
        for (let ii = 0; ii < pxs.length; ii++) {
            const pax = pxs[ii];
            let obj={};
            let infObj={}
            let hasInfant=false;
            if(pax.trim().length<3)continue
            let rpax=pax.trim().split(' ')[0];
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
            obj.name = name[0];
            paxes.push(obj)
            if(hasInfant)paxes.push(infObj)
        }
        // console.log(paxes);        
        return {type:'pax', data:paxes};
    }

    let result = {
        paxes:[],
        flightData:[],
        contact:{
            phone:[],
            email:[]
        }
    }
    for (let ii = 0; ii < res.length; ii++) {
        const arr = res[ii];
        if(arr.type=='pax'){
            for (let iii = 0; iii < arr.data.length; iii++) {
                const pax = arr.data[iii];
                result.paxes.push(pax)                
            }
        }
        if(arr.type=='FlightData')result.flightData.push(arr.data)
        if(arr.type=='phone')result.contact.phone.push({type:arr.code, number:arr.data})
        if(arr.type=='email')result.contact.email.push(arr.data)
        if(arr.type=='timelimit')result.timelimit=arr.data
    }
    // return res
    return result;
}
