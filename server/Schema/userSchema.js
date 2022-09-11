const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    id:{
        type:Number,
        require:true
    },
    userName:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    login:{
        type:String,
        require:true
    },
},{timestamps:true})
const user = mongoose.model('user',userSchema)
module.exports = user
