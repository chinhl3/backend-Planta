
const moongoose = require('mongoose');
const Schema = moongoose.Schema;

const catecorySchema = new Schema({
    id_tt:{
        type:Number,
        required:true
    },
    like:{
        type:String,
        required:true
    }
})
module.exports =  moongoose.model('categorie',catecorySchema);