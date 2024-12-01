import React, { Fragment, useRef,useState,useEffect } from 'react'
import style from './Banner.module.css'
const Banner=()=>{
    return(
        <Fragment>
        <div className={style.main} style={{ backgroundImage: "url(/photo.png)" }}>
            <div className={style.backgroundcolor}>
                <div className={style.text}>
                    <div className={style.first}>
                        Books are worth for reading
                    </div>
                    <div className={style.second}>
                        order books at cheap rate from our outlet.We have mre than 10000 books in our store.Explore Now
                    </div>
                    <button className={style.shopnow}>
                        Shop Now
                    </button>
                </div>
            </div>
            
        </div>
        
        </Fragment>
    
    )
}

export default Banner