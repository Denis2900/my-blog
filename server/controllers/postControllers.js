const postsRouters = require('../routersToDb/postRouters')
class PostControllers{
    addPost(req,res){
        const {date,id,author,text} = req.body
        if(date && id && author && text){
            postsRouters.addPost(req,res)
        }
        else{
            res.status(500)
        }
    }
    getPosts(req,res){
        postsRouters.getPosts(req,res)
    }
    getPost(req,res){
        const _id = req.query._id
        if(_id){
            postsRouters.getPost(req,res)
        }
        else{
            res.status(500)
        }
    }
    updatePost(req,res){
        const {_id} = req.body
        if(_id){
            postsRouters.updatePost(req,res)
        }
        else{
            res.status(500)
        }
    }
    deletePost(req,res){
        const {_id} = req.body
        if(_id){
            postsRouters.deletePost(req,res)
        }
        else{
            res.status(500)
        }
    }
}
module.exports = new PostControllers()