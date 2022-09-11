import react, { useState } from 'react'
import useFetch from '../hooks/useFetch'
import useCheckLogin from '../hooks/useCheckLogin'
import useCheckPassword from '../hooks/useCheckPassword'
import { observer } from 'mobx-react'
import mobxObject from '../mobx/mobx'
import '../style/style.css'
import Alert from './alert'
const SignIn = observer(()=>{
   const [isInvisible,setIsInvisible] = useState(false)
   const [inputPassword,setInputPassword] = useState('')
   const [inputLogin,setInputLogin] = useState('')
   const [inputDoublePassword,setInputDoublePassword] = useState('')
   const [inputUserName,setInputUserName] = useState('')
   const [inputPasswordPrompt,setInputPasswordPrompt] = useState('')
   const [inputLoginPrompt,setInputLoginPrompt] = useState('')
   const [inputDoublePasswordPrompt,setInputDoublePasswordPrompt] = useState('')
   const {fetchRequest} = useFetch('')
   const {checkUserLogin} = useCheckLogin('')
   const {checkUserPassword} = useCheckPassword('')
   const checkPassword = (string)=>{
        return checkUserPassword(string)
   }
   const checkLogin = (string)=>{
       return checkUserLogin(string)
   }
   const changeInputPassword = (event)=>{
        if(checkPassword(event.target.value)){
            setInputPasswordPrompt('Допустимый пароль')
        }
        else{
            setInputPasswordPrompt('Пароль должен содержать не менее 7 символов и 1 цифры')
        }
        setInputPassword(event.target.value)
   }
   const changeInputLogin = (event)=>{
        if(checkLogin(event.target.value)){
            setInputLoginPrompt('Допустимый логин')
        }
        else{
            setInputLoginPrompt('Неверный логин')
        }
        setInputLogin(event.target.value)
   }
   const changeDoublePassword = (event)=>{
        if(inputPassword && inputPassword === event.target.value){
            setInputDoublePasswordPrompt('Пароли совпадают')
        }
        else{
            setInputDoublePasswordPrompt('Пароли не совпадают')
        }
        setInputDoublePassword(event.target.value)
   }
   const changeUserName = (event)=>{
        setInputUserName(event.target.value)
   }
   const clearInput = ()=>{
        setInputDoublePassword('')
        setInputLogin('')
        setInputPassword('')
        setInputUserName('')
        setInputDoublePasswordPrompt('')
        setInputLoginPrompt('')
        setInputPasswordPrompt('') 
   }
   const callback = (res)=>{

        if(Array.isArray(res) && res[0]){
            const {login,userName,id} = res[0] 
            const newUser = {password:inputPassword,login,userName,id}
            mobxObject.createUser(newUser)
            window.location.href = '/posts'
        }
        else{
            mobxObject.alertTitle = res.resolve
            mobxObject.changeAlertClassList()
            setTimeout(mobxObject.changeAlertClassList,5000)
            setTimeout(()=>{mobxObject.alertClassList = 'alert invisible'},6000)
        }
        clearInput()
    }
    const requestObject = {
        headers:{
            "Content-Type":"application/json",
        },
        method:"POST",
    }
   const signIn = (event)=>{
        if(event.target.classList.contains('notActive')){
            return
        }
        if(checkLogin(inputLogin) && checkPassword(inputPassword)){
            const body = JSON.stringify({login:inputLogin,password:inputPassword})
            fetchRequest('/users:signin',{...requestObject,body},callback)
        }
   }
   const regestration = (event)=>{
        if(event.target.classList.contains('notActive')){
            return
        }
        if(checkLogin(inputLogin) && checkPassword(inputPassword) &&
        inputPassword === inputDoublePassword && inputUserName){
           const body = JSON.stringify({
                login:inputLogin,
                password:inputPassword,
                doublePassword:inputDoublePassword,
                userName:inputUserName,
                id:new Date().getTime()})
            fetchRequest('/users',{...requestObject,body},callback)
        }
   } 
   return(
   <div className="main-block">
        <Alert></Alert>
        <div className="input" method="post" action="/input">
            <div className="input__title title">
                <p className={isInvisible?"title__regestration notActive":"title__regestration"} onClick={()=>{setIsInvisible(!isInvisible);clearInput()}}>Вход в систему</p>
                <p className={isInvisible?"title__regestration":"title__regestration notActive"} onClick={()=>{setIsInvisible(!isInvisible);clearInput()}}>Регестрация</p>
            </div>
            <div className="input__title-login">
                <p className="input__title-text">Введите логин</p>
                <div className={!isInvisible?"invisible":""}>
                    <p className={inputLoginPrompt === 'Допустимый логин'?"input__title-prompt green-text":"input__title-prompt red-text"}>{inputLoginPrompt}</p>
                </div>            
            </div>
            <div className="input__login"><input type="text" name="login" onChange={changeInputLogin} value={inputLogin}/></div>
            <div className="input__title-password" >
            <div className="input__title-login">
                <p className="input__title-text">Введите пароль</p>
               <div className={!isInvisible?"invisible":""}>
                    <p className={inputPasswordPrompt === 'Допустимый пароль'?"input__title-prompt green-text":"input__title-prompt red-text"}>{inputPasswordPrompt}</p>
                </div>            
            </div>
            </div>
            <div className="input__password"><input type="password"name="password" onChange={changeInputPassword} value={inputPassword}/></div>
            <div className={isInvisible?"registation-block":"regestration-block invisible"}>
                <div className="input__title-password">
                    <div className="input__title-login">
                        <p className="input__title-text">Повторите пароль</p>
                        <p className={inputDoublePasswordPrompt === 'Пароли совпадают'?"input__title-prompt green-text":"input__title-prompt red-text"}>{inputDoublePasswordPrompt}</p>            
                    </div>
                </div>
                <div className="input__password double-password"><input type="password" name="doublePassword" onChange={changeDoublePassword} value={inputDoublePassword}/></div>
                <div className="input__title-password" >Введите имя</div>
                <div className="input__user-name"><input type="text" name="userName" onChange={changeUserName} value={inputUserName}/></div>
            </div>
            <div className="input__button-block">
                <button className={isInvisible?"input__button-sign-in notActive":"input__button-sign-in"} onClick={signIn}>Войти</button>
                <button className={isInvisible?"input__button-regestration":"input__button-regestration notActive"} onClick={regestration}>Регестрация</button>
            </div>
        </div>
   </div>
   )
})
export default SignIn