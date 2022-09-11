import { useState } from 'react'
import mobxObject from '../mobx/mobx'
import useFetch from '../hooks/useFetch'
import {observer} from 'mobx-react'
import useCheckLogin from '../hooks/useCheckLogin'
import useCheckPassword from '../hooks/useCheckPassword'
import {v4 as uuidv4} from 'uuid'
const AboutMe = observer(()=>{
    const arrayOfKeysUser = Object.keys(mobxObject.getUser())
    const [user,setUser] = useState(mobxObject.getUser())
    const {fetchRequest} = useFetch()
    const [updateBlockNumber,setUpdateBlockNumber] = useState(null)
    const [activeInput,setActiveInput] = useState(null)
    const [currentValue,setCurrentValue] = useState('')
    const [nextValue,setNextValue] = useState('')
    const [doubleValue,setDoubleValue] = useState('')
    const {checkUserLogin} = useCheckLogin('')
    const {checkUserPassword} = useCheckPassword('')
    const updateUser = (key)=>{
        const {id} = user
        if(currentValue && currentValue === user[key]){
            if((checkUserPassword(nextValue) || checkUserLogin(nextValue)) || (nextValue && key === 'userName')){
                const requestObject = {
                    headers:{
                        'Content-Type':'application/json'
                    },
                    method:'PUT',
                    body:JSON.stringify({_id:id,[key]:nextValue,doublePassword:doubleValue})
                }
                const newUser = {...user}
                newUser[key] = nextValue
                setUser(newUser)
                mobxObject.createUser(newUser)
                const callback = (resolve)=>{
                    mobxObject.changeAlertClassList()
                    if(Object.keys(resolve).length){
                        user[key] = nextValue
                        mobxObject.alertTitle = 'User data has been successful changed'
                    }
                    else{
                        mobxObject.alertTitle = 'Error on the server, please try again'
                    }
                    setTimeout(mobxObject.changeAlertClassList,5000)
                    setTimeout(()=>{mobxObject.alertClassList = 'alert invisible'},6000)
                }
                fetchRequest('/users',requestObject,callback)
                clearUnputValue()
            }
        }
    }
    const clearUnputValue = ()=>{
        setCurrentValue('')
        setNextValue('')
        setDoubleValue('')
        setUpdateBlockNumber(null)
    }
    return(
        <div className="about-me">
            {arrayOfKeysUser.map((key,keyIndex)=>{
                return(
                    <div key={keyIndex}>
                        <div className="about-me__string string">
                            <p className="string__name string__item">{key}</p>
                            <p className="string__value string__item"><input type={key === 'password'?'password':'text'} 
                            value={user[key]} className='string__input' readOnly={true}/></p>
                            {key !=='id' && key !=='dateRegestration'?<p className="string__change string__item">
                                <button className="string__btn" onClick={()=>{setUpdateBlockNumber(keyIndex)}}>change</button></p>:''}
                        </div>
                        <div className={updateBlockNumber === keyIndex?"update-user":"update-user invisible"}>
                            <div className="update-user__data">
                                <p className="update-user__title">{'Write current '+key}</p>
                                <p className="update-user__input"><input type={key === 'password'?'password':'text'} onClick={()=>{setActiveInput(keyIndex)}} 
                                onChange={(event)=>{setCurrentValue(event.target.value)}} value={activeInput === keyIndex?currentValue:''}/></p>
                            </div>
                            <div className="update-user__data">
                                <p className="update-user__title">{'Write new '+key}</p>
                                <p className="update-user__input"><input type={key === 'password'?'password':'text'} onClick={()=>{setActiveInput(keyIndex)}} 
                                onChange={(event)=>{setNextValue(event.target.value)}} value={activeInput === keyIndex?nextValue:''}/></p>
                            </div>
                            {key === 'password'?<div className="update-user__data">
                                <p className="update-user__title">{'Double new '+key}</p>
                                <p className="update-user__input"><input type={key === 'password'?'password':'text'} onClick={()=>{setActiveInput(keyIndex)}} 
                                onChange={(event)=>{setDoubleValue(event.target.value)}} value={activeInput === keyIndex?doubleValue:''}/></p>
                            </div>:''}
                            <div className="update-user__button-block">
                                <button className="update-user-btn yellow" onClick={()=>{updateUser(key)}}>Update</button>
                                <button className="update-user-btn white" onClick={clearUnputValue}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
})
export default AboutMe