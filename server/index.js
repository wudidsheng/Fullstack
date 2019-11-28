let express = require('express');
let app = express();
let cors = require('cors')
var multer = require('multer')
let fs = require('fs');
app.use(cors()) //跨域中间件
require('./sql/db') //数据库连接
// 静态文件夹
app.set('md5','wosizp')  // 全局设置token加密密文
app.use('/upload/rsult', express.static("./upload"))
app.use(express.json()) //json解析中间件
require('./router/admin')(app); //配置admin路由


// 文件上传
var upload2 = multer({
    dest: __dirname + '/./upload',
});
app.post('/upload', upload2.single('file'), function (req, res, next) {
    //获取文件类型
    let extrem = req.file.originalname.slice(req.file.originalname.lastIndexOf('.'))
    req.file.url = "http:127.0.0.1:3000/upload/rsult/" + req.file.filename + extrem;
    //    更改文件名
    fs.rename(req.file.path, `${req.file.path}` + extrem, (err) => {
        if (!err) {
            res.send(req.file);
        }
    })

})
app.listen(3000, () => {
    console.log('3000')
})