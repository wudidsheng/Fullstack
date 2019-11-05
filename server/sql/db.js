let mongoose =require("mongoose");
// 连接数据库
var db=mongoose.connect('mongodb://localhost:27017/wzry',{
    useNewUrlParser: true,
});

module.exports=db;