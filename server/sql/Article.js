let mongoose=require('mongoose');
// 装备模型，名字+icon
let calass=new mongoose.Schema({
    name:String,
    icon:String
});
module.exports=mongoose.model('article',calass);