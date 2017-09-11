import fs from 'fs'
import querystring from 'querystring'
import request from 'request'
const encodePostData = require('./encodePostData.js')
const store = localStorage

export default class Weibo{
    constructor(userName='',userPwd=''){
        let self = this
        self.init(userName,userPwd)
    }

    init(userName='',userPwd=''){
        let self = this
        // 初始化一些登录信息
        // 用户名
        self.userName = userName || self.userName;
        // 密码
        self.userPwd = userPwd || self.userPwd;
        // 预登陆地址，不带base64编码后的用户名,用于获取登录信息
        self.preLoginUrl = "http://login.sina.com.cn/sso/prelogin.php?entry=weibo&checkpin=1&callback=sinaSSOController.preloginCallBack&rsakt=mod&client=ssologin.js(v1.4.18)";
        // 登录的网页地址
        self.loginUrl = "http://login.sina.com.cn/sso/login.php?client=ssologin.js(v1.4.18)";
        // 初始化预登陆数据为空
        self.preLoginData = '';
        // 初始化验证码为空
        self.pinCode = null;
        if(self.userName){
            // 格式化预登陆地址+编码用户名
            self.encodePreLoginUrl()
            // try {
            //     // 获取预登陆原始数据
            //     self.getPreLoginData().then((preLoginInitData)=>{
            //         // 解析预登陆原始数据
            //         self.preLoginData = self.parsePreLoginData(preLoginInitData)
            //         // 是否需要验证码
            //         if(self.preLoginData['showpin'] == 1){
            //             console.log('need pin code')
            //             // self.getPinImg();
            //             // self.inputPinCode();
            //         }else{
            //             self.postData().then((responseBody)=>{
            //                 let finnalRet = self.getFinnalLoginUrl(responseBody)
            //                 self.getCookies(finnalRet.res).then(ret=>{
            //                     store.setItem('weiboxCookies',ret)
            //                 }).catch(ex=>{
            //                     console.log(ex)
            //                 })
            //             })
            //         }
            //     })
            // } catch (error) {
            //     console.log(error)
            // }
        }
    }


    /**
     * 构造预登录链接，加上base64编码的用户名
     * 
     * @memberof Weibo
     */
    encodePreLoginUrl() {
        let self = this
        let encodeUserName = encodePostData.encryptUserName(self.userName);
        self.preLoginUrl = `${self.preLoginUrl}&su=${encodeUserName}`;
    }

    /**
     * 获取预登录数据
     * 
     * @return {Object} Promise 
     * @memberof Weibo
     */
    getPreLoginData() {    
        let self = this
        return new Promise((resolve, reject) => {
            request(self.preLoginUrl, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(response.body)
                } else {
                    reject('没有获取到预登录数据')
                }
            });
        });
    }
    /**
     * 解析获取到的预登录数据
     * 
     * @param {String} data 
     * @return {Object} json
     * @memberof Weibo
     */
    parsePreLoginData(data) {
        let reg = /\((.*)\)/
        return JSON.parse(reg.exec(data)[1])
    }

    /**
     * 获取验证码地址
     * 
     * @return {String} PinCode Image Url
     * @memberof Weibo
     */
    getPinImg() {
        // 构造验证码的url
        let pinImgUrl = `http://login.sina.com.cn/cgi/pin.php?r=${Math.floor(Math.random() * 1e8)}&s=0&p=${this.preLoginData['pcid']}`
        //request(pinImgUrl).pipe(fs.createWriteStream(__dirname + '/../pinCode.png'));
        return pinImgUrl
    }

    inputPinCode() {
        // const rl = readline.createInterface({
        //     input: process.stdin,
        //     output: process.stdout
        // });
        // return new Promise((resolve, reject) => {
        //     rl.question('请输入验证码，验证码图片在根目录下\n', (pinCode) => {
        //         console.log(`你输入的验证码为：${pinCode}`);
        //         rl.close();
        //         resolve(pinCode);
        //     })
        // })
    }

    /**
     * Post 数据到服务器
     * 
     * @param {String} pinCode 
     * @return {Object} Promise
     * @memberof Weibo
     */
    postData(pinCode) {
        let self = this
        let headers = {
            "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0",
            'Accept-Language': 'zh-cn',
            'Content-Type':'application/x-www-form-urlencoded',
            'Connection': 'Keep-Alive'
        };
        let encodeBody = encodePostData.encodePostData(self.userName, self.userPwd, self.preLoginData.servertime,
            self.preLoginData.nonce, self.preLoginData.pubkey, self.preLoginData.rsakv, self.pinCode, self.preLoginData['pcid']);
        let options = {
            method: 'POST',
            url: self.loginUrl,
            headers: headers,
            body: encodeBody,
            gzip: true
        };
        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    response.setEncoding('utf-8');
                    resolve(response.body);
                }else{
                    reject('post请求失败',error)
                }
            })
        })
    }

    /**
     * 获取最终重定向后的地址
     * 
     * @param {String} responseBody 
     * @return {Object} JSON
     * @memberof Weibo
     */
    getFinnalLoginUrl(responseBody) {
        let reg = /location\.replace\((?:"|')(.*)(?:"|')\)/;
        let loginUrl = reg.exec(responseBody)[1];
        let parseLoginUrl = querystring.parse(loginUrl);
        let ret = {
            code:1,
            res:loginUrl
        }
        switch(parseLoginUrl.retcode){
            case '0':
            break;
            case '101':
            ret = {
                code:0,
                res:"登录失败，登录名或密码错误"
            }
            break;
            case '2070':
            ret = {
                code:0,
                res:'登录失败，验证码错误'
            }
            break;
            default:
            ret = {
                code:0,
                res:'未知错误'
            }
            break;
        }
        return ret
    }

    /**
     * 获取Cookie
     * 
     * @param {String} finnalLoginUrl 
     * @return {Object} Promise 
     * @memberof Weibo
     */
    getCookies(finnalLoginUrl) {
        return new Promise((resolve, reject) => {
            let j = request.jar();
            request.get({url: finnalLoginUrl, jar: j}, function (error, reponse, body) {
                let cookies = j.getCookieString(finnalLoginUrl);
                if(!error){
                    resolve(cookies)
                }else{
                    reject(error)
                }
            })
        })
    }
}
