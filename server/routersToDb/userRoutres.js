const User = require('../Schema/userSchema')
const passwordHash = require('password-hash')
class UserRouters{
    async addUser(req,res){
       try {
            const user = {
                login:req.body.login,
                password:passwordHash.generate(req.body.password),
                userName:req.body.userName,
                id:req.body.id
            }
            const addedUser = await User.find({login:user.login})
            if(addedUser.length){
                res.status(500).json({resolve:'A user with this username already exists'})
            }
            else{
                const newUser = await User.insertMany(user)
                res.status(200).json(newUser) 
            }
       } catch (error) {
            res.status(500).json({resolve:'Error on the server, please try again'})
       }
    }
    async getUsers(req,res){
        try {
            const allUsers = await User.find()
            res.status(200).json(allUsers)
        } catch (error) {
            res.status(500).json({resolve:'Error on the server, please try again'})
        }
    }
    async getUser(req,res){
        try {
            const {login,password} = req.body
            const user = await User.find({login})
            if(user.length && passwordHash.verify(password,user[0].password)){
              console.log(user);
              res.status(200).json(user)  
            }
            else{
                res.status(200).json({resolve:'Invalid username or password'})
            }
        } catch (error) {
            res.status(500).json({resolve:'Error on the server, please try again'})
        }
    }
    async updateUser(body,res){
        try {
            const _id = body._id
            let updatesUser = null
            if(body.login){
                const user = await User.find({login:body.login})
                if(user.length){
                    res.status(500).json({resolve:'A user with this username already exists'})
                }
                else{
                   updatesUser = await User.findByIdAndUpdate(_id,body) 
                }
            }
            else if(body.password){
                 updatesUser = await User.findByIdAndUpdate(_id,{password:passwordHash.generate(body.password)})
            }
            else{
                updatesUser = await User.findByIdAndUpdate(_id,{userName:body.userName})
            }
            res.status(200).json(updatesUser) 
        } catch (error) {
            console.log(error);
            res.status(500).json({resolve:'Error on the server, please try again'})
        }
    }
    async deleteUser(req,res){
        try {
            const _id = req.body._id
            const user = await User.findByIdAndDelete(_id)
            res.status(200).json({resolve:"The user has been deleted"})
        } catch (error) {
            res.status(500).json({resolve:'Error on the server, please try again'})
        }
    }
}
module.exports = new UserRouters()