import fs from 'fs'

class Weibo{
    constructor(opts){
        let self = this
        self.pincode_path = 'pincode.png'
        self.cookies_files = 'weibo_login_cookies.dat'
        self.headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:35.0) Gecko/20100101 Firefox/35.0',
            'Referer': 'http://weibo.com/'
        }
        self.ssoPreLoginUrl = 'http://login.sina.com.cn/sso/prelogin.php'
        self.ssoPreLoginPayload = {
            'su': '',
            'entry': 'weibo',
            'checkpin': '1',
            'callback': 'sinaSSOController.preloginCallBack',
            'rsakt': 'mod',
            'client': 'ssologin.js(v1.4.18)'
        }
        self.pincodeUrl = 'http://login.sina.com.cn/cgi/pin.php'
        
        self.ssoLoginUrl = `http://login.sina.com.cn/sso/login.php?
                            client=ssologin.js(v1.4.18)`
        
        self.ssoLoginData = {
            'sp': '',
            'su': '',
            'from': '',
            'nonce': '',
            'rsakv': '',
            'pagerefer': '',
            'servertime': '',
            'entry': 'weibo',
            'gateway': '1',
            'savestate': '7',
            'userticket': '1',
            'vsnf': '1',
            'service': 'miniblog',
            'pwencode': 'rsa2',
            'encoding': 'UTF-8',
            'prelt': '45',
            'url': `http://weibo.com/ajaxlogin.php?
                    framelogin=1&
                    callback=parent.sinaSSOController.feedBackUrlCallBack`,
            'returntype': 'META'
        }
    }

    login(opts){

    }
}