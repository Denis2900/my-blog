import React, { useState } from "react";
import '../style/style.css'
import Menu from "./menu";
import useFetch from "../hooks/useFetch";
import {observer} from 'mobx-react'
import mobxObject from '../mobx/mobx'
import Alert from './alert'
const CreatePosts = observer(()=>{
    const user = mobxObject.getUser()
    const userId = String(user.id)
    const [inputText,setInputText] = useState('')
    const {fetchRequest} =  useFetch('/posts')
    const createPost = ()=>{
        if(user.userName && inputText){
            const today = new Date()
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            const post = {
                id:today.getTime(),
                date:`${day + ' ' +month+' '+ year}`,
                author:user.userName,
                creatorId:userId,
                text:inputText,
                likes:[],
                badLikes:[],
                comments:[]
            }
            const objectRequest = {
                headers:{
                    'Content-Type':'application/json'
                },
                method:'POST',
                body:JSON.stringify(post)
            }
            const callback = (resolve)=>{
                mobxObject.changeAlertClassList()
                if(resolve[0].id){
                    mobxObject.alertTitle = 'The post was ben successful created'
                }
                else{
                    mobxObject.alertTitle = resolve   
                }
                setTimeout(mobxObject.changeAlertClassList,5000)
                setTimeout(()=>{mobxObject.alertClassList = 'alert invisible'},6000)
            }
            fetchRequest('/posts',objectRequest,callback)
            setInputText('')
        }
    }
    return(
        <div className="main-block">
            <Alert></Alert>
            <Menu></Menu>
            <div className="create-post">
                <div className="create-post__author author">
                    <div className="block__title">Автор поста</div>
                    <input className="author__input" type="text" value={user.userName} readOnly={true}/>
                </div>
                <div className="create-post__text-block">
                    <div className="block__title">Поле для ввода текста</div>
                    <textarea className="create-post__textarea" value={inputText} onChange={(event)=>{setInputText(event.target.value)}}></textarea>
                </div>
                <div className="create-post__button">
                    <button className="create-post__button-add" onClick={createPost}>create</button>
                </div>
            </div>
        </div>
    )
})
export default CreatePosts