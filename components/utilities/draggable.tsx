import { MiddlewareNotFoundError } from 'next/dist/shared/lib/utils';
import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from './draggable.module.css'
import { product } from '../../store/productsstore';
const productActions=product.actions;
import { RootState } from '../../store';
const DragSlider=()=>{
    // const [price,setprice]=useState([0,100]);
    const price=useSelector<RootState,number[]>(state=>state.products.price.value)
    const dispatch=useDispatch();

    const valueHandler=(value:number,event:any)=>{
        dispatch(productActions.setprice({value,target:event.target.value}))
    }

    const paddingleftpercent=()=>{
        let m=(Math.min(price[0],price[1])/100)*100;
        return m;
    }
    const paddingrightpercent=()=>{
        let m=((Math.max(price[0],price[1])/100)*100);
        return m;
    }
    // const abortHandler=()=>{
    //     console.log('abort');
        
    // }
    return(
        <Fragment>
        <h4>Price</h4>
        <div className={styles.wrapper}>
            <div className={styles.values} style={{left:`${(paddingleftpercent()+paddingrightpercent())/2}%`}}>
                <span id="range1">{Math.min(price[0],price[1])}</span>
                <span> - </span>
                <span id="range2">{Math.max(price[0],price[1])}</span>
            </div>
            <div className={styles.container}>
                <div className={styles.slidertrack} style={{background : `linear-gradient(to right, 
                    #dadae5 ${paddingleftpercent()}% , 
                    #FFAA05 ${paddingleftpercent()}% , 
                    #FFAA05 ${paddingrightpercent()}%, 
                    #dadae5 ${paddingrightpercent()}%)`}}/>
                <input type="range" min="0" max="100" value={price[0]} id="slider-1" onChange={valueHandler.bind(null,0)}/>
                <input type="range" min="0" max="100" value={price[1]} id="slider-2" onChange={valueHandler.bind(null,1)}/>
            </div>
        </div>
        </Fragment>
    )
}

export default DragSlider