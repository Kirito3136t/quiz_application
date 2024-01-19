const { timeStamp } = require('console')
const mongoose = require('mongoose')
const { boolean } = require('webidl-conversions')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add a name']
    },
    email:{
        type:String,
        required:[true,'Please add a email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please provide password']
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }
    
},
{
    timestamps:true,
}
)

module.exports=mongoose.model('User',userSchema)