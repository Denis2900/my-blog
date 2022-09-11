import { observer } from "mobx-react"
import mobxObject from '../mobx/mobx'
const Alert = observer(()=>{
    return (
        <div className={mobxObject.alertClassList}>
            <div className="alert__title">{mobxObject.alertTitle}</div>
        </div>
    )
})
export default Alert