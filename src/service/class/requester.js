// var http=require('https');
// var cheerio = require('cheerio');
// import axios from 'axios';

require('es6-promise').polyfill();
require('isomorphic-fetch');

class Requester
{
    constructor(baseUri='https://www.google.com/')
    {
        this.baseUri=baseUri;
        this.defHeader={
            'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'
        };
        this.cookie_ready=false
        this.cookies=[];
        
        console.log('Create baseScrapper');        
    }

    async initCookies(cookiejar){
        // let cookies=(await this.cookieCache.getKey('cookie:'+this.prefix));
        this.cookies = cookiejar//JSON.parse(cookies) || [];
        this.cookie_ready=true
    }

    getStringCookie()
    {
        let strCookie=[];
        let cookies = this.cookies || [];
        cookies.forEach((val=>{
            let cookie=val.name+'='+val.value;
            strCookie.push(cookie);
        }))
        return strCookie.join('; ');
    }

    async post(page, data, header={}, type='application/x-www-form-urlencoded')
    {
        if(!this.cookie_ready)await this.initCookies()
        var reqCookie=this.getStringCookie();
        let hs={...this.defHeader, ...header, 'content-type':type};
        if(reqCookie!='')hs.cookie=reqCookie;
        let headers=new Headers(hs);
        let options={
            method:'POST',
            body:data,
            headers:headers,            
        }
        // if(reqCookie!='')options.headers.cookie=reqCookie;
        // const resp = await http.request(this.baseUri+page, options);
        console.log(options, this.baseUri+page);
        const resp= await fetch(this.baseUri+page,options);
        console.log(resp);
        return {
            html:await resp.text(),
            headers:resp.headers,
            all:resp
        };
    }

    async get(page, header={})
    {
        if(!this.cookie_ready)await this.initCookies()
        
        var reqCookie=this.getStringCookie();
        // return ;
        let hs={...this.defHeader, ...header};
        if(reqCookie!='')hs.cookie=reqCookie;
        
        let headers=new Headers(hs);
        
        let options={
            method:'GET',
            headers:headers,            
        }
        // if(reqCookie!='')options.headers.cookie=reqCookie;
        // const resp = await http.request(this.baseUri+page, options);
        console.log(options, this.baseUri+page);
        
        const resp= await fetch(this.baseUri+page,options);
        await this.parseCookies(resp.headers);    
        return {
            html:await resp.text(),
            headers:resp.headers,
            all:resp
        };
    }

    async head(page, header={})
    {
        if(!this.cookie_ready)await this.initCookies()
        var reqCookie=this.getStringCookie();
        let hs={...this.defHeader, ...header};
        if(reqCookie!='')hs.cookie=reqCookie;
        let headers=new Headers(hs);
        let options={
            method:'HEAD',
            headers:headers,            
        }
        
        const resp= await fetch(this.baseUri+page,options);
        console.log(resp.headers);
        return {
            html:await resp.text(),
            headers:resp.headers,
            all:resp
        };
    }
}

module.exports=Requester;