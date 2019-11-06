module.exports = app => {
    let express = require('express');
    let router = express.Router(); //生成子路由
    let catrto = require('../../sql/admin')
    app.use('/admin/api', router); //为/admin/api下配置路由
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
        catrto.find({}, (err, result) => {
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
        console.log(req.params.id,req.body)
        catrto.findByIdAndUpdate(req.params.id,req.body, (err, result) => {
                console.log()
            res.send(result)
        })
    })
}