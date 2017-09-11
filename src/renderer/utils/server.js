import request from 'request'

const server = (config) => {
    return new Promise((resolve,reject)=>{
        config['gzip'] = true
        request(config).then((err,res,body)=>{
            if(!err && res.statusCode == 200){
                res.setEncoding('utf-8')
                resolve(body)
            }else{
                reject(err,res)
            }
        })
    })
}

module.exports = {
    server
}