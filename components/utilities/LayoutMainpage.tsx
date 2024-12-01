import React from 'react'
import style from './layout.module.css'

const LayoutMainpage:React.FC<{children:React.ReactNode}>=(props)=>{
    return(
        <div className={style.main}>
            {props.children}
        </div>
    )
}

export default LayoutMainpage 