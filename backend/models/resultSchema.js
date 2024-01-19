const mongoose=require('mongoose')

const resultModel=mongoose.Schema({
    username:{
        type:String,
    },
    result:{
        type:Array,
        default:[]
    },
    attemps:{
        type:Number,
        default:0
    },
    points:{
        type:Number,
        default:0
    },
    achieved:{
        type:String,
        default:''
    },
    createdAt:{
        type:Date,
        default:Date.now
        
    }
})

module.exports=mongoose.model('Result',resultModel)