"use client";

import Navigation from "../Navigation/Navigation";
import React from "react";
import style from './layout.module.css'
import { Provider } from "react-redux";
import store from "../../store";
const Layout:React.FC<{children:React.ReactNode}>=(props)=>{
    return(
        <Provider store={store}>
        <div className={style.center}>
            <Navigation/>
            {props.children}
        </div>
        </Provider>
    )
}

export default Layout;