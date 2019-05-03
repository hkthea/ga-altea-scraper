checkPax('  1.UTAMA/ASROWINSYAH ROSAMRS   2.UTAMA/FITROMR');
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