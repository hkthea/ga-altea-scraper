
// import moment from 'moment';

// let resp = {
//     "data": [
//         "AN24APRSUBCGK\n** GARUDA INDONESIA - AN ** CGK SOEKARNO HATTA.ID             13 WE 24APR 0000\n 1   GA 303  J9 C9 D9 Y9 GL       /SUB 2 CGK 3  0525    0700  E0/738  IR   1:35\n 2   GA 305  J9 C9 D8 Y9 GL       /SUB 2 CGK 3  0615    0750  E0/738       1:35\n 3   GA 307  J9 C9 D9 Y9 GL       /SUB 2 CGK 3  0750    0925  E0/738  IR   1:35\n 4   GA 449  J8 C7 D5 Y9 GL       /SUB 2 CGK 3  0820    0955  E0/738  IR   1:35\n 5   GA 309  J9 C9 D9 Y9 GL       /SUB 2 CGK 3  0840    1015  E0/738  IR   1:35\n 6   GA 311  J9 C9 D9 Y9 GL       /SUB 2 CGK 3  1005    1140  E0/738       1:35\n 7   GA 313  J9 C9 D8 Y9 GL       /SUB 2 CGK 3  1110    1245  E0/738       1:35\n 8   GA 315  J9 C9 D9 Y9 GL       /SUB 2 CGK 3  1230    1405  E0/738       1:35\n 9   GA 317  J9 C9 D9 Y9 GL       /SUB 2 CGK 3  1330    1505  E0/738       1:35\n10   GA 321  J9 C9 D7 Y9 GL       /SUB 2 CGK 3  1550    1725  E0/738       1:35\n11   GA 325  J9 C9 D7 Y9 GL       /SUB 2 CGK 3  1840    2015  E0/738  IR   1:35\n12   GA 327  J9 C9 D9 Y9 GL       /SUB 2 CGK 3  1935    2110  E0/738       1:35\n>",
//         "ANGA24APRSUBCGK -MD-\n** GARUDA INDONESIA - AN ** CGK SOEKARNO HATTA.ID             13 WE 24APR 0000\n 1   GA 329  J9 C9 D9 Y9 GL       /SUB 2 CGK 3  2030    2205  E0/738  IR   1:35\n>",
//         "ANGA24APRSUBCGK -MD-\n** GARUDA INDONESIA - AN ** CGK SOEKARNO HATTA.ID             13 WE 24APR 0000\n 1   GA 368  I4 Y9 GL             /SUB 2 SRG    0730    0825  E0/CRK\n     GA 235  JL I4 Y9 GL          /SRG   CGK 3  1010    1115  E0/738       3:45\n 2   GA 365  I3 Y9 GL             /SUB 2 SRG    1440    1540  E0/CRK\n     GA 245  JL I3 Y9 GL          /SRG   CGK 3  1745    1855  E0/738       4:15\n 3   GA 338  I2 Y9 GL             /SUB 2 DPS D  1650    1915  E0/CRK\n     GA 423  J8 C2 I2 Y9 GL       /DPS D CGK 3  2015    2120  E0/738  IR   4:30\n 4   GA 342  J5 C5 Y9 GL          /SUB 2 DPS D  1055    1310  E0/738  EQT\n     GA 653  J5 C5 Y9 GL          /DPS D CGK 3  1430    1535  E0/738       4:40\n 5   GA 344  J8 C8 Y9 GL          /SUB 2 DPS D  1625    1840  E0/738  EQT\n     GA 423  J8 C8 Y9 GL          /DPS D CGK 3  2015    2120  E0/738  IR   4:55\n 6   GA 338  I2 Y9 GL             /SUB 2 DPS D  1650    1915  E0/CRK\n     GA 413  J9 C2 I2 Y9 GL       /DPS D CGK 3  2040    2145  E0/738  IR   4:55\n>",
//         "ANGA24APRSUBCGK -MD-\n** GARUDA INDONESIA - AN ** CGK SOEKARNO HATTA.ID             13 WE 24APR 0000\n 1   GA 364  I4 Y9 GL             /SUB 2 LOP    1050    1305  E0/CRK\n     GA 433  JL I4 Y9 GL          /LOP   CGK 3  1450    1550  E0/738       5:00\n 2   GA 368  I4 Y9 GL             /SUB 2 SRG    0730    0825  E0/CRK\n     GA 237  JL I4 Y9 GL          /SRG   CGK 3  1135    1245  E0/738       5:15\n 3   GA 631  I1 Y9 GL             /SUB 2 UPG    0555    0900  E0/CRK\n     GA 641  JL I1 Y9 GL          /UPG   CGK 3  0955    1115  E0/738       5:20\n 4   GA 344  J9 C9 Y9 GL          /SUB 2 DPS D  1625    1840  E0/738  EQT\n     GA 413  J9 C9 Y9 GL          /DPS D CGK 3  2040    2145  E0/738  IR   5:20\n 5   GA 338  I2 Y9 GL             /SUB 2 DPS D  1650    1915  E0/CRK\n     GA 425  J9 C1 I2 Y9 GL       /DPS D CGK 3  2120    2215  E0/333  EQT  5:25\n 6   GA 342  J8 C8 Y9 GL          /SUB 2 DPS D  1055    1310  E0/738  EQT\n     GA 411  J8 C8 Y9 GL          /DPS D CGK 3  1535    1640  E0/738  EQT  5:45\n>",
//         "ANGA24APRSUBCGK -MD-\n** GARUDA INDONESIA - AN ** CGK SOEKARNO HATTA.ID             13 WE 24APR 0000\n 1   GA 344  J9 C9 Y9 GL          /SUB 2 DPS D  1625    1840  E0/738  EQT\n     GA 425  J9 C9 Y9 GL          /DPS D CGK 3  2120    2215  E0/333  EQT  5:50\n 2   GA 365  I2 Y9 GL             /SUB 2 SRG    1440    1540  E0/CRK\n     GA 247  JL I2 Y9 GL          /SRG   CGK 3  1930    2035  E0/738  IR   5:55\n 3   GA 342  J9 C9 Y9 GL          /SUB 2 DPS D  1055    1310  E0/738  EQT\n     GA 439  J9 C9 Y9 GL          /DPS D CGK 3  1605    1710  E0/738       6:15\n 4   GA 631  IL Y9 GL             /SUB 2 UPG    0555    0900  E0/CRK\n     GA 617  JL Y9 GL             /UPG   CGK 3  1055    1215  E0/738       6:20\n 5   GA 368  I4 Y9 GL             /SUB 2 SRG    0730    0825  E0/CRK\n     GA 239  JL I4 Y9 GL          /SRG   CGK 3  1350    1500  E0/738       7:30\n 6   GA 631  IL Y9 GL             /SUB 2 UPG    0555    0900  E0/CRK\n     GA 651  JL Y9 GL             /UPG   CGK 3  1215    1335  E0/738       7:40\n>",
//         "ANGA24APRSUBCGK -MD-\n** GARUDA INDONESIA - AN ** CGK SOEKARNO HATTA.ID             13 WE 24APR 0000\n 1   GA 364  I4 Y9 GL             /SUB 2 LOP    1050    1305  E0/CRK\n     GA 441  JL I4 Y9 GL          /LOP   CGK 3  1945    2045  E0/738       9:55\nNO MORE LATER FLTS   24APR SUB CGK\nCK ALT*DEST HLP\n>"
//     ]
// }

