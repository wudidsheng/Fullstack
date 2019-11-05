module.exports = app => {
    let express = require('express');
    let router = express.Router(); //生成子路由
    let catrto = require('../../sql/admin')
    app.use('/admin/api', router); //为/admin/api下配置路由
    router.post("/cert", (req, res) => {
        catrto.create(req.body, (err, result) => {
            if (!err) {
                res.send(result)
            }
        })
    })
    router.get('/cert',(req,res)=>{
        catrto.find({},(err,result)=>{
            if(!err){
                res.send(result)
            }
        })
    })
}