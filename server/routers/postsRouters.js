const express = require('express')
const router = express.Router()
const postControllers = require('../controllers/postControllers')
router.use(express.json())
router.get('/posts',postControllers.getPosts)
    .get('/posts:id',postControllers.getPost)
    .post('/posts',postControllers.addPost)
    .put('/posts',postControllers.updatePost)
    .delete('/posts',postControllers.deletePost)
module.exports = ()=>{return router}
