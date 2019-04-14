let resp ='FXA\n\n * FARE BASIS *  DISC    *  PSGR      * FARE<IDR>  * MSG  *T\n01 YRTID      *          * P1-4       *   3597700  *      *Y\n>                                                 PAGE  1/ 1\n>'

let arr = resp.split('\n')

arr.splice(0,2)
arr.splice(arr.length -1,1)
let head=arr[0]
arr.splice(0,1)
// console.log(arr);

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
        // disc:(str.substr(15,10).trim()),
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

let response = {
    amount:amount,
    airlineCode:'GA',
    log:result
}

// console.log(response);
