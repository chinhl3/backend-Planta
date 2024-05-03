// khai bao schemas user
// (-id,name ,email,password,role,cart)
const moongoose = require('mongoose');
const schemas=moongoose.Schema;
const ObjectId= schemas.ObjectId;

const userSchema = new schemas({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    sdt:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:0
    },
    cart:{
        type:Array,
        default:[]
    },
    // xac thuc tai khoan
    isVerified:{
        type:Boolean,
        default:false
    }


});
module.exports = moongoose.models.user || moongoose.model('user',userSchema);