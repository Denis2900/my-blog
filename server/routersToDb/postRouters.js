const Post = require('../Schema/PostSchema')
class PostsRouters{
    async addPost(req,res){
        try {
            const {id,text,author,date,creatorId} = req.body
            const newPost = {id,text,author,date,creatorId}
            const finishedPost = await Post.insertMany(newPost)
            res.status(200).json(finishedPost)
        } catch (error) {
            res.status(500).json({resolve:'Error on the server, please try again'})
        }
    }
    async getPosts(req,res){
        try {
            const posts = await Post.find()
            res.status(200).json(posts)
        } catch (error) {
            res.status(500).json({resolve:'Error on the server, please try again'})
        }
    }
    async getPost(req,res){
        try {
            const _id = req.query._id
            const post = await Post.findById(_id)
            res.status(200).json(post)
        } catch (error) {
            res.status(500).json({resolve:'Error on the server, please try again'})
        }
    }
    async updatePost(req,res){
        try {
            const {_id} = req.body
            const updatePost = {...req.body} 
            const newPost = await Post.findByIdAndUpdate(_id,updatePost)
            res.status(200).json(newPost)
        } catch (error) {
            res.status(500).json({resolve:'Error on the server, please try again'})
        }
    }
    async deletePost(req,res){
        try {
            const {_id} = req.body
            const deletedPost = await Post.findByIdAndDelete(_id)
            res.status(200).json({resolve:'The post has been deleted'})
        } catch (error) {
            res.status(500).json({resolve:'Error on the server, please try again'})
        }
    }
}
module.exports = new PostsRouters