let resp={
    "data": [
        "AN24APRSUBCGK*30APR\n** GARUDA INDONESIA - AN ** CGK SOEKARNO HATTA.ID             13 WE 24APR 0000\n 1   GA 303  J9 C9 D9 Y9 GL       /SUB 2 CGK 3  0525    0700  E0/738  IR   1:35\n 2   GA 305  J9 C9 D8 Y9 GL       /SUB 2 CGK 3  0615    0750  E0/738       1:35\n 3   GA 307  J9 C9 D9 Y9 GL       /SUB 2 CGK 3  0750    0925  E0/738  IR   1:35\n 4   GA 449  J8 C7 D5 Y9 GL       /SUB 2 CGK 3  0820    0955  E0/738  IR   1:35\n 5   GA 309  J9 C9 D9 Y9 GL       /SUB 2 CGK 3  0840    1015  E0/738  IR   1:35\n 6   GA 311  J9 C9 D9 Y9 GL       /SUB 2 CGK 3  1005    1140  E0/738       1:35\n 7   GA 313  J9 C9 D8 Y9 GL       /SUB 2 CGK 3  1110    1245  E0/738       1:35\n 8   GA 315  J9 C9 D7 Y9 GL       /SUB 2 CGK 3  1230    1405  E0/738       1:35\n\n\n** GARUDA INDONESIA - AN ** SUB SURABAYA.ID                   19 TU 30APR 0000\n11   GA 302  J9 Y9 GL             /CGK 3 SUB 2  0525    0705  E0/738  IR   1:40\n12   GA 304  J9 Y9 GL             /CGK 3 SUB 2  0615    0750  E0/738       1:35\n13   GA 306  J6 Y9 GL             /CGK 3 SUB 2  0725    0855  E0/738       1:30\n14   GA 308  J9 Y9 GL             /CGK 3 SUB 2  0845    1025  E0/738  EQT  1:40\n15   GA 310  J9 Y9 GL             /CGK 3 SUB 2  1005    1145  E0/738  IR   1:40\n16   GA 312  J9 Y9 GL             /CGK 3 SUB 2  1105    1245  E0/738  EQT  1:40\n17   GA 316  J9 Y9 GL             /CGK 3 SUB 2  1325    1505  E0/738       1:40\n18   GA 448  J9 C9 D8 Y9 GL       /CGK 3 SUB 2  1545    1725  E0/738       1:40\n>",
        "ANGA24APRSUBCGK*GA30APRCGKSUB -MD-\n** GARUDA INDONESIA - AN ** CGK SOEKARNO HATTA.ID             13 WE 24APR 0000\n 1   GA 317  J9 C9 D9 Y9 GL       /SUB 2 CGK 3  1330    1505  E0/738       1:35\n 2   GA 321  J9 C9 D7 Y9 GL       /SUB 2 CGK 3  1550    1725  E0/738       1:35\n 3   GA 325  J9 C9 D7 Y9 GL       /SUB 2 CGK 3  1840    2015  E0/738  IR   1:35\n 4   GA 327  J9 C9 D9 Y9 GL       /SUB 2 CGK 3  1935    2110  E0/738       1:35\n 5   GA 329  J9 C9 D9 Y9 GL       /SUB 2 CGK 3  2030    2205  E0/738  IR   1:35\n\n\n\n\n\n** GARUDA INDONESIA - AN ** SUB SURABAYA.ID                   19 TU 30APR 0000\n11   GA 320  J9 Y9 GL             /CGK 3 SUB 2  1610    1750  E0/738       1:40\n12   GA 322  J9 Y9 GL             /CGK 3 SUB 2  1710    1850  E0/738       1:40\n13   GA 326  J9 Y9 GL             /CGK 3 SUB 2  1930    2110  E0/738       1:40\n>",
        "ANGA24APRSUBCGK*GA30APRCGKSUB -MD-\n** GARUDA INDONESIA - AN ** CGK SOEKARNO HATTA.ID             13 WE 24APR 0000\n 1   GA 368  I4 Y9 GL             /SUB 2 SRG    0730    0825  E0/CRK\n     GA 235  JL I4 Y9 GL          /SRG   CGK 3  1010    1115  E0/738       3:45\n 2   GA 365  I3 Y9 GL             /SUB 2 SRG    1440    1540  E0/CRK\n     GA 245  JL I3 Y9 GL          /SRG   CGK 3  1745    1855  E0/738       4:15\n 3   GA 338  I2 Y9 GL             /SUB 2 DPS D  1650    1915  E0/CRK\n     GA 423  J8 C2 I2 Y9 GL       /DPS D CGK 3  2015    2120  E0/738  IR   4:30\n 4   GA 342  J5 C5 Y9 GL          /SUB 2 DPS D  1055    1310  E0/738  EQT\n     GA 653  J5 C5 Y9 GL          /DPS D CGK 3  1430    1535  E0/738       4:40\n\n\n** GARUDA INDONESIA - AN ** SUB SURABAYA.ID                   19 TU 30APR 0000\n11   GA 238  JL I1 Y9 GL          /CGK 3 SRG    1325    1445  E0/738  EQT\n     GA 367  I1 Y9 GL             /SRG   SUB 2  1620    1720  E0/CRK       3:55\n12   GA 400  J7 I1 Y9 GL          /CGK 3 DPS D  0535    0840  E0/738  IR\n     GA 341  J7 Y9 GL             /DPS D SUB 2  0945    1010  E0/738  IR   4:35\n13   GA 230  JL I4 Y9 GL          /CGK 3 SRG    0535    0655  E0/738  EQT\n     GA 364  I4 Y9 GL             /SRG   SUB 2  0910    1010  E0/CRK       4:35\n14   GA 404  J7 I2 Y9 GL          /CGK 3 DPS D  0930    1235  E0/738  IR\n     GA 347  J7 Y9 GL             /DPS D SUB 2  1355    1420  E0/738  IR   4:50\n>",
        "ANGA24APRSUBCGK*GA30APRCGKSUB -MD-\n** GARUDA INDONESIA - AN ** CGK SOEKARNO HATTA.ID             13 WE 24APR 0000\n 1   GA 344  J8 C8 Y9 GL          /SUB 2 DPS D  1625    1840  E0/738  EQT\n     GA 423  J8 C8 Y9 GL          /DPS D CGK 3  2015    2120  E0/738  IR   4:55\n 2   GA 338  I2 Y9 GL             /SUB 2 DPS D  1650    1915  E0/CRK\n     GA 413  J9 C2 I2 Y9 GL       /DPS D CGK 3  2040    2145  E0/738  IR   4:55\n 3   GA 364  I4 Y9 GL             /SUB 2 LOP    1050    1305  E0/CRK\n     GA 433  JL I4 Y9 GL          /LOP   CGK 3  1450    1550  E0/738       5:00\n 4   GA 368  I3 Y9 GL             /SUB 2 SRG    0730    0825  E0/CRK\n     GA 237  JL I3 Y9 GL          /SRG   CGK 3  1135    1245  E0/738       5:15\n\n\n** GARUDA INDONESIA - AN ** SUB SURABAYA.ID                   19 TU 30APR 0000\n11   GA 414  J9 C9 I2 Y9 GL       /CGK 3 DPS D  1450    1800  E0/738  EQT\n     GA 349  I2 Y9 GL             /DPS D SUB 2  2005    2020  E0/CRK       5:30\n12   GA 654  JL I1 Y9 GL          /CGK 3 UPG    0115    0455  E0/738\n     GA 368  I1 Y9 GL             /UPG   SUB 2  0610    0650  E0/CRK       5:35\n13   GA 236  JL I2 Y9 GL          /CGK 3 SRG    1145    1305  E0/738\n     GA 367  I2 Y9 GL             /SRG   SUB 2  1620    1720  E0/CRK       5:35\n14   GA 410  J9 C9 I2 Y9 GL       /CGK 3 DPS D  1425    1720  E0/333\n     GA 349  I2 Y9 GL             /DPS D SUB 2  2005    2020  E0/CRK       5:55\n>",
        "ANGA24APRSUBCGK*GA30APRCGKSUB -MD-\n** GARUDA INDONESIA - AN ** CGK SOEKARNO HATTA.ID             13 WE 24APR 0000\n 1   GA 631  I1 Y9 GL             /SUB 2 UPG    0555    0900  E0/CRK\n     GA 641  JL I1 Y9 GL          /UPG   CGK 3  0955    1115  E0/738       5:20\n 2   GA 344  J9 C9 Y9 GL          /SUB 2 DPS D  1625    1840  E0/738  EQT\n     GA 413  J9 C9 Y9 GL          /DPS D CGK 3  2040    2145  E0/738  IR   5:20\n 3   GA 338  I2 Y9 GL             /SUB 2 DPS D  1650    1915  E0/CRK\n     GA 425  J9 C1 I2 Y9 GL       /DPS D CGK 3  2120    2215  E0/333  EQT  5:25\n 4   GA 342  J8 C8 Y9 GL          /SUB 2 DPS D  1055    1310  E0/738  EQT\n     GA 411  J8 C8 Y9 GL          /DPS D CGK 3  1535    1640  E0/738  EQT  5:45\n\n\n** GARUDA INDONESIA - AN ** SUB SURABAYA.ID                   19 TU 30APR 0000\n11   GA 402  J9 C9 I2 Y9 GL       /CGK 3 DPS D  0750    1045  E0/333  EQT\n     GA 347  J9 C9 Y9 GL          /DPS D SUB 2  1355    1420  E0/738  IR   6:30\n12   GA 608  JL Y9 GL             /CGK 3 UPG    0930    1310  E0/738  EQT\n     GA 630  IL Y9 GL             /UPG   SUB 2  1515    1600  E0/CRK       6:30\n13   GA 422  J9 C9 I2 Y9 GL       /CGK 3 DPS D  1310    1620  E0/332\n     GA 349  I2 Y9 GL             /DPS D SUB 2  2005    2020  E0/CRK       7:10\n14   GA 438  J9 C9 I2 Y9 GL       /CGK 3 DPS D  0705    1010  E0/738  IR\n     GA 347  J9 C9 Y9 GL          /DPS D SUB 2  1355    1420  E0/738  IR   7:15\n>",
        "ANGA24APRSUBCGK*GA30APRCGKSUB -MD-\n** GARUDA INDONESIA - AN ** CGK SOEKARNO HATTA.ID             13 WE 24APR 0000\n 1   GA 344  J9 C9 Y9 GL          /SUB 2 DPS D  1625    1840  E0/738  EQT\n     GA 425  J9 C9 Y9 GL          /DPS D CGK 3  2120    2215  E0/333  EQT  5:50\n 2   GA 365  I2 Y9 GL             /SUB 2 SRG    1440    1540  E0/CRK\n     GA 247  JL I2 Y9 GL          /SRG   CGK 3  1930    2035  E0/738  IR   5:55\n 3   GA 342  J9 C9 Y9 GL          /SUB 2 DPS D  1055    1310  E0/738  EQT\n     GA 439  J9 C9 Y9 GL          /DPS D CGK 3  1605    1710  E0/738       6:15\n 4   GA 631  IL Y9 GL             /SUB 2 UPG    0555    0900  E0/CRK\n     GA 617  JL Y9 GL             /UPG   CGK 3  1055    1215  E0/738       6:20\n\n\n** GARUDA INDONESIA - AN ** SUB SURABAYA.ID                   19 TU 30APR 0000\n11   GA 640  J9 C3 D3 I3 Y9 GL    /CGK 3 UPG    2335    0315+1E0/738\n     GA 368  I3 Y9 GL             /UPG   SUB 2  0610+1  0650+1E0/CRK       7:15\n12   GA 234  JL I2 Y9 GL          /CGK 3 SRG    0930    1050  E0/738\n     GA 367  I2 Y9 GL             /SRG   SUB 2  1620    1720  E0/CRK       7:50\n13   GA 434  JL I4 Y9 GL          /CGK 3 LOP    0545    0855  E0/738\n     GA 365  I4 Y9 GL             /LOP   SUB 2  1345    1400  E0/CRK       8:15\n14   GA 658  J9 C5 D5 I2 Y9 GL    /CGK 3 UPG    2205    0145+1E0/738  IR\n     GA 368  I2 Y9 GL             /UPG   SUB 2  0610+1  0650+1E0/CRK       8:45\n>",
        "ANGA24APRSUBCGK*GA30APRCGKSUB -MD-\n** GARUDA INDONESIA - AN ** CGK SOEKARNO HATTA.ID             13 WE 24APR 0000\n 1   GA 368  I4 Y9 GL             /SUB 2 SRG    0730    0825  E0/CRK\n     GA 239  JL I4 Y9 GL          /SRG   CGK 3  1350    1500  E0/738       7:30\n 2   GA 631  IL Y9 GL             /SUB 2 UPG    0555    0900  E0/CRK\n     GA 651  JL Y9 GL             /UPG   CGK 3  1215    1335  E0/738       7:40\n 3   GA 364  I4 Y9 GL             /SUB 2 LOP    1050    1305  E0/CRK\n     GA 441  JL I4 Y9 GL          /LOP   CGK 3  1945    2045  E0/738       9:55\nNO MORE LATER FLTS   24APR SUB CGK\nCK ALT*DEST HLP\n\n\n** GARUDA INDONESIA - AN ** SUB SURABAYA.ID                   19 TU 30APR 0000\n11   GA 642  JL I1 Y9 GL          /CGK 3 UPG    0705    1045  E0/738  EQT\n     GA 630  I1 Y9 GL             /UPG   SUB 2  1515    1600  E0/CRK       8:55\n12   GA 604  JL Y9 GL             /CGK 3 UPG    0510    0840  E0/738\n     GA 630  IL Y9 GL             /UPG   SUB 2  1515    1600  E0/CRK      10:50\nNO MORE LATER FLTS   30APR CGK SUB\nCK ALT*ORIG HLP\n>"
    ]
}

