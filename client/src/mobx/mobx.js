import { makeAutoObservable } from "mobx"
class Mobx{
    rightMenuClassList = 'my-accaunt'
    modalWindowClassList = 'modal-window invisible'
    shellClassList = 'shell invisible'
    modalWindowTitle = ''
    alertTitle = ''
    alertClassList = 'alert invisible'
    user = {}
    constructor(){
        makeAutoObservable(this)
    }
    changeRightMenuClassList = ()=>{
        if(this.rightMenuClassList.includes('my-accaunt__show')){
            this.rightMenuClassList = 'my-accaunt my-accaunt__hide'
        }
        else{
            this.rightMenuClassList = 'my-accaunt my-accaunt__show'
        }
    }
    changeModalWindowAndShellClassList = ()=>{
        if(this.modalWindowClassList.includes('invisible')){
            this.modalWindowClassList = 'modal-window'
            this.shellClassList = 'shell'
        }
        else{
            this.modalWindowClassList = 'invisible modal-window'
            this.shellClassList = 'invisible shell'
        }
        this.changeRightMenuClassList()
    }
    changeUser = ()=>{
        this.user = {}
        window.location.href = '/sign-in'
        this.deleteUser()
    }
    changeAlertClassList = ()=>{
        if(this.alertClassList.includes('invisible')){
            this.alertClassList = 'alert alert-show-animation'
        }
        else{
            this.alertClassList = 'alert alert-hide-animation'
        }
    }
    createUser = (user)=>{
        sessionStorage.setItem('user',JSON.stringify(user))
        this.user = user
    }
    deleteUser = ()=>{
        sessionStorage.removeItem('user')
        this.user = {}
    }
    getUser = ()=>{
        return JSON.parse(sessionStorage.getItem('user'))
    }
}
export default new Mobx()