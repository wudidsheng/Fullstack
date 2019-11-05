let mongoose=require('mongoose');
let calass=new mongoose.Schema({
    name:String
});
module.exports=mongoose.model('catrto',calass);