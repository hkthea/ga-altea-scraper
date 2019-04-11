// let resp = {
// 	"model": {
// 		"output": {
// 			"crypticResponse": {
// 				"command": "AN20APRCGKSUB",
// 				"response": "AN20APRCGKSUB\n** GARUDA INDONESIA - AN ** SUB SURABAYA.ID                   10 SA 20APR 0000\n 1   GA 302  J9 C9 D9 Y9 GL       /CGK 3 SUB 2  0525    0705  E0/738  EQT  1:40\n 2   GA 304  J9 C9 D9 Y9 GL       /CGK 3 SUB 2  0615    0750  E0/738  EQT  1:35\n 3   GA 306  J9 C9 D7 Y9 GL       /CGK 3 SUB 2  0725    0900  E0/738       1:35\n 4   GA 308  J9 C9 D8 Y9 GL       /CGK 3 SUB 2  0845    1025  E0/738       1:40\n 5   GA 310  J9 C9 D7 Y9 GL       /CGK 3 SUB 2  1005    1145  E0/738  EQT  1:40\n 6   GA 312  J9 C9 D9 Y9 GL       /CGK 3 SUB 2  1105    1245  E0/738       1:40\n 7   GA 314  J9 C9 D9 Y9 GL       /CGK 3 SUB 2  1250    1430  E0/738  IR   1:40\n 8   GA 316  J9 C9 D9 Y9 GL       /CGK 3 SUB 2  1325    1505  E0/738       1:40\n 9   GA 448  J9 C7 D5 Y9 GL       /CGK 3 SUB 2  1545    1725  E0/738  IR   1:40\n10   GA 320  J9 C9 D9 Y9 GL       /CGK 3 SUB 2  1610    1750  E0/738       1:40\n11   GA 322  J9 C9 D9 Y9 GL       /CGK 3 SUB 2  1710    1850  E0/738  IR   1:40\n12   GA 324  J9 C9 D9 Y9 GL       /CGK 3 SUB 2  1805    1945  E0/738  EQT  1:40\n\u003e",
// 				"response3270": ""
// 			}
// 		}
// 	}
// }

// let resp = {"model":{"output":{"crypticResponse":{"command":"AN23APRJOGBPN","response":"AN23APRJOGBPN\n** GARUDA INDONESIA - AN ** BPN BALIKPAPAN.ID                 13 TU 23APR 0000\n 1   GA 469  I3 Y9 GL             /JOG   BPN    1325    1615  E0/CRK       1:50\n 2   GA 257  J9 C9 Y9 GL          /JOG   CGK 3  0620    0740  E0/738  IR\n     GA 564  J9 C9 Y9 GL          /CGK 3 BPN    0840    1210  E0/738  IR   4:50\n 3   GA 213  J9 Y9 GL             /JOG   CGK 3  1620    1740  E0/738  IR\n     GA 576  J9 Y9 GL             /CGK 3 BPN    1905    2230  E0/738  IR   5:10\n 4   GA 201  J9 C9 Y9 GL          /JOG   CGK 3  0555    0715  E0/738  IR\n     GA 564  J9 C9 Y9 GL          /CGK 3 BPN    0840    1210  E0/738  IR   5:15\n 5   GA 207  J9 Y9 GL             /JOG   CGK 3  1210    1330  E0/738  IR\n     GA 572  J9 Y9 GL             /CGK 3 BPN    1530    1845  E0/738  IR   5:35\n 6   GA 211  J9 Y9 GL             /JOG   CGK 3  1505    1625  E0/738  EQT\n     GA 576  J9 Y9 GL             /CGK 3 BPN    1905    2230  E0/738  IR   6:25\nNO MORE LATER FLTS   23APR JOG BPN\n\u003e","response3270":""}}}}
let resp={"model":{"output":{"crypticResponse":{"command":"MD","response":"ANGA25APRKNOMKQ -MD-\n** GARUDA INDONESIA - AN ** MKQ MERAUKE.ID                    15 TH 25APR 0000\n 1   GA 189  J9 C9 D8 I3 Y9 GL    /KNO   CGK 3  1405    1630  E0/738\n     GA 614  J9 C9 D6 I2 Y9 GL    /CGK 3 UPG    1915    2255  E0/738  IR\n     GA 658  J2 C2 D1 I1 Y9 GL    /UPG   MKQ    0230+1  0905+1E1/738  EQT 17:00\nNO MORE LATER FLTS   25APR KNO MKQ\nCK ALT*ORIG MES\n\u003e","response3270":""}}}}
let gdsResp=resp.model.output.crypticResponse.response;
console.log(gdsResp);
let fls=gdsResp.split('\n');
fls.splice(0,2)
fls.splice(fls.length-1,1)
if(fls[fls.length-1].toLowerCase().indexOf('no more later')>=0)fls.splice(fls.length-1,1)
console.log(fls);
const rf = [];
fls.forEach(flight => {
    let f = parseText(flight)
    console.log(f);
    // parseInt(f.number)>0)
    if(f.from != '' || f.to!='')rf.push(f)
});

let xx=[]
let last=[];
rf.forEach(flight => {    
    if(flight.number=='')
        last.push(flight)
    else
    {
        if(last.length>0) xx.push(last)
        last=[];
        // last = [];
        last.push(flight)
    }
    
});
xx.push(last)
console.log(xx);

console.log(JSON.stringify(xx));    

function parseText(text) {
    let obj={}
    obj.number = text.substr(0,2).trim();
    obj.airline = text.substr(5,2).trim()
    obj.flightNumber = text.substr(7,4).trim()
    obj.classGroup=parseClass(text.substr(13,21))
    obj.from = text.substr(35,3).trim()
    obj.to = text.substr(41,3).trim()
    obj.dtime=text.substr(48,6).trim()
    obj.atime=text.substr(56,6).trim()
    obj.flightType=text.substr(62,6).trim()
    obj.eta = text.substr(74,5).trim()
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