let mongoose=require('mongoose');
let calass=new mongoose.Schema({
    name:String,
    father:{type:mongoose.SchemaTypes.ObjectId,ref:"catrto"}
});
module.exports=mongoose.model('catrto',calass);