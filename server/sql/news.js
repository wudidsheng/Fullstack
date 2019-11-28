let mongoose=require('mongoose');
let news=new mongoose.Schema({
    classf:{type:mongoose.SchemaTypes.ObjectId,ref:"catrto"},
    title:String,
    body:String,
})
module.exports=mongoose.model('new',news)