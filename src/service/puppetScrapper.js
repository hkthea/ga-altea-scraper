import createCache from '../service/cache';
import {altea_username, altea_password} from '../const/env'
import alteaCommander from '../service/alteaCommander'

const EventEmitter = require('events');
class MyEmitter extends EventEmitter{};

const launchPuppet=async(PAGE, PREFIX='ALTEA')=> {
    
    const BASEURI='https://tc34.resdesktop.altea.amadeus.com/';
    const URI='https://tc34.resdesktop.altea.amadeus.com/app_ard/apf/init/login?SITE=AGAPAIDL&LANGUAGE=GB&MARKETS=ARDW_PROD_WBP,ARDW_ESSENTIAL'
    const LNS='app_ard/apf/do/loginNewSession.UM/login';
    const LCP='app_ard/apf/do/login.usermanagement_login/loginComplete';

    // var MASTER_SESSION ;
    var CACHE = createCache(5)
    var COOKIE_CACHE = createCache(2)
    let COOKIEJAR=[];
    var ERROR_LOGIN_MSG='';

    const EXCLUDE_RESOURCES = ['image', 'media', 'font','manifest', 'other']//['stylesheet', 'image', 'media', 'font', 'manifest', 'other'];
    const SESSION_LIST=[];
    const EVENTS = new MyEmitter();

    var READY;
    var LOCKED;

    await PAGE.setViewport({ width: 800, height: 600 });
    // await PAGE.setRequestInterception(true);

    // PAGE.on('request', _onRequest);

    PAGE.on('response',_onResponse)
    console.log(PREFIX, 'LAUNCHED');
    
    const _login=async()=>{
        READY = false;
        LOCKED = true;
        console.log(PREFIX, 'LAUNCHED');
        await _loadCookies()

        console.log(PREFIX,'set Cookies',COOKIEJAR);        
        await PAGE.goto('about:blank');    
        if(COOKIEJAR)await PAGE.setCookie(...COOKIEJAR)
        console.log(PREFIX,'Cookies From PAGE ',await PAGE.cookies());
        await PAGE.goto(URI);            
        // await PAGE.waitFor(15000);
        await PAGE.waitForSelector('input[name=USER_ALIAS]');
        await PAGE.type('input[name=USER_ALIAS]', altea_username, {delay: 20})
        console.log(PREFIX,'type username');
        await PAGE.type('input[name=PASSWORD]', altea_password, {delay: 20})
        console.log(PREFIX,'type password');      
        await PAGE.click('button.signin', {delay: 20})
        console.log(PREFIX,'Click Signin');
    
        await PAGE.waitFor(5000)
        let errorLogin=await PAGE.$('#eusermanagement_login_errorMessage')
        if(errorLogin)
        {
            ERROR_LOGIN_MSG = await PAGE.evaluate(e=>e.innerHTML, errorLogin)
            console.log(PREFIX,ERROR_LOGIN_MSG, 'ERROR_LOGIN_MSG');
            await errorLogin.dispose();
        }
        let isOtp = await PAGE.$('input[name=ONE_TIME_PASSWORD]')
        if(isOtp)
        {
            let otp =await _getOtp()
            await CACHE.deleteKey(otp);
            otp=otp.replace('otp_key:','')
            await PAGE.type('input[name=ONE_TIME_PASSWORD]',otp, {delay:30})
            console.log(PREFIX,'type otp');
            await PAGE.type('input[name=PASSWORD]', altea_password, {delay: 20})
            console.log(PREFIX,'type password');
            await PAGE.click('button.signin', {delay: 20})
            console.log(PREFIX,'Click Signin');
            // await PAGE.waitFor(15000);
            // cek berhasil login gk?
            let errorLogin=await PAGE.$('#eusermanagement_login_errorMessage')
            if(errorLogin)
            {
                ERROR_LOGIN_MSG = await PAGE.evaluate(e=>e.innerHTML, errorLogin)
                await errorLogin.dispose();
                console.log(PREFIX,ERROR_LOGIN_MSG, 'ERROR_LOGIN_MSG');
            }
            // console.log(PREFIX,errorLogin);
        }
        console.log(PREFIX,ERROR_LOGIN_MSG=='' || ERROR_LOGIN_MSG=='&nbsp;');
        
        if(ERROR_LOGIN_MSG=='' || ERROR_LOGIN_MSG=='&nbsp;')
        {
            try {
                
                let logoutSelector = await PAGE.waitForSelector('a#eusermanagement_logout_logo_logout_id', {timeout:120000})
                console.log(PREFIX, logoutSelector, 'LOGOUT SELECTOR');
                
                let selectors = ['a#e3newCrypticSessionLink', 'a#e2newCrypticSessionLink','a#e1newCrypticSessionLink','a#e4newCrypticSessionLink','a#e5newCrypticSessionLink'];
                for (let i = 0; i < selectors.length; i++) {
                    const selector = selectors[i];
                    let found = await PAGE.$(selector);
                    console.log(PREFIX,found, 'Found selector '+selector);
                    
                    if(found)
                    {
                        await PAGE.waitFor(20000)
                        await _tapNewSession(selector)
                        break;
                    }
                }
            } catch (error) {
                console.log('ERROR on TAP NEW SESSION ',error);                                
            }
        }
        LOCKED = false;
        READY = true;
        EVENTS.emit('onReady')
    }

    const _tapNewSession=async (selector)=>{
        try {
            console.log(PREFIX,'Wait Selector '+selector);
            
            await PAGE.waitForSelector(selector);
            await PAGE.waitFor(5000);           
            for (let index = 1; index < 6; index++) {
                console.log(PREFIX,'TAP new Session '+index);
                
                await PAGE.tap(selector)                
                await PAGE.waitFor(10000);
            } 
            return true;
        } catch (error) {
            console.log(PREFIX,error);            
            return false;
        }
    }

    const _getOtp=async ()=>{
        let otp = await _requestOtp();
        if(otp.length==0) return await _getOtp()
        return otp[0];
    }

    function _requestOtp()
    {
        return new Promise((resolve, rejects)=>{
            setTimeout(async ()=>{
                try {                    
                    let otps = await CACHE.readKeys('otp_key*');
                    resolve(otps);                
                } catch (error) {
                    rejects(error)
                }
            },5000);
        });
    }
    
    const _cekCookies=async(cookies)=>{
        let reqToSave=false
        for (let ii = 0; ii < cookies.length; ii++) {
            const cookie = cookies[ii];
            let changed = false;
            let newCookie = true;
            for (let i = 0; i < COOKIEJAR.length; i++) {
                const c = COOKIEJAR[i];
                if((cookie.name==c.name))
                {
                    newCookie=false;
                    if((cookie.value!=c.value))
                    {
                        COOKIEJAR[i]=cookie;
                        changed=true;
                        break
                    }                    
                }
            }
            if(newCookie)COOKIEJAR.push(cookie)
            reqToSave |= newCookie || changed
        }
        if(reqToSave)await _saveCookies(COOKIEJAR)
    }

    async function _saveCookies(cookie) {
        console.log(PREFIX,'Save COOKIE ',cookie);        
        await COOKIE_CACHE.setKey('cookies:'+PREFIX,JSON.stringify(cookie),24*60*60)
        EVENTS.emit('cookieChanged',COOKIEJAR)
    }

    async function _loadCookies()
    {
        let cjar = JSON.parse(await COOKIE_CACHE.getKey('cookies:'+PREFIX))
        COOKIEJAR = cjar?cjar:[] 
        console.log(PREFIX,'Load Cookie', COOKIEJAR);        
        return COOKIEJAR
    }

    async function _onResponse(resp){
        let url=resp.url().replace(BASEURI,'');
        if(url.indexOf('app_ard/apf/view/login')>=0)
        {
            let t=url.split(';');
            t=t[1].split('?');            
        }
        else if((url.indexOf('ga')>=0)&&(url.indexOf('.js')>=0))
        {
            console.log(PREFIX,url, resp.headers());            
            let cookies = await PAGE.cookies();
            _cekCookies(cookies);
            console.log(PREFIX,cookies);
        }
        else if((url.indexOf(LNS)>=0)||(url.indexOf(LCP)>=0))
        {
            let content = await resp.text()
            let session = _processSession(content)

            console.log(PREFIX,'New Session ', session);            
            let commander=new alteaCommander(COOKIEJAR, session);
            // session.commander=commander;
            SESSION_LIST.push(commander)       
            EVENTS.emit('onNewSession', commander, SESSION_LIST, COOKIEJAR)            
            console.log(PREFIX,SESSION_LIST);
            
        }
        else if(url.indexOf('app_ard/apf/do/home.usermanagement_logout/lockSession')>=0)
        {
            console.log(PREFIX,'Session LOCKED');
            LOCKED = true;
            EVENTS.emit('onLocked');
            READY = false;
            let inp = await PAGE.waitForSelector('#eusermanagement_logout_lock_PASSWORD_id_input')
            if(inp)
            {
                await PAGE.waitFor(5000)
                await PAGE.type('input[name=PASSWORD]', altea_password, {delay:50})
                await PAGE.click('button#eusermanagement_logout_lock_save_id', {delay: 20})
                await PAGE.waitFor(3000);
                console.log(PREFIX,'UNLOCK Session');                
                READY = true;
                LOCKED = false;
                // EVENTS.emit('onReady')
            }

        }
    }

    const _processSession=(content)=>{
        // return content;
        let t = content.split('<templates-init moduleId="cryptic"');
        t = t[1].split('"><![CDATA[');
        t = t[1].split(']]></templates-init>')
        let model=t[0]
        // t = t[1].split('"')
        // let new_session = t[0]
        return JSON.parse(model)
    }

    async function _onRequest(request){
        if (EXCLUDE_RESOURCES.indexOf(request.resourceType()) > -1)
            request.abort('aborted');
        else
            request.continue();
    }
    
    try {    
        _login()
    } catch (error) {
        EVENTS.emit('onLoginException',error)
    }
    
    return new Promise((resolve)=> resolve({
        cookieJar:()=>{return COOKIEJAR},
        sessionList:SESSION_LIST,
        isReady:()=>{return READY},
        isLocked:()=>{return LOCKED},
        listener:EVENTS,
        page:PAGE,
        prefix:PREFIX
    }))
}

module.exports=launchPuppet