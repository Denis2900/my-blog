import react, { useRef, useState } from 'react'
import '../style/style.css'
import like from '../icons/like.png'
import badLike from '../icons/badLike.png'
import commets from '../icons/comment.png'
import deleteCommentImg from '../icons/delete.png'
import Menu from './menu'
import useFetch from '../hooks/useFetch'
import ModalWindow from './modalWindow'
import MyAccaunt from './myAccaunt'
import mobxObject from '../mobx/mobx'
import { observer } from 'mobx-react'
import Alert from './alert'
const Posts = observer(()=>{
    const user = mobxObject.getUser()
    const userName = user.userName
    const userId = String(user.id)
    const [isLoading,setIsLoading] = useState(true)
    const [arrayPosts,setArray] = useState([])
    const [visibleCommentsOfPost,setVisibleCommentsOfPosts] = useState([])
    const {fetchRequest} = useFetch('/posts',{},(posts)=>{setArray(posts);setIsLoading(false)})
    const filterArrayFunction = (array,notTryElement)=>{
        return array.filter((element)=>{
            if(element !== notTryElement){
                return element
            }
        })
    }
    const changeLikesOrBadLikes = (post,postIndex,isLike)=>{
        if(isLike){
            if(post.likes.includes(userId)){
                post.likes = filterArrayFunction(post.likes,userId)
            }
            else{
                post.likes.push(userId)
                if(post.badLikes.includes(userId)){
                    post.badLikes = filterArrayFunction(post.badLikes,userId)
                }
            }
        }
        else{
            if(post.badLikes.includes(userId)){
                post.badLikes = filterArrayFunction(post.badLikes,userId)
            }
            else{
                post.badLikes.push(userId)
                if(post.likes.includes(userId)){
                    post.likes = filterArrayFunction(post.likes,userId)
                }
            }
        }
        const newArrayPost = [...arrayPosts]
        newArrayPost[postIndex] = post
        setArray([...newArrayPost])
        updateOrDeletePost('PUT',post)        
    }
    const changeLikesComments = (comment, commentIndex,post,postIndex)=>{
        if(comment.likes.includes(userId)){
            comment.likes = filterArrayFunction(comment.likes,userId)
        }
        else{
            comment.likes.push(userId)
        }
        const newArray = [...arrayPosts]
        newArray[postIndex].comments[commentIndex] = comment
        setArray([...newArray])
        updateOrDeletePost('PUT',post) 
    }     
    const showCommets = (id)=>{
        if(visibleCommentsOfPost.includes(id)){
            const newVisibleCommentsOfPost = visibleCommentsOfPost.filter((number)=>{
                if(number !== id){
                   return number
                }
            })
            setVisibleCommentsOfPosts([...newVisibleCommentsOfPost])
        }
        else{
            setVisibleCommentsOfPosts([...visibleCommentsOfPost,id])
        }
    }
    const [tryInput,setTryInput] = useState(null)
    const [inputValue,setInputValue] = useState('')
    const changeInputValue = (event)=>{
        setInputValue(event.target.value)
    }
    const addComment = (post,postIndex)=>{
        if(inputValue && postIndex === tryInput){
            post.comments = [...post.comments,{author:userName,authorId:userId,text:inputValue,likes:[]}]
            const newArrayPosts = [...arrayPosts]
            newArrayPosts[postIndex] = post
            setArray([...newArrayPosts])
            setInputValue('')
            updateOrDeletePost('PUT',post) 
        }
    }
    const deleteComment = (post,postIndex,comment,commentIndex)=>{
        if(comment.name = userName){
            post.comments.splice(commentIndex,1)
            const newArrayPost = [...arrayPosts]
            newArrayPost[postIndex] = post
            setArray([...newArrayPost])
            updateOrDeletePost('PUT',post) 
        }
    }
    const deletePost = (post,postIndex)=>{
        if(post.creatorId === userId){
            const newArrayPost = [...arrayPosts]
            newArrayPost.splice(postIndex,1)
            setArray([...newArrayPost])
            updateOrDeletePost('DELETE',post) 
        }
    }
    const updateOrDeletePost = (method,post)=>{
        const objectRequest = {
            headers:{
                'Content-Type':'application/json'
            },
            method,
            body:JSON.stringify({...post})
        }
        fetchRequest('/posts',objectRequest)
    }
    return(
        <div className="main-block posts">
            <Alert></Alert>
            <ModalWindow title={mobxObject.modalWindowTitle}></ModalWindow>
            <MyAccaunt name={userName}></MyAccaunt>
            <Menu></Menu>
            {isLoading?<div className="main-block__loading"></div>:''}
            {arrayPosts.length || isLoading?arrayPosts.map((post,postIndex)=>{
            return(
             <div className="post-form" key={post.id}>
                <div className="post-form__date">{post.date}</div>
                <div className={post.creatorId === userId?'post-form__delete':'post-form__delete invisible'}><button className="delete-post" onClick={()=>{deletePost(post,postIndex)}}>Delete post</button></div>
                <div className="post-form__title">{post.author}</div>
                <div className="post-form__text">{post.text}</div>
                <div className="panel">
                    <div className="panel__item likes-item" onClick={()=>{changeLikesOrBadLikes(post,postIndex,true)}}>
                        <img src={like} alt="like"/>
                        <p className={post.likes.includes(userId)?"panel__number likes contains-like":"panel__number likes"}>{post.likes.length}</p>
                    </div>
                    <div className="panel__item bad-likes-item" onClick={()=>{changeLikesOrBadLikes(post,postIndex,false)}}>
                        <img src={badLike} alt="Bad-Like"/>
                        <p className={post.badLikes.includes(userId)?"panel__number bad_likes contains-bad-like":"panel__number bad_likes"}>{post.badLikes.length}</p>
                    </div>
                    <div className="panel__item comments-item" onClick={()=>showCommets(post.id)}>
                        <img src={commets} alt="comments"/>
                        <p className="panel__number comments">{post.comments.length}</p>
                    </div>
                </div>
                <div className={visibleCommentsOfPost.includes(post.id)?"comments-block":"comments-block invisible"}>
                   {post.comments.map((comment,commentIndex)=>{
                        return(
                            <div className="comment-item" key={comment.id}>
                            <div className="comments-block__username">
                               {comment.author}
                            </div>
                            <div className="comments-block__text-block">
                                 <div className="comments-block__text">
                                    {comment.text}
                                 </div>
                                 <div className="comments-block__panel">
                                     <div className="comments-block__item panel__item likes-item" onClick={()=>{changeLikesComments(comment,commentIndex,post,postIndex)}}>
                                         <img src={like} alt="like"/>
                                         <p className="panel__number likes">{comment.likes.length}</p>
                                     </div>
                                     <div className={comment.authorId === userId?"comments-block__item panel__item likes-item delete-comment":"comments-block__item panel__item likes-item invisible"} 
                                            onClick={()=>{deleteComment(post,postIndex,comment,commentIndex)}}>
                                         <img src={deleteCommentImg} alt="delete"/>
                                     </div>
                                 </div>
                            </div>
                        </div>
                    )})}
                </div>
                <div className="post-form__add-comments add-comments">
                    <div className="add-comments__input">
                        <input type="text" className="commets-input" placeholder="input comment" onChange={changeInputValue} onClick={()=>{setTryInput(postIndex)}} value={postIndex === tryInput?inputValue:''}/>
                    </div>
                    <div className="add-comments__button">
                        <button className="button-add-commets" onClick={()=>{addComment(post,postIndex)}}>Add comment</button>
                    </div>
                </div>
            </div>
           )}):<div className="main-block__title">There are no posts at the moment</div>}
        </div>
    )
})
export default Posts
