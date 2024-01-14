const {Schema, model}=require('mongoose')

const CategorySchema=new Schema({
    CategoryName:{
        type:String,
        unique:true,
        required:true
    },
   
    CategorySVG:{
        type:String,
        required:true
    }

})

const CategoryFromModel=model('category',CategorySchema)
module.exports={CategoryFromModel}