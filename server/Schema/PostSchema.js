const mongoose = require('mongoose')
const Schema = mongoose.Schema
const postSchema = new Schema({
    date:{
        type:String,
        require:true
    },
    id:{
        type:Number,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    creatorId:{
        type:String,
        require:true
    },
    text:{
        type:String,
        require:true
    },
    likes:{
        type:[String],
        require:true
    },
    badLikes:{
        type:[String],
        require:true
    },
    comments:{
        type:[{
            author:{
                type:String,
                require:true
            },
            text:{
                type:String,
                require:true
            },
            likes:{
                type:[String],
                require:true
            },
            authorId:{
                type:String,
                require:true
            }
        }],
    }
},{timestamps:true})
const Post = mongoose.model('Post',postSchema)
module.exports = Post