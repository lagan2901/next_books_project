import React, { useState } from 'react';
import style from './genres.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { product } from '../../store/productsstore';
const productActions=product.actions;
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

const Genres:React.FC<{name:string,source:any}>=(props)=>{
    const [isActive,setisActive]=useState(false);
    const dispatch=useDispatch();
    const clickHandler=(name:string)=>{
        dispatch(productActions.addgenre({name,isActive}))
        setisActive((prevState)=>{
            return !prevState;  
        })
    }
    return(
        <div className={style.main} onClick={clickHandler.bind(null,props.name)}>
            <FontAwesomeIcon className={`${style.icon} ${isActive?style.active:''}`} icon={props.source}/>
            <p className={style.name}>{props.name.charAt(0)+props.name.slice(1).toLowerCase()}</p>
        </div>
    )
}

export default Genres;