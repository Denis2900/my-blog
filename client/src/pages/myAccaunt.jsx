import React from 'react'
import mobxObject from '../mobx/mobx'
import {observer} from 'mobx-react'
const MyAccaunt = observer(({name})=>{
    const clickOnOption = (event)=>{
      mobxObject.changeModalWindowAndShellClassList()
      mobxObject.modalWindowTitle = event.target.textContent
    }
    return(
        <div className={mobxObject.rightMenuClassList}>
            <div className="my-accaunt__name">{name}</div>
              <div className="my-accaunt__settings settings">
                <div className="settings__option" onClick={clickOnOption}>About Me</div>
                <div className="settings__option" onClick={clickOnOption}>exit</div>
              </div>
        </div>
    )
})
export default MyAccaunt