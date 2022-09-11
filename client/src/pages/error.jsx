import react from 'react'
import '../style/style.css'
import Menu from './menu'
function Error(){
    return(
        <div className="main-block">
            <Menu></Menu>
            <div className="main-block__title">
                Error 404. Not found page
            </div>
        </div>
    )
}
export default Error