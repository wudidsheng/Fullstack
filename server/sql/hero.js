let mongoose = require('mongoose');
// 英雄模型
let calass = new mongoose.Schema({
    name: String,
    icon: String,
    title: String,
    position: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "catrto"
    }],
    Difficult: {
        skill: Number,
        attack: Number,
        save: Number
    },
    skills: [{
        name: String,
        icon: String,
        desc: String,
        tips:String,
    }],
    downwind: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "article"
    }],
    agwind: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "article"
        }]
    
        ,
    usetips: String,
    temtips: String,
    //关系
    relations: [{
        hero: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "hero"
        },
        des: String
    }]
});
module.exports = mongoose.model('hero', calass);