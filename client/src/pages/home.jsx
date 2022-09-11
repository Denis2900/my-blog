import react from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import '../style/style.css'
import Menu from './menu'
function Home(){
    return(
        <div className="main-block">
            <Menu></Menu>
            <div className="main-block__title">
                My Blog
            </div>
       </div>
    )
}
export default Home