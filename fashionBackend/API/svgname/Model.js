const {Schema, model}=require('mongoose')

const svgschema=new Schema({
    SvgName:{
        type:String,
        required:true
    },
    SvgImage:{
        type:String,
        required:true
    }
})

const SvgFromModel=model('svg',svgschema)
module.exports={SvgFromModel}