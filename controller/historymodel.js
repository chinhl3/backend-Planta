const moongoose = require('mongoose');
const Schema = moongoose.Schema;

const historySchema = new Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    method_ship:{
        type:Number,
        required:true
    },
    tong:{
        type:Number,
        required:true
    },
    selected_product:{
        type:Array,
        default:[]
    }
})

module.exports =  moongoose.model('history',historySchema);