let result={departure:[], return:[]};

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
    // console.log(fls);
    fls.splice(0,2)
    fls.splice(fls.length-1,1)
    let {dep, ret} = filterFlights(fls);
    // console.log('departure',dep);
    // console.log('return',ret);
    
    // flag = cekFlag(fls)    
    // if(flag>=0)fls.splice(flag, fls.length - flag)
    // console.log(fls,flag); 
    // fls.forEach(txt => {
    //     let fobj=parseText(txt)
    //     result.push(fobj)
    // });
    // console.log(result);
    dep.forEach(d => {
        let fobj=parseText(d)
        
        result.departure.push(fobj)
    });

    ret.forEach(d => {
        let fobj=parseText(d)
        result.return.push(fobj)
    });
    
});
let xx={departure:[],return:[]}
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

// let fls=gdsResp.split('\n');
// fls.splice(0,2)
// fls.splice(fls.length-1,1)
// if(fls[fls.length-1].toLowerCase().indexOf('no more later')>=0)fls.splice(fls.length-1,1)
// console.log(fls);
// const rf = [];
// fls.forEach(flight => {
//     let f = parseText(flight)
//     console.log(f);
//     // parseInt(f.number)>0)
//     if(f.from != '' || f.to!='')rf.push(f)
// });

// let xx=[]
// let last=[];
// rf.forEach(flight => {    
//     if(flight.number=='')
//         last.push(flight)
//     else
//     {
//         if(last.length>0) xx.push(last)
//         last=[];
//         // last = [];
//         last.push(flight)
//     }
    
// });
// xx.push(last)
// console.log(xx);

// console.log(JSON.stringify(xx));    
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
    return obj
    // obj.classGroup=parseClass(text.substr(13,21))
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