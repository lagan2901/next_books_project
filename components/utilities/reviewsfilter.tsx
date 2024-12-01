import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './reviewsfilter.module.css'
import { product } from '../../store/productsstore';
const productActions=product.actions;
import { RootState } from '../../store';

const Reviewfilter=()=>{
    const sortReview=useSelector<RootState,string>(state=>state.products.reviews.value)
    const [reviewState,setreviewState]=useState(true);
    
    useEffect(()=>{
        setreviewState(sortReview==='max'?true:false)
    },[sortReview])

    const dispatch=useDispatch();
    // const [sortReview,setsortReview]=useState('max');
    const mouseenterHandler=(value:string)=>{
        setreviewState(()=>{
            if(value==='max') return true;
            return false;
        })
    }
    const mouseleaveHandler=()=>{
        setreviewState(()=>{
            return (sortReview==='max')?true:false;
        })
    }

    const clickHandler=(value:string)=>{
        dispatch(productActions.setsortReview(value));
    }

    return(
        <div className={style .main}>
            <h4>Reviews</h4>
            <div className={style.maindiv}>
                <div 
                    className={`${style.lowtohigh} ${!reviewState?style.active:''}`} 
                    onMouseEnter={mouseenterHandler.bind(null,'min')} 
                    onMouseLeave={mouseleaveHandler} 
                    onClick={clickHandler.bind(null,'min')}>
                Min to Max
                </div>
                <div 
                    className={`${style.hightolow} ${reviewState?style.active:''}`} 
                    onMouseEnter={mouseenterHandler.bind(null,'max')} 
                    onMouseLeave={mouseleaveHandler} 
                    onClick={clickHandler.bind(null,'max')}>
                Max to Min
                </div>
            </div>
        </div>
    )
}

export default Reviewfilter;