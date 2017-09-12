import request from 'request'

const server = (config) => {
    return new Promise((resolve,reject)=>{
        request(config,(err,res,body)=>{
            if(!err && res.statusCode == 200){
                res.setEncoding('utf-8')
                resolve(body)
            }else{
                reject(err,res)
            }
        })
    })
}
export default server