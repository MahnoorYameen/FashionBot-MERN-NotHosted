const {Schema, model}=require('mongoose')

const AdSchema=new Schema({
    AdName:{
        type:String,
        required:true
    },
    AdPrice:{
        type:Number,
        required:true
    },
    reviews: {
        type: Array,
       default:[]
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    
    AdCategory:{
        type:String,
        required:true
    },
    
    AdThumbnail:{
        type:String,
        required:true
    },
    AdDescription:{
        type:String,
        required:true
    },
    AdLocation:{
        type:String,
        required:true
    }
    ,
    AdImageArray:{
        type:[String],
        required:true
    }

})

const AdFromModel=model('ad',AdSchema)
module.exports={AdFromModel}