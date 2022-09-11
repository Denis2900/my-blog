import react from 'react'
import '../style/style.css'
import {Link} from 'react-router-dom'
import menu from '../icons/menu.png'
import {observer} from 'mobx-react'
import mobxObject from '../mobx/mobx'
const Menu = observer(()=>{
    return(
        <nav className="main-block__menu menu">
             <div className="menu__item"><Link to="/">home</Link></div>
             <div className="menu__item"><Link  to="/posts">posts</Link ></div> 
             <div className="menu__item"><Link  to="/create-post">create post</Link ></div>
             <div className="menu__item"><Link  to="/sign-in">Sign in</Link></div>
             <div className="menu__item" onClick={mobxObject.changeRightMenuClassList}>Additional menu</div>
        </nav>
    )
})
export default Menu