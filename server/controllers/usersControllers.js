const userRouters = require('../routersToDb/userRoutres')
class UserControllers{
    addUser = (req,res)=>{
        const {login,password,doublePassword,userName} = req.body
        const checkUserPassword = this.checkPassword
        const checkUserLogin = this.checkLogin
        if(checkUserLogin(login) && checkUserPassword(password) 
        && password === doublePassword && userName){
            userRouters.addUser(req,res)
        }
        else{
            res.status(500)
        }
    }
    getUsers(req,res){
        userRouters.getUsers(req,res)
    }
    getUser(req,res){
        const {login,password} = req.body
        if(login && password){
            userRouters.getUser(req,res)
        }
        else{
            res.status(500)
        }
    }
    updateUsers = (req,res)=>{
        const {_id,login,password,doublePassword,userName} = req.body
        const checkUserPassword = this.checkPassword
        const checkUserLogin = this.checkLogin
        if(_id){
            if(login){
                if(checkUserLogin(login)){
                    userRouters.updateUser({_id,login},res)
                }
                else{
                    res.status(500)
                }
            }
            else if(password){
                if(checkUserPassword(password) && password === doublePassword){
                    userRouters.updateUser({_id,password},res)
                }
                else{
                    res.status(500)
                }
            }
            else{
                if(userName){
                    console.log(userName);
                    userRouters.updateUser({_id,userName},res)
                }
                else{
                    res.status(500)
                }
            }
        }
        else{
            res.status(500)
        }
    }
    deleteUsers(req,res){
        const {_id} = req.body
        if(_id){
            userRouters.deleteUser(req,res)
        }
        else{
            res.status(500)
        }
    }
    checkPassword(password){
        const regNumber = /\d/
        if(password.length > 7 && regNumber.test(password)){
            return true
        }
        return false
    }
    checkLogin(login){
        const regLogin = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i
        if(regLogin.test(login)){
            return true
        }
        return false
    }
    
}
module.exports = new UserControllers()