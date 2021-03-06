module.exports = app => {
    let express = require('express');
    let router = express.Router(); //生成子路由
    let route = express.Router({
        mergeParams: true
    })
    let catrto = require('../../sql/admin')
    let tonknjs = require('../../midvier/token')
    app.use('/admin/api', router); //为/admin/api下配置路由
    app.use('/admin/api/rest/:resour', tonknjs(app), route) //通用db管理
    //登陆
    router.post('/login', async (req, res) => {
        let login = require('../../sql/useradmin'); //登陆
        let crypto = require('crypto'); // 加密
        var jwt = require('jsonwebtoken'); //webtoken          
        let {
            username,
            password
        } = req.body
        //1:查用户名
        let user = await login.findOne({
            username: username
        })
        if (!user) {
            res.status(454).send({
                name: '没有这个用户'
            })
            return ''
        }
        //验证密码
        let pass = await login.findById(user._id).select('password');
        let dbpass = crypto.createHash('md5').update(password + 'wosizp').digest('hex');
        if (!(pass.password == dbpass)) {
            res.status(454).send({
                name: '密码错误'
            })
            return ''
        }
        //返回token 
        let token = jwt.sign({
            username: username,
            id: user._id
        }, app.get('md5'), {
            expiresIn: '5h'
        })
        res.send(token)
    })
    // 添加分类
    router.post("/cert", tonknjs(app), (req, res) => {
        catrto.create(req.body, (err, result) => {
            if (!err) {
                res.send(result)
            }
        })
    })
    //查找所有分类
    router.get('/cert', tonknjs(app), (req, res) => {
        catrto.find({}).populate('father').exec((err, result) => {
            if (!err) {
                res.send(result)
            }
        })
    })
    // 删除
    router.delete('/cert/:id', tonknjs(app), (req, res) => {
        catrto.findByIdAndRemove(req.params.id, (err, result) => {
            res.send(result)
        })
    })
    // 查找一条
    router.get('/cert/:id', tonknjs(app), (req, res) => {
        catrto.findById(req.params.id, (err, result) => {
            res.send(result)
        })

    })
    // 编辑一条分类
    router.put("/cert/:id", tonknjs(app), (req, res) => {
        console.log(req.params.id, req.body)
        catrto.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
            res.send(result)
        })
    })
    //通用物品管理
    /* ------装备物品管理-------*/
    route.get('/', (req, res) => {
        let article = require('../../sql/' + req.params.resour.toLowerCase());
        if (req.params.resour == 'news') {
            article.find({}).populate('classf').exec((err, result) => {
                res.send(result)
            })
        } else {
            article.find({}, (err, result) => {
                if (!err) {
                    res.send(result)
                }
            })
        }
    })
    // 添加物品
    route.post('/', (req, res) => {
        let article = require('../../sql/' + req.params.resour.toLowerCase());
        article.create(req.body, (err, result) => {
            if (!err) {
                res.send(result)
            }
        })
    })
    //删除物品
    route.delete('/:id', (req, res) => {
        let article = require('../../sql/' + req.params.resour.toLowerCase());
        article.findByIdAndRemove(req.params.id, (err, result) => {
            if (!err) {
                res.send(result);
            }
        })
    })
    // 编辑物品
    route.put('/:id', (req, res) => {
        let article = require('../../sql/' + req.params.resour.toLowerCase());
        article.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
            if (!err) {
                res.send(result);
            }
        })
    })
    //得到一条详情
    route.get("/:id", (req, res) => {
        let article = require('../../sql/' + req.params.resour.toLowerCase());
        article.findById(req.params.id, (err, result) => {
            res.send(result);
        })
    })
}