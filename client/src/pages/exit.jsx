import react from 'react'
import mobxObject from '../mobx/mobx'
import {observer} from 'mobx-react'
const Exit = observer(()=>{
    return(
        <div className="exit">
            <div className="exit__buttons-block">
                <div className="exit__button"><button className="exit__btn yellow" onClick={mobxObject.changeUser}>Output</button></div>
                <div className="exit__button"><button className="exit__btn white" onClick={mobxObject.changeModalWindowAndShellClassList}>Cancel</button></div>
            </div>
        </div>
    )
})
export default Exit 