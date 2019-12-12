let mongoose=require('mongoose');
let news=new mongoose.Schema({
    classf:{type:mongoose.SchemaTypes.ObjectId,ref:"catrto"},
    title:String,
    body:String,
},
{   //自动跟新时间
    timestamps: true
})
module.exports=mongoose.model('new',news)