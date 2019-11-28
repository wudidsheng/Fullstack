//加密模块
let crypto=require('crypto')
var md5=crypto.createHash('md5')
let mongoose=require('mongoose');
// 管理员账号
let news=new mongoose.Schema({
        username:String,
        password:{
            type:String,
            select:false,
            set:(value)=>{
                return md5.update(value+'wosizp').digest('hex');
            }
        }
})
module.exports=mongoose.model('useradmin',news)
