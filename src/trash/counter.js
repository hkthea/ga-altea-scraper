module.exports =  class counter 
{
    // const obj = [{sess:'a',}];

    constructor(x=0)
    {
        this.x=x;
        this.array=[];
    }

    inc(){
        this.x++;
    }

    addObj(obj)
    {
        this.array.push(obj);
    }

    getObj()
    {
        if(this.array.length==0)return false;
        return this.array.pop();
    }

    getValue()
    {
        return this.x;
    }

    async running(delay=5000)
    {
        var time=Date.now();
        setInterval(()=>{
            this.inc();
        }, delay);
    }
}