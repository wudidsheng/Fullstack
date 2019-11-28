let mongoose=require('mongoose');
let news=new mongoose.Schema({
    title:String,
    bodys:[{
        image:String,
        link:String
    }]
})
module.exports=mongoose.model('ads',news)