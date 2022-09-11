import mobxObject from '../mobx/mobx'
import { observer } from 'mobx-react'
import Exit from './exit'
import AboutMe from './aboutMe'
const ModalWindow = observer(({title})=>{
    return(
        <div className={mobxObject.shellClassList}>
            <div className={mobxObject.modalWindowClassList}>
                <div className="modal-window__close" onClick={mobxObject.changeModalWindowAndShellClassList}>&#10060;</div>
                <div className="modal-window__title">{title === 'exit'?'Sign out in accaunt':'Information about me'}</div>
                <div className="modal-window__main-block">
                    {title === 'exit'?<Exit></Exit>: <AboutMe></AboutMe>}
                </div>
            </div>
        </div>
    )
})
export default ModalWindow