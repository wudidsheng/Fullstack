let jwt=require('jsonwebtoken');
let usermodel=require('../sql/useradmin')
module.exports= app=>{
    return async (req,res,next)=>{
       //判断token是否存在
        if(req.headers.toneknaurh){
             //获取token
             let token=String(req.headers.toneknaurh).split(':').pop();
             //  token不存在
             if(!token){
                 res.status(422).send({name:'用户未登陆'})
             }
         // 解密token获取用户id
            let {id}=jwt.verify(token,app.get('md5'));
         // token被篡改
             if(!id){
                 res.status(422).send({name:'请重新登陆'})
             }
         //查询数据库
            let result=await usermodel.findById(id)
            //用户不存在
            if(!result){
             res.status(422).send({name:'请重新登陆'})
             }
        next()
        }
        else{
            res.status(454).send({name:'请先登陆'})
        }
    }
}