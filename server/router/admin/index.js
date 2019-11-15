module.exports = app => {
    let express = require('express');
    let router = express.Router(); //生成子路由
    let route = express.Router({
        mergeParams:true
    })
    let catrto = require('../../sql/admin')
    app.use('/admin/api', router); //为/admin/api下配置路由
    app.use('/admin/api/rest/:resour', route) //通用db管理
    // 添加分类
    router.post("/cert", (req, res) => {
        catrto.create(req.body, (err, result) => {
            if (!err) {
                res.send(result)
            }
        })
    })
    //查找所有分类
    router.get('/cert', (req, res) => {
        catrto.find({}).populate('father').exec((err, result) => {
            if (!err) {
                res.send(result)
            }
        })
    })
    // 删除
    router.delete('/cert/:id', (req, res) => {
        catrto.findByIdAndRemove(req.params.id, (err, result) => {
            res.send(result)
        })
    })
    // 查找一条
    router.get('/cert/:id', (req, res) => {
        catrto.findById(req.params.id, (err, result) => {
            res.send(result)
        })
    })
    // 编辑一条分类
    router.put("/cert/:id", (req, res) => {
        console.log(req.params.id, req.body)
        catrto.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
            console.log()
            res.send(result)
        })
    })
    //通用物品管理
    /* ------装备物品管理-------*/
    route.get('/', (req, res) => {
        let article = require('../../sql/'+req.params.resour.toLowerCase());
         article.find({},(err,result)=>{
                res.send(result);
         })
    })
    // 添加物品
    route.post('/', (req, res) => {
        let article = require('../../sql/'+req.params.resour.toLowerCase());
        article.create(req.body, (err, result) => {
            if (!err) {
                res.send(result)
            }
        })
    })
    //删除物品
    route.delete('/:id', (req, res) => {
        let article = require('../../sql/'+req.params.resour.toLowerCase());
        article.findByIdAndRemove(req.params.id,(err,result)=>{
            if(!err){
                res.send(result);
            }
        })
    })
    // 编辑物品
    route.put('/:id', (req, res) => {
        let article = require('../../sql/'+req.params.resour.toLowerCase());
        article.findByIdAndUpdate(req.params.id,req.body,(err,result)=>{
            if(!err){
                res.send(result);
            }
        })
    })
    //得到一条详情
    route.get("/:id",(req,res)=>{
        let article = require('../../sql/'+req.params.resour.toLowerCase());
        article.findById(req.params.id,(err,result)=>{
            res.send(result);
        })
    })
}