const express = require('express')
const app = express()
const PORT = 8080
const postRoutersFunction = require('./server/routers/postsRouters')
const connectToDb = require('./server/connectionToDb/connection')
const usersRouterFunction = require('./server/routers/usersRouters')
app.use(postRoutersFunction())
app.use(usersRouterFunction())
app.use(()=>{connectToDb})
app.get('/',(req,res)=>{
    res.send('Сообщение')
})
app.listen(PORT,(error)=>{
    error?console.error(error):console.log('Server is working');
})
app.use(express.static(__dirname+'/client'));
app.use(express.json())
app.use(express.urlencoded({extended:false}))
