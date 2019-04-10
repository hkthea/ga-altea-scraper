const counter = require('./counter');

module.exports = class counter2 extends counter
{
    constructor(x)
    {
        super(x);
    }

    inc(){
        this.x+=this.x;
    }